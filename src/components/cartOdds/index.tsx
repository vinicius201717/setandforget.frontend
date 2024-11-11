// src/components/Cart.tsx

import React from 'react'
import { useCart } from 'src/context/CartOddsContext'

const Cart: React.FC = () => {
  const { items, removeItem, clearCart, totalAmount } = useCart()

  return (
    <div>
      <h2>Meu Carrinho</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - R$ {item.price.toFixed(2)} x {item.quantity}
            <button onClick={() => removeItem(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <p>Total: R$ {totalAmount.toFixed(2)}</p>
      <button onClick={clearCart}>Limpar Carrinho</button>
    </div>
  )
}

export default Cart
