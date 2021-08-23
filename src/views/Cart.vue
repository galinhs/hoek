<template lang="pug">
b-container#cart
  b-row
    b-col(cols="12")
      b-table(:items="cart" :fields="fields" ref="table")
        template(#cell(image)="data")
          img(v-if="data.item" :src="data.item.image[0]")
        template(#cell(amount)="data")
          span(v-if="!data.item.edit") {{ data.item.amount }}
          b-form-input(v-else type="number" v-model.number="data.item.amountModel" :state="data.item.amountModel > 0")
        template(#cell(action)="data")
          b-btn(variant="dark" @click="editProduct(data.index)" v-if="!data.item.edit") 修改
          b-btn(variant="white" @click="delProduct(data.index)" v-if="!data.item.edit") 刪除
            b-icon-x
          b-btn(variant="white" @click="submitProduct(data.index)" v-if="data.item.edit")
            b-icon-check-circle
          b-btn(variant="white" @click="cancelProduct(data.index)" v-if="data.item.edit")
            b-icon-x-circle
    b-col(cols="12")
      b-form-group(
        label="姓名"
        label-for="input-receiver"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
      )
        b-form-input#input-receiver(
          v-model="deliver.receiver"
          type="text"
          placeholder="姓名"
        )
      b-form-group(
        label="電話"
        label-for="input-phone"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
      )
        b-form-input#input-phone(
          v-model="deliver.phone"
          type="text"
          placeholder="電話"
        )
      b-form-group(
        label="取件方式"
        label-for="input-delivery"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
      )
        b-form-input#input-delivery(
          v-model="deliver.delivery"
          type="text"
          placeholder="取件方式"
        )
      b-form-group(
        label="地址"
        label-for="input-address"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
      )
        b-form-input#input-address(
          v-model="deliver.address"
          type="text"
          placeholder="地址"
        )
      b-form-group(
        label="付款方式"
        label-for="input-payment"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="7"
      )
        b-form-input#input-payment(
          v-model="deliver.payment"
          type="text"
          placeholder="付款方式"
        )
      b-col(cols="12")
        h4.text-right 總金額 NT$ {{ totalprice }} 元
      //- 新增購物車刪除購物車商品，登入時也要傳目前使用者購物車內數量
      b-btn(variant="dark" @click="checkout") 結帳
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      cart: [],
      fields: [
        {
          key: 'image',
          label: ''
        },
        {
          key: 'name',
          label: '商品明細'
        },
        {
          key: 'amount',
          label: '數量'
        },
        {
          key: 'price',
          label: '價格'
        },
        {
          key: 'action',
          label: '變更明細'
        }
      ],
      deliver: {
        receiver: '',
        phone: 0,
        delivery: '',
        address: '',
        payment: '',
        totalPrice: ''
      }
    }
  },
  computed: {
    totalprice () {
      return this.cart.length === 0 ? 0 : this.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.amount * currentValue.price), 0)
    }
  },
  methods: {
    editProduct (index) {
      this.cart[index].edit = true
    },
    async delProduct (index) {
      try {
        await this.axios.patch('/users/cart', { product: this.cart[index]._id, amount: 0 }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.cart.splice(index, 1)
        this.$refs.table.refresh()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '刪除商品失敗'
        })
      }
    },
    async submitProduct (index) {
      try {
        await this.axios.patch('/users/cart', { product: this.cart[index]._id, amount: this.cart[index].amountModel }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.cart[index].amount = this.cart[index].amountModel
        this.cart[index].edit = false
        this.$refs.table.refresh()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '修改商品失敗'
        })
      }
    },
    cancelProduct (index) {
      this.cart[index].edit = false
      this.cart[index].amountModel = this.cart[index].amount
    },
    async checkout () {
      try {
        const fd = new FormData()
        for (const key in this.deliver) {
          fd.append(key, this.deliver[key])
        }
        await this.axios.post('/orders/checkout', { fd }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$router.push('/orders')
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '結帳失敗'
        })
      }
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/users/cart', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      // this.$store.getters.getCart
      this.cart = data.result.map(item => {
        /* 原本除了 id 跟 amount 其餘資料都在 product 內，使用其餘運算值攤平拉出為同一層 */
        item = { ...item.product, amount: item.amount }
        item.image = item.image.map(i => {
          return `${process.env.VUE_APP_API}/files/${i}`
        })
        // item.image = `${process.env.VUE_APP_API}/files/${item.image}`
        item.edit = false
        item.amountModel = item.amount
        return item
      })
    } catch (error) {
      console.log(error)
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得購物車失敗'
      })
    }
  }
}
</script>

<style>
#cart {
  margin-top: 7%;
}
#cart img {
  height: 8rem;
}
</style>
