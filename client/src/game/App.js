import React, { useEffect } from "react";
import AppLogin from "../login/AppLogin";
import { connect } from "react-redux";
import TicTacToeWrapper from "./TicTacToeWrapper";
import { gapi } from "gapi-script";
import { setUserInfo, toggleLoginState } from "../actions/login";

const App = (props) => {
  let auth2;
  useEffect(() => {
    if (typeof gapi !== "undefined") {
      gapi.load("auth2", function () {
        auth2 = gapi.auth2.init({
          client_id:
            "367951278487-fnqit31fsl8123a8mo6kpo368shi0t9s.apps.googleusercontent.com",
        });
        auth2.isSignedIn.listen(signinChanged);
        auth2.currentUser.listen(userChanged); // This is what you use to listen for user changes
      });
    }
  }, []);

  function signinChanged(val) {
    console.log("Signin state changed to ", val);
    props.toggleLoginState({ isUserLoggedIn: val });
  }

  // function signOut() {
  //   auth2.signOut().then(function () {
  //     console.log("User signed out.");
  //   });
  // }

  function userChanged(user) {
    if (user.getId()) {
      // set user info
      let userInfo = {
        id: user.getBasicProfile().getId(),
        name: user.getBasicProfile().getName(),
        email: user.getBasicProfile().getEmail(),
        imageUrl: user.getBasicProfile().getImageUrl(),
      };
      props.setUserInfo({ userInfo });
    }
  }

  return (
    <div className="main-app">
      {props.isUserLoggedIn ? <TicTacToeWrapper /> : <AppLogin />}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  ...props,
  isUserLoggedIn: state.login.isUserLoggedIn,
  userInfo: state.login.userInfo,
});

const mapDispatchToProps = {
  setUserInfo,
  toggleLoginState,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
