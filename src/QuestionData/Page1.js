function qpage1() {

question_data[0] = new Question("Fill in the three macros on the left with blocks of the correct type.",
  [TermAppV, [TermAppV, [MacroUse, "VARIABLE"], [MacroUse, "ABSTRACTION"]], [MacroUse, "APPLICATION"]],
  [[[MacroDef, [MacroUse, "VARIABLE"], null], 125, 175],
   [[MacroDef, [MacroUse, "ABSTRACTION"], null], 125, 275],
   [[MacroDef, [MacroUse, "APPLICATION"], null], 125, 375]],
  function (term) {
    if (term.isMatchShape([TermAppV, [TermAppV, null, null], null])) {
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

question_data[5] = new Question("Construct the term \"((λx.x)(λx.x))((λx.x)(λx.x))\",\nusing a macro to avoid repetition.",
  null,
  [],
  function(term) {
    if (term.isMatchExact([TermApp, [TermApp, [TermAbs, [TermVar, "x"], [TermVar, "x"]], [TermAbs, [TermVar, "x"], [TermVar, "x"]]],
                                    [TermApp, [TermAbs, [TermVar, "x"], [TermVar, "x"]], [TermAbs, [TermVar, "x"], [TermVar, "x"]]]])){
      let ans = canvas.searchMacro("ANS")[0];
      for (let block of canvas.blocks) {
        if (block instanceof MacroDef && block.slots[0] instanceof MacroUse
          && block.slots[0].text !== "ANS" && ans.countSubterms([MacroUse, block.slots[0].text]) !== 0) return "";
      }
      return "Your answer matches the term given in the\nquestion, but does not use a macro.\nTry using \"F:=λx.x\" to simplify your answer.";
    } else {
      let count = term.countSubterms([TermAbs, [TermVar, "x"], [TermVar, "x"]]);
      if (count === 4) return "Double check that the \"λx.x\" subterms\nare applied in the correct way.";
      else if (count > 4) return "There are too many \"λx.x\" subterms.";
      else if (count > 0) return "There are not enough \"λx.x\" subterms.";
      return "Double check that your answer matches\nthe term given in the question.";
    }
  });

question_data[6] = new Question("Rename the \"x\" variable in the given term to a different variable.",
  [TermAbs, [TermVar, "x"], [TermVar, "x"]],
  [],
  function(term) {
    let renamings = {};
    if (term.isMatchAlpha([TermAbs, [TermVar, "@0"], [TermVar, "@0"]], renamings)) {
      if (renamings["@0"] === "x") return "Technically, renaming \"x\" to \"x\" itself is a valid\noption. However, try renaming it to \"y\" instead.";
      else return "";
    } else if (term.isMatchShape([TermAbs, [TermVar, "@0"], [TermVar, "@0"]])) {
      if (term.slots[0].text === "x") return "Remember to rename the binder\nas well as any bound variables.";
      else if (term.slots[1].text === "x") return "Remember to rename any bound\nvariables as well as the binder.";
      else return "Remember to rename the binder and any\nbound variables to the same new variable.";
    } else return "Double check that your answer matches\nwhat the question asks for.";
  });

question_data[7] = new Question("Rename the \"x\" and \"y\" variables to two different variables.",
  [TermAppV, [TermAbs, [TermVar, "x"], [TermVar, "x"]], [TermAbs, [TermVar, "y"], [TermVar, "y"]]],
  [],
  function(term) {
    let renamings = {};
    if (term.isMatchAlpha([TermApp, [TermAbs, [TermVar, "@0"], [TermVar, "@0"]],
      [TermAbs, [TermVar, "@1"], [TermVar, "@1"]]], renamings)) {
      if (renamings["@0"] === "x") return "Rename \"x\" to a different variable.";
      else if (renamings["@1"] === "y") return "Rename \"y\" to a different variable.";
      else if (renamings["@0"] === renamings["@1"]) return "Rename \"x\" and \"y\" to two different variables.";
      else return "";
    } else if (term.isMatchShape([TermApp, [TermAbs, [TermVar, "@0"], [TermVar, "@0"]], [TermAbs, [TermVar, "@1"], [TermVar, "@1"]]])) {
      if (term.slots[0].isMatchAlpha([TermAbs, [TermVar, "@0"], [TermVar, "@0"]])) {
        if (term.slots[1].slots[0].text === "y") return "Remember to rename the binder\nas well as any bound variables.";
        else if (term.slots[1].slots[1].text === "y") return "Remember to rename any bound\nvariables as well as the binder.";
        else return "Remember to rename the binder and any\nbound variables to the same new variable.";
      } else {
        if (term.slots[0].slots[0].text === "x") return "Remember to rename the binder\nas well as any bound variables.";
        else if (term.slots[0].slots[1].text === "x") return "Remember to rename any bound\nvariables as well as the binder.";
        else return "Remember to rename the binder and any\nbound variables to the same new variable.";
      }
    } else return "Double check that your answer matches\nwhat the question asks for.";
  });

question_data[8] = new Question("Rename all possible variables to different variables.",
  [TermAbs, [TermVar, "x"], [TermAbs, [TermVar, "y"], [TermAbs, [TermVar, "z"],
    [TermAppH, [TermAppV, [TermVar, "x"], [TermVar, "y"]], [TermAppV, [TermVar, "w"], [TermVar, "z"]]]]]],
  [],
  function(term) {
    let renamings = {};
    if (term.isMatchAlpha([TermAbs, [TermVar, "@0"], [TermAbs, [TermVar, "@1"], [TermAbs, [TermVar, "@2"],
      [TermAppH, [TermAppV, [TermVar, "@0"], [TermVar, "@1"]], [TermAppV, [TermVar, "w"], [TermVar, "@2"]]]]]], renamings)) {
      if (renamings["@0"] === "x") return "Rename \"x\" to a different variable.";
      else if (renamings["@1"] === "y") return "Rename \"y\" to a different variable.";
      else if (renamings["@2"] === "z") return "Rename \"z\" to a different variable.";
      else if (renamings["@0"] === renamings["@1"]) return "Rename \"x\" and \"y\" to two different variables.";
      else if (renamings["@0"] === renamings["@2"]) return "Rename \"x\" and \"z\" to two different variables.";
      else if (renamings["@1"] === renamings["@2"]) return "Rename \"y\" and \"z\" to two different variables.";
      else return "";
    } else if (term.isMatchShape([TermAbs, [TermVar, "@0"], [TermAbs, [TermVar, "@1"], [TermAbs, [TermVar, "@2"],
      [TermAppH, [TermAppV, [TermVar, "@0"], [TermVar, "@1"]], [TermAppV, [TermVar, "w"], [TermVar, "@2"]]]]]])) {
      if (term.slots[1].slots[1].slots[1].slots[1].slots[0].text !== "w") return "Remember that only bound variables\nare allowed to be renamed.";
      let x0 = term.slots[1].slots[1].slots[1].slots[0].slots[0].text, x1 = term.slots[0].text;
      let y0 = term.slots[1].slots[1].slots[1].slots[0].slots[1].text, y1 = term.slots[1].slots[0].text;
      let z0 = term.slots[1].slots[1].slots[1].slots[1].slots[1].text, z1 = term.slots[1].slots[1].slots[0].text;
      if (x0 !== x1) {
        if (x1 === "x") return "Remember to rename the binder\nas well as any bound variables.";
        else if (x0 === "x") return "Remember to rename any bound\nvariables as well as the binder.";
        else return "Remember to rename the binder and any\nbound variables to the same new variable.";
      } else if (y0 !== y1) {
        if (y1 === "y") return "Remember to rename the binder\nas well as any bound variables.";
        else if (y0 === "y") return "Remember to rename any bound\nvariables as well as the binder.";
        else return "Remember to rename the binder and any\nbound variables to the same new variable.";
      } else if (z0 !== z1) {
        if (z1 === "z") return "Remember to rename the binder\nas well as any bound variables.";
        else if (z0 === "z") return "Remember to rename any bound\nvariables as well as the binder.";
        else return "Remember to rename the binder and any\nbound variables to the same new variable.";
      } else return "Double check that your answer matches\nwhat the question asks for.";
    } else return "Double check that your answer matches\nwhat the question asks for.";
  });

question_data[9] = Question.MCQ("After renaming the \"x\" binder in \"F\", which\nother instance(s) of \"x\" should also be renamed?",
  null,
  [[[MacroDef, [MacroUse, "F"], [TermAppH, [TermVar, "x"], [TermAbs, [TermVar, "x"], [TermAppH, [TermVar, "x"],
                                [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "x"], [TermVar, "y"]]]]]]], 105, 120],
   [[MacroDef, [MacroUse, "G"], [TermAppH, [TermVar, "x"], [TermAbs, [TermVar, "z"], [TermAppH, [TermVar, "z"],
                                [TermAbs, [TermVar, "y"], [TermAppH, [TermVar, "x"], [TermVar, "y"]]]]]]], 610, 120]],
  ["Neither \"x\"", "The first \"x\"", "The second \"x\"", "Both \"x\""], 2,
  "Double check whether or not each\ninstance of \"x\" is bound to the binder.");

}
