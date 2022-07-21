import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar"
import IssueWarranty from "./components/IssueWarranty"
import Welcome from "./components/Welcome"
import CheckAuthenticity from "./components/CheckAuthenticity"
import Approve from "./components/Approve"
import GrantRole from "./components/GrantRole"
import RevokeRole from "./components/RevokeRole"
import CheckExpiry from "./components/CheckExpiry"
import SafeTrasferFrom from "./components/SafeTrasferFrom"
import GetNFT from "./components/GetNFT";
import ViewNFT from "./components/ViewNFT";
import { ToastContainer, toast } from "react-toastify";
import './App.css'
// import { useContext } from 'react';
// import { WarrantyCardContext } from './context/WarrantyCardContext';


function App() {
// const { value } = useContext(WarrantyCardContext);
// console.log(value)
  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
            <div className="form-style">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Welcome />}></Route>
                  <Route path="issue-warranty" element={<IssueWarranty />}></Route>
                  <Route path="check-authenticity" element={<CheckAuthenticity />}></Route>
                  <Route path="approve" element={<Approve />}></Route>
                  <Route path="grant-role" element={<GrantRole />}></Route>
                  <Route path="revoke-role" element={<RevokeRole />}></Route>
                  <Route path="check-expiry" element={<CheckExpiry />}></Route>
                  <Route path="transfer" element={<SafeTrasferFrom />}></Route>
                  <Route path="get-warranty-card" element={<GetNFT />}></Route>
                  <Route path="view-nft" element={<ViewNFT />}></Route>
                </Routes>
              </BrowserRouter>
          </div>
        </div>
  )
}

export default App
