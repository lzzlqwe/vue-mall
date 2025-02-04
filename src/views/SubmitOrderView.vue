<template>
    <div>    
        <main>
          <!-- 导航栏 -->
          <nav-bar-view ></nav-bar-view>
          <div class="order-container" style="min-height: calc(80vh);">
            <!-- 地址栏 -->
            <section>
            <h4>Address information</h4>
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
                <el-col :span="6">
                <el-button type="dashed" icon="el-icon-plus" @click="addAddress">add new address</el-button>
                </el-col>
            </el-row>
            </section>
            <!-- 商品信息 -->
            <section>
              <div class="product-info">
                <h4>Product information</h4>
              </div>
                <el-card v-for="(product, index) in products" :key="index" class="product-card">
                    <el-row>
                    <el-col :span="4">
                        <el-image
                          :src="product.picture"
                          alt="商品图片"
                          style="width: 80px; height: 80px; margin-right: 10px;"
                        />
                    </el-col>
                    <el-col :span="11">
                        <h5>{{ product.name }}</h5>
                    </el-col>
                    <el-col :span="3">
                        <p>￥{{ product.amount }}</p>
                    </el-col>
                    <el-col :span="3">
                        <p>x{{ product.quantity }}</p>
                    </el-col>
                    <el-col :span="3">
                        <p style="color:#f56c6c">￥40.99</p>
                    </el-col>
                    </el-row>
                </el-card>
            </section>

            <!-- 底部 -->
            <div class="order-footer">
                <!-- 订单统计 -->

                <!-- 提交订单 -->
                <section class="submit-section">
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

  export default {
  components: { NavBarView, FooterView },
      data() {
        return {
          selectedAddressIndex: 0,
          addresses: [
            {
              username: '张三',
              email: '13011111111',
              detail: '北京市朝阳区豆各庄店青青家园万科青家园1',
              city: '北京市',
              province: '北京',
              label: '家'
            },
            {
              username: '李四',
              email: '13022222222',
              detail: '上海市浦东新区世纪大道花园小区2号楼',
              city: '上海市',
              province: '上海',
              label: '公司'
            },
            {
              username: '王五',
              email: '13033333333',
              detail: '深圳市南山区科技园北区腾讯大厦',
              city: '深圳市',
              province: '广东',
              label: '学校'
            }
          ],
          products: [
            {
              name: '游标 无线蓝牙耳机双耳入耳运动蓝牙耳机',
              picture: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.dMG5DDVshpKXyxsb7jMyUwHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.5&pid=1.7',
              quantity: 1,
              amount: 29.00
            },
            {
              name: '朵唯（DOOV）X11Pro 安卓智能手机 绿色',
              picture: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.WIrbwBdgo1OcoSbtERQNPwHaHa?w=185&h=185&c=7&r=0&o=5&dpr=1.5&pid=1.7',
              quantity: 1,
              amount: 4542.00
            }
          ]
        };
      },
      methods: {
        selectAddress(index) {
          this.selectedAddressIndex = index;
        },
        submitOrder() {
          this.$message.success('订单提交成功！');
        },
        addAddress() {
          this.$message.warning('地址添加已达上限！');
        }
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
    min-height: 50px; /* 最小高度 */
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
</style>