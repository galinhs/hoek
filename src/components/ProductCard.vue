<template lang="pug">
b-card.product-card.mx-auto.d-flex.align-items-center
  div.card-img
    img(
      :src="product.image[0]"
    )
  //- b-row.text-center
  //-   b-col(cols="12")
  b-card-body.p-1(
    :title="product.name"
    :sub-title="product.author"
  )
  b-card-text {{ '$'+product.price }}
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
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
    height: 200px;
  }
  #shop .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
