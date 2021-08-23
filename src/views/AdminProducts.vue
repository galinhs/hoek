<template lang="pug">
b-container(fluid).mt-5.px-0#adminproducts
  b-row.ml-2
    b-btn.text-center(variant='dark' @click="$bvModal.show('modal-product')") 新增商品
  b-table.mt-3.px-0#product-table(:items="products" :fields="fields" ref="productTable")
    template(#cell(image)="data")
      img.thumbnails(v-if="data.item" :src="data.item.image[0]")
    template(#cell(description)="data")
      p {{ data.item.description }}
    template(#cell(authorDescription)="data")
      p {{ data.item.authorDescription }}
    template(#cell(sell)="data")
      | {{ data.item.sell ? 'v' : '' }}
      //- {{ data.item.sell ? 'b-icon-check' : '' }}
      //- b-icon-check(v-if="data.item.s"){{ data.item.sell ? '' : '' }}
    template(#cell(recommend)="data")
      | {{ data.item.recommend ? 'v' : '' }}
    template(#cell(action)="data")
      //- @click 傳送是陣列的第幾個
      b-btn(variant="dark" @click="editProduct(data.index)") 編輯
  b-modal#modal-product(
    :title="form._id.length > 0 ? '編輯商品' : '新增商品'"
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
      label="品項名稱"
      label-for="input-name"
      :state="state.name"
      invalid-feedback="品項名稱必填"
    )
      b-form-input#input-name(
        v-model="form.name"
        type="text"
        required
        placeholder="請輸入品項名稱"
        :state="state.name"
      )
    b-form-group(
      label="價格"
      label-for="input-price"
      :state="state.price"
      invalid-feedback="價格必填"
    )
      b-form-input#input-price(
        v-model.number="form.price"
        type="number"
        required
        placeholder="請輸入價格"
        :state="state.price"
      )
    b-form-group(
      label="作者"
      label-for="input-author"
    )
      b-form-input#input-author(
        v-model="form.author"
        type="text"
        placeholder="請輸入作者"
      )
    b-form-group(
      label="內容簡介"
      label-for="input-description"
    )
      b-form-textarea#input-description(
        v-model="form.description"
        type="text"
        placeholder="請輸入內容簡介"
        rows="12"
      )
    b-form-group(
      label="作者介紹"
      label-for="input-authorDescription"
    )
      b-form-textarea#input-authorDescription(
        v-model="form.authorDescription"
        type="text"
        placeholder="請輸入作者介紹"
        rows="8"
      )
    b-form-group(
      label="分類"
      label-for="select-category"
    )
      //- b-form-input#select-category(list="category-list" v-model="form.category")
      //- datalist#category-list
      //-   option(v-for="category in categories") {{ category }}
      b-form-select#select-category(
      v-model="form.category"
      :options="options"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled")
    b-form-group(
      label="上架"
      label-for="input-sell"
    )
      b-form-radio(v-model="form.sell" :value="true") 上架
      b-form-radio(v-model="form.sell" :value="false") 下架
    b-form-group(
      label="推薦商品"
      label-for="input-recommend"
    )
      b-form-radio(v-model="form.recommend" :value="true") 是
      b-form-radio(v-model="form.recommend" :value="false") 否
    //- img-inputer(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改")
    VueFileAgent(
      v-model="form.image"
      :accept="'image/*'"
      :deletable="true"
      @beforedelete="onBeforeDelete($event)"
      ref="imgFileAgent"
      :helpText="'點擊或拖曳選擇圖片'"
    )
</template>

<script>
export default {
  data () {
    return {
      products: [],
      fields: [
        {
          key: 'image',
          label: '圖片'
        },
        {
          key: 'name',
          label: '品名'
        },
        {
          key: 'price',
          label: '價格'
        },
        {
          key: 'author',
          label: '作者'
        },
        {
          key: 'description',
          label: '內容簡介'
        },
        {
          key: 'authorDescription',
          label: '作者介紹'
        },
        {
          key: 'category',
          label: '分類'
        },
        {
          key: 'sell',
          label: '上架狀態'
        },
        {
          key: 'recommend',
          label: '推薦商品'
        },
        {
          key: 'action',
          label: '修改'
        }
      ],
      submitDisable: false,
      form: {
        name: '',
        price: 0,
        author: '',
        description: '',
        authorDescription: '',
        category: '',
        sell: false,
        recommend: false,
        image: [],
        _id: ''
      },
      // categories: ['攝影書', '雜誌', '畫集', '其他']
      options: [
        { item: '攝影書', name: '攝影書' },
        { item: '雜誌', name: '雜誌' },
        { item: '畫集', name: '畫集' },
        { item: '其他', name: '其他' }
      ],
      fileRecordsForUpload: []
    }
  },
  computed: {
    state () {
      return {
        // name 為 true 可以顯示正確
        name: this.form.name.length === 0 ? null : true,
        price: this.form.price === 0 ? null : this.form.price > 0
      }
    }
  },
  methods: {
    onBeforeDelete (fileRecord) {
      this.$refs.imgFileAgent.deleteFileRecord(fileRecord)
    },
    deleteUploadedFile: function (fileRecord) {
      this.$refs.imgFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord)
    },
    editProduct (index) {
      // 從 @click 傳送的 index 去取值，並放一個 index 在 form 物件裡
      this.form = {
        name: this.products[index].name,
        price: this.products[index].price,
        author: this.products[index].author,
        description: this.products[index].description,
        authorDescription: this.products[index].authorDescription,
        category: this.products[index].category,
        sell: this.products[index].sell,
        recommend: this.products[index].recommend,
        image: this.products[index].image,
        _id: this.products[index]._id,
        index
      }
      this.$bvModal.show('modal-product')
    },
    resetForm (event) {
      if (this.submitDisable) {
        event.preventDefault()
        return
      }
      this.form = {
        name: '',
        price: 0,
        author: '',
        description: '',
        authorDescription: '',
        category: '',
        sell: false,
        recommend: false,
        image: [],
        _id: ''
      }
    },
    async submitModal () {
      this.submitDisable = true
      try {
        // 新增商品
        // 後端只收 FormData (可帶檔案、圖片、一般文字)
        const fd = new FormData()
        // (key, this.form[key]):(欄位名稱，值(value))
        for (const key in this.form) {
          if (key !== 'image') {
            fd.append(key, this.form[key])
          } else {
            for (const img of this.form.image) {
              fd.append('image', img.file)
            }
          }
        }
        // _id 判斷商品是否存在
        // 如果存在：做編輯動作，不存在：做新增動作
        if (this.form._id.length === 0) {
          await this.axios.post('/products', fd, {
            // 驗證是否有管理員權限
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          this.products.push({
            name: this.form.name,
            price: this.form.price,
            author: this.form.author,
            description: this.form.description,
            authorDescription: this.form.authorDescription,
            category: this.form.category,
            sell: this.form.sell,
            recommend: this.form.recommend,
            // data.result 是 axios(api) 回傳的 result
            // image: `${process.env.VUE_APP_API}/files/${data.result.image}`,
            _id: this.form._id
          })
          // 強制表格重新繪製，即時更新內容
          this.$refs.productTable.refresh()
        } else {
          // 編輯商品
          const { data } = await this.axios.patch('/products/' + this.form._id, fd, {
            // 驗證是否有管理員權限
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          // 取 form 裡面的 index 可修改陣列內的內容
          this.products[this.form.index] = {
            name: this.form.name,
            price: this.form.price,
            author: this.form.author,
            description: this.form.description,
            authorDescription: this.form.authorDescription,
            category: this.form.category,
            sell: this.form.sell,
            recommend: this.form.recommend,
            // data.result 是 axios(api) 回傳的 result
            image: `${process.env.VUE_APP_API}/files/${data.result.image}`,
            _id: this.form._id
          }
          // 強制表格重新繪製，即時更新內容
          this.$refs.productTable.refresh()
        }
        this.$bvModal.hide('modal-product')
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
      const { data } = await this.axios.get('/products/all', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.products = data.result.map(product => {
        // 判斷是否有圖片
        if (product.image) {
          product.image = product.image.map(i => {
            return `${process.env.VUE_APP_API}/files/${i}`
          })
        }
        return product
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>

<style>
.thumbnails{
  height: 10rem;
}
#modal-product .modal-content {
  width: 145%;
}
/* #modal-product .form-control {
  width: 170%;
} */
.custom-control-input:checked {
  /* color: #fff;
  border-color: #eef; */
  background-color: #f5df4d;
}
#product-table.table td {
  width: 8%;
  white-space: pre-line;
}
#product-table.table button {
  width: 4rem;
}
#product-table.table :nth-child(5) {
  width: 25%;
}
#product-table.table :nth-child(6) {
  width: 25%;
}
#product-table.table td p {
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
