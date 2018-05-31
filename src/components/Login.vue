<template>
  <div class="login-box">
    <div class="login-logo">
      <b>Odilum</b>
    </div>
    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start</p>

      <div>
        <div :class="['form-group', 'has-feedback', { 'has-error':hasUsernameError }]">
          <input type="email" class="form-control" placeholder="Username *" v-model="user.username">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div :class="['form-group', 'has-feedback', { 'has-error':hasPasswordError }]">
          <input type="password" class="form-control" placeholder="Password *" v-model="user.password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">            
          </div>
          <div class="col-xs-4">
            <button :disabled="isBusy" type="submit" class="btn btn-primary btn-block btn-flat" @click="login">Sign In</button>
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isBusy: false,
      errors: [],
      hasUsernameError: false,
      hasPasswordError: false,
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    validateForm: function() {
      this.hasUsernameError = false;
      this.hasPasswordError = false;
      this.errors = [];

      if (!this.user.username || !this.user.password) this.errors.push("Your details are incorrect. Please try again.");
      if (!this.user.username) this.hasUsernameError = true;
      if (!this.user.password) this.hasPasswordError = true;
      if (this.errors.length) return false;
      return true;
    },
    login: function() {
      this.isBusy = true;
      var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o";

      if (this.validateForm()) {
        if (this.user.username != "admin" || this.user.password != "admin") {
          this.errors.push("Your details are incorrect. Please try again.");
        } else {
          this.$auth.setToken(token, Date.now() + 14400000); // + 4 hours
          window.location.replace("./");
        }

        /* this.$http
          .post("/path", this.user)
          .then(
            function(res) {
              this.$auth.setToken(res.body.token, Date.now() + 14400000); // + 4 hours
              window.location.replace("./");
            },
            function(err) {
              this.errors.push("Your details are incorrect. Please try again.");
            }
          ); */
      }

      this.errors.forEach(function(e) {
        $.notify(
          {
            message: e
          },
          {
            allow_dismiss: false,
            type: "danger",
            template:
              "<div data-notify='container' class='col-xs-11 col-sm-3 callout callout-{0}'><p data-notify='message'>{2}</p></div>"
          }
        );
      });

      this.isBusy = false;
    }
  }
};
</script>

<style>
body {
  background: #d2d6de;
}
</style>