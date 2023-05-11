import React, { useContext } from "react";
import { AuthUsersContainer, Table } from "../../styles/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { MainContext } from "../../context/MainContext";

const AuthUsers = ({ data }) => {
  //console.log(data);
  const { toast } = useContext(MainContext);
  const deleteAU = (id) => {
    const confirm = window.confirm(
      "Estas seguro de borrar este usuario de la lista de autorizados?"
    );
    if (confirm) {
        toast.success(
            "Usuario borrado correctamente",
            {
              duration: 5000,
            }
          );
    }
  };
  return (
    <AuthUsersContainer>
      <h3>Usuarios autorizados</h3>
      <div className="list-users">
        {/* <ul>
                <li>Usuario</li>
                <li>Status</li>
                <li>Fecha de autorizacion</li>
                {data.map((user, i) => {
                    return (
                        <li key={user.id+'client'}>
                            
                            {i === 0 && user.fullname}

                        </li>
                    )
                } )}
            </ul>
             */}
        <Table>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Status</th>
                <th>Fecha de autorizacion</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, i) => {
                return (
                  <tr key={user.id + "client"}>
                    <td>{user.fullname}</td>
                    <td>{user.status === "1" ? "Activo" : "Inactivo"}</td>
                    <td>{user.auth_date}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={(e) => deleteAU(user.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Table>
      </div>
    </AuthUsersContainer>
  );
};

export default AuthUsers;
