import React from "react";
import GoogleLogin from "react-google-login";
import "./login.css";
const AppLogin = (props) => {
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div className="app-login-parent">
      <div className="title">Tic Tac Toe App</div>
      <div className="login-title">Login To Play</div>

      <div className="login-btn-wrapper">
        <GoogleLogin
          clientId="367951278487-fnqit31fsl8123a8mo6kpo368shi0t9s.apps.googleusercontent.com"
          buttonText="Login"
          className="login-button"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

// const mapStateToProps = (state, props) => ({
//   ...props,
// });

// const mapDispatchToProps = {
//   setUserInfo,
// };
// export default connect(mapStateToProps, mapDispatchToProps)(AppLogin);
export default AppLogin;
