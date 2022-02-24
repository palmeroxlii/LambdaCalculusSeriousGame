function getTextSize(str) {
  textSize(25);
  let text_height = textAscent()+textDescent();
  let lines = str.split("\n");
  let line_width = 0;
  for (let line of lines) {
    line_width = max(line_width, textWidth(line));
  }
  return createVector(line_width, text_height*lines.length);
}

class ApplyChooseBlock {

  constructor() {
    this.next = new Button(1000, 300, 100, 100, ">", 40);
    this.prev = new Button(100, 300, 100, 100, "<", 40);
    // Divide the blocks into pages, such that each page fits within the screen.
    this.current_page = 0;
    this.pages = [];
    let size_tmp = createVector(0, 0), page_tmp = [];
    for (let block of canvas.blocks) {
      if (size_tmp.y+block.size.y+10 > 600-header.ypos-10) this.createPage(size_tmp, page_tmp);
      page_tmp.push(block.copyBlock());
      size_tmp.set(max(size_tmp.x, block.size.x+10), size_tmp.y+block.size.y+10);
    }
    if (page_tmp.length !== 0) this.createPage(size_tmp, page_tmp);
    this.max_page = this.pages.length-1;
  }

  createPage(size_tmp, page_tmp) {
    // Position the blocks & buttons into a vertical list.
    let pos = createVector(600-size_tmp.x/2, 300+(header.ypos-size_tmp.y)/2);
    let page = [];
    for (let block of page_tmp) {
      block.pos.set(600-block.size.x/2, pos.y+5);
      block.updateBlock();
      let button = new Button(pos.x, pos.y, size_tmp.x, block.size.y+10, "", 0);
      pos.y += block.size.y+10;
      page.push([block, button]);
    }
    this.pages.push(page);
    // Clear the current page, ready for the next page.
    size_tmp.set(0, 0);
    page_tmp.length = 0;
  }

  display() {
    for (let block of this.pages[this.current_page]) {
      block[1].displayEmbedded();
      block[0].display();
    }
    if (this.current_page !== this.max_page) this.next.display();
    if (this.current_page !== 0) this.prev.display();
  }

  execute() {
    // Reset all buttons.
    this.next.noHover();
    this.prev.noHover();
    for (let page of this.pages) {
      for (let block of page) {
        block[1].noHover();
      }
    }
    // Update just the current page.
    for (let block of this.pages[this.current_page]) {
      block[1].checkHover();
    }
    if (this.current_page !== this.max_page) this.next.checkHover();
    if (this.current_page !== 0) this.prev.checkHover();
  }

  mousePressed() {
    for (let block of this.pages[this.current_page]) {
      if (block[1].highlighted) {
        popup.block = block[0];
        popup.header.text = "Choose an algorithm";
      }
    }
    if (this.next.highlighted && this.current_page !== this.max_page) ++this.current_page;
    if (this.prev.highlighted && this.current_page !== 0) --this.current_page;
  }

}

class ApplyChooseAlg {

  constructor() {
    let algs = [" Beta reduction \n Normal-order strategy ",
      " Beta reduction \n Applicative-order strategy "]
    this.next = new Button(1000, 300, 100, 100, ">", 40);
    this.prev = new Button(100, 300, 100, 100, "<", 40);
    // Divide the algorithms into pages, such that each page fits within the screen.
    this.current_page = 0;
    this.pages = [];
    let size_tmp = createVector(0, 0), page_tmp = [];
    for (let i = 0; i < algs.length; ++i) {
      let alg = algs[i];
      let alg_size = getTextSize(alg);
      if (size_tmp.y+alg_size.y+10 > 600-header.ypos-10) this.createPage(size_tmp, page_tmp);
      page_tmp.push([i, alg]);
      size_tmp.set(max(size_tmp.x, alg_size.x+10), size_tmp.y+alg_size.y+10);
    }
    if (page_tmp.length !== 0) this.createPage(size_tmp, page_tmp);
    this.max_page = this.pages.length-1;
  }

  createPage(size_tmp, page_tmp) {
    // Position the buttons into a vertical list.
    let pos = createVector(600-size_tmp.x/2, 300+(header.ypos-size_tmp.y)/2);
    let page = [];
    for (let alg of page_tmp) {
      let alg_size = getTextSize(alg[1]);
      let button = new Button(pos.x, pos.y, size_tmp.x, alg_size.y+10, alg[1], 25);
      pos.y += alg_size.y+10;
      page.push([alg[0], button]);
    }
    this.pages.push(page);
    // Clear the current page, ready for the next page.
    size_tmp.set(0, 0);
    page_tmp.length = 0;
  }

  display() {
    for (let alg of this.pages[this.current_page]) {
      alg[1].displayEmbedded();
    }
    if (this.current_page !== this.max_page) this.next.display();
    if (this.current_page !== 0) this.prev.display();
  }

  execute() {
    // Reset all buttons.
    this.next.noHover();
    this.prev.noHover();
    for (let page of this.pages) {
      for (let alg of page) {
        alg[1].noHover();
      }
    }
    // Update just the current page.
    for (let alg of this.pages[this.current_page]) {
      alg[1].checkHover();
    }
    if (this.current_page !== this.max_page) this.next.checkHover();
    if (this.current_page !== 0) this.prev.checkHover();
  }

  mousePressed() {
    for (let alg of this.pages[this.current_page]) {
      if (alg[1].highlighted) {
        popup.alg = [alg[0], alg[1].text];
        popup.header.text = "Confirm choice";
        popup.makeConfirmPage();
      }
    }
    if (this.next.highlighted && this.current_page !== this.max_page) ++this.current_page;
    if (this.prev.highlighted && this.current_page !== 0) --this.current_page;
  }

}
