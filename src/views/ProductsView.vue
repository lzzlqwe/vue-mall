<template>
  <div>
    <el-container>

      <nav-bar-view @click::button="search_click" @update:dropdown="func2" @user::logout="logout"
        :cartNum="cartNum"></nav-bar-view>

      <!-- 新增按钮插入到导航栏下方 -->
      <!-- <el-button type="primary" @click="showAddDialog" size="small" style="margin: 20px">
        新增商品
      </el-button> -->
      <!-- 将原有新增按钮修改为按钮组 -->
      <el-row type="flex" justify="space-between" align="middle" style="margin: 20px">
        <el-col :span="12">
          <el-button type="primary" @click="showAddDialog" size="small">
            新增商品
          </el-button>
        </el-col>

        <el-col :span="12" style="text-align: right">
          <el-button type="danger" @click="batchDelete" size="small" :disabled="selectedProductIds.length === 0"
            icon="el-icon-delete">
            批量删除（{{ selectedProductIds.length }}）
          </el-button>
        </el-col>
      </el-row>

      <div>
        <el-main style="min-height: calc(80vh);">
          <el-row>
            <el-col :span="4" v-for="product in products" :key="product">
              <product-card-view :product=product @product:click="openDialog"
                @selection-change="handleSelectionChange"></product-card-view>
            </el-col>
          </el-row>
        </el-main>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :page-sizes="[6, 12, 18, 24]" background layout="sizes, prev, pager, next, total" :total=this.total>
        </el-pagination>
      </div>

      <el-footer>
        <footer-view></footer-view>
      </el-footer>
    </el-container>

    <!-- 弹框内容 -->
    <el-dialog :title=productDetail.name :visible.sync="dialogVisible" width="50%">
      <div class="dialog-content">
        <!-- 左侧图片 -->
        <div class="image-section">
          <img :src=productDetail.picture alt="Notebook" class="product-image" />
        </div>
        <!-- 右侧描述 -->
        <div class="details-section">
          <h2 style="font-weight: bold;">{{ productDetail.name }}</h2>
          <p style="font-size:large;">
            {{ productDetail.description }}
          </p>
          <h3><span style="font-size:medium;">¥ </span>{{ productDetail.price }}</h3>

          <!-- 数量选择 -->
          <div class="quantity">
            <span>数量：</span>
            <el-input-number size="small" v-model="productDetail.quantity" :min="1" />
          </div>

          <!-- 添加到购物车按钮 -->
          <el-button type="primary" @click="addToCart">Add to Cart</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 新增商品弹窗 -->
    <el-dialog title="新增商品" :visible.sync="addDialogVisible" width="50%" @closed="resetForm">
      <el-form ref="addForm" :model="addForm" :rules="formRules" label-width="100px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入商品名称" />
        </el-form-item>

        <el-form-item label="商品分类" prop="categoryId">
          <el-select v-model="addForm.categoryId" placeholder="请选择分类" style="width: 100%">
            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="商品价格" prop="price">
          <el-input-number v-model="addForm.price" :precision="2" :step="0.1" :min="0" placeholder="请输入价格" />
        </el-form-item>

        <el-form-item label="商品描述" prop="description">
          <el-input type="textarea" v-model="addForm.description" placeholder="请输入商品描述" />
        </el-form-item>

        <el-form-item label="商品图片" prop="picture">
          <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false"
            :on-change="handleUploadSuccess" :before-upload="beforeUpload">
            <img v-if="addForm.picture" :src="addForm.picture" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddProductForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import ProductCardView from '@/components/ProductCardView.vue'
// import axios from 'axios'
import axios from '../axios'; // 导入自定义的 Axios 实例
import NavBarView from '@/components/NavBarView.vue'
import FooterView from '@/components/FooterView.vue'

export default {
  components: { ProductCardView, NavBarView, FooterView },

  data() {
    return {
      //商品列表
      total: 0, //总记录数
      products: [], //page_records, 当前页数据集合

      //分页查询参数
      page: 1,
      pageSize: 6,
      categoryId: null,

      //商品详情弹框
      dialogVisible: false, // 控制弹框显示

      //商品详情数据
      productDetail: {
        id: null,
        name: null, //商品名称
        categoryId: null, //对应的商品分类id
        categoryName: null, //分类名称
        price: null, //商品价格
        picture: null, //图片
        description: null, //描述信息
        quantity: null, // 商品的默认数量
      },

      //购物车红点显示的数字
      cartNum: 0,

      // 新增商品相关数据
      addDialogVisible: false,
      addForm: {
        name: '',
        categoryId: 1,
        price: 0,
        description: '',
        picture: ''
      },
      // 分类选项数据（固定3个选项）
      categoryOptions: [
        { label: 'phone', value: 1 },
        { label: 'cloths', value: 2 },
        { label: 'computer', value: 3 }
      ],
      formRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { type: 'number', message: '价格必须为数字值' }
        ],
        // picture: [
        //   { required: true, message: '请上传商品图片', trigger: 'change' }
        // ]
      },
      uploadUrl: '/common/upload',

      selectedIds: [], // 存储选中商品ID
    }
  },
  computed: {
    // 获取所有选中商品的ID（自动更新）
    selectedProductIds() {
      return this.products
        .filter(product => product.selected)
        .map(product => product.id);
    }
  },
  mounted() {
    //分页查询商品数据
    this.getProducts(this.page, this.pageSize, null, this.categoryId) // 假设初始页码为1，每页显示6条数据

    // 获取购物车中所有商品总数量
    this.fetchCartNum();
  },

  methods: {
    //封装分页查询商品的方法
    getProducts(page, pageSize, name, categoryId) {
      axios.get("/buyer/product/page", {
        params: {
          page: page,
          pageSize: pageSize,
          name: name,
          categoryId: categoryId,
        }
      }).then((result) => {
        console.log("返回商品总数: ", result.data.data.total);
        console.log("返回商品记录: ", result.data.data.records);
        this.products = result.data.data.records;
        this.total = result.data.data.total;
        // 修复：在 map 中添加 selected 字段
        this.products = result.data.data.records.map(p => ({
          ...p,
          selected: false // 确保每个商品对象都有此字段
        }));
      }).catch((error) => {
        console.error('未携带token, 请先登录:', error);
        this.$router.push({ name: 'sign_in' });
        this.$message.error("请先登录!");
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

    //每页记录数变化
    handleSizeChange: function (val) {
      this.pageSize = val;
      this.getProducts(this.page, this.pageSize, null, this.categoryId)
      console.log("每页记录数变化pageSize:" + val);
    },

    //页码发生变化
    handleCurrentChange: function (val) {
      this.page = val;
      this.getProducts(this.page, this.pageSize, null, this.categoryId)
      console.log("页码发生变化page:" + val);
    },

    //点击搜索按钮
    search_click(val) {
      this.getProducts(this.page, this.pageSize, val, this.categoryId)
      console.log("点击搜索按钮");
      console.log("清空搜索框");
    },

    //接受子组件<nav-bar-view>传过来的categoryId值(所有分类时,categoryId值=0)
    func2(val) {
      this.categoryId = val;
      console.log("分类id的值:" + val);
      this.getProducts(this.page, this.pageSize, null, this.categoryId)
      console.log("分页查询");
    },

    // 打开弹框
    async openDialog(productId) {
      console.log("商品id:", productId);
      try {
        // 根据商品id查询商品详情
        const response1 = await axios.get(`/buyer/product/${productId}`);
        this.productDetail = response1.data.data;
        console.log("返回商品详情信息: ", this.productDetail);

        // 根据商品id查询购物车中商品数量
        const response2 = await axios.get(`/buyer/shoppingCart/${productId}`);
        this.productDetail.quantity = response2.data.data;
        console.log("返回购物车中商品数量: ", this.productDetail.quantity);
        if (!this.productDetail.quantity) { //如果购物车中没有该商品,则默认数量为1
          this.productDetail.quantity = 1;
        }

        // 数据获取成功后显示对话框
        this.dialogVisible = true;
      } catch (error) {
        console.error('查询商品错误:', error);
        // 可以在这里处理错误，比如显示错误消息
        this.$message.error('查询商品详情失败，请重试');
      }
    },

    // 添加到购物车
    addToCart() {
      axios.post('/buyer/shoppingCart/add', {
        productId: this.productDetail.id,
        quantity: this.productDetail.quantity,
      }).then((res) => {
        console.log('添加购物车响应:', res.data);

      }
      ).catch((error) => {
        console.error('请求错误:', error);
      });

      // 获取购物车中所有商品总数量
      this.fetchCartNum();

      this.$message({
        message: `Added ${this.productDetail.quantity} ${this.productDetail.name}(s) to the cart!`,
        type: "success",
      });
      this.dialogVisible = false; // 关闭弹框
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
    },

    // 显示新增弹窗
    showAddDialog() {
      this.addDialogVisible = true
    },

    // 提交新增表单
    submitAddProductForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          const productDTO = {
            name: this.addForm.name,
            categoryId: this.addForm.categoryId,
            price: this.addForm.price,
            description: this.addForm.description,
            picture: this.addForm.picture
          }

          axios.post('/buyer/product', productDTO)
            .then(response => {  // eslint-disable-line no-unused-vars
              // 如果 code 为 0，抛出错误
              if (response.data.code === 0) {
                this.addDialogVisible = false
                throw new Error(response.data.msg); // 抛出错误信息
              }

              this.$message.success('商品添加成功')
              this.addDialogVisible = false

              setTimeout(() => {
                window.location.reload();
              }, 500); // 延迟0.5秒刷新
              // this.products = [];
              // this.getProducts() // 刷新商品列表
              // this.$router.replace('/home?refresh=' + Date.now());  // 强制更新路由（Vue Router特性）
            })
            .catch(error => {
              console.error('添加商品失败:', error)
              // this.$message.error('商品添加失败')
              this.$message.error('删除失败: ' + (error.response?.data?.message || error.message));
            })
        }
      })
    },

    // 处理图片上传成功
    // 修改后的 handleUploadSuccess 方法
    handleUploadSuccess(file) {
      const formData = new FormData()
      formData.append('file', file.raw) // Element UI 的文件对象在 file.raw 中

      axios.post('/common/upload', formData, { // 对应你的上传接口
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.addForm.picture = res.data.data // 假设返回结构为 { code:200, data:"图片地址" }
          this.$message.success('图片上传成功')
          console.log("图片上传成功", this.addForm.picture)
        }
      }).catch(error => {
        this.$message.error('图片上传失败')
        console.error('上传错误:', error)
      })
    },

    // 上传前校验
    beforeUpload(file) {
      const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.name)
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isImage) {
        this.$message.error('只能上传图片文件!')
      }
      if (!isLt5M) {
        this.$message.error('图片大小不能超过5MB!')
      }
      return isImage && isLt5M
    },

    // 重置表单
    resetForm() {
      this.$refs.addForm.resetFields()
      this.addForm.picture = ''
    },

    // 处理子组件选中状态变化
    handleSelectionChange({ id, selected }) {
      const target = this.products.find(p => p.id === id);
      if (target) {
        // 使用Vue.set确保响应式更新
        this.$set(target, 'selected', selected);
      }
    },

    // 批量删除方法
    async batchDelete() {
      try {
        await this.$confirm(`确定删除选中的${this.selectedProductIds.length}件商品吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });

        // 调用后端接口（需根据实际接口调整）
        await axios.delete('/buyer/product', {
          params: { ids: this.selectedProductIds.join(',') }
        }).then(response => {
          // 打印返回的数据
          // console.log('删除接口返回数据:', response.data);
          // 打印返回的数据
          console.log('删除接口返回数据:', response.data);

          // 如果 code 为 0，抛出错误
          if (response.data.code === 0) {
            throw new Error(response.data.msg); // 抛出错误信息
          }
        })

        // 方式一：重新加载数据（推荐）
        // this.getProducts(this.page, this.pageSize);
        setTimeout(() => {
          window.location.reload();
        }, 500); // 延迟0.5秒刷新

        this.$message.success('删除完成');
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败: ' + (error.response?.data?.message || error.message));
        }
      }
    },
  }

}
</script>


<style>
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 100%;
}

/* 弹框样式 */
.dialog-content {
  display: flex;
  gap: 20px;
}

.image-section {
  flex: 1;
}

.product-image {
  width: 100%;
  height: 300px;
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>