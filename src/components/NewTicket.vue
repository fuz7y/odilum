<template>
  <div>
    <section class="content-header">
      <h1>
        Create ticket
      </h1>
      <ol class="breadcrumb">
        <li><router-link to="/"><i class="fa fa-dashboard"></i> Dashboard</router-link></li>
        <li><router-link to="/tickets">Tickets</router-link></li>
        <li class="active">Create ticket</li>
      </ol>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <div class="form-horizontal">
              <h3>Consumer</h3>
              <div :class="['form-group', { 'has-error':hasTitleError }]">
                <label class="col-md-2 control-label">Title *</label>
                <div class="col-md-6">
                  <select v-model="newTicket.consumerTitle" class="form-control" placeholder="Title">
                    <option value="">Select a title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss.">Miss.</option>
                  </select>
                </div>
              </div>

              <div :class="['form-group', { 'has-error':hasNameError }]">
                <label class="control-label col-md-2">Name *</label>
                <div class="col-md-3"><input v-model="newTicket.consumerSurname" type="text" :class="['form-control', { 'no-error':!hasSurNameError }]" placeholder="Surname"></div>
                <div class="col-md-3"><input v-model="newTicket.consumerName" type="text" :class="['form-control', { 'no-error':!hasFirstNameError }]" placeholder="First"></div>
              </div>

              <div :class="['form-group', { 'has-error':hasPhoneError }]">
                <label class="col-md-2 control-label">Phone Number *</label>
                <div class="col-md-3"><input v-model="newTicket.consumerPhoneNumber" type="text" class="form-control" placeholder="Primary"></div>
                <div class="col-md-3"><input v-model="newTicket.consumerAlternatePhoneNumber" type="text" class="form-control no-error" placeholder="Alternative"></div>
              </div>

              <h3>Address</h3>
              <div :class="['form-group', { 'has-error':hasCityError }]">
                <label class="col-md-2 control-label">City *</label>
                <div class="col-md-6"><input v-model="newTicket.consumerCity" type="text" class="form-control" placeholder="City"></div>
              </div>

              <div :class="['form-group', { 'has-error':hasLagError }]">
                <label class="col-md-2 control-label">LAG *</label>
                <div class="col-md-6"><input v-model="newTicket.consumerLGA" type="text" class="form-control" placeholder="LGA"></div>
              </div>

              <div :class="['form-group', { 'has-error':hasStateError }]">
               <label class="col-md-2 control-label">State *</label>
                <div class="col-md-6"><input v-model="newTicket.consumerState" type="text" class="form-control" placeholder="State"></div>
              </div>

              <div :class="['form-group', { 'has-error':hasZoneError }]">
                <label class="col-md-2 control-label">Zone *</label>
                <div class="col-md-6"><input v-model="newTicket.consumerZone" type="text" class="form-control" placeholder="Zone"></div>
              </div>

              <h3>Complaint</h3>
              
              <div :class="['form-group', { 'has-error':hasCodeError }]">
                <label class="col-md-2 control-label">Code *</label>
                <div class="col-md-6"><input v-model="newTicket.complaintCode" type="text" class="form-control" placeholder="Code"></div>
              </div>
             
              <div :class="['form-group', { 'has-error':hasDescriptionError }]">
                <label class="col-md-2 control-label">Description *</label>
                <div class="col-md-10">
                  <textarea v-model="newTicket.complaintDescription" class="form-control textarea" placeholder="Enter a description for this complaint"></textarea>
                </div>
              </div>

              <div :class="['form-group', { 'has-error':hasNotesError }]">
                <label class="col-md-2 control-label">Notes *</label>
                <div class="col-md-10">
                  <textarea v-model="newTicket.agentNotes" class="form-control textarea" placeholder="Enter any notes you may have"></textarea>
                </div>
              </div>
          </div>
        </div>
        <div class="box-footer">
          <button @click="submit" type="submit" class="btn btn-primary">Submit</button>
          <router-link to="/tickets" class="btn btn-default">Back</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
var obj = {
  actionTakenByAgent: "string", // user.username
  agentCRMReleaseDateTime: "string", // auto
  agentDateTime: "string", // auto
  agentName: "string", // user.displayName
  agentNotes: "string", // form
  complaintCode: "string", // skip
  complaintDescription: "string", // form
  complaintSLA: "string", // skip
  complaintStatus: "string", // "Open"
  complaintTicketID: "string", // skip
  consumerAlternatePhoneNumber: "string", // form
  consumerCity: "string", // form
  consumerLGA: "string", // form
  consumerName: "string", // form
  consumerPhoneNumber: "string", // form
  consumerState: "string", // form
  consumerSurname: "string", // form
  consumerTitle: "string", // form
  consumerZone: "string", // form
  escalationDateTime: "2018-03-08T09:09:19.177Z", // skip
  exported: "string", // skip
  fileNameID: "string", // skip
  importDateTime: "2018-03-08T09:09:19.177Z", // skip
  providerTicketId: "string", // skip
  remarks: "string", // skip
  reportingOfficer: "string", // skip
  resolutionDateTime: "2018-03-08T09:09:19.177Z", // skip
  resolutionNotes: "string", // skip
  sLABreachStatus: false, // skip
  sPAgentName: "string", // skip
  serviceProvider: "string", // skip
  subCategory: "string", // "Agent"
  transactionID: 0 // skip
};

export default {
  name: "NewTicket",
  mounted() {
    $(".textarea").wysihtml5();
  },
  data() {
    return {
      errors: [],
      hasTitleError: false,
      hasNameError: false,
      hasSurNameError: false,
      hasFirstNameError: false,
      hasPhoneError: false,
      hasCityError: false,
      hasLagError: false,
      hasStateError: false,
      hasZoneError: false,
      hasCodeError: false,
      hasDescriptionError: false,
      hasNotesError: false,
      newTicket: {
        consumerTitle: ""
      }
    };
  },
  computed: {
    user: function() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    validateForm: function() {
      this.hasTitleError = false;
      this.hasNameError = false;
      this.hasSurNameError = false;
      this.hasFirstNameError = false;
      this.hasPhoneError = false;
      this.hasCityError = false;
      this.hasLagError = false;
      this.hasStateError = false;
      this.hasZoneError = false;
      this.hasCodeError = false;
      this.hasDescriptionError = false;
      this.hasNotesError = false;
      this.errors = [];

      if (!this.newTicket.consumerTitle) this.hasTitleError = true; 
      if (!this.newTicket.consumerSurname || !this.newTicket.consumerName) this.hasNameError = true;
      if (!this.newTicket.consumerSurname) this.hasSurNameError = true;
      if (!this.newTicket.consumerName) this.hasFirstNameError = true;
      if (!this.newTicket.consumerPhoneNumber) this.hasPhoneError = true;
      if (!this.newTicket.consumerCity) this.hasCityError = true;
      if (!this.newTicket.consumerLGA) this.hasLagError = true;
      if (!this.newTicket.consumerState) this.hasStateError = true;
      if (!this.newTicket.consumerZone) this.hasZoneError = true;
      if (!this.newTicket.complaintCode) this.hasCodeError = true;
      if (!this.newTicket.complaintDescription) this.hasDescriptionError = true;
      if (!this.newTicket.agentNotes) this.hasNotesError = true;

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

<style scoped>
.form-group .no-error {
  border-color: #d2d6de;
}
</style>