import axios from "axios";
const serverUrl = "http://localhost/daryan-server";
const serverApi = axios.create({
  baseURL: `${serverUrl}/api/`,
});
//User API
export const getUser = (id) => serverApi.post("/get_user/", id);
export const createUser = (data) => serverApi.post("/create_user/", data);
// Employee API
export const createEmployee = (data) =>
  serverApi.post("/create_employee/", data);
export const getEmployee = (id) => serverApi.post("/get_employee/", id);

// Client API
export const createClient = (data) => serverApi.post("/create_client/", data);
export const deleteClient = (id) =>
  serverApi.post("/delete_client/", id, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });
export const statusClient = (id, status) =>
  serverApi.post("/status_client/", id, {
    headers: {
      Authorization: `Bearer 125465`,
    },
  });

export const getClients = () => serverApi.get("/get_clients/");
//export const getClients = () => serverApi.get("/get_clients/");

// Supplier API
export const getSuppliers = () => serverApi.get("/get_suppliers/");
export const createSupplier = (data) =>
  serverApi.post("/create_supplier/", data);
