<template>
  <div>
    <section class="content-header">
      <h1>
        Agent Login Details
      </h1>
      <ol class="breadcrumb">
        <li><router-link to="/"><i class="fa fa-dashboard"></i> Dashboard</router-link></li>
        <li>Agent Manangement</li>
        <li class="active">Agent Login Details</li>
      </ol>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-danger">
            <div class="box-header">
                  <h3 class="box-title">Login Details</h3>      
                  
                  <div class="pull-right box-tools">
                    <div data-toggle="tooltip" title="" data-original-title="Report range" id="reportrange" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
                      <i class="fa fa-calendar"></i>&nbsp;
                      <span></span> <b class="caret"></b>
                    </div>                    
                  </div>     
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="qry" placeholder="Search name of agent">
                    <span class="input-group-btn">
                      <button class="btn btn-default" @click="updateLoginList(0)" style="width: 60px;"><i class="fa fa-search"></i></button>
                    </span>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="pull-right">
                    <span v-if="logins.length">{{ (loginRes.number * loginRes.size) + 1 }}-{{ (loginRes.number * loginRes.size) + loginRes.numberOfElements }}/{{ loginRes.totalElements }}</span>
                    <div class="btn-group">
                      <button type="button" class="btn btn-default" @click="prev" data-toggle="tooltip" title="" data-original-title="Previous"><i class="fa fa-chevron-left"></i></button>
                      <button type="button" class="btn btn-default" @click="next" data-toggle="tooltip" title="" data-original-title="Next"><i class="fa fa-chevron-right"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>    
            
            <div class="table-responsive">
                <table class="table no-margin">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>LOCATION</th>
                      <th>AGENT NAME</th>
                      <th>FIRST CALL</th>
                      <th>LAST CALL</th>
                      <th>NO. OF CALLS</th>
                      <th>AVG. CALLS</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(login, index) in logins" :key="login.id">
                    <td>{{ index + 1 + (loginRes.number * loginRes.size)}}</td>
                    <td>{{ login.agentLocation }}</td>
                    <td>{{ login.userName }}</td>
                    <td>{{ formatDate(login.agentLoginTime) }}</td>
                    <td>{{ formatDate(login.agentLastTicketProcessedTime) }}</td>
                    <td>{{ login.ticketCount }}</td>
                    <td>
                      <span v-if="showArrow(login.ticketCount)" class="text-success"><i class="fa fa-chevron-up"></i> {{ showDiff(login.ticketCount) }}</span>
                      <span v-else class="text-danger"><i class="fa fa-chevron-down"></i> {{ showDiff(login.ticketCount) }}</span>
                    </td>
                  </tr>
                  <tr v-if="!logins.length">
                    <td colspan="6" class="text-center">There are no records to show.</td>
                  </tr>
                  </tbody>
                </table>
            </div>
            
            <div class="box-footer">
              <div class="row">
                <div class="col-md-12">
                  <div class="pull-right">
                    <span v-if="logins.length">{{ (loginRes.number * loginRes.size) + 1 }}-{{ (loginRes.number * loginRes.size) + loginRes.numberOfElements }}/{{ loginRes.totalElements }}</span>
                    <div class="btn-group">
                      <button type="button" class="btn btn-default" @click="prev" data-toggle="tooltip" title="" data-original-title="Previous"><i class="fa fa-chevron-left"></i></button>
                      <button type="button" class="btn btn-default" @click="next" data-toggle="tooltip" title="" data-original-title="Next"><i class="fa fa-chevron-right"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="isBusy2" class="overlay">
                  <i class="fa fa-refresh fa-spin"></i>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "AgentLoginDetails",
  mounted() {
    var start = moment().subtract(6, "days");
    var end = moment();

    $("#reportrange").daterangepicker(
      {
        startDate: start,
        endDate: end,
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [
            moment().subtract(1, "days"),
            moment().subtract(1, "days")
          ],
          "Last 7 Days": [moment().subtract(6, "days"), moment()],
          "Last 30 Days": [moment().subtract(29, "days"), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
          "Last Month": [
            moment()
              .subtract(1, "month")
              .startOf("month"),
            moment()
              .subtract(1, "month")
              .endOf("month")
          ]
        }
      },
      this.changeDate
    );

    this.changeDate(start, end);
  },
  data() {
    return {
      isBusy: false,
      isBusy2: false,
      logins: [],
      loginRes: {},
      isConnected: false,
      qry: "",
      startDate: "",
      endDate: "",
      pageSize: 50
    };
  },
  methods: {
    changeDate: function(start, end) {
      $("#reportrange span").html(
        start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
      );

      this.startDate = start.format("DD/MM/YYYY 00:00:00");
      this.endDate = end.format("DD/MM/YYYY 23:59:59");
      this.updateLoginList(0);
    },
    next: function() {
      if (this.loginRes.number < this.loginRes.totalPages - 1) {
        this.updateLoginList(this.loginRes.number + 1);
      }
    },
    prev: function() {
      if (this.loginRes.number > 0) {
        this.updateLoginList(this.loginRes.number - 1);
      }
    },
    updateLoginList: function(pageNumber) {
      var self = this;
      this.isBusy2 = true;
      this.$http
        .get(
          "/ticket-manager-service-0.0.1-SNAPSHOT/v1/loginUsers/viewAgentLoginDetailsByUsername?" +
            "agentName=" +
            self.qry.toUpperCase() +
            "&startDateString=" +
            self.startDate +
            "&endDateString=" +
            self.endDate +
            "&pageIndex=" +
            pageNumber +
            "&pageSize=" +
            self.pageSize
        )
        .then(
          function(res) {
            self.loginRes = res.body;
            self.logins = res.body.content;
            self.isBusy2 = false;
          },
          function(err) {
            $.notify(
              {
                message:
                  "Ops! Something went wrong. Data for Login List failed to load."
              },
              {
                allow_dismiss: false,
                type: "danger",
                template:
                  "<div data-notify='container' class='col-xs-11 col-sm-3 callout callout-{0}'><p data-notify='message'>{2}</p></div>"
              }
            );
            self.isBusy2 = false;
          }
        );
    },
    formatDate: function(date) {
      return moment(date).format("LLL");
    },
    showArrow: function(c) {
      return c - 36 > 0 ? true : false;
    },
    showDiff: function(c) {
      return c - 36;
    }
  }
};
</script>

<style></style>