<template lang="pug">
b-container(fluid)#orders
  b-table(:items="orders" :fields="fields")
    template(#cell(products)="data")
      ul.formwidth.px-0
        li(v-for="product in data.item.products") {{ product.product.name }} * {{ product.amount }}
    template(#cell(details)="data")
      ul.formwidth.px-0
        li {{ data.item.receiver }}
        li {{ data.item.phone }}
        li {{ data.item.delivery }}
        li {{ data.item.payment }}
  b-row#footer.flex-column.mt-5.pb-4.fixed-bottom
    Footer
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: 'Orders',
  data () {
    return {
      orders: [],
      fields: [
        {
          key: '_id',
          label: '訂單編號'
        },
        {
          key: 'date',
          label: '日期'
        },
        {
          key: 'products',
          label: '商品'
        },
        {
          key: 'details',
          label: '訂購資料'
        }
      ]
    }
  },
  components: {
    Footer
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/orders', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.orders = data.result.map(order => {
        order.date = new Date(order.date).toLocaleString()
        return order
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得訂單失敗'
      })
    }
  }
}
</script>

<style>
  #orders {
    margin-top: 7%;
  }
  @media (min-width: 768px) {
    #orders table {
      width: 80%;
      margin: auto;
    }
    /* #orders .formwidth {
      width: 150px;
    } */
  }
</style>
