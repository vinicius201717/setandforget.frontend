/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import CartModal from 'src/components/cartModal'
import { BetItemType } from 'src/types/apps/footballType/fixtureType'

type CartContextType = {
  items: BetItemType[]
  addItem: (item: BetItemType) => void
  removeItem: (id: number) => void
  clearCart: () => void
  totalAmount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartOddsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<BetItemType[]>([])
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  const handleCardOpen = () => setIsCardOpen(true)
  const handleCardClose = () => setIsCardOpen(false)

  const addItem = (item: BetItemType) => {
    setItems((prevItems) => {
      // const existingItem = prevItems.find((prevItem) => prevItem.id === item.id)

      // if (existingItem) {
      //   return prevItems.map((prevItem) =>
      //     prevItem.oddsId === item.oddsId
      //       ? { ...prevItem, quantity: prevItem.quantity + item.quantity }
      //       : prevItem,
      //   )
      // }

      return [...prevItems, item]
    })
  }

  useEffect(() => {
    if (items.length > 0) {
      handleCardOpen()
    } else {
      handleModalClose()
      handleCardClose()
    }
  }, [items])

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.oddId !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  // const totalAmount = items.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0,
  // )

  // variavel temporaria
  const totalAmount = 10

  if (!isClient) return null

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalAmount }}
    >
      {children}
      <CartModal
        open={isCardOpen}
        modalOpen={isModalOpen}
        onOpenCardOdds={handleModalOpen}
        onCloseCardOdds={handleModalClose}
      />
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
