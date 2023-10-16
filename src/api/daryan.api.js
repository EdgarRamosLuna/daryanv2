import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const serverApi = axios.create({
  baseURL: `${serverUrl}/api/`,
});
//User API
export const getUser = (id) => serverApi.post("/get_user/", id);
export const createIncident = (data, token) =>
serverApi.post("/create_incident/", data, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
 //serverApi.post("/create_incident/", data);
export const createUser = (data) => serverApi.post("/create_user/", data);
export const updateUser = (data) => serverApi.post("/update_user/", data);
export const deleteUser = (id) =>
  serverApi.post("/delete_user/", id, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
export const statusUser = (data) =>
  serverApi.post("/status_user/", data, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
export const loginUser = (data) => serverApi.post("/login/", data);
export const checkUser = (token) =>
  serverApi.get("/check_user/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Employee API
export const getEmployee = (id) => serverApi.post("/get_employee/", id);

export const getEmployReports = (token) =>
  serverApi.get("/get_employ_reports/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getEmployReportsByH = (token) =>
  serverApi.get("/get_employ_reports_by_h/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const createEmployee = (data) =>
  serverApi.post("/create_employee/", data);
export const updateEmployee = (data) =>
  serverApi.post("/update_employee/", data);
export const deleteEmployee = (id) =>
  serverApi.post("/delete_employee/", id, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
export const statusEmployee = (data) =>
  serverApi.post("/status_employee/", data, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
export const loginEmployee = (data) => serverApi.post("/login2/", data);
export const checkEmployee = (token) =>
  serverApi.get("/check_employee/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Client API
export const getClients = () => serverApi.get("/get_clients/");
export const getAuthClients = (id) => serverApi.post("/get_auth_clients/", id);
export const getClientsInfo = () => serverApi.get("/get_client/");
export const createClient = (data) => serverApi.post("/create_client/", data);
export const updateClient = (data) => serverApi.post("/update_client/", data);
export const deleteClient = (id) =>
  serverApi.post("/delete_client/", id, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
export const deleteAuthClient = (id) =>
  serverApi.post("/delete_auth_client/", id, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
export const statusClient = (data) =>
  serverApi.post("/status_client/", data, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
export const statusAuthClient = (data) =>
  serverApi.post("/status_auth_client/", data, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });

export const authClients = (data) =>
  serverApi.post("/report_clients/", data, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });

export const authClients2 = (data) =>
  serverApi.post("/report_clients2/", data, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
export const loginClient = (data) => serverApi.post("/login3/", data);
export const checkClient = (token) =>
  serverApi.get("/check_client/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getClientReports = (token) =>
  serverApi.get("/get_client_reports/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
//export const getClients = () => serverApi.get("/get_clients/");

// Supplier API
export const getSuppliers = () => serverApi.get("/get_suppliers/");
export const createSupplier = (data) =>
  serverApi.post("/create_supplier/", data);
export const updateSupplier = (data) =>
  serverApi.post("/update_supplier/", data);
export const deleteSupplier = (id) =>
  serverApi.post("/delete_supplier/", id, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
export const statusSupplier = (data) =>
  serverApi.post("/status_supplier/", data, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
// Report API
export const deleteReportIn = (data) =>
  serverApi.post("/del_inc/", data, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
export const deleteReportItem = (data) =>
  serverApi.post("/del_itm/", data, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });

export const delReport = (id) =>
  serverApi.post("/del_report/", id, {
    headers: {
      Authorization: `Bearer 123456`,
    },
  });
export const getReportsByPartNumber = ({ partNumber, token }) =>
  serverApi.post(
    "/reports/grbpn/",
    { partNumber: partNumber },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
export const getReportsByPartNumberClient = ({ partNumber, token }) =>
  serverApi.post("/reports/grbpnc/", partNumber, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
export const saveReportToDb = ({ dataToSave, token }) =>
  serverApi.post("/save", dataToSave, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
export const saveReportHToDb = ({ dataReportH, token }) =>
  serverApi.post("/reportH_save", dataReportH, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
export const aproveReportHToDb = ({ dataReportH, token }) =>
  serverApi.post("/reportH_aprove", dataReportH, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const getReportsIns = (token) =>
  serverApi.get("/get/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getReportsByH = (token) =>
  serverApi.get("/get_rh", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getReportIncidents= (token) =>
  serverApi.get("/getReportIncidents", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
