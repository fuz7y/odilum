import Vue from 'vue'
import App from '@/App'
import router from '@/router.js'
import VueResource from 'vue-resource';
import Auth from '@/plugins/Auth.js';
import store from '@/store.js';

Vue.use(VueResource);
Vue.use(Auth);

Vue.http.interceptors.push(function (request, next) {
  if (request.url[0] === '/') {
    request.url = process.env.API + request.url;

    var token = Vue.auth.getToken();
    if (token)
      request.headers.set('Authorization', 'Bearer ' + token);
  }

  next();
});

router.beforeEach(function (to, from, next) {
  //prevent access to 'requiresGuest' routes;
  if (to.matched.some(function (record) { return record.meta.requiresGuest })
    && Vue.auth.loggedIn()) {
    next({
      path: '/dashboard'
    });
  }
  else if (to.matched.some(function (record) { return record.meta.requiresAuth })
    && !Vue.auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }
  else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})