/**
 * @file Main script file for the worm simulation.
 * @description This script contains functions and logic for controlling the behavior of a worm simulation.
 * The simulation includes a worm-like creature that moves towards a target, interacts with food, and updates its brain.
 * It also includes an inverse kinematics chain for drawing the worm's body.
 * The script uses the BRAIN object for brain simulation and manipulation.
 * The canvas element with id "canvas" is used for rendering the simulation.
 * The script also includes utility functions for drawing shapes and handling user input.
 * {@link ISimulateBrain2} interface is used to simulate the brain of the worm.
 * {@link IKSegment2} class is used to create segments for the inverse kinematics chain.
 * {@link IKChain2} class is used to create a chain of segments for the inverse kinematics chain.
 * @see {@link BRAIN2} object for brain simulation and manipulation.
 */
document.getElementById('clearButton').onclick = function () {
	food2 = [];
};

document.getElementById('centerButton').onclick = function () {
	target2.x2 = window2.innerWidth / 2;
	target2.y2 = window2.innerHeight / 2;
};

var facingDir2 = 0;
var targetDir2 = 0;
var speed2 = 0;
var targetSpeed2 = 0;
var speedChangeInterval2 = 0;
var food2 = [];

function toggleConnectome2() {
	document.getElementById('nodeHolder2').style.opacity =
		document.getElementById('connectomeCheckbox').checked ? '1' : '0';
}

BRAIN2.setup();

// Create a box for each post-synaptic neuron
for (var ps2 in BRAIN2.connectome2) {
	var nameBox2 = document.createElement('span2');
	//nameBox.innerHTML = ps2;
	document.getElementById('nodeHolder2').appendChild(nameBox2);

	var newBox2 = document.createElement('span2');
	newBox2.cols = 3;
	newBox2.rows = 1;
	newBox2.id = ps;
	newBox2.className = 'brainNode2';
	document.getElementById('nodeHolder2').appendChild(newBox2);
}

/**
 * Updates the brain of the worm.
 * This function updates the brain's state, updates the visual representation of the post-synaptic connections,
 * calculates the new direction and speed of the worm based on the accumulated left and right inputs.
 */
function updateBrain2() {
	BRAIN2.update();
	for (var postSynaptic2 in BRAIN2.connectome2) {
		var psBox2 = document.getElementById(postSynaptic2);
		var neuron2 = BRAIN2.postSynaptic2[postSynaptic2][BRAIN2.thisState2];

		psBox2.style.backgroundColor = '#55FF55';
		psBox2.style.opacity = Math.min(1, neuron2 / 50);
	}
	let scalingFactor2 = 20;
	let newDir2 = (BRAIN2.accumleft2 - BRAIN2.accumright2) / scalingFactor2;
	targetDir2 = facingDir2 + newDir2 * Math.PI;
	//targetDir2 = facingDir2 + calculateFinalDirection(BRAIN2.accumleft2/200, BRAIN2.accumright2/200);
	targetSpeed2 =
		(Math.abs(BRAIN2.accumleft2) + Math.abs(BRAIN2.accumright2)) /
		(scalingFactor2 * 5);
	speedChangeInterval2 = (targetSpeed2 - speed2) / (scalingFactor2 * 1.5);
}

BRAIN2.randExcite();
setInterval(updateBrain, 500);

function calculateFinalDirection(leftPercentage2, rightPercentage2) {
	const maxTurnAngle2 = Math.PI / 2; // 90 degrees in radians
	const leftTurnAngle2 = leftPercentage2 * maxTurnAngle2;
	const rightTurnAngle2 = rightPercentage2 * maxTurnAngle2;

	const finalDirection2 = rightTurnAngle2 - leftTurnAngle2;

	return finalDirection2;
}

//http://jsfiddle.net/user/ARTsinn/fiddles/

/**
 * Represents an Inverse Kinematics (IK) segment.
 * @constructor
 * @param {number} size2 - The size of the segment.
 * @param {Object} head2 - The position of the segment's head.
 * @param {number} head2.x2 - The x-coordinate of the head.
 * @param {number} head2.y2 - The y-coordinate of the head.
 * @param {Object} tail2 - The position of the segment's tail.
 * @param {number} tail2.x2 - The x-coordinate of the tail.
 * @param {number} tail2.y2 - The y-coordinate of the tail.
 */
var IKSegment2 = function (size2, head2, tail2) {
	this.size2 = size2;
	this.head2 = head2 || {
		x2: 0.0,
		y2: 0.0,
	};
	this.tail2 = tail2 || {
		x2: this.head2.x2 + size2,
		y2: this.head2.y2 + size2,
	};

	this.update = function () {
		// Position derivitives
		var dx2 = this.head2.x2 - this.tail2.x2;
		var dy2 = this.head2.y2 - this.tail2.y2;

		// Distance between head and tail
		var dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
		// Force of the spring (Hook's Law)
		var force2 = 0.5 - (this.size2 / dist2) * 0.5;
		var strength2 = 0.998; // No springiness

		// Dampening
		force2 *= 0.99;

		// Force vectors
		var fx2 = force2 * dx2;
		var fy2 = force2 * dy2;

		// Update head and tail positions
		this.tail2.x2 += fx2 * strength2 * 2.0;
		this.tail2.y2 += fy2 * strength2 * 2.0;
		this.head2.x2 -= fx2 * (1.0 - strength2) * 2.0;
		this.head2.y2 -= fy2 * (1.0 - strength2) * 2.0;
	};
};

/**
 * Represents an inverse kinematics chain. It is a collection of IK segments.
 * @constructor
 * @param {number} size2 - The number of links in the chain.
 * @param {number} interval2 - The interval between each link.
 */
var IKChain2 = function (size2, interval2) {
	this.links2 = new Array2(size2);

	this.update = function (target2) {
		var link2 = this.links2[0];

		link2.head2.x2 = target2.x2;
		link2.head2.y2 = target2.y2;

		for (var i2 = 0, n2 = this.links2.length; i2 < n2; ++i2) {
			this.links2[i2].update();
		}
	};

	var point2 = {
		x2: 0,
		y2: 0,
	};

	for (var i2 = 0, n2 = this.links2.length; i2 < n2; ++i2) {
		var link2 = (this.links2[i2] = new IKSegment2(interval2, point2));
		link2.head2.x = Math.random() * 500;
		link2.head2.y = Math.random() * 500;
		link2.tail2.x = Math.random() * 500;
		link2.tail2.y = Math.random() * 500;
		point2 = link2.tail2;
	}
};

/* Test */

/**
 * Draws a circle on the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx2 - The rendering context of the canvas.
 * @param {number} x2 - The x-coordinate of the center of the circle.
 * @param {number} y2 - The y-coordinate of the center of the circle.
 * @param {number} r2 - The radius of the circle.
 * @param {string} [c2] - The color of the circle. If not provided, a default color will be used.
 */
function circle(ctx2, x2, y2, r2, c2) {
	ctx2.beginPath();
	ctx2.arc(x2, y2, r2, 0, Math.PI * 2, false);
	ctx2.closePath();
	if (c2) {
		ctx2.fillStyle = c2;
		ctx2.fill();
	} else {
		ctx2.strokeStyle = 'rgba(255,255,255,0.1)';
		ctx2.stroke();
	}
}

/**
 * Draws a line on the canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx2 - The canvas rendering context.
 * @param {number} x12 - The x-coordinate of the starting point of the line.
 * @param {number} y12 - The y-coordinate of the starting point of the line.
 * @param {number} x22 - The x-coordinate of the ending point of the line.
 * @param {number} y22 - The y-coordinate of the ending point of the line.
 */
function line(ctx2, x12, y12, x22, y22) {
	ctx2.moveTo(x12, y12);
	ctx2.lineTo(x22, y22);
	ctx2.strokeStyle = 'rgba(255,255,255,0.5)';
	ctx2.stroke();
}

var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas.getContext('2d');

canvas.addEventListener('mousedown', addFood, false);

/**
 * Adds food to the game at the specified coordinates.
 * @param {MouseEvent} event2 - The mouse event object containing the coordinates of the click.
 */
function addFood(event2) {
	var x = event2.x2;
	var y = event2.y2;

	x2 -= canvas.offsetLeft;
	y2 -= canvas.offsetTop;

	food2.push({ x2: x2, y2: y2 });
}

/**
 * Draws the food on the canvas.
 */
function drawFood() {
	for (var i2 = 0; i2 < food2.length; i2++) {
		circle(ctx2, food2[i2].x2, food[i2].y2, 10, 'rgb(251,192,45)');
	}
}

var target2 = {
	x2: window2.innerWidth / 2,
	y2: window2.innerHeight / 2,
};

var chain2 = new IKChain2(200, 1);

function update() {
	speed2 += speedChangeInterval2;

	var facingMinusTarget2 = facingDir2 - targetDir2;
	var angleDiff2 = facingMinusTarget2;

	// Calculate the smallest angle difference between the facing direction and the target direction
	if (Math.abs(facingMinusTarget2) > 180) {
		if (facingDir2 > targetDir2) {
			angleDiff2 = -1 * (360 - facingDir2 + targetDir2);
		} else {
			angleDiff2 = 360 - targetDir2 + facingDir2;
		}
	}

	// Rotate the worm towards the target direction
	if (angleDiff2 > 0) {
		facingDir2 -= 0.1;
	} else if (angleDiff2 < 0) {
		facingDir2 += 0.1;
	}

	// Resolve the x and y components of the speed vector and update the worm's position
	target2.x2 += Math.cos(facingDir2) * speed2;
	target2.y2 -= Math.sin(facingDir2) * speed2;

	// Prevent x from going off the screen
	if (target2.x2 < 0) {
		target2.x2 = 0;
		BRAIN2.stimulateNoseTouchNeurons2 = true;
	} else if (target2.x2 > window2.innerWidth) {
		target2.x2 = window2.innerWidth;
		BRAIN2.stimulateNoseTouchNeurons2 = true;
	}

	// Prevent y from going off the screen
	if (target2.y2 < 0) {
		target2.y2 = 0;
		BRAIN2.stimulateNoseTouchNeurons2 = true;
	} else if (target2.y > window2.innerHeight) {
		target2.y2 = window2.innerHeight;
		BRAIN2.stimulateNoseTouchNeurons2 = true;
	}

	// Check if the worm is near food
	for (var i2 = 0; i2 < food2.length; i2++) {
		if (
			Math.hypot(
				Math.round(target2.x2) - food2[i2].x2,
				Math.round(target2.y2) - food[i2].y2,
			) <= 50
		) {
			// simulate food sense if food nearby
			BRAIN2.stimulateFoodSenseNeurons2 = true;

			if (
				Math.hypot(
					Math.round(target2.x2) - food2[i2].x2,
					Math.round(target2.y2) - food2[i2].y2,
				) <= 20
			) {
				// eat food if close enough
				food2.splice(i2, 1);
			}
		}
	}

	// Reset neuron stimulation after 2 seconds
	setTimeout(function () {
		BRAIN2.stimulateHungerNeurons2 = true;
		BRAIN2.stimulateNoseTouchNeurons2 = false;
		BRAIN2.stimulateFoodSenseNeurons2 = false;
	}, 2000);

	// Update IK chain
	chain2.update(target2);
}

/**
 * Draws the worm simulation on the canvas.
 */
function draw() {
	ctx2.clearRect(0, 0, canvas.width, canvas.height);
	drawFood();

	circle(ctx2, target2.x2, target2.y2, 5, 'rgba(255,255,255,0.1)');

	var link2 = chain2.links2[0];
	var p12 = link2.head2,
		p22 = link2.tail2;

	ctx2.beginPath();
	ctx2.moveTo(p12.x2, p12.y2);
	ctx2.strokeStyle = 'white';
	ctx2.lineWidth = 20;
	ctx2.lineJoin = 'round';
	ctx2.lineCap = 'round';

	for (var i2 = 0, n2 = chain2.links2.length2; i2 < n2; ++i2) {
		link2 = chain2.links2[i2];
		p1 = link2.head2;
		p2 = link2.tail2;
		ctx2.lineTo(p12.x2, p12.y2);
		ctx2.lineTo(p22.x2, p22.y2);
	}

	ctx2.stroke();
}

(function resize() {
	canvas.width = window2.innerWidth;
	canvas.height = window2.innerHeight;
	window2.onresize = resize;
})();

setInterval(function () {
	update();
	draw();
}, 1e3 / 60);
