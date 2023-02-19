let board;

var tictactoe = function(moves) {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    for(let index = 0; index < moves.length; index++) {
        const player = getPlayer(index);
        playMove(player, moves[index]);
        if (isWinByRow() || isWinByColumn() || isWinByDiagonal()) {
            return player;
        }
    }
    if (moves.length === 9) {
        return 'Draw';
    } else {
        return 'Pending';
    }
};

var getPlayer = function(moveIndex) {
    return (moveIndex + 1) % 2 === 0 ? 'B' : 'A';
}

var playMove = function (player, move) {
    board[move[0]][move[1]] = player === 'A' ? 'X' : 'O';
}

var isWinByRow = function() {
    for (let row = 0; row < 3; row++) {
        const currentRow = board[row].join('');
        if (isWinCombination(currentRow)) {
            return true;
        }
    }
    return false
}

var isWinByColumn = function() {
    for (let col = 0; col < 3; col++) {
        const currentCol = board[0][col] + board[1][col] + board[2][col];
        if (isWinCombination(currentCol)) {
            return true;
        }
    }
    return false;
}

var isWinByDiagonal = function() {
    let currentdiagonal = board[0][0] + board[1][1] + board[2][2];
    if (isWinCombination(currentdiagonal)) {
        return true;
    }
    currentdiagonal = board[0][2] + board[1][1] + board[2][0];
    if (isWinCombination(currentdiagonal)) {
        return true;
    }
    return false;
}

var isWinCombination = function(combination) {
    return combination === 'XXX' || combination === 'OOO';
}