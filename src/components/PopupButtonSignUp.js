import React from "react";
import Popup from "reactjs-popup";

import Logo from "../imge/logo.png";
import firebase from "../utils/firebase";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const NativeSignupBtn = styled.div`
  background: #00bfac;
  font-size: 18px;
  color: white;
  padding: 12px 20px;
  border: 1px gray;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
`;

const Modal = styled.div`
  font-size: 23px;
`;

const SignupTitle = styled.div`
  width: 100%;
  font-size: 30px;
  text-align: center;
  padding: 5px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const SignupSubTitle = styled.div`
  width: 100%;
  font-size: 20px;
  text-align: center;
  padding: 5px;
  color: gray;
`;

const SignupAreas = styled.div`
  width: 100%;
  padding: 10px 5px;
`;

const SignupInput = styled.input`
  background: white;
  padding: 8px 20px;
  border-radius: 13px;
  margin-right: 10px;
  margin-top: 5px;
  outline: none;
  border: none;
  font-size: 18px;
  margin-bottom: 16px;
  border: 1px solid #eae8e4;
  width: 87%;
`;

const SignupLogo = styled.img`
  width: 75px;
  margin-bottom: -27px;
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

function PopupButtonSignUp() {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPsaaword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const fbSignUp = () => {
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
  const googleSignUp = () => {
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
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage(" This Email has already been registered");
            break;
          default:
        }
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage(" Incorrect Email format");
            break;
          default:
        }
        switch (error.code) {
          case "auth/weak-password":
            setErrorMessage(" Insufficient password strength");
            break;
          default:
        }
      });
  }

  return (
    <Popup trigger={<NativeSignupBtn>Sign up</NativeSignupBtn>} modal nested>
      {(close) => (
        <Modal>
          <button className="close" onClick={close}>
            X
          </button>
          <SignupTitle>
            Welcome to <SignupLogo src={Logo} alt="signup__logo" />
          </SignupTitle>
          <SignupSubTitle>
            Search, discover and book
            <br />
            Everywhere you want to camp.
          </SignupSubTitle>
          <SignupAreas>
            {" "}
            <form>
              <GoogleLoginBtn onClick={googleSignUp}>
                Google login
              </GoogleLoginBtn>
              <FacebookLoginBtn onClick={fbSignUp}>
                Facebook login
              </FacebookLoginBtn>
              <form>
                <div className="signup-name">
                  <SignupInput placeholder="name"></SignupInput>
                </div>
                <div className="signup-email">
                  <SignupInput
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></SignupInput>
                </div>
                <div className="signup-password">
                  <SignupInput
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPsaaword(e.target.value)}
                  ></SignupInput>
                </div>
                {errorMessage && (
                  <h6 style={{ color: "red" }}>{errorMessage}</h6>
                )}
                <NativeSignupBtn
                  onClick={() => {
                    setErrorMessage("");
                    onSubmit();
                  }}
                >
                  Sign up
                </NativeSignupBtn>
              </form>
            </form>
          </SignupAreas>
        </Modal>
      )}
    </Popup>
  );
}

export default PopupButtonSignUp;
