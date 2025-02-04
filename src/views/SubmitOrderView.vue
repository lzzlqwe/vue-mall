<template>
    <div>    
        <main>
          <!-- 导航栏 -->
          <nav-bar-view @user::logout="logout" :cartNum="cartNum"></nav-bar-view>
          <div class="order-container" style="min-height: calc(80vh);">
            <!-- 地址栏 -->
            <section>
            <h4>Receipt information</h4>
            <el-row :gutter="20" class="address-section">
                <el-col v-for="(address, index) in addresses" :key="index" :span="6">
                  <div :class="{'selected-address': selectedAddressIndex === index}" @click="selectAddress(index)">
                    <el-card  class="address-card">
                      <div class="address-header">
                        <p><strong>Address {{ index + 1 }}</strong> 
                        <el-tag type="primary" class="tag-label">{{ address.label }}</el-tag></p>
                      </div>
                        <p class="address-detail">{{ address.detail }}</p>
                        <p>{{ address.city }}, {{ address.province }}</p>
                        <p>{{ address.username }} - {{ address.email }}</p>
                        <span v-if="selectedAddressIndex === index" class="checkmark">✔</span>
                    </el-card>
                  </div>
                </el-col>
                <el-col :span="4">
                <el-button type="dashed" icon="el-icon-plus" @click="addAddress">add new address</el-button>
                </el-col>
            </el-row>
            </section>
            <!-- 商品信息 -->
            <section>
              <div class="product-info">
                <h4>Product information</h4>
              </div>
                <el-card v-for="(cartItem, index) in cartItems" :key="index" class="product-card">
                    <el-row>
                    <el-col :span="4">
                        <el-image
                          :src="cartItem.picture"
                          alt="商品图片"
                          style="width: 80px; height: 80px; margin-right: 10px;"
                        />
                    </el-col>
                    <el-col :span="11">
                        <h5>{{ cartItem.name }}</h5>
                    </el-col>
                    <el-col :span="3">
                        <p>￥{{ cartItem.amount }}</p>
                    </el-col>
                    <el-col :span="3">
                        <p>x{{ cartItem.quantity }}</p>
                    </el-col>
                    <el-col :span="3">
                        <p style="color:#f56c6c">￥{{ (cartItem.amount * cartItem.quantity).toFixed(2)}}</p>
                    </el-col>
                    </el-row>
                </el-card>
            </section>

            <!-- 底部 -->
            <div class="order-footer">
                <section class="submit-section">
                  <!-- 配送地址 -->
                  <span span class="shipping-address">配送至:  {{addresses[selectedAddressIndex].province+addresses[selectedAddressIndex].city+addresses[selectedAddressIndex].detail}}</span>
                  <!-- 订单统计 -->
                  <span span class="total-price">￥{{ totalPrice.toFixed(2) }}  </span>
                  <!-- 提交订单 -->
                  <el-button type="primary" size="large" @click="submitOrder">Submit Order</el-button>
                </section>
            </div>
          </div>
          <!-- 底部 -->
          <footer-view class="el-footer"></footer-view>
        </main>
    </div>
</template>

  <script>
  import NavBarView from '@/components/NavBarView.vue';
  import FooterView from '@/components/FooterView.vue';
  import axios from '../axios'; // 导入自定义的 Axios 实例

  export default {
  components: { NavBarView, FooterView },
      data() {
        return {
          // 选中的地址索引
          selectedAddressIndex: 0, //0表示初始时选中第一个地址
          //购物车红点显示的数字
          cartNum: 0,
          addresses: [],
          cartItems: [],
          
        };
      },

      mounted() {
        //获取地址簿中所有地址
        axios.get("/buyer/addressBook/list").then((result) => {
              console.log("返回地址数: ", result.data.data.length);
              console.log("返回地址: ", result.data.data);
              this.addresses  = result.data.data;
          }).catch((error) => {
              console.error('未携带token, 请先登录:', error);
              this.$router.push({ name:'sign_in'}); 
              this.$message.error("请先登录!");
          });

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
        selectAddress(index) {
          this.selectedAddressIndex = index;
          console.log("选中地址索引:", this.selectedAddressIndex);
        },

        //提交订单
        submitOrder() {
          //提交totalPrice.toFixed(2)和selectedAddressIndex
          console.log("提交订单:", this.totalPrice.toFixed(2), this.selectedAddressIndex);
          axios.post('/buyer/order/submit', {
            "addressBookId": this.addresses[this.selectedAddressIndex].id,
            "amount": this.totalPrice.toFixed(2),
          }).then(
                (res) => {
                    console.log('响应:', res.data);
                    if (res.data.code === 0) { 
                        this.$message.error(res.data.msg);
                    } else {
                        // 提交订单成功，跳转到订单支付界面
                        this.$message.success('订单提交成功，请支付！');
                        console.log('跳转到订单支付界面');
                        //跳转到订单支付界面，并携带参数
                        this.$router.push({ name:'payment', params: { 
                          orderId: res.data.data.id,  //订单id
                          orderNumber: res.data.data.orderNumber,  //订单号（对应orders表number字段）
                          orderAmount: res.data.data.orderAmount,  //订单金额（对应orders表amount字段）
                          orderTime: res.data.data.orderTime,   //下单时间
                        } }); 
                    }
                }
            ).catch((error) => {
                console.error('请求错误:', error);
                this.$message.error('请求错误:', error);
            });
          
        },

        //添加地址
        addAddress() {
          this.$message.warning('地址添加已达上限！');
        },

        //退出登录
        logout() {
          axios.post('/buyer/user/logout').then((res) => {
              console.log('退出登录:', res.data);
              localStorage.clear(); // 从 localStorage 删除 token, userId, username
              this.$router.push({ name: 'sign_in' });
              this.$message.warning("退出登录");
          }).catch((error) => {
            console.error('退出登录失败:', error);
          });
        },
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
      }
    };
  </script>
  
  <style>
  .order-container {
    width: 80%;
    margin: 20px auto;
  }
  .product-info {
    margin-top: 3%;
  }
  .tag-label {
    margin-left: 8px;
    font-weight: bold;
  }
  .address-detail{
    
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .address-section {
    margin-bottom: 20px;
  }
  .address-card {
    position: relative;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .address-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .selected-address {
    /* border: 2px solid #409EFF; */
    /* border: 2px solid orange;
    box-shadow: 0 4px 8px rgba(255, 165, 0, 0.5); */
    border: 2px solid lightblue;
    box-shadow: 0 4px 8px rgba(137, 160, 229, 0.5);
  }
  .product-card {
    margin-bottom: 20px;
  }
  .submit-section {
    text-align: right;
    margin-top: 20px;
  }
  .total-price {
    font-size: 18px;
    font-weight: bold;
    color: #f56c6c;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .checkmark {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 20px;
    height: 20px;
    background-color: lightskyblue;
    color: #fff;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
  }
  .shipping-address{
    margin-right: 20px;
    font-size: 12px;
    color: gray;
  }
  .total-price{
    margin-right: 20px;
  }
</style>