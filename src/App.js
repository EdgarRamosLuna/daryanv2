import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Reports from "./pages/employee/Reports";
import Reports2 from "./pages/client/Reports";
import Reports3 from "./pages/admin/Reports";
import Login from "./components/Login";
import Login3 from "./components/Login3";
import Login2 from "./components/Login2";
import Create from "./pages/employee/Create";
import Settings from "./pages/employee/Settings";
import Settings2 from "./pages/admin/Settings";
import Users from "./pages/admin/Users";
import Clients from "./pages/admin/Clients";
import Employees from "./pages/admin/Employees";
import Create2 from "./pages/employee/Create2";
import CreateUser from "./pages/admin/users/Create";
import View from "./pages/admin/reports/View";
import View2 from "./pages/employee/reports/View";
import View3 from "./pages/employee/reports/View2";
import View4 from "./pages/admin/reports/View2";
import View5 from "./pages/client/reports/View";
import View6 from "./pages/client/reports/View2";
import Suppliers from "./pages/admin/Suppliers";
import Create3 from "./pages/employee/Create3";
import { MainContext } from "./context/MainContext";
import { useContext } from "react";
import { useEffect } from "react";
import { checkUser } from "./api/daryan.api";
import PdfTest from "./Test";
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login3 />} />
        <Route exact path="/pdf" element={<PdfTest />} />
        <Route element={<Header />}>
        <Route path="*" element={<Reports3 />} />
          <Route exact path="/user/reports" element={<Reports />} />
          <Route exact path="/user/reports/create/1" element={<Create />} />
          <Route exact path="/user/reports/create/2" element={<Create2 />} />
          <Route exact path="/user/reports/create/2/:t" element={<Create3 />} />
          {/* <Route exact path="/user/my-account" element={<Settings />} /> */}
          {/* <Route exact path="/admin/my-account" element={<Settings2 />} /> */}
          <Route exact path="/admin/reports" element={<Reports3 />} />
          <Route exact path="/admin/reports/:id" element={<View />} />
          <Route exact path="/user/reports/:id" element={<View2 />} />
          <Route exact path="/user/reports/2/:id" element={<View3 />} />
          <Route exact path="/admin/reports/2/:id" element={<View4 />} />
          <Route exact path="/admin/users" element={<Users />} />
          
          <Route exact path="/admin/clients" element={<Clients />} />
          <Route exact path="/admin/employees" element={<Employees/>} />
          <Route exact path="/admin/suppliers" element={<Suppliers/>} />
          {/* <Route exact path="/admin/my-account" element={<Settings />} /> */}
          <Route exact path="/client/reports" element={<Reports2 />} />
          <Route exact path="/client/reports/:id" element={<View5 />} />
          {/* <Route exact path="/client/my-account" element={<Settings />} /> */}
        </Route>
        <Route exact path="/user/login" element={<Login />} />
        <Route exact path="/client/login" element={<Login2 />} />
        <Route exact path="/admin/login" element={<Login3 />} />
      </Routes>
    </div>
  );
}

export default App;
