import React from 'react'
import {IoArrowBack, IoSearch} from 'react-icons/io5';
import axios from 'axios';

import './reserve.css';

const Reserve = ({setPage}) => {
  const [Phone_Num, setPhone] = React.useState(null);
  const [Name, setName] = React.useState(null);
  const [cpn, setCpn] = React.useState(null);
  const [cpl, setCpl] = React.useState(null);
  const [foundCustomer, setFoundCustomer] = React.useState(null);
  const [Customer, setCustomer] = React.useState(null);
  const [foundCar, setFoundCar] = React.useState(null);
  const [Car, setCar] = React.useState(null);
  const [Color, setColor] = React.useState(null);
  const [Model, setModel] = React.useState(null);
  const [reserved, setReserved] = React.useState(false);
  const [slot, setSlot] = React.useState(false);
  const [payment, setPayment] = React.useState(false);

  const findCustomer = async () => {
    const customer = await axios.post('https://car-parking-management-system.herokuapp.com/search_customer', {Phone_Num});
   
    if(customer.data.customer){
      setCustomer(customer.data.customer);
      setFoundCustomer(true);
    }else{
      setFoundCustomer(false);
    }
  };

  const findCar = async () => {
    const car = await axios.post('https://car-parking-management-system.herokuapp.com/search_car', {Car_Plate_Numbers: cpn, Car_Plate_Letters: cpl});
   
    if(car.data.car){
      setCar(car.data.car);
      setCpl(car.data.car.Car_Plate_Letters || "none");
      setFoundCar(true);
    }else{
      setFoundCar(false);
    }
  };

  const reserveSlot = async () => {
    const slot = await axios.post('https://car-parking-management-system.herokuapp.com/reserve_slot', {
      customerId: Customer?.id || null,
      carId: Car?.id || null,
      Name: Name || Customer.Name,
      Phone_Num: Phone_Num,
      Car_Plate_Numbers: cpn,
      Car_Plate_Letters: cpl,
      Color: Color || Car.Color,
      Model: Model || Car.Model,
      rate: 100
    });

    if(slot.data){
      setReserved(true);
      setPayment(slot.data.paymentId);
      setSlot(slot.data.slot);
    }
  };

  const form = (
  <div>
    <div className="Header">
      <div onClick={() => setPage('Home')}>
      <IoArrowBack size={27} />
      </div>
      <h2 className="HearderTitle">Reserve a Slot</h2>
    </div>
    <div className="InputDiv">
      <label for="Phone_Num">Phone Number:</label>
      <input id="Phone_Num"  className="Input" type="text" name="Phone_Num" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} value={Phone_Num} disabled={foundCustomer} />
    </div>
    { foundCustomer === null ? <button className="Button-Width Buttons" onClick={() => findCustomer()}><IoSearch /></button> : null}
    {foundCustomer === null ? null : foundCustomer ===  true ?
    <div className="InputDiv">
      <label for="Name">Full Name:</label>
      <input id="Name"  className="Input" type="text"  value={Customer.Name} disabled />
    </div>
    : 
    <div className="InputDiv">
          <label for="Name">Full Name:</label>
          <input id="Name"  className="Input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={Name} />
        </div>
    }
    {
      foundCustomer !== null ?
      <div>
        <div className="InputDiv">
        <label for="cpn">Car Plate Numbers:</label>
        <input id="cpn"  className="Input" type="text" name="cpn" placeholder="Car Plate Numbers" onChange={(e) => setCpn(e.target.value)} value={cpn} disabled={foundCar}  />
        </div>
        <div className="InputDiv">
        <label for="cpl">Car Plate Letters:</label>
        <input id="cpl"  className="Input" type="text" name="cpl" placeholder="Car Plate Letters" onChange={(e) => setCpl(e.target.value)} value={cpl} disabled={foundCar} />
        </div>
        {foundCar === null ? <button className="Buttons Button-Width" onClick={() => findCar()}><IoSearch /></button> : null}
      </div>
      :
      null
    }
    {
      foundCar === null ? null : foundCar === true ?
      <div>
        <div className="InputDiv">
          <label for="color">Color:</label>
          <input id="color"  className="Input" type="text"  value={Car.Color} disabled />
        </div>
        <div className="InputDiv">
          <label for="Model">Model:</label>
          <input id="Model"  className="Input" type="text"  value={Car.Model} disabled />
        </div>
      </div>
      :
      <div>
        <div className="InputDiv">
          <label for="color">Color:</label>
          <input id="color"  className="Input" type="text" placeholder="Color" onChange={(e) => setColor(e.target.value)} value={Color} />
        </div>
        <div className="InputDiv">
          <label for="Model">Model:</label>
          <input id="Model"  className="Input" type="text" placeholder="Model" onChange={(e) => setModel(e.target.value)} value={Model} />
        </div>
      </div>
    }
    {foundCar !== null ? <button className="Buttons Button-Width" onClick={() => reserveSlot()}>Reserve Slot</button> : null}
  </div>
  );

  const slotNumber = (
    <div>
      <h1>your Reservation number is {payment}</h1>
      <div className="Results">
      <h4>Slot number: {slot.Number}</h4>
      <h4>Level: {slot.Level}</h4>
      <h4>Direction: {slot.Direction}</h4>
      </div>
      <button className="Buttons" onClick={() => setPage('Home')}>Return</button>
    </div>
  );

  if(reserved){
    return slotNumber;
  }else{
    return form;
  }
}

export default Reserve;
