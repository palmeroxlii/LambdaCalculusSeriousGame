let question_data = [];
let section_enders = [5, 14, 29];
class Question {

  constructor(text, ans, canvas, marking) {
    this.text = text; // The text, giving the question to the user.
    this.ans = ans; // The default contents of the ANS macro.
    this.canvas = canvas; // Any other blocks that are on the canvas at the start.
    this.marking = marking; // A function that decides whether an answer is correct.
  }

}

for (let i = 0; i < 43; ++i) {
  question_data[i] = new Question("(dummy)", null, [], function (term) { return ""; });
}

question_data[0] = new Question("Fill in the three macros on the left with blocks of the correct type.",
  [TermAppV, [TermAppV, [MacroUse, "VARIABLE"], [MacroUse, "ABSTRACTION"]], [MacroUse, "APPLICATION"]],
  [[[MacroDef, [MacroUse, "VARIABLE"], null], 125, 175],
   [[MacroDef, [MacroUse, "ABSTRACTION"], null], 125, 275],
   [[MacroDef, [MacroUse, "APPLICATION"], null], 125, 375]],
  function (term) {
    if (term instanceof TermAppV && term.slots[0] instanceof TermAppV) {
      if (!(term.slots[0].slots[0] instanceof TermVar)) return "Double check the \"VARIABLE\" macro.";
      if (!(term.slots[0].slots[1] instanceof TermAbs)) return "Double check the \"ABSTRACTION\" macro.";
      if (!(term.slots[1] instanceof TermApp)) return "Double check the \"APPLICATION\" macro.";
      return "";
    } else return "Please do not alter the \"ANS\" macro.";
  });

question_data[1] = new Question("Construct the term \"λx.x\" and assign it to the \"ANS\" macro.",
  null,
  [],
  function (term) {
    if (term.isMatchExact([TermAbs, [TermVar, "x"], [TermVar, "x"]])) return "";
    else if (term instanceof EmptySlot) return "Please assign your answer to the \"ANS\" macro.";
    else return "Double check that your answer matches\nthe term given in the question.";
  });

question_data[2] = new Question("Construct the term \"λx y.x\".",
  null,
  [],
  function (term) {
    if (term.isMatchExact([TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]])) return "";
    else if (term.isMatchExact([TermAbs, [TermVar, "xy"], [TermVar, "x"]]))
      return "Remember that \"λx y.x\" is shorthand for \"λx.λy.x\".";
    else if (term.isMatchExact([TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "x"], [TermVar, "x"]]]))
      return "Use the ≡ button in the bottom left\nto create different variables.";
    else if (term instanceof EmptySlot) return "Please assign your answer to the \"ANS\" macro.";
    else return "Double check that your answer matches\nthe term given in the question.";
  });

question_data[3] = new Question("Construct the term \"λa.a b\".",
  null,
  [],
  function (term) {
    if (term.isMatchExact([TermAbs, [TermVar, "a"], [TermApp, [TermVar, "a"], [TermVar, "b"]]])) return "";
    else if (term.isMatchExact([TermApp, [TermAbs, [TermVar, "a"], [TermVar, "a"]], [TermVar, "b"]]))
      return "Remember that the scope of an abstraction\nextends as far right as possible.";
    else if (term instanceof EmptySlot) return "Please assign your answer to the \"ANS\" macro.";
    else return "Double check that your answer matches\nthe term given in the question.";
  });

question_data[4] = new Question("Construct the term \"λi.i j k\".",
  null,
  [],
  function (term) {
    if (term.isMatchExact([TermAbs, [TermVar, "i"], [TermApp, [TermApp, [TermVar, "i"], [TermVar, "j"]], [TermVar, "k"]]])) return "";
    else if (term.isMatchExact([TermAbs, [TermVar, "i"], [TermApp, [TermVar, "i"], [TermApp, [TermVar, "j"], [TermVar, "k"]]]]))
      return "Remember that applications always associate left.";
    else if (term instanceof EmptySlot) return "Please assign your answer to the \"ANS\" macro.";
    else return "Double check that your answer matches\nthe term given in the question.";
  });
