<template lang="pug">
b-container#singleEx(fluid)
  b-row.d-flex.justify-content-center
    b-col.eximg.mt-3(cols="10" md="7")
      //- div
      img.w-100(
        v-for="(eximage, i) in images"
        :key="i"
        :src="eximage"
      )
    b-col.mt-3.text-center(cols="12")
      h1.display-4.mt-3 {{ name }}
    b-col.d-flex.justify-content-center(cols="12")
      div.my-3.divider
    b-col.mt-3.text-center(cols="12")
      h5.mt-3.mb-5.text-muted {{ artist }}
      h6 {{ startDate }} - {{ endDate }}
  b-row.d-flex.justify-content-md-center.mt-4.mx-3
    b-col(cols="12" md="7")
      p.my-3.mx-3 {{ description }}
    b-col.text-center(cols="12")
      h4.mt-5 展覽地點
    b-col.d-flex.justify-content-center(cols="12")
      div.my-1.divider
    b-col.text-center(cols="12")
      h5.mt-2 Hoek
      p MON – SAT 11:00 – 20:00
      p.mb-4
        b-icon-geo-alt-fill
        | &emsp;新北市泰山區貴子里致遠新村55之1號
  b-row.d-flex.justify-content-center
    b-col.p-0.text-center.map(cols="12")
      //- img(:src="require('../assets/map.png')")
      iframe(src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.702152324414!2d121.41729491542732!3d25.044180083967518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a7bed3dc9b59%3A0x57e6439a2db0fa2a!2zMjQzLCBOZXcgVGFpcGVpIENpdHksIFRhaXNoYW4gRGlzdHJpY3QsIOazsOWxseiBt-iok-S4reW_gw!5e0!3m2!1sen!2stw!4v1567655958210!5m2!1sen!2stw"
                  frameborder="0"
                  allowfullscreen="true"
                  width="100%"
                  height="250"
                  class="border-0")
</template>

<script>
export default {
  name: 'singleExhitbition',
  data () {
    return {
      name: '',
      artist: '',
      startDate: '',
      endDate: '',
      description: '',
      images: []
    }
  },
  methods: {
    async getExhibition () {
      try {
        const { data } = await this.axios.get('/exhibitions/' + this.$route.params.id)
        this.name = data.result.name
        this.artist = data.result.artist
        this.startDate = new Date(data.result.startDate).toUTCString().slice(5, 16)
        this.endDate = new Date(data.result.endDate).toUTCString().slice(5, 16)
        this.description = data.result.description
        this.images = data.result.image.map(i => {
          return `${process.env.VUE_APP_API}/files/${i}`
        })
        document.title = `${this.name}`
      } catch (error) {
        console.log(error)
        this.$router.push('/')
      }
    }
  },
  async mounted () {
    this.getExhibition()
  }
}
</script>

<style>
  #singleEx {
    margin-top: 7%;
  }
  #singleEx p {
    white-space: pre-line;
  }
  #singleEx h4 {
    font-weight: 600;
  }
  #singleEx .eximg {
    height: 35rem;
  }
  #singleEx .eximg img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  #singleEx .divider {
    height: 0.2rem;
    width: 5rem;
    background: rgb(0, 0, 0);
  }
  #singleEx .map {
    height: 13rem;
  }
  #singleEx .map img{
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
</style>
