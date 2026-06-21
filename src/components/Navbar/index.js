import {IoCartOutline} from 'react-icons/io5'

import CartContext from '../../context/CartContext'
import './index.css'

const Navbar = props => {
  const {restaurantName} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const cartCount = cartList.reduce(
          (total, eachItem) => total + eachItem.quantity,
          0,
        )

        return (
          <nav className="navbar">
            <h1 className="title">{restaurantName}</h1>

            <div className="my-orderCart-container">
              <p className="myorder-title">My Orders</p>
              <div className="cart-container">
                <IoCartOutline size={35} />
                <p className="cart-count">{cartCount}</p>
              </div>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Navbar
