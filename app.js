// server.js
// load the things we need
var express = require('express');
var app = express();
var mysql = require('mysql');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
//connecting to DB with country stat data
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Aem6443$$",
	database: "country"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post("/submit", function(req, res){
	console.log("Test submit");
	let from_country = req.body.from_country;
	let to_country = req.body.to_country;
	console.dir(req.body);
	console.log(req.body.to_country);
	console.log(req.body.from_country);
	if(to_country === from_country){
		con.query("UPDATE country_stats SET points = points + 1 where name = \x22"+to_country+"\x22;", function(err, result, fields){
		console.log(result);
		if (err) throw err;
		
		 });					
	}else{
		con.query("UPDATE country_stats SET points = points - 1 where name = \x22"+to_country+"\x22;", function(err, result, fields){
                console.log(result);
                if (err) throw err;
               	
		}); 
	}
	con.query("SELECT * FROM country_stats;", function(err, result, fields){
                console.log(result);
                if (err) throw err;
                res.end(JSON.stringify(result));
        });    


});

app.get("/stats", function(req, res){
	con.query("SELECT * FROM country_stats;", function(err, result, fields){
		console.log(result);
		if (err) throw err;
		res.end(JSON.stringify(result));
	});	
});

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));
// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');
