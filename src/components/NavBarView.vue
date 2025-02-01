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
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" @click="getCategoryList">
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
      <div class="ms-3 cart-icon">
        <router-link to="/shopping_cart">
          <i class="fa-solid fa-cart-shopping fa-xl"></i>
          <span class="cart-badge" v-if="cartNum > 0">{{ cartNum }}</span>
        </router-link>
      </div>

      <!-- 用户处于登录状态则显示这个 -->
      <!-- <div class="ms-3" v-if="userId != null"> 
        <i class="fa-solid fa-user fa-xl"></i>
      </div> -->

      <!-- 用户处于登录状态则显示这个 -->
      <div class="dropdown" v-if="userId != null">
        <div class="ms-3 logo_username" data-bs-toggle="dropdown" >
          <i class="fa-solid fa-user fa-xl"></i>
          <span>{{ username }}</span>
        </div>
        <ul class="dropdown-menu user-dropdown-menu">
          <li><a class="dropdown-item user-dropdown-item" href="#">Order</a ></li>
          <li><a class="dropdown-item user-dropdown-item" href=" " @click="logout">Logout</a ></li>
        </ul>
      </div>

      <!-- 用户未登录时 -->
      <div class="ms-3" v-else>
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

  props: {
    cartNum: {
      type: Number,
      default: 0
    }, 
  },

  data() {
    return {
      search: '', //搜索框
      category_ls: [],
      userId: null,
      username: null,
    }
  },

  mounted() {

    this.userId = localStorage.getItem('userId'); // 从 localStorage 获取 userId
    console.log("读取userId: ", this.userId);
    this.username = localStorage.getItem('username'); // 从 localStorage 获取 username
    console.log("读取username: ", this.username);
  },

  methods: {
    getCategoryList() {
      axios.get("/buyer/category/list").then((result) => {
          console.log("返回分类列表: ", result.data.data);
          this.category_ls  = result.data.data;
      }).catch((error) => {
          console.error('错误:', error);
      });
    },

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

    //用户退出登录
    // logout() {
    //   axios.post('/buyer/user/logout').then((res) => {
    //           console.log('退出登录:', res.data);
    //           localStorage.clear(); // 从 localStorage 删除 token, userId, username
    //           this.$router.push({ name: 'sign_in' });
    //           this.$message.warning("退出登录");
    //       }).catch((error) => {
    //         console.error('退出登录失败:', error);
    //       });
    // }
    logout(){
      this.$emit('user::logout');
    }

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


.user-dropdown-menu {
  min-width: 80px; /* 设置最小宽度 */
  max-width: 100px; /* 设置最大宽度 */
}

.user-dropdown-item {
  width: 100%; /* 确保每个下拉项占据整个下拉菜单的宽度 */
  padding: 0.5rem 1rem; /* 可选：调整内边距 */
}

.cart-icon .fa-cart-shopping {
  color: #000000; /* 初始颜色 */
  transition: color 0.3s ease; /* 添加过渡效果 */
}

.cart-icon .fa-cart-shopping:hover {
  color:  #0D6EFD; /* 悬停颜色 */
}

.logo_username {
  color: #000000; /* 初始颜色 */
  transition: color 0.3s ease; /* 添加过渡效果 */

  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
  min-width: 80px; /* 设置最小宽度 */
  max-width: 100px; /* 设置最大宽度 */
}

.logo_username:hover {
  color:  #0D6EFD; /* 悬停颜色 */
}

.logo_username i {
  margin-right: 0.3rem; /* 设置图标和文本之间的间隙 */
}

.logo_username span {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出的文本 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.cart-badge {
  position: absolute;
  top: 10.5%;
  right: 5.8%;
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
</style>