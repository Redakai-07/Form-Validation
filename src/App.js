import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BankDetails from './Component/BankDetails/BankDetails';
import VenderServices from './Component/VenderServices/VenderServices';
import VendorDetails from './Component/VendorDetails/VendorDetails';
import Modals from './Component/BankDetails/Modals';


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<VendorDetails />} />
        <Route path="/bank-details" element={<BankDetails />} />
        <Route path="/modals" element={<Modals />} />
        <Route path='/vendor-service' element={<VenderServices />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
