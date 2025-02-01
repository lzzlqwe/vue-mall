<template>
    <div>
    <main>
        <nav-bar-view @user::logout="logout" :cartNum="cartNum"></nav-bar-view>
        <div class="shopping-cart" style="min-height: calc(80vh);">
            <el-table :data="cartItems" border style="width: 100%" v-loading="loading">
                <!-- 商品列 -->
                <el-table-column label="Product" align="center">
                <template slot-scope="scope">
                    <div class="product-info">
                    <el-image
                        :src="scope.row.picture"
                        alt="商品图片"
                        style="width: 80px; height: 80px; margin-right: 20px;"
                    />
                    <span>{{ scope.row.name }}</span>
                    </div>
                </template>
                </el-table-column>
        
                <!-- 单价列 -->
                <el-table-column label="Single price" align="center" width="250">
                <template slot-scope="scope">
                    ￥{{ scope.row.amount.toFixed(2) }}
                </template>
                </el-table-column>
        
                <!-- 数量列 -->
                <el-table-column label="quantity" align="center" width="250">
                <template slot-scope="scope">
                    <!-- <el-input-number v-model="scope.row.quantity" :min="1" @change="updateTotal"/> -->
                    {{ scope.row.quantity }}
                </template>
                </el-table-column>
        
                <!-- 小计列 -->
                <el-table-column label="Subtotal" align="center" width="250">
                <template slot-scope="scope">
                    ￥{{ (scope.row.amount * scope.row.quantity).toFixed(2) }}
                </template>
                </el-table-column>
        
            </el-table>
    
            <!-- 底部操作 -->
            <div class="cart-footer">
                <el-button type="danger" @click="clearCart">Empty Cart</el-button>
                <div class="cart-summary">
                    <strong class="cart-count">{{ totalItems }}</strong> items have been selected. Total:
                <span class="total-price">￥{{ totalPrice.toFixed(2) }}</span>
                </div>
                <el-button type="primary" @click="checkout">Check out</el-button>
            </div>
        </div>
        <footer-view class="el-footer"></footer-view>
    </main>
    </div>
</template>
  
<script>
import NavBarView from '@/components/NavBarView.vue';
import axios from '../axios'; // 导入自定义的 Axios 实例
import FooterView from '@/components/FooterView.vue'

  export default {
  components: { NavBarView , FooterView},
    data() {
      return {
        loading: false, // 加载状态
        cartItems: [],
        //购物车红点显示的数字
        cartNum: 0,
      };
    },

    mounted() {
      //获取购物车中所有商品
      axios.get("/buyer/shoppingCart/list").then((result) => {
            console.log("返回购物车记录数: ", result.data.data.length);
            console.log("返回购物车记录: ", result.data.data);
            this.cartItems  = result.data.data;
        }).catch((error) => {
            console.error('未携带token, 请先登录:', error);
            this.$router.push({ name:'sign_in'}); 
            this.$message.error("请先登录!");
        });

        //获取购物车中所有商品总数量
        this.fetchCartNum();
    },

    computed: {
      // 计算总价
      totalPrice() {
        return this.cartItems.reduce(
          (sum, item) => sum + item.amount * item.quantity,
          0
        );
      },
      // 计算总商品数
      totalItems() {
        return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      },
    },
    methods: {
      // 获取购物车中所有商品总数量
      fetchCartNum() {
        axios.get("/buyer/shoppingCart/getCartNum").then((result) => {
          console.log("返回购物车中所有商品总数量: ", result.data.data);
          this.cartNum = parseInt(result.data.data, 10);
        }).catch((error) => {
          console.error('获取购物车数量失败:', error);
          // 可以在这里处理错误，比如显示错误消息
          this.$message.error("获取购物车数量失败，请重试!");
        });
      },
      // 更新总价
      updateTotal() {
        this.$forceUpdate(); // 强制刷新视图
      },
      // 删除商品
      removeItem(index) {
        this.cartItems.splice(index, 1);
      },
      // 清空购物车
      clearCart() {

        axios.delete("/buyer/shoppingCart/clean").then((result) => {
          if (result.data.code === 1) {
            this.cartItems = [];
            console.log('清空购物车成功:', result.data);
            this.$message.warning("清空购物车");

            //获取购物车中所有商品总数量
            this.fetchCartNum();
          }else{
            this.$message.error("清空购物车失败");
          }
          
        }).catch((error) => {
            console.error('清空购物车失败:', error);
            this.$message.error("清空购物车失败");
        });
      },
      // 去结算
      checkout() {
        if (this.cartItems.length === 0) {
          this.$message.warning("购物车为空，请添加商品！");
        } else {
          this.$message.success("结算成功！");
        }
      },

      logout() {
        axios.post('/buyer/user/logout').then((res) => {
            console.log('退出登录:', res.data);
            localStorage.clear(); // 从 localStorage 删除 token, userId, username
            this.$router.push({ name: 'sign_in' });
            this.$message.warning("退出登录");
        }).catch((error) => {
          console.error('退出登录失败:', error);
        });
      }
    },
  };
  </script>
  
  <style>
  .shopping-cart {
    width: 80%;
    margin: 20px auto;
  }
  .product-info {
    display: flex;
    align-items: center;
  }
  .cart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  .cart-summary {
    font-size: 16px;
    margin-left: auto;
    margin-right: 20px;
  }
  .total-price {
    font-size: 18px;
    font-weight: bold;
    color: #f56c6c;
  }
  .cart-count {
    color: #f56c6c;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  </style>