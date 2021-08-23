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
      b-carousel-slide.w-100(
        v-for="(carouselimage, i) in carouselimages"
        :key="i"
        :img-src="carouselimage.src"
        )
        //- template(#img)
          //- img.w-100(:src="carouselimage.src")
  b-row#section02.d-flex.justify-content-center
    b-col.mt-5(cols="12" md="6")
      b-card
        b-row
          b-col(cols="12" md="6")
            b-card-img.w-100(:src="require('../assets/homeX.jpg')")
          b-col(cols="12" md="6")
            b-card-body(title="關於我們")
              b-card-text
                | This is a wider card with supporting text as a natural lead-in to additional content.
                |  This content is a little bit longer.
      b-card.mt-5
        b-row
          b-col(cols="12" md="6")
            b-card-body(title="展覽空間")
              b-card-text
                | This is a wider card with supporting text as a natural lead-in to additional content.
                |  This content is a little bit longer.
          b-col(cols="12" md="6")
            b-card-img#showroom.w-100(:src="require('../assets/home1.jpg')")
      b-card.mt-5
        b-row
          b-col(cols="12" md="6")
            b-card-body(title="展覽空間")
              b-card-text
                | This is a wider card with supporting text as a natural lead-in to additional content.
                |  This content is a little bit longer.
          b-col(cols="12" md="6")
            b-card-img#showroom.w-100(:src="require('../assets/home1.jpg')")
      b-card.mt-5
        b-row
          b-col(cols="12" md="6")
            b-card-body(title="展覽空間")
              b-card-text
                | This is a wider card with supporting text as a natural lead-in to additional content.
                |  This content is a little bit longer.
          b-col(cols="12" md="6")
            b-card-img#showroom.w-100(:src="require('../assets/home1.jpg')")
      b-card.mt-5
        b-row
          b-col(cols="12" md="6")
            b-card-body(title="展覽空間")
              b-card-text
                | This is a wider card with supporting text as a natural lead-in to additional content.
                |  This content is a little bit longer.
          b-col(cols="12" md="6")
            b-card-img#showroom.w-100(:src="require('../assets/home1.jpg')")
</template>

<script>
// import NewProducts from '@/components/NewProducts.vue'

export default {
  name: 'Home',
  // component: {
  //   NewProducts
  // },
  data () {
    return {
      slide: 0,
      sliding: null,
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
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
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
  #home #carousel {
    height: 100vh;
  }
  #home #carousel .carousel-inner {
    height: 100%;
  }
  /* #carousel .carousel-item img{
    object-fit: contain;
  } */
  #home #section01 .carousel-item img:nth-child(2){
    object-fit: cover;
    object-position: 0px -30px;
  }
  #home #section02 .card {
    border: none;
  }
</style>
