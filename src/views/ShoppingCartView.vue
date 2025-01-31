<template>
    <div>
    <main>
        <nav-bar-view></nav-bar-view>
        <div class="shopping-cart" >
            <el-table :data="cartItems" border style="width: 100%" v-loading="loading">
                <!-- 商品列 -->
                <el-table-column label="Product" align="center">
                <template slot-scope="scope">
                    <div class="product-info">
                    <el-image
                        :src="scope.row.picture"
                        alt="商品图片"
                        style="width: 100px; height: 100px; margin-right: 10px;"
                    />
                    <span>{{ scope.row.name }}</span>
                    </div>
                </template>
                </el-table-column>
        
                <!-- 单价列 -->
                <el-table-column label="Single price" align="center" width="250">
                <template slot-scope="scope">
                    ￥{{ scope.row.price.toFixed(2) }}
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
                    ￥{{ (scope.row.price * scope.row.quantity).toFixed(2) }}
                </template>
                </el-table-column>
        
            </el-table>
    
            <!-- 底部操作 -->
            <div class="cart-footer">
                <el-button type="danger" @click="clearCart">Empty Cart</el-button>
                <div class="cart-summary">
                    {{ totalItems }} items have been selected. Total:
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

  export default {
  components: { NavBarView },
    data() {
      return {
        loading: false, // 加载状态
        cartItems: [
          {
            name: "朵唯(DOOV) X11Pro 安卓智能手机 绿色",
            picture: "https://via.placeholder.com/80",
            price: 4542.0,
            quantity: 3,
          },
          {
            name: "其他商品示例",
            picture: "https://via.placeholder.com/80",
            price: 1234.0,
            quantity: 2,
          },
        ],
      };
    },
    computed: {
      // 计算总价
      totalPrice() {
        return this.cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
      // 计算总商品数
      totalItems() {
        return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      },
    },
    methods: {
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
        this.cartItems = [];
      },
      // 去结算
      checkout() {
        if (this.cartItems.length === 0) {
          this.$message.warning("购物车为空，请添加商品！");
        } else {
          this.$message.success("结算成功！");
        }
      },
    },
  };
  </script>
  
  <style>
  .shopping-cart {
    width: 90%;
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
  }
  .total-price {
    font-size: 18px;
    font-weight: bold;
    color: #f56c6c;
  }
  </style>