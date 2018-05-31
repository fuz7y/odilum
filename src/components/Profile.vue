<template>
  <div>
    <section class="content-header">
      <h1>
        Profile
      </h1>
      <ol class="breadcrumb">
        <li><router-link to="/"><i class="fa fa-dashboard"></i> Dashboard</router-link></li>
        <li class="active">Profile</li>
      </ol>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-md-3">
          <div class="box box-primary">
            <div class="box-body box-profile">
              <img class="profile-user-img img-responsive img-circle" src="../static/dist/img/user2-160x160.jpg" alt="User profile picture">

              <h3 class="profile-username text-center">{{ user.displayName }}</h3>

              <p class="text-muted text-center">{{ user.role }}</p>

              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <b>Tickets</b> <a class="pull-right">0</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#settings" data-toggle="tab">Settings</a></li>
            </ul>
            <div class="tab-content">
              <div class="active tab-pane" id="settings">
                <div class="form-horizontal">
                  <div :class="['form-group', { 'has-error':hasCurrentPasswordError }]">
                    <label class="col-sm-3 control-label">Current Password *</label>
                    <div class="col-sm-6">
                      <input v-model="password.currentPassword" type="password" class="form-control" placeholder="Current password">
                    </div>
                  </div>
                  
                  <div :class="['form-group', { 'has-error':hasNewPasswordError }]">
                    <label class="col-sm-3 control-label">New Password *</label>
                    <div class="col-sm-6">
                      <input v-model="password.NewPassword" type="password" class="form-control" placeholder="New password">
                    </div>
                  </div>

                  <div :class="['form-group', { 'has-error':hasConfirmNewPasswordError }]">
                    <label class="col-sm-3 control-label">Confirm New Password *</label>
                    <div class="col-sm-6">
                      <input v-model="password.confirmNewPassword" type="password" class="form-control" placeholder="Confirm new password">
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-sm-offset-3 col-sm-6">
                      <button @click="submit" type="submit" class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    user: function() {
      return this.$store.state.currentUser;
    }
  },
  data() {
    return {
      errors: [],
      hasCurrentPasswordError: false,
      hasNewPasswordError: false,
      hasConfirmNewPasswordError: false,
      password: {}
    };
  },
  methods: {
    validateForm: function() {
      this.hasCurrentPasswordError = false;
      this.hasNewPasswordError = false;
      this.hasConfirmNewPasswordError = false;
      this.errors = [];

      if (!this.password.currentPassword) this.hasCurrentPasswordError = true;
      if (!this.password.newPassword) this.hasNewPasswordError = true;
      if (!this.password.confirmNewPassword) this.hasConfirmNewPasswordError = true;

      if (this.password.newPassword != this.password.confirmNewPassword) {
        this.hasConfirmNewPasswordError = true;
        this.errors.push("The new password and confirmation passwords do no match.");
      }
      if (this.errors.length) return false;
      return true;
    },
    submit: function() {
      if (this.validateForm()) {
        this.errors.push("Not yet functional.");
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
    }
  }
};
</script>

<style></style>
