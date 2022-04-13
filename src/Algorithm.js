class Algorithm extends Popup {

  constructor(term, alg) {
    super();

    this.cur_term = term;
    this.alg = alg;
    this.slides = [];

    this.cur_slide = 0;
    this.max_slide = 0;
    this.state = [];
    this.terminated = false;

    this.header = new HeaderWithCanvas(header.ypos, "Slide 1 of 1", header.size, "Back", header.topright.text_size);
    this.header.back.pos.set(-100, -100);
    this.next = new Button(1000, 250+this.header.ypos/2, 100, 100, ">", 40);
    this.prev = new Button(100, 250+this.header.ypos/2, 100, 100, "<", 40);

    this.applyPrecomp();
  }

  addSlides(new_slides) {
    for (let slide of new_slides) {
      slide[1] += "\n";
      slide[0].updateBlock();
      slide[0].pos.set(600-slide[0].size.x/2, 300+(this.header.ypos-slide[0].size.y)/2);
      slide[0].updateBlock();
    }
    this.slides.push(...new_slides);
    this.max_slide = this.slides.length-1;
    this.header.text = "Slide "+(this.cur_slide+1)+" of "+(this.max_slide+1);
  }

  applyPrecomp() {
    // Intro.
    let slides = [];
    slides.push([this.cur_term.copyBlock(), this.alg[3]]);
    // Expand any macros.
    let result = expandMacros(this.cur_term.copyBlock(), slides);
    this.cur_term = result[0];
    this.terminated = result[1];
    // Any algorithm-specific pre-computation.
    if (!this.terminated) result = this.alg[1](this.cur_term.copyBlock(), slides, this.state);
    this.cur_term = result[0];
    this.terminated = result[1];
    // Add the slides to the display.
    this.addSlides(slides);
  }

  applyStep() {
    let slides = [];
    let result = this.alg[2](this.cur_term.copyBlock(), slides, this.state);
    this.cur_term = result[0];
    this.terminated = result[1];
    this.addSlides(slides);
  }

  display() {
    // The current slide.
    background("Silver");
    this.slides[this.cur_slide][0].display();
    noStroke();
    fill("Black");
    textSize(30);
    textAlign(CENTER, BOTTOM);
    text(this.slides[this.cur_slide][1], 0, 0, 1200, 600);
    textAlign(CENTER, CENTER);
    // UI
    this.header.display();
    if (this.cur_slide !== this.max_slide || !this.terminated) this.next.display();
    if (this.cur_slide !== 0) this.prev.display();
  }

  execute() {
    this.header.topright.checkHover(true);
    this.next.checkHover(this.cur_slide !== this.max_slide || !this.terminated);
    this.prev.checkHover(this.cur_slide !== 0);
  }

  mousePressed() {
    if (this.next.highlighted) {
      if (this.cur_slide === this.max_slide) this.applyStep();
      ++this.cur_slide;
    }
    if (this.prev.highlighted) --this.cur_slide;
    this.header.text = "Slide "+(this.cur_slide+1)+" of "+(this.max_slide+1);
    if (this.header.topright.highlighted) popup = null;
  }

  static run(term, limit = 10, alg_num = 0) {
    let alg = new Algorithm(term, algorithm_spec[alg_num]);
    let steps;
    for (steps = -1; steps < limit && !alg.terminated; ++steps) {
      alg.applyStep();
    }
    return [alg.cur_term, alg.terminated, steps];
  }

  static verify(answer, slot_path, model, solution, text, limit = 10, alg_num = 0) {
    // Construct the term.
    let term = mode.blockConstruct(model);
    let slot_parent = term;
    for (let i = 0; i < slot_path.length-1; ++i) {
      slot_parent = slot_parent.slots[slot_path[i]];
    }
    slot_parent.slots[slot_path[slot_path.length-1]] = answer.copyBlock();
    // Check the result.
    let result = Algorithm.run(term, limit, alg_num);
    if (!result[1]) return "Using your term, \""+text+"\"\ntakes too many steps to fully reduce,\nso the result cannot be verified.";
    else if (result[0].isMatchAlpha(solution)) return "";
    else return "Using your term, \""+text+"\"\nincorrectly reduces to the term:\n\""+result[0].toString()+"\"";
  }

}
