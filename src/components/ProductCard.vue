<template lang="pug">
b-card.product-card.mx-auto.h-100.mb-auto(no-body)
  router-link(:to="'/product/'+product._id")
    div.card-img
      img(
        :src="product.image[0]"
      )
  b-card-body.pt-3.pb-0.mb-auto.text-center
    router-link(:to="'/product/'+product._id")
      b-card-title {{ product.name }}
      b-card-sub-title {{ product.author }}
  b-card-text.mx-auto.mb-1 {{ '$'+product.price }}
  b-btn.ml-auto(variant="transparent" @click="addcart(product._id)")
    b-icon-cart-fill
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    async addcart (id) {
      if (this.$store.state.jwt.token.length === 0) {
        this.$swal({
          icon: 'error',
          title: '請先登入'
        })
        return
      }
      try {
        await this.axios.post('/users/cart', { product: id, amount: 1 }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '已加入購物車'
        })
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '加入購物車失敗'
        })
      }
    }
  }
}
</script>

<style>
  #shop .product-card {
    /* 換行 */
    white-space: pre-line;
    max-width: 20rem;
    width: 100%;
  }
  #shop .card-title {
    font-size: 1.2rem;
  }
  #shop .card-img {
    height: 15rem;
  }
  #shop .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #shop .btnposition {
    top: -15px;
  }
</style>
