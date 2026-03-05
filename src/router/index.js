import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import Manager from "../views/Manager.vue"
import Dashboard from "../layout/DashboardLayout.vue"
import { useUSerStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "/manager",
          name: "manager",
          component: Manager
        }
      ]
    }


  ],
})

router.beforeEach((to, from) => {
  const userStore = useUSerStore()
  const bank = [
    { role: "manager", routes: ["/login", "/manager"] },
    { role: "salesagent", routes: ["/login", "/sales"] },
    { role: "director", routes: ["/login", "/sales", "/manager", "/director"] }
  ]

  if (to.path != "/login") {
    if (!userStore.user.role) {
      return { name: "login" }
    }

    const userRole = userStore.user.role
    const canGoTo = bank.filter(i => i.role == userRole)[0]["routes"].includes(to.path)

    if (canGoTo) {
      return true
    } else {
      return { name: "login" }
    }
  }



})


export default router
