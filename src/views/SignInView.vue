<template>
    <div>
        <nav-bar-view></nav-bar-view>
        <div class="row justify-content-center">
            <div class="col-4">
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email<span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="email" name="email" v-model="loginForm.email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password<span class="text-danger">*</span></label>
                        <input type="password" class="form-control" id="password" name="password" v-model="loginForm.password">
                    </div>
                    <div class="mb-3">
                        Don't have an account? Click here to <router-link to="/signup">Sign up</router-link>
                    </div>
                    <button class="btn btn-primary">Sign in</button>
                </form>
            </div>
        </div>
    </div>

</template>

  <script>
//   import axios from 'axios';
  import NavBarView from '@/components/NavBarView.vue'
  import axios from '../axios'; // 导入自定义的 Axios 实例
//   import { ref } from 'vue';
  
  export default {

    components: {NavBarView},
    // setup() {
    //   const loginForm = ref({
    //     email: '',
    //     password: ''
    //   });
      
    //   const submitForm = async () => {
    //     try {
    //       const response = await axios.post('/buyer/user/login', loginForm.value);
    //       console.log('响应:', response.data);
    //       // 处理成功逻辑，比如跳转或显示成功消息
    //       if(response.data.code === 0){ //账号不存在或者密码错误
    //         alert(response.data.msg);
    //       }
    //       else{
    //         //登陆成功
    //         //保存token
    //         const token = response.data.data.token; // token 存在于响应数据中
    //         localStorage.setItem('token', token); // 保存 token
    //         //跳转到首页
    //         // window.location.href = '/home';

    //       }
    //     } catch (error) {
    //       console.error('请求错误:', error);
    //     }
    //   };
  
    //   return {
    //     loginForm,
    //     submitForm,
    //   };
    // }


    data() {
        return {
            loginForm: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        submitForm() {
            axios.post('/buyer/user/login', this.loginForm).then(
                (res) => {
                    console.log('响应:', res.data);
                    if (res.data.code === 0) { // 账号不存在或者密码错误
                        alert(res.data.msg);
                    } else {
                        // 登录成功
                        // 保存 token
                        const token = res.data.data.token; // token 存在于响应数据中
                        localStorage.setItem('token', token); // 保存 token
                        // 跳转到首页
                        console.log('跳转到首页');
                        // this.$router.push('/home');
                        this.$router.push({ name:'home'}); //还可以携带参数跳转到首页，可根据id来选择展示右上角图标
                    }
                }
            ).catch((error) => {
                console.error('请求错误:', error);
            });
        }
    }

  };
  </script>
  
  <style>
  </style>