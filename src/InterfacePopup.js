class Popup {

  constructor() {}

  display() {}
  execute() {}
  keyPressed() {}
  mousePressed() {}

}

class TextEditor extends Popup {

  constructor(index) {
    super();
    this.index = index;
    this.block = palette.examples[index];
    this.type = this.block instanceof TermVar;
    this.label = this.type?" Variable name: ":" Macro name: ";
    this.text = this.block.text;
  }

  display() {
    // Get the size of the text, for alignment purposes.
    textSize(30);
    let w_label = textWidth(this.label), w_block = textWidth(" "+this.text+"| ");
    let h = textAscent()+textDescent();
    // The text box.
    strokeWeight(1);
    stroke("Black");
    fill("White");
    rect(600-w_label, 300-h/2, w_label, h);
    rect(600, 300-h/2, w_block, h);
    // The text itself.
    noStroke();
    fill("Black");
    textAlign(RIGHT, CENTER);
    text(this.label, 600, 300);
    textAlign(LEFT, CENTER);
    text(" "+this.text+(frameCount%60<30?"|":"  "), 600, 300);
    textAlign(CENTER, CENTER);
  }

  keyPressed() {
    // Confirm the name and return to the main game.
    if (keyCode === ENTER || keyCode === RETURN) {
      if (this.text !== "") {
        this.block.text = this.text;
        palette.centraliseBlock(this.index);
      }
      popup = null;
    // Type the name.
    } else if (keyCode >= 48 && keyCode <= 57) this.text += String.fromCharCode(keyCode);
    else if (keyCode >= 65 && keyCode <= 90) this.text += String.fromCharCode(keyCode+(this.type?32:0));
    else if (keyCode === BACKSPACE && this.text !== "") this.text = this.text.substring(0, this.text.length - 1);
  }

}

class SubmitAnswer extends Popup {

  constructor() {
    super();
    textSize(30);
    let text_height = textAscent()+textDescent();

    // The player's answer in the middle of the popup.
    let submit = this.getAnswer();
    this.term = submit[0];
    this.term.updateBlock();
    this.correct = submit[1];
    let size2 = createVector(this.term.size.x+10, this.term.size.y+10);

    // The text at the top of the popup.
    this.upper_text = this.correct?" Your answer is CORRECT! ":" Your answer is incorrect. ";
    let size1 = createVector(textWidth(this.upper_text), text_height);

    // The text at the bottom of the popup.
    this.lower_text = this.correct?"Congratulations!\nPress \"Next\" to move on."
      :submit[2]+"\n\nPress \"Back\" to try again.";
    this.lower_text = " "+this.lower_text.replaceAll("\n", " \n ")+" ";
    let lines = this.lower_text.split("\n");
    let line_width = 0;
    for (let line of lines) {
      line_width = max(line_width, textWidth(line));
    }
    let size3 = createVector(line_width, text_height*lines.length);

    // Aligning all 3 parts.
    this.size = createVector(max([size1.x, size2.x, size3.x]), size1.y+size2.y+size3.y);
    this.pos = createVector(600-this.size.x/2, 300-this.size.y/2);
    this.upper_pos = createVector(600, this.pos.y+size1.y/2);
    this.term.pos.set(600-this.term.size.x/2, this.pos.y+size1.y+5);
    this.term.updateBlock();
    this.lower_pos = createVector(600, this.pos.y+this.size.y-size3.y/2);

    // The back button.
    this.back = new Button(header.topright_button.pos.x, header.topright_button.pos.y,
      header.topright_button.size.x, header.topright_button.size.y, this.correct?"Next":"Back", header.topright_button.text_size);
  }

  display() {
    strokeWeight(1);
    stroke("Black");
    fill("White");
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    noStroke();
    fill("Black");
    textSize(30);
    text(this.upper_text, this.upper_pos.x, this.upper_pos.y);
    text(this.lower_text, this.lower_pos.x, this.lower_pos.y);
    this.term.display();
    this.back.displayEmbedded();
  }

  execute() {
    this.back.checkHover();
  }

  /* This returns an array of 3 elements:
   * [0] - The submitted answer.
   * [1] - Whether or not the answer is correct.
   * [2] - The feedback message to display if the answer is incorrect. */
  getAnswer() {
    let ans = canvas.expandTerm(new MacroUse(0, 0, "ANS"), []);
    if (ans[1]) return mode.marking(ans[0]);
    else return ans;
  }

  mousePressed() {
    if (this.back.highlighted) {
      if (this.correct) {
        mode = new Title();
        mode.page = 0;
      } else popup = null;
    }
  }

}

class ApplyAlgorithm extends Popup {

  constructor() {
    super();
    this.header = new HeaderWithCanvas(header.ypos, "Choose a block", header.size, "Back", header.topright_button.text_size);
    this.header.back.pos.set(-100, -100);

    if (canvas.blocks.length !== 0) {
      this.block = null;
      this.choose_block = new ApplyChooseBlock();
      this.alg = null;
      this.choose_alg = new ApplyChooseAlg();
      this.confirm = null;
    } else this.header.text = "No blocks to use!";
  }

  display() {
    if (canvas.blocks.length !== 0) {
      if (this.block === null) this.choose_block.display();
      else if (this.alg === null) this.choose_alg.display();
      else {
        this.confirm.displayEmbedded();
        this.block.display();
        noStroke();
        fill("Black");
        textSize(25);
        text(this.alg[1], this.text_pos.x, this.text_pos.y);
      }
    }
    this.header.display();
  }

  execute() {
    if (canvas.blocks.length !== 0) {
      if (this.block === null) this.choose_block.execute();
      else if (this.alg === null) this.choose_alg.execute();
      else this.confirm.checkHover();
    }
    this.header.topright_button.checkHover();
  }

  makeConfirmPage() {
    let text_size = getTextSize(this.alg[1])
    let size = createVector(max(this.block.size.x, text_size.x)+10,
      this.block.size.y+text_size.y+10);
    let pos = createVector(600-size.x/2, 300+(header.ypos-size.y)/2);
    this.confirm = new Button(pos.x, pos.y, size.x, size.y, "", 0);
    this.block.pos.set(600-this.block.size.x/2, pos.y+5);
    this.block.updateBlock();
    this.text_pos = createVector(600, pos.y+size.y-text_size.y/2-5);
  }

  mousePressed() {
    if (canvas.blocks.length !== 0) {
      if (this.block === null) this.choose_block.mousePressed();
      else if (this.alg === null) this.choose_alg.mousePressed();
      else if (this.confirm.highlighted) popup = new AlgorithmDisplay(this.block, this.alg[0]);
    }
    if (this.header.topright_button.highlighted) popup = null;
  }

}

class AlgorithmDisplay extends Popup {

  constructor(term, alg_index) {
    super();
    this.slides = applyToTerm(term, algorithms[alg_index]);
    this.current_slide = 0;
    this.max_slide = this.slides.length-1;

    this.header = new HeaderWithCanvas(header.ypos, "Slide 1 of "+this.slides.length, header.size, "Back", header.topright_button.text_size);
    this.header.back.pos.set(-100, -100);

    for (let slide of this.slides) {
      slide[1] += "\n";
      slide[0].updateBlock();
      slide[0].pos.set(600-slide[0].size.x/2, 300+(this.header.ypos-slide[0].size.y)/2);
      slide[0].updateBlock();
    }

    this.next = new Button(1000, 250+this.header.ypos/2, 100, 100, ">", 40);
    this.prev = new Button(100, 250+this.header.ypos/2, 100, 100, "<", 40);
  }

  display() {
    // The current slide.
    background("Silver");
    this.slides[this.current_slide][0].display();
    noStroke();
    fill("Black");
    textSize(30);
    textAlign(CENTER, BOTTOM);
    text(this.slides[this.current_slide][1], 0, 0, 1200, 600);
    textAlign(CENTER, CENTER);
    // UI
    this.header.display();
    if (this.current_slide !== this.max_slide) this.next.display();
    if (this.current_slide !== 0) this.prev.display();
  }

  execute() {
    this.header.topright_button.checkHover();
    if (this.current_slide !== this.max_slide) this.next.checkHover();
    else this.next.noHover();
    if (this.current_slide !== 0) this.prev.checkHover();
    else this.prev.noHover();
  }

  mousePressed() {
    if (this.next.highlighted && this.current_slide !== this.max_slide) ++this.current_slide;
    if (this.prev.highlighted && this.current_slide !== 0) --this.current_slide;
    this.header.text = "Slide "+(this.current_slide+1)+" of "+(this.max_slide+1);
    if (this.header.topright_button.highlighted) popup = null;
  }

}
