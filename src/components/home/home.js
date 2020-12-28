import React from 'react'
import './home.css';
import axios from 'axios';

export const Home = ({setPage}) => {

  const [count, setCount] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const res = await axios.get('https://car-parking-management-system.herokuapp.com/empty');
      setCount(res.data.count);
      if(res.data.count === 0){
        setDisabled(true);
      }
    })()
  },[]);

  return (
    <div>
      <h2>Parking Management System</h2>
      {count ? `Empty Slots is ${count}` : ''}
      <div>
        <button className="Buttons" disabled={disabled} onClick={() => setPage('Reserve')}>Reserve Slot</button>
        <button className="Buttons" onClick={() => setPage('Receive')}>Receive Payment</button>
      </div>
    </div>
  )
}

export default Home;