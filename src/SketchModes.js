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
    for (let i = 0; i < question_data.length; ++i) {
      let num = i+1;
      let x = floor(i/3)%5;
      let y = i%3;
      this.questions[i] = new Button(250+150*x, 150+150*y, 100, 100, "Q"+num
        +(question_data[i].text === "(dummy)"?"\n(dummy)":""), (question_data[i].text === "(dummy)"?20:30));
    }
    this.max_page = ceil(question_data.length/15)-1;
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
      // On a question selection page.
      this.quiz_header.display();
      if (this.page !== this.max_page) this.question_next.display();
      if (this.page !== 0) this.question_prev.display();
      for (let i = this.page*15; i < (this.page+1)*15; ++i) {
        if (i < this.questions.length) this.questions[i].display();
      }
    }
  }

  execute() {
    this.sandbox.checkHover(this.page === -1);
    this.quiz.checkHover(this.page === -1);
    this.quiz_header.back.checkHover(this.page !== -1);
    this.question_next.checkHover(this.page !== -1 && this.page !== this.max_page);
    this.question_prev.checkHover(this.page !== -1 && this.page !== 0);
    for (let i = 0; i < this.questions.length; ++i) {
      let enable_hover = (this.page !== -1 && floor(i/15) === this.page);
      if (i < this.questions.length) this.questions[i].checkHover(enable_hover);
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
      else if (this.question_next.highlighted && this.page !== this.max_page) ++this.page;
      else if (this.question_prev.highlighted && this.page !== 0) --this.page;
      else {
        for (let i = this.page*15; i < (this.page+1)*15; ++i) {
          if (i < this.questions.length && this.questions[i].highlighted) mode = new QuizQuestion(i);
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
    else popup.displayStart();
  }

  execute() {
    canvas.updateHover();
    palette.selectBlock();
    header.back.checkHover(popup === null);
    header.topright.checkHover(popup === null);
    if (popup !== null) popup.execute();
  }

  keyPressed() {
    if (popup === null) {
      switch (keyCode) {
        case DELETE:
          canvas.deleteKey();
          break;
      }
    } else popup.keyPressed();
  }

  mousePressed() {
    if (popup === null) {
      if (canvas.dragged === null) {
        if (mouse.y >= palette.ypos) palette.mousePressed();
        else if (mouse.y > header.ypos) canvas.mousePressed();
      }
      if (header.back.highlighted) mode = new Title();
      if (header.topright.highlighted) this.toprightButtonPress();
    } else popup.mousePressed();
  }

  mouseReleased() {
    if (popup === null) canvas.mouseReleased();
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

  constructor(num) {
    let question = question_data[num];
    super(new HeaderWithCanvas(60, "Q"+(num+1)+": "+question.text, question.text.includes("\n")?25:30, "Submit\nAnswer", 20));
    this.question_num = num;
    this.marking = question.marking;
    // Add in the ANS macro definition,
    let ans = new MacroDef(525, 275);
    ans.slots[0] = new MacroUse(0, 0, "ANS");
    //  as well as (depending on the question) a default answer,
    if (question.ans !== null) ans.slots[1] = this.block_construct(question.ans);
    ans.updateBlock();
    if (ans.size.x > 655) ans.pos.x -= (ans.size.x-655);
    if (ans.size.y > 225) ans.pos.y -= (ans.size.y-225);
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

  mousePressed() {
    super.mousePressed();
    if (mode instanceof Title) mode.page = floor(this.question_num/15);
  }

  toprightButtonPress() {
    popup = new SubmitAnswer();
  }

}
