<template>
    <main>
        <!-- 导航栏 -->
        <nav-bar-view @user::logout="logout"></nav-bar-view>
        <div class="container my-4" style="min-height: calc(80vh);">
            <div class="chat-box">
                <div class="chat-header">
                    <h3>客服聊天窗口</h3>
                </div>
                <div class="chat-messages">
                    <div v-for="(message, index) in messages" :key="index" :class="{ 'user-message': message.sender === 'user', '客服-message': message.sender === '客服' }">
                        <!-- 显示加载状态 -->
                        <div v-if="message.isLoading" class="loading-message">
                            <span>正在等待客服的回复...</span>
                        </div>
                        <div v-else class="message-content">
                            <span>{{ message.content }}</span>
                        </div>
                        <div class="message-time">{{ message.time }}</div>
                    </div>
                </div>
                <div class="chat-input">
                    <el-input v-model="inputMessage" placeholder="请输入问题" clearable></el-input>
                    <el-button :disabled="isSending" @click="sendMessage">
                        {{ isSending ? '发送中...' : '发送' }}
                    </el-button>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <footer-view class="text-center py-3 bg-light">
            &copy; 2025 Your Company
        </footer-view>
    </main>
</template>

<script>
import NavBarView from "@/components/NavBarView.vue";
import FooterView from "@/components/FooterView.vue";
import axios from '../axios'; // 导入自定义的 Axios 实例

export default {
    components: { NavBarView, FooterView },
    data() {
        return {
            messages: [],
            inputMessage: '',
            isSending: false // 发送状态
        };
    },
    mounted() {
        // 获取购物车中所有商品总数量
        this.fetchCartNum();
        //发送默认请求给客服
        this.fetchMessages();
    },
    methods: {
        fetchMessages() {
            const currentTime = new Date().toLocaleTimeString();

             // 显示加载状态
             const loadingMessageIndex = this.messages.push({ sender: '客服', content: '', time: currentTime, isLoading: true }) - 1;

             this.isSending = true; //按钮显示发送中

            // 向后端发送请求获取数据
            axios.get('/buyer/chatAi/simple/chat')
              .then(response => {
                    console.log("chat返回的数据: ", response.data);
                    // 移除加载状态
                    this.messages.splice(loadingMessageIndex, 1);
                    // 在聊天框中展示客服的回复
                    this.messages.push({ sender: '客服', content: response.data.data, time: new Date().toLocaleTimeString() });
                })
              .catch(error => {
                    console.error('获取消息失败:', error);
                    // 给用户提示
                    this.messages.push({ sender: '客服', content: '获取消息失败，请稍后重试。', time: new Date().toLocaleTimeString() });
                })
                .finally(() => {
                    this.isSending = false;
                });
        },
        sendMessage() {
            if (this.inputMessage.trim() === '') return;
            if (this.isSending) return; // 避免重复发送

            const currentTime = new Date().toLocaleTimeString();

            // 在聊天框中展示用户的问题
            this.messages.push({ sender: 'user', content: this.inputMessage, time: currentTime });

            // 显示加载状态
            const loadingMessageIndex = this.messages.push({ sender: '客服', content: '', time: currentTime, isLoading: true }) - 1;

            this.isSending = true; //按钮显示发送中

            // 向后端发送用户的问题
            axios.get('/buyer/chatAi/simple/chat', { params: {
                query: this.inputMessage
                } })
              .then(response => {
                    // 移除加载状态
                    this.messages.splice(loadingMessageIndex, 1);
                    // 在聊天框中展示客服的回复
                    this.messages.push({ sender: '客服', content: response.data.data, time: new Date().toLocaleTimeString() });
                })
              .catch(error => {
                    console.error('发送消息失败:', error);
                    // 移除加载状态
                    this.messages.splice(loadingMessageIndex, 1);
                    // 给用户提示
                    this.messages.push({ sender: '客服', content: '发送消息失败，请稍后重试。', time: new Date().toLocaleTimeString() });
                })
              .finally(() => {
                    this.isSending = false;
                });

            // 清空输入框
            this.inputMessage = '';
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

<style scoped>
.chat-box {
    width: 60%;
    height: 600px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    margin: 0 auto; /* 添加这一行 */
}

.chat-header {
    background-color: #f0f0f0;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ccc;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
}

.user-message {
    text-align: right;
    margin-bottom: 10px;
}

.user-message .message-content {
    background-color: #e1f5fe;
    border-radius: 10px;
    padding: 8px 12px;
    display: inline-block;
}

.客服-message {
    text-align: left;
    margin-bottom: 10px;
}

.客服-message .message-content {
    background-color: #f0f9eb;
    border-radius: 10px;
    padding: 8px 12px;
    display: inline-block;
}

.message-time {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
    text-align: right;
}

.客服-message .message-time {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
    text-align: left; /* 修改这一行 */
}

.loading-message {
    font-style: italic;
    color: #999;
}

.chat-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
}

.chat-input el-input {
    flex: 1;
    margin-right: 10px;
}
</style>