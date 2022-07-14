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
import './App.css'
function App() {

  return (
    <div className="App">
      <NavBar />
      <div className="container main-page">
        <div className="row">
          <div className="col-md-6">
            <Welcome />
          </div>
          <div className="col-md-6">
            <div className="form-style">
              <BrowserRouter>
                <Routes>
                  <Route path="IssueWarranty" element={<IssueWarranty />}></Route>
                  <Route path="CheckAuthenticity" element={<CheckAuthenticity />}></Route>
                  <Route path="Approve" element={<Approve />}></Route>
                  <Route path="GrantRole" element={<GrantRole />}></Route>
                  <Route path="RevokeRole" element={<RevokeRole />}></Route>
                  <Route path="CheckExpiry" element={<CheckExpiry />}></Route>
                  <Route path="SafeTrasferFrom" element={<SafeTrasferFrom />}></Route>
                  <Route path="GetNFT" element={<GetNFT />}></Route>

                </Routes>
              </BrowserRouter>
              </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default App
