var express = require("express");
var cors = require("cors");
const promMid = require("express-prometheus-middleware");
const app = express();
require("dotenv").config();

app.use(cors());

app.use((req, res, next) => {
  if (req.headers.authorization !== process.env.auth) {
    return res.status(403).send("Forbidden");
  }
  next();
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 2.5, 5, 10],
  })
);

app.get("/time", function (req, res) {
  const currentEpochTime = Math.floor(Date.now() / 1000);
  const response = {
    properties: {
      epoch: {
        description:
          "The current server time, in epochseconds, at time of processing the request.",
        type: "number",
      },
    },
    required: [currentEpochTime],
    type: "object",
  };

  res.send(response);
});

app.get("/metrics", function (req, res) {
  res.send("metrics");
});

app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});
