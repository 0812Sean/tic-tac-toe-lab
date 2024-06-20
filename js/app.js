//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.
document.addEventListener('DOMContentLoaded', () => {
/*-------------------------------- Constants --------------------------------*/


    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

/*---------------------------- Variables (state) ----------------------------*/
    let board;
    let turn;
    let winner;
    let tie;


/*------------------------ Cached Element References ------------------------*/

    const squareEls = document.querySelectorAll('.sqr');
    const messageEl = document.querySelector('#message');
    const resetBtnEl = document.querySelector('#reset');


/*-------------------------------- Functions --------------------------------*/
      function init() {
        console.log('Initalzing game');
        board = ['','','', '', '', '', '', '', ''];
        turn = 'X';
        winner = false;
        tie = false;
        render();
      }

      function render() {
        updateBoard();
        updateMessage();
      }

      function updateBoard() {
        board.forEach((mark, index) => {
            squareEls[index].textContent = mark;
        });
      }

      function updateMessage(){
        if (winner) {
            messageEl.textContent = `Congratulations! ${turn} wins!`;
        }else if(tie) {
            messageEl.textContent = `It's a tie!`;
        }else {
            messageEl.textContent = `It's ${turn}'s turn.`;
        }
      }
      function handleClick(event) {
        const squareIndex = parseInt(event.target.id);
        if (board[squareIndex] !== '' || winner) return;
        placePiece(squareIndex);
        checkForWinner();
        checkForTie();
        switchPlayerTurn();
        render();
      }   
      function placePiece(index) {
        board[index] = turn;
      }

      function checkForWinner(){
        winningCombos.forEach(combo => {
            if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
                winner = true;
            }  
        })
      }

      function checkForTie() {
        if (winner) return;
        tie = board.every(cell => cell !== '');
      }

      function switchPlayerTurn() {
        if (winner) return;
        if (turn === 'X') {
            turn = 'O';
          } else {
            turn = 'X';
          }
      }



/*----------------------------- Event Listeners -----------------------------*/
    squareEls.forEach(square => square.addEventListener('click', handleClick));
    resetBtnEl.addEventListener('click', init);

    init();

})
