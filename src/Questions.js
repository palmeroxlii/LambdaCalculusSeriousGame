class Question {

  constructor(text, ans, canvas, marking) {
    this.text = text; // The text, giving the question to the user.
    this.ans = ans; // The default contents of the ANS macro.
    this.canvas = canvas; // Any other blocks that are on the canvas at the start.
    this.marking = marking; // A function that decides whether an answer is correct.
  }

  static MCQ(text, canvas, options, correct, hint) {
    return new Question(text, null, canvas.concat(Question.McqCanvas(options)), Question.McqMarking(options, correct, hint));
  }

  static McqCanvas(options) {
    let canvas = [];
    textSize(30);
    let ypos = 475-(options.length-1)*50;
    let letter = 65;
    for (let j = 0; j < options.length; ++j) {
      let row = options[j];
      let width = [];
      for (let i = 0; i < row.length; ++i) {
        row[i] = char(letter++)+"  "+row[i];
        width[i] = max(40, textWidth(row[i])+15);
      }
      let xpos = 600-(width.reduce((a, b) => a+b, 0)+(row.length-1)*20)/2;
      for (let i = 0; i < row.length; ++i) {
        canvas.push([[MacroDef, [MacroUse, row[i]], [TermVar, row[i].charAt()]], 0, -200]);
        canvas.push([[MacroUse, row[i]], xpos, ypos]);
        xpos += width[i]+20;
      }
      ypos += 50;
    }
    return canvas;
  }

  static McqMarking(options, correct, hint) {
    let valid = [];
    for (let row of options) {
      for (let s of row) {
        valid.push(s.charAt());
      }
    }
    let ans = char(65+correct);
    return function (term) {
      if (term instanceof TermVar) {
        if (term.text === ans) return "";
        else if (valid.indexOf(term.text) !== -1) return hint;
      }
      return "Please answer using one of the given macros.";
    }
  }

}

/* Questions:
 *  1 -  6 Constructing terms.
 *  7 - 15 Alpha conversion.
 * 16 - 30 Beta reduction.
 * 31 - 39 Church numerals & Church Booleans. */
let section_enders = [5, 14, 29];
let question_data = [];

function createQuestions() {
  for (let i = 0; i < 39; ++i) {
    question_data[i] = new Question("(dummy)", null, [], function (term) { return ""; });
  }
  qpage1();
  qpage2();
  qpage3();
}
