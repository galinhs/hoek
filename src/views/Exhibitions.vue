<template lang="pug">
b-container(fluid)#exhibitions
  #section01
    b-row
      b-col.text-center.mt-5(cols="12")
        h2 當季展覽
    b-row.mx-md-5
      b-col.mt-2(cols="12" v-for="exhibition in current" :key="exhibition._id")
        b-card
          b-row.h-100
            b-col.h-100(cols="8")
              router-link(:to="'/exhibitions/'+exhibition._id")
                img.card-img(:src="exhibition.image" :exhibition="exhibition")
            b-col.d-flex.flex-column.align-self-center(cols="4")
              router-link(:to="'/exhibitions/'+exhibition._id")
                h2(:exhibition="exhibition") {{ exhibition.name }}
              h6.text-muted {{ exhibition.artist }}
              p.text-muted.pt-1 {{ exhibition.startDate }} - {{ exhibition.endDate }}
  #section02
    b-row.mx-md-5
      b-col.text-center.mt-5(cols="12")
        h2 歷年展覽
      b-col.mt-3(cols="12" md="6" v-for="exhibition in past" :key="exhibition._id")
        b-card
          b-row.h-100
            b-col.h-100(cols="8")
              router-link(:to="'/exhibitions/'+exhibition._id")
                img.card-img(:src="exhibition.image")
            b-col(cols="4")
              div
                router-link(:to="'/exhibitions/'+exhibition._id")
                  h4.text-monospace {{ exhibition.name }}
                p.text-monospace.text-muted {{ exhibition.artist }}
                p.text-muted.mb-0.pt-1 {{ exhibition.startDate }}
                p.text-muted  - {{ exhibition.endDate }}
  b-row#footer.flex-column.mt-5.pb-4
    Footer
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  data () {
    return {
      exhibitions: []
    }
  },
  components: {
    Footer
  },
  computed: {
    current () {
      return this.exhibitions.filter(ex => {
        // console.log(ex)
        return ex.current === true
      })
    },
    past () {
      return this.exhibitions.filter(ex => {
        return ex.current === false
      })
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/exhibitions/all')
      this.exhibitions = data.result.map(exhibition => {
        // 判斷是否有圖片
        if (exhibition.image) {
          exhibition.image = `${process.env.VUE_APP_API}/files/${exhibition.image}`
        }
        exhibition.startDate = new Date(exhibition.startDate).toUTCString().slice(5, 16)
        exhibition.endDate = new Date(exhibition.endDate).toUTCString().slice(5, 16)
        return exhibition
      })
    } catch (error) {
      // console.log(error)
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
  #exhibitions {
    margin-top: 7%;
  }
  #exhibitions #section01 .card {
    height: 48vh;
    border: none;
  }
  #exhibitions #section02 .card {
    height: 35vh;
    border: none;
  }
  #exhibitions .card-img {
    height: 100%;
    object-fit: cover;
    border-radius: none;
  }
  #exhibitions a {
    color: black;
  }
  #exhibitions a:hover {
    text-decoration: none;
  }
  #exhibitions .mx-md-5 {
    margin-left: 200px !important;
    margin-right: 200px !important;
  }
</style>
