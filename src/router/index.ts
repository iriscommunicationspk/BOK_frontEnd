// import { createRouter, createWebHistory } from 'vue-router'

// // import SigninView from '@/views/Authentication/SigninView.vue'
// // import SignupView from '@/views/Authentication/SignupView.vue'
// // import CalendarView from '@/views/CalendarView.vue'
// // import BasicChartView from '@/views/Charts/BasicChartView.vue'
// // import ApexChartView from '@/views/Charts/ApexChartView.vue'
// import ECommerceView from '@/views/Dashboard/ECommerceView.vue'
// // import FormElementsView from '@/views/Forms/FormElementsView.vue'
// // import FormLayoutView from '@/views/Forms/FormLayoutView.vue'
// // import SettingsView from '@/views/Pages/SettingsView.vue'
// // import ProfileView from '@/views/ProfileView.vue'
// // import TablesView from '@/views/TablesView.vue'
// // import AlertsView from '@/views/UiElements/AlertsView.vue'
// // import ButtonsView from '@/views/UiElements/ButtonsView.vue'
// // import SigninView from '@/views/Authentication/SigninView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'eCommerce',
//     component: ECommerceView,
//     meta: {
//       title: 'Iris Dashboard'
//     }
//   }
//   // {
//   //   path: '/calendar',
//   //   name: 'calendar',
//   //   component: CalendarView,
//   //   meta: {
//   //     title: 'Calendar'
//   //   }
//   // },
//   // {
//   //   path: '/profile',
//   //   name: 'profile',
//   //   component: ProfileView,
//   //   meta: {
//   //     title: 'Profile'
//   //   }
//   // },
//   // {
//   //   path: '/forms/form-elements',
//   //   name: 'formElements',
//   //   component: FormElementsView,
//   //   meta: {
//   //     title: 'Form Elements'
//   //   }
//   // },
//   // {
//   //   path: '/forms/form-layout',
//   //   name: 'formLayout',
//   //   component: FormLayoutView,
//   //   meta: {
//   //     title: 'Form Layout'
//   //   }
//   // },
//   // {
//   //   path: '/tables',
//   //   name: 'tables',
//   //   component: TablesView,
//   //   meta: {
//   //     title: 'Tables'
//   //   }
//   // },
//   // {
//   //   path: '/pages/settings',
//   //   name: 'settings',
//   //   component: SettingsView,
//   //   meta: {
//   //     title: 'Settings'
//   //   }
//   // },
//   // {
//   //   path: '/charts/basic-chart',
//   //   name: 'basicChart',
//   //   component: BasicChartView,
//   //   meta: {
//   //     title: 'Basic Chart'
//   //   }
//   // },
//   // {
//   //   path: '/charts/apex-chart',
//   //   name: 'apexChart',
//   //   component: ApexChartView,
//   //   meta: {
//   //     title: 'Apex Chart'
//   //   }
//   // },
//   // {
//   //   path: '/ui-elements/alerts',
//   //   name: 'alerts',
//   //   component: AlertsView,
//   //   meta: {
//   //     title: 'Alerts'
//   //   }
//   // },
//   // {
//   //   path: '/ui-elements/buttons',
//   //   name: 'buttons',
//   //   component: ButtonsView,
//   //   meta: {
//   //     title: 'Buttons'
//   //   }
//   // },
//   // {
//   //   path: '/auth/signin',
//   //   name: 'signin',
//   //   component: SigninView,
//   //   meta: {
//   //     title: 'Signin'
//   //   }
//   // },
//   // {
//   //   path: '/auth/signup',
//   //   name: 'signup',
//   //   component: SignupView,
//   //   meta: {
//   //     title: 'Signup'
//   //   }
//   // }
// ]

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     return savedPosition || { left: 0, top: 0 }
//   }
// })

// router.beforeEach((to, from, next) => {
//   document.title = `${to.meta.title} | iris communication Dashboard`
//   next()
// })

// export default router




import { createRouter, createWebHistory } from 'vue-router'

// Import views
import SigninView from '@/views/Authentication/SigninView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import ECommerceView from '@/views/Dashboard/ECommerceView.vue'
import { useAuthStore } from '@/stores/auth'
// import other views as needed...

const routes = [
  {
    path: '/',
    name: 'eCommerce',
    component: ECommerceView,
    meta: {
      title: 'Iris Dashboard',
      requiresAuth: true // Require authentication for this route
    }
  },
  {
    path: '/auth/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'Signin'
    }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  },
  // Uncomment and add other routes as needed...
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem('user'); // Check if user is logged in
  const user = localStorage.getItem('user');
  const userName = user ? JSON.parse(user)?.name : null;
  useAuthStore().userName = userName
  console.log(userName);
  

  // If the user is logged in and trying to access the sign-in or sign-up pages, redirect them to the home page
  if (loggedIn && (to.name === 'signin' || to.name === 'signup')) {
    next({ name: 'eCommerce' }); // Redirect to home page if already logged in
  } else if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ name: 'signin' }); // Redirect to Sign In if not logged in
  } else {
    document.title = `${to.meta.title} | Iris Communication Dashboard`; // Set document title
    next();
  }
});


export default router;
