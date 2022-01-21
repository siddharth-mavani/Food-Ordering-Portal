import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./components/common/Home";
import Navbar from "./components/templates/Navbar";
import BuyerProfile from "./components/UserProfiles/BuyerProfile";
import VendorProfile from "./components/UserProfiles/VendorProfile";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Register";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="buyerprofile" element={<BuyerProfile />} />
          <Route path="vendorprofile" element={<VendorProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
