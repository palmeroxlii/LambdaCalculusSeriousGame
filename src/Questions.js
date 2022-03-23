class Question {

  constructor(text, ans, canvas, marking) {
    this.text = text; // The text, giving the question to the user.
    this.ans = ans; // The default contents of the ANS macro.
    this.canvas = canvas; // Any other blocks that are on the canvas at the start.
    this.marking = marking; // A function that decides whether an answer is correct.
  }

}

let question_data = [];
for (let i = 0; i < 43; ++i) {
  question_data[i] = new Question("(dummy)", null, [], function (term) { return [term, true, ""]; });
}

// The first example question.
question_data[10] = new Question(
  "Q11: Construct the term (λx.x z)(λy.z y)",
  null,
  [[[TermVar, "x"], 35, 475], [[TermVar, "y"], 80, 475], [[TermVar, "z"], 125, 475]],
  function (term) {
    if (term.isMatchExact([TermApp, [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "z"]]],
                                    [TermAbs, [TermVar, "y"], [TermApp, [TermVar, "z"], [TermVar, "y"]]]])) return [term, true, ""];
    else if (term instanceof TermApp
      && (term.slots[0].isMatchExact([TermApp, [TermAbs, [TermVar, "x"], [TermVar, "x"]], [TermVar, "z"]])
        || term.slots[1].isMatchExact([TermApp, [TermAbs, [TermVar, "y"], [TermVar, "z"]], [TermVar, "y"]])))
          return [term, false, "Check that the scope of the abstraction is correct."];
    else return [term, false, "Double check that your answer matches\nthe term given in the question."];
  });

// The second example question.
question_data[18] = new Question(
  "Q19: Perform one beta-reduction step on the given term",
  [TermAppV, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "z"]]],
             [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "z"], [TermVar, "y"]]]],
  [],
  function (term) {
    if (term.isMatchExact([TermApp, [TermAbs, [TermVar, "y"], [TermApp, [TermVar, "z"], [TermVar, "y"]]],
                                    [TermVar, "z"]])) return [term, true, ""];
    else if (term.isMatchExact([TermApp, [TermVar, "z"], [TermVar, "z"]])) return [term, false, "The question only asks for a single step."];
    else return [term, false, "Double check that your answer matches\nwhat the question asks for."];
  });

// The third example question.
question_data[19] = new Question(
  "Q20: Fully beta-reduce the given term",
  [TermAppV, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "z"]]],
             [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "z"], [TermVar, "y"]]]],
  [],
  function (term) {
    if (term.isMatchExact([TermApp, [TermVar, "z"], [TermVar, "z"]])) return [term, true, ""];
    else if (term.isMatchExact([TermApp, [TermAbs, [TermVar, "y"], [TermApp, [TermVar, "z"], [TermVar, "y"]]],
                                         [TermVar, "z"]])) return [term, false, "The question asks for a fully reduced term."];
    else return [term, false, "Double check that your answer matches\nwhat the question asks for."];
  });
