# Lambda Calculus Serious Game

This game is intended to aid computer science students in learning lambda calculus.

## Starting the game
This game is intended to be played on a computer with a mouse and keyboard.
1. Download the files.
2. Open the `index.html` file in a web browser.
3. Select the `SANDBOX MODE` or `QUIZ MODE` button.

## Playing the game - Sandbox mode

This mode allows you to freely construct lambda terms using the block-based structure, by dragging blocks from the palette onto the canvas. To use different variables or macros, select the corresponding hamburger button on the palette and type the new name.

In addition, this mode allows you to apply the beta-reduction algorithm (using either the normal-order or applicative-order strategy) to your terms. It will give you a step-by-step explanation of the algorithm as it is applied to the term.

## Playing the game - Quiz mode

This mode allows you to test your knowledge of lambda calculus by answering several questions. Use the arrows on the sides to scroll through the questions, and select a question (currently, only Q11, Q19 and Q20 have been created). Work out the answer, and then assign it to the ANS macro. When you submit an answer, the game will check whether it is correct; if your answer is incorrect, then the game will attempt to provide helpful feedback (e.g. if it can spot what mistake you made).

## Keyboard controls
The majority of the game is played using just the mouse. However, renaming variables and macros is done by typing the name (note that only letters and numbers are accepted). In addition, there are some more advanced controls that are available with a keyboard:
- Control - Changes which block or slot is highlighted:
  - When multiple blocks are overlapping, by default the highest block is highlighted. Use Control to highlight the lowest block instead.
  - When highlighting a child block within a parent block, by default the child block is highlighted. Use Control to highlight the parent block instead.
  - When dragging a block, by default a compatible slot is highlighted. Use Control to not highlight any slots instead (and drop the block directly onto the canvas).
- Shift - When clicking on a highlighted block, by default the block is dragged when clicked. Use Shift to duplicate the highlighted block instead.
- Delete - Remove the highlighted block from the canvas, without dragging it back onto the palette.
