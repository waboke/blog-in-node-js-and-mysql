const router = require('./routes.js');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyparser = require("body-parser");


app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use('/', router);





app.listen(3000, () => {
    console.log(` server started`)
  })