import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./components/common/Home";
import Navbar from "./components/templates/Navbar/Navbar";
import BuyerProfile from "./components/UserProfiles/Buyer/BuyerProfile";
import VendorProfile from "./components/UserProfiles/Vendor/VendorProfile";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Register";
import Wallet from "./components/wallet/Wallet";
import BuyerDashboard from "./components/Dashboard/BuyerDashboard/BuyerDashboard";
import Favourite from "./components/Favourite/Favourite";
import MyOrders from "./components/myOrders/myOrders";

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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buyerprofile" element={<BuyerProfile />} />
          <Route path="/vendorprofile" element={<VendorProfile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/buyerdashboard" element={<BuyerDashboard />} />
          <Route path="/favourites" element={<Favourite />} />
          <Route path="/orders" element={<MyOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
