import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        addCartItem,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeAllCartItems,
        removeCartItem,
      } = value

      return (
        <>
          <Navbar />
          {cartList.length === 0 ? (
            <div className="empty-cart-container">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-svg-download-png-3020773.png"
                alt="empty-cart"
                className="empty-image"
              />
              <h1 className="cart-empty-heading">Your cart is empty</h1>
              <p className="cart-empty-para">
                Looks like you haven&apos;t added any delicious meals yet.
              </p>
              <Link to="/" className="link">
                <button type="button" className="order-now-btn">
                  Order Now
                </button>
              </Link>
            </div>
          ) : (
            <div className="cart-list-container">
              <h1 className="cart-heading">My Cart</h1>
              <button
                type="button"
                className="remove-button"
                onClick={() => {
                  removeAllCartItems()
                }}
              >
                Remove All
              </button>
              <ul className="cart-list">
                {cartList.map(eachDish => (
                  <li className="cart-list-item" key={eachDish.dishId}>
                    <div className="image-details">
                      <img
                        src={eachDish.dishImage}
                        alt={eachDish.dishName}
                        className="image"
                      />
                      <div>
                        <h1 className="dish-title">{eachDish.dishName}</h1>
                        <p className="dish-price">
                          Price: {eachDish.dishPrice}
                        </p>
                        <div className="add-cart-list-container">
                          <button
                            type="button"
                            className="button"
                            onClick={() => {
                              if (eachDish.quantity > 0) {
                                decreaseCartQuantity(eachDish.dishId)
                              }
                            }}
                          >
                            -
                          </button>

                          <p>{eachDish.quantity}</p>

                          <button
                            type="button"
                            className="button"
                            onClick={() => {
                              if (eachDish.quantity === 0) {
                                addCartItem(eachDish)
                              } else {
                                increaseCartQuantity(eachDish.dishId)
                              }
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() => removeCartItem(eachDish.dishId)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
