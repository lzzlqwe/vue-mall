<template>
    <div>
        <el-container>
          <nav-bar-view @update:search="func1" @click::button="search_click" @update:dropdown="func2" ></nav-bar-view>
          <div>
          <el-main style="min-height: calc(80vh);">
            <el-row>
            <el-col :span="4" v-for="product in products" :key="product">
                <product-card-view :product=product @product:click="openDialog"></product-card-view>
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

      <!-- 弹框内容 -->
      <el-dialog :title=productDetail.name :visible.sync="dialogVisible" width="50%">
        <div class="dialog-content">
          <!-- 左侧图片 -->
          <div class="image-section">
            <img
              :src=productDetail.picture
              alt="Notebook"
              class="product-image"
            />
          </div>
          <!-- 右侧描述 -->
          <div class="details-section">
            <h2 style="font-weight: bold;">{{productDetail.name}}</h2>
            <p style="font-size:large;">
              {{productDetail.description}}
            </p>
            <h3><span style="font-size:medium;">¥ </span>{{productDetail.price}}</h3>
  
            <!-- 数量选择 -->
            <div class="quantity">
              <span>数量：</span>
              <el-input-number size="small" v-model="productDetail.quantity" :min="1" />
            </div>
  
            <!-- 添加到购物车按钮 -->
            <el-button type="primary" @click="addToCart">Add to Cart</el-button>
          </div>
        </div>
      </el-dialog>
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
      //商品列表
      products: [],

      //分页查询参数
      page: 1,
      pageSize: 6,
      name: null,
      categoryId: null,

      //商品详情弹框
      dialogVisible: false, // 控制弹框显示

      //商品详情数据
      productDetail: {
        id: null,
        name: null, //商品名称
        categoryId: null, //对应的商品分类id
        categoryName: null, //分类名称
        price: null, //商品价格
        picture: null, //图片
        description: null, //描述信息
        quantity: null, // 商品的默认数量
      }
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
      this.name = null;
      console.log("清空搜索框");
    },

    //接受子组件<nav-bar-view>传过来的categoryId值(所有分类时,categoryId值=0)
    func2(val){
      this.categoryId = val;
      console.log("分类id的值:" + val);
      this.getProducts(this.page, this.pageSize, this.name, this.categoryId)
      console.log("分页查询");
    },

    // 打开弹框
    async openDialog(productId) {
      console.log("商品id:", productId);
      try {
        // 根据商品id查询商品详情
        const response1 = await axios.get(`/buyer/product/${productId}`);
        this.productDetail = response1.data.data;
        console.log("返回商品详情信息: ", this.productDetail);

        // 根据商品id查询购物车中商品数量
        const response2 = await axios.get(`/buyer/shoppingCart/${productId}`);
        this.productDetail.quantity = response2.data.data;
        console.log("返回购物车中商品数量: ", this.productDetail.quantity);
        if(!this.productDetail.quantity){ //如果购物车中没有该商品,则默认数量为1
          this.productDetail.quantity = 1;
        }

        // 数据获取成功后显示对话框
        this.dialogVisible = true;
      } catch (error) {
        console.error('查询商品错误:', error);
        // 可以在这里处理错误，比如显示错误消息
        // this.$message.error('查询商品详情失败，请重试');
      }
    },
    
    // 添加到购物车
    addToCart() {
      axios.post('/buyer/shoppingCart/add', {
        productId: this.productDetail.id,
        quantity: this.productDetail.quantity,
      }).then((res) => {
          console.log('添加购物车响应:', res.data);
          
      }
      ).catch((error) => {
          console.error('请求错误:', error);
      });


      this.$message({
        message: `Added ${this.productDetail.quantity} ${this.productDetail.name}(s) to the cart!`,
        type: "success",
      });
      this.dialogVisible = false; // 关闭弹框
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

  /* 弹框样式 */
  .dialog-content {
    display: flex;
    gap: 20px;
  }
  .image-section {
    flex: 1;
  }
  .product-image {
    width: 100%;
    height: 300px;
    object-fit: contain;
  }
  .details-section {
    flex: 1;
  }
  .quantity {
    margin: 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
</style>