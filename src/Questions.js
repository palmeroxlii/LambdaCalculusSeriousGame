class Question {

  constructor(text, ans, canvas, marking) {
    this.text = text; // The text, giving the question to the user.
    this.ans = ans; // The default contents of the ANS macro.
    this.canvas = canvas; // Any other blocks that are on the canvas at the start.
    this.marking = marking; // A function that decides whether an answer is correct.
  }

  static MCQ(text, ans, canvas, options, correct, hint) {
    return new Question(text, ans, canvas.concat(Question.McqCanvas(options)), Question.McqMarking(options, correct, hint));
  }

  static McqCanvas(options) {
    let canvas = [];
    textSize(30);
    let width = [];
    for (let i = 0; i < options.length; ++i) {
      options[i] = char(65+i)+"  "+options[i];
      width[i] = max(40, textWidth(options[i])+15);
    }
    let xpos = 600-(width.reduce((a, b) => a+b, 0)+(options.length-1)*20)/2;
    for (let i = 0; i < options.length; ++i) {
      canvas.push([[MacroDef, [MacroUse, options[i]], [TermVar, char(65+i)]], 0, -200]);
      canvas.push([[MacroUse, options[i]], xpos, 475]);
      xpos += width[i]+20;
    }
    return canvas;
  }

  static McqMarking(options, correct, hint) {
    options = options.map(s => s.charAt());
    correct = char(65+correct);
    return function (term) {
      if (term instanceof TermVar) {
        if (term.text === correct) return "";
        else if (options.indexOf(term.text) !== -1) return hint;
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
