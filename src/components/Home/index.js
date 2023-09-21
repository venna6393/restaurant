import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Item from '../Item'
import Tags from '../Tags'

const stage = {
  success: 'success',
  loading: 'loading',
  failure: 'failure',
}

class Home extends Component {
  state = {stage1: stage.loading, list1: [], itemCount: 0, selected: '11'}

  componentDidMount() {
    this.getList()
  }

  inc1 = () => {
    this.setState(prevState => ({itemCount: prevState.itemCount + 1}))
  }

  dec1 = () => {
    const {itemCount} = this.state
    if (itemCount > 0) {
      this.setState(prevState => ({itemCount: prevState.itemCount - 1}))
    }
  }

  logout1 = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  click1 = id => {
    this.setState({selected: id})
  }

  getList = async () => {
    this.setState({stage1: stage.loading})
    const options = {
      method: 'GET',
    }
    const response = await fetch(
      'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.setState({
        stage1: stage.success,
        list1: data[0],
        selected: data[0].table_menu_list[0].menu_category_id,
      })
    } else {
      this.setState({stage1: stage.failure})
    }
  }

  renderPart = () => {
    const {stage1, list1, selected, itemCount} = this.state

    switch (stage1) {
      case stage.loading:
        return (
          <div data-testid="loader">
            <h1>loading</h1>
          </div>
        )
      case stage.failure:
        return <h1>Error occurred</h1>
      case stage.success:
        return (
          <div>
            <div className="nav">
              <p>{list1.restaurant_name}</p>
              <div className="cart">
                <p>My Orders</p>

                <Link to="/cart">
                  <AiOutlineShoppingCart />
                </Link>
                <button type="button" onClick={this.logout1}>
                  Logout
                </button>

                <AiOutlineShoppingCart />

                <span>{itemCount}</span>
              </div>
            </div>
            <ul className="ul">
              {list1.table_menu_list.map(each => (
                <Tags
                  list={each}
                  click1={this.click1}
                  selected={selected}
                  key={each.menu_category_id}
                />
              ))}
            </ul>
            <hr />
            {list1.table_menu_list.map(each => {
              if (each.menu_category_id === selected) {
                return (
                  <Item
                    list={each}
                    key={`item${each.menu_category_id}`}
                    inc1={this.inc1}
                    dec1={this.dec1}
                  />
                )
              }
              return null
            })}
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>{this.renderPart()}</div>
      </div>
    )
  }
}

export default Home
