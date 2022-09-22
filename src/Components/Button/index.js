import React from 'react'

const Button = (props) => {
    const { name , onClick } = props;
  return (
      <>
          <button className="button" onClick={() => onClick(name)}>{ name }</button>
      </>
  )
}

export default Button