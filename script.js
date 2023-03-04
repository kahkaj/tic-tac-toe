//import {tictactoe, cell} from "./algo.js";

const container = document.querySelector('.container');
const begin = document.querySelector('.begin');
const start = document.getElementById('start');
//const warning = document.getElementById('warning');
const zone = document.querySelectorAll('.zone');
const player = document.getElementById('player');
const inputs = document.querySelector('input[type="text"]');
const blockLevels = document.querySelector('.level');
const levels = document.querySelectorAll('input[type="radio"]');
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
let lines = [];
let [firstPlayer, secondPlayer] = ['player-1', 'player-2'];
const color_1 = 'coral';
const color_2 = 'cornflowerblue';
levels[1].checked = true;
let mode = 'medium';

function getVirginZones() {
    // at first, all of zones are not clicked
    // the zones are ordered by the number of possible connections that they have
    let virginZones = [4,8,6,2,0,7,1,5,3];
    let index;
    for (let i = 0; i < moves.length; i++) {
        index = virginZones.indexOf(moves[i]);
        if (index > -1) {
            virginZones.splice(index, 1);
        }
    }
    return virginZones;
}

function reset() {
    for (let i = 0; i < zone.length; i++) {
        zone[i].classList.add('clicked');
    }
    player.style.display = 'none';
}

function rightDiagonalLine(arr) {
    arr.push(board[0][2] + board[1][1] + board[2][0])
}

function leftDiagonalLine(arr) {
    arr.push(board[0][0] + board[1][1] + board[2][2])
}

function horizontalLine(arr) {
   for (let row = 0; row < 3; row++) {
       arr.push(board[row].join(''));
   }
}

function verticalLine(arr) {
   for (let col = 0; col < 3; col++) {
       arr.push(board[0][col] + board[1][col] + board[2][col])
   }
}

function updateLinesSituation() {
    lines = [];
    rightDiagonalLine(lines);
    leftDiagonalLine(lines);
    horizontalLine(lines);
    verticalLine(lines);
}

function easyMode(arr) {
    let randomZoneIndex = Math.floor(Math.random() * arr.length);
    return zone[arr[randomZoneIndex]];
}
// function lineToClick(player_1) {
//     updateLinesSituation();
//     for (let i = 0; i < lines.length; i++) {
//         if (lines[i] == 'OO') {
//             return i
//         }
//     }
//     for (let i = 0; i < lines.length; i++) {
//         if (lines[i] == 'XX') {
//             return i
//         }
//     }   
//     for (let i = 0; i < lines.length; i++) {
//         if (lines[i] == 'O') {
//             return i
//         }
//     }
//     for (let i = 0; i < lines.length; i++) {
//         if (lines[i] == '') {
//             return i
//         }
//     }
//     for (let i = 0; i < lines.length; i++) {
//         if (lines[i] == 'X') {
//             return i
//         }
//     }
//     for (let i = 0; i < lines.length; i++) {
//         if (lines[i] == 'OX' || lines[i] == 'XO') {
//             return i
//         }
//     }
// }

function lineToClick() {
    updateLinesSituation();
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] == 'OO') {
            return i
        }
    }
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] == 'XX') {
            return i
        }
    }   
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] == 'O') {
            return i
        }
    }
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] == '') {
            return i
        }
    }
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] == 'X') {
            return i
        }
    }
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] == 'OX' || lines[i] == 'XO') {
            return i
        }
    }
}

function zoneToClick(line, level) {
    if (level === 'easy') {
        return easyMode(getVirginZones());
    } else {
        if (line == 0) {
            if (!zone[4].classList.contains('clicked')) {
                return zone[4];
            } else if (!zone[6].classList.contains('clicked')) {
                return zone[6];
            } else if (!zone[2].classList.contains('clicked')) {
                return zone[2];
            }
        }
        if (line == 1) {
            if (!zone[4].classList.contains('clicked')) {
                return zone[4];
            } else if (!zone[8].classList.contains('clicked')) {
                return zone[8];
            } else if (!zone[0].classList.contains('clicked')) {
                return zone[0];
            }
        }
        if (line == 2) {
            if (!zone[2].classList.contains('clicked')) {
                return zone[2];
            } else if (!zone[0].classList.contains('clicked')) {
                return zone[0];
            } else if (!zone[1].classList.contains('clicked')) {
                return zone[1];
            }
        }
        if (line == 3) {
            if (!zone[4].classList.contains('clicked')) {
                return zone[4];
            } else if (!zone[5].classList.contains('clicked')) {
                return zone[5];
            } else if (!zone[3].classList.contains('clicked')) {
                return zone[3];
            }
        }
        if (line == 4) {
            if (!zone[8].classList.contains('clicked')) {
                return zone[8];
            } else if (!zone[6].classList.contains('clicked')) {
                return zone[6];
            } else if (!zone[7].classList.contains('clicked')) {
                return zone[7];
            }
        }
        if (line == 5) {
            if (!zone[6].classList.contains('clicked')) {
                return zone[6];
            } else if (!zone[0].classList.contains('clicked')) {
                return zone[0];
            } else if (!zone[3].classList.contains('clicked')) {
                return zone[3];
            }
        }
        if (line == 6) {
            if (!zone[4].classList.contains('clicked')) {
                return zone[4];
            } else if (!zone[7].classList.contains('clicked')) {
                return zone[7];
            } else if (!zone[1].classList.contains('clicked')) {
                return zone[1];
            }
        }
        if (line == 7) {
            if (!zone[8].classList.contains('clicked')) {
                return zone[8];
            } else if (!zone[2].classList.contains('clicked')) {
                return zone[2];
            } else if (!zone[5].classList.contains('clicked')) {
                return zone[5];
            }
        }
    }    
}

reset();
end.style.display = 'none';

function initialize() {
    for (let i = 0; i < zone.length; i++) {
        zone[i].classList.remove('clicked');
        zone[i].classList.remove(firstPlayer);
        zone[i].classList.remove(secondPlayer);
        zone[i].classList.remove('winner-1');
        zone[i].classList.remove('winner-2');
    }
    player.style.display = 'block';
    player.innerHTML = players[0];
    player.style.color = color_2;
}

function play() {
    for (let i = 0; i < zone.length; i++) {
        zone[i].addEventListener('click', function() {            
            if (!this.classList.contains('clicked') || (firstPlayer === 'player-2' && moves.length === 0)) {
                this.classList.add('clicked');
                moves.push(parseInt(this.dataset.order));
                step = tictactoe(moves, this);
                if (step[1] === 'اللعبة مستمرة') {
                    if (step[0] === 'player-1') {
                        player.innerHTML = players[1];
                        player.style.color = color_1;
                        // document.body.addEventListener("click", function(evt) { evt.preventDefault()});
                        setTimeout(function() {zoneToClick(lineToClick(), mode).click()}, 500);         
                    } else {
                        player.innerHTML = players[0];
                        player.style.color = color_2; 
                    }
                } else {
                    reset();
                    if (step[1] === 'يربح') {
                        if (step[0] === 'player-1') {                            
                            player.innerHTML = '! ' + players[0] + ' يربح';
                            player.style.color = color_1;
                            points[0]++;
                            score1.innerHTML = points[0];
                        } else {
                            player.innerHTML = '! ' + players[1]  + ' يربح';
                            points[1]++;
                            score2.innerHTML = points[1];
                        }
                    } else {
                        player.innerHTML = step[1];
                    }
                    end.style.display= 'flex';                    
                }
            }
        })
    }
    //warning.innerText = ''
    inputs.value = '';      
    //inputs[1].value = '';
    inputs.style.borderColor = 'gray';
    //inputs[1].style.borderColor = 'gray';
    inputs.focus();
}

function levelSelected() {
    for (let i = 0; i < 3; i++) {
        if (levels[i].checked == true) {
            return levels[i];
        }
    }
}

function playStart() {
    if (inputs.value.trim() !== inputs.value) {
        inputs.value = inputs.value.trim();
    }
    // if (inputs[1].value.trim() !== inputs[1].value) {
    //     inputs[1].value = inputs[1].value.trim();
    // }
    if (inputs.value === '') {
        //warning.innerHTML = '<span>! أدخل اسمك </span>';
        inputs.value = '';
        inputs.style.borderColor = 'orangered';
        //inputs[1].style.borderColor = 'gray';
    // } else if (inputs[1].value === '') {
    //     warning.innerHTML = '! أدخل اسم <span>اللاعب الثاني</span>';
    //     inputs[1].value = ''; 
    //     inputs[1].focus();
    //     inputs[1].style.borderColor = 'orangered';
    //     inputs[0].style.borderColor = 'gray';
    // } else if (inputs[0].value.trim() === inputs[1].value.trim()) {
    //     warning.innerHTML = '! اللاعبان لديهما <span>نفس الإسم</span>';
    //     inputs[0].value = inputs[0].value.trim()     
    //     inputs[1].value = inputs[1].value.trim()     
    //     inputs[1].focus();
    //     inputs[0].style.borderColor = 'orangered';
    //     inputs[1].style.borderColor = 'orangered';
    //    
    } else {
        players.push(inputs.value);
        players.push('الروبوت');
        name1.innerHTML = inputs.value;
        name2.innerHTML = 'الروبوت';
        mode = levelSelected().id;
        initialize();
        begin.style.display = 'none';
        blockLevels.style.display = 'none';
        play();
    }
}

function playReplay() {
    initialize();
    blockLevels.style.display = 'none';
    begin.style.display = 'none';
    end.style.display = 'none';
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    moves = [];
    [firstPlayer, secondPlayer] = [secondPlayer, firstPlayer];
    //[players[0], players[1]] = [players[1], players[0]];    
    play();
    if (firstPlayer === 'player-2' && moves.length === 0) {
        setTimeout(function() {zoneToClick(lineToClick(), mode).click()}, 500); 
    }
}

function playRestart() {
    initialize();
    begin.style.display = 'flex';
    blockLevels.style.display = 'block';
    levels[1].checked == true;
    reset();
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
    //get the coordinates of each zone
    let axes = moves.map(ele => cell(ele));
    for(let index = 0; index < moves.length; index++) {
        player = getplayer(index);               
        playMove(player, axes[index]);
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
    return moveIndex % 2 === 0 ? firstPlayer : secondPlayer;
}

var playMove = function (player, move) {    
    player === 'player-1' ? board[move[0]][move[1]] = 'X' : board[move[0]][move[1]] = 'O';
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
    let currenDiagonal;
    currenDiagonal = board[0][0] + board[1][1] + board[2][2];
    if (isWinCombination(currenDiagonal)) {
        for (let i = 0; i < zone.length; i++) {
            if (cell(parseInt(zone[i].dataset.order))[0] == cell(parseInt(zone[i].dataset.order))[1]) {
                if (zone[i].classList.contains('player-1')) {
                    zone[i].classList.add('winner-1'); 
                } else if (zone[i].classList.contains('player-2')) {
                    zone[i].classList.add('winner-2');                          
                }
            }
        }
        return true;
    }
    currenDiagonal = board[0][2] + board[1][1] + board[2][0];
    if (isWinCombination(currenDiagonal)) {
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