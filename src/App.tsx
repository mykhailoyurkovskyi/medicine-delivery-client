import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './layouts/Footer/Footer';
import Home from './layouts/Home/Home';
import MedicineDetails from './pages/MedicineDetail/MedicineDetail';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <div className="overflow-hidden">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/medicine/:id' element={<MedicineDetails />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
        <Sidebar />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
