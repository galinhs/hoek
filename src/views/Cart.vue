<template lang="pug">
b-container(fluid)#cart
  b-row.mx-lg-5.mx-md-3
    b-col(cols="12")
      b-table(:items="cart" :fields="fields" ref="table")
        template(#cell(image)="data")
          img.thumbnail(v-if="data.item" :src="data.item.image[0]")
        template(#cell(amount)="data")
          span(v-if="!data.item.edit") {{ data.item.amount }}
          b-form-spinbutton(v-else type="number" v-model.number="data.item.amountModel" :state="data.item.amountModel > 0" size="sm" min="1" max="99" style="width:170px")
        template(#cell(action)="data")
          b-btn(variant="dark" @click="editProduct(data.index)" v-if="!data.item.edit") 修改
          b-btn(variant="white" @click="delProduct(data.index)" v-if="!data.item.edit") 刪除
            b-icon-x
          b-btn(variant="white" @click="submitProduct(data.index)" v-if="data.item.edit")
            b-icon-check-circle
          b-btn(variant="white" @click="cancelProduct(data.index)" v-if="data.item.edit")
            b-icon-x-circle
    b-col.d-flex.justify-content-center(cols="12")
      div.divider
    b-col.mt-4(cols="12")
      h4.text-right 總金額 {{ totalprice }} 元
    b-col(cols="12").mt-5
      b-card(bg-variant="light")
        b-form-group(
          label-cols-lg="3"
          label="訂購資料"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0")
          b-form-group(
            label="姓名 :  "
            label-for="input-receiver"
            label-cols-sm="3"
            label-align-sm="right")
            b-form-input#input-receiver(
              v-model="deliver.receiver"
              type="text"
              placeholder=""
            )
          b-form-group(
            label="手機 :  "
            label-for="input-phone"
            label-cols-sm="3"
            label-align-sm="right"
          )
            b-form-input#input-phone(
              v-model="deliver.phone"
              type="text"
              placeholder=""
            )
          b-form-group(
          label="取件方式 :  "
          label-for="input-delivery"
          label-cols-sm="3"
          label-align-sm="right"
          v-slot="{ delivery }"
          )
            b-form-radio-group#input-delivery(
              class="pt-2"
              v-model="deliver.delivery"
              :options="['店面取貨', '宅配']"
              :aria-describedby="delivery")
          b-form-group(
          label="地址 :  "
          label-for="input-address"
          label-cols-sm="3"
          label-align-sm="right"
          description="若為店面取貨則不需填寫"
          )
            b-form-input#input-address(
            v-model="deliver.address"
            type="text"
            placeholder=""
            )
          b-form-group(
          label="付款方式 :  "
          label-for="input-payment"
          label-cols-sm="3"
          label-align-sm="right"
          class="mb-0"
          v-slot="{ payment }"
          )
            b-form-radio-group#input-payment(
              class="pt-2"
              v-model="deliver.payment"
              :options="['到店付現','貨到付款', '信用卡']"
              :aria-describedby="payment")
      b-col(cols="12").mt-5.d-flex.justify-content-end
        //- 新增購物車刪除購物車商品，登入時也要傳目前使用者購物車內數量
        b-btn.py-2.px-3(variant="dark" @click="checkout") 結帳
  b-row#footer.flex-column.mt-5.pb-4
    Footer
</template>

<script>
import Footer from '@/components/Footer.vue'

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
        phone: '',
        delivery: '',
        address: '',
        payment: '',
        totalprice: ''
      }
    }
  },
  components: {
    Footer
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
        await this.axios.post('/orders/checkout', this.deliver, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '結帳完成'
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
#cart .thumbnail {
  height: 8rem;
}
@media (min-width: 992px) {
  #cart .mx-lg-5 {
    margin-left: 200px !important;
    margin-right: 200px !important;
  }
}
#cart {
  margin-top: 15%;
}
@media (min-width: 768px){
  #cart {
    margin-top: 7%;
  }
}
#cart .btn {
  border-radius: 0;
}
#cart .divider {
  height: 0.1rem;
  width: 100%;
  background: rgb(214, 214, 214);
}
#cart .was-validated .form-control:valid, .form-control .is-valid{
  display: none;
}
#cart .form-control.focus.is-valid{
  box-shadow: none;
}
#cart .was-validated .form-control:valid, .form-control.is-valid {
  border-color: #eee !important;
  padding-right: 0 !important;
  background: none !important;
}
</style>
