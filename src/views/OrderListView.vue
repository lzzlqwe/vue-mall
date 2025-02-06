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
                    <p>{{ order.shopName }}</p>
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

export default {
  components: { NavBarView, FooterView },
  data() {
    return {
      orderList: [
        {
          id: 1,
          number: "299753081684",
          userId: 1,
          addressBookId: 1,
          orderTime: "2024-08-13 12:54:04",
          payTime: "2024-08-13 13:10:00",
          payMethod: 1,
          isPaid: 1,
          username: "赖志立",
          email: "example@example.com",
          addressDetail: "中国广东省广州市天河区五山路381号广东大学大学城校区12栋305宿舍",
          shopName: "抖音电商专营店",
          products: [
            {
              productId: 1,
              name: "搬家纸箱特硬加厚大纸箱 塑料扣手",
              picture: "https://tse3-mm.cn.bing.net/th/id/OIP-C.58z_UWvWcvls-RsM7P5D7wAAAA?w=138&h=150&c=7&r=0&o=5&dpr=1.5&pid=1.7",
              quantity: 2,
              amount: 26.11,
            },
            {
              productId: 2,
              name: "加厚牛皮纸箱",
              picture: "https://tse2-mm.cn.bing.net/th/id/OIP-C.iAVcS160cvBKVthAoTFNAAHaHa?w=189&h=189&c=7&r=0&o=5&dpr=1.5&pid=1.7",
              quantity: 1,
              amount: 15.00,
            },
          ],
        },
        {
          id: 2,
          number: "295613667092",
          userId: 2,
          addressBookId: 2,
          orderTime: "2024-08-10 14:19:17",
          payTime: "2024-08-10 14:30:00",
          payMethod: 1,
          isPaid: 0,
          username: "赖志立",
          email: "example2@example.com",
          addressDetail: "中国上海市上海市浦东新区世纪大道100号上海环球金融中心20楼2005室",
          shopName: "抖音电商旗舰店",
          products: [
            {
              productId: 3,
              name: "英菲官网高背静音办公椅",
              picture: "https://tse4-mm.cn.bing.net/th/id/OIP-C.x_wTh4zWByF5_bCW4oqXGQHaFj?w=251&h=188&c=7&r=0&o=5&dpr=1.5&pid=1.7",
              quantity: 1,
              amount: 129.90,
            },
          ],
        },
      ],
    };
  },
  methods: {
    viewDetails(order) {
      this.$message.success(`查看订单详情: ${order.number}`);
    },
    addComment(order) {
      this.$message.success(`添加评论: ${order.number}`);
    },
    // 计算订单的总金额
    calculateTotal(products) {
      return products.reduce((total, product) => total + product.amount * product.quantity, 0).toFixed(2);
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