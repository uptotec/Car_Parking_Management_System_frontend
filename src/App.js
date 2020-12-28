import * as React from 'react';
import './App.css';
import Home from './components/home/home';
import Receive from './components/receive/receive';
import Reserve from './components/reserve/reserve';

function App() {
  const [page, setPage] = React.useState('Home');

  return (
    <div className="App">
      <div className="Container">
     { page === 'Home' ? <Home setPage={setPage} /> : page === 'Reserve' ? <Reserve setPage={setPage} />: <Receive setPage={setPage} />}
      </div>
    </div>
  );
}

export default App;
