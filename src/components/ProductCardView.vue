<template>
    <el-card :body-style="{ padding: '0px'}">
    <img :src=product.picture class="image">
    <div style="padding: 14px;">
        <span class="span" style="font-weight: bold;">{{ product.name }}</span> <br>
        <div class="span">{{ product.description }}</div>
        <div class="bottom">
          <!-- <span style="font-size: 13px;">上架时间:  </span><time class="time">{{ currentDate }}</time> -->
          <span class="price">¥ <span class="price_number">{{ product.price }}</span></span>
          <el-button type="warning" icon="el-icon-shopping-cart-full" circle></el-button>
        </div>
    </div>
    </el-card>
</template>

<script>
export default {
  props: {
    product: Object 
  },

  data() {
    return {
      currentDate: new Date()
    };
  }

  
}
</script>


<style>
  .span {
    overflow: hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }

  .el-card {
    margin:10px
  }

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    display: flex;
    align-items: center; /* 垂直居中 */
  }

  .image {
    width: 100%;
    display: block;
  }

  .price {
    font-size: 15px;
    color: #F56C6C;
    margin-right: auto; /* 将价格推向左侧 */
  }

  .price_number {
    font-size: 20px;
  }
  
</style>