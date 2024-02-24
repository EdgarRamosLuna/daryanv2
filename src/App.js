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
import Users from "./pages/admin/Users";
import Clients from "./pages/admin/Clients";
import Employees from "./pages/admin/Employees";
import Create2 from "./pages/employee/Create2";
import View from "./pages/admin/reports/View";
import ViewClient from "./pages/client/reports/View";
import View2 from "./pages/employee/reports/View";
import View3 from "./pages/employee/reports/View2";
import View4 from "./pages/admin/reports/View2";
import View5 from "./pages/client/reports/View";
import Suppliers from "./pages/admin/Suppliers";
import Create3 from "./pages/employee/Create3";
import PdfTest from "./Test";
import InspectionReport from "./components/pdf/InspectionReport";
import NoFound404 from "./404";
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login3 />} />
        <Route exact path="/pdf" element={<PdfTest />} />
        <Route element={<Header />}>
        <Route path="*" element={<NoFound404 />} />
          <Route exact path="/user/reports" element={<Reports />} />
          <Route exact path="/user/reports/create/1" element={<Create />} />
          <Route exact path="/user/reports/create/2" element={<Create2 />} />
          <Route exact path="/user/reports/create/2/:t" element={<Create3 />} />
          <Route exact path="/admin/reports" element={<Reports3 />} />
          <Route exact path="/admin/reports_insp/:id" element={<View />} />
          <Route exact path="/user/reports_insp/:id" element={<View2 />} />
          <Route exact path="/client/reports_insp/:id" element={<ViewClient />} />
          <Route exact path="/user/reports_by_h/:id" element={<View3 />} />
          <Route exact path="/admin/reports_by_h/:id" element={<View4 />} />
          <Route exact path="/admin/users" element={<Users />} />                  
          <Route exact path="/admin/clients" element={<Clients />} />
          <Route exact path="/admin/employees" element={<Employees/>} />
          <Route exact path="/admin/suppliers" element={<Suppliers/>} />
          <Route exact path="/client/reports" element={<Reports2 />} />
          <Route exact path="/client/reports/:id" element={<View5 />} />
        </Route>
        <Route exact path="/reporte_inspeccion/:id" element={<InspectionReport />} />
        <Route exact path="/user/login" element={<Login />} />
        <Route exact path="/client/login" element={<Login2 />} />
        <Route exact path="/admin/login" element={<Login3 />} />
      </Routes>
    </div>
  );
}

export default App;
