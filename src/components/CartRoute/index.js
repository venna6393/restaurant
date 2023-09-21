import CartListView from '../CartListView'
import CartSummary from '../CartSummary'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const CartRoute = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const remove1 = () => {
        removeAllCartItems()
      }

      return (
        <>
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button type="button" onClick={remove1}>
                  Remove All
                </button>
                <CartListView />
                {cartList.length > 0 && <CartSummary />}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartRoute
