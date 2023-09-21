const Tags = props => {
  const {list, click1, selected} = props

  const click2 = () => {
    click1(list.menu_category_id)
  }

  let text = ''
  if (selected === list.menu_category_id) {
    text = 'underline'
  } else {
    text = ''
  }

  return (
    <li>
      <button type="button" className={text} onClick={click2}>
        {list.menu_category}
      </button>
    </li>
  )
}

export default Tags
