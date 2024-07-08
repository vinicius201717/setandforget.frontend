// WHITE PIECES
import wPawn from 'src/assets/w-pawn.png'
import wRook from 'src/assets/w-rook.png'
import wKnight from 'src/assets/w-knight.png'
import wBishop from 'src/assets/w-bishop.png'
import wQueen from 'src/assets/w-queen.png'

// BLACK PIECES
import bPawn from 'src/assets/b-pawn.png'
import bRook from 'src/assets/b-rook.png'
import bKnight from 'src/assets/b-knight.png'
import bBishop from 'src/assets/b-bishop.png'
import bQueen from 'src/assets/b-queen.png'
import Image from 'next/image'

const pieceImages: { [key: string]: string } = {
  P: wPawn,
  R: wRook,
  N: wKnight,
  B: wBishop,
  Q: wQueen,
  p: bPawn,
  r: bRook,
  n: bKnight,
  b: bBishop,
  q: bQueen,
}

export const getPieceImages = (pieces: string[]): JSX.Element[] => {
  return pieces.map((piece, index) => (
    <Image
      key={index}
      src={pieceImages[piece]}
      alt='chess piece'
      width={50}
      height={50}
    />
  ))
}
