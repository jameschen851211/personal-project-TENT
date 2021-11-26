import React from "react";
import Popup from "reactjs-popup";
import "./PopupButton.css";
import StarRating from "./StarRating";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2/dist/sweetalert2.js";

const TripsCardEvaluate = styled.button`
  width: 70px;
  height: 30px;
  color: white;
  border: none;
  background-color: #40d9ac;
  margin-top: 30px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
`;

function PopupButton(props) {
  console.log(props);
  const [review, setReview] = React.useState();
  const history = useHistory();
  const [selection, setSelection] = React.useState(0);
  const [rating, setRating] = React.useState(0);

  function onSubmit() {
    const commentID = firebase.firestore().collection("comment").doc().id;
    // const successfullyOrderID = firebase
    //   .firestore()
    //   .collection("successfullyOrderID")
    //   .doc().id;
    firebase
      .firestore()
      .collection("comment")
      .doc(commentID)
      .set({
        itemID: props.itemID,
        review,
        selection,
        createdAt: firebase.firestore.Timestamp.now(),
        rating,
        photoURL: firebase.auth().currentUser.photoURL || "",
        email: firebase.auth().currentUser.email,
        uid: firebase.auth().currentUser.uid,
      })
      .then(() => {
        firebase
          .firestore()
          .collection("product")
          .doc(props.itemID)
          .get()
          .then((doc) => doc.data())
          .then((res) => {
            const data = { commentCount: res.commentCount + 1 };
            firebase
              .firestore()
              .collection("product")
              .doc(props.itemID)
              .update(data);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("successfullyOrder")
              .where("uid", "==", firebase.auth().currentUser.uid)
              .where("itemID", "==", props.itemID)
              .get()
              .then((collectionSnapshot) => {
                const docID = collectionSnapshot.docs[0].id;
                firebase
                  .firestore()
                  .collection("successfullyOrder")
                  .doc(docID)
                  .update({
                    isCommented: true,
                  });
              });
          })
          .then(() => {
            Swal.fire("已成功完成評價");
            history.push("/");
          });
      });
  }

  return (
    <Popup trigger={<TripsCardEvaluate> 評論 </TripsCardEvaluate>} modal nested>
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> 評論 </div>
          <div className="content">
            {" "}
            <div className="content-input">
              Stars:
              <StarRating
                setSelection={setSelection}
                setRating={setRating}
                selection={selection}
                rating={rating}
              />
            </div>
            <br />
            <div className="content-input">
              Reviews:
              <input
                className="popupInput"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="actions">
            <button className="sendout__button" onClick={() => onSubmit()}>
              送出
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default PopupButton;
