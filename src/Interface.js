class Header {

  constructor(y, text, size) {
    // The y position is the BOTTOM of the header (as the top is always the top of the screen).
    this.ypos = y;
    this.text = text;
    this.size = size;
    this.back = new Button(0, 0, this.ypos, this.ypos, "←", this.size);
  }

  buttonHover(button) {
    if (popup === null) button.checkHover();
    else button.noHover();
  }

  display() {
    noStroke();
    fill("White");
    rect(0, 0, 1200, this.ypos);
    strokeWeight(1);
    stroke("Black");
    line(0, this.ypos, 1200, this.ypos);
    strokeWeight(2);
    fill("Gainsboro");
    textSize(this.size);
    text(this.text, 0, 0, 1200, this.ypos);
    this.back.displayEmbedded();
  }

}

class HeaderWithCanvas extends Header {

  constructor(y, text, size, topright_text, topright_size) {
    super(y, text, size);
    this.topright_button = new Button(1200-this.ypos*2, 0, this.ypos*2, this.ypos, topright_text, topright_size);
  }

  display() {
    super.display();
    this.topright_button.displayEmbedded();
  }

  tooltip() {
    let str = this.tooltipGet();
    if (str !== "") {
      textSize(25);
      str = " "+str+" ";
      let w = textWidth(str), h = textAscent()+textDescent();
      strokeWeight(1);
      stroke("Black");
      fill("White");
      rect(600-w/2, this.ypos, w, h);
      noStroke();
      fill("Black");
      text(str, 600, this.ypos+h/2);
    }
  }

  tooltipGet() {
    // The block that is currently being dragged.
    if (canvas.dragged !== null) return canvas.dragged.toString();
    // The block on the canvas that is currently hovered over.
    if (canvas.hover_data[0] !== null) {
      if (canvas.hover_data[1] === null) return canvas.hover_data[0].toString();
      else return canvas.hover_data[1].slots[canvas.hover_data[2]].toString();
    }
    // The option on the palette that is currently hovered over.
    if (palette.selected !== -1) return palette.examples[palette.selected].toString();
    // The button that is currently hovered over.
    if (this.back.highlighted) return "Back";
    if (this.topright_button.highlighted) return this.topright_button.text.replace("\n", " ");
    if (palette.change_var.highlighted) return "Change Variable";
    if (palette.change_macro.highlighted) return "Change Macro";
    // No tooltip.
    else return "";
  }

}

class Canvas {

  constructor() {
    this.blocks = [];
    this.dragged = null;
    this.hover_data = [null, null, 0];
  }

  checkHoverBlock() {
    // Iterate over all blocks on the canvas, to check if they are hovered over.
    for (let block of this.blocks) {
      let hover_test = block.checkHover(mouse, false);
      if (hover_test[0] !== null) {
        this.hover_data = hover_test;
        if (key_ctrl) break;
      }
    }
    // If a block is hovered over, then highlight it.
    if (this.hover_data[0] !== null) {
      if (this.hover_data[1] === null) this.hover_data[0].highlighted = true;
      else this.hover_data[1].slots[this.hover_data[2]].highlighted = true;
    }
  }

  checkHoverSlot() {
    // Iterate over all slots on the canvas, to check if they are hovered over.
    for (let block of this.blocks) {
      let hover_test = block.checkHover(this.dragged.pos, true);
      if (this.checkHoverSlotCompatible(hover_test)) this.hover_data = hover_test;
    }
    // If a slot is hovered over, then highlight it.
    if (this.hover_data[0] !== null) this.hover_data[1].slots[this.hover_data[2]].highlighted = true;
  }

  checkHoverSlotCompatible(hover_test) {
    // A block is hovered over at all, and it is not directly on the canvas (which empty slots cannot be).
    return hover_test[1] !== null
    // The block is an empty slot.
    && hover_test[1].slots[hover_test[2]] instanceof EmptySlot
    // The types of the dragged block and empty slot are compatible.
    && (hover_test[1].slots[hover_test[2]].type & this.dragged.type) !== 0;
  }

  copyBlock() {
    if (this.hover_data[1] === null) {
      // Copying a block directly from the canvas.
      return this.hover_data[0].copyBlock();
    } else {
      // Copying a block from a slot in another block.
      return this.hover_data[1].slots[this.hover_data[2]].copyBlock();
    }
  }

  display() {
    for (let block of this.blocks) {
      block.display();
    }
  }

  dragBlock() {
      this.dragged = key_shift?this.copyBlock():this.removeBlock();
      this.dragged.removeHighlight();
      this.dragged.dragStart();
  }

  /* This returns an array of 3 elements:
   * [0] - The expanded term, or as far as the program could go if not fully expanded.
   * [1] - Whether or not the term was fully expanded.
   * [2] - The feedback message to display if the term was not fully expanded. */
  expandTerm(term, used_macros) {
    let newterm = term.copyBlock();
    if (term instanceof MacroUse) {
      if (used_macros.includes(term.text)) return [newterm, false, "The "+term.text+" macro includes a circular reference."]
      let def = this.searchMacro(term.text);
      if (def.length === 0) return [newterm, false, "The "+term.text+" macro has not been defined."];
      if (def.length > 1) return [newterm, false, "The "+term.text+" macro has been defined\nin multiple different places."];
      return this.expandTerm(def[0], used_macros.concat([term.text]));
    } else {
      let correct = true, message = "";
      for (let i = (term instanceof MacroDef?1:0); i < newterm.slots.length; ++i) {
        let newslot = this.expandTerm(newterm.slots[i], used_macros);
        newterm.slots[i] = newslot[0]
        if (!newslot[1]) {
          correct = false;
          message = newslot[2];
        }
      }
      return [newterm, correct, message];
    }
  }

  removeBlock() {
    let block;
    if (this.hover_data[1] === null) {
      // Removing a block directly from the canvas.
      block = this.hover_data[0];
      // The next line is the equivalent of blocks.remove(block) in a Java ArrayList.
      this.blocks.splice(this.blocks.indexOf(block), 1);
    } else {
      // Removing a block from a slot in another block.
      block = this.hover_data[1].slots[this.hover_data[2]];
      this.hover_data[1].emptySlot(this.hover_data[2]);
      this.hover_data[0].updateBlock();
    }
    return block;
  }

  searchMacro(target) {
    let result = [];
    for (let block of this.blocks) {
      if (block instanceof MacroDef && block.slots[0] instanceof MacroUse
        && block.slots[0].text === target) result.push(block.slots[1]);
    }
    return result;
  }

  updateHover() {
    // Reset the stale hover data.
    this.hover_data = [null, null, 0];
    for (let block of this.blocks) {
      block.removeHighlight();
    }
    if (popup === null) {
      if (this.dragged === null) {
        // I'm not currently carrying a block, so I might be hovering over a block on the canvas.
        if (mouse.y > header.ypos && mouse.y < palette.ypos) this.checkHoverBlock();
      } else {
        this.dragged.dragUpdate();
        // I'm currently carrying a block, so I might be hovering over a compatible empty slot.
        if (mouse.y > header.ypos && mouse.y < palette.ypos && !key_ctrl) this.checkHoverSlot();
      }
    }
  }

}

class Palette {

  constructor(y, blocks) {
    // The y position is the TOP of the palette (as the bottom is always the bottom of the screen).
    this.ypos = y;
    this.length = blocks.length;
    this.block_size = createVector(1200/this.length, 600-this.ypos);
    this.selected = -1;

    this.blocks = blocks;
    this.examples = [];
    for (let i = 0; i < this.length; ++i) {
      this.examples[i] = new this.blocks[i](0, 0, this.blocks[i] === TermVar?"x":this.blocks[i] === MacroUse?"F":"");
      this.centraliseBlock(i);
    }

    this.change_var = new Button(0, 574, 26, 26, "≡", 20);
    this.change_macro = new Button(1174, 574, 26, 26, "≡", 20);
  }

  centraliseBlock(i) {
    let block = this.examples[i];
    block.updateBlock();
    block.pos.set(i*this.block_size.x+(this.block_size.x-block.size.x)/2,
      this.ypos+(this.block_size.y-block.size.y)/2);
    block.updateBlock();
  }

  createBlock() {
    return new this.blocks[this.selected]
      (mouse.x-this.examples[this.selected].size.x/2, mouse.y-this.examples[this.selected].size.y/2,
      this.examples[this.selected].text);
  }

  display() {
    // The palette itself (including the hovering colour change).
    noStroke();
    fill("White");
    rect(0, this.ypos, 1200, this.block_size.y);
    if (this.selected !== -1) {
      fill("Gainsboro");
      rect(this.selected*this.block_size.x, this.ypos, this.block_size.x, this.block_size.y);
    }
    strokeWeight(1);
    stroke("Black");
    line(0, this.ypos, 1200, this.ypos);
    for (let i = 1; i < this.length; ++i) {
      line(i*this.block_size.x, this.ypos, i*this.block_size.x, 600);
    }
    // The example blocks.
    for (let block of this.examples) {
      block.display();
    }
    // The buttons.
    this.change_var.displayEmbedded();
    this.change_macro.displayEmbedded();
  }

  selectBlock() {
    if (popup !== null) {
      this.change_var.noHover();
      this.change_macro.noHover();
      this.selected = -1;
    } else {
      this.change_var.checkHover();
      this.change_macro.checkHover();
      if (mouse.y < this.ypos || this.change_var.highlighted || this.change_macro.highlighted) this.selected = -1;
      else this.selected = constrain(floor(mouse.x/this.block_size.x), 0, this.length-1);
    }
  }

}
