import * as React from 'react'
import {IoArrowBack} from 'react-icons/io5';
import axios from 'axios';

import './receive.css';

const Receive = ({setPage}) => {
  const [cpn, setCpn] = React.useState(null);
  const [cpl, setCpl] = React.useState(null);
  const [payment, setPayment] = React.useState(null);
  const [payed, setPayed] = React.useState(false);
  const [paymentInfo, setPaymentInfo] = React.useState(false);
  
  const getPayment = async () => {
    if(!payment && !cpl && !cpn){
      return;
    }
    let paymentDetails;
    if(payment){
      paymentDetails = await axios.post('https://car-parking-management-system.herokuapp.com/finish_payment', {paymentId: payment});
    }else{
      paymentDetails = await axios.post('https://car-parking-management-system.herokuapp.com/finish_payment', {Car_Plate_Numbers: cpn, Car_Plate_Letters: cpl});
    }

    if(paymentDetails.data){
      setPaymentInfo(paymentDetails.data);
      setPayed(true);
    }
  };

  const form = (
    <div>
      <div className="Header">
        <div onClick={() => setPage('Home')}>
          <IoArrowBack size={27} />
        </div>
        <h2 className="HearderTitle">Receive a Payment</h2>
      </div>
      <div className="InputDiv">
          <label for="reservation">Reservation number:</label>
          <input id="reservation"  className="Input" type="text" name="reservation" placeholder="Reservation number" value={payment} onChange={(e) => setPayment(e.target.value)} />
      </div>
      <h3>or</h3>
      <div className="InputDiv">
          <label for="cpn">Car Plate Numbers:</label>
          <input id="cpn"  className="Input" type="text" name="cpn" placeholder="Car Plate Numbers" value={cpn} onChange={(e) => setCpn(e.target.value)}  />
      </div>
      <div className="InputDiv">
          <label for="cpl">Car Plate Letters:</label>
          <input id="cpl"  className="Input" type="text" name="cpl" placeholder="Car Plate Letters" value={cpl} onChange={(e) => setCpl(e.target.value)}  />
      </div>
      <button className="Buttons Button-Width" onClick={() => getPayment()}>Pay now</button>
    </div>
  );

  const paymentScreen = (
    <div>
      <h2>Your Payment Details</h2>
      <h5>Enter time: {new Date(paymentInfo.Entering_Time).toLocaleString()}</h5>
      <h5>Exit time: {new Date(paymentInfo.Exit_Time).toLocaleString()}</h5>
      <h5>Duration: {parseFloat(paymentInfo.Duration_Time).toFixed(2)} Hours</h5>
      <h5>Cost Per Hour: {parseFloat(paymentInfo.Hourly_Rate).toFixed(2)} EGP</h5>
      <h5>Total cost: {parseFloat(paymentInfo.cost).toFixed(2)} EGP</h5>
       <button className="Buttons" onClick={() => setPage('Home')}>Return</button>
    </div>
  );

  if(!payed){
    return form;
  }else{
    return paymentScreen;
  }
}

export default Receive;
