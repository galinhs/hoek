<template lang="pug">
  swiper(
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      "rotate": 50,
      "stretch": 0,
      "depth": 100,
      "modifier": 1,
      "slideShadows": true
    }"
    :pagination="true"
    class="mySwiper"
  )
    swiper-slide
      img(src="https://swiperjs.com/demos/images/nature-1.jpg")
    swiper-slide
      img(src="https://swiperjs.com/demos/images/nature-2.jpg")
    swiper-slide
      img(src="https://swiperjs.com/demos/images/nature-3.jpg")
    swiper-slide
      img(src="https://swiperjs.com/demos/images/nature-4.jpg")
    swiper-slide
      img(src="https://swiperjs.com/demos/images/nature-5.jpg")
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/effect-coverflow/effect-coverflow.min.css'
import 'swiper/components/pagination/pagination.min.css'
import './style.css'

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper/core'

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination])

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
