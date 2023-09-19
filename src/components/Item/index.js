const Item = props => {
  const {list} = props
  return (
    <div>
      <ul className="ul1">
        {list.category_dishes.map(each => (
          <li key={each.dish_id} className="card">
            <div>
              <h1 className="h1">{each.dish_name}</h1>
              <p>
                {each.dish_currency} {each.dish_price}
              </p>
              <p>{each.dish_calories} calories</p>
              <p> {each.dish_description}</p>
              {each.dish_Availability === true ? (
                <div>
                  <button type="button">-</button>
                  <p>0</p>
                  <button type="button">+</button>
                </div>
              ) : (
                <p>Not available</p>
              )}
              {each.addonCat.length > 0 && <p>Customizations available</p>}
            </div>
            <img src={each.dish_image} alt={each.dish_name} className="img" />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Item
