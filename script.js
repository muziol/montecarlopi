function isInt(n){
    return n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

var perform_acceleration = true; // true = draw points faster as time goes on, to counteract the increased time to calculate each significant digit
var stop_after = 100000; // default 100000; once the simulation has rendered this many points, stop
var show_graphics = true;
var total = 0;
var inside = 0;

document.getElementById('start').addEventListener("click", function(){
    var input = document.getElementById('stop').value;
	total = 0;
	inside = 0;
    //clear and draw circle
	clear();
    circle();
	if (isInt(input) == false ) alert("value must be integer")
    else if (input > 0) {
		stop_after = input;
		tick();
	}
	else if (input < 0) {
		alert("value must be > 0")
		stop_after = 0;
	}
	// Begin
    else if (document.getElementById('stop').value == "" ) {
		stop_after = 100000;
		tick();
	}
});	

function clear() {
    var svg = document.getElementsByTagName('svg')[0];
    //clear all nodes from svg
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

function circle() {
    var svgNS = "http://www.w3.org/2000/svg";  


    var myCircle = document.createElementNS(svgNS,"circle"); //to create a circle. for rectangle use "rectangle"
    myCircle.setAttributeNS(null,"id","mycircle");
    myCircle.setAttributeNS(null,"cx",300);
    myCircle.setAttributeNS(null,"cy",300);
    myCircle.setAttributeNS(null,"r",300);
    myCircle.setAttributeNS(null,"style","stroke:rgb(0,0,255);stroke-width:1;");
    var svg = document.getElementsByTagName('svg')[0];
    svg.appendChild(myCircle);   
    

}

var svg = document.getElementsByTagName('svg')[0];
if(!show_graphics) svg.remove();
var output_total = document.getElementById('total');
var output_inside = document.getElementById('inside');
var output_pi = document.getElementById('pi');

// Returns a random floating point number between [-1,1]
function randomSingleCoordinate(){
	return((Math.random() * 2) - 1);
}

// Randomly adds a point to the simulation
function addPoint(){
	// Randomly generate a point
    var x = randomSingleCoordinate();
    var y = randomSingleCoordinate();
    var is_inside_circle = (((x*x)+(y*y)) < 1);
    // Update calculations
    total++;
    if(is_inside_circle) inside++;
    // Draw the point to the SVG
    if(show_graphics){
		var point = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        point.setAttribute('x', (x + 1) * 300);
        point.setAttribute('y', (y + 1) * 300);
        point.setAttribute('width', 1);
        point.setAttribute('height', 1);
        if(is_inside_circle) point.setAttribute('class', 'inside');
        svg.appendChild(point);
    }
}

function tick(){
	// To accelerate things, we add more points per 'tick' as time goes on
    var pointsToAdd = 1;
    if(total > 0 && perform_acceleration) pointsToAdd = Math.pow((Math.floor(Math.log10(total))+1),3);
    //
    if(total + pointsToAdd > stop_after) {
        pointsToAdd = stop_after - total;
    } 
    // add one or more points
    for(var i = 0; i < pointsToAdd; i++) addPoint();
    // Update output
    output_total.innerHTML = total;
    output_inside.innerHTML = inside;
    output_pi.innerHTML = inside / total * 4;
    // Loop
    if(total < stop_after) setTimeout(tick, 1);
}

