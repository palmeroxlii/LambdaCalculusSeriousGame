function qpage2() {

question_data[15] = new Question("Perform one beta-reduction step on the given term.",
  [TermAppV, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "z"]]],
             [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "z"], [TermVar, "y"]]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "@0"], [TermApp, [TermVar, "z"], [TermVar, "@0"]]], [TermVar, "z"]])) return "";
    else if (term.isMatchAlpha([TermAppV, [TermAbs, [TermVar, "@1"], [TermAppH, [TermVar, "@1"], [TermVar, "z"]]],
      [TermAbs, [TermVar, "@0"], [TermAppH, [TermVar, "z"], [TermVar, "@0"]]]]))
      return "Make sure that you have performed\na valid beta-reduction step."
    else if (term.isMatchAlpha([TermApp, [TermVar, "z"], [TermVar, "z"]]))
      return "Your answer is fully reduced, but the\nquestion only asks for a single step.";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });

question_data[21] = new Question("Fully beta-reduce the given term.",
  [TermAppV, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "z"]]],
             [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "z"], [TermVar, "y"]]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermApp, [TermVar, "z"], [TermVar, "z"]])) return "";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "@0"], [TermApp, [TermVar, "z"], [TermVar, "@0"]]], [TermVar, "z"]]) ||
      term.isMatchAlpha([TermAppV, [TermAbs, [TermVar, "@1"], [TermAppH, [TermVar, "@1"], [TermVar, "z"]]],
      [TermAbs, [TermVar, "@0"], [TermAppH, [TermVar, "z"], [TermVar, "@0"]]]]))
      return "Make sure that your answer is fully reduced\n(i.e. does not contain any more redexes).";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });

}
