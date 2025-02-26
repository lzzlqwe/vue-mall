<template>
  <div class="card">
    <!-- 新增勾选框 -->
    <div style="position: absolute; top:5px; left:5px; z-index:1">
      <!-- 绑定本地 data -->
      <el-checkbox v-model="localSelected"></el-checkbox>
    </div>

    <el-card :body-style="{ padding: '0px' }">
      <!-- <img :src=product.picture class="image" @click="openDialog"> -->
      <div v-if="product.picture" class="image-container">
        <img :src="product.picture" class="image" @click="openDialog" />
      </div>
      <div v-else class="placeholder-box" @click="openDialog">
        暂无图片
      </div>
      <div style="padding: 14px;" @click="openDialog">
        <span class="span" style="font-weight: bold;">{{ product.name }}</span> <br>
        <div class="span">{{ product.description }}</div>
        <div class="bottom">
          <!-- <span style="font-size: 13px;">上架时间:  </span><time class="time">{{ currentDate }}</time> -->
          <span class="price">¥ <span class="price_number">{{ product.price }}</span></span>
          <!-- <el-button type="warning" icon="el-icon-shopping-cart-full" circle></el-button> -->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    product: {  // 修改prop定义方式以支持动态更新
      type: Object,
      default: () => ({ selected: false }) // 添加默认选中状态字段
    }
  },

  watch: {
    // 监听本地变化并触发事件
    localSelected(newVal) {
      this.$emit('selection-change', {
        id: this.product.id,
        selected: newVal
      });
    }
  },

  data() {
    return {
      currentDate: new Date(),
      my_product: this.product, 
      localSelected: this.product.selected // 创建本地副本
    };
  },

  methods: {
    openDialog() {
      console.log("点击了商品卡片id:", this.product.id);
      this.$emit('product:click', this.product.id);
    }
  }


}
</script>


<style>
.span {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card {
  margin: 10px;
  transition-duration: 300ms;
  /* 添加缓慢效果看起来更舒适 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* 初始阴影 */
}

.card:hover {
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.5);
  /* 悬停阴影 */
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  display: flex;
  align-items: center;
  /* 垂直居中 */
}

.image {
  width: 100%;
  /* 设置固定的宽度 */
  height: 200px;
  /* 设置固定的高度 */
  object-fit: cover;
  /* 控制图片如何适应这些固定的尺寸 */
  display: block;
}

.price {
  font-size: 15px;
  color: #F56C6C;
  margin-right: auto;
  /* 将价格推向左侧 */
}

.price_number {
  font-size: 20px;
}

.placeholder-box {
  width: 100%;
  /* 设置固定的宽度 */
  height: 200px;
  /* 设置固定的高度 */
  object-fit: cover;
  /* 控制图片如何适应这些固定的尺寸 */
  display: block;
}
</style>