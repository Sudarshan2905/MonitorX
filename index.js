const express = require('express');
const client = require('prom-client'); //Metric Collection
const app = express();

const { createLogger, transports, format } = require("winston");
const LokiTransport = require("winston-loki");

const logger = createLogger({
    level: "info",

    format: format.combine(
        format.timestamp(),
        format.json()
    ),

    transports: [
        new transports.Console(),

        new LokiTransport({
            host: "http://127.0.0.1:3100",
            labels: {
                app: "node-monitor"
            },
            json: true
        })
    ]
});

const responseTime = require("response-time");
const {doSomeHeavyTask} =require('./util.js');

const port= 8000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({register: client.register});

const reqResTime = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

const reqCount = new client.Counter({
    name: "Total_Request",
    help: "Tells Total Requests"
})

app.use(
  responseTime((req, res, time) => {
    reqCount.inc();
    reqResTime
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(time / 1000); // Convert ms to seconds
  })
);

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/",(req,res)=>{
    logger.info("Req came on / route");
    return res.json({
        message :'Hello from express server.'
    });
});

app.get("/slow", async(req,res)=>{
    try{
        const timeTaken = await doSomeHeavyTask();
        
        logger.info("Req came on /slow route");
        return res.json({
            status : "Success",
            message : `Heavy Task Completed in ${timeTaken.delay}ms`,
        })
    } catch(error){
        
        logger.error(error.message);
        return res
            .status(500)
            .json({
                status : "Error",
                error : "Internal Server Error"
            })
    }
});

app.get("/metrics", async (req,res)=>{
    res.setHeader('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);

})


app.listen(port, ()=>{
    console.log(`app listing on port ${port}`);
})