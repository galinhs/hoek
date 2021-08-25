<template lang="pug">
b-container#shop
  b-row.mt-5
    b-col.d-flex.justify-content-center(cols="12" md="3")
      b-list-group.list-group.list-group-flush(variant="dark")
        b-list-group-item(@click="category = ''" :active="category === ''" href="#") 全部商品
        b-list-group-item(@click="category = '攝影書'" :active="category === '攝影書'" href="#") 攝影書
        b-list-group-item(@click="category = '雜誌'" :active="category === '雜誌'" href="#") 雜誌
        b-list-group-item(@click="category = '畫集'" :active="category === '畫集'" href="#") 畫集
        b-list-group-item(@click="category = '其他'" :active="category === '其他'" href="#") 其他
    //- loading-skeleton
    b-col(cols="12" md="9" v-if="isLoading")
      b-row
        b-col(cols="6" md="4" v-for="product in products")
          b-card
            b-row
              b-col(cols="12")
                b-skeleton-img
            b-row.text-center
              b-col.mt-3(cols="12")
                b-skeleton.ml-3(animation="fade" width="85%")
                b-skeleton.ml-5(animation="fade" width="55%")
                b-skeleton.mt-2.ml-5(animation="fade" width="40%")
    b-col(cols="12" md="9" v-if="!isLoading")
      b-row
        b-col.d-flex.flex-column.mb-3(cols="6" md="4" v-for="product in filtered" :key="product._id")
          ProductCard.border-0(:product="product")
</template>

<script>
// @ 代表 src 標籤
import ProductCard from '@/components/ProductCard.vue'

export default {
  name: 'Shop',
  data () {
    return {
      products: [],
      category: '',
      isLoading: false
    }
  },
  components: {
    ProductCard
  },
  computed: {
    filtered () {
      return this.products.filter(p => {
        // console.log(p)
        return p.category.includes(this.category)
      })
    }
  },
  methods: {
    async getProducts () {
      try {
        this.isLoading = true
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
        this.isLoading = false
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
  #shop {
    margin-top: 7%;
  }
  #shop .list-group {
    width: 12rem;
  }
  #shop .list-group-item.active{
    background: rgba(0, 0, 0, 0.2);
    border: none;
  }
  #shop a {
    color: black;
  }
  #shop a:hover {
    text-decoration: none;
  }
</style>
