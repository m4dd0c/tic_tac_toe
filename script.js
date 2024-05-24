let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
const board = document.querySelector("#board");
const col1 = document.querySelector(".col1");
const col2 = document.querySelector(".col2");
const col3 = document.querySelector(".col3");
const col4 = document.querySelector(".col4");
const col5 = document.querySelector(".col5");
const col6 = document.querySelector(".col6");
const col7 = document.querySelector(".col7");
const col8 = document.querySelector(".col8");
const col9 = document.querySelector(".col9");
let turn;
let winner;
let counter;

let draw = 0;

let player1 = {};
let player2 = {};

const home = () => (window.location.href = "index.html");
const restartGame = () => window.location.reload();

const startGame = () => {
  localStorage.removeItem("score");
  p1 = p1.value.trim();
  p2 = p2.value.trim();

  if (p1.length <= 2 || p2.length <= 2)
    document.querySelector(".message").textContent =
      "Name must contain atleast 3 character";
  else window.location.href = `playground.html?p1=${p1}&p2=${p2}`;
};

//initiate game
window.onload = () => {
  const url = window.location.href;
  if (!url.includes("/playground.html")) return;
  init();

  board.onclick = (e) => {
    //getting clicked div
    const target = e.target;
    // validating target
    if (
      !target.classList.value.includes("col") ||
      target.classList.value.includes("visited")
    )
      return;

    // setting player move
    target.innerHTML = turn.icon;
    target.classList.add("visited");

    const isWin = checkWin();
    if (isWin) {
      return updateScore();
    }

    const oldColor = turn.color;
    // toggling turn
    turn = turn === player1 ? player2 : player1;
    board.classList.replace(oldColor, turn.color);
    // checking draw
    counter++;
    if (counter === 9 && winner === undefined) {
      winner = "draw";
      return updateScore();
    }
  };
};
const updateScore = () => {
  if (winner) {
    let savedScore = localStorage.getItem("score");
    if (savedScore) savedScore = JSON.parse(savedScore);
    const key = winner === "draw" ? "draw" : winner.name;
    console.log("in updateScore");
    savedScore[key] = savedScore[key] + 1;
    localStorage.setItem("score", JSON.stringify(savedScore));

    setTimeout(() => restartGame(), 500);
  }
};

// setting user
const init = () => {
  const urlParams = new URLSearchParams(window.location.search);
  p1 = urlParams.get("p1");
  p2 = urlParams.get("p2");

  // validating and setting player1 and player2
  if (!p1 || !p2 || p1.length <= 2 || p2.length <= 2) return home();

  const score = JSON.parse(localStorage.getItem("score")) || {
    [p1]: 0,
    [p2]: 0,
    draw: 0,
  };

  player1.name = p1;
  player1.color = "bg-red-500";
  player1.icon = '<i class="fa fa-circle-o" style="font-size: 36px"></i>';
  player2.name = p2;
  player2.color = "bg-blue-500";
  player2.icon = '<i class="fa fa-times" style="font-size: 36px"></i>';

  let p1Label = document.querySelector(".p1-label");
  let p2Label = document.querySelector(".p2-label");
  let scoreP1 = document.querySelector("#score-p1");
  let scoreP2 = document.querySelector("#score-p2");
  let scoreDraw = document.querySelector("#score-draw");
  //setting label
  p1Label.innerHTML = `${player1.name} - <i class="fa fa-circle-o"></i>`;
  p2Label.innerHTML = `${player2.name} - <i class="fa fa-times"></i>`;
  scoreP1.textContent = `${player1.name} - ${score[p1]}`;
  scoreP2.textContent = `${player2.name} - ${score[p2]}`;
  scoreDraw.textContent = `Draw - ${score.draw}`;
  // turn
  turn = Math.trunc(Math.random() * 2) ? player1 : player2;
  board.classList.add(turn.color);
  //counter
  counter = 0;
};

const checkWin = () => {
  const winCondition =
    (col1.innerHTML === turn.icon &&
      col2.innerHTML === turn.icon &&
      col3.innerHTML === turn.icon) ||
    (col1.innerHTML === turn.icon &&
      col4.innerHTML === turn.icon &&
      col7.innerHTML === turn.icon) ||
    (col1.innerHTML === turn.icon &&
      col5.innerHTML === turn.icon &&
      col9.innerHTML === turn.icon) ||
    (col2.innerHTML === turn.icon &&
      col5.innerHTML === turn.icon &&
      col8.innerHTML === turn.icon) ||
    (col3.innerHTML === turn.icon &&
      col5.innerHTML === turn.icon &&
      col7.innerHTML === turn.icon) ||
    (col3.innerHTML === turn.icon &&
      col6.innerHTML === turn.icon &&
      col9.innerHTML === turn.icon) ||
    (col4.innerHTML === turn.icon &&
      col5.innerHTML === turn.icon &&
      col6.innerHTML === turn.icon) ||
    (col7.innerHTML === turn.icon &&
      col8.innerHTML === turn.icon &&
      col9.innerHTML === turn.icon) ||
    (col2.innerHTML === turn.icon &&
      col5.innerHTML === turn.icon &&
      col8.innerHTML === turn.icon);

  if (winCondition) return (winner = turn);
};
