<template>
    <div>
        <main>
            <!-- 导航栏 -->
            <nav-bar-view @user::logout="logout"></nav-bar-view>
            <!-- <nav-bar-view></nav-bar-view> -->
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
                    <button class="btn_noToPay" @click="noToPay">不支付</button>
                </div>
            </div>
            <!-- 底部 -->
            <footer-view class="el-footer"></footer-view>

            <!-- 对话框 -->
            <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
                <p>支付成功！</p>
                <p>交易号: {{ transactionNumber }}</p>
                <span slot="footer" class="dialog-footer">
                    <el-button type="success" @click="func1">返回首页</el-button>
                    <el-button type="primary" @click="func2">查看订单</el-button>
                </span>
            </el-dialog>
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
            centerDialogVisible: false,
            order: {
                // id: 123456,
                // orderAmount: 19.99, // 应付金额
                // orderNumber: '202302040001', // 订单号
                // orderTime: '2025-02-04 12:34:56' // 下单时间
                id: this.$route.params.orderId, // 订单id
                orderAmount: this.$route.params.orderAmount, // 应付金额
                orderNumber: this.$route.params.orderNumber, // 订单号
                orderTime: this.$route.params.orderTime // 下单时间
            },
            payMethod: 1,
            transactionNumber: '213123', // 交易号
        };
    },
    methods: {
        //取消支付
        noToPay() {
            this.$router.push({ name: 'home' });
        },

        //去支付
        goToPay() {
            // 显示加载动画
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            // 模拟支付过程，2秒后开始支付。若支付成功，弹出对话框
            setTimeout(() => {
                loading.close();//关闭加载动画

                //模拟支付
                axios.post('/buyer/payment/charge', {
                    "orderId": this.order.id, //订单id
                    "orderNumber": this.order.orderNumber, //订单number
                    "payMethod": this.payMethod, //支付方式
                    "orderAmount": this.order.orderAmount, //支付金额
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.$message.error(res.data.msg);
                    } else {
                        this.transactionNumber = res.data.data.transactionNumber;
                        console.log('支付成功！交易号:', this.transactionNumber);
                        //弹出对话框
                        this.centerDialogVisible = true;
                    }
                }
                ).catch((error) => {
                    console.error('请求错误:', error);
                    this.$message.error('请求错误:', error);
                });

            }, 2000);

        },

        // 返回首页
        func1() {
            this.centerDialogVisible = false;
            this.$router.push({ name: 'home' });
        },

        //跳转到历史订单界面
        func2() {
            this.centerDialogVisible = false;
            this.$router.push({ name: 'order_list' });
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
    margin-left: 5px;
    margin-top: 30px;
    margin-right: 15px;
}

.btn_noToPay {
    padding: 10px 20px;
    background-color: #F56C6C;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 30px;
}
</style>