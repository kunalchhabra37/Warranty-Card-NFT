import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import IssueWarranty from "./components/IssueWarranty";
import Welcome from "./components/Welcome";
import CheckAuthenticity from "./components/CheckAuthenticity";
import Service from "./components/Service";
import GrantRole from "./components/GrantRole";
import RevokeRole from "./components/RevokeRole";
import CheckExpiry from "./components/CheckExpiry";
import SafeTrasferFrom from "./components/SafeTrasferFrom";
import GetNFT from "./components/GetNFT";
import ViewNFT from "./components/ViewNFT";
import GetTokenId from "./components/getTokenId";
import Unautherised from "./components/Unautherised";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { useContext } from "react";
import { WarrantyCardContext } from "./context/WarrantyCardContext";

function App() {
  const {
    connectedWallet,
    minterRole,
    minterRoleAdmin,
    serviceProvider,
    serviceProviderAdmin,
  } = useContext(WarrantyCardContext);
  return (
    <div className="App">
      <ToastContainer />
        <BrowserRouter>
      <NavBar />
      <div className="form-style">
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route
              path="issue-warranty"
              element={
                connectedWallet && minterRole ? (
                  <IssueWarranty />
                ) : (
                  <Unautherised />
                )
              }
            ></Route>
            <Route
              path="check-authenticity"
              element={
                connectedWallet ? <CheckAuthenticity /> : <Unautherised />
              }
            ></Route>
            <Route
              path="service"
              element={
                connectedWallet && serviceProvider ? (
                  <Service />
                ) : (
                  <Unautherised />
                )
              }
            ></Route>
            <Route
              path="grant-role"
              element={
                connectedWallet && (serviceProviderAdmin || minterRoleAdmin) ? (
                  <GrantRole />
                ) : (
                  <Unautherised />
                )
              }
            ></Route>
            <Route
              path="revoke-role"
              element={
                connectedWallet && (serviceProviderAdmin || minterRoleAdmin) ? (
                  <RevokeRole />
                ) : (
                  <Unautherised />
                )
              }
            ></Route>
            <Route
              path="check-expiry"
              element={connectedWallet ? <CheckExpiry /> : <Unautherised />}
            ></Route>
            <Route
              path="get-token-id"
              element={connectedWallet ? <GetTokenId /> : <Unautherised />}
            ></Route>
            <Route
              path="transfer"
              element={connectedWallet ? <SafeTrasferFrom /> : <Unautherised />}
            ></Route>
            <Route
              path="get-warranty-card"
              element={connectedWallet ? <GetNFT /> : <Unautherised />}
            ></Route>
            {/* <Route path="view-nft" element={<ViewNFT />}></Route> */}
          </Routes>
      </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
