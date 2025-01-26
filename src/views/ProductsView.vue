<template>
    <div>
        <el-container>
            <el-header>商品列表</el-header>
            <el-main>
              <h1 class="text-center">Hello, Bootstrap!</h1>
              <button class="btn btn-primary">Click Me</button>
              <el-row>
              <el-col :span="4" v-for="product in products" :key="product">
                  <product-card-view :product=product></product-card-view>
              </el-col>
              </el-row>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
import ProductCardView from '@/components/ProductCardView.vue'
import axios from 'axios'

export default {
  components: {ProductCardView  },

  data() {
    return {
      products: []
    }
  },
  mounted() {
        axios.get("https://apifoxmock.com/m2/5442790-5117933-default/257412739").then((result) => {
            this.products  = result.data.data;
        });
    }
  // created() {  
  //   this.fetchProducts();  
  // },  
  // methods: {  
  //   fetchProducts() {  
  //     // 从后端API获取商品数据  
  //     axios.get('https://apifoxmock.com/m2/5442790-5117933-default/257412739').then(response => {  
  //       this.products = response.data.data;  
  //     });  
  //   }  
  // }  
    
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