// These were the example questions used during development, and are not used in the final game.
// Note that this code may not be compatible with the current version of the program.

for (let i = 0; i < 43; ++i) {
  question_data[i] = new Question("(dummy)", null, [], function (term) { return ""; });
}

// The first example question.
question_data[10] = new Question("Q11: Construct the term (λx.x z)(λy.z y)",
  null,
  [[[TermVar, "x"], 35, 475], [[TermVar, "y"], 80, 475], [[TermVar, "z"], 125, 475]],
  function (term) {
    if (term.isMatchExact([TermApp, [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "z"]]],
                                    [TermAbs, [TermVar, "y"], [TermApp, [TermVar, "z"], [TermVar, "y"]]]])) return [term, true, ""];
    else if (term instanceof TermApp
      && (term.slots[0].isMatchExact([TermApp, [TermAbs, [TermVar, "x"], [TermVar, "x"]], [TermVar, "z"]])
        || term.slots[1].isMatchExact([TermApp, [TermAbs, [TermVar, "y"], [TermVar, "z"]], [TermVar, "y"]])))
          return "Check that the scope of the abstraction is correct.";
    else return "Double check that your answer matches\nthe term given in the question.";
  }
);

// The second example question.
question_data[18] = new Question("Q19: Perform one beta-reduction step on the given term",
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
question_data[19] = new Question("Q20: Fully beta-reduce the given term",
  [TermAppV, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "z"]]],
             [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "z"], [TermVar, "y"]]]],
  [],
  function (term) {
    if (term.isMatchExact([TermApp, [TermVar, "z"], [TermVar, "z"]])) return [term, true, ""];
    else if (term.isMatchExact([TermApp, [TermAbs, [TermVar, "y"], [TermApp, [TermVar, "z"], [TermVar, "y"]]],
                                         [TermVar, "z"]])) return [term, false, "The question asks for a fully reduced term."];
    else return [term, false, "Double check that your answer matches\nwhat the question asks for."];
  });

// The example multiple choice.
question_data[2] = new Question("Q3: Which instances of x should also be renamed?",
  null,
  [[[MacroDef, [MacroUse, "F"], [TermAppH, [TermVar, "x"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"],
                                [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "x"], [TermVar, "y"]]]]]]], 75, 110],
   [[MacroDef, [MacroUse, "WRONG"], [TermAppH, [TermVar, "x"], [TermAbs, [TermVar, "z"], [TermAppH, [TermVar, "z"],
                                [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "x"], [TermVar, "y"]]]]]]], 575, 110],
   [[MacroDef, [MacroUse, "A  Neither x"], [TermVar, "A"]], -200, 0],
   [[MacroDef, [MacroUse, "B  The first x"], [TermVar, "B"]], -200, 0],
   [[MacroDef, [MacroUse, "C  The second x"], [TermVar, "C"]], -200, 0],
   [[MacroDef, [MacroUse, "D  Both x"], [TermVar, "D"]], -200, 0],
   [[MacroUse, "A  Neither x"], 240, 375],[[MacroUse, "B  The first x"], 425, 375],
   [[MacroUse, "C  The second x"], 625, 375],[[MacroUse, "D  Both x"], 875, 375]],
  function (term) {
    if (term instanceof TermVar) {
      if (term.text === "C") return "";
      else if (term.text === "A" || term.text === "B" || term.text === "D") return "Double check which instances of x\nare bound to the binder.";
    }
    return "Please answer using one of the given macros.";
  });
