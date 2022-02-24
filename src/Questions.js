class Question {

  constructor(text, ans, canvas, marking) {
    this.text = text;
    this.ans = ans;
    this.canvas = canvas;
    this.marking = marking;
  }

}

function matchExact(term, model) {
  if (!(term instanceof model[0])) return false;
  for (let i = 0; i < term.slots.length; ++i) {
    if (!matchExact(term.slots[i], model[i+1])) return false;
  }
  return true;
}

// The first example question.
let q_ex1 = new Question(
  "Q11: Construct the term (λx.x z)(λy.z y)",
  null,
  [[[TermVar, "x"], 35, 475], [[TermVar, "y"], 80, 475], [[TermVar, "z"], 125, 475]],
  function (term) {
    if (matchExact(term, [TermApp, [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "z"]]],
                                   [TermAbs, [TermVar, "y"], [TermApp, [TermVar, "z"], [TermVar, "y"]]]])) return [term, true, ""];
    else if (term instanceof TermApp
      && (matchExact(term.slots[0], [TermApp, [TermAbs, [TermVar, "x"], [TermVar, "x"]], [TermVar, "z"]])
       || matchExact(term.slots[1], [TermApp, [TermAbs, [TermVar, "y"], [TermVar, "z"]], [TermVar, "y"]]))) return [term, false, "Check that the scope of the abstraction is correct."];
    else return [term, false, "Double check that your answer matches\nthe term given in the question."];
  });
// The second example question.
let q_ex2 = new Question(
  "Q19: Perform one beta-reduction step on the given term",
  [TermAppV, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "z"]]],
             [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "z"], [TermVar, "y"]]]],
  [],
  function (term) {
    if (matchExact(term, [TermApp, [TermAbs, [TermVar, "y"], [TermApp, [TermVar, "z"], [TermVar, "y"]]],
                                   [TermVar, "z"]])) return [term, true, ""];
    else if (matchExact(term, [TermApp, [TermVar, "z"], [TermVar, "z"]])) return [term, false, "The question only asks for a single step."];
    else return [term, false, "Double check that your answer matches\nwhat the question asks for."];
  });
// The third example question.
let q_ex3 = new Question(
  "Q20: Fully beta-reduce the given term",
  [TermAppV, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "z"]]],
             [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "z"], [TermVar, "y"]]]],
  [],
  function (term) {
    if (matchExact(term, [TermApp, [TermVar, "z"], [TermVar, "z"]])) return [term, true, ""];
    else if (matchExact(term, [TermApp, [TermAbs, [TermVar, "y"], [TermApp, [TermVar, "z"], [TermVar, "y"]]],
                                        [TermVar, "z"]])) return [term, false, "The question asks for a fully reduced term."];
    else return [term, false, "Double check that your answer matches\nwhat the question asks for."];
  });
