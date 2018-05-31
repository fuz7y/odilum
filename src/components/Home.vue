<template>
  <div>
    <section class="content-header">
      <h1>
        Dashboard
      </h1>
      <ol class="breadcrumb">
        <li class="active"><a><i class="fa fa-dashboard"></i> Dashboard</a></li>
      </ol>
    </section>

    <section class="content">
      <div class="row">  
        <div class="col-md-8">
          <div class="box box-primary">
            <div class="box-header">
              <h3 class="box-title">Live Feed</h3>

              <div class="pull-right box-tools">
                <i v-if="isConnected" data-toggle="tooltip" title="" data-original-title="Connected" class="fa fa-circle text-success"></i>
                <i v-else data-toggle="tooltip" title="" data-original-title="Disconnected" class="fa fa-circle text-danger"></i>
              </div>
            </div>
            <div class="box-body">
              <div id="socketContainer" style="height: 250px"></div>
            </div>            
          </div>
        </div>
        <div class="col-md-4">
          <div class="info-box">
            <span class="info-box-icon bg-blue"><i class="fa fa-ticket"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Open</span>
              <span class="info-box-number">{{ formatNumber(open) }}</span>
              <span class="progress-description">
                    No. of open tickets for today
              </span>
            </div>
          </div>

          <div class="info-box">
            <span class="info-box-icon bg-green"><i class="fa fa-ticket"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Resolved</span>
              <span class="info-box-number">{{ formatNumber(resolved) }}</span>
              <span class="progress-description">
                    No. of tickets resolved today
              </span>              
            </div>
          </div>

          <div class="info-box">
            <span class="info-box-icon bg-red"><i class="fa fa-ticket"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Breach</span>
              <span class="info-box-number">{{ formatNumber(breach) }}</span>
              <span class="progress-description">
                    No. of breaches for today
              </span>
            </div>
          </div>
        </div>        
      </div>
      
      <div class="row">
        <div class="col-md-12">
          <div data-toggle="tooltip" title="" data-original-title="Report range" id="reportrange" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
            <i class="fa fa-calendar"></i>&nbsp;
            <span></span> <b class="caret"></b>
          </div>
        </div>
      </div>

      <br>
      
      <div class="row">      
        <div class="col-md-6">
          <div class="box box-danger">
            <div class="box-header">
              <h3 class="box-title">Status <span class="text-red">(Ticket Count: {{ count1 }})</span></h3>

              <div class="pull-right box-tools">
                <button @click="refreshStatus" type="button" class="btn btn-default btn-sm pull-right" data-toggle="tooltip" title="" data-original-title="Refresh">
                  <i class="fa fa-refresh"></i>
                </button>
              </div>
            </div>
            <div class="box-body">
              <div id="statusContainer" style="height: 250px"></div>
            </div>
            <div v-if="isBusy1" class="overlay">
              <i class="fa fa-refresh fa-spin"></i>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="box box-danger">
            <div class="box-header">
              <h3 class="box-title">Complaint Codes <span class="text-red">(Ticket Count: {{ count2 }})</span></h3>

              <div class="pull-right box-tools">
                <button @click="refreshCompalaintCode" type="button" class="btn btn-default btn-sm pull-right" data-toggle="tooltip" title="" data-original-title="Refresh">
                  <i class="fa fa-refresh"></i>
                </button>
              </div>
            </div>
            <div class="box-body">
              <div id="compalaintCodeContainer" style="height: 250px"></div>
            </div>
            <div v-if="isBusy2" class="overlay">
              <i class="fa fa-refresh fa-spin"></i>
            </div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="box box-danger">
            <div class="box-header">
              <h3 class="box-title">States <span class="text-red">(Ticket Count: {{ count5 }})</span></h3>

              <div class="pull-right box-tools">
                <button @click="refreshStates" type="button" class="btn btn-default btn-sm pull-right" data-toggle="tooltip" title="" data-original-title="Refresh">
                  <i class="fa fa-refresh"></i>
                </button>
              </div>
            </div>
            <div class="box-body">
              <div id="stateContainer" style="height: 250px"></div>
            </div>
            <div v-if="isBusy5" class="overlay">
              <i class="fa fa-refresh fa-spin"></i>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="box box-danger">
            <div class="box-header">
              <h3 class="box-title">Zones <span class="text-red">(Ticket Count: {{ count3 }})</span></h3>

              <div class="pull-right box-tools">
                <button @click="refreshZone" type="button" class="btn btn-default btn-sm pull-right" data-toggle="tooltip" title="" data-original-title="Refresh">
                  <i class="fa fa-refresh"></i>
                </button>
              </div>
            </div>
            <div class="box-body">
              <div id="zoneContainer" style="height: 250px"></div>
            </div>
            <div v-if="isBusy3" class="overlay">
              <i class="fa fa-refresh fa-spin"></i>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="box box-danger">
            <div class="box-header">
              <h3 class="box-title">Service Providers by Status <span class="text-red">(Ticket Count: {{ count4 }})</span></h3>

              <div class="pull-right box-tools">
                <button @click="refreshOperatorStatus" type="button" class="btn btn-default btn-sm pull-right" data-toggle="tooltip" title="" data-original-title="Refresh">
                  <i class="fa fa-refresh"></i>
                </button>
              </div>
            </div>
            <div class="box-body">
              <div id="operatorByStatusContainer" style="height: 250px"></div>
            </div>
            <div v-if="isBusy4" class="overlay">
              <i class="fa fa-refresh fa-spin"></i>
            </div>
          </div>
        </div>
        
        <div class="col-md-12">
          <div class="box box-danger">
            <div class="box-header">
              <h3 class="box-title">Service Providers by States <span class="text-red">(Ticket Count: {{ count6 }})</span></h3>

              <div class="pull-right box-tools">
                <button @click="refreshStateServiceProvider" type="button" class="btn btn-default btn-sm pull-right" data-toggle="tooltip" title="" data-original-title="Refresh">
                  <i class="fa fa-refresh"></i>
                </button>
              </div>
            </div>
            <div class="box-body">
              <div id="stateServiceProviderContainer" style="height: 250px"></div>
            </div>
            <div v-if="isBusy6" class="overlay">
              <i class="fa fa-refresh fa-spin"></i>
            </div>
          </div>
        </div>

      </div>      
    </section>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import moment from "moment";
import highcharts from "highcharts";

highcharts.setOptions({
  global: {
    useUTC: false
  }
});

var socket = new SockJS(
  process.env.API +
    "/ticket-analytics-websocket-service-0.0.1-SNAPSHOT/odilum-analytics/"
);
var client = Stomp.over(socket);

client.reconnect_delay = 5000;
client.debug = function(str) {};

var statusOptions = {
  legend: {
    align: "right",
    verticalAlign: "top",
    layout: "vertical"
  },
  chart: {
    renderTo: "statusContainer",
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
      beta: 0
    }
  },
  title: {
    text: ""
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      depth: 35,
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  series: []
};

var compalaintCodeOptions = {
  legend: {
    align: "right",
    verticalAlign: "top",
    layout: "vertical"
  },
  chart: {
    renderTo: "compalaintCodeContainer",
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
      beta: 0
    }
  },
  title: {
    text: ""
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      depth: 35,
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  series: []
};

var zoneOptions = {
  legend: {
    align: "right",
    verticalAlign: "top",
    layout: "vertical"
  },
  chart: {
    renderTo: "zoneContainer",
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
      beta: 0
    }
  },
  title: {
    text: ""
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      depth: 35,
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  series: []
};

var stateOptions = {
  chart: {
    renderTo: "stateContainer",
    type: "column"
  },
  title: {
    text: ""
  },
  xAxis: {
    type: "category",
    labels: {
      rotation: -45,
      style: {
        fontSize: "13px",
        fontFamily: "Verdana, sans-serif"
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: "Tickets"
    }
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: false
      }
    }
  },
  series: []
};

var stateServiceProviderOptions = {
  chart: {
    renderTo: "stateServiceProviderContainer",
    type: "column"
  },
  title: {
    text: ""
  },
  xAxis: {
    type: "category",
    labels: {
      rotation: -45,
      style: {
        fontSize: "13px",
        fontFamily: "Verdana, sans-serif"
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: "Tickets"
    },
    stackLabels: {
      enabled: false
    }
  },
  legend: {
    align: "right",
    verticalAlign: "top",
    layout: "horizontal"
  },
  tooltip: {
    pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
  },
  plotOptions: {
    column: {
      stacking: "normal",
      dataLabels: {
        enabled: false
      }
    }
  },
  series: []
};

var operatorByStatusOptions = {
  chart: {
    renderTo: "operatorByStatusContainer",
    type: "column"
  },
  title: {
    text: ""
  },
  xAxis: {
    type: "category",
    labels: {
      rotation: -45,
      style: {
        fontSize: "13px",
        fontFamily: "Verdana, sans-serif"
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: "Tickets"
    },
    stackLabels: {
      enabled: false
    }
  },
  legend: {
    align: "right",
    verticalAlign: "top",
    layout: "horizontal"
  },
  tooltip: {
    pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
  },
  plotOptions: {
    column: {
      stacking: "normal",
      dataLabels: {
        enabled: false
      }
    }
  },
  series: []
};

var liveOptions = {
  chart: {
    renderTo: "socketContainer",
    type: "spline",
    animation: highcharts.svg, // don't animate in old IE
    marginRight: 10,
    events: {}
  },
  title: {
    text: ""
  },
  xAxis: {
    type: "datetime",
    tickPixelInterval: 150
  },
  yAxis: {
    title: {
      text: "Tickets"
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: "#808080"
      }
    ]
  },
  tooltip: {
    formatter: function() {
      return (
        "<b>" +
        this.series.name +
        "</b><br/>" +
        highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x) +
        "<br/>" +
        highcharts.numberFormat(this.y, 2)
      );
    }
  },
  legend: {
    align: "right",
    verticalAlign: "top",
    layout: "horizontal"
  },
  exporting: {
    enabled: false
  },
  series: []
};

export default {
  name: "Home",
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
    this.getDataForLive();
    this.connect();
    this.startLive();
  },
  data() {
    return {
      isBusy1: false,
      isBusy2: false,
      isBusy3: false,
      isBusy4: false,
      isBusy5: false,
      isBusy6: false,
      isConnected: false,
      resolvedLive: 0,
      openLive: 0,
      breachLive: 0,
      resolved: 0,
      open: 0,
      breach: 0,
      startDate: "",
      endDate: "",
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      count6: 0
    };
  },
  methods: {
    refreshStatus: function() {
      var d = [];

      this.isBusy1 = true;
      this.count1 = 0;

      this.$http
        .get(
          "/ticket-manager-gateway-0.0.1-SNAPSHOT/v1/analytics/getTicketCountByStatus?startDateString=" +
            this.startDate +
            "&endDateString=" +
            this.endDate
        )
        .then(
          function(res) {
            for (var field in res.body) {
              d.push({
                name: field,
                y: res.body[field],
                color: this.getStatusColor(field)
              });
              this.count1 += res.body[field];
            }

            this.isBusy1 = false;

            statusOptions.series = [
              {
                type: "pie",
                name: "Tickets",
                data: d.sort()
              }
            ];

            this.generateChart(statusOptions);
          },
          function(err) {
            $.notify(
              {
                message:
                  "Ops! Something went wrong. Data for Status chart failed to load."
              },
              {
                allow_dismiss: false,
                type: "danger",
                template:
                  "<div data-notify='container' class='col-xs-11 col-sm-3 callout callout-{0}'><p data-notify='message'>{2}</p></div>"
              }
            );
            this.isBusy1 = false;
          }
        );
    },
    refreshCompalaintCode: function() {
      var d = [];

      this.isBusy2 = true;
      this.count2 = 0;

      this.$http
        .get(
          "/ticket-manager-gateway-0.0.1-SNAPSHOT/v1/analytics/getTicketCountByComplaintCode?startDateString=" +
            this.startDate +
            "&endDateString=" +
            this.endDate
        )
        .then(
          function(res) {
            for (var field in res.body) {
              d.push([field, res.body[field]]);
              this.count2 += res.body[field];
            }

            this.isBusy2 = false;

            compalaintCodeOptions.series = [
              {
                type: "pie",
                name: "Tickets",
                data: d.sort()
              }
            ];

            this.generateChart(compalaintCodeOptions);
          },
          function(err) {
            $.notify(
              {
                message:
                  "Ops! Something went wrong. Data for Compalaint Codes chart failed to load."
              },
              {
                allow_dismiss: false,
                type: "danger",
                template:
                  "<div data-notify='container' class='col-xs-11 col-sm-3 callout callout-{0}'><p data-notify='message'>{2}</p></div>"
              }
            );
            this.isBusy2 = false;
          }
        );
    },
    refreshZone: function() {
      var d = [];

      this.isBusy3 = true;
      this.count3 = 0;

      this.$http
        .get(
          "/ticket-manager-gateway-0.0.1-SNAPSHOT/v1/analytics/getTicketCountByZone?startDateString=" +
            this.startDate +
            "&endDateString=" +
            this.endDate
        )
        .then(
          function(res) {
            for (var field in res.body) {
              d.push([field, res.body[field]]);
              this.count3 += res.body[field];
            }

            this.isBusy3 = false;

            zoneOptions.series = [
              {
                type: "pie",
                name: "Tickets",
                data: d.sort()
              }
            ];

            this.generateChart(zoneOptions);
          },
          function(err) {
            $.notify(
              {
                message:
                  "Ops! Something went wrong. Data for Zones chart failed to load."
              },
              {
                allow_dismiss: false,
                type: "danger",
                template:
                  "<div data-notify='container' class='col-xs-11 col-sm-3 callout callout-{0}'><p data-notify='message'>{2}</p></div>"
              }
            );
            this.isBusy3 = false;
          }
        );
    },
    refreshOperatorStatus: function() {
      var dOthers = [];
      var dBreach = [];
      var dOpen = [];
      var dResolved = [];

      this.isBusy4 = true;
      this.count4 = 0;

      this.$http
        .get(
          "/ticket-manager-gateway-0.0.1-SNAPSHOT/v1/analytics/groupCountAllTicketLogsByOperatorByStatus?startDateString=" +
            this.startDate +
            "&endDateString=" +
            this.endDate
        )
        .then(
          function(res) {
            for (var field in res.body) {
              for (var opr in res.body[field]) {
                switch (opr) {
                  case "Breach":
                    dBreach.push([field, res.body[field][opr]] || 0);
                    break;
                  case "Open":
                    dOpen.push([field, res.body[field][opr]] || 0);
                    break;
                  case "Resolved":
                    dResolved.push([field, res.body[field][opr]] || 0);
                    break;
                  default:
                    dOthers.push([field, res.body[field][opr]] || 0);
                    break;
                }

                this.count4 += res.body[field][opr];
              }
            }

            this.isBusy4 = false;

            operatorByStatusOptions.series = [
              {
                name: "Others",
                data: dOthers.sort(),
                color: "grey"
              },
              {
                name: "Breach",
                data: dBreach.sort(),
                color: "#dd4b39"
              },
              {
                name: "Open",
                data: dOpen.sort(),
                color: "#0073b7"
              },
              {
                name: "Resolved",
                data: dResolved.sort(),
                color: "#00a65a"
              }
            ];

            this.generateChart(operatorByStatusOptions);
          },
          function(err) {
            $.notify(
              {
                message:
                  "Ops! Something went wrong. Data for Service Providers by States chart failed to load."
              },
              {
                allow_dismiss: false,
                type: "danger",
                template:
                  "<div data-notify='container' class='col-xs-11 col-sm-3 callout callout-{0}'><p data-notify='message'>{2}</p></div>"
              }
            );
            this.isBusy4 = false;
          }
        );
    },
    refreshStates: function() {
      var d = [];

      this.isBusy5 = true;
      this.count5 = 0;

      this.$http
        .get(
          "/ticket-manager-gateway-0.0.1-SNAPSHOT/v1/analytics/getTicketCountByStateOfOrigin?startDateString=" +
            this.startDate +
            "&endDateString=" +
            this.endDate
        )
        .then(
          function(res) {
            for (var field in res.body) {
              d.push([field, res.body[field]]);
              this.count5 += res.body[field];
            }

            this.isBusy5 = false;
            stateOptions.series = [
              {
                name: "Tickets",
                data: d.sort()
              }
            ];

            this.generateChart(stateOptions);
          },
          function(err) {
            $.notify(
              {
                message:
                  "Ops! Something went wrong. Data for States chart failed to load."
              },
              {
                allow_dismiss: false,
                type: "danger",
                template:
                  "<div data-notify='container' class='col-xs-11 col-sm-3 callout callout-{0}'><p data-notify='message'>{2}</p></div>"
              }
            );
            this.isBusy5 = false;
          }
        );
    },
    refreshStateServiceProvider: function() {
      var dOthers = [];
      var dMtn = [];
      var dAirtel = [];
      var dEtisalat = [];
      var dGlo = [];
      var d9mobile = [];

      this.isBusy6 = true;
      this.count6 = 0;

      this.$http
        .get(
          "/ticket-manager-gateway-0.0.1-SNAPSHOT/v1/analytics/groupCountAllTicketLogsByStatePerServiceProvider?startDateString=" +
            this.startDate +
            "&endDateString=" +
            this.endDate
        )
        .then(
          function(res) {
            for (var field in res.body) {
              for (var opr in res.body[field]) {
                switch (opr) {
                  case "MTN":
                    dMtn.push([field, res.body[field][opr]] || 0);
                    break;
                  case "AIRTEL":
                    dAirtel.push([field, res.body[field][opr]] || 0);
                    break;
                  case "ETISALAT":
                    dEtisalat.push([field, res.body[field][opr]] || 0);
                    break;
                  case "GLO":
                    dGlo.push([field, res.body[field][opr]] || 0);
                    break;
                  case "9MOBILE":
                    d9mobile.push([field, res.body[field][opr]] || 0);
                    break;
                  default:
                    dOthers.push([field, res.body[field][opr]] || 0);
                    break;
                }

                this.count6 += res.body[field][opr];
              }
            }

            this.isBusy6 = false;

            stateServiceProviderOptions.series = [
              {
                name: "OTHERS",
                data: dOthers.sort(),
                color: "#0073b7"
              },
              {
                name: "MTN",
                data: dMtn.sort(),
                color: "yellow"
              },
              {
                name: "AIRTEL",
                data: dAirtel.sort(),
                color: "red"
              },
              {
                name: "ETISALAT",
                data: dEtisalat.sort(),
                color: "#32cd32"
              },
              {
                name: "GLO",
                data: dGlo.sort(),
                color: "green"
              },
              {
                name: "9MOBILE",
                data: d9mobile.sort(),
                color: "#32cd32"
              }
            ];

            this.generateChart(stateServiceProviderOptions);
          },
          function(err) {
            $.notify(
              {
                message:
                  "Ops! Something went wrong. Data for Service Providers by States chart failed to load."
              },
              {
                allow_dismiss: false,
                type: "danger",
                template:
                  "<div data-notify='container' class='col-xs-11 col-sm-3 callout callout-{0}'><p data-notify='message'>{2}</p></div>"
              }
            );
            this.isBusy6 = false;
          }
        );
    },
    startLive: function() {
      var self = this;

      liveOptions.chart.events.load = function() {
        var liveChart = this,
          seriesOpen = liveChart.series[0],
          seriesResolved = liveChart.series[1],
          seriesBreach = liveChart.series[2];

        setInterval(function() {
          var d = new Date().getTime(),
            xOpen = d,
            xResolved = d,
            xBreach = d,
            yOpen = self.openLive,
            yResolved = self.resolvedLive,
            yBreach = self.breachLive;

          seriesOpen.addPoint([xOpen, yOpen], true, true);
          seriesResolved.addPoint([xResolved, yResolved], true, true);
          seriesBreach.addPoint([xBreach, yBreach], true, true);

          self.openLive = 0;
          self.resolvedLive = 0;
          self.breachLive = 0;
        }, 5000);
      };

      liveOptions.series = [
        {
          name: "Open",
          data: this.getIniDataForLive(),
          color: "#0073b7"
        },
        {
          name: "Resolved",
          data: this.getIniDataForLive(),
          color: "#00a65a"
        },
        {
          name: "Breach",
          data: this.getIniDataForLive(),
          color: "#dd4b39"
        }
      ];

      this.generateChart(liveOptions);
    },
    getDataForLive: function() {
      this.$http
        .get(
          "/ticket-manager-gateway-0.0.1-SNAPSHOT/v1/analytics/groupCountAllTicketLogsByStatus"
        )
        .then(
          function(msg) {
            var res = { Breach: 0, Open: 0, Resolved: 0 };

            res = msg.body;

            this.open = res.Open ? res.Open : 0;
            this.resolved = res.Resolved ? res.Resolved : 0;
            this.breach = res.Breach ? res.Breach : 0;
          },
          function(err) {
            $.notify(
              {
                message:
                  "Ops! Something went wrong. Data for daily ticket count failed to load."
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
    getIniDataForLive: function() {
      var data = [];
      var time = new Date().getTime();
      var i;

      for (i = -19; i <= 0; i += 1) {
        data.push({
          x: time + i * 5000,
          y: 0
        });
      }

      return data;
    },
    generateChart: function(options) {
      var chart = new highcharts.chart(options);
    },
    formatNumber: function(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    connect: function() {
      client.connect({}, this.connectCallback, this.errorCallback);
    },
    disconnect: function() {
      if (stompClient !== null) {
        client.disconnect();
      }

      this.isConnected = false;
    },
    connectCallback: function(frame) {
      var self = this;

      client.subscribe("/topic/dashboard", function(message) {
        var res = { Breach: 0, Open: 0, Resolved: 0 };

        res = JSON.parse(message.body);

        self.openLive = res.Open ? res.Open : 0;
        self.resolvedLive = res.Resolved ? res.Resolved : 0;
        self.breachLive = res.Breach ? res.Breach : 0;

        self.open += res.Open ? res.Open : 0;
        self.resolved += res.Resolved ? res.Resolved : 0;
        self.breach += res.Breach ? res.Breach : 0;

        // var d = new Date().getTime();

        // console.log(
        //   moment(d).format("LLL") +
        //     ": Open: " +
        //     self.openLive +
        //     " | Resolved: " +
        //     self.resolvedLive +
        //     " | Breach: " +
        //     self.breachLive
        // );
      });

      console.log("Connected");
      self.isConnected = true;
    },
    errorCallback: function(error) {
      this.isConnected = false;
      console.log("Ops! Something went wrong with your connection.");
    },
    changeDate: function(start, end) {
      var self = this;

      self.startDate = start.format("DD/MM/YYYY 00:00:00");
      self.endDate = end.format("DD/MM/YYYY 23:59:59");

      self.refreshStatus();
      self.refreshCompalaintCode();
      self.refreshZone();
      self.refreshOperatorStatus();
      self.refreshStates();
      self.refreshStateServiceProvider();

      $("#reportrange span").html(
        start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
      );
    },
    getStatusColor: function(status) {
      var color = "";

      switch (status) {
        case "Open":
          color = "#0073b7";
          break;
        case "Resolved":
          color = "#00a65a";
          break;
        case "Breach":
          color = "#dd4b39";
          break;
        default:
          color = "grey";
          break;
      }

      return color;
    }
  }
};
</script>

<style></style>