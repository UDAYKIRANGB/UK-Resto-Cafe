import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'

import CartContext from './context/CartContext'
import Home from './components/Home'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = dish => {
    this.setState(prevState => {
      const existingItem = prevState.cartList.find(
        each => each.dishId === dish.dishId,
      )

      if (existingItem) {
        return {
          cartList: prevState.cartList.map(each =>
            each.dishId === dish.dishId
              ? {...each, quantity: each.quantity + 1}
              : each,
          ),
        }
      }

      return {
        cartList: [...prevState.cartList, {...dish, quantity: 1}],
      }
    })
  }

  removeCartItem = () => {}

  increaseCartQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each =>
        each.dishId === dishId ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  decreaseCartQuantity = dishId => {
    const {cartList} = this.state

    const item = cartList.find(each => each.dishId === dishId)

    if (!item) {
      return
    }

    if (item.quantity === 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(each => each.dishId !== dishId),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each =>
          each.dishId === dishId
            ? {...each, quantity: each.quantity - 1}
            : each,
        ),
      }))
    }
  }

  removeAllCartItems = () => {}

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          increaseCartQuantity: this.increaseCartQuantity,
          decreaseCartQuantity: this.decreaseCartQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exath path="/" component={Home} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
