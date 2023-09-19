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
    <button type="button" data-testid="list1" className={text} onClick={click2}>
      {list.menu_category}
    </button>
  )
}

export default Tags
