import React from "react";
import Popup from "reactjs-popup";
import { BiPencil } from "react-icons/bi";
import styled from "styled-components";
import firebase from "firebase";
// import { useHistory } from "react-router";

const Modal = styled.div`
  font-size: 23px;
`;

const Edit = styled.button`
  font-size: 20px;
  border-style: none;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;

const EditTitle = styled.div`
  font-size: 30px;
  color: black;
  margin-bottom: 30px;
`;
const SubTitle = styled.div`
  font-size: 15px;
`;

const Close = styled.button`
  border-radius: 5px;
  background: white;
  border-width: 1px;
  border-color: gray;
  margin-left: 100%;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const EditInput = styled.input`
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

const EditSendBtn = styled.button`
  width: 100%;
  font-size: 15px;
`;

function PopupEditData(props) {
  const [name, setName] = React.useState(props.item.name);
  const [address, setAddress] = React.useState(props.item.address);
  const [price, setPrice] = React.useState(props.item.price);
  const [comment, setComment] = React.useState(props.item.comment);
  const [guests, setGuests] = React.useState(props.item.guests);
  //   const history = useHistory();

  function editData(item) {
    firebase
      .firestore()
      .collection("product")
      .doc(item)
      .update({
        name: name,
        address: address,
        price: price,
        comment: comment,
        guests: guests,
      })
      .then(() => {
        alert("完成修改");
      });
  }

  return (
    <Popup
      trigger={
        <Edit>
          <BiPencil />
        </Edit>
      }
      modal
      nested
    >
      {(close) => (
        <Modal>
          <Close onClick={close}>X</Close>
          <EditTitle>修改露營區資訊</EditTitle>
          <SubTitle>露營地名稱：</SubTitle>
          <EditInput
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></EditInput>
          <SubTitle>露營地地址：</SubTitle>
          <EditInput
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></EditInput>
          <SubTitle>露營地價格：</SubTitle>
          <EditInput
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></EditInput>
          <SubTitle>露營地介紹：</SubTitle>
          <EditInput
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></EditInput>
          <SubTitle>露營地人數：</SubTitle>
          <EditInput
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          ></EditInput>
          <EditSendBtn
            onClick={() => {
              editData(props.item.id);
            }}
          >
            完成修改
          </EditSendBtn>
        </Modal>
      )}
    </Popup>
  );
}

export default PopupEditData;
