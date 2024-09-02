import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import UserRegistration from './components/UserRegistration';
import Login from './components/Login';
import Footer from './components/Footer';
import Header from './components/Header';
import Admin from './components/Admin';
import PetSupplies from './components/PetSupplies';
import FindYourPet from './components/FindYourPet';
import ManageCart from './components/ManageCart';
import MakePayment from './components/MakePayment';
import VeterinaryServices from './components/VeterinaryServices';
import Buyer from './components/Buyer';
import Seller from './components/Seller';


function App() {
  return (
    <div>
      <Router>
        {/* <Header />  */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/seller/*" element={<Seller />} />
            <Route path="/buyer" element={<Buyer />} />
            <Route path="/pets" element={<FindYourPet />} />
            <Route path="/manage-cart" element={<ManageCart />} />
            <Route path="/make-payment" element={<MakePayment />} />
            <Route path="/supplies" element={<PetSupplies />} />
            <Route path="/clinics" element={<VeterinaryServices />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
