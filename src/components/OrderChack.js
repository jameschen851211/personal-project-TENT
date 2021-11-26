import React from "react";
import "./OrderChack.css";

import firebase from "firebase";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Input = styled.input`
  display: flex;
  height: 30px;
  width: 120%;
  margin-top: 10px;
`;

const OrderCheckImage = styled.img`
  width: 100%;
  height: 40%;
  border-radius: 7px;
  object-fit: cover;
`;

const OrderCheckBox = styled.div`
  margin: 5px 150px 10px 30px;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-style: solid;
  border: 1px solid rgb(221, 221, 221);
  width: 300px;
  height: 380px;
`;

const OrderCheckBoxName = styled.div`
  color: black;

  font-size: 18px;
  font-family: sans-serif;
  font-weight: bold;
`;

const OrderCheckBoxInfo = styled.div`
  margin: 20px 20px 0px 20px;
`;

const OrderCheckBoxAddress = styled.div`
  font-size: 15px;
  color: gray;
  margin-top: 5px;
`;

const OrderCheckBoxPriceTitle = styled.div`
  margin: 10px 20px 20px 20px;
  font-size: 25px;
  font-weight: 600;
  margin-top: 15px;
`;

const Hr = styled.hr`
  width: 90%;
  margin-top: 10px;
`;

const OrderCheckBoxPriceNight = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
`;

const TotlePrice = styled.div`
  margin-left: 10px;
  font-size: 20px;
  font-weight: 600;
`;

function OrderChack() {
  const { orderID } = useParams();
  const { itemID } = useParams();
  const [order, setOrder] = React.useState();
  const [rooms, setRooms] = React.useState();
  const [cardnumber, setCardnumber] = React.useState("");
  const [carddate, setCarddate] = React.useState("");
  const [cardcode, setCardCode] = React.useState("");
  const [isCommented, setCommented] = React.useState(false);
  // const [errormessage, setErrorMessage] = React.useState();
  const history = useHistory();

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("order")
      .doc(orderID)
      .onSnapshot((docSnapshot) => {
        const data = docSnapshot.data();
        setOrder(data);
        console.log(data);
      });
  }, []);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("product")
      .doc(itemID)
      .onSnapshot((docSnapshot) => {
        const data = docSnapshot.data();
        setRooms(data);
        console.log(data);
      });
  }, []);

  function onSubmit() {
    const orderSuccessfullyID = firebase
      .firestore()
      .collection("successfullyOrder")
      .doc().id;
    if (cardnumber === "") {
      Swal.fire("請輸入信用卡號");
    } else if (cardnumber.length < 16) {
      Swal.fire("請輸入正確16碼卡號");
    } else if (carddate === "") {
      Swal.fire("請輸入到期日");
    } else if (carddate.length < 4) {
      Swal.fire("請輸正確入到期日");
    } else if (cardcode === "") {
      Swal.fire("請輸入安全碼");
    } else if (cardcode.length < 3) {
      Swal.fire("請輸入正確安全碼");
    } else {
      firebase
        .firestore()
        .collection("successfullyOrder")
        .doc(orderSuccessfullyID)
        .set({
          itemID,
          orderID,
          cardnumber,
          carddate,
          cardcode,
          uid: firebase.auth().currentUser.uid,
          imageURL: rooms.imageURL,
          name: rooms.name,
          // location: rooms.locationDetail,
          startDate: order.startDate,
          endDate: order.endDate,
          count: order.count,
          isCommented,
        })
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "已成功訂房",
            showConfirmButton: false,
            timer: 1500,
          });
          history.push("/");
        });
    }
  }

  return order ? (
    <div className="order">
      <div className="order__list">
        <div className="order__title">確認並付款</div>
        <h2 className="order__sub__title">你的旅程</h2>
        {/* {order.map((order) => randerOrder(order))} */}
        <div className="order__choose">
          <div className="order__date">
            <div className="order__date__date">日期</div>
            <div className="order__date__range">
              {order.startDate.toDate().toLocaleDateString()}-
              {order.endDate.toDate().toLocaleDateString()}
            </div>
          </div>
          <div className="order__guests">
            <div className="order__guests_guests">房客人數</div>
            <div className="order__guests__number">{order.count}位房客</div>
          </div>
        </div>

        <div className="order__pay">
          <h2 className="order__pay__title">付款方式：</h2>
          <div className="order__pay__creditcard">
            <form>
              <Input
                value={cardnumber}
                placeholder="卡號"
                onChange={(e) => setCardnumber(e.target.value)}
              />
              <Input
                value={carddate}
                placeholder="到期日"
                onChange={(e) => setCarddate(e.target.value)}
              />
              <Input
                value={cardcode}
                placeholder="安全碼"
                onChange={(e) => setCardCode(e.target.value)}
              />
            </form>
          </div>
          <button className="button" onClick={() => onSubmit()}>
            確認並付款
          </button>
          {/* {errormessage && <h6 style={{ color: "black" }}>{errormessage}</h6>} */}
        </div>
      </div>
      <div className="order__room">
        {rooms ? (
          <OrderCheckBox>
            <OrderCheckImage src={rooms.imageURL}></OrderCheckImage>
            <OrderCheckBoxInfo>
              <OrderCheckBoxName>
                {rooms.name}★{rooms.stars}({rooms.commentCount} 評論)
              </OrderCheckBoxName>

              <OrderCheckBoxAddress>⌲{rooms.address}</OrderCheckBoxAddress>
            </OrderCheckBoxInfo>

            <div className="room__price">
              <Hr />
              <OrderCheckBoxPriceTitle>價格詳情</OrderCheckBoxPriceTitle>
              <OrderCheckBoxPriceNight>
                NT.{rooms.price} x{" "}
                {order
                  ? (order.endDate.seconds - order.startDate.seconds) /
                    (24 * 60 * 60)
                  : 0}
                晚
                <TotlePrice>
                  NT.
                  {((order.endDate.seconds - order.startDate.seconds) /
                    (24 * 60 * 60)) *
                    rooms.price}
                </TotlePrice>
              </OrderCheckBoxPriceNight>
            </div>
          </OrderCheckBox>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
}

export default OrderChack;
