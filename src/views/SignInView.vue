<template>
    <div>
        <main>
        <nav-bar-view></nav-bar-view>
        <div class="row justify-content-center loginInForm" style="min-height: calc(80vh);">
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
                        Don't have an account? Click here to <router-link to="/sign_up">Sign up</router-link>
                    </div>
                    <button class="btn btn-primary">Sign in</button>
                </form>
            </div>
        </div>
        <footer-view class="el-footer"></footer-view>
        </main>
    </div>

</template>

  <script>
//   import axios from 'axios';
  import NavBarView from '@/components/NavBarView.vue'
  import axios from '../axios'; // 导入自定义的 Axios 实例
  import FooterView from '@/components/FooterView.vue'
//   import { ref } from 'vue';
  
  export default {

    components: {NavBarView, FooterView},
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
                        // alert(res.data.msg);
                        this.$message.error(res.data.msg);
                    } else {
                        // 登录成功
                        // 保存 token
                        const token = res.data.data.token; // token 存在于响应数据中
                        localStorage.setItem('token', token); // 保存 token
                        // 保存 用户id
                        const userId = res.data.data.id; // 用户id 存在于响应数据中
                        localStorage.setItem('userId', userId); // 保存 用户id
                        // 保存 用户名
                        const username = res.data.data.username; // 用户名 存在于响应数据中
                        localStorage.setItem('username', username); // 保存 用户名

                        // 设置20小时的有效期(对应后端的token有效期)
                        const expire = res.data.data.expireTime * 1000;
                        setTimeout(() => {
                            localStorage.removeItem('token', '');
                            localStorage.removeItem('userId', '');
                            localStorage.removeItem('username', '');
                            console.log('超出有效期,移除token,userId,username');
                        }, expire)

                        // 跳转到首页
                        console.log('登陆成功! 跳转到首页');
                        // this.$router.push('/home');
                        this.$router.push({ name:'home'}); //还可以携带参数跳转到首页，可根据id来选择展示右上角图标
                        this.$message.success("Welcome to Tiktok Mall !")
                    }
                }
            ).catch((error) => {
                console.error('请求错误:', error);
                this.$message.error('请求错误:', error);
            });
        }
    }

  };
  </script>
  
  <style>
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .loginInForm {
    padding-top: 20px;
  }
  </style>