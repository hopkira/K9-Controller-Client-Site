/* Write JavaScript here */
var ws = null;
var bool_eyes = false;
var bool_tail_h = false;
var bool_tail_v = false;
var bool_head = false;
var bool_lights = false;

function connect() {
  ws = new WebSocket("ws://127.0.0.1:1880/admin/ws/k9");
  ws.onopen = function(evt){ws.send("Connection established");};
  ws.onclose = function(evt){ws.send("Client closed");};
  ws.onmessage = function(evt){ distance(evt) };
}

function distance(evt){
	var distance = JSON.parse(evt.data);
	distance = parseInt(distance.payload);
	if (distance > 50) { distance = 50 };
	var red = 255-(distance*5);
	var green = 5*distance;
	distance = rgb(red,green,0);
	$('#forward_sensor').css('background-color',distance);
	}
	
function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}

$('#speak').click(function(){
var speech = $('textarea#speech').val();
if (speech !== "") {
	speech = "speak_" + speech;
	ws.send(speech);
	$('#speech').val("");
	}
});

$('#eyes').click(function(){
  if(bool_eyes)
       { 
       ws.send("toggle_eyes_off");
       $(this).text("Eyes On");
       }
  else {
       ws.send("toggle_eyes_on");
       $(this).text("Eyes Off");                 
       }
  bool_eyes=!(bool_eyes);
});

$('#tail_h').click(function(){
  if(bool_tail_h)
       { 
       ws.send("toggle_tail_h_off");
       $(this).text("Wag Tail Sideways");
       }
  else {
       ws.send("toggle_tail_h_on");
       $(this).text("Stop Tail Sideways");                 
       }
  bool_tail_h=!(bool_tail_h);
});

$('#tail_v').click(function(){
  if(bool_tail_v)
       { 
       ws.send("toggle_tail_v_off");
       $(this).text("Wag Tail Up/Down");
       }
  else {
       ws.send("toggle_tail_v_on");
       $(this).text("Stop Tail Up/Down");                 
       }
  bool_tail_v=!(bool_tail_v);
});

$('#head').click(function(){
  if(bool_head)
       { 
       ws.send("toggle_head_down");
       $(this).text("Raise Head");
       }
  else {
       ws.send("toggle_head_up");
       $(this).text("Lower Head");                 
       }
  bool_head=!(bool_head);
});

$('#lights').click(function(){
  if(bool_lights)
       { 
       ws.send("toggle_lights_off");
       $(this).text("Lights On");
       }
  else {
       ws.send("toggle_lights_on");
       $(this).text("Lights Off");                 
       }
  bool_lights=!(bool_lights);
});

$('.mood_but').click(function(){
  ws.send("mood_" + this.id);  
});

$('.nav_but').mouseover(function(){
  ws.send("nav_start_" + this.id );     
});

$('.nav_but').mouseout(function(){
  ws.send("nav_stop_" + this.id );     
});

$(document).ready(connect());