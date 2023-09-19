import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Item from '../Item'
import Tags from '../Tags'

const stage = {
  success: 'success',
  loading: 'loading',
  failure: 'failure',
}

class Home extends Component {
  state = {stage1: stage.loading, list1: [], itemCount: 0, selected: ''}

  componentDidMount() {
    this.getList()
  }

  click1 = id => {
    this.setState({selected: id})
  }

  getList = async () => {
    this.setState({stage1: stage.loading})
    const response = await fetch(
      'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099',
    )
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.setState({
        stage1: stage.success,
        list1: data,
        selected: data[0].table_menu_list[0].menu_category_id,
      })
    } else {
      this.setState({stage1: stage.failure})
    }
  }

  renderPart = () => {
    const {stage1, list1, selected} = this.state

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
            <ul className="ul">
              {list1[0].table_menu_list.map(each => (
                <Tags
                  list={each}
                  click1={this.click1}
                  selected={selected}
                  key={each.menu_category_id}
                />
              ))}
            </ul>
            <hr />
            {list1[0].table_menu_list.map(each => {
              if (each.menu_category_id === selected) {
                return <Item list={each} key={`item${each.menu_category_id}`} />
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
    const {itemCount} = this.state
    return (
      <div>
        <div className="nav">
          <p>UNI Resto Cafe</p>
          <div className="cart">
            <p>My Orders</p>
            <AiOutlineShoppingCart />
            <span>{itemCount}</span>
          </div>
        </div>
        <hr />
        <div>{this.renderPart()}</div>
      </div>
    )
  }
}

export default Home
