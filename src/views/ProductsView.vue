<template>
    <div>
        <el-container>
          <nav-bar-view></nav-bar-view>
          <div>
          <el-main>
            <button type="button" class="btn btn-primary" @click="test">测试按钮</button>
            <el-row>
            <el-col :span="4" v-for="product in products" :key="product">
                <product-card-view :product=product></product-card-view>
            </el-col>
            </el-row>
          </el-main>
          </div>
          <el-footer>
            <footer-view></footer-view>
          </el-footer>
        </el-container>
    </div>
</template>

<script>
import ProductCardView from '@/components/ProductCardView.vue'
// import axios from 'axios'
import axios from '../axios'; // 导入自定义的 Axios 实例
import NavBarView from '@/components/NavBarView.vue'
import FooterView from '@/components/FooterView.vue'

export default {
  components: {ProductCardView, NavBarView ,FooterView },

  data() {
    return {
      products: []
    }
  },
  mounted() {
        axios.get("https://apifoxmock.com/m2/5442790-5117933-default/257412739").then((result) => {
            this.products  = result.data.data;
        });
    },

  methods: {
      test() {
          axios.get('/buyer/test', this.loginForm).then(
              (res) => {
                  console.log('响应:', res.data);
                  
              }
          ).catch((error) => {
              console.error('请求错误:', error);
          });
      }
  }
    
}
</script>


<style>
 .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 100%;
  }
</style>