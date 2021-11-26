import React from "react";
import Popup from "reactjs-popup";
import "./PopupButton.css";
import StarRating from "./StarRating";
import firebase from "firebase";
import styled from "styled-components";

const TripsCardEvaluate = styled.button`
  width: 70px;
  height: 30px;
  color: white;
  border: none;
  background-color: #fbba05;
  margin-top: 30px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
`;

function PopupIsCommented(props) {
  const [review, setReview] = React.useState();
  const [comment, setComment] = React.useState();
  const [selection, setSelection] = React.useState(0);
  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    // console.log(firebase.auth().currentUser.uid);
    firebase
      .firestore()
      .collection("comment")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .where("itemID", "==", props.itemID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setComment(doc.data());
        });
      });
  }, []);

  return (
    <Popup
      trigger={<TripsCardEvaluate> 查看評論 </TripsCardEvaluate>}
      modal
      nested
    >
      {comment
        ? (close) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header"> 查看評論 </div>
              <div className="content">
                {" "}
                <div className="content-input">
                  Stars:
                  <StarRating
                    setSelection={setSelection}
                    setRating={setRating}
                    selection={selection}
                    rating={parseInt(comment.rating, 10)}
                  />
                </div>
                <br />
                <div className="content-input">
                  Reviews:
                  {comment.review}
                </div>
              </div>
              <div className="actions"></div>
            </div>
          )
        : ""}
    </Popup>
  );
}

export default PopupIsCommented;
