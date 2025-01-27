<template>
    <div>
        <nav-bar-view></nav-bar-view>
        <div class="row justify-content-center">
            <div class="col-4">
                <form> <!-- method="post" action="/api/user/login" -->
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
                    <button class="btn btn-primary" @click="handleSubmit">Sign in</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import NavBarView from '@/components/NavBarView.vue'
import axios from 'axios'
// import { reactive } from 'vue';

export default {
    components: {NavBarView},

    // setup() {
    // const loginForm = reactive({
    //   email: '',
    //   password: ''
    // });

    // const handleSubmit = () => {
    //   console.log('表单数据:', loginForm);
    //   axios.post('http://127.0.0.1:4523/m2/5472524-5148051-default/257514650', loginForm).then(
    //         (res) => {
    //             console.log('返回数据:', res);
    //         }
    //     )
    //         // axios.post('http://localhost:9991/buyer/user/login', loginForm).then(
    //         //     (res) => {
    //         //         console.log('返回数据:', res);
    //         //     }
    //         // )
    // };

    // return {
    //   loginForm,
    //   handleSubmit
    // };
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
        handleSubmit() {
            console.log('表单数据:', this.loginForm);
            axios.post('https://apifoxmock.com/m2/5472524-5148051-default/257514650', this.loginForm).then(
                (res) => {
                    console.log('返回数据:', res);
                    // window.alert('登录成功', res);
                    this.$router.push('/home');
                    //待解决问题：
                    //1.跨域问题。从vue解决（https://www.cnblogs.com/youxl189/p/18032360）
                    //2.输入邮箱只要带有@就会不按照预想的流程走
                }
            )
        }
    }


}

</script>

<style></style>