const path = require('path');
const express = require('express');
const app = express();
const expressHbs = require("express-handlebars");
const hbs = require("hbs");

// view engine setup
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, '/views'));
app.engine("hbs", expressHbs(
    {
        layoutsDir: `${__dirname}/views/layouts`, 
        defaultLayout: "layout",
        extname: "hbs"
    }
))
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

//API routes
const clientIndexRouter = require('./routes/index')

app.use('/', clientIndexRouter)

module.exports = app
