<template>
    <div>
      <!-- 按钮触发弹框 -->
      <el-button type="text" @click="openDialog">Message Box</el-button>
  
      <!-- 弹框内容 -->
      <el-dialog title="Notebook" :visible.sync="dialogVisible" width="50%">
        <div class="dialog-content">
          <!-- 左侧图片 -->
          <div class="image-section">
            <img
              src="https://th.bing.com/th/id/OIP.IoMuxV5C3poHojfyrtL_zgHaHa?w=172&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
              alt="Notebook"
              class="product-image"
            />
          </div>
          <!-- 右侧描述 -->
          <div class="details-section">
            <h2>Notebook</h2>
            <p>
              The cloudwego notebook is a highly efficient and feature-rich notebook
              designed to meet all your note-taking needs.
            </p>
            <h3>$9.9</h3>
  
            <!-- 数量选择 -->
            <div class="quantity">
              <span>数量：</span>
              <el-input-number v-model="quantity" :min="1" />
            </div>
  
            <!-- 添加到购物车按钮 -->
            <el-button type="primary" @click="addToCart">Add to Cart</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialogVisible: false, // 控制弹框显示
        quantity: 1, // 默认数量
      };
    },
    methods: {
      openDialog() {
        this.dialogVisible = true; // 打开弹框
      },
      addToCart() {
        this.$message({
          message: `Added ${this.quantity} notebook(s) to the cart!`,
          type: "success",
        });
        this.dialogVisible = false; // 关闭弹框
      },
    },
  };
  </script>
  
  <style>
  .dialog-content {
    display: flex;
    gap: 20px;
  }
  .image-section {
    flex: 1;
  }
  .product-image {
    width: 100%;
    height: auto;
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