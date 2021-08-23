<template lang="pug">
b-container(fluid)#admin
  //- b-button(v-b-toggle.sidebar-no-header)
  b-row.d-flex.justify-content-center
    b-col(cols="10")
      b-nav(tabs justified)
        //- b-nav-item(to='/admin/mainpage' exact exact-active-class="active")
        //-   b-icon-house-door-fill
        //-   | &emsp;首頁管理
        b-nav-item(to='/admin/exhibitions' exact exact-active-class="active")
          b-icon-image-alt
          | &emsp;展覽管理
        b-nav-item(to='/admin/products' exact exact-active-class="active")
          b-icon-shop
          | &emsp;商品管理
        b-nav-item(to='/admin/orders' exact exact-active-class="active")
          b-icon-clipboard-check
          | &emsp;訂單管理
    b-col(cols="10").d-flex.justify-content-center
      router-view
</template>

<style>
  #admin {
    margin-top: 7%;
  }
  #admin .b-icon {
    font-size: 2rem;
  }
  #admin .nav-item a {
    /* width: 9rem; */
    /* line-height: 3rem; */
    text-align: center;
    color: #333;
  }
  #admin .nav-item :hover {
    /* background-color: #f1ebc2; */
    /* border: 1px solid #f1ebc2; */
    /* box-sizing: content-box; */
    color: rgb(116, 116, 116);
  }
  #admin .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
  color: black;
  background-color: #EEE;
  /* border: 1px solid #f5df4d; */
  box-sizing: content-box;
  padding: 8px 0;
  /* justify-content: space-between; */
  }
</style>
