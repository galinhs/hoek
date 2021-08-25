<template lang="pug">
b-container(fluid)#exhibitions
  #section01
    b-row
      b-col.text-center.mt-5(cols="12")
        h1.display-5 當季展覽
    //- loading-skeleton
    b-row.mx-md-5(v-if="isLoading")
      //- b-col.d-flex.justify-content-center(cols="12" md="9")
      b-card.border-0(no-body img-left)
        b-skeleton-img(no-aspect card-img="left" width="750px")
      b-card-body.d-flex.flex-column(width="800px")
        b-skeleton.ml-3.mt-5(animation="fade" width="60%")
        b-skeleton.ml-3.mt-1(animation="fade" width="75%")
        b-skeleton.mt-2.ml-3(animation="fade" width="50%")
    b-row.mx-md-5(v-if="!isLoading")
      b-col.mt-2(cols="12" v-for="exhibition in current" :key="exhibition._id")
        b-card
          b-row.h-100
            b-col.h-100.exbox(cols="8")
              router-link(:to="'/exhibitions/'+exhibition._id")
                img.card-img(:src="exhibition.image" :exhibition="exhibition")
            b-col.d-flex.flex-column.align-self-center(cols="4")
              router-link(:to="'/exhibitions/'+exhibition._id")
                h1.ml-3(:exhibition="exhibition") {{ exhibition.name }}
              h6.ml-3.text-muted {{ exhibition.artist }}
              p.ml-3.text-muted.pt-1 {{ exhibition.startDate }} - {{ exhibition.endDate }}
  #section02
    b-row.mx-md-5
      b-col.text-center.mt-5(cols="12")
        h2 歷年展覽
      //- loading-skeleton
    b-row.mx-md-5(v-if="isLoading")
      //- b-col.d-flex.justify-content-center(cols="12" md="9")
      b-card.border-0(no-body img-left)
        b-skeleton-img(no-aspect card-img="left" width="750px")
      b-card-body.d-flex.flex-column(width="800px")
        b-skeleton.ml-3.mt-5(animation="fade" width="60%")
        b-skeleton.ml-3.mt-1(animation="fade" width="75%")
        b-skeleton.mt-2.ml-3(animation="fade" width="50%")
    b-row.mx-md-5
      b-col.mt-3(cols="12" md="6" v-for="exhibition in past" :key="exhibition._id" v-if="!isLoading")
        b-card
          b-row.h-100
            b-col.h-100.exbox(cols="8")
              router-link(:to="'/exhibitions/'+exhibition._id")
                img.card-img(:src="exhibition.image")
            b-col(cols="4")
              div.mt-4
                router-link(:to="'/exhibitions/'+exhibition._id")
                  h3.text-monospace {{ exhibition.name }}
                p.text-monospace.text-muted {{ exhibition.artist }}
                p.text-muted.mb-0.pt-1.fw-bolder {{ exhibition.startDate }} - {{ exhibition.endDate }}
  b-row#footer.flex-column.mt-5.pb-4
    Footer
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  data () {
    return {
      exhibitions: [],
      isLoading: false
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
      this.isLoading = true
      const { data } = await this.axios.get('/exhibitions/all')
      this.exhibitions = data.result.map(exhibition => {
        // 判斷是否有圖片
        if (exhibition.image) {
          exhibition.image = `${process.env.VUE_APP_API}/files/${exhibition.image}`
        }
        exhibition.startDate = new Date(exhibition.startDate).toUTCString().slice(5, 12)
        exhibition.endDate = new Date(exhibition.endDate).toUTCString().slice(5, 16)
        return exhibition
      })
      this.isLoading = false
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
    /* transform:scale(1,1); */
    transition: all 1s ease-out;
  }
  #exhibitions .card-img:hover {
    transform:scale(1.1, 1.1);
  }
  #exhibitions .exbox {
    width: 100%;
    overflow:hidden;
    padding: 0;
  }
  #exhibitions a {
    color: black;
  }
  #exhibitions a:hover {
    text-decoration: none;
  }
  @media (min-width: 768px) {
    #exhibitions .mx-md-5 {
      margin-left: 200px !important;
      margin-right: 200px !important;
    }
  }
</style>
