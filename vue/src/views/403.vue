<template>
  <div>
    <div style="height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center">
      <div style="font-size: 40px">无权访问<router-link :to="redirectRoute">返回首页</router-link></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "NotAuth",
  data() {
    return {
      user: JSON.parse(localStorage.getItem('xm-user') || '{}'),
    }
  },
  computed: {
    redirectRoute() {
      // 根据用户角色动态选择跳转的页面
      switch (this.user.role) {
        case "ADMIN":
        case "STAFF":
          return "/manager/home"; // 管理员或民宿跳转到后台管理页面
        default:
          return "/front/home"; // 其他角色默认跳转到前台首页
      }
    }
  },
  created() {

  },
  methods: {}
}
</script>

<style scoped>

</style>