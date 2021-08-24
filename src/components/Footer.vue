<template lang="pug">
b-row.my-5.pt-1.mx-0.d-flex.justify-content-center
  b-col(cols="12" md="4").px-0.text-center.d-flex.flex-column
    router-link(to='/')
      img(:src="require('../assets/logo.png')" height="48")
    div.mb-4
      b-btn(variant="transparent")
        b-icon-facebook
      b-btn(variant="transparent")
        b-icon-twitter
      b-btn(variant="transparent")
        b-icon-instagram
  b-col(cols="6" md="4").px-0.text-center.d-flex.justify-content-center.flex-column
    h5.mb-3.title 關於我們
    //- div.my-3.divider
    p 門市資訊
    p 隱私權宣告
    p 服務條款
  b-col(cols="6" md="4").px-0.text-center
    h5.mb-3.title 購物須知
    //- div.my-3.divider
    p 購物流程
    p 退/換貨
  b-row.mt-3
    b-col(cols="12")
      div.mt-3.learnhr.text-center
        p.pt-3 &copy;2021 本站商品及內容僅作為學習使用
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
  #footer {
    background: #efefef;
  }
  #footer .title {
    font-weight: 800;
  }
  #footer .divider {
    height: 0.2rem;
    width: 5rem;
    background: rgb(0, 0, 0);
  }
  #footer .learnhr {
    height: 0.2rem;
    width: 25rem;
    background: rgb(0, 0, 0);
  }
</style>
