/* eslint-disable no-unused-vars */

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import CartModal from 'src/components/cartModal'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  totalAmount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartOddsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((prevItem) => prevItem.id === item.id)

      if (existingItem) {
        return prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, quantity: prevItem.quantity + item.quantity }
            : prevItem,
        )
      }

      return [...prevItems, item]
    })
  }

  useEffect(() => {
    if (items) {
      handleOpen()
    }
  }, [items])

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalAmount }}
    >
      {children}
      <CartModal
        open={isModalOpen}
        onClose={handleClose}
        title='Título do Modal'
      >
        <h2>teste</h2>
      </CartModal>
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
