var express = require("express");
var http = require("http");
var routes = require("./routes");
var path = require("path");
var urlencoded = require('url');
var bodyParser = require('body-parser');
var json = require("json");
var logger = require('logger');
const { Client } = require('pg');
var app = express();
var fs = require("fs")


const connectionString = 'jdbc:postgresql://w3.training5.modak.com:5432/chatbot';

const client = new Client({
    user: 'mt3089',
    host: 'w3.training5.modak.com',
    database: 'chatbot',
    password: 'mt3089@m07y21',
});
client.connect();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.get('/', routes.index);
app.post('/cloud_component_table', function (req, res, next) {
    client.query('select * from cloud_meta.cloud_component_table', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        //var response  = JSON.parse(result.rows).response;
        //res.status(200).send(response);
        res.status(200).send(result.rows);
    });
});

app.post('/cloud_sub_component_table', function (req, res, next) {
    client.query('SELECT * FROM cloud_meta.cloud_sub_component_table;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        //var response  = JSON.parse(result.rows.toString()).response;
        res.status(200).send(result.rows);
    });
});

app.post('/cloud_type_table', function (req, res, next) {
    client.query('SELECT * FROM cloud_meta.cloud_type_table;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        //var response  = JSON.parse(result.rows.toString()).response;
        res.status(200).send(result.rows);
    });
});

app.post('/cloud_component_lineage', function (req, res, next) {
    client.query('SELECT * FROM ado.ado_cloud_component_lineage;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        //var response  = JSON.parse(result.rows.toString()).response;
        res.status(200).send(result.rows);
    });
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});
