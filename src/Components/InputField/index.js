import React from 'react'

export const InputField = (props) => {
    const { name, type, onChange, placeholder, value, index, readonly,labelName,className ,onBlur,required } = props;
  return (
      <>
          {labelName ? <label>{ labelName }<a>*</a></label> : null}
          <input required={required} className={className} type={type} name={name} onChange={(event) => onChange(event, index)} onBlur={(event) => onBlur(event,index)} placeholder={placeholder} value={value} readOnly={readonly} />
          {labelName ? <br/> : null}
      </>
  )
}
