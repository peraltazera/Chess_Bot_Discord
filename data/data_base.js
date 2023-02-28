function Piece(name, img, x, y, white){
    this.name = name
    this.img = img
    this.x = x
    this.y = y
    this.white = white
}

function Board (row, col){
    let board = new Array(col); 
    for (var i = 0; i < col; i++) {
        board[i] = new Array(row); 
    }
    for (var x = 0; x < col; x++) {
        for (var y = 0; y < col; y++) {
            board[x][y] = new Piece('', '', x, y, false); 
        }
    }
    return board
}

module.exports = {
    lobby: function lobby(id, channelId, guildId, player1, player2, myInteraction, game, attachment) {
        this.id = id;
        this.channelId = channelId;
        this.guildId = guildId;
        this.player1 = {
            ...player1
        };
        this.player2 = {
            ...player2
        };
        this.myInteraction = myInteraction
        this.game = game
        this.board = Board(8,8) 
        this.start = false 
        this.attachment = attachment 
    },     
    lobbyes: [],
    count: 0,
    Piece: Piece
}