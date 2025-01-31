<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <img class="navbar-brand" href="#" src="@/static/img/tiktok.png" width="100em"/>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><router-link to="/home" class="no-underline black-text">Home</router-link></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </a>
          <ul class="dropdown-menu">
              <li v-for="category in category_ls" :key="category" @click="input2(category.id)"><a class="dropdown-item" href="#">{{ category.name }}</a></li>
            <!-- <li><a class="dropdown-item" href="#">T-shirt</a></li>
            <li><a class="dropdown-item" href="#">Phone</a></li>
            <li><a class="dropdown-item" href="#">Foods</a></li> -->
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" @click="input2(null)">All products</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">About</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="search" @input="input1">
        <button class="btn btn-outline-success" type="submit" @click="button_click">Search</button>
      </form>
      <div class="ms-3">
        <i class="fa-solid fa-cart-shopping fa-xl"></i>
      </div>

      <!-- 用户处于登录状态则显示这个 -->
      <div class="ms-3">
        <i class="fa-solid fa-user fa-xl"></i>
      </div>

      <!-- 用户未登录时 -->
      <div class="ms-3">
        <router-link to="/sign_in">
          <button type="button" class="btn btn-primary">Sign In</button>
        </router-link>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import axios from '../axios'; // 导入自定义的 Axios 实例

export default {
  name: 'NavBarView',
  data() {
    return {
      search: '', //搜索框
      category_ls: [],
    }
  },

  mounted() {
    axios.get("/buyer/category/list").then((result) => {
        console.log("返回分类列表: ", result.data.data);
        this.category_ls  = result.data.data;
    }).catch((error) => {
        console.error('错误:', error);
    });
  },

  methods: {
    //将子组件搜索框的值发送到父组件
    input1() {
      this.$emit('update:search', this.search)
    },

    //点击子组件按钮，通知父组件
    button_click() {
      this.$emit('click::button')
    },

    //将子组件下拉列表的值发送到父组件
    input2(categoryId) {
      this.$emit('update:dropdown', categoryId)
    },
  }
}

</script>


<style>
.no-underline {
  text-decoration: none;
}

.black-text {
  color: #000000A6;
}
</style>