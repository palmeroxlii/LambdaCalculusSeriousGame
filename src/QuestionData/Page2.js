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
question_data[16] = new Question("Perform one beta-reduction step on the given term.",
  [TermAbs, [TermVar, "x"], [TermAppH, [TermAbs, [TermVar, "y"], [TermAppH,
    [TermVar, "y"], [TermAbs, [TermVar, "z"], [TermVar, "z"]]]], [TermVar, "x"]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermAbs, [TermVar, "z"], [TermVar, "z"]]]])) return "";
    else if (term.isMatchAlpha([TermAbs, [TermVar, "x"], [TermApp, [TermAbs, [TermVar, "y"], [TermApp,
      [TermVar, "y"], [TermAbs, [TermVar, "z"], [TermVar, "z"]]]], [TermVar, "x"]]]))
      return "Perform a beta-reduction step on the term."
    else return "Double check that your answer matches\nwhat the question asks for.";
  });
question_data[17] = new Question("Perform one beta-reduction step on the given\nterm using the normal-order strategy.",
  [TermAppH, [TermAbs, [TermVar, "x"], [TermVar, "y"]], [TermAppH, [TermAbs, [TermVar, "z"], [TermVar, "z"]], [TermVar, "w"]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermVar, "y"])) return "";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermVar, "y"]], [TermVar, "w"]]))
      return "Double check which redex is reduced\nfirst in the normal-order strategy.";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermVar, "y"]], [TermApp, [TermAbs, [TermVar, "z"], [TermVar, "z"]],
      [TermVar, "w"]]])) return "Perform a beta-reduction step on the term.";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });

question_data[18] = new Question("Perform one beta-reduction step on the given\nterm using the normal-order strategy.",
  [TermAppH, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "x"]]],
    [TermAppH, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermApp, [TermApp, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]],
      [TermApp, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]]])) return "";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]], [TermVar, "z"]]))
      return "Double check which redex is reduced\nfirst in the normal-order strategy.";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]],
      [TermApp, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]]])) return "Perform a beta-reduction step on the term.";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });
question_data[19] = new Question("Perform one beta-reduction step on the given\nterm using the applicative-order strategy.",
  [TermAppH, [TermAbs, [TermVar, "x"], [TermVar, "y"]], [TermAppH, [TermAbs, [TermVar, "z"], [TermVar, "z"]], [TermVar, "w"]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermVar, "y"])) return "Double check which redex is reduced\nfirst in the applicative-order strategy.";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermVar, "y"]], [TermVar, "w"]]))
      return "";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermVar, "y"]], [TermApp, [TermAbs, [TermVar, "z"], [TermVar, "z"]],
      [TermVar, "w"]]])) return "Perform a beta-reduction step on the term.";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });
question_data[20] = new Question("Perform one beta-reduction step on the given\nterm using the applicative-order strategy.",
  [TermAppH, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "x"]]],
    [TermAppH, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermApp, [TermApp, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]],
      [TermApp, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]]]))
      return "Double check which redex is reduced\nfirst in the applicative-order strategy.";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]], [TermVar, "z"]])) return "";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]],
      [TermApp, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]]])) return "Perform a beta-reduction step on the term.";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });

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
question_data[22] = new Question("Fully beta-reduce the given term.",
  [TermAppH, [TermAppH, [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]], [TermAppH, [TermAbs, [TermVar, "x"],
    [TermAppH, [TermVar, "x"], [TermVar, "x"]]], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "x"]]]]], [TermAbs,
    [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "x"]]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]])) return "";
    else if (term.isMatchAlpha([TermApp, [TermApp, [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]], [TermApp,
      [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]], [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"],
      [TermVar, "x"]]]]], [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]]]))
      return "If the applicative-order strategy causes\nyou to enter an infinite loop, try using\nthe normal-order strategy instead.";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"],
      [TermVar, "x"]]]])) return "Make sure that your answer is fully reduced\n(i.e. does not contain any more redexes).";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });
question_data[23] = new Question("Fully beta-reduce the given term.",
  [TermAppH, [TermAppH, [TermVar, "x"], [TermAbs, [TermVar, "a"], [TermVar, "a"]]], [TermVar, "x"]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermApp, [TermApp, [TermVar, "x"], [TermAbs, [TermVar, "@0"], [TermVar, "@0"]]], [TermVar, "x"]])) return "";
    else if (term.isMatchAlpha([TermApp, [TermVar, "x"], [TermVar, "x"]]))
      return "Double check whether the subterm\nyou reduced is an actual redex.";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });

question_data[24] = new Question("Fully beta-reduce the given term.",
  [TermAppH, [TermAbs, [TermVar, "x"], [TermVar, "y"]], [TermAppH, [TermAbs, [TermVar, "z"], [TermVar, "z"]], [TermVar, "w"]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermVar, "y"])) return "";
    else if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermVar, "y"]], [TermVar, "w"]]) ||
      term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermVar, "y"]], [TermApp, [TermAbs, [TermVar, "z"], [TermVar, "z"]],
      [TermVar, "w"]]])) return "Make sure that your answer is fully reduced\n(i.e. does not contain any more redexes).";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });
question_data[25] = new Question("Fully beta-reduce the given term.",
  [TermAppH, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"], [TermVar, "x"]]],
    [TermAppH, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]]],
  [],
  function (term) {
    if (term.isMatchAlpha([TermApp, [TermVar, "z"], [TermVar, "z"]])) return "";
    else if (term.isMatchAlpha([TermApp, [TermApp, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]],
      [TermApp, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]]]) ||
      term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]], [TermVar, "z"]]) ||
      term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "x"], [TermVar, "x"]]],
      [TermApp, [TermAbs, [TermVar, "y"], [TermVar, "y"]], [TermVar, "z"]]]))
      return "Make sure that your answer is fully reduced\n(i.e. does not contain any more redexes).";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });
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

question_data[27] = new Question("Construct a term that fully beta-reduces (using\nthe normal-order strategy) in exactly 2 steps.",
  null,
  [],
  function (term) {
    let result = AlgorithmDisplay.runAlgorithm(term);
    if (!result[1]) return "Your term fully reduces in more than 10 steps.";
    else {
      let steps = result[2];
      if (steps === 0) return "Your term is already fully reduced\n(i.e. it fully reduces in 0 steps).";
      else if (steps < 2) return "Your term fully reduces in\n"+steps+(steps===1?" step":" steps")+", which is not enough.";
      else if (steps > 2) return "Your term fully reduces in\n"+steps+" steps, which is too many.";
      else return "";
    }
  });
question_data[28] = new Question("Construct a term that fully beta-reduces (using the normal-order\n"+
"strategy) in exactly 4 steps, using less than 4 abstraction blocks.",
  null,
  [],
  function (term) {
    let result = AlgorithmDisplay.runAlgorithm(term);
    if (!result[1]) return "Your term fully reduces in more than 10 steps.";
    else {
      let steps = result[2];
      if (steps === 0) return "Your term is already fully reduced\n(i.e. it fully reduces in 0 steps).";
      else if (steps < 4) return "Your term fully reduces in\n"+steps+" step"+(steps===1?"":"s")+", which is not enough.";
      else if (steps > 4) return "Your term fully reduces in\n"+steps+" steps, which is too many.";
      else {
        let count = term.countSubterms([TermAbs, null, null]);
        if (count < 4) return "";
        else return "Your term contains "+count+" abstraction blocks,\nwhich is too many. Try taking advantage of\n"+
          "a reduction that duplicates part of the term.";
      }
    }
  });
question_data[29] = new Question("Construct a term that fully beta-reduces (using the normal-order\n"+
"strategy) in exactly 4 steps, using more than 4 abstraction blocks.",
  null,
  [],
  function (term) {
    let result = AlgorithmDisplay.runAlgorithm(term);
    if (!result[1]) return "Your term fully reduces in more than 10 steps.";
    else {
      let steps = result[2];
      if (steps === 0) return "Your term is already fully reduced\n(i.e. it fully reduces in 0 steps).";
      else if (steps < 4) return "Your term fully reduces in\n"+steps+" step"+(steps===1?"":"s")+", which is not enough.";
      else if (steps > 4) return "Your term fully reduces in\n"+steps+" steps, which is too many.";
      else {
        let count = term.countSubterms([TermAbs, null, null]);
        if (count > 4) return "";
        else return "Your term contains "+count+" abstraction block"+(count===1?"":"s")+",\nwhich is not enough. Try taking advantage of\n"+
          "a reduction that destroys part of the term.";
      }
    }
  });

}
