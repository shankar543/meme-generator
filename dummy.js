// Get canvas and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set canvas width and height
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

// Set initial text font and size
var font = "Arial";
var fontSize = "24px";

// Array to store text objects
var texts = [];

// Event listener for input field
document.getElementById("inputText").addEventListener("keydown", function(e) {
	if (e.keyCode === 13) { // If Enter key is pressed
		var text = this.value;
		var x = Math.random() * canvas.width; // Random x position
		var y = Math.random() * canvas.height; // Random y position
		texts.push({text: text, x: x, y: y}); // Add text to array
		drawTexts(); // Redraw all texts on canvas
		this.value = ""; // Clear input field
	}
});

// Event listener for mouse down on canvas
canvas.addEventListener("mousedown", function(e) {
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	for (var i = 0; i < texts.length; i++) {
		var textWidth = ctx.measureText(texts[i].text).width;
		if (x >= texts[i].x && x <= texts[i].x + textWidth && y >= texts[i].y - parseInt(fontSize) && y <= texts[i].y) {
			texts[i].selected = true; // Mark text as selected
			drawTexts(); // Redraw all texts on canvas
			canvas.addEventListener("mousemove", moveText); // Add event listener for mouse move
			canvas.addEventListener("mouseup", function() {
				canvas.removeEventListener("mousemove", moveText); // Remove event listener for mouse move
			});
			break;
		}
	}
});

// Function to draw all texts on canvas
function drawTexts() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < texts.length; i++) {
		var text = texts[i];
		ctx.font = fontSize + " " + font;
		ctx.fillStyle = text.selected ? "red" : "black"; // Text color based on selected state
		ctx.fillText(text.text, text.x, text.y);
	}
}

// Function to move selected text on mouse move
function moveText(e) {
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	for (var i = 0; i < texts.length; i++) {
		if (texts[i].selected) {
			texts[i].x = x;
			texts[i].y = y;
			drawTexts(); // Redraw all texts on canvas
			break;
		}
	}
}
