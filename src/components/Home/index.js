import {Component} from 'react'

import Navbar from '../Navbar'
import CartContext from '../../context/CartContext'

import './index.css'

class Home extends Component {
  state = {
    restaurantName: '',
    activetabId: '',
    restaurantData: [],
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    const response = await fetch(apiUrl)
    const data = await response.json()

    console.log(data)

    const updatedData = data[0].table_menu_list.map(eachCategory => ({
      menuCategory: eachCategory.menu_category,
      menuCategoryId: eachCategory.menu_category_id,
      menuCategoryImage: eachCategory.menu_category_image,
      nexturl: eachCategory.nexturl,

      categoryDishes: eachCategory.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

    this.setState({
      restaurantName: data[0].restaurant_name,
      restaurantData: updatedData,
      activeTabId: updatedData[0].menuCategoryId,
    })
  }

  changeTab = id => {
    this.setState({activeTabId: id})
  }

  render() {
    const {restaurantData, activeTabId, restaurantName} = this.state

    const activeCategory = restaurantData.find(
      each => each.menuCategoryId === activeTabId,
    )

    return (
      <>
        <Navbar restaurantName={restaurantName} />
        <div className="home-container">
          <ul className="tabs-container">
            {restaurantData.map(each => (
              <li
                key={each.menuCategoryId}
                className={
                  activeTabId === each.menuCategoryId
                    ? 'active-tab'
                    : 'tab-item'
                }
              >
                <button
                  onClick={() => this.changeTab(each.menuCategoryId)}
                  className="menu-btn"
                >
                  {each.menuCategory}
                </button>
              </li>
            ))}
          </ul>
          <ul className="dishes-container">
            {activeCategory?.categoryDishes.map(eachDish => (
              <li key={eachDish.dishId} className="dish-item">
                <div className="dish-type-discription-details">
                  <div className="dish-type">
                    {eachDish.dishType === 2 ? (
                      <div className="veg-icon">
                        <div className="veg-dot" />
                      </div>
                    ) : (
                      <div className="non-veg-icon">
                        <div className="non-veg-dot" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="dish-name">{eachDish.dishName}</h1>

                    <p className="dish-sar">
                      {eachDish.dishCurrency} {eachDish.dishPrice}
                    </p>

                    <p className="dish-discription">
                      {eachDish.dishDescription}
                    </p>

                    {eachDish.dishAvailability ? (
                      <CartContext.Consumer>
                        {value => {
                          const {
                            addCartItem,
                            increaseCartQuantity,
                            decreaseCartQuantity,
                            cartList,
                          } = value

                          const cartItem = cartList.find(
                            each => each.dishId === eachDish.dishId,
                          )

                          const quantity =
                            cartItem.length > 0 ? cartItem.quantity : 0

                          return (
                            <div className="add-cart-container">
                              <button
                                type="button"
                                className="button"
                                onClick={() => {
                                  if (quantity > 0) {
                                    decreaseCartQuantity(eachDish.dishId)
                                  }
                                }}
                              >
                                -
                              </button>

                              <p>{quantity}</p>

                              <button
                                type="button"
                                className="button"
                                onClick={() => {
                                  if (quantity === 0) {
                                    addCartItem(eachDish)
                                  } else {
                                    increaseCartQuantity(eachDish.dishId)
                                  }
                                }}
                              >
                                +
                              </button>
                            </div>
                          )
                        }}
                      </CartContext.Consumer>
                    ) : (
                      <p className="not-available">Not available</p>
                    )}

                    {eachDish.addonCat.length > 0 && (
                      <p className="custom-para">Customizations available</p>
                    )}
                  </div>
                </div>

                <p className="calories-title">
                  {eachDish.dishCalories} calories
                </p>

                <img
                  src={eachDish.dishImage}
                  alt={eachDish.dishName}
                  className="dish-image"
                />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Home
