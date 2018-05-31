<template>
  <div>
    <section class="content-header">
      <h1>
        Search tickets
      </h1>
      <ol class="breadcrumb">
        <li><router-link to="/"><i class="fa fa-dashboard"></i> Dashboard</router-link></li>
        <li class="active">Search tickets</li>
      </ol>
    </section>

    <section class="content">
      <div class="box box-primary">
            <div class="box-body">
              <div class="input-group">
                <input type="text" class="form-control" v-model="qry" placeholder="Search with either Ticket # or Phone Number...">
                <span class="input-group-btn">
                  <button class="btn btn-default" @click="search" style="width: 60px;"><i class="fa fa-search"></i></button>
                </span>
              </div>

              <div class="table-responsive" v-if="showResults">
                <table class="table table-hover">
                  <tbody>
                    <tr v-for="(ticket, index) in tickets" :key="ticket.id">
                      <td style="width:100px;"><span :class="['label', formatStatus(ticket.complaintStatus)]">{{ ticket.complaintStatus }}</span></td>
                      <td>
                        <span class="pull-right"><i class="fa fa-clock-o"></i> Issued on {{ formatDate(ticket.ticketIssuedDateTime) }}</span>
                        <a href="#" @click="viewTicket(ticket, index)">
                          <b>{{ ticket.ticketID }}</b>
                        </a>
                        <p><small>{{ ticket.consumerName }} {{ ticket.consumerSurname }}</small></p>
                        <p><small>{{ ticket.complaintDescription }}</small></p>
                      </td>
                    </tr>
                    <tr v-if="!tickets.length">
                      <td colspan="2" class="text-center">No results found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div v-if="isBusy" class="overlay">
              <i class="fa fa-refresh fa-spin"></i>
            </div>
      </div>
    </section>

    <div class="modal fade" id="ticketModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">Ticket details</h4>
          </div>

          <div class="modal-body form-horizontal">
            <div class="form-group">
              <label class="control-label col-md-2">Ticket #:</label>
              <label class="control-label col-md-4 text-light-blue">{{ viewedTicket.ticketID }}</label>
              <label class="control-label col-md-2">Issued Date:</label>
              <label class="control-label col-md-4 text-light-blue">{{ formatDate(viewedTicket.ticketIssuedDateTime) }}</label>
            </div>

             <div class="form-group">
              <label class="control-label col-md-2">Status:</label>
              <label class="control-label col-md-10"><span :class="['label', formatStatus(viewedTicket.complaintStatus)]">{{ viewedTicket.complaintStatus }}</span></label>
            </div>

            <div class="form-group">
              <label class="control-label col-md-2">Consumer:</label>
              <label class="control-label col-md-4 text-light-blue">{{ viewedTicket.consumerTitle }} {{ viewedTicket.consumerSurname }} {{ viewedTicket.consumerName }}</label>
              <label class="control-label col-md-2">Phone #(s):</label>
              <label class="control-label col-md-4 text-light-blue">{{ viewedTicket.consumerPhoneNumber }}, {{ viewedTicket.consumerAlternatePhoneNumber }}</label>
            </div>

            <div class="form-group">
              <label class="control-label col-md-2">City:</label>
              <label class="control-label col-md-4 text-light-blue">{{ viewedTicket.consumerCity }}</label>
              <label class="control-label col-md-2">LGA:</label>
              <label class="control-label col-md-4 text-light-blue">{{ viewedTicket.consumerLGA }}</label>
            </div>

            <div class="form-group">
              <label class="control-label col-md-2">State:</label>
              <label class="control-label col-md-4 text-light-blue">{{ viewedTicket.consumerState }}</label>
              <label class="control-label col-md-2">Zone:</label>
              <label class="control-label col-md-4 text-light-blue">{{ viewedTicket.consumerZone }}</label>
            </div>

            <div class="form-group">
              <label class="control-label col-md-2">Agent's Name:</label>
              <label class="control-label col-md-4 text-light-blue">{{ viewedTicket.operatorAgentName }}</label>
              <label class="control-label col-md-2">Complaint Code:</label>
              <label class="control-label col-md-4 text-light-blue">{{ viewedTicket.complaintCode }}</label>
            </div>

            <div class="form-group">
              <div class="col-md-12">
                <label class="control-label">Complaint Description:</label>
                <p class="description-text">{{ viewedTicket.complaintDescription }}</p>
              </div>
            </div>            
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            <button :disabled="isModalBusy" v-if="viewedTicket.complaintStatus=='Open'" @click="updateTicket('Resolved')" type="button" class="btn btn-success">Mark as Resolved</button>
            <button :disabled="isModalBusy" v-if="viewedTicket.complaintStatus=='Open'" @click="updateTicket('Closed')" type="button" class="btn btn-primary">Close Ticket</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Search",
  data() {
    return {
      errors: [],
      showResults: false,
      isBusy: false,
      isModalBusy: false,
      qry: "",
      tickets: [],
      viewedTicketIndex: null,
      viewedTicket: {}
    };
  },
  methods: {
    search: function() {
      if (!this.qry) return;

      this.errors = [];
      this.showResults = true;
      this.isBusy = true;

      this.$http
        .get(
          "/ticket-manager-gateway-0.0.1-SNAPSHOT/v1/agents/searchTicket/ticketId/phoneNumber?" +
            "ticketID=" +
            this.qry +
            "&phoneNumber=" +
            this.qry
        )
        .then(
          function(res) {
            this.tickets = res.body;
            this.isBusy = false;
          },
          function(err) {
            $.notify(
              {
                message: "Ops! Something went wrong."
              },
              {
                allow_dismiss: false,
                type: "danger",
                template:
                  "<div data-notify='container' class='col-xs-11 col-sm-3 callout callout-{0}'><p data-notify='message'>{2}</p></div>"
              }
            );
            this.isBusy = false;
          }
        );
    },
    formatDate: function(str) {
      if (!str) return null;

      // var mnths = {
      //     Jan: "01",
      //     Feb: "02",
      //     Mar: "03",
      //     Apr: "04",
      //     May: "05",
      //     Jun: "06",
      //     Jul: "07",
      //     Aug: "08",
      //     Sep: "09",
      //     Oct: "10",
      //     Nov: "11",
      //     Dec: "12"
      //   },
      //   dateArray = str.split(" "),
      //   dateStr =
      //     [dateArray[5], mnths[dateArray[1]], dateArray[2]].join("-") +
      //     " " +
      //     dateArray[3];

      return moment(str).format("LLL");
    },
    formatStatus: function(status) {
      switch (status) {
        case "Open":
          return "label-info";
        case "Closed":
          return "label-default";
        case "Resolved":
          return "label-success";
        default:
          return "label-danger";
      }
    },
    viewTicket: function(ticket, index) {
      this.viewedTicketIndex = index;
      this.viewedTicket = ticket;
      $("#ticketModal").modal("show");
    },
    updateTicket: function(status) {
      $("#ticketModal").modal("hide");

      this.errors = [];
      this.isModalBusy = true;
      var notify = $.notify(
        {
          message: "Busy..."
        },
        {
          allow_dismiss: false,
          template:
            "<div data-notify='container' class='col-xs-11 col-sm-3 callout callout-{0}'><p data-notify='message'>{2}</p></div>"
        }
      );

      this.$http
        .post(
          "/ticket-manager-gateway-0.0.1-SNAPSHOT/v1/agents/updateAgentTicket?ticketID=" +
            this.viewedTicket.ticketID +
            "&status=" +
            status
        )
        .then(
          function(res) {
            this.tickets[this.viewedTicketIndex].complaintStatus = status;
            notify.update({
              message: "Ticket updated!",
              type: "success"
            });

            this.viewedTicket = {};
            this.viewedTicketIndex = null;
            this.isModalBusy = false;
          },
          function(err) {
            this.errors.push("Ticket update failed.");

            this.isModalBusy = false;

            this.errors.forEach(function(e) {
              notify.update({
                message: e,
                type: "warning"
              });
            });
          }
        );
    }
  }
};
</script>

<style scoped>
.control-label {
  text-align: left;
}
.description-text {
  border-radius: 5px;
  position: relative;
  padding: 5px 10px;
  background: #d2d6de;
  border: 1px solid #d2d6de;
  color: #444;
}
</style>