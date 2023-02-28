const server = require('../data/data_base.js')

function CheckMovement(piece, toX, toY, lobby){
    // console.log(`To X: ${toX}`)
    // console.log(`To X: ${toY}`)
    // console.log(lobby.board[toX][toY])
   switch(piece.name){
    case 'Pawn':
        if(piece.white){
            if(!piece.start && toY >= (piece.y - 2) && toX == piece.x && !lobby.board[toX][toY].name && !lobby.board[toX][toY+1].name)
            {
                piece.start = true;
                return true
            }
            else if(toY == (piece.y - 1) && toX == piece.x && !lobby.board[toX][toY].name)
            {
                piece.start = true;
                return true
            }
            else if(toY == (piece.y - 1) && lobby.board[toX][toY].name && (toX == (piece.x + 1) || toX == (piece.x - 1)))
            {
                console.log(`Nome: ${lobby.board[toX][toY].name}`)
                piece.start = true;
                return true
            }
        }
        else
        {
            if(!piece.start && toY <= (piece.y + 2) && toX == piece.x && !lobby.board[toX][toY].name && !lobby.board[toX][toY-1].name)
            {
                piece.start = true;
                return true
            }
            else if(toY == (piece.y + 1) && toX == piece.x && !lobby.board[toX][toY].name)
            {
                piece.start = true;
                return true
            }
            else if(toY == (piece.y + 1) && lobby.board[toX][toY].name && (toX == (piece.x + 1) || toX == (piece.x - 1)))
            {
                console.log(`Nome: ${lobby.board[toX][toY].name}`)
                piece.start = true;
                return true
            }
        }
        return false
    break
    case 'Rook':
        if(toY > piece.y && toX == piece.x)
        {
            for(let y = piece.y + 1; y < toY;y++)
            {
                if(lobby.board[toX][y].name)
                {
                    console.log(lobby.board[toX][y])
                    return false
                }
            }
            return true
        }
        else if(toY < piece.y && toX == piece.x)
        {
            for(let y = piece.y - 1; y > toY;y--)
            {
                if(lobby.board[toX][y].name)
                {
                    console.log(lobby.board[toX][y])
                    return false
                }
            }
            return true
        }
        else if(toX > piece.x && toY == piece.y)
        {
            for(let x = piece.x + 1; x < toX;x++)
            {
                if(lobby.board[x][toY].name)
                {
                    console.log(lobby.board[x][toY])
                    return false
                }
            }
            return true
        }
        else if(toX < piece.x && toY == piece.y)
        {
            for(let x = piece.x - 1; x > toX;x--)
            {
                if(lobby.board[x][toY].name)
                {
                    console.log(lobby.board[x][toY])
                    return false
                }
            }
            return true
        }
        else
        {
            return false
        }
    break
    case 'Knight':
        if(toY == piece.y + 1 && toX == piece.x + 2 || toY == piece.y + 1 && toX == piece.x - 2 ||
            toY == piece.y - 1 && toX == piece.x + 2 || toY == piece.y - 1 && toX == piece.x - 2 ||
            toY == piece.y + 2 && toX == piece.x + 1 || toY == piece.y + 2 && toX == piece.x - 1 ||
            toY == piece.y - 2 && toX == piece.x + 1 || toY == piece.y - 2 && toX == piece.x - 1)
        {
            return true
        }
        else
        {
            return false
        }
    break
    case 'Bishop':
        if(Math.abs(toY - piece.y) == Math.abs(toX - piece.x))
        {
            let x = 0
            let y = 0
            if(toY > piece.y && toX > piece.x)
            {
                x = piece.x + 1
                y = piece.y + 1
                while(x < toX && y < toY )
                {
                    console.log(lobby.board[x][y])
                    if(lobby.board[x][y].name)
                    {
                        return false
                    }
                    x++
                    y++
                }
                return true
            }
            else if(toY > piece.y && toX < piece.x)
            {
                x = piece.x - 1
                y = piece.y + 1
                while(x > toX && y < toY )
                {
                    console.log(lobby.board[x][y])
                    if(lobby.board[x][y].name)
                    {
                        return false
                    }
                    x--
                    y++
                }
                return true
            }
            else if(toY < piece.y && toX > piece.x)
            {
                x = piece.x + 1
                y = piece.y - 1
                while(x < toX && y > toY )
                {
                    console.log(lobby.board[x][y])
                    if(lobby.board[x][y].name)
                    {
                        return false
                    }
                    x++
                    y--
                }
                return true
            }
            else if(toY < piece.y && toX < piece.x)
            {
                x = piece.x - 1
                y = piece.y - 1
                while(x > toX && y > toY )
                {
                    console.log(lobby.board[x][y])
                    if(lobby.board[x][y].name)
                    {
                        return false
                    }
                    x--
                    y--
                }
                return true
            }
            else
            {
                return false
            }
        }
        else
        {
            return false
        }
    break
    case 'Queen':
        if(Math.abs(toY - piece.y) == Math.abs(toX - piece.x))
        {
            let x = 0
            let y = 0
            if(toY > piece.y && toX > piece.x)
            {
                x = piece.x + 1
                y = piece.y + 1
                while(x < toX && y < toY )
                {
                    console.log(lobby.board[x][y])
                    if(lobby.board[x][y].name)
                    {
                        return false
                    }
                    x++
                    y++
                }
                return true
            }
            else if(toY > piece.y && toX < piece.x)
            {
                x = piece.x - 1
                y = piece.y + 1
                while(x > toX && y < toY )
                {
                    console.log(lobby.board[x][y])
                    if(lobby.board[x][y].name)
                    {
                        return false
                    }
                    x--
                    y++
                }
                return true
            }
            else if(toY < piece.y && toX > piece.x)
            {
                x = piece.x + 1
                y = piece.y - 1
                while(x < toX && y > toY )
                {
                    console.log(lobby.board[x][y])
                    if(lobby.board[x][y].name)
                    {
                        return false
                    }
                    x++
                    y--
                }
                return true
            }
            else if(toY < piece.y && toX < piece.x)
            {
                x = piece.x - 1
                y = piece.y - 1
                while(x > toX && y > toY )
                {
                    console.log(lobby.board[x][y])
                    if(lobby.board[x][y].name)
                    {
                        return false
                    }
                    x--
                    y--
                }
                return true
            }
            else
            {
                return false
            }
        }
        else if(toY > piece.y && toX == piece.x)
        {
            for(let y = piece.y + 1; y < toY;y++)
            {
                if(lobby.board[toX][y].name)
                {
                    console.log(lobby.board[toX][y])
                    return false
                }
            }
            return true
        }
        else if(toY < piece.y && toX == piece.x)
        {
            for(let y = piece.y - 1; y > toY;y--)
            {
                if(lobby.board[toX][y].name)
                {
                    console.log(lobby.board[toX][y])
                    return false
                }
            }
            return true
        }
        else if(toX > piece.x && toY == piece.y)
        {
            for(let x = piece.x + 1; x < toX;x++)
            {
                if(lobby.board[x][toY].name)
                {
                    console.log(lobby.board[x][toY])
                    return false
                }
            }
            return true
        }
        else if(toX < piece.x && toY == piece.y)
        {
            for(let x = piece.x - 1; x > toX;x--)
            {
                if(lobby.board[x][toY].name)
                {
                    console.log(lobby.board[x][toY])
                    return false
                }
            }
            return true
        }
        else
        {
            return false
        }
    break
    case 'King':
        if(toY == piece.y + 1 && toX == piece.x || toY == piece.y - 1 && toX == piece.x ||
            toY == piece.y && toX == piece.x + 1 || toY == piece.y && toX == piece.x - 1 ||
            toY == piece.y + 1 && toX == piece.x + 1 || toY == piece.y - 1 && toX == piece.x - 1 ||
            toY == piece.y + 1 && toX == piece.x - 1 || toY == piece.y - 1 && toX == piece.x + 1)
        {
            return true
        }
        else if(!piece.start && toX == piece.x - 2 && toY == piece.y && !lobby.board[piece.x - 1][toY].name && !lobby.board[piece.x - 2][toY].name)
        {
            if(piece.white && !lobby.board[0][7].start)
            {
                piece.start = true;
                lobby.board[0][7].start = true;
                lobby.board[3][7] = new server.Piece(lobby.board[0][7].name, lobby.board[0][7].img, lobby.board[3][7].x, lobby.board[3][7].y, 
                    lobby.board[0][7].white, lobby.board[0][7].start)
                lobby.board[0][7] = new server.Piece('', '', lobby.board[0][7].x, lobby.board[0][7].y, false, false)
                return true
            }
            else if(!piece.white && !lobby.board[0][0].start)
            {
                piece.start = true;
                lobby.board[0][0].start = true;
                lobby.board[3][0] = new server.Piece(lobby.board[0][0].name, lobby.board[0][0].img, lobby.board[3][0].x, lobby.board[3][0].y, 
                    lobby.board[0][0].white, lobby.board[0][0].start)
                lobby.board[0][0] = new server.Piece('', '', lobby.board[0][0].x, lobby.board[0][0].y, false, false)
                return true
            }
        }
        else if(!piece.start && toX == piece.x + 2 && toY == piece.y && !lobby.board[piece.x + 1][toY].name && !lobby.board[piece.x + 2][toY].name)
        {
            if(piece.white && !lobby.board[7][7].start)
            {
                piece.start = true;
                lobby.board[7][7].start = true;
                lobby.board[5][7] = new server.Piece(lobby.board[7][7].name, lobby.board[7][7].img, lobby.board[5][7].x, lobby.board[5][7].y, 
                    lobby.board[7][7].white, lobby.board[7][7].start)
                lobby.board[7][7] = new server.Piece('', '', lobby.board[7][7].x, lobby.board[7][7].y, false, false)
                return true
            }
            else if(!piece.white && !lobby.board[7][0].start)
            {
                piece.start = true;
                lobby.board[7][0].start = true;
                lobby.board[5][0] = new server.Piece(lobby.board[7][0].name, lobby.board[7][0].img, lobby.board[5][0].x, lobby.board[5][0].y, 
                    lobby.board[7][0].white, lobby.board[7][0].start)
                lobby.board[7][0] = new server.Piece('', '', lobby.board[7][0].x, lobby.board[7][0].y, false, false)
                return true
            }
        }
        else
        {
            return false
        }
    break
   }
}

exports.CheckMovement = CheckMovement