import {Component} from 'react'

import CartContext from '../../context/CartContext'

class Dish extends Component {
  state = {quantity: 0}

  dec = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  inc = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderDish = () => (
    <CartContext.Consumer>
      {value => {
        const {quantity} = this.state
        const {each, inc1, dec1} = this.props
        let q = '0'

        if (quantity > 0) {
          q = quantity
        }
        const inc2 = () => {
          inc1()
          this.inc()
        }
        const dec2 = () => {
          dec1()
          this.dec()
        }
        const {addCartItem} = value
        const product = {
          dishName: each.dish_name,
          dishId: each.dish_id,
          dishPrice: each.dish_price,
          dishImage: each.dish_image,
        }
        const onClickAddToCart = () => {
          addCartItem({...product, quantity})
        }
        return (
          <li className="card">
            <div>
              <h1 className="h1">{each.dish_name}</h1>
              <p>
                {each.dish_currency} {each.dish_price}
              </p>
              <p>{each.dish_calories} calories</p>
              <p> {each.dish_description}</p>
              {each.dish_Availability === true ? (
                <div>
                  <button type="button" onClick={dec2}>
                    -
                  </button>
                  <p>{q}</p>
                  <button type="button" onClick={inc2}>
                    +
                  </button>
                  <button type="button" onClick={onClickAddToCart}>
                    Add to Cart
                  </button>
                </div>
              ) : (
                <p>Not available</p>
              )}
              {each.addonCat.length > 0 && <p>Customizations available</p>}
            </div>
            <img src={each.dish_image} alt={each.dish_name} className="img" />
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return this.renderDish()
  }
}

export default Dish
