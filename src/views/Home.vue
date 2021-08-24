<template lang="pug">
b-container#home(fluid)
  //- div#cover
  b-row#section01
    b-carousel#carousel(
      v-model="slide"
      :interval="5000"
      controls
      fade
      background="#fff"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    )
      b-carousel-slide.w-100(v-for="(carouselimage, i) in carouselimages" :key="i")
        template(#img)
          b-img.w-100(
            fluid-grow
            :src="carouselimage.src"
          )
          div.carousel-txt
            h5 Find your own Book in Hoek.
          //-   b-btn(variant="transparent" @click="scrolldown")
  b-row#section02.d-flex.justify-content-center
    //- b-col.mt-5(cols="12" md="6")
    b-card.d-flex.flex-column
      b-row
        b-col(cols="12" md="6")
          div.d-flex.justify-content-end
            b-img.aboutimg(:src="require('../assets/homeX.jpg')")
        b-col(cols="12" md="6")
          b-card-body.text(title="Hoek")
            b-card-text
              p.mt-2 Hoek，源於丹麥語中「角落」一詞
              p 有一些展覽，一些書籍選物
              p 希望每個過客有被靈感激發慰留願為其在此駐足
              p 探索到一本願意為其在角落駐足的書
    b-card.d-flex.flex-column
      b-row
        b-col(cols="12" md="6")
          b-card-body.text.right(title="營業資訊")
            b-card-text
              p.mt-2 MON – SAT 11:00 – 20:00
              p 新北市泰山區貴子里致遠新村55之1號
        b-col(cols="12" md="6")
          div
            b-img.aboutimg(:src="require('../assets/homeX.jpg')")
  b-row#section03.d-flex.justify-content-center
    b-col.mt-3.text-center(cols="12")
      h2 推薦新品
    b-col.mt-3(cols="6" md="3" v-for="(products, i) in recommend" v-if="i<8" :key="products._id")
      router-link(:to="'/product/'+products._id")
        b-card.mx-auto.d-flex.align-items-center.product-card
          div.card-img
            img(
              :src="products.image[0]"
            )
          b-card-body.p-1(
            :title="products.name"
            :sub-title="products.author"
          )
    b-col.text-center(cols="12")
      b-btn(variant="transparent" to='/shop') 瀏覽商品
  b-row#footer.flex-column.mt-5.pb-4
    Footer
</template>

<script>
// import NewProducts from '@/components/NewProducts.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Footer
    // NewProducts
  },
  data () {
    return {
      slide: 0,
      sliding: null,
      products: [],
      carouselimages: [
        {
          src: require('../assets/home1.jpg')
        },
        {
          src: require('../assets/home2.jpg')
        },
        {
          src: require('../assets/home3.jpg')
        },
        {
          src: require('../assets/home4.jpg')
        },
        {
          src: require('../assets/home5.jpg')
        }
      ]
    }
  },
  computed: {
    recommend () {
      return this.products.filter(p => {
        // console.log(p)
        return p.recommend === true
      })
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    async getProducts () {
      try {
        const { data } = await this.axios.get('/products')
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
  },
  async mounted () {
    this.getProducts()
  }
}
</script>

<style>
  #home #cover {
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    width: 100%;
    height: 100vh;
  }
  /* #home #carousel {
    height: 100vh;
  } */
  #home #carousel .carousel-inner {
    height: 90%;
  }
  /* #carousel .carousel-item img{
    object-fit: contain;
  } */
  #home #section01 .carousel-item img:nth-child(2){
    object-fit: cover;
    object-position: 0px -30px;
  }
  #home #section01 .carousel-txt {
    position: absolute;
    right: 21%;
    top: 70%;
    z-index: 15;
  }
  #home #section01 h5 {
    font-size: 3rem;
    color: rgb(40, 40, 40);
    text-shadow: rgb(255, 255, 255) 1px 1px 3px;
    /* background: rgb(255, 255, 255); */
  }
  #home #section02 .card {
    border: none;
  }
  #home #section02 .text {
    width: 500px;
  }
  #home #section02 .right {
    float: right;
  }
  #home #section02 .aboutimg {
    width: 75%;
  }
  #home #section03 .product-card {
    /* 換行 */
    white-space: pre-line;
    max-width: 20rem;
    width: 100%;
    border: none;
  }
  #home #section03 .card-title {
    font-size: 1.2rem;
  }
  #home #section03 .card-img {
    height: 15rem;
  }
  #home #section03 .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #home #section03 .btn{
    border-radius: 0;
    border: 0.5px solid rgb(0, 0, 0);
  }
</style>
