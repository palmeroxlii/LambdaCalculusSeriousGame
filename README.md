# Lambda Calculus Serious Game

This game is intended to aid computer science students in learning lambda calculus.

## Starting the game
This game is intended to be played on a computer with a mouse and keyboard.
1. Download the game. If the download is in the form of a ZIP file, then extract it.
2. Open the `index.html` file in a web browser.
3. Select the `SANDBOX MODE` or `QUIZ MODE` button.

## Playing the game - Sandbox mode

This mode allows you to freely construct lambda terms using the block-based structure, by dragging blocks from the palette onto the canvas. To use different variables or macros, select the corresponding hamburger button on the palette and type the new name.

In addition, this mode allows you to apply the beta-reduction algorithm (using either the normal-order or applicative-order strategy) to your terms. It will give you a step-by-step explanation of the algorithm as it is applied to the term.

## Playing the game - Quiz mode

This mode allows you to test your knowledge of lambda calculus by answering several questions. Use the arrows on the sides to scroll through the questions, and select a question to attempt. Work out the answer, and then assign it to the ANS macro (unless the question specifies a different method). When you submit an answer, the game will check whether it is correct; if your answer is incorrect, then the game will attempt to provide helpful feedback (e.g. if it can spot what mistake you made).

## Keyboard controls
The majority of the game is played using just the mouse. However, renaming variables and macros is done by typing the name with a keyboard:
- Only numbers and lower-case letters are accepted for variables.
- Only numbers, spaces and upper-case letters are accepted for macros.

In addition, there are some more advanced controls that are assigned to keys:
- Control - Changes which block or slot is highlighted in certain situations:
  - When the mouse is over multiple overlapping blocks are overlapping:
    - By default, the highest block is highlighted.
    - With Control, the lowest block is highlighted.
  - When the mouse is over a child block within a parent block:
    - By default, the child block is highlighted.
    - With Control, the parent block is highlighted.
  - When dragging a block, and the mouse is over a compatible slot:
    - By default, the slot is highlighted (so the block can be inserted into the slot).
    - With Control, the slot is not highlighted (so the block can be dropped directly onto the canvas).
- Shift - Changes what happens when clicking on a highlighted block:
  - By default, the block is dragged (moving the block from its current position).
  - With Shift, the block is duplicated (leaving the original block in its current position).
- Delete - Allows blocks to be deleted more easily:
  - By default, blocks are removed by dragging them and dropping them off of the canvas.
  - With Delete, blocks are also removed by highlighting them and pressing the Delete key.
- F2 - Takes a screenshot of the game.
- Backtick - Copies the current tooltip (e.g. a block that is being hovered over) to the clipboard.
