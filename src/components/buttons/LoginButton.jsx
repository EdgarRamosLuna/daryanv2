import React from 'react'

const LoginButton = ({loader, hoverBtnsStyle}) => {
    return (
   
            <button type="submit" disabled={loader === true ? true : false} style={loader === true ? hoverBtnsStyle : {}}>
                {loader ? (
                    <img src="/assets/img/loading.svg" alt="" style={{ height: "100%" }} />
                ) : (
                    "Ingresar"
                )}
            </button>
        
    )
}

export default LoginButton