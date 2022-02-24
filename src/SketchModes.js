class Mode {

  constructor() {}

  display() {}
  execute() {}
  keyPressed() {}
  keyReleased() {}
  mousePressed() {}
  mouseReleased() {}

}

class Title extends Mode {

  constructor() {
    super();
    this.page = -1;

    this.sandbox = new Button(325, 350, 200, 100, "SANDBOX\nMODE", 30);
    this.quiz = new Button(675, 350, 200, 100, "QUIZ\nMODE", 30);

    this.quiz_header = new Header(60, "QUIZ MODE", 40);
    this.questions = [];
    this.question_data = [];
    for (let i = 0; i < 45; ++i) {
      let num = i+1;
      let x = floor(i/3)%5;
      let y = i%3;
      this.questions[i] = new Button(250+150*x, 150+150*y, 100, 100,"Q"+num
        +(num===11||num===19|num===20?"":"\n(dummy)"), 20);
      this.question_data[i] = num===11?q_ex1:num===19?q_ex2:num===20?q_ex3:null;
    }
    this.question_next = new Button(1000, 300, 100, 100, ">", 40);
    this.question_prev = new Button(100, 300, 100, 100, "<", 40);
  }

  display() {
    background("Silver");
    if (this.page === -1) {
      // On the main title screen.
      strokeWeight(5);
      stroke("Black");
      fill("White");
      textSize(100);
      text("Lambda Calculus\nSerious Game", 0, 0, 1200, 300);
      this.sandbox.display();
      this.quiz.display();
    } else {
      // On a quiz page.
      this.quiz_header.display();
      if (this.page !== 2) this.question_next.display();
      if (this.page !== 0) this.question_prev.display();
      for (let i = this.page*15; i < (this.page+1)*15; ++i) {
        this.questions[i].display();
      }

    }
  }

  execute() {
    // Reset all buttons.
    this.sandbox.noHover();
    this.quiz.noHover();
    this.quiz_header.back.noHover();
    this.question_next.noHover();
    this.question_prev.noHover();
    for (let question of this.questions) {
      question.noHover();
    }
    if (this.page === -1) {
      // On the main title screen.
      this.sandbox.checkHover();
      this.quiz.checkHover();
    } else {
      // On a quiz page.
      this.quiz_header.back.checkHover();
      if (this.page !== 2) this.question_next.checkHover();
      if (this.page !== 0) this.question_prev.checkHover();
      for (let i = this.page*15; i < (this.page+1)*15; ++i) {
        this.questions[i].checkHover();
      }
    }
  }

  mousePressed() {
    if (this.page === -1) {
      // On the main title screen.
      if (this.sandbox.highlighted) mode = new Sandbox();
      else if (this.quiz.highlighted) this.page = 0;
    } else {
      // On a quiz page.
      if (this.quiz_header.back.highlighted) this.page = -1;
      else if (this.question_next.highlighted && this.page !== 2) ++this.page;
      else if (this.question_prev.highlighted && this.page !== 0) --this.page;
      else {
        for (let i = this.page*15; i < (this.page+1)*15; ++i) {
          if (this.questions[i].highlighted && this.question_data[i] !== null) mode = new QuizQuestion(this.question_data[i]);
        }
      }
    }
  }

}

class ModeWithCanvas extends Mode {

  constructor(newheader) {
    super();
    canvas = new Canvas();
    header = newheader;
    palette = new Palette(520, [TermVar, TermAbs, TermAppH, TermAppV, MacroDef, MacroUse]);
    popup = null;
  }

  display() {
    background("Silver");
    canvas.display();
    palette.display();
    header.display();
    if (canvas.dragged !== null) canvas.dragged.display();
    if (popup === null) header.tooltip();
    else {
      // Darken the rest of the screen, and draw the popup on top.
      noStroke();
      fill(0, 204);
      rect(0, 0, 1200, 600);
      popup.display();
    }
  }

  execute() {
    canvas.updateHover();
    palette.selectBlock();
    header.buttonHover(header.back);
    header.buttonHover(header.topright_button);
    if (popup !== null) popup.execute();
  }

  keyPressed() {
    if (popup === null) {
      switch (keyCode) {
        case DELETE:
          if (canvas.dragged !== null) canvas.dragged = null;
          else if (canvas.hover_data[0] !== null) canvas.removeBlock();
          break;
      }
    } else popup.keyPressed();
  }

  mousePressed() {
    if (popup === null) {
      if (canvas.dragged === null) {
        if (mouse.y >= palette.ypos) {
          if (palette.selected !== -1) {
            canvas.dragged = palette.createBlock();
            canvas.dragged.dragStart();
          } else if (palette.change_var.highlighted) popup = new TextEditor(0);
          else if (palette.change_macro.highlighted) popup = new TextEditor(5);
        } else if (mouse.y > header.ypos) {
          if (canvas.hover_data[0] !== null) canvas.dragBlock();
        }
      }
      if (header.back.highlighted) mode = new Title();
      if (header.topright_button.highlighted) this.toprightButtonPress();
    } else popup.mousePressed();
  }

  mouseReleased() {
    if (popup === null) {
      if (canvas.dragged !== null) {
        if (mouse.y > header.ypos && mouse.y < palette.ypos) {
          if (canvas.hover_data[0] !== null) {
            canvas.hover_data[1].slots[canvas.hover_data[2]] = canvas.dragged;
            canvas.hover_data[0].updateBlock();
          } else {
            canvas.blocks.push(canvas.dragged);
          }
        }
        canvas.dragged = null;
      }
    }
  }

  toprightButtonPress() {}

}

class Sandbox extends ModeWithCanvas {

  constructor() {
    super(new HeaderWithCanvas(60, "SANDBOX MODE", 40, "Apply\nAlgorithm", 20));
  }

  toprightButtonPress() {
    popup = new ApplyAlgorithm();
  }

}

class QuizQuestion extends ModeWithCanvas {

  constructor(question) {
    super(new HeaderWithCanvas(60, question.text, 30, "Submit\nAnswer", 20));
    this.marking = question.marking;
    // Add in the ANS macro definition, as well as (depending on the question):
    let ans = new MacroDef(525, 275);
    ans.slots[0] = new MacroUse(0, 0, "ANS");
    // a default answer,
    if (question.ans !== null) ans.slots[1] = this.block_construct(question.ans);
    ans.updateBlock();
    canvas.blocks.push(ans);
    // and any other blocks.
    for (let blueprint of question.canvas) {
      let block = this.block_construct(blueprint[0]);
      block.pos.set(blueprint[1], blueprint[2]);
      block.updateBlock();
      canvas.blocks.push(block);
    }
  }

  block_construct(blueprint) {
    let block;
    let type = blueprint[0];
    switch (type) {
      case TermVar:
      case MacroUse:
        block = new type(0, 0, blueprint[1]);
        break;
      case TermAbs:
      case TermAppH:
      case TermAppV:
      case MacroDef:
        block = new type(0, 0);
        for (let i = 1; i < blueprint.length; ++i) {
          if (blueprint[i] !== null) block.slots[i-1] = this.block_construct(blueprint[i]);
        }
        block.updateBlock();
        break;
    }
    return block;
  }

  toprightButtonPress() {
    popup = new SubmitAnswer();
  }

}
