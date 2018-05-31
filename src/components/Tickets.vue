<template>
  <div>
    <section class="content-header">
      <h1>
        Tickets
      </h1>
      <ol class="breadcrumb">
        <li><router-link to="/"><i class="fa fa-dashboard"></i> Dashboard</router-link></li>
        <li class="active">Tickets</li>
      </ol>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-header">
              <h3 class="box-title">My tickets</h3>

              <div class="pull-right box-tools">
                <div class="input-group input-group-sm pull-right" style="width: 150px;">
                  <input type="text" name="table_search" class="form-control pull-right" placeholder="Search">

                  <div class="input-group-btn">
                    <button @click="search" type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                  </div>
                </div>

                <router-link style="margin-right: 5px;" to="/tickets/new" class="btn btn-sm btn-primary pull-right" data-toggle="tooltip" title="" data-original-title="Create a new ticket">
                  <i class="fa fa-plus"></i>
                </router-link>
              </div>
        </div>
        <div class="box-body table-responsive no-padding">
              <table class="table table-hover">
                <tbody>
                  <tr>
                    <th>Ticket #</th>
                    <th>Issued Date</th>
                    <th>Status</th>
                    <th style="width: 100px;"></th>
                  </tr>
                  <tr v-for="(ticket, index) in tickets">
                    <td>{{ ticket.ticketID }}</td>
                    <td>{{ formatDate(ticket.ticketIssuedDateTime) }}</td>
                    <td><span :class="['label', formatStatus(ticket.complaintStatus)]">{{ ticket.complaintStatus }}</span></td>
                    <td><a href="#" class="btn btn-sm btn-default"><i class="fa fa-folder"></i> View</a></td>
                  </tr>
                  <tr v-if="!tickets.length">
                      <td colspan="4" class="text-center">There is nothing to display here.</td>
                    </tr>
                </tbody>
              </table>
        </div>

        <div class="box-footer clearfix">
              <ul class="pagination pagination-sm no-margin pull-right">
                <li><a href="#">«</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">»</a></li>
              </ul>
        </div>

        <div v-if="isBusy" class="overlay">
              <i class="fa fa-refresh fa-spin"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Tickets",
  mounted() {
    
  },
  computed: {
    user: function() {
      return this.$store.state.currentUser;
    }
  },
  data() {
    return {
      isBusy: false,
      tickets: []
    };
  },
  methods: {
    search: function() {
      var self = this;
      self.isBusy = true;

      setTimeout(function() {
        self.isBusy = false;
      }, 2000);
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
    }
  }
};
</script>

<style></style>
