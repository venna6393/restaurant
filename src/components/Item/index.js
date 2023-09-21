import Dish from '../Dish'

const Item = props => {
  const {list, inc1, dec1} = props
  return (
    <div>
      <ul className="ul1">
        {list.category_dishes.map(each => (
          <Dish each={each} inc1={inc1} dec1={dec1} key={each.dish_name} />
        ))}
      </ul>
    </div>
  )
}
export default Item
