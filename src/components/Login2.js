import { useEffect, useState } from "react";
import style from "../styles/login.module.css";

export default function Login2() {
  const [user, setUser] = useState(" ");
  const [password, setPassword] = useState("");
  const cleanField = (e) => {
    setUser("");
    e.target.value = "";
  };

  const handleClick = (e) => {
    // console.log('Se ha clickeao');
    localStorage.setItem("sesType", "client");
    //router.push('/client/reports');
    window.location.replace("/client/reports");
    //clientouter
  };
  const [sesion, setSession] = useState(null);

  useEffect(() => {
    setSession(localStorage.getItem("sesType"));
    if (localStorage.getItem("sesType") === "client") {
      window.location.replace("/client/reports");
    }
  }, []);
  return (
    <main>
      <div className={style.login}>
        <div className={style.login_cont}>
          <div className={style.login_form}>
            <div className={style.input_container}>
              <label htmlFor="user">Usuario:</label>
              <input
                type="text"
                id="user"
                name=""
                value={user}
                onChange={(e) => setUser(e.target.value.replace(" ", ""))}
              />
            </div>
            <div className={style.input_container}>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={style.button_container}>
              <button onClick={(e) => handleClick(e)}>Entrar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
