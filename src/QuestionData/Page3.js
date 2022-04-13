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
question_data[31] = new Question("Construct a term for the \"NOT\" macro such that\nthe \"NOT\" macro reduces as described below.",
  [MacroUse, "NOT"],
  [[[MacroDef, [MacroUse, "NOT"], null], 675, 150],
   [[MacroDef, [MacroUse, "TRUE"], [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]]], 125, 275],
   [[MacroDef, [MacroUse, "FALSE"], [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]]], 125, 375],
   [[MacroDef, [MacroUse, "IFELSE"], [TermAbs, [TermVar, "b"], [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"],
    [TermAppH, [TermAppH, [TermVar, "b"], [TermVar, "x"]], [TermVar, "y"]]]]]], 75, 125],
   [[MacroDef, [MacroUse, "NOT FALSE"], [MacroUse, "TRUE"]], 775, 275],
   [[MacroDef, [MacroUse, "NOT TRUE"], [MacroUse, "FALSE"]], 775, 375]],
  function (term) {
    let ans = canvas.searchMacro("ANS")[0];
    if (ans.isMatchExact([MacroUse, "NOT"])) {
      let str = Algorithm.verify(term, [0],
        [TermAppH, null, [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]], "NOT FALSE");
      if (str !== "") return str;
      str = Algorithm.verify(term, [0],
        [TermAppH, null, [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]], "NOT TRUE");
      return str;
    } else return "Please do not alter the \"ANS\" macro.";
  });
question_data[32] = new Question("Construct a term for the \"OR\" macro such that\nthe \"OR\" macro reduces as described below.",
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

question_data[33] = new Question("Construct terms for the \"0\", \"1\" and \"2\" macros such\n"+
"that the \"SUCC\" macro reduces as described below.",
  [TermAppV, [TermAppV, [MacroUse, "0"], [MacroUse, "1"]], [MacroUse, "2"]],
  [[[MacroDef, [MacroUse, "0"], null], 125, 275], [[MacroDef, [MacroUse, "1"], null], 125, 350], [[MacroDef, [MacroUse, "2"], null], 125, 425],
   [[MacroDef, [MacroUse, "SUCC"], [TermAbs, [TermVar, "n"], [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"],
    [TermAppH, [TermVar, "f"], [TermAppH, [TermAppH, [TermVar, "n"], [TermVar, "f"]], [TermVar, "x"]]]]]]], 75, 125],
   [[MacroDef, [MacroUse, "SUCC 0"], [MacroUse, "1"]], 725, 120],
   [[MacroDef, [MacroUse, "SUCC 1"], [MacroUse, "2"]], 725, 190]],
  function (term) {
    let ans = canvas.searchMacro("ANS")[0];
    if (ans.isMatchExact([TermAppV, [TermAppV, [MacroUse, "0"], [MacroUse, "1"]], [MacroUse, "2"]])) {
      let str = Algorithm.verify(term.slotPath([0, 0]), [1],
        [TermAppH, [TermAbs, [TermVar, "n"], [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"],
        [TermAppH, [TermVar, "f"], [TermAppH, [TermAppH, [TermVar, "n"], [TermVar, "f"]], [TermVar, "x"]]]]]], null],
        mode.blockDeconstruct(term.slotPath([0, 1])), "SUCC 0");
      if (str !== "") return str;
      str = Algorithm.verify(term.slotPath([0, 1]), [1],
        [TermAppH, [TermAbs, [TermVar, "n"], [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"],
        [TermAppH, [TermVar, "f"], [TermAppH, [TermAppH, [TermVar, "n"], [TermVar, "f"]], [TermVar, "x"]]]]]], null],
        mode.blockDeconstruct(term.slots[1]), "SUCC 1");
      return str;
    } else return "Please do not alter the \"ANS\" macro.";
  });
question_data[34] = new Question("Construct a term for the \"ISZERO\" macro such that\nthe \"ISZERO\" macro reduces as described below.",
  [MacroUse, "ISZERO"],
  [[[MacroDef, [MacroUse, "ISZERO"], null], 825, 150],
   [[MacroDef, [MacroUse, "0"], [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermVar, "x"]]]], 125, 265],
   [[MacroDef, [MacroUse, "1"], [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]], 125, 340],
   [[MacroDef, [MacroUse, "2"], [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"],
    [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]]], 125, 425],
   [[MacroDef, [MacroUse, "TRUE"], [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]]], 75, 125],
   [[MacroDef, [MacroUse, "FALSE"], [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]]], 425, 125],
   [[MacroDef, [MacroUse, "ISZERO 0"], [MacroUse, "TRUE"]], 825, 275],
   [[MacroDef, [MacroUse, "ISZERO 1"], [MacroUse, "FALSE"]], 825, 350],
   [[MacroDef, [MacroUse, "ISZERO 2"], [MacroUse, "FALSE"]], 825, 425]],
  function (term) {
    let ans = canvas.searchMacro("ANS")[0];
    if (ans.isMatchExact([MacroUse, "ISZERO"])) {
      let str = Algorithm.verify(term, [0],
        [TermAppH, null, [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermVar, "x"]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "x"]]], "ISZERO 0");
      if (str !== "") return str;
      str = Algorithm.verify(term, [0],
        [TermAppH, null, [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]], "ISZERO 1");
      if (str !== "") return str;
      str = Algorithm.verify(term, [0],
        [TermAppH, null, [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"],
        [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]]],
        [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermVar, "y"]]], "ISZERO 2");
      return str;
    } else return "Please do not alter the \"ANS\" macro.";
  });
question_data[35] = new Question("Construct a term for the \"ADD\" macro such that\nthe \"ADD\" macro reduces as described below.",
  [MacroUse, "ADD"],
  [[[MacroDef, [MacroUse, "ADD"], null], 825, 150],
   [[MacroDef, [MacroUse, "0"], [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermVar, "x"]]]], 125, 265],
   [[MacroDef, [MacroUse, "1"], [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]], 125, 340],
   [[MacroDef, [MacroUse, "2"], [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"],
    [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]]], 125, 425],
   [[MacroDef, [MacroUse, "SUCC"], [TermAbs, [TermVar, "n"], [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"],
    [TermAppH, [TermVar, "f"], [TermAppH, [TermAppH, [TermVar, "n"], [TermVar, "f"]], [TermVar, "x"]]]]]]], 75, 125],
   [[MacroDef, [MacroUse, "ADD 0 0"], [MacroUse, "0"]], 775, 275],
   [[MacroDef, [MacroUse, "ADD 0 1"], [MacroUse, "1"]], 775, 330],
   [[MacroDef, [MacroUse, "ADD 1 1"], [MacroUse, "2"]], 775, 385],
   [[MacroDef, [MacroUse, "ADD 2 0"], [MacroUse, "2"]], 775, 440]],
  function (term) {
    let ans = canvas.searchMacro("ANS")[0];
    if (ans.isMatchExact([MacroUse, "ADD"])) {
      let str = Algorithm.verify(term, [0, 0],
        [TermAppH, [TermAppH, null, [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermVar, "x"]]]],
        [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermVar, "x"]]]],
        [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermVar, "x"]]], "ADD 0 0");
      if (str !== "") return str;
      str = Algorithm.verify(term, [0, 0],
        [TermAppH, [TermAppH, null, [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermVar, "x"]]]],
        [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]],
        [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"], [TermVar, "x"]]]], "ADD 0 1");
      if (str !== "") return str;
      str = Algorithm.verify(term, [0, 0],
        [TermAppH, [TermAppH, null, [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]],
        [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]],
        [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"],
        [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]], "ADD 1 1");
      if (str !== "") return str;
      str = Algorithm.verify(term, [0, 0],
        [TermAppH, [TermAppH, null, [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"],
        [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]]],
        [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermVar, "x"]]]],
        [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"],
        [TermAppH, [TermVar, "f"], [TermVar, "x"]]]]], "ADD 2 0");
      return str;
    } else return "Please do not alter the \"ANS\" macro.";
  });

question_data[36] = Question.MCQ("Which Boolean operation does the \"OP\" macro represent?",
  [[[MacroDef, [MacroUse, "OP"], [TermAbs, [TermVar, "p"], [TermAbs, [TermVar, "q"],
   [TermAppH, [TermAppH, [TermAppH, [MacroUse, "IFELSE"], [TermVar, "p"]], [TermVar, "q"]], [MacroUse, "TRUE"]]]]], 75, 125]],
  [["p OR q", "p AND q", "NOT q", "p XOR q"], ["p → q", "p NOR q", "p NAND q", "p ≡ q"]], 4,
  "Double check what result \"OP\" gives for each set of\ninput values, and compare this to each operation.");
question_data[37] = Question.MCQ("Which mathematical operation does the \"OP\" macro represent?",
  [[[MacroDef, [MacroUse, "OP"], [TermAbs, [TermVar, "p"], [TermAbs, [TermVar, "q"], [TermAbs, [TermVar, "f"], [TermAbs, [TermVar, "x"],
   [TermAppH, [TermAppH, [TermVar, "p"], [TermAppH, [TermVar, "q"], [TermVar, "f"]]], [TermVar, "x"]]]]]]], 75, 125]],
  [["p * q", "p - q", "p / q", "|p| + |q|", "p ^ q"]], 0,
  "Double check what result \"OP\" gives for a range of\ninput values, and compare this to each operation.");
question_data[38] = new Question("Convert the recursive \"FACT\" macro\ninto a properly defined lambda term.",
  [MacroUse, "FACT"],
  [[[MacroDef, [MacroUse, "FACT"], [TermAbs, [TermVar, "n"], [TermAppH, [TermAppH, [TermAppH, [MacroUse, "IFELSE"], [TermAppH,
    [MacroUse, "ISZERO"], [TermVar, "n"]]], [MacroUse, "1"]], [TermAppH, [TermAppH, [MacroUse, "MULT"], [TermVar, "n"]], [TermAppH,
    [MacroUse, "FACT"], [TermAppH, [MacroUse, "PRED"], [TermVar, "n"]]]]]]], 75, 125],
   [[MacroDef, [MacroUse, "IFELSE"], [TermVar, "IFELSE"]], 0, -200],
   [[MacroDef, [MacroUse, "ISZERO"], [TermVar, "ISZERO"]], 0, -200],
   [[MacroDef, [MacroUse, "1"], [TermVar, "1"]], 0, -200],
   [[MacroDef, [MacroUse, "MULT"], [TermVar, "MULT"]], 0, -200],
   [[MacroDef, [MacroUse, "PRED"], [TermVar, "PRED"]], 0, -200],
   [[MacroDef, [MacroUse, "Y"], [TermAbs, [TermVar, "f"], [TermAppH, [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"],
    [TermAppH, [TermVar, "x"], [TermVar, "x"]]]], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "f"], [TermAppH,
    [TermVar, "x"], [TermVar, "x"]]]]]]], 75, 375]],
  function (term) {
    if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "f"], [TermApp, [TermAbs, [TermVar, "x"], [TermApp,
      [TermVar, "f"], [TermApp, [TermVar, "x"], [TermVar, "x"]]]], [TermAbs, [TermVar, "x"], [TermApp, [TermVar, "f"], [TermApp,
      [TermVar, "x"], [TermVar, "x"]]]]]], [TermAbs, [TermVar, "F"], [TermAbs, [TermVar, "n"], [TermApp, [TermApp, [TermApp, [TermVar,
      "IFELSE"], [TermApp, [TermVar, "ISZERO"], [TermVar, "n"]]], [TermVar, "1"]], [TermApp, [TermApp, [TermVar, "MULT"], [TermVar, "n"]],
      [TermApp, [TermVar, "F"], [TermApp, [TermVar, "PRED"], [TermVar, "n"]]]]]]]])) return "";
    else return "Double check that your answer matches\nwhat the question asks for.";
  });

}
