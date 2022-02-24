// This isn't an actual block, but rather a placeholder for an empty slot in another block.
class EmptySlot extends Block {

  constructor(x, y, blueprint) {
    super(x, y, "#", col_slot, blueprint[0], blueprint[1], []);
  }

  copy() {
    return new EmptySlot(this.pos.x, this.pos.y, [this.displayShape, this.type]);
  }

  toString() {
    return "#";
  }

  updateSize() {
    this.size.set(30, 30);
  }

}

// This represents a variable term.
class TermVar extends Block {

  constructor(x, y, text) {
    super(x, y, text, col_var, displayRoundedNormal, 3, []);
  }

  copy() {
    return new TermVar(this.pos.x, this.pos.y, this.text);
  }

  displayExtra() {
    noStroke();
    fill("Black");
    textSize(30);
    text(this.text, this.pos.x+this.size.x/2, this.pos.y+this.size.y/2);
  }

  toString() {
    return this.text;
  }

  updateSize() {
    textSize(30);
    this.size.set(max(40, textWidth(this.text)+15), 40);
  }

}

// This represents an abstraction term.
class TermAbs extends Block {

  constructor(x, y) {
    super(x, y, "", col_abs, displayHexagonNormal, 2, [bp_var, bp_term]);
  }

  copy() {
    return new TermAbs(this.pos.x, this.pos.y);
  }

  displayExtra() {
    noStroke();
    fill("Black");
    textSize(30);
    text("λ", this.pos.x+17.5, this.pos.y+this.size.y/2); //15x30
    text(".", this.pos.x+this.slots[0].size.x+29, this.pos.y+this.size.y/2); //10x30
  }

  toString() {
    let str = "λ" + this.slots[0].toString();
    let next = this.slots[1];
    while (next instanceof TermAbs) {
      str += " "+next.slots[0].toString();
      next = next.slots[1];
    }
    return str + "." + next.toString();
  }

  updatePos() {
    this.slots[0].pos.set(this.pos.x+25,
      this.pos.y+this.size.y/2-this.slots[0].size.y/2);
    this.slots[1].pos.set(this.pos.x+this.size.x-this.slots[1].size.x-10,
      this.pos.y+this.size.y/2-this.slots[1].size.y/2);
  }

  updateSize() {
    this.size.set(this.slots[0].size.x+this.slots[1].size.x+45,
      max(this.slots[0].size.y, this.slots[1].size.y)+10);
  }

}

// This represents an application term. This class should only be used for the purposes of classifying
// different types of terms, and should not actually be instantiated (use TermAppH or TermAppV instead).
class TermApp extends Block {

  constructor(x, y) {
    super(x, y, "", col_app, displayHexagonNormal, 2, [bp_term, bp_term]);
  }

  toString() {
    let s0 = this.slots[0].text === ""?"("+this.slots[0].toString()+")":this.slots[0].toString();
    let s1 = this.slots[1].text === ""?"("+this.slots[1].toString()+")":this.slots[1].toString();
    let space = this.slots[0].text === "" || this.slots[1].text === ""?"":" ";
    return s0+space+s1;
  }

}

// This represents an application term displayed horizontally.
class TermAppH extends TermApp {

  constructor(x, y) {
    super(x, y);
  }

  copy() {
    return new TermAppH(this.pos.x, this.pos.y);
  }

  updatePos() {
      this.slots[0].pos.set(this.pos.x+10,
        this.pos.y+this.size.y/2-this.slots[0].size.y/2);
      this.slots[1].pos.set(this.pos.x+this.size.x-this.slots[1].size.x-10,
        this.pos.y+this.size.y/2-this.slots[1].size.y/2);
    }

  updateSize() {
    this.size.set(this.slots[0].size.x+this.slots[1].size.x+25,
      max(this.slots[0].size.y, this.slots[1].size.y)+10);
  }

}

// This represents an application term displayed vertically.
class TermAppV extends TermApp {

  constructor(x, y) {
    super(x, y);
  }

  copy() {
    return new TermAppV(this.pos.x, this.pos.y);
  }

  updatePos() {
      this.slots[0].pos.set(this.pos.x+this.size.x/2-this.slots[0].size.x/2,
        this.pos.y+5);
      this.slots[1].pos.set(this.pos.x+this.size.x/2-this.slots[1].size.x/2,
        this.pos.y+this.size.y-this.slots[1].size.y-5);
    }

  updateSize() {
    this.size.set(max(this.slots[0].size.x, this.slots[1].size.x)+20,
      this.slots[0].size.y+this.slots[1].size.y+15);
  }

}

// This represents a macro definition.
class MacroDef extends Block {

  constructor(x, y) {
    super(x, y, "", col_macro, displayRectangle, 0, [bp_macro, bp_term]);
  }

  copy() {
    return new MacroDef(this.pos.x, this.pos.y);
  }

  displayExtra() {
    noStroke();
    fill("Black");
    textSize(30);
    text(":=", this.pos.x+this.slots[0].size.x+20, this.pos.y+this.size.y/2);
  }

  toString() {
    return this.slots[0].toString() + ":=" + this.slots[1].toString();
  }

  updatePos() {
    this.slots[0].pos.set(this.pos.x+5,
      this.pos.y+this.size.y/2-this.slots[0].size.y/2);
    this.slots[1].pos.set(this.pos.x+this.size.x-this.slots[1].size.x-5,
      this.pos.y+this.size.y/2-this.slots[1].size.y/2);
  }

  updateSize() {
    this.size.set(this.slots[0].size.x+this.slots[1].size.x+40,
      max(this.slots[0].size.y, this.slots[1].size.y)+10);
  }

}

// This represents a macro term.
class MacroUse extends Block {

  constructor(x, y, text) {
    super(x, y, text, col_macro, displayRectangle, 6, []);
  }

  copy() {
    return new MacroUse(this.pos.x, this.pos.y, this.text);
  }

  displayExtra() {
    noStroke();
    fill("Black");
    textSize(30);
    text(this.text, this.pos.x+this.size.x/2, this.pos.y+this.size.y/2);
  }

  toString() {
    return this.text;
  }

  updateSize() {
    textSize(30);
    this.size.set(max(40, textWidth(this.text)+15), 40);
  }

}
