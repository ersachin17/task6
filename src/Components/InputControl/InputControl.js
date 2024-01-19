import React from 'react'
// import styles from "./InputControl.module.css";

const InputControl = (props) => {
  return (
    <div>
        { props.label && <label>{props.label}</label>}
        <input type='text' {...props} />
        </div>
  )
}

export default InputControl