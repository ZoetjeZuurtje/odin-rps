'use-strict';


const gameButtons = [
    document.querySelector('#btn-rock'),
    document.querySelector('#btn-paper'),
    document.querySelector('#btn-scissor'),
    document.querySelector('#cpu-btn-rock'),
    document.querySelector('#cpu-btn-paper'),
    document.querySelector('#cpu-btn-scissor')
];

const playerScoreContainer = document.querySelector('#player-score');
const cpuScoreContainer = document.querySelector('#cpu-score');

gameButtons[0].addEventListener('click', gameTurn);
gameButtons[1].addEventListener('click', gameTurn);
gameButtons[2].addEventListener('click', gameTurn);

let playerScore = 0;
let cpuScore = 0;

function displayResult(result) {

    switch (result) {
        case 'win':
            playerScore += 1;
            break;
        case 'loss':
            cpuScore += 1;
            break;
        default:
            playerScore += 0.5;
            cpuScore += 0.5;
            break;
    }
    
    playerScoreContainer.textContent = `${playerScore}`;
    cpuScoreContainer.textContent = `${cpuScore}`;
}

function gameTurn(event) {
    removeButtonSelection();

    let playerThrow = event.target.dataset.throw;
    let computerThrow = getComputerChoice();
    displayChoices(playerThrow, computerThrow);
    let result = checkResult(playerThrow, computerThrow);

    displayResult(result);
    checkWin();
}

function removeButtonSelection() {
    gameButtons.forEach(btn => btn.classList.remove('selected'));
}

function displayChoices(player, cpu) {
    let elements = [
        document.querySelector(`#cpu-btn-${cpu}`),
        document.querySelector(`#btn-${player}`)
    ];

    elements.forEach(element => element.classList.add('selected'));
}

function checkWin() {
    let message = '';
    if (playerScore === 5 && cpuScore === 5) {
        message = 'Game ended! It\'s a tie.';
    }
    else if (playerScore >= 5) {
        message = 'Game ended! You won.';
    }
    else if (cpuScore >= 5) {
        message = 'Game ended! You lost.';
    }
    else {
        return;
    }

    // Remove the event listeners from the buttons to prevent the user from clicking more than they should.
    gameButtons[0].removeEventListener('click', gameTurn);
    gameButtons[1].removeEventListener('click', gameTurn);
    gameButtons[2].removeEventListener('click', gameTurn);

    // setTimeout is necessary to allow displayResult() to update the DOM before the alert pops up
    setTimeout(() => alert(message), 15); 
}

function getComputerChoice() {
    let throws = ["rock", "paper", "scissor"];
    let randomNumber = Math.floor(Math.random() * throws.length );

    return throws[randomNumber];
}

function checkResult(throwOne, throwTwo) {
    if (throwOne == throwTwo) {
        return 'draw';
    }

    // Exceptionally ugly code to check if `throwOne` wins
    if (
        (throwOne == "rock" && throwTwo == "scissor") ||
        (throwOne == "paper" && throwTwo == "rock") ||
        (throwOne == "scissor" && throwTwo == "paper")
    ) {
        return 'win';
    }

    // If it is neither a draw nor a win, it must be a loss
    return 'loss'
}

