<template>
  <div>
    <main>
      <!-- 导航栏 -->
      <nav-bar-view></nav-bar-view>
      <div class="container my-4" style="min-height: calc(80vh);">
        <!-- 主体部分 -->
        <div v-for="order in orderList" :key="order.id" class="card mb-3 shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div>
              <strong>下单时间：</strong>{{ order.orderTime }}
            </div>
            <div>
              <strong>订单号：</strong>{{ order.number }}
            </div>
          </div>
          <div class="card-body">
            <!-- 商品列表与店铺和买家信息 -->
            <div class="row">
              <!-- 商品列表 -->
              <div class="col-md-6" style="padding-left: 3%;" >
                <div v-for="product in order.products" :key="product.productId" class="row align-items-center mb-3">
                  <!-- 商品图片 -->
                  <div class="col-md-2 text-center">
                    <img
                      :src="product.picture"
                      class="img-fluid rounded"
                      alt="商品图片"
                      style="max-width: 80px;"
                    />
                  </div>
                  <!-- 商品信息 -->
                  <div class="col-md-10">
                    <h5 class="card-title mb-1">{{ product.name }}</h5>
                    <p class="card-text text-muted">数量：×{{ product.quantity }}</p>
                  </div>
                </div>
              </div>


              <!-- 店铺与买家信息 -->
              <div class="col-md-4">
                <!-- <div class="row align-items-center mt-4"> -->
                  <div class="row align-items - flex - start"> 
                  <div class="col-md-6 text-center">
                    <p class="text-muted">店铺：</p>
                    <p>抖音电商专营店</p>
                  </div>
                  <div class="col-md-6 text-center">
                    <p class="text-muted">买家：</p>

                    <el-tooltip class="item" effect="light" placement="bottom">
                      <div slot="content">
                        <strong>{{ order.username }}</strong><br/>
                        {{ order.addressDetail }}<br/>
                        {{ order.email }} 
                      </div>
                      <span>{{ order.username }} <i class="el-icon-user-solid"></i> </span>
                    </el-tooltip>
                    
                  </div>
                </div>
              </div>

              <!-- 支付状态列 -->
              <div class="col-md-2 text-center">
                <p class="text-muted">支付状态：</p>
                <p :class="order.isPaid === 0 ? 'text-danger' : 'text-success'">{{ order.isPaid === 0 ? '未支付' : '已支付' }}</p>
              </div>          

            </div>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <div>
              <strong>总金额：</strong>
              <span class="text-danger">￥{{ calculateTotal(order.products) }}</span>
            </div>
            <div>
              <button
                class="btn btn-primary btn-sm me-2"
                @click="viewDetails(order)"
              >
                查看详情
              </button>
              <button
                class="btn btn-link btn-sm text-decoration-none"
                @click="addComment(order)"
              >
                追评
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <footer-view class="text-center py-3 bg-light">
        &copy; 2025 Your Company
      </footer-view>
    </main>
  </div>
</template>

<script>
import NavBarView from "@/components/NavBarView.vue";
import FooterView from "@/components/FooterView.vue";
import axios from '../axios'; // 导入自定义的 Axios 实例

export default {
  components: { NavBarView, FooterView },
  data() {
    return {
      orderList: [],
    };
  },

  mounted() {
    axios.get("/buyer/order/list").then((result) => {
        this.transformData(result.data.data);
        console.log("返回当前用户历史订单数据: ", this.orderList);
      }).catch((error) => {
        console.error('获取订单数据失败:', error);
        // 可以在这里处理错误，比如显示错误消息
        this.$message.error("获取订单数据失败，请重试!");
      });
  },

  methods: {
    transformData(backendData) {
            const orderMap = {};
            backendData.forEach(orderData => {
                if (!orderMap[orderData.id]) {
                    orderMap[orderData.id] = {
                      ...orderData,
                        products: []
                    };
                }
                orderMap[orderData.id].products.push({
                    productId: orderData.productId,
                    name: orderData.name,
                    picture: orderData.picture,
                    quantity: orderData.quantity,
                    price: orderData.price
                });
                delete orderMap[orderData.id].productId;
                delete orderMap[orderData.id].name;
                delete orderMap[orderData.id].picture;
                delete orderMap[orderData.id].quantity;
                delete orderMap[orderData.id].price;
            });
            this.orderList = Object.values(orderMap);
        },
    viewDetails(order) {
      this.$message.success(`查看订单详情: ${order.number}`);
    },
    addComment(order) {
      this.$message.success(`添加评论: ${order.number}`);
    },
    // 计算订单的总金额
    calculateTotal(products) {
      return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    },
  },
};
</script>

<style scoped>
.card-title {
  font-size: 1rem;
  font-weight: bold;
}

.card-text {
  font-size: 0.875rem;
}

.card-footer.btn-link {
  color: #007bff;
}

.card-footer.btn-link:hover {
  text-decoration: underline;
}
</style>