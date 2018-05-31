import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import Search from '@/components/Search'
import Profile from '@/components/Profile'
import Tickets from '@/components/Tickets'
import NewTicket from '@/components/NewTicket'
import AgentLoginsByLocation from '@/components/AgentLoginsByLocation'
import AgentLoginDetails from '@/components/AgentLoginDetails'

Vue.use(Router)

export default new Router({
  // mode: "history",
  routes: [
    {
      path: '/login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/',
      component: Dashboard,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: Home,
          meta: { requiresAuth: true }
        },
        {
          path: 'search',
          component: Search,
          meta: { requiresAuth: true }
        }, 
        {
          path: 'agents/login-locations',
          component: AgentLoginsByLocation,
          meta: { requiresAuth: true }
        },
        {
          path: 'agents/login-details',
          component: AgentLoginDetails,
          meta: { requiresAuth: true }
        },
        {
          path: 'profile',
          component: Profile,
          meta: { requiresAuth: true }
        },
        {
          path: 'tickets',
          component: Tickets,
          meta: { requiresAuth: true }
        },
        {
          path: 'tickets/new',
          component: NewTicket,
          meta: { requiresAuth: true }
        },
      ]
    }
  ]
})