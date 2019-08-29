console.log("test")
let canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = '#f00';
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(100,50);
ctx.lineTo(50, 100);
ctx.lineTo(0, 90);
ctx.closePath();
ctx.fill();

var ct1 = canvas.getContext('2d');
ct1.fillStyle = '#f00';
ct1.beginPath(100,100);
ct1.fillStyle = 'green';
ct1.moveTo(220,222);
ct1.lineTo(300,50);
ct1.lineTo(50, 100);
ct1.lineTo(0, 90);
ct1.closePath();
ct1.fill();

$(document).ready(function() {
	updateCountries();
//	console.log(stats);
	console.log("Testest");
	$("#america_btn").click(function() {	
		let home_country = $("#home_country :selected").val();
		$.post("http://157.245.13.249:8080/submit", {to_country: "america", from_country: home_country});
		updateCountries();
	});
	
	$("#china_btn").click(function() {	
		let home_country = $("#home_country :selected").val();
		$.post("http://157.245.13.249:8080/submit", {to_country: "china", from_country: home_country});
		updateCountries();
	});

	$("#canada_btn").click(function() {
		let home_country = $("#home_country :selected").val();
		$.post("http://157.245.13.249:8080/submit", {to_country: "canada", from_country: home_country});
		updateCountries();
	});
});


function updateCountries(){
	$.getJSON("http://157.245.13.249:8080/stats", function(response){
                console.log(response);
                console.log(response[0].points);
                $("#america_score").text(response[0].points);
                $("#canada_score").text(response[1].points);
                $("#china_score").text(response[2].points);
        });

}
