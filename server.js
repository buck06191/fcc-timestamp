// server.js
// where your node app starts

// init project
var express = require('express');

var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// set up route
app.get("/api/timestamp/:date_string(*)", function(req, res){
  console.log(req.params);
  let utcPattern = /^[\d{4}-\d{2}-\d{2}|\d{1,}]$/;
  let date_string = req.params.date_string;
  if (utcPattern.test(date_string)) {
    let d = new Date(intParser(date_string));
    res.json({utc: d.toUTCString(), unix: d.valueOf()}); 
  } else if (date_string.length===0){
    let d = new Date() 
    res.json({utc: d.toUTCString(), unix: d.valueOf()}); 
  } else {
    res.json({utc: "Invalid Date", unix: null});
}
});

function intParser(s){
  if (isNaN(s)){
    return s;
  } else {
    return Number(s);
  }
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});