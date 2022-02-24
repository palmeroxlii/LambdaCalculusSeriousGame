// Shapes for different types of blocks.
function displayRounded(e) {
  return function(x, y, w, h) {
    beginShape();
    vertex(x+e, y);
    vertex(x+w-e, y);
    bezierVertex(x+w, y, x+w, y+h, x+w-e, y+h);
    vertex(x+e, y+h);
    bezierVertex(x, y+h, x, y, x+e, y);
    endShape(CLOSE);
  }
}
const displayRoundedNormal = displayRounded(10);
const displayRoundedSmall = displayRounded(5);

function displayHexagon(e) {
  return function(x, y, w, h) {
    beginShape();
    vertex(x+e, y);
    vertex(x+w-e, y);
    vertex(x+w, y+h/2);
    vertex(x+w-e, y+h);
    vertex(x+e, y+h);
    vertex(x, y+h/2);
    endShape(CLOSE);
  }
}
const displayHexagonNormal = displayHexagon(10);
const displayHexagonSmall = displayHexagon(5);

function displayRectangle(x, y, w, h) {
  rect(x, y, w, h);
}

// Colours for different types of blocks.
const col_slot = "DimGrey";
const col_var = "Gold";
const col_abs = "YellowGreen";
const col_app = "SkyBlue";
const col_macro = "HotPink";

// Blueprints for slots that hold: only variables, all terms, only macros.
const bp_var = [displayRoundedSmall, 1];
const bp_term = [displayHexagonSmall, 7];
const bp_macro = [displayRectangle, 4];

// This is the base class for all types of blocks, and should not be instantiated directly.
class Block {

  constructor(x, y, text, col, shape, type, slot_blueprints) {
    this.pos = createVector(x, y);
    this.mouse_offset = createVector(0, 0);
    this.size = createVector(0, 0);

    this.text = text;
    this.col = color(col);
    this.displayShape = shape;
    this.highlighted = false;

    // Bitfield for which types of blocks are allowed in which slots.
    // 1 - Variables. 2 - Abstractions & Applications. 4 - Macro uses.
    this.type = type;

    this.slot_blueprints = slot_blueprints;
    this.slots = [];
    for (let blueprint of this.slot_blueprints) {
      this.slots.push(new EmptySlot(0, 0, blueprint));
    }

    this.updateBlock();
  }

  /* When called on a block from the canvas directly, this function returns the following cases:
   * [null, null, 0] if the block is not hovered over at all.
   * [this, null, 0] if the block itself is hovered over.
   * [this, this, i] if the i'th direct child of the block is hovered over.
   * [this, prnt, i] if a distant child of the block (the i'th child of prnt) is hovered over.
   */
  checkHover(point, consider_empties) {
    if (this.collisionCheck(point)) {
      if (!key_ctrl) {
        // This block is hovered over, but I might actually be hovering over a child block.
        // Note that I may or may not want to consider empty slots depending on the task.
        for (let i = 0; i < this.slots.length; ++i) {
          let slot = this.slots[i];
          if (!(slot instanceof EmptySlot) || consider_empties) {
            let inner = slot.checkHover(point, consider_empties);
            if (inner[0] !== null) {
              if (inner[1] === null) {
                // A direct child of this block is hovered over.
                return [this,this,i];
              } else {
                // Some distant child of this block is hovered over.
                return [this, inner[1], inner[2]];
              }
            }
          }
        }
      }
      // This block is hovered over, and either no child block is hovered over, or I want the full block anyway.
      return [this, null, 0];
    } else {
      // This block is not hovered over at all.
      return [null, null, 0];
    }
  }

  collisionCheck(point) {
    return point.x >= this.pos.x && point.x <= this.pos.x+this.size.x
      && point.y >= this.pos.y && point.y <= this.pos.y+this.size.y;
  }

  copyBlock() {
    let tmp = this.copy();
    for (let i = 0; i < this.slots.length; ++i) {
      tmp.slots[i] = this.slots[i].copyBlock();
    }
    tmp.updateBlock();
    return tmp;
  }

  display() {
    strokeWeight(2);
    stroke(this.highlighted||canvas.dragged===this?"White":"Black"); //abs(sin(frameCount*2))*255
    fill(this.col);
    this.displayShape(this.pos.x, this.pos.y, this.size.x, this.size.y);
    this.displayExtra();
    for (let slot of this.slots) {
      slot.display();
    }
  }

  dragStart() {
    this.mouse_offset.set(mouse.x-this.pos.x, mouse.y-this.pos.y);
    for (let slot of this.slots) {
      slot.dragStart();
    }
  }

  dragUpdate() {
    this.pos.set(mouse.x-this.mouse_offset.x, mouse.y-this.mouse_offset.y);
    for (let slot of this.slots) {
      slot.dragUpdate();
    }
  }

  emptySlot(i) {
    this.slots[i] = new EmptySlot(0, 0, this.slot_blueprints[i]);
  }

  removeHighlight(){
    this.highlighted = false;
    for (let slot of this.slots) {
      slot.removeHighlight();
    }
  }

  updateBlock() {
    this.updateSizeMaster();
    this.updatePosMaster();
  }

  updatePosMaster() {
    this.updatePos();
    for (let slot of this.slots) {
      slot.updatePosMaster();
    }
  }

  updateSizeMaster() {
    for (let slot of this.slots) {
      slot.updateSizeMaster();
    }
    this.updateSize();
  }

  // These functions should be overwritten by the subclass as needed.
  copy() {}
  displayExtra() {}
  toString() {}
  updatePos() {}
  updateSize() {}

}
