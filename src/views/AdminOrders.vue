<template lang="pug">
b-container(fluid).mt-5#adminorders
  b-row.ml-2
    //- b-btn.text-center(variant='dark')
  b-table.mt-3(:items="orders" :fields="fields")
    template(#cell(account)="data")
      p {{ data.item.user.account }}
    template(#cell(products)="data")
      ul.px-0
        li(v-for="product in data.item.products") {{ product.product.name }} * {{ product.amount }}
    template(#cell(details)="data")
      ul.formwidth.px-0
        li {{ data.item.receiver }}
        li {{ data.item.phone }}
        li {{ data.item.delivery }}
        li {{ data.item.payment }}
</template>

<script>
export default {
  name: 'AdminOrders',
  data () {
    return {
      orders: [],
      fields: [
        {
          key: 'account',
          label: '會員帳號'
        },
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
  async mounted () {
    try {
      const { data } = await this.axios.get('/orders/all', {
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
