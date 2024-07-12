import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/manager',
    name: 'Manager',
    component: () => import('../views/Manager.vue'),
    redirect: '/manager/home',  // 重定向到首页
    children: [
      { path: '403', name: 'NoAuth', meta: { name: '无权限' }, component: () => import('../views/manager/403') },
      { path: 'home', name: 'Home', meta: { name: '系统首页' }, component: () => import('../views/manager/Home') },
      { path: 'admin', name: 'Admin', meta: { name: '管理员信息' }, component: () => import('../views/manager/Admin') },
      { path: 'adminPerson', name: 'AdminPerson', meta: { name: '个人信息' }, component: () => import('../views/manager/AdminPerson') },
      { path: 'password', name: 'Password', meta: { name: '修改密码' }, component: () => import('../views/manager/Password') },
      { path: 'notice', name: 'Notice', meta: { name: '公告信息' }, component: () => import('../views/manager/Notice') },
      { path: 'staff', name: 'Staff', meta: { name: '员工信息' }, component: () => import('../views/manager/Staff') },
      { path: 'staffPerson', name: 'StaffPerson', meta: { name: '员工个人信息' }, component: () => import('../views/manager/StaffPerson') },
      { path: 'department', name: 'Department', meta: { name: '部门信息' }, component: () => import('../views/manager/Department') },
      { path: 'supplier', name: 'Supplier', meta: { name: '供应商信息' }, component: () => import('../views/manager/Supplier') },
      { path: 'customer', name: 'Customer', meta: { name: '客户信息' }, component: () => import('../views/manager/Customer') },
      { path: 'goods', name: 'Goods', meta: { name: '商品信息' }, component: () => import('../views/manager/Goods') },
      { path: 'stock', name: 'Stock', meta: { name: '商品进货信息' }, component: () => import('../views/manager/Stock') },
      { path: 'back', name: 'Back', meta: { name: '商品退货信息' }, component: () => import('../views/manager/Back') },
      { path: 'sale', name: 'Sale', meta: { name: '商品销售信息' }, component: () => import('../views/manager/Sale') },
      { path: 'saleBack', name: 'SaleBack', meta: { name: '销售退货信息' }, component: () => import('../views/manager/SaleBack') },
      { path: 'logs', name: 'Logs', meta: { name: '日志信息' }, component: () => import('../views/manager/Logs') },
    ]
  },
  {
    path: '/front',
    name: 'Front',
    component: () => import('../views/Front.vue'),
    redirect: '/front/home',  // 重定向到主页
    children: [
      { path: 'home', name: 'Home', meta: { name: '系统首页' }, component: () => import('../views/front/Home') },
      { path: 'person', name: 'Person', meta: { name: '个人信息' }, component: () => import('../views/front/Person') },
    ]
  },
  {
    path: '/',
    name: 'Root'//根目录
  },
  { path: '/login', name: 'Login', meta: { name: '登录' }, component: () => import('../views/Login.vue') },
  { path: '/register', name: 'Register', meta: { name: '注册' }, component: () => import('../views/Register.vue') },
  { path: '/403', name: 'NotAuth', meta: { name: '无权限访问' }, component: () => import('../views/403.vue') },
  { path: '*', redirect: '/404' }, // 将所有未匹配的路由重定向到404页面
  { path: '/404', name: 'NotFound', meta: { name: '无法访问' }, component: () => import('../views/404.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('xm-user') || '{}');
  if (!user.token) {//如果用户未登录（游客访问）
    if (to.path === ('/')){
      // 访问的是根路径，则重定向到前台首页
      next('login')
    }else if (to.path.startsWith('/manager')) {
      // 访问的是后台管理路由，则重定向到登录页面
      next('/login');
    }else {// 访问的不是后台管理路由且不是根路径，则认为是游客，可以放行访问公共页面
      next();
    }
  }
  else if (user.token){//如果用户已登录（用户访问）
    if (to.path === ('/')){// 访问的是根路径
      if ( user.role === 'ADMIN' || user.role === 'STAFF' ){
        // 如果用户角色是管理员或员工，则重定向到后台首页
        next('/manager/home');
      } else if (user.role === 'USER'){
        // 如果用户角色是用户，则重定向到前台首页
        next('/front/home')
      }
    }else if (to.path.startsWith('/manager') && user.role !== 'ADMIN' && user.role !== 'STAFF' ){
      // 如果用户未登录且访问的是前台路由，且角色不是管理员和员工
      next('/403');
    } else if (to.path === '/manager/staffPerson' && user.role === 'STAFF') {
      // 如果用户是员工，但想要访问 '/manager/staff'，放行
      next();
    } else if ((to.path.startsWith('/manager/notice')
            || to.path.startsWith('/manager/admin')
            || to.path.startsWith('/manager/staff')
            || to.path.startsWith('/manager/department')
            || to.path.startsWith('/manager/logs')
        )// 如果用户是员工，拦截这些页面
        && user.role === 'STAFF'){
      next('/403');
    }else if (to.path.startsWith('/front') && user.role !== 'USER'){
      // 如果用户未登录且访问的是前台路由，且角色不是用户
      next('/403');
    }else {
      next(); // 角色对应，且不是访问根目录，则继续正常跳转
    }
  }
  else {
    next(); // 其他情况，则继续正常跳转
  }
});

export default router
