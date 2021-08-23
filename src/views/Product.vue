<template lang="pug">
b-container#product
  b-overlay(:show="!sell")
    //- b-row.mt-5
    //-   b-col(cols="6")
    //-     b-breadcrumb(v-if="links[3].text" :items="links" large)
    b-row.d-flex.justify-content-center
      b-col.mt-3(cols="10" md="7")
        b-carousel#carousel(
          v-model="slide"
          :interval="3000"
          controls
          fade
          background="#fff"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        )
          b-carousel-slide.w-100(
            v-for="(productimage, i) in images"
            :key="i"
            :img-src="productimage"
          )
      b-col.d-flex.justify-content-md-center.align-items-md-center.mt-3(cols="12" md="5")
        b-row.d-flex.justify-content-md-center.ml-3.mt-4
          b-col(cols="12").d-flex.justify-content-md-center.flex-column
            h2 {{ name }}
            h4.ml-3 ${{ price }}
            b-form-spinbutton(type="number" v-model.number="amount" :state="amountstate" min="1" max="99")
              //- b-form-input(type="number" v-model.number="amount" :state="amountstate")
            b-btn.mt-3(variant="dark" @click="addcart")
              | 加入購物車
    hr.my-3
    b-row.d-flex.justify-content-md-center.mt-4.mx-3
      b-col(cols="12" md="7")
        h4.mt-5.mb-3 內容簡介
        p {{ description }}
    b-row.d-flex.justify-content-md-center.mx-3
      b-col(cols="12" md="7")
        h4.my-3 作者簡介
        p {{ authorDescription }}
    template(#overlay)
      h1 已下架
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      name: '',
      price: '',
      author: '',
      description: '',
      authorDescription: '',
      category: '',
      images: [],
      sell: true,
      amount: 0,
      links: [
        {
          text: '首頁',
          disabled: false,
          to: '/'
        },
        {
          text: '商店',
          disabled: false,
          to: '/shop',
          exact: true
        },
        {
          text: 'category',
          disabled: false,
          to: '/:category',
          exact: true
        },
        {
          text: '',
          disabled: true
        }
      ],
      slide: 0,
      sliding: null
    }
  },
  computed: {
    amountstate () {
      return this.amount === 0 ? null : this.amount > 0
    }
  },
  methods: {
    setRoute () {
      const item = this.data
      this.links[1].text = item.navigation
      this.links[1].to = { name: 'Navigation', params: { navigation: item.navigationRoute } }
      this.links[2].text = this.product.category
      this.links[2].to = { name: 'Category', params: { navigation: item.navigationRoute, category: item.categoryRoute } }
      this.links[3].text = this.product.productName
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    async addcart () {
      if (!this.amountstate) {
        this.$swal({
          icon: 'error',
          title: '請輸入正確數量'
        })
        return
      }
      if (this.$store.state.jwt.token.length === 0) {
        this.$swal({
          icon: 'error',
          title: '請先登入'
        })
        return
      }
      try {
        await this.axios.post('/users/cart', { product: this.$route.params.id, amount: this.amount }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '已加入購物車'
        })
        this.$store.commit('addCart', {
          productName: this.name,
          productId: this.$route.params.id,
          price: this.price,
          image: this.image,
          amount: this.amount
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '加入購物車失敗'
        })
      }
    }
  },
  // 頁面載入時拉資料
  async mounted () {
    try {
      const { data } = await this.axios.get('/products/' + this.$route.params.id)
      this.name = data.result.name
      this.price = data.result.price
      this.author = data.result.author
      this.description = data.result.description
      this.authorDescription = data.result.authorDescription
      this.images = data.result.image.map(i => {
        return `${process.env.VUE_APP_API}/files/${i}`
      })
      // this.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
      this.category = data.result.category
      this.sell = data.result.sell
      document.title = `${this.name}`
    } catch (error) {
      console.log(error)
      this.$router.push('/')
    }
  }
}
</script>

<style>
  #product {
    margin-top: 7%;
  }
  #product input {
    width: 50%;
  }
  #product p {
    white-space: pre-line;
  }
  #product h2 {
    white-space: pre-line;
  }
  #product h4 {
    font-weight: 1000;
  }
  #product .was-validated .form-control:valid, .form-control .is-valid{
    display: none;
  }
  #product #carousel .carousel-item{
    height: 500px;
  }
  #product #carousel .carousel-item img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  #product .form-control.focus.is-valid{
    box-shadow: none;
  }
  #product .was-validated .form-control:valid, .form-control.is-valid {
    border-color: #eee !important;
    padding-right: 0 !important;
    background: none !important;
  }
</style>
