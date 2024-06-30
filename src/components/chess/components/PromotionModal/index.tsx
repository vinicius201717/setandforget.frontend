/* eslint-disable no-unused-vars */
import React from 'react'
import Image from 'next/image'
// Pieces white
import wQueen from 'src/assets/w-queen.png'
import wBishop from 'src/assets/w-bishop.png'
import wknight from 'src/assets/w-knight.png'
import wRook from 'src/assets/w-rook.png'

// Pieces black
import bQueen from 'src/assets/b-queen.png'
import bBishop from 'src/assets/b-bishop.png'
import bknight from 'src/assets/b-knight.png'
import bRook from 'src/assets/b-rook.png'
import { ButtonPiece, Container } from './style'

interface PromotionModalProps {
  onChoosePiece: (piece: 'q' | 'r' | 'b' | 'n') => void
  color: string
}

const PromotionModal: React.FC<PromotionModalProps> = ({
  onChoosePiece,
  color,
}) => {
  return (
    <Container className='promotion-modal'>
      <ButtonPiece onClick={() => onChoosePiece('q')}>
        {color === 'w' ? (
          <Image src={wQueen} alt={'Queen'} width={100} height={100} />
        ) : (
          <Image src={bQueen} alt={'Queen'} width={100} height={100} />
        )}
      </ButtonPiece>
      <ButtonPiece onClick={() => onChoosePiece('r')}>
        {color === 'w' ? (
          <Image src={wRook} alt={'Rook'} width={100} height={100} />
        ) : (
          <Image src={bRook} alt={'Rook'} width={100} height={100} />
        )}
      </ButtonPiece>
      <ButtonPiece onClick={() => onChoosePiece('b')}>
        {color === 'w' ? (
          <Image src={wBishop} alt={'Bishop'} width={100} height={100} />
        ) : (
          <Image src={bBishop} alt={'Bishop'} width={100} height={100} />
        )}
      </ButtonPiece>
      <ButtonPiece onClick={() => onChoosePiece('n')}>
        {color === 'w' ? (
          <Image src={wknight} alt={'kwKnight'} width={100} height={100} />
        ) : (
          <Image src={bknight} alt={'Knight'} width={100} height={100} />
        )}
      </ButtonPiece>
    </Container>
  )
}

export default PromotionModal
