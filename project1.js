// what will happen when the user clicks?
// how will the target move from square to square in what order
// how will the game display when user strikes the target
// display the score for each player
// set a parameter for goal to connect and strike the target in a defined time
// what happens when the user selects one player or two player game
// if player two goes what happens to player one info
// how will each player advance to the next stage
// once goal is reached display winner

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const highscoredisplay = document.querySelector('.highscore');
const mallet = document.querySelector('.mallet');
const timerdisplay = document.querySelector(".timer")
let malletsound = new Audio("./bonk.mp3")
let lastHole;
let score = 0;
let highscore = 0;



function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let timeUp = false;  // allow for character movement up and down
function pop() {
    const time = randomTime(500, 1500); //sets pop up time
    const hole = randomHole(holes); 
    hole.classList.add('up'); //add the CSS class so selected mole can "pop up"
    if (startTime >= 0) {


    setTimeout(() => {
        hole.classList.remove('up'); //sets character to go back down
        if(!timeUp) {
            pop();
        }
    }, time);
}
}

// keep holes random and from placing character in the same place twice
function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    console.log(lastHole)
    return hole;
}

let startTime = 29;
const countdown = () => {
    timerdisplay.innerText = startTime
    startTime--
}

const startGame = document.querySelector("#startGame");

function start() {
    console.log(start)
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    pop();
    const timer = setInterval(countdown, 1000);
    const stopTimer = () => {
        clearInterval(timer)
    }
    setTimeout(stopTimer, 31000)
    setTimeout(clearInterval(pop), 31000)
}

startGame.addEventListener("click", start)

function wack(e){
    if(!e.isTrusted) return; 
    score+= 10;         
    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
    
    if (score > highscore) {
        highscore=score
        highscoredisplay.textContent=score
    } else {
        highscoredisplay.textcontent=highscore
    }
}

moles.forEach(mole => mole.addEventListener('click', wack))

window.addEventListener("mousemove", (e) => {
    mallet.style.left = e.pageX + 4 + "px";
    mallet.style.top = e.pageY - 60 + "px";
});

window.addEventListener("click", (e) => {
    mallet.style.transform="rotateZ(95deg) rotateY(-180deg)";
    malletsound.play();
    malletsound.currentTime = 0;
    setTimeout(() => {
        mallet.style.transform = "rotateZ(0deg) rotateY(0deg)"; 
    })
},10);



const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", () => {
        scoreBoard.textContent = 0;
        timerdisplay.innerHTML = 30;
        let resetTime = 29;
    const countdown2 = () => {
    timerdisplay.textContent = resetTime
    resetTime--
    }

        function restart() {
            console.log(restart)
            timeUp = false;
            score = 0;
            pop();
            const timer = setInterval(countdown, 1000);
            const stopTimer = () => {
                clearInterval(timer)
            }
            setTimeout(stopTimer, 31000)
            setTimeout(clearInterval(pop), 31000)
        }
});
