<template lang="pug">
b-container(fluid).mt-5#adminexhibitions
  b-row.ml-2
    b-btn.text-center(variant='dark' @click="$bvModal.show('modal-exhibition')") 新增展覽資訊
  b-table.mt-3.px-0#exhibition-table(:items="exhibitions" :fields="fields" ref="exhibitionTable" hover)
    template(#cell(date)="data")
      | {{ data.item.startDate }} - {{ data.item.endDate }}
    template(#cell(description)="data")
      p {{ data.item.description }}
    template(#cell(image)="data")
      img.thumbnails(v-if="data.item" :src="data.item.image")
    template(#cell(current)="data")
      | {{ data.item.current ? 'v' : '' }}
    template(#cell(action)="data")
      //- @click 傳送是陣列的第幾個
      b-btn(variant="dark" @click="editExhibition(data.index)") 編輯
  b-modal#modal-exhibition(
    ok-variant="dark"
    ok-title="送出"
    cancel-variant="light"
    cancel-title="取消"
    @ok="submitModal"
    @hidden="resetForm"
    :ok-disabled="submitDisable"
    :cancel-disabled="submitDisable"
  )
    b-form-group(
      label="展覽名稱"
      label-for="input-name"
      :state="state.name"
      description="展覽名稱為必填"
      invalid-feedback="展覽名稱為必填"
    )
      b-form-input#input-name(
        v-model="form.name"
        type="text"
        required
        placeholder="請輸入展覽名稱"
        :state="state.name"
      )
    b-form-group(
      label="創作者"
      label-for="input-artist"
    )
      b-form-input#input-artist(
        v-model="form.artist"
        type="text"
        placeholder="請輸入創作者"
      )
    b-form-group(
      label="展覽日期"
      label-for="datepicker-date"
    )
      b-form-datepicker#datepicker-date(
        v-model="form.startDate"
        placeholder="請選擇展覽起始日期"
        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
      )
      b-form-datepicker.mt-2#datepicker-date2(
        v-model="form.endDate"
        placeholder="請選擇展覽結束日期"
        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
      )
      //- p
      //- | 當前展覽日期為 {{ this.exhibitions.startDate }} - {{ this.exhibitions.endDate }}
      //- b-form-group(
      //-   label="展覽日期"
      //-   label-for="datepicker-date"
      //- )
    b-form-group(
      label="展覽詳情"
      label-for="input-description"
      description="展覽詳情為必填"
      invalid-feedback="展覽詳情為必填"
      :state="state.description"
    )
      b-form-textarea#input-description(
        v-model="form.description"
        type="text"
        placeholder="請輸入展覽描述"
        :state="state.description"
        rows="12"
      )
    b-form-group(
      label="近期"
      label-for="input-current"
    )
      b-form-radio(v-model="form.current" :value="true") 近期展覽
      b-form-radio(v-model="form.current" :value="false") 非近期展覽
    img-inputer#img-inputer(
      v-model="form.image"
      theme="dark"
      size="large"
      placeholder="點擊或拖曳選擇圖片"
      bottom-text="點擊或拖曳以修改"
    )
</template>

<script>
export default {
  data () {
    return {
      exhibitions: [],
      fields: [
        {
          key: 'image',
          label: '展覽首圖'
        },
        {
          key: 'name',
          label: '展覽名稱'
        },
        {
          key: 'date',
          label: '展覽日期'
        },
        {
          key: 'artist',
          label: '創作者'
        },
        {
          key: 'description',
          label: '展覽描述'
        },
        {
          key: 'current',
          label: '近期展覽'
        },
        {
          key: 'action',
          label: '修改'
        }
      ],
      form: {
        name: '',
        artist: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
        image: [],
        _id: ''
      },
      submitDisable: false
    }
  },
  computed: {
    state () {
      return {
        name: this.form.name.length === 0 ? null : true,
        description: this.form.description.length === 0 ? null : true
      }
    }
  },
  methods: {
    editExhibition (index) {
      // 從 @click 傳送的 index 去取值，並放一個 index 在 form 物件裡
      this.form = {
        name: this.exhibitions[index].name,
        artist: this.exhibitions[index].artist,
        startDate: this.exhibitions[index].startDate.replace(/\//g, '-'),
        endDate: this.exhibitions[index].endDate.replace(/\//g, '-'),
        description: this.exhibitions[index].description,
        current: this.exhibitions[index].current,
        image: this.exhibitions[index].image,
        _id: this.exhibitions[index]._id,
        index
      }
      this.$bvModal.show('modal-exhibition')
    },
    resetForm (event) {
      if (this.submitDisable) {
        event.preventDefault()
        return
      }
      this.form = {
        name: '',
        artist: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
        image: [],
        _id: ''
      }
    },
    async submitModal () {
      this.submitDisable = true
      try {
        // 新增展覽
        const fd = new FormData()
        // (key, this.form[key]):(欄位名稱，值(value))
        for (const key in this.form) {
          fd.append(key, this.form[key])
        }
        // _id 判斷展覽是否存在
        // 如果存在：做編輯動作，不存在：做新增動作
        if (this.form._id.length === 0) {
          await this.axios.post('/exhibitions', fd, {
            // 驗證是否有管理員權限
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          this.exhibitions.push({
            name: this.form.name,
            artist: this.form.artist,
            startDate: this.form.startDate.replace(/-/g, '/'),
            endDate: this.form.endDate.replace(/-/g, '/'),
            description: this.form.description,
            current: this.form.current,
            // data.result 是 axios(api) 回傳的 result
            // image: `${process.env.VUE_APP_API}/files/${data.result.image}`,
            _id: this.form._id
          })
          this.$refs.exhibitionTable.refresh()
        } else {
          // 編輯展覽
          const { data } = await this.axios.patch('/exhibitions/' + this.form._id, fd, {
            // 驗證是否有管理員權限
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          // 取 form 裡面的 index 可修改陣列內的內容
          this.exhibitions[this.form.index] = {
            name: this.form.name,
            artist: this.form.artist,
            startDate: this.form.startDate.replace(/-/g, '/'),
            endDate: this.form.endDate.replace(/-/g, '/'),
            description: this.form.description,
            current: this.form.current,
            // data.result 是 axios(api) 回傳的 result
            image: `${process.env.VUE_APP_API}/files/${data.result.image}`,
            _id: this.form._id
          }
          // 強制表格重新繪製，即時更新內容
          this.$refs.exhibitionTable.refresh()
        }
        this.$bvModal.hide('modal-exhibition')
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
      this.submitDisable = false
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/exhibitions/all', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.exhibitions = data.result.map(exhibition => {
        // 判斷是否有圖片
        // if (exhibition.image) {
        //   exhibition.image = `${process.env.VUE_APP_API}/files/${exhibition.image}`
        // }
        if (exhibition.image) {
          exhibition.image = exhibition.image.map(i => {
            return `${process.env.VUE_APP_API}/files/${i}`
          })
        }
        exhibition.startDate = new Date(exhibition.startDate).toLocaleDateString('zh-TW')
        exhibition.endDate = new Date(exhibition.endDate).toLocaleDateString('zh-TW')
        return exhibition
      })
    } catch (error) {
      console.log(error)
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得展覽資料失敗'
      })
    }
  }
}
</script>

<style>
.thumbnails{
  width: 12rem;
  height: 10rem;
  object-fit: cover;
}
#modal-exhibition .modal-content {
  width: 150%;
}
#exhibition-table.table td {
  white-space: pre-line;
  width: 8%;
}
#exhibition-table.table :nth-child(5) {
  width: 25%;
}
#exhibition-table.table td p {
  white-space: pre-line;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  padding-bottom: 0;
  margin-top: -1px;
}
</style>
