<template>
    <div>    
        <main>
          <!-- 导航栏 -->
          <nav-bar-view></nav-bar-view>
            <div class="payment-container" style="min-height: calc(80vh);">
                <!-- 主体部分 -->
                <div class="payment-success">
                    <h2>订单提交成功，请尽快付款！</h2>
                    <p>请您尽快完成支付，否则订单会被自动取消。</p>
                    <div class="order-amount">
                        <span>应付金额 <strong>{{ order.orderAmount.toFixed(2) }}元</strong></span>
                    </div>
                </div>
                <div class="payment-methods">
                    <div class="payment-option">
                        <p>
                            <input type="radio" v-model="payMethod" :value="1" />
                            微信
                        </p>
                        <img src="@/static/img/wechat.png" alt="WeChat" />
                    </div>
                    <div class="payment-option">
                        <p>
                            <input type="radio" v-model="payMethod" :value="2" />
                            支付宝
                        </p>
                        <img src="@/static/img/AliPay.png" alt="AliPay" />
                    </div>
                </div>
                <div class="order-info">
                    <p>订单号：<span>{{ order.orderNumber }}</span></p>
                    <p>下单时间：<span>{{ order.orderTime }}</span></p>
                    <button class="btn_goToPay" @click="goToPay">去支付</button>
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
            order: {
                // id: 123456,
                // orderAmount: 19.99, // 应付金额
                // orderNumber: '202302040001', // 订单号
                // orderTime: '2025-02-04 12:34:56' // 下单时间
                id: this.$route.params.orderId,
                orderAmount: this.$route.params.orderAmount, // 应付金额
                orderNumber: this.$route.params.orderNumber, // 订单号
                orderTime: this.$route.params.orderTime // 下单时间
            },
            payMethod: 1
        };
    },
    methods: {
        goToPay() {
            // 这里可以添加去支付的逻辑，比如跳转到对应的支付页面
            console.log('去支付，选择的支付方式为：', this.payMethod === 1? '微信支付' : '支付宝支付');
            this.$message.success(this.payMethod === 1? '微信支付' : '支付宝支付');
        }
    }
};
</script>

<style>
.payment-container {
    width: 90%;
    margin: 20px auto;
    text-align: center;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.payment-success h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}
.payment-success p {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
}
.order-amount {
    font-size: 18px;
    color: #333;
    margin-bottom: 30px;
}
.order-amount strong {
    color: orange;
    font-size: 24px;
}
.payment-methods {
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-bottom: 20px;
}
.payment-option {
    text-align: center;
}
.payment-option img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
}
.payment-option p {
    font-size: 16px;
    color: #333;
}
.order-info {
    font-size: 14px;
    color: #f56c6c;
    margin-top: 20px;
}
.order-info p {
    margin: 5px 0;
}
.order-info span {
    font-weight: bold;
}
.el-footer {
    background-color: #f2f2f2;
    color: #666;
    text-align: center;
    line-height: 60px;
}
.btn_goToPay {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 30px;
}
</style>