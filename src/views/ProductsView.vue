<template>
    <div>
        <el-container>
          <nav-bar-view @update:search="func1" @click::button="search_click" @update:dropdown="func2" ></nav-bar-view>
          <div>
          <el-main>
            <el-row>
            <el-col :span="4" v-for="product in products" :key="product">
                <product-card-view :product=product></product-card-view>
            </el-col>
            </el-row>
          </el-main>
          <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[6, 12, 18, 24]"
          background 
          layout="sizes, prev, pager, next, total" 
          :total="1000">
          </el-pagination>
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
      products: [],
      page: 1,
      pageSize: 6,
      name: null,
      categoryId: null,
    }
  },
  mounted() {
        this.getProducts(this.page, this.pageSize, this.name, this.categoryId) // 假设初始页码为1，每页显示6条数据
    },

  methods: {
    //封装分页查询商品的方法
    getProducts(page, pageSize, name, categoryId){
      axios.get("/buyer/product/page", {
            params: {
                page: page,
                pageSize: pageSize,
                name: name,
                categoryId: categoryId,
            }
        }).then((result) => {
            console.log("返回商品总数: ", result.data.data.total);
            console.log("返回商品记录: ", result.data.data.records);
            this.products  = result.data.data.records;
        }).catch((error) => {
            console.error('未携带token, 请先登录:', error);
            this.$router.push({ name:'sign_in'}); 
        });
    },

    //每页记录数变化
    handleSizeChange:function(val){
        this.pageSize = val;
        this.getProducts(this.page, this.pageSize, this.name, this.categoryId)
        console.log("每页记录数变化pageSize:" + val);
    },

    //页码发生变化
    handleCurrentChange:function(val){
        this.page = val;
        this.getProducts(this.page, this.pageSize, this.name, this.categoryId)
        console.log("页码发生变化page:" + val);
    },

    //接受子组件<nav-bar-view>传过来的search值
    func1(val){
      this.name = val;
      console.log("搜索框的值:" + val);
    },

    //点击搜索按钮
    search_click(){
      this.getProducts(this.page, this.pageSize, this.name, this.categoryId)
      console.log("点击搜索按钮");
    },

    //接受子组件<nav-bar-view>传过来的categoryId值
    func2(val){
      this.categoryId = val;
      console.log("分类id的值:" + val);
      this.getProducts(this.page, this.pageSize, this.name, this.categoryId)
      console.log("分页查询");
    },
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