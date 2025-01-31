<template>
    <div>
        <nav-bar-view></nav-bar-view>
        <div class="row justify-content-center">
            <div class="col-4">
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="username" name="username" v-model="registerForm.username">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email<span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="email" name="email" v-model="registerForm.email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password<span class="text-danger">*</span></label>
                        <input type="password" class="form-control" id="password" name="password" v-model="registerForm.password">
                    </div>
                    <div class="mb-3">
                        <label for="confirm_password" class="form-label">Password Confirm<span class="text-danger">*</span></label>
                        <input type="password" class="form-control" id="confirm_password" name="confirm_password" v-model="registerForm.confirm_password">
                    </div>
                    <div class="mb-3">
                        Already have a account, click here to <router-link to="/sign_in">Sign in</router-link>
                    </div>
                    <button class="btn btn-primary">Sign Up</button>
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

    data() {
        return {
            registerForm: {
                username: '',
                email: '',
                password: '',
                confirm_password: ''
            }
        }
    },
    methods: {
        submitForm() {
            axios.post('/buyer/user/register', this.registerForm).then(
                (res) => {
                    console.log('响应:', res.data);
                    if (res.data.code === 0) { 
                        alert(res.data.msg);
                    } else {
                        // 注册成功
                        // 跳转到登录界面
                        console.log('跳转到登录界面');
                        this.$router.push({ name:'sign_in'}); 
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