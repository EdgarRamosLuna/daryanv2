import axios from "axios";
const serverUrl = "http://localhost/daryan-server";
const serverApi = axios.create({
  baseURL: `${serverUrl}/api/`,
});
//User API
export const getUser = (id) => serverApi.post("/get_user/", id);
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

// Employee API
export const getEmployee = (id) => serverApi.post("/get_employee/", id);
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
