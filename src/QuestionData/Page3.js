function qpage3() {

question_data[30] = new Question("Construct terms for the \"TRUE\" and \"FALSE\" macros\n"+
"such that the \"IFELSE\" macro reduces as described below.",
  [TermAppV, [MacroUse, "TRUE"], [MacroUse, "FALSE"]],
  [[[MacroDef, [MacroUse, "TRUE"], null], 125, 275], [[MacroDef, [MacroUse, "FALSE"], null], 125, 375],
   [[MacroDef, [MacroUse, "IFELSE"], [TermAbs, [TermVar, "b"], [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"],
    [TermAppH, [TermAppH, [TermVar, "b"], [TermVar, "x"]], [TermVar, "y"]]]]]], 75, 125],
   [[MacroDef, [MacroUse, "IFELSE TRUE m n"], [TermVar, "m"]], 675, 120],
   [[MacroDef, [MacroUse, "IFELSE FALSE m n"], [TermVar, "n"]], 675, 180]],
  function (term) {
    let ans = canvas.searchMacro("ANS")[0];
    if (ans.isMatchExact([TermAppV, [MacroUse, "TRUE"], [MacroUse, "FALSE"]])) {
      let str = Algorithm.verify(term.slots[0], [0, 0, 1],
        [TermAppH, [TermAppH, [TermAppV, [TermAbs, [TermVar, "b"], [TermAbs, [TermVar, "x"], [TermAbs,
        [TermVar, "y"], [TermAppH, [TermAppH, [TermVar, "b"], [TermVar, "x"]], [TermVar, "y"]]]]], null], [TermVar, "m"]], [TermVar, "n"]],
        [TermVar, "m"], "IFELSE TRUE m n");
      if (str !== "") return str;
      str = Algorithm.verify(term.slots[1], [0, 0, 1],
        [TermAppH, [TermAppH, [TermAppV, [TermAbs, [TermVar, "b"], [TermAbs, [TermVar, "x"], [TermAbs,
        [TermVar, "y"], [TermAppH, [TermAppH, [TermVar, "b"], [TermVar, "x"]], [TermVar, "y"]]]]], null], [TermVar, "m"]], [TermVar, "n"]],
        [TermVar, "n"], "IFELSE FALSE m n");
      return str;
    } else return "Please do not alter the \"ANS\" macro.";
  });
question_data[31] = new Question("Construct a term for the \"OR\" macro such that\nthe \"OR\" macro reduces as described below.",
  [MacroUse, "OR"],
  [[[MacroDef, [MacroUse, "OR"], null], 675, 150],
   [[MacroDef, [MacroUse, "TRUE"], [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]]], 125, 275],
   [[MacroDef, [MacroUse, "FALSE"], [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]]], 125, 375],
   [[MacroDef, [MacroUse, "IFELSE"], [TermAbs, [TermVar, "b"], [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"],
    [TermAppH, [TermAppH, [TermVar, "b"], [TermVar, "x"]], [TermVar, "y"]]]]]], 75, 125],
   [[MacroDef, [MacroUse, "OR FALSE FALSE"], [MacroUse, "FALSE"]], 775, 275],
   [[MacroDef, [MacroUse, "OR TRUE FALSE"], [MacroUse, "TRUE"]], 775, 330],
   [[MacroDef, [MacroUse, "OR FALSE TRUE"], [MacroUse, "TRUE"]], 775, 385],
   [[MacroDef, [MacroUse, "OR TRUE TRUE"], [MacroUse, "TRUE"]], 775, 440]],
  function (term) {
    let ans = canvas.searchMacro("ANS")[0];
    if (ans.isMatchExact([MacroUse, "OR"])) {
      let str = Algorithm.verify(term, [0, 0],
        [TermAppH, [TermAppH, null, [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]], "OR FALSE FALSE");
      if (str !== "") return str;
      str = Algorithm.verify(term, [0, 0],
        [TermAppH, [TermAppH, null, [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]], "OR TRUE FALSE");
      if (str !== "") return str;
      str = Algorithm.verify(term, [0, 0],
        [TermAppH, [TermAppH, null, [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]], "OR FALSE TRUE");
      if (str !== "") return str;
      str = Algorithm.verify(term, [0, 0],
        [TermAppH, [TermAppH, null, [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]], "OR TRUE TRUE");
      return str;
    } else return "Please do not alter the \"ANS\" macro.";
  });
question_data[32] = new Question("(dummy)",
  null,
  [],
  function (term) {
    return "wip";
  });

question_data[33] = new Question("(dummy)",
  null,
  [],
  function (term) {
    return "wip";
  });
question_data[34] = new Question("(dummy)",
  null,
  [],
  function (term) {
    return "wip";
  });
question_data[35] = new Question("(dummy)",
  null,
  [],
  function (term) {
    return "wip";
  });

question_data[36] = new Question("(dummy)",
  null,
  [],
  function (term) {
    return "wip";
  });
question_data[37] = new Question("(dummy)",
  null,
  [],
  function (term) {
    return "wip";
  });
question_data[38] = new Question("(dummy)",
  null,
  [],
  function (term) {
    return "wip";
  });

}
