import React from "react";
import video from "../video/video-4.mp4";
import PopupButtonSignUp from "./PopupButtonSignUp";
import firebase from "firebase";
import { useHistory } from "react-router";
import styled from "styled-components";

const Video = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
`;

const LogInContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
  object-fit: contain;
`;

const LogInTitle = styled.h1`
  color: #fff;
  font-size: 80px;
  margin-top: -100px;
`;

const LogInSubTitle = styled.p`
  margin-top: -20px;
  color: #fff;
  font-size: 32px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

const LogInput = styled.input`
  background-color: whitesmoke;
  padding: 8px 25px;
  border-radius: 13px;
  margin-right: 10px;
  outline: none;
  border: none;
  font-size: 18px;
  margin-bottom: 16px;
  border: 1px solid #eae8e4;
  width: 300px;
`;

const Email = styled.div`
  margin-top: 15px;
`;

const NativeLoginBtn = styled.div`
  color: white;
  padding: 12px 20px;
  border: 1px gray;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
  background: #00bfac;
  font-size: 18px;
`;

const FacebookLoginBtn = styled.div`
  color: white;
  padding: 12px 20px;
  border: 1px gray;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
  background: #002b7a;
  font-size: 20px;
`;
const GoogleLoginBtn = styled.div`
  color: white;
  padding: 12px 20px;
  border: 1px gray;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
  background: black;
  font-size: 20px;
`;

function HeroSectionLogin() {
  const history = useHistory();
  const [LoginEmail, setLoginEmail] = React.useState("");
  const [LoginPassword, setLoginPsaaword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const fbLogin = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((user) => {
        console.log(user);
        // createUserDoc(user, userName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((user) => {
        console.log(user);
        history.push("/");
        // createUserDoc(user, userName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function onSubmit() {
    firebase

      .auth()
      .signInWithEmailAndPassword(LoginEmail, LoginPassword)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage(" Incorrect Email format");
            break;
          default:
        }

        switch (error.code) {
          case "auth/wrong-password":
            setErrorMessage(" Wrong password");
            break;
          default:
        }
      });
  }

  return (
    <LogInContainer>
      <Video src={video} autoPlay loop muted></Video>
      <LogInTitle>Welcome back!</LogInTitle>
      <LogInSubTitle>Let's get you intside.</LogInSubTitle>

      <form>
        <GoogleLoginBtn onClick={googleLogin}>Google log in</GoogleLoginBtn>
        <FacebookLoginBtn onClick={fbLogin}>Facebook log in</FacebookLoginBtn>
        <form>
          <Email>
            <LogInput
              placeholder="Email"
              value={LoginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            ></LogInput>
          </Email>

          <LogInput
            placeholder="Password"
            value={LoginPassword}
            onChange={(e) => setLoginPsaaword(e.target.value)}
          ></LogInput>

          {errorMessage && <h6 style={{ color: "white" }}>{errorMessage}</h6>}
          <NativeLoginBtn
            onClick={() => {
              setErrorMessage("");
              onSubmit();
            }}
          >
            Log in
          </NativeLoginBtn>
        </form>
        <PopupButtonSignUp />
      </form>
    </LogInContainer>
  );
}

export default HeroSectionLogin;
