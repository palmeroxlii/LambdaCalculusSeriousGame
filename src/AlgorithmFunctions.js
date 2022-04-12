let algorithm_spec = [
  [" Beta reduction \n Normal-order strategy ", betaPrecomp, betaNorm,
  "Beta-reducing the term using the normal-order (leftmost-outermost) strategy."],
  [" Beta reduction \n Applicative-order strategy ", betaPrecomp, betaAppl,
  "Beta-reducing the term using the applicative-order (leftmost-innermost) strategy."]];

// Some general functions shared by the algorithms.

function expandMacrosCount(term) {
  if (term instanceof MacroUse) {
    term.highlighted = true;
    return 1;
  }
  let macro_count = 0;
  for (let slot of term.slots) {
    macro_count += expandMacrosCount(slot);
  }
  return macro_count;
}

function redexCheckNorm(term) {
  if (term instanceof TermApp) {
    if (term.slots[0] instanceof TermAbs && term.slotPath([0, 0]) instanceof TermVar) {
      term.highlighted = true;
      term.slots[0].highlighted = true;
      return [];
    }
    let tmp = redexCheckNorm(term.slots[0]);
    if (tmp !== null) {tmp.push(0); return tmp;}
    tmp = redexCheckNorm(term.slots[1]);
    if (tmp !== null) {tmp.push(1); return tmp;}
    return null;
  } else if (term instanceof TermAbs || term instanceof MacroDef) {
    let tmp = redexCheckNorm(term.slots[1]);
    if (tmp !== null) {tmp.push(1); return tmp;}
    return null;
  } else return null;
}

function redexCheckAppl(term) {
  if (term instanceof TermApp) {
    let tmp = redexCheckAppl(term.slots[0]);
    if (tmp !== null) {tmp.push(0); return tmp;}
    tmp = redexCheckAppl(term.slots[1]);
    if (tmp !== null) {tmp.push(1); return tmp;}
    if (term.slots[0] instanceof TermAbs && term.slotPath([0, 0]) instanceof TermVar) {
      term.highlighted = true;
      term.slots[0].highlighted = true;
      return [];
    }
    return null;
  } else if (term instanceof TermAbs || term instanceof MacroDef) {
    let tmp = redexCheckAppl(term.slots[1]);
    if (tmp !== null) {tmp.push(1); return tmp;}
    return null;
  } else return null;
}

function redexSubstitute(term, argument, variable) {
  if (term instanceof TermVar) {
    if (term.text === variable) return argument.copyBlock();
    else return term;
  } else if (term instanceof TermAbs) {
    if (term.slots[0] instanceof TermVar && term.slots[0].text === variable) return term;
    else {
      term.slots[1] = redexSubstitute(term.slots[1], argument, variable);
      return term;
    }
  } else if (term instanceof TermApp) {
    term.slots[0] = redexSubstitute(term.slots[0], argument, variable);
    term.slots[1] = redexSubstitute(term.slots[1], argument, variable);
    return term;
  }
  return term;
}

function renameCheck(vars_arg, vars_fun) {
  var clash = [];
  for (let v of vars_fun) {
    if (vars_arg.indexOf(v) > -1) clash.push(v);
  }
  return clash;
}

function renameSearchBinders(term) {
  if (term instanceof TermApp) {
    let a = renameSearchBinders(term.slots[0]), b = renameSearchBinders(term.slots[1]);
    let ab = a.concat(b);
    return ab.filter((i,p)=>ab.indexOf(i)===p);
  } else if (term instanceof TermAbs) {
    if (term.slots[0] instanceof TermVar) {
      let a = renameSearchBinders(term.slots[1]).concat([term.slots[0].text]);
      return a.filter((i,p)=>a.indexOf(i)===p);
    } else return renameSearchBinders(term.slots[1]);
  }
  return [];
}

function renameSearchFrees(term, bound_vars) {
  if (term instanceof TermVar) {
    if (bound_vars.indexOf(term.text) === -1) return [term.text];
  } else if (term instanceof TermApp) {
    let a = renameSearchFrees(term.slots[0], bound_vars), b = renameSearchFrees(term.slots[1], bound_vars);
    let ab = a.concat(b);
    return ab.filter((i,p)=>ab.indexOf(i)===p);
  } else if (term instanceof TermAbs) {
    if (term.slots[0] instanceof TermVar) {
      let a = bound_vars.concat([term.slots[0].text]);
      return renameSearchFrees(term.slots[1], a.filter((i,p)=>a.indexOf(i)===p));
    } else return renameSearchFrees(term.slots[1], bound_vars);
  }
  return [];
}

function renameVars(term_old, term_new, rename_from, rename_active, rename_to) {
  if (term_old instanceof TermApp) {
    renameVars(term_old.slots[0], term_new.slots[0], rename_from, rename_active, rename_to);
    renameVars(term_old.slots[1], term_new.slots[1], rename_from, rename_active, rename_to);
  } else if (term_old instanceof TermAbs) {
    if (term_old.slots[0] instanceof TermVar && rename_from.indexOf(term_old.slots[0].text) !== -1
      && rename_active.indexOf(term_old.slots[0].text) === -1) rename_active = rename_active.concat([term_old.slots[0].text]);
    renameVars(term_old.slots[0], term_new.slots[0], rename_from, rename_active, rename_to);
    renameVars(term_old.slots[1], term_new.slots[1], rename_from, rename_active, rename_to);
  } else if (term_old instanceof TermVar && rename_from.indexOf(term_old.text) !== -1 && rename_active.indexOf(term_old.text) !== -1) {
    term_old.highlighted = true;
    term_new.text = rename_to[rename_from.indexOf(term_old.text)];
  }
}

// The meat of each individual algorithm.

function expandMacros(term, slides, state) {
  let macro_count = expandMacrosCount(term instanceof MacroDef?term.slots[1]:term);
  if (macro_count !== 0) {
    slides.push([term, "Start by expanding any macros."]);
    let expanded = term.expandMacros();
    slides.push([expanded[0],
      expanded[1]?"Any macros are now expanded.":expanded[2].replace("\n", " ")]);
    return [expanded[0].copyBlock(), !expanded[1]];
  }
  return [term, false];
}

function noPrecomp(term, slides, state) {
  return [term, false];
}

function betaPrecomp(term, slides, state) {
  state.rename_id = 0;
  state.step_num = 0;
  return [term, false];
}

function betaNorm(term, slides, state) {
  return betaReduce(term, slides, state, redexCheckNorm);
}
function betaAppl(term, slides, state) {
  return betaReduce(term, slides, state, redexCheckAppl);
}

function betaReduce(term, slides, state, strategy) {
  // Identify the redex.
  let redex_path = strategy(term);
  if (redex_path === null) {
    slides.push([term, "The term does not contain any "+(state.step_num===0?"":"more ")+"redexes, so it is fully beta-reduced."]);
    return [term, true];
  }
  slides.push([term, "This is the "+(state.step_num===0?"first":"next")+" redex to be reduced."]);
  state.step_num++;
  // Check if variable renaming is needed.
  term = term.copyBlock();
  let redex = term;
  let path = redex_path.slice();
  while (path.length > 0) {
    redex = redex.slots[path.pop()];
  }
  let vars_arg = renameSearchFrees(redex.slots[1], []), vars_fun = renameSearchBinders(redex.slots[0]);
  let rename_from = renameCheck(vars_arg, vars_fun);
  if (rename_from.length > 0) {
    // Highlight the old term's variables, and rename the new term's variables.
    let term_old = term.copyBlock();
    let redex_old = term_old;
    path = redex_path.slice();
    while (path.length > 0) {
      redex_old = redex_old.slots[path.pop()];
    }
    let rename_to = [];
    for (let i of rename_from) {
      rename_to.push("$"+(state.rename_id++));
    }
    renameVars(redex_old.slots[0], redex.slots[0], rename_from, [], rename_to);
    slides.push([term_old, "Some renaming may be needed to avoid variable capture."]);
    slides.push([term, "Any potentially problematic variable binders have been renamed."]);
    term = term.copyBlock();
  }
  // Now perform the reduction step.
  redex = term;
  path = redex_path.slice();
  while (path.length > 0) {
    redex = redex.slots[path.pop()];
  }
  redex.highlighted = true;
  redex.slots[0].highlighted = true;
  slides.push([term, (rename_from.length > 0)?"Now reduce the redex.":"No variable renaming is needed, so just reduce the redex."]);
  term = term.copyBlock();
  if (redex_path.length === 0) {
    // The entire term is the redex.
    let vari = term.slotPath([0,0]).text;
    let func = term.slotPath([0,1]);
    let argu = term.slots[1];
    term = redexSubstitute(func, argu, vari);
  } else {
    // The redex is within the term.
    let parent = term;
    path = redex_path.slice();
    while (path.length > 1) {
      parent = parent.slots[path.pop()];
    }
    redex = parent.slots[path[0]];
    let vari = redex.slotPath([0,0]).text;
    let func = redex.slotPath([0,1]);
    let argu = redex.slots[1];
    parent.slots[path[0]] = redexSubstitute(func, argu, vari);
  }
  slides.push([term, "The redex has now been reduced."]);
  return [term.copyBlock(), false];
}
