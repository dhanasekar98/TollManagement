import React,{useState,useEffect} from 'react'
import {IoClose} from 'react-icons/io5'
import { InputField } from '../InputField';
import SelectField from '../SelectField';

const Modal = (props) => {
    const { isOpen, handleSubmit, modalName, isModal, tollList, filterTollList,handleClickModal,tollVehicle } = props;
    
    const vehicles = [ 
        'Car/Jeep/Van', 'LCV' , 'Truck/Bus' , 'Heavy vehicle'
    ]

    const [vehicleModal, setVehicleModal] = useState(vehicles);

    const [restValue, setRestValue] = useState({
        tollName: '',
        fare: [
            {
            type: '',
            single: '',
            return: ''
            },
                       {
            type: '',
            single: '',
            return: ''
            },
         {
            type: '',
            single: '',
            return: ''
            },
     {
            type: '',
            single: '',
            return: ''
        },
        ] 
    })

    useEffect(() => {
        localStorage.setItem('resetValue', JSON.stringify(restValue));
    })
 
    const [state, setState] = useState({
        tollName: '',
        fare: [
            {
                type: '',
                single: '',
                return: ''
            },
            {
                type: '',
                single: '',
                return: ''
            },
            {
                type: '',
                single: '',
                return: ''
            },
            {
                type: '',
                single: '',
                return: ''
            },
        ]
    });

    const [restTollValue, setRestTollValue] = useState({
        tollName: '',
        tollVehicle: '',
        vehicleNumber: '',
        tariff: '',
        date: ''
    })

    const [tollValue, setTollValue] = useState(restTollValue)
    const [filter, setFilter] = useState([]);

    function handleBlur(event) {
        const { name, value } = event.target;
        if (name === 'tollName') {
            let tariffArray = filterTollList?.filter((data) => {
                if (data.tollName === value) {
                    return value;
                }
            })
            setFilter(tariffArray);
        } else if(name==='tollVehicle') {
            let tariffValue = filter[0]?.fare?.filter((data) => {
                if (data.type === value) {
                    return value;
                }
            })
            setTollValue({...tollValue,tariff:'',vehicleNumber:''});
            
            let date = new Date();
            let date1 = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ":" + date.getMinutes();
            setTollValue({ ...tollValue, tariff: tariffValue[0].single,date:date1 }) 
        }
    }


    function handleChange(event, index) {
        const { name, value } = event.target;
        if (name === 'tollName') {
              setTollValue({...tollValue,tollVehicle:'',tariff:'',vehicleNumber:''});
        }
        if (isModal) {
            let array = [...state.fare];
            array[index][name] = value;
            setState({ ...state, fare: array });
        } else {
            setTollValue({ ...tollValue, [name]: value });
        }
    }

    function handleInputBlur(event, index) {
        const { name, value } = event.target;
        let vehicleArray = tollVehicle?.filter((data) => {
            if (data.vehicleNumber === value
                && data.tollVehicle === tollValue.tollVehicle
                && data.tollName === tollValue.tollName) {
                return data;
            }
        }) 
        if (vehicleArray.length) {
            let date = vehicleArray[0]['date'];
            let dateAndMonth = date.split('/');
            let year = dateAndMonth[2].split(' ')[0];
            let hoursAndMinutes = dateAndMonth[2].split(' ')[1];
            let hours = hoursAndMinutes.split(":")[0];
            let minutes = hoursAndMinutes.split(":")[1];
            let date2 = new Date();
            let date1 = new Date(date2.getFullYear(),(dateAndMonth[1]),dateAndMonth[0],hours,minutes,0);
            let diff = date2- date1;
            var hh = Math.floor(diff / 1000 / 60 / 60 );
            if (hh < 1) {
                let tariffValue = filter[0]?.fare?.filter((data) => {
                if (data.type === tollValue.tollVehicle) {
                    return value;
                }
                })
                if(tariffValue.length)
                setTollValue({ ...tollValue, tariff: tariffValue[0].return }) 
            }
        }
    }

    function handleSubmitModal(value,event) {
        event.preventDefault();
        handleSubmit(value);
        if (isModal) {
            let value = JSON.parse(localStorage.getItem('resetValue'))
            setState(value);
        } else {
            setTollValue(restTollValue);
        }
    }

    function handleClose(modalName) {
        handleClickModal(modalName);
         if (isModal) {
            let value = JSON.parse(localStorage.getItem('resetValue'))
            setState(value);
        } else {
            setTollValue(restTollValue);
        }

    }


  return (
      <>
          <dialog open={isOpen} style={{width:'542px',margin:'auto',padding:'20px'}}>
              <div className='header' style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <h2 className="modalTitle">{modalName}</h2>
                  <IoClose onClick={() => handleClose(modalName)}  className="close-icon" size="1.5rem" style={{ position: 'absolute', right: '20px'}} />
              </div>
              <form onSubmit={(event) => handleSubmitModal(isModal ? state : tollValue,event)}>
              {isModal ? (
                <>             
                  <label>Toll Name<a className="required">*</a></label>
                      <input type="text" className='modalInput' value={state.tollName} onChange={(event) => setState({ ...state, tollName: event.target.value })} required={true} placeholder="Toll Name" />
                      <label>Select the vehicle<a className="required">*</a></label>
                  {state.fare?.map((value, index) => {
                      return (
                          <div key={index}>   
                              <SelectField
                                  name='type'
                                  value={value.type} 
                                  onChange={handleChange}
                                  index={index}
                                  options={vehicleModal}
                                  className='modalInput-2'
                                  required={true}
                              />
                         
                              <InputField
                                  name="single"
                                  value={value.single}
                                  placeholder="Single Journey"
                                  type="number"
                                  onChange={handleChange}
                                  index={index}
                                  className='modalInput-2'
                                  required={true}
                              />
                              <InputField
                                  name="return"
                                  value={value.return}
                                  placeholder="Return Journey"
                                  type="number"
                                  onChange={handleChange}
                                  index={index}
                                  className='modalInput-2'
                                  required={true}
                              /> 
                          </div>
                      )
                  })}
            </>
              
              ) : (
                     <>
                    <SelectField
                                  name='tollName'
                                  value={tollValue.tollName} 
                                  onChange={handleChange}
                    options={tollList ? tollList : null}
                     onBlur = {handleBlur}
                              labelName='Select toll name'
                              className='modalInput'
                               required={true}
                />
                <SelectField
                                  name='tollVehicle'
                                  value={tollValue.tollVehicle} 
                                  onChange={handleChange}
                    options={vehicles}
                    onBlur = {handleBlur}
                              labelName='Select vehicle type'
                              className='modalInput'
                               required={true}
                />
                    <InputField
                                  name="vehicleNumber"
                                  value={tollValue.vehicleNumber}
                                  placeholder="Vehicle Number"
                                  type="text"
                              onChange={handleChange}
                              onBlur = { handleInputBlur}
                              labelName='Vehicle Number'
                              required={true}
                                 className = 'modalInput'
                />
                    <InputField
                                  name="tariff"
                                  value={tollValue.tariff}
                                  placeholder="Tariff"
                                  type="number"
                                  onChange={handleChange}
                                  readonly={true}
                                  labelName='Tariff'
                              className='modalInput'
                            required={true}
                />     
            </>       
              ) }
                  <button className='modalButton' type='submit'>Submit</button>
                  </form>
          </dialog>
      </>
  )
}

export default Modal