class AlgorithmDisplay extends Popup {

  constructor(term, alg_index) {
    super();
    this.slides = applyToTerm(term, algorithms[alg_index]);
    this.current_slide = 0;
    this.max_slide = this.slides.length-1;

    this.header = new HeaderWithCanvas(header.ypos, "Slide 1 of "+this.slides.length, header.size, "Back", header.topright.text_size);
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
    this.header.topright.checkHover(true);
    this.next.checkHover(this.current_slide !== this.max_slide);
    this.prev.checkHover(this.current_slide !== 0);
  }

  mousePressed() {
    if (this.next.highlighted && this.current_slide !== this.max_slide) ++this.current_slide;
    if (this.prev.highlighted && this.current_slide !== 0) --this.current_slide;
    this.header.text = "Slide "+(this.current_slide+1)+" of "+(this.max_slide+1);
    if (this.header.topright.highlighted) popup = null;
  }

}
