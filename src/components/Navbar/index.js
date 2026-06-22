import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoCartOutline} from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'

import CartContext from '../../context/CartContext'
import './index.css'

const Navbar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

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
            <Link to="/" className="link">
              <h1 className="title">UNI Resto Cafe</h1>
            </Link>

            <div className="my-orderCart-container">
              <button type="button" className="button" onClick={onClickLogout}>
                <FiLogOut size={30} className="logout-icon" />
                <p className="myorder-title">LogOut</p>
              </button>
              <Link to="/cart" className="link">
                <button
                  type="button"
                  className="cart-container-btn"
                  data-testid="cart"
                >
                  <IoCartOutline size={30} color="black" />
                  <p className="cart-count">{cartCount}</p>
                </button>
              </Link>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Navbar)
