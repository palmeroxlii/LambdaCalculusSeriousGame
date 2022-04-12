function qpage2() {

question_data[15] = new Question("Perform one beta-reduction step on the given term.",
  [TermAppV, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "z"]]],
             [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "z"], [TermVar, "y"]]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "@0"], [TermApp, [TermVar, "z"], [TermVar, "@0"]]], [TermVar, "z"]])) return "";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "@1"], [TermApp, [TermVar, "@1"], [TermVar, "z"]]],
      [TermAbs, [TermVar, "@0"], [TermApp, [TermVar, "z"], [TermVar, "@0"]]]]))
      return "Perform a beta-reduction step on the term."
    else if (term.isMatchAlpha([TermApp, [TermVar, "z"], [TermVar, "z"]]))
      return "Your answer is fully reduced, but this\nquestion only asks for a single step.";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });
/*TODOquestion_data[16] = new Question("Perform one beta-reduction step on the given term.",
  null,
  [],
  function (term) {
    return "wip";
  });*/
/*TODOquestion_data[17] = new Question("Perform one beta-reduction step on the given\nterm using the normal-order strategy.",
  null,
  [],
  function (term) {
    return "wip";
  });*/

/*TODOquestion_data[18] = new Question("Perform one beta-reduction step on the given\nterm using the normal-order strategy.",
  null,
  [],
  function (term) {
    return "wip";
  });*/
/*TODOquestion_data[19] = new Question("Perform one beta-reduction step on the given\nterm using the applicative-order strategy.",
  null,
  [],
  function (term) {
    return "wip";
  });*/
/*TODOquestion_data[20] = new Question("Perform one beta-reduction step on the given\nterm using the applicative-order strategy.",
  null,
  [],
  function (term) {
    return "wip";
  });*/

question_data[21] = new Question("Fully beta-reduce the given term.",
  [TermAppV, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "z"]]],
             [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "z"], [TermVar, "y"]]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermApp, [TermVar, "z"], [TermVar, "z"]])) return "";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "@0"], [TermApp, [TermVar, "z"], [TermVar, "@0"]]], [TermVar, "z"]]) ||
      term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "@1"], [TermApp, [TermVar, "@1"], [TermVar, "z"]]],
      [TermAbs, [TermVar, "@0"], [TermApp, [TermVar, "z"], [TermVar, "@0"]]]]))
      return "Make sure that your answer is fully reduced\n(i.e. does not contain any more redexes).";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });
/*TODOquestion_data[22] = new Question("Fully beta-reduce the given term.",
  null,
  [],
  function (term) {
    return "wip";
  });*/
question_data[23] = new Question("Fully beta-reduce the given term.",
  [TermAppH, [TermAppH, [TermVar, "x"], [TermAbs, [TermVar, "a"], [TermVar, "a"]]], [TermVar, "x"]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermApp, [TermApp, [TermVar, "x"], [TermAbs, [TermVar, "@0"], [TermVar, "@0"]]], [TermVar, "x"]])) return "";
    else if (term.isMatchAlpha([TermApp, [TermVar, "x"], [TermVar, "x"]]))
      return "Double check whether the subterm\nyou reduced is an actual redex.";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });

/*TODOquestion_data[24] = new Question("Fully beta-reduce the given term.",
  null,
  [],
  function (term) {
    return "wip";
  });*/
/*TODOquestion_data[25] = new Question("Fully beta-reduce the given term.",
  null,
  [],
  function (term) {
    return "wip";
  });*/
question_data[26] = new Question("Attempt to fully beta-reduce the given term using the applicative-order\n"+
"strategy, stopping once the term no longer changes.",
  [TermAppH, [TermAbs, [TermVar, "a"], [TermAbs, [TermVar, "b"], [TermVar, "b"]]], [TermAppV,
   [TermAbs, [TermVar, "x"], [TermAppH, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermAppH, [TermVar, "x"], [TermVar, "x"]]]],
   [TermAbs, [TermVar, "x"], [TermAppH, [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "y"], [TermVar, "y"]]], [TermVar, "x"]]]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "@0"], [TermAbs, [TermVar, "@1"], [TermVar, "@1"]]], [TermApp,
      [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]],
      [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]]]])) return "";
    else if (term.isMatchAlpha([TermAppH, [TermAbs, [TermVar, "a"], [TermAbs, [TermVar, "b"], [TermVar, "b"]]], [TermAppV,
      [TermAbs, [TermVar, "x"], [TermAppH, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermAppH, [TermVar, "x"], [TermVar, "x"]]]],
      [TermAbs, [TermVar, "x"], [TermAppH, [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "y"], [TermVar, "y"]]], [TermVar, "x"]]]]]) ||
      term.isMatchAlpha([TermAppH, [TermAbs, [TermVar, "a"], [TermAbs, [TermVar, "b"], [TermVar, "b"]]], [TermAppV,
      [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]],
      [TermAbs, [TermVar, "x"], [TermAppH, [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "y"], [TermVar, "y"]]], [TermVar, "x"]]]]]) ||
      term.isMatchAlpha([TermAppH, [TermAbs, [TermVar, "a"], [TermAbs, [TermVar, "b"], [TermVar, "b"]]], [TermAppV,
      [TermAbs, [TermVar, "x"], [TermAppH, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermAppH, [TermVar, "x"], [TermVar, "x"]]]],
      [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]]]]))
      return "Make sure that further reducing your\nanswer still gives the same term.";
    else if (term.isMatchAlpha([TermAbs, [TermVar, "b"], [TermVar, "b"]])) return "Make sure you use the applicative-order strategy.";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });

/*TODOquestion_data[27] = new Question("Construct a term that fully beta-reduce in exactly 2 steps.",
  null,
  [],
  function (term) {
    return "wip";
  });*/
/*TODOquestion_data[28] = new Question("Construct a term that fully beta-reduces in\n"+
"exactly 4 steps, using less than 4 abstraction blocks.",
  null,
  [],
  function (term) {
    return "wip";
  });*/
/*TODOquestion_data[29] = new Question("Construct a term that fully beta-reduces in\n"+
"exactly 4 steps, using more than 4 abstraction blocks.",
  null,
  [],
  function (term) {
    return "wip";
  });*/

}
