<template>
  <header class="main-header">

    <router-link to="/" class="logo">
      <span class="logo-mini"><b>O</b></span>
      <span class="logo-lg"><b>Odilum</b></span>
    </router-link>

    <nav class="navbar navbar-static-top" role="navigation">
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="../static/dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">{{ user.displayName }}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <img src="../static/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">

                <p>
                  {{ user.displayName }} - {{ user.role }}
                </p>
              </li>
              <li class="user-footer">
                <div class="pull-left">
                  <router-link to="/profile" class="btn btn-default btn-flat">Profile</router-link>
                </div>
                <div class="pull-right">
                  <a class="btn btn-default btn-flat" @click="logout">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Topbar",
  computed: {
    user: function() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    logout: function() {
      this.$auth.destroyToken();
      this.$store.commit("clearCurrentUser");
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
