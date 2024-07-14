<template>
  <div class="manager-container">
    <!--  头部  -->
    <div class="manager-header">
      <div class="manager-header-left">
        <img src="@/assets/imgs/logo.png" />
        <div class="title">慢慢选仓储后台系统</div>
      </div>

      <div class="manager-header-center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/manager/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: $route.path }">{{ $route.meta.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin-left: 15px" @click="formVisible = true">
          <el-tag type="danger" v-if="getBusinessStatus === 0">打烊中</el-tag>
          <el-tag type="success" v-else>营业中</el-tag>
        </div>
      </div>


      <div class="manager-header-right">
        <el-dropdown placement="bottom">
          <div class="avatar">
            <img :src="user.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
            <div>{{ user.name ||  '管理员' }}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="goToPerson">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/manager/password')">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!--  主体  -->
    <div class="manager-main">
      <!--  侧边栏  -->
      <div class="manager-main-left">
        <el-menu :default-openeds="['info', 'user','stockManager']" router style="border: none" :default-active="$route.path">
          <el-menu-item index="/manager/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <el-submenu index="info">
            <template slot="title">
              <i class="el-icon-menu"></i><span>基础信息</span>
            </template>
            <el-menu-item index="/manager/supplier">供应商信息</el-menu-item>
            <el-menu-item index="/manager/customer">客户信息</el-menu-item>
            <el-menu-item index="/manager/goods">商品信息</el-menu-item>

          </el-submenu>

          <el-submenu index="stockManager">
            <template slot="title">
              <i class="el-icon-menu"></i><span>信息管理</span>
            </template>
            <el-menu-item index="/manager/stock">商品进货信息</el-menu-item>
            <el-menu-item index="/manager/back">商品退货信息</el-menu-item>
          </el-submenu>

          <el-submenu index="stockManager">
            <template slot="title">
              <i class="el-icon-menu"></i><span>商品销售管理</span>
            </template>
            <el-menu-item index="/manager/sale">商品销售信息</el-menu-item>
            <el-menu-item index="/manager/saleBack">销售退货查询</el-menu-item>
          </el-submenu>

          <el-submenu index="user" v-if="user.role === 'ADMIN'">
            <template slot="title">
              <i class="el-icon-menu"></i><span>系统管理</span>
            </template>
            <el-menu-item index="/manager/notice">公告信息</el-menu-item>
            <el-menu-item index="/manager/admin">管理员信息</el-menu-item>
            <el-menu-item index="/manager/staff">员工信息</el-menu-item>
            <el-menu-item index="/manager/department">部门信息</el-menu-item>
            <el-menu-item index="/manager/logs">日志信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <!--  数据表格  -->
      <div class="manager-main-right">
        <router-view @update:user="updateUser" />
      </div>
    </div>

    <el-dialog title="营业状态设置" :visible.sync="formVisible" width="35%" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="form" label-width="100px" style="padding-right: 50px">
        <el-form-item prop="status">
          <el-radio-group v-model="form.status" size="medium">
            <el-radio border label="1">营业中</el-radio>
            <el-radio border label="0">打烊中</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Manager",
  data() {
    return {
      formVisible: false,
      form: {},
      businessStatus: null,
      user: JSON.parse(localStorage.getItem('xm-user') || '{}'),
    }
  },
  computed: {
    getBusinessStatus() {
      return this.businessStatus;
    }
  },
  created() {
    if (!this.user.id) {
      this.$router.push('/login')
    }
    this.loadBusinessStatus();
  },
  methods: {
    updateUser() {
      this.user = JSON.parse(localStorage.getItem('xm-user') || '{}')   // 重新获取下用户的最新信息
    },
    goToPerson() {
      if (this.user.role === 'ADMIN') {
        this.$router.push('/manager/adminPerson')
      } else if (this.user.role === 'STAFF') {
        this.$router.push('/manager/staffPerson')
      }
    },
    logout() {
      localStorage.removeItem('xm-user')
      this.$router.push('/login')
    },

    save() {
      this.$request.post('/supermarket/setStatus/' + this.form.status).then(res => {
        if (res.code === '200') {
          this.form = {}
          this.formVisible = false
          this.loadBusinessStatus()
          this.$message.success('状态更新成功');
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    loadBusinessStatus(){
      this.$request.get('/supermarket/getStatus').then(res =>{
        if (res.code === '200'){
          this.businessStatus = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>

<style scoped>
@import "@/assets/css/manager.css";
</style>