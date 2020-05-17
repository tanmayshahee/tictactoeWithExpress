import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./userinfo.css";
const UserInfo = (props) => {
  useEffect(() => {
    axios.post("api/addUser", { userInfo: props.userInfo }).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div className="user-info-parent">
      <div className="welcome-msg">
        {`Welcome `} <span className="user-name">{props.userInfo.name}</span>
      </div>
      <div className="email">{props.userInfo.email}</div>
      <div className="image">
        <img src={props.userInfo.imageUrl} alt="" />
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  ...props,
  userInfo: state.login.userInfo,
});

export default connect(mapStateToProps, null)(UserInfo);
