// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball Class
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  // Create a static ball.
  draw() {
    ctx.beginPath(); // Declare ball drawing.
    ctx.fillStyle = this.color; // Set ball colour.
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Draw the ball as a circle.
    ctx.fill(); // Fill the ball with colour.
  }

  // Moves the ball.
  update() {
    // If statements check if ball has reached edge of canvas(window).
    // Reverses direction of velocity to make the ball "bounce" off edges.
    // Size is added to x/y position of the ball to account for the parameter
    // of the ball and not the center.
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    // Adds x/y veloctiy to x/y position to move ball at constant speed. 
    this.x += this.velX;
    this.y += this.velY;
  }

  // Changes colour of ball if it collides with another ball.
  collisionDetect() {
    // Loops throguh every ball.
    for (const ball of balls) {
      // If the current ball does not equal itself.
      if (this !== ball) {
        // Checks if the balls overlap each other.
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        // If so, randomize ball colour.
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

const testBall = new Ball(50, 100, 4, 4, "blue", 10); // Create ball instance.
// Call variables and method of the ball.
testBall.x;
testBall.size;
testBall.color;
testBall.draw();

const balls = []; // array of balls.

// Creates 25 balls with randomized positions, velocities, sizes and colours.
while (balls.length < 25) {
  const size = random(10, 20); 
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball); // Pushes each ball onto the array.
}

// Moves the balls constantly.
function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)"; // Fills screen with semi-trasnparanet black.
  ctx.fillRect(0, 0, width, height); // Covers previous frames before balls are updated.

  // Creates, updates, and collision detection for all created balls.
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  // Creates smooth animation by allowing function to run 
  // a set amount of times per second. 
  // The function calls itself to do this.
  requestAnimationFrame(loop);
}

loop();