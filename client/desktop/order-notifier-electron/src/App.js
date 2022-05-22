import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import EditMenu from './pages/EditMenu'
import Menu from './pages/Menu'
import Navbar from './components/Navbar';
import 'bulma/css/bulma.css'
import CurrentOrderContext from './contexts/CurrentOrderContext'

function App() {

  const [currentOrderState, setCurrentOrderState] = useState([]);

  return (
    <div>
      <CurrentOrderContext.Provider value={{ currentOrderState, setCurrentOrderState }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <div>
              <Routes>
                <Route path='/' element={<Menu />} />
                <Route path='/editMenu' element={<EditMenu />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </CurrentOrderContext.Provider>
    </div>
  );
}

export default App;
