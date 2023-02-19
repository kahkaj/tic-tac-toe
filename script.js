//import {tictactoe, cell} from "./algo.js";

const container = document.querySelector('.container');
const begin = document.querySelector('.begin');
const start = document.getElementById('start');
const warning = document.getElementById('warning');
const zone = document.querySelectorAll('.zone');
const msg = document.getElementById('msg');
const player = document.getElementById('player');
const inputs = document.querySelectorAll('input');
const end = document.querySelector('.end');
const replay = document.getElementById('replay');
const restart = document.getElementById('restart'); 
const score1 = document.getElementById('score-1'); 
const score2 = document.getElementById('score-2');
const name1 = document.getElementById('name-1'); 
const name2 = document.getElementById('name-2');
let moves = [],
    step = [],
    players = [],
    points = [0, 0];

function reset() {
    for (let i = 0; i < zone.length; i++) {
        zone[i].classList.add('clicked');
    }
    player.style.display = 'none';
}

reset();
msg.style.display = 'none';
end.style.display = 'none';

function initialize() {
    for (let i = 0; i < zone.length; i++) {
        zone[i].classList.remove('clicked');
        zone[i].classList.remove('player-1');
        zone[i].classList.remove('player-2');
        zone[i].classList.remove('winner-1');
        zone[i].classList.remove('winner-2');
    }
    player.style.display = 'block';
    player.innerHTML = players[0];
    player.style.color = 'cornflowerblue';
    msg.style.display = 'block';
    msg.innerHTML = 'اللعبة مستمرة';

}

function play() { 
    for (let i = 0; i < zone.length; i++) {
        zone[i].addEventListener('click', function() {
            if (!this.classList.contains('clicked')) {
                this.classList.add('clicked');
                moves.push(cell(parseInt(this.dataset.order)));
                step = tictactoe(moves, this);        
                //this.classList.add(step[0]);
                if (step[1] === 'اللعبة مستمرة') {
                    if (step[0] === 'player-1') {
                        player.innerHTML = players[1];
                        player.style.color = 'coral';
                    } else {
                        player.innerHTML = players[0];
                        player.style.color = 'cornflowerblue';
                    }
                } else {
                    reset();
                    if (step[1] === 'يربح') {
                        if (step[0] === 'player-1') {
                            msg.innerHTML = '! ' + players[0] + ' يربح';
                            points[0]++;
                            score1.innerHTML = points[0];
                        } else {
                            msg.innerHTML = '! ' + players[1]  + ' يربح';
                            points[1]++;
                            score2.innerHTML = points[1];
                        }
                        console.log(players[0], ' : ', points[0]);
                        console.log(players[1], ' : ', points[1]);
                    } else {
                        msg.innerHTML = step[1];
                    }
                    end.style.display= 'flex';                    
                }
            }
        })
    }
    warning.innerText = ''
    inputs[0].value = '';      
    inputs[1].value = '';
    inputs[0].style.borderColor = 'gray';
    inputs[1].style.borderColor = 'gray';
    inputs[0].focus();
}

function playStart() {
    if (inputs[0].value.trim() !== inputs[0].value) {
        inputs[0].value = inputs[0].value.trim();
    }
    if (inputs[1].value.trim() !== inputs[1].value) {
        inputs[1].value = inputs[1].value.trim();
    }
    if (inputs[0].value === '') {
        warning.innerHTML = '! أدخل اسم <span>اللاعب الأول</span>';
        inputs[0].value = '';
        inputs[0].focus();
        inputs[0].style.borderColor = 'orangered';
        inputs[1].style.borderColor = 'gray';
    } else if (inputs[1].value === '') {
        warning.innerHTML = '! أدخل اسم <span>اللاعب الثاني</span>';
        inputs[1].value = ''; 
        inputs[1].focus();
        inputs[1].style.borderColor = 'orangered';
        inputs[0].style.borderColor = 'gray';
    } else if (inputs[0].value.trim() === inputs[1].value.trim()) {
        warning.innerHTML = '! اللاعبان لديهما <span>نفس الإسم</span>';
        inputs[0].value = inputs[0].value.trim()     
        inputs[1].value = inputs[1].value.trim()     
        inputs[0].focus();
        inputs[0].style.borderColor = 'orangered';
        inputs[1].style.borderColor = 'orangered';
    } else {
        players.push(inputs[0].value);
        players.push(inputs[1].value);
        name1.innerHTML = inputs[0].value;
        name2.innerHTML = inputs[1].value;
        initialize();
        begin.style.display = 'none';
        play();
    }
}

function playReplay() {
    initialize();
    begin.style.display = 'none';
    end.style.display = 'none';
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    moves = [];  
    play();
}

function playRestart() {
    initialize();
    begin.style.display = 'flex';
    reset();
    msg.style.display = 'none';
    end.style.display = 'none';
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    moves = [];
    players = [];
    points = [0, 0];
    score1.innerHTML = points[0];
    score2.innerHTML = points[1];
    name1.innerHTML = '';
    name2.innerHTML = '';
}

start.addEventListener('click', playStart);
replay.addEventListener('click', playReplay);
restart.addEventListener('click', playRestart);

function cell(item) {
    let row, col;
    if (item < 3) {
        row = 0;
        col = item;
    } else if (item < 6) {
        row = 1;
        col = item - 3;
    } else {
        row = 2;
        col = item - 6;
    }
    return [row, col];
}

let board = [['', '', ''], ['', '', ''], ['', '', '']];
var tictactoe = function(moves, currentElement) {    
    currentElement.classList.add(getplayer(moves.length-1));
    let player;
    for(let index = 0; index < moves.length; index++) {
        player = getplayer(index);               
        playMove(player, moves[index]);
        if (isWinByRow() || isWinByColumn() || isWinByDiagonal()) {
            return [player, 'يربح'];
        }
    }
    if (moves.length === 9) {
        return [player, 'تعادل'];
    } else {
        return [player, 'اللعبة مستمرة'];
    }
    }

var getplayer = function(moveIndex) {
    return moveIndex % 2 === 0 ? 'player-1' : 'player-2';
}

var playMove = function (player, move) {
    player === 'player-2' ? board[move[0]][move[1]] = 'X' : board[move[0]][move[1]] = 'O';
}

var isWinByRow = function() {
    for (let row = 0; row < 3; row++) {
        const currentRow = board[row].join('');
        if (isWinCombination(currentRow)) {
            for (let i = 0; i < zone.length; i++) {
                if (cell(parseInt(zone[i].dataset.order))[0] == row) {
                    if (zone[i].classList.contains('player-1')) {
                        zone[i].classList.add('winner-1'); 
                    } else if (zone[i].classList.contains('player-2')) {
                        zone[i].classList.add('winner-2');                          
                    }
                }
            }
            return true;
        }
    }
    return false
}

var isWinByColumn = function() {
    for (let col = 0; col < 3; col++) {
        const currentCol = board[0][col] + board[1][col] + board[2][col];
        if (isWinCombination(currentCol)) {
            for (let i = 0; i < zone.length; i++) {
                if (cell(parseInt(zone[i].dataset.order))[1] == col) {
                    if (zone[i].classList.contains('player-1')) {
                        zone[i].classList.add('winner-1'); 
                    } else if (zone[i].classList.contains('player-2')) {
                        zone[i].classList.add('winner-2');                          
                    }
                }
            }
            return true;
        }
    }
    return false;
}

var isWinByDiagonal = function() {
    let currentdiagonal = board[0][0] + board[1][1] + board[2][2];
    if (isWinCombination(currentdiagonal)) {
        for (let i = 0; i < zone.length; i++) {
            if ( cell(parseInt(zone[i].dataset.order))[0] == cell(parseInt(zone[i].dataset.order))[1]) {
                if (zone[i].classList.contains('player-1')) {
                    zone[i].classList.add('winner-1'); 
                } else if (zone[i].classList.contains('player-2')) {
                    zone[i].classList.add('winner-2');                          
                }
            }
        }
        return true;
    }
    currentdiagonal = board[0][2] + board[1][1] + board[2][0];
    if (isWinCombination(currentdiagonal)) {
        for (let i = 0; i < zone.length; i++) {
            if (cell(parseInt(zone[i].dataset.order))[0] + cell(parseInt(zone[i].dataset.order))[1] == 2) {
                if (zone[i].classList.contains('player-1')) {
                    zone[i].classList.add('winner-1'); 
                } else if (zone[i].classList.contains('player-2')) {
                    zone[i].classList.add('winner-2');                          
                }
            }
        }
        return true;
    }
    return false;
}

var isWinCombination = function(combination) {
    return combination === 'XXX' || combination === 'OOO';
}