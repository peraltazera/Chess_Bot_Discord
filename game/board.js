const { AttachmentBuilder } = require('discord.js')
const Canvas = require('canvas')
const jsChessEngine = require('js-chess-engine')
const server = require('../data/data_base.js')

// let startPiecesWhite = [{name: 'Rook', img: './images/W_Rook.png'},{name: 'Knight', img: './images/W_Knight.png'},{name: 'Bishop', img: './images/W_Bishop.png'},
//                         {name: 'Queen', img: './images/W_Queen.png'},{name: 'King', img: './images/W_King.png'},{name: 'Bishop', img: './images/W_Bishop.png'},
//                         {name: 'Knight', img: './images/W_Knight.png'},{name: 'Rook', img: './images/W_Rook.png'}]

// let startPiecesBlack = [{name: 'Rook', img: './images/B_Rook.png'},{name: 'Knight', img: './images/B_Knight.png'},{name: 'Bishop', img: './images/B_Bishop.png'},
//                         {name: 'Queen', img: './images/B_Queen.png'},{name: 'King', img: './images/B_King.png'},{name: 'Bishop', img: './images/B_Bishop.png'},
//                         {name: 'Knight', img: './images/B_Knight.png'},{name: 'Rook', img: './images/B_Rook.png'}]

let startPiecesWhite = [{name: 'Rook', img: './Pieces/White/Rook.png'},{name: 'Knight', img: './Pieces/White/Knight.png'},{name: 'Bishop', img: './Pieces/White/Bishop.png'},
                        {name: 'Queen', img: './Pieces/White/Queen.png'},{name: 'King', img: './Pieces/White/King.png'},{name: 'Bishop', img: './Pieces/White/Bishop.png'},
                        {name: 'Knight', img: './Pieces/White/Knight.png'},{name: 'Rook', img: './Pieces/White/Rook.png'}]

let startPiecesBlack = [{name: 'Rook', img: './Pieces/Black/Rook.png'},{name: 'Knight', img: './Pieces/Black/Knight.png'},{name: 'Bishop', img: './Pieces/Black/Bishop.png'},
                        {name: 'Queen', img: './Pieces/Black/Queen.png'},{name: 'King', img: './Pieces/Black/King.png'},{name: 'Bishop', img: './Pieces/Black/Bishop.png'},
                        {name: 'Knight', img: './Pieces/Black/Knight.png'},{name: 'Rook', img: './Pieces/Black/Rook.png'}]


async function CreateBoard(from, fromX, fromY, to, toX, toY, lobby)
{
    // let difX = 113
    // let difY = 78
    
    // let pieceWidth = 112
    // let pieceHeight = 224

    // const posPieceX = x => 104 - (pieceWidth / 2) + (x * difX)
    // const posPieceY = y => 238 - pieceHeight + (y * difY)
    
    // const posLineX = x => 104 + (x * difX)
    // const posLineY = y => 214 + (y * difY)

    // const canvas = Canvas.createCanvas(1000, 900)
    // const ctx = canvas.getContext('2d')

    // await Canvas.loadImage('./images/board1000.png').then((image) => {
    //     const pattern = ctx.createPattern(image, 'repeat')
    //     ctx.fillStyle = pattern
    //     ctx.fillRect(0, 0, canvas.width, canvas.height)
    // })

    let difX = 72
    let difY = 72
    
    let pieceWidth = 52
    let pieceHeight = 52

    const posPieceX = x => 68 - (pieceWidth / 2) + (x * difX)
    const posPieceY = y => 74 - pieceHeight + (y * difY)
    
    const posLineX = x => 42.25 + (x * difX)
    const posLineY = y => 48 + (y * difY)

    const posFillX = x => 32 + (x * difX)
    const posFillY = y => 12 + (y * difY)

    const canvas = Canvas.createCanvas(620, 620)
    const ctx = canvas.getContext('2d')

    await Canvas.loadImage('./Board/Board.png').then((image) => {
        const pattern = ctx.createPattern(image, 'repeat')
        ctx.fillStyle = pattern
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    })

    //ctx.lineWidth = 10
    //ctx.strokeStyle = '#5CAEFA'
    //ctx.fillStyle = "#5CAEFA"
    ctx.lineWidth = 6
    ctx.strokeStyle = '#7B61FF'
    ctx.fillStyle = "#7B61FF"

    if(lobby.start)
    {
        ctx.beginPath()
        //ctx.arc(posLineX(fromX), posLineY(fromY), 24, 0, 360)
        //ctx.arc(posLineX(fromX), posLineY(fromY), 12, 0, 360)
        //ctx.fill()
        //ctx.arc(posLineX(toX), posLineY(toY), 12, 0, 360)
        //ctx.fill()
        ctx.fillRect(posFillX(fromX), posFillY(fromY), 72, 72);
        ctx.fillRect(posFillX(toX), posFillY(toY), 72, 72);
        //ctx.lineTo(posLineX(fromX), posLineY(fromY))
        //ctx.lineTo(posLineX(toX), posLineY(toY))
        //ctx.stroke()

        lobby.player1.turn = !lobby.player1.turn
        lobby.player2.turn = !lobby.player2.turn

        lobby.board[toX][toY] = new server.Piece(lobby.board[fromX][fromY].name, lobby.board[fromX][fromY].img, lobby.board[toX][toY].x, lobby.board[toX][toY].y, 
                                                    lobby.board[fromX][fromY].white, lobby.board[fromX][fromY].start)
        lobby.board[fromX][fromY] = new server.Piece('', '', lobby.board[fromX][fromY].x, lobby.board[fromX][fromY].y, false, false)

        for(let x = 0; x < 8;x++){
            for(let y = 0; y < 8;y++){
                if(lobby.board[x][y].name)
                {
                    await Canvas.loadImage(lobby.board[x][y].img).then((image) => {
                        ctx.drawImage(image, posPieceX(lobby.board[x][y].x), posPieceY(lobby.board[x][y].y), pieceWidth, pieceHeight)
                    })
                }
            }
        }

        return new AttachmentBuilder(canvas.toBuffer(), 'chart.png')
    }
    else
    {
        lobby.start = true

        // for(let i = 0; i < 8;i++){
        //     lobby.board[i][0].name = startPiecesBlack[i].name
        //     lobby.board[i][0].img = startPiecesBlack[i].img
        //     lobby.board[i][0].x = i
        //     lobby.board[i][0].y = 0
        //     await Canvas.loadImage(startPiecesBlack[i].img).then((image) => {
        //         ctx.drawImage(image, posPieceX(i), posPieceY(0), pieceWidth, pieceHeight)
        //     })	
        // }
    
        // for(let i = 0; i < 8;i++){
        //     lobby.board[i][1].name = 'Pawn'
        //     lobby.board[i][1].img = './images/B_Pawn.png'
        //     lobby.board[i][1].x = i
        //     lobby.board[i][1].y = 1
        //     await Canvas.loadImage('./images/B_Pawn.png').then((image) => {
        //         ctx.drawImage(image, posPieceX(i), posPieceY(1), pieceWidth, pieceHeight)
        //     })	
        // }
    
        // for(let i = 0; i < 8;i++){
        //     lobby.board[i][6].name = 'Pawn'
        //     lobby.board[i][6].img = './images/W_Pawn.png'
        //     lobby.board[i][6].x = i
        //     lobby.board[i][6].y = 6
        //     lobby.board[i][6].white = true
        //     await Canvas.loadImage('./images/W_Pawn.png').then((image) => {
        //         ctx.drawImage(image, posPieceX(i), posPieceY(6), pieceWidth, pieceHeight)
        //     })	
        // }
    
        // for(let i = 0; i < 8;i++){
        //     lobby.board[i][7].name = startPiecesWhite[i].name
        //     lobby.board[i][7].img = startPiecesWhite[i].img
        //     lobby.board[i][7].x = i
        //     lobby.board[i][7].y = 7
        //     lobby.board[i][7].white = true
        //     await Canvas.loadImage(startPiecesWhite[i].img).then((image) => {
        //         ctx.drawImage(image, posPieceX(i), posPieceY(7), pieceWidth, pieceHeight)
        //     })	
        // }

        for(let i = 0; i < 8;i++){
            lobby.board[i][0].name = startPiecesBlack[i].name
            lobby.board[i][0].img = startPiecesBlack[i].img
            lobby.board[i][0].x = i
            lobby.board[i][0].y = 0
            await Canvas.loadImage(startPiecesBlack[i].img).then((image) => {
                ctx.drawImage(image, posPieceX(i), posPieceY(0), pieceWidth, pieceHeight)
            })	
        }
    
        for(let i = 0; i < 8;i++){
            lobby.board[i][1].name = 'Pawn'
            lobby.board[i][1].img = './Pieces/Black/Pawn.png'
            lobby.board[i][1].x = i
            lobby.board[i][1].y = 1
            await Canvas.loadImage('./Pieces/Black/Pawn.png').then((image) => {
                ctx.drawImage(image, posPieceX(i), posPieceY(1), pieceWidth, pieceHeight)
            })	
        }
    
        for(let i = 0; i < 8;i++){
            lobby.board[i][6].name = 'Pawn'
            lobby.board[i][6].img = './Pieces/White/Pawn.png'
            lobby.board[i][6].x = i
            lobby.board[i][6].y = 6
            lobby.board[i][6].white = true
            await Canvas.loadImage('./Pieces/White/Pawn.png').then((image) => {
                ctx.drawImage(image, posPieceX(i), posPieceY(6), pieceWidth, pieceHeight)
            })	
        }
    
        for(let i = 0; i < 8;i++){
            lobby.board[i][7].name = startPiecesWhite[i].name
            lobby.board[i][7].img = startPiecesWhite[i].img
            lobby.board[i][7].x = i
            lobby.board[i][7].y = 7
            lobby.board[i][7].white = true
            await Canvas.loadImage(startPiecesWhite[i].img).then((image) => {
                ctx.drawImage(image, posPieceX(i), posPieceY(7), pieceWidth, pieceHeight)
            })	
        }

        return new AttachmentBuilder(canvas.toBuffer(), 'chart.png')
    }
}

exports.CreateBoard = CreateBoard
