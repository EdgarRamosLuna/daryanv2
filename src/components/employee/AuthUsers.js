import React, { useContext } from "react";
import { AuthUsersContainer, Table } from "../../styles/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { MainContext } from "../../context/MainContext";
import { deleteAuthClient } from "../../api/daryan.api";
import StatusBtn from "../StatusBtn";

const AuthUsers = ({ data, deleteAU }) => {
  //
  const { isAdmin, lang, t } = useContext(MainContext);

  return (
    <AuthUsersContainer>
      <h3>{t("Usuarios autorizados")}</h3>
      <div className="table-body table-reports"
      style={{
        width:"100%",
        textAlign:'center'
      }}
      >
        <Table>
          <table>
            <thead>
              <tr>
                <th>{t("Usuario")}</th>
                <th>{t("reports.status")}</th>
                <th>{t("Fecha de autorizacion")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, i) => {
                return (
                  <tr key={user.id + "client"}>
                    <td>{user.fullname}</td>
                    <td>
                      {isAdmin === true ? <StatusBtn
                        status={Number(user.status)}
                        id={user.id}
                        table="auth_clients"
                      />
                        : 
                        user.status === '1' ? <>
                        {
                          lang === 'es' ? <button className="active btn">Activo</button> : <button className="active btn">Active</button>
                        }

                        </> : <>
                        {
                          lang === 'es'? <button className="inactive btn">Inactivo</button> : <button className="inactive btn">Inactive</button>
                        }
                        </>
                    }
                    </td>
                    <td>{user.auth_date}</td>
                    <td>
                      {isAdmin === true && (
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={(e) => deleteAU(user.id)}
                        />
                      )}
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
