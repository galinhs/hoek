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
            h5 Find your own Book in Hoek
          //-   b-btn(variant="transparent" @click="scrolldown")
  b-row#section02.d-flex.justify-content-center
    //- b-col.mt-5(cols="12" md="6")
    b-card.d-flex.flex-column
      b-row
        b-col(cols="12" md="6")
          //- div.d-flex.justify-content-end.box1
          div.box1
            b-img.aboutimg(:src="require('../assets/home7.jpg')")
        b-col(cols="12" md="6").p-0
          b-card-body.text1(title="Hoek")
            b-card-text.mt-4
              h3.mt-2 源於丹麥語中「角落」一詞
              h3 這裡有一些展覽，一些書籍選物
              h3 希望每個過客都能探索到在角落駐足的理由
    b-card.d-flex.flex-column
      b-row
        b-col(cols="12" md="6")
          b-card-body.text2(title="營業資訊")
            b-card-text.mt-4
              h4.mt-2 MON – SAT 11:00 – 20:00
              h4.mt-2 新北市泰山區貴子里致遠新村55之1號
        b-col(cols="12" md="6")
          div
            b-img.showroomimg(:src="require('../assets/home6.jpg')")
  b-row.d-flex.justify-content-center.mt-5
    b-col.mt-3.text-center(cols="12")
      h2.display-4 推薦新品
    b-col(cols="12" md="9").mx-auto
      b-row#section03.mx-auto
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
      b-btn#btnaa(variant="transparent" to='/shop') 瀏覽商品
  b-row#footer.flex-column.mt-5.pb-4
    Footer
</template>

<script>
// import NewProducts from '@/components/NewProducts.vue'
import Footer from '@/components/Footer.vue'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
    scrollAnimation () {
      gsap.to('.aboutimg', {
        scrollTrigger: {
          trigger: '.aboutimg',
          start: 'top 0%',
          end: '+=500',
          scrub: 1
          // markers: true
        },
        delay: 0.2,
        y: -200
        // backgroundPosition: '50% 100%'
        // ease: 'none'
      })
      gsap.to('.showroomimg', {
        scrollTrigger: {
          trigger: '.showroomimg',
          start: 'top 0%',
          end: '+=500',
          scrub: 0.5
          // markers: true
        },
        delay: 0.2,
        y: -180
        // backgroundPosition: '50% 100%'
        // ease: 'none'
      })
      gsap.to('#section01', {
        scrollTrigger: {
          trigger: '#section01',
          start: 'top 0%',
          end: 'bottom 50%',
          scrub: 0.2
          // markers: true
        },
        y: -60,
        backgroundPosition: '50% 100%'
        // ease: 'none'
      })
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
    this.scrollAnimation()
  }
}
</script>

<style></style>
