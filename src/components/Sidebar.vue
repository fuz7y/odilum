<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img src="../static/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p></p>
          <p>{{ user.displayName }}</p>          
        </div>
      </div> 

      <ul class="sidebar-menu">
        <li class="header">MAIN NAVIGATION</li>
        <li :class="{ active:isDashActive }"><router-link to="/"><i class="fa fa-dashboard"></i> <span>Dashboard</span></router-link></li>
        <li :class="{ active:isSearchActive }"><router-link to="/search"><i class="fa fa-search"></i> <span>Search tickets</span></router-link></li>
        <li :class="['treeview', { active:isAgentActive }]">
          <a href="#">
            <i class="fa fa-users"></i> <span>Agent Manangement</span> <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li :class="{ active:isAgentActive2 }"><router-link to="/agents/login-locations"><i class="fa fa-circle-o"></i> Logins By Location</router-link></li>
            <li :class="{ active:isAgentActive3 }"><router-link to="/agents/login-details"><i class="fa fa-circle-o"></i> Login Details</router-link></li>
          </ul>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  created: function() {
    this.checkActivePage();
  },
  computed: {
    user: function() {
      return this.$store.state.currentUser;
    }
  },
  data: function() {
    return {
      isDashActive: false,
      isSearchActive: false,
      isAgentActive: false,
      isAgentActive2: false,
      isAgentActive3: false,
    };
  },
  watch: {
    $route: "checkActivePage"
  },
  methods: {
    checkActivePage: function() {
      switch (this.$route.path) {
        case "/dashboard":
          this.isDashActive = true;
          this.isSearchActive = false;
          this.isAgentActive = false;
          this.isAgentActive2 = false;
          this.isAgentActive3 = false;
          break;
        case "/search":
          this.isDashActive = false;
          this.isSearchActive = true;
          this.isAgentActive = false;
          this.isAgentActive2 = false;
          this.isAgentActive3 = false;
          break;
        case "/agents/login-details":
          this.isDashActive = false;
          this.isSearchActive = false;
          this.isAgentActive = true;
          this.isAgentActive2 = false;
          this.isAgentActive3 = true;
          break;   
        case "/agents/login-locations":
          this.isDashActive = false;
          this.isSearchActive = false;
          this.isAgentActive = true;
          this.isAgentActive2 = true;
          this.isAgentActive3 = false;
          break;       
        default:
          this.isDashActive = false;
          this.isSearchActive = false;
          this.isAgentActive = false;
          this.isAgentActive2 = false;
          this.isAgentActive3 = false;
          break;
      }
    }
  }
};
</script>

<style></style>
