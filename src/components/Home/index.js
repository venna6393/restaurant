import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {Loader} from 'react-loader-spinner'
import Tags from '../Tags'

const stage = {
  success: 'success',
  loading: 'loading',
  failure: 'failure',
}

class Home extends Component {
  state = {stage1: stage.loading, list1: [], itemCount: 0}

  componentDidMount() {
    this.getList()
  }

  getList = async () => {
    this.setState({stage1: stage.loading})
    const response = await fetch(
      'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099',
    )
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.setState({stage1: stage.success, list1: data})
    } else {
      this.setState({stage1: stage.failure})
    }
  }

  renderPart = () => {
    const {stage1} = this.state

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
        return <h1>success</h1>
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
