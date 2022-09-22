import React from 'react'

const SelectField = (props) => {

    const { name , value , onChange , index, options ,labelName ,onBlur,className,required } = props;

  return (
      <>
          {labelName ? <label>{ labelName}<a>*</a></label> : null}
          <select required={required} className={className} value={value} name={name} onChange={(event) => onChange(event, index)} 
          onBlur={(event) => onBlur(event,index)}>
              <option value=''> Select an option </option>
            {options.map((data) =>
                <option value={data}>{ data }</option>
              )}
          </select>
          {labelName ? <br/> : null}
      </>
  )
}

export default SelectField;