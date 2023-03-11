import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Reports from "./pages/user/Reports";
import Reports2 from "./pages/client/Reports";
import Reports3 from "./pages/admin/Reports";
import Login from "./components/Login";
import Login3 from "./components/Login3";
import Login2 from "./components/Login2";
import Create from "./pages/user/Create";
import Settings from "./pages/user/Settings";
import Users from "./pages/admin/Users";
import Clients from "./pages/admin/Clients";
import Employees from "./pages/admin/Employees";
import Create2 from "./pages/user/Create2";
import CreateUser from "./pages/admin/users/Create";
import View from "./pages/admin/reports/View";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login3 />} />
        <Route element={<Header />}>
          <Route exact path="/user/reports" element={<Reports />} />
          <Route exact path="/user/reports/create/1" element={<Create />} />
          <Route exact path="/user/reports/create/2" element={<Create2 />} />
          <Route exact path="/user/my-account" element={<Settings />} />
          <Route exact path="/admin/reports" element={<Reports3 />} />
          <Route exact path="/admin/reports/:id" element={<View />} />
          <Route exact path="/admin/users" element={<Users />} />
          
          <Route exact path="/admin/clients" element={<Clients />} />
          <Route exact path="/admin/employees" element={<Employees/>} />
          <Route exact path="/admin/my-account" element={<Settings />} />
          <Route exact path="/client/reports" element={<Reports2 />} />
          <Route exact path="/client/my-account" element={<Settings />} />
        </Route>
        <Route exact path="/user/login" element={<Login />} />
        <Route exact path="/client/login" element={<Login2 />} />
        <Route exact path="/admin/login" element={<Login3 />} />
      </Routes>
    </div>
  );
}

export default App;
