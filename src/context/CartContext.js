import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  increaseCartQuantity: () => {},
  decreseCartQuantity: () => {},
  removeAllCartItems: () => {},
})

export default CartContext
