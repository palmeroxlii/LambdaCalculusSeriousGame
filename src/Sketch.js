let key_ctrl = false, key_shift = false, key_f2 = false;
let mode, mouse;
let canvas, header, palette, popup;

function setup() {
  createCanvas(1200, 600);
  textAlign(CENTER, CENTER);
  createQuestions()
  mouse = createVector(0, 0);
  mode = new Title();
}

function draw() {
  mouse.set(constrain(mouseX, 0, width), constrain(mouseY, 0, height));
  mode.execute();
  mode.display();
}

function mousePressed() {
  mode.mousePressed();
}

function mouseReleased() {
  mode.mouseReleased();
}

function keyPressed() {
  switch (keyCode) {
    case CONTROL:
      key_ctrl = true;
      break;
    case SHIFT:
      key_shift = true;
      break;
    case 113:
      if (!key_f2) save(nf(year(),4)+"-"+nf(month(),2)+"-"+nf(day(),2)+
        "-"+nf(hour(),2)+"-"+nf(minute(),2)+"-"+nf(second(),2)+".png");
      key_f2 = true;
      break;
  }
  mode.keyPressed();
}

function keyReleased() {
  switch (keyCode) {
    case CONTROL:
      key_ctrl = false;
      break;
    case SHIFT:
      key_shift = false;
      break;
    case 113:
      key_f2 = false;
      break;
  }
  mode.keyReleased();
}

class Button {

  constructor(x, y, w, h, text, size) {
    this.pos = createVector(x, y);
    this.size = createVector(w, h);
    this.text = text;
    this.text_size = size;
    this.highlighted = false;
  }

  checkCollision(point) {
    return point.x >= this.pos.x && point.x <= this.pos.x+this.size.x
      && point.y >= this.pos.y && point.y <= this.pos.y+this.size.y;
  }

  checkHover(enabled) {
    this.highlighted = enabled && this.checkCollision(mouse);
  }

  // This is the default display function, mainly for the title screen.
  display() {
    textSize(this.text_size);
    strokeWeight(2);
    stroke("Black");
    fill(this.highlighted?"Gainsboro":"White");
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    fill(this.highlighted?"White":"Gainsboro");
    text(this.text, this.pos.x, this.pos.y, this.size.x, this.size.y);
  }

  // This is an alternative display function, for when the button is embedded in another component
  // (e.g. the back button in the header).
  displayEmbedded() {
    textSize(this.text_size);
    noStroke();
    fill(this.highlighted?"Gainsboro":"White");
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    if (this.text === "←") {
      strokeWeight(2);
      stroke("Black");
    }
    fill("Black");
    text(this.text, this.pos.x, this.pos.y, this.size.x, this.size.y);
    // Skip any outlines that would be along the edge of the canvas.
    strokeWeight(1);
    stroke("Black");
    if (this.pos.y !== 0) line(this.pos.x, this.pos.y, this.pos.x+this.size.x, this.pos.y);
    if (this.pos.x+this.size.x !== 1200) line(this.pos.x+this.size.x, this.pos.y, this.pos.x+this.size.x, this.pos.y+this.size.y);
    if (this.pos.y+this.size.y !== 600)line(this.pos.x+this.size.x, this.pos.y+this.size.y, this.pos.x, this.pos.y+this.size.y);
    if (this.pos.x !== 0) line(this.pos.x, this.pos.y+this.size.y, this.pos.x, this.pos.y);
  }

}
