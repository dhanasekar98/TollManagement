import React,{useState,useEffect} from "react";
import { TbFilter } from 'react-icons/tb';
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import { InputField } from "../../Components/InputField";
import { AiOutlineSearch,AiOutlineDelete } from 'react-icons/ai';


const TollList = () => {
    const [state, setState] = useState({
        tollList: [],
        isOpenTollEntry: false,
        isOpenTollVehicle: false,
        modalName: '',
        tollVehicle: [],
        tollListSearch:[],
        tollVehicleSearch: [],
        isOpenTollList: false,
        tollSearch: '',
        vehicleSearch: '',
        tollNameList: [],
        isModalOpen: false,
        isFilterToll: false 
        
    })
    const [tollVehicleFilter, setTollFilterList] = useState([]);
    
    const handleClickModal = (name) => {
        switch (name) {
            case "Add vehicle entry": {
                setState({ ...state, isOpenTollEntry: !state.isOpenTollEntry,modalName:'Add vehicle entry',isModalOpen:!state.isModalOpen }); 
                break;
            }
            case 'Add Toll': {
                setState({ ...state, isOpenTollVehicle: !state.isOpenTollVehicle,modalName:"Add new entry",isModalOpen:!state.isModalOpen });
                break;
            }
            case 'Add new entry': {
                setState({ ...state, isOpenTollVehicle: !state.isOpenTollVehicle,modalName:"Add new entry",isModalOpen:!state.isModalOpen });
                break;
            }   
            default:
            break;
        }
    }

    const handleSubmitModal = (props) => {
        if (state.modalName === 'Add vehicle entry') {
            let array = [...state.tollList, props];
            setState({ ...state, tollList: array,tollListSearch:array,isOpenTollEntry:!state.isOpenTollEntry,isModalOpen:!state.isModalOpen });
        } else  if(state.modalName === 'Add new entry') {
            let array = [...state.tollVehicle, props];
            let tollArrayList = state.tollList.map(value => value.tollName);
            let tollNames = [...new Set(tollArrayList)];
            setState({ ...state, tollVehicle: array, isOpenTollVehicle: !state.isOpenTollVehicle, tollNameList: tollNames, isModalOpen: !state.isModalOpen });
            setTollFilterList(array);
        }
    }

    function handleChange(event, index) {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    }

    function fareValue(list, type, name) {
        let valueArray = list?.filter((data) => {
            if (data.type === type) {
                return data;
           }
        })
        if (valueArray.length) {
            return valueArray[0][name];
        }
        return 0;
    }

    function handleSearchSubmit(event, name) {
        if (name === 'tollSearch') {
            if (state.tollSearch !== '') {
                let array = state.tollList?.filter((data) => {
                    if (data.tollName === state.tollSearch)
                        return data;
                });
                
                if (array.length) {
                    setState({ ...state, tollListSearch: array })
                }
                else {
                    setState({ ...state, tollListSearch: [] })
                }
            } else {
                   setState({ ...state, tollListSearch: state.tollList })  
            }  
        } else {
              if (state.vehicleSearch !== '') {
                let array = state.tollVehicle?.filter((data) => {
                    if (data.vehicleNumber === state.vehicleSearch)
                        return data;
                })
                  if (array.length) {
                      setTollFilterList(array)
                  } else {
                      setTollFilterList(array);
                  }
             
              } else {
                  setTollFilterList(state.tollVehicle); 
            }  
        }
    }

    function handleFilterClick(value) {
        if (value === 'All') {
            setTollFilterList(state.tollVehicle);
        } else {
            let array = state.tollVehicle?.filter((data) => {
                if (data.tollName === value)
                    return data;
            })
            if (array.length) {
                setTollFilterList(array);
            }
        }
        setState({ ...state, isFilterToll: !state.isFilterToll });
    }

    function handleSearchBlur(event) {
        const { name, value } = event.target;
        if (value === '') {
            if (name === 'tollSearch') {
                setState({ ...state, tollListSearch: state.tollList });
            } else {
                setTollFilterList(state.tollVehicle);
            }
        }
    }

    function handleDeleteRow(index) {
            let array = [...state.tollList];
            array.splice(index);
            setState({ ...state, tollList: array, tollListSearch: array })
    }

    return (
  
        <>
            {state.isOpenTollList ? (<>
             <h1 className="heading">Toll Management Application</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                    <h3>Toll Gate List</h3>
                    <div className="search-field">
                      <InputField
                                  name="tollSearch"
                                  value={state.tollSearch}
                                  placeholder="Search Toll"
                                  type="text"
                            onChange={handleChange}
                            onBlur = {handleSearchBlur}
                        className="search-class"
                        
                    />
                        <AiOutlineSearch className="search-icon" size="1rem" onClick={(event) => handleSearchSubmit(event, 'tollSearch')} />
                   </div>
                    
                <div className="buttons" style={{ display: 'flex', flexWrap: 'wrap', float: 'right' }}>
                    <Button name="Add vehicle entry" onClick = { handleClickModal} />
                    <Button name="Add Toll" onClick = { handleClickModal} />
                    <Button name="Back to vehicle logs" onClick = {() => setState({...state,isOpenTollList:!state.isOpenTollList}) } />
                    </div>
                    
            </div>
            <Modal
                isModal={state.modalName === 'Add vehicle entry' ? true : false}
                handleSubmit={handleSubmitModal}
                modalName={state.modalName}
                tollList={state.tollList.map(value => value.tollName)}
                filterTollList={state.tollList}
                isOpen={state.isModalOpen}
                handleClickModal={handleClickModal} 
                tollVehicle = {state.tollVehicle}    
                    
            />
            <table>
                <thead>
                    <tr>
                        <th>Toll Name</th>
                        <th>Car/Jeep/Van</th>
                        <th>LCV</th>
                        <th>Truck/Bus</th>
                            <th>Heavy Vehicle</th>
                            <th>Actions</th>
                    </tr>
                </thead>
                {
                    state.tollListSearch?.map((value, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{value.tollName}</td>
                                    <td>{fareValue(value.fare, 'Car/Jeep/Van', 'single')}/
                                        {fareValue(value.fare, 'Car/Jeep/Van', 'return')}</td>
                                    <td>{fareValue(value.fare, 'LCV', 'single')}/
                                        {fareValue(value.fare, 'LCV', 'return')}</td>
                                    <td>{fareValue(value.fare, 'Truck/Bus', 'single')}/
                                        {fareValue(value.fare, 'Truck/Bus', 'return')}</td>
                                    <td>{fareValue(value.fare, 'Heavy vehicle', 'single')}/
                                        {fareValue(value.fare, 'Heavy vehicle', 'return')}</td>
                                    <td>
                                        
                                            <AiOutlineDelete size="1.5rem" onClick = {() => handleDeleteRow(index)} className="delete-icons" />
    
                                    </td>
                                    
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
            </>) : (<>
                    
                     <h1 className="heading">Toll Management Application</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap',width:'100%'}}>
                <h3>Toll entries/Vehicle entries</h3>
                <span>
                            <TbFilter onClick={() => setState({...state,isFilterToll: !state.isFilterToll})} style={{transform: state.isFilterToll ? 'rotate(-45deg)': 'rotate(0deg)'}} className="filter-icon" size="1.5rem" />
                            <ul style={{ display : state.isFilterToll ? 'block': 'none'}}>
                                <li onClick={() => handleFilterClick('All')}>All</li>
                                {state.tollNameList?.map((value,index) => <li key={index} onClick={() =>handleFilterClick(value)}>{ value }</li>)}
                            </ul>
                        </span>
                        <div class="search-field">
                                <InputField
                                  name="vehicleSearch"
                                  value={state.vehicleSearch}
                                  placeholder="Search Vehicle"
                                  type="text"
                                onChange={handleChange}
                                onBlur = {handleSearchBlur}
                            className="search-class"
                    />
                            <AiOutlineSearch size="1rem" className="search-icon" onClick={(event) => handleSearchSubmit(event, 'tollVehicleSearch')} />
                            </div>

                <div className="buttons" style={{ display: 'flex', flexWrap: 'wrap', float: 'right' }}>
                    <Button name="Add vehicle entry" onClick = { handleClickModal} />
                    <Button name="Add Toll" onClick = { handleClickModal} />
                    <Button name="View Toll List" onClick = {() => setState({...state,isOpenTollList:!state.isOpenTollList}) } />
                </div>
            </div>
            <Modal
                isOpen={state.isModalOpen}
                isModal={state.modalName === 'Add vehicle entry' ? true : false}
                handleSubmit={handleSubmitModal}
                modalName={state.modalName}
                tollList={state.tollList.map(value => value.tollName)}
                filterTollList={state.tollList}
                handleClickModal={handleClickModal}
                tollVehicle = {state.tollVehicle}     
            />
            <table>
                <thead>
                    <tr>
                        <th>Vehicle Type</th>
                        <th>Vehicle Number</th>
                        <th>Date/ Time</th>
                        <th>Toll Name</th>
                        <th>Tariff</th>
                    </tr>
                </thead>
                {
                    tollVehicleFilter?.map((value, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{value.tollVehicle}</td>
                                    <td>{value.vehicleNumber}</td>
                                    <td>{value.date}</td>
                                    <td>{value.tollName}</td>
                                    <td>{ value.tariff }</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
            
            </>)}
        </>
    )
}

export default TollList;
