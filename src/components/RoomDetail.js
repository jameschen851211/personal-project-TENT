import React from "react";
import "./RoomDetail.css";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import MapProductDetail from "./MapProductDetail";
import firebase from "firebase";
import styled from "styled-components";
import { BsFillHeartFill } from "react-icons/bs";
import DateRangePickerExample from "./DateRangePickExample";
import CountNumber from "./CountNumber";
import Swal from "sweetalert2/dist/sweetalert2.js";
import NativeReviewer from "../imge/tent.png";

const Like = styled.button`
  border: none;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 8px;
  border-radius: 50%;
  font-size: 20px;
  margin-left: 20px;
  cursor: pointer;
`;

const CuntDate = styled.div`
  margin-top: 20px;
`;

const InstantBook = styled.button`
  color: #00bfac;
  background: white;

  /* justify-content: center; */
  position: relative;
  border: 1px solid #00bfac;
  width: 293px;

  border-radius: 5px;
  font-size: 15px;
  font-weight: 700;
  height: 50px;
  margin: 20px 30px;
  cursor: pointer;
  &:hover {
    border: 1px solid #00bfac;
    background: #00bfac;
    color: white;
  }
`;

const RoomsDetailName = styled.div`
  font-size: 30px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  width: 100%;
`;

const RoomsDetailNameInfo = styled.div`
  display: flex;
`;

const RoomsDetailBox = styled.div`
  margin: 50px;
  padding: 10px;
`;

const RoomsDetailImage = styled.img`
  width: 88%;
  height: 450px;
  margin: 5px;
  object-fit: cover;
  border-radius: 7px;
  margin-right: 10px;
`;

const RoomsDetailStars = styled.div`
  color: black;
  padding: 10px 0;
  font-weight: 500;
`;

const RoomsDetailAddress = styled.div`
  color: rgb(151, 145, 145);
  padding: 10px 0;
  margin-top: -2px;
  margin-left: 10px;
`;

const RoomsOwnerName = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 500;
  color: gray;
`;

const RoomsOwnerIntroduceWrapper = styled.div`
  width: 60%;
`;

const RoomsOwnerIntroduce = styled.div`
  font-size: 15px;
  width: 90%;
  margin-top: 10px;
`;
const RoomsIntroduceCheckBox = styled.div`
  display: flex;
`;

const RoomsCheckBoxWrapper = styled.div`
  width: 40%;
`;

const RoomsCheckBox = styled.div`
  margin: 5px 150px 10px 30px;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-style: solid;
  border: 1px solid rgb(221, 221, 221);
  width: 350px;
  height: 320px;
  position: sticky;
  top: 0px;
`;

const RoomsBoxPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
  height: 50px;
  margin: 0px;
`;

const RoomsBoxStarts = styled.div`
  color: black;
  font-weight: 500;
  font-size: 15px;
  margin-top: 4px;
`;

const RoomsBoxFirstRow = styled.div`
  display: flex;
  margin: 20px 20px 0px 20px;
  padding: 10px;
  justify-content: space-between;
`;

const Equipment = styled.div`
  display: flex;
  width: 60%;
  margin-left: 50px;
`;

const EquipmentArea = styled.div`
  border-radius: 7px;
  border: 1px solid rgb(221, 221, 221);
  width: 27%;
  height: 350px;
  margin-right: 20px;
  margin-top: -250px;
`;

const ReviewerImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: solid 1px gray;
`;

const RoomDetailArea = styled.div`
  margin: 30px 0px 10px 100px;
`;

const MapArea = styled.div`
  margin-bottom: 30px;
`;

const EquipmentAreaTitle = styled.div`
  margin-top: 20px;
  font-weight: 800;
  font-size: 20px;
  margin: 10px;
`;

const EquipmentAreaPoint = styled.div`
  margin: 30px 10px;
  color: gray;
`;

const DetailArea = styled.div`
  display: flex;
  margin-left: 50px;
  margin-top: 20px;
  border-top: solid;
  border-bottom: solid;
  border-width: 1px;
  border-color: rgb(221, 221, 221);
  width: 53%;
`;

const DetailAreaTitle = styled.div`
  font-weight: 800;
  font-size: 20px;
  margin-top: 10px;
`;

const DetailAreaInfo = styled.div`
  margin-left: 40px;
  margin-bottom: 10px;
`;

const DetailAreaPoint = styled.div`
  margin-top: 13px;
  font-size: 15px;
  color: gray;
`;

const ActivitiesArea = styled.div`
  margin-left: 50px;

  border-bottom: solid;
  border-color: rgb(221, 221, 221);
  width: 53%;
  border-width: 1px;
`;

const ActivitiesAreaTitle = styled.div`
  font-weight: 800;
  font-size: 20px;
  margin-top: 10px;
`;

const ActivitiesAreaSubTitle = styled.div`
  margin-top: 10px;
  color: gray;
  font-weight: 500;
`;

const ActivitiesAreaBox = styled.div`
  display: flex;
`;

const ActivitiesAreaBoxPoints = styled.div`
  font-weight: 600;
  border-radius: 7px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(221, 221, 221);
  color: gray;
  width: 15%;
  height: 80px;
  margin-right: 15px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
  line-height: 30px;
`;

const ActivitiesAreaBoxPointsName = styled.div`
  margin-top: 25px;
  text-align: center;
`;

const ReviewsArea = styled.div`
  margin: 50px;
  width: 53%;
`;

const ReviewsAreaTitle = styled.div`
  font-weight: 800;
  font-size: 20px;
  margin-top: 20px;
`;

const ReviewsAreaBox = styled.div`
  display: flex;
  margin-top: 30px;
  border-bottom: solid;
  border-color: rgb(221, 221, 221);
  border-width: 1px;
`;

const ReviewsAreaBoxInfo = styled.div`
  margin-left: 13px;
`;

const ReviewerName = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 15px;
`;

const ReviewerStars = styled.div`
  color: #00bfac;
`;

const ReviewerComment = styled.div`
  font-size: 15px;
`;

const CommentCreatDate = styled.div`
  color: gray;
  font-size: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

function RoomDetail() {
  const { itemID } = useParams();
  const [item, setItem] = React.useState({});
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [comment, setComment] = React.useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("product")
      .doc(itemID)
      .onSnapshot((docSnapshot) => {
        const data = docSnapshot.data();
        setItem(data);
      });
  }, []);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("comment")
      .where("itemID", "==", itemID)
      .get()
      .then((snapshot) => {
        console.log(typeof snapshot);
        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          setComment((comment) => [...comment, data]);
        });
      });
  }, []);

  function toggleCollection() {
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      if (isCollected) {
        firebase
          .firestore()
          .collection("product")
          .doc(itemID)
          .update({
            collectionBy: firebase.firestore.FieldValue.arrayRemove(uid),
          });
      } else {
        firebase
          .firestore()
          .collection("product")
          .doc(itemID)
          .update({
            collectionBy: firebase.firestore.FieldValue.arrayUnion(uid),
          });
      }
    } else {
      Swal.fire("請先登入會員");
      history.push("/log-in");
    }
  }

  const isCollected = item.collectionBy?.includes(
    firebase.auth().currentUser?.uid
  );

  function onSubmit() {
    // const documentRef = firebase.firestore().collection("order").doc();
    const orderID = firebase.firestore().collection("order").doc().id;
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      if (startDate === "") {
        Swal.fire("請選擇入住時間");
      } else if (endDate === "") {
        Swal.fire("請輸入退房時間");
      } else if (count === 0) {
        Swal.fire("請選擇入住人數");
      } else {
        firebase
          .firestore()
          .collection("order")
          .doc(orderID)
          .set({
            startDate,
            endDate,
            uid: firebase.auth().currentUser.uid,
            id: itemID,
            count,
          })
          .then(() => {
            history.push(`${url}/order/${orderID}`);
          });
      }
    } else {
      Swal.fire("請先登入會員");
      history.push("/log-in");
    }
  }

  return (
    <>
      <RoomDetailArea>
        <RoomsDetailBox>
          <RoomsDetailName>{item.name}</RoomsDetailName>
          <RoomsDetailNameInfo>
            <RoomsDetailStars>
              ★{item.stars} ({comment.length} comments)
            </RoomsDetailStars>
            <RoomsDetailAddress>⌲{item.address}</RoomsDetailAddress>
            <Like
              onClick={toggleCollection}
              style={isCollected ? { color: "red" } : { color: "grey" }}
            >
              <BsFillHeartFill />
            </Like>
          </RoomsDetailNameInfo>
          <RoomsDetailImage src={item.imageURL} />
          <RoomsOwnerName>Hosted by Victor Chen</RoomsOwnerName>
          <RoomsIntroduceCheckBox>
            <RoomsOwnerIntroduceWrapper>
              <RoomsOwnerIntroduce>{item.comment}</RoomsOwnerIntroduce>
            </RoomsOwnerIntroduceWrapper>
            <RoomsCheckBoxWrapper>
              <RoomsCheckBox>
                <RoomsBoxFirstRow>
                  <RoomsBoxPrice>NT.{item.price}/晚</RoomsBoxPrice>
                  <RoomsBoxStarts>
                    ★{item.stars} ({comment.length} comments)
                  </RoomsBoxStarts>
                </RoomsBoxFirstRow>

                {/* <SubTitle>入住時間</SubTitle> */}
                <DateRangePickerExample
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
                {/* <input className="checkin" placeholder="Check in" />
                      <input className="checkout" placeholder="Check out" /> */}

                {/* <SubTitle>入住人數</SubTitle> */}
                <CuntDate>
                  <CountNumber count={count} setCount={setCount} />
                </CuntDate>
                <InstantBook
                  // history.push(`${url}/order`)
                  onClick={() => onSubmit()}
                >
                  Instant book
                </InstantBook>
              </RoomsCheckBox>
            </RoomsCheckBoxWrapper>
          </RoomsIntroduceCheckBox>
        </RoomsDetailBox>
        <Equipment>
          <EquipmentArea>
            <EquipmentAreaTitle>Campsite area</EquipmentAreaTitle>
            <EquipmentAreaPoint>Park at listing</EquipmentAreaPoint>
            <EquipmentAreaPoint>Canvas tent</EquipmentAreaPoint>
          </EquipmentArea>
          <EquipmentArea>
            <EquipmentAreaTitle>Essentials</EquipmentAreaTitle>

            <EquipmentAreaPoint>Pets allowed</EquipmentAreaPoint>
            <EquipmentAreaPoint>Campfires allowed</EquipmentAreaPoint>
          </EquipmentArea>
          <EquipmentArea>
            <EquipmentAreaTitle>Amenities</EquipmentAreaTitle>
            <EquipmentAreaPoint>No wifi</EquipmentAreaPoint>
            <EquipmentAreaPoint>Pack out</EquipmentAreaPoint>
            <EquipmentAreaPoint>Showers</EquipmentAreaPoint>
            <EquipmentAreaPoint>Potable water</EquipmentAreaPoint>
          </EquipmentArea>
        </Equipment>
        <DetailArea>
          <DetailAreaTitle>Details</DetailAreaTitle>
          <DetailAreaInfo>
            <DetailAreaPoint>Check in:After 3PM</DetailAreaPoint>
            <DetailAreaPoint>Check out:Before 12PM</DetailAreaPoint>
            <DetailAreaPoint>On arrival: Meet and greet</DetailAreaPoint>
          </DetailAreaInfo>
        </DetailArea>
        <ActivitiesArea>
          <ActivitiesAreaTitle>Activities</ActivitiesAreaTitle>
          <ActivitiesAreaSubTitle>
            Offered on the Host's property or nearby.
          </ActivitiesAreaSubTitle>
          <ActivitiesAreaBox>
            <ActivitiesAreaBoxPoints>
              <ActivitiesAreaBoxPointsName>Biking</ActivitiesAreaBoxPointsName>
            </ActivitiesAreaBoxPoints>
            <ActivitiesAreaBoxPoints>
              <ActivitiesAreaBoxPointsName>Boating</ActivitiesAreaBoxPointsName>
            </ActivitiesAreaBoxPoints>
            <ActivitiesAreaBoxPoints>
              <ActivitiesAreaBoxPointsName>Hiking</ActivitiesAreaBoxPointsName>
            </ActivitiesAreaBoxPoints>
            <ActivitiesAreaBoxPoints>
              <ActivitiesAreaBoxPointsName>Padding</ActivitiesAreaBoxPointsName>
            </ActivitiesAreaBoxPoints>
            <ActivitiesAreaBoxPoints>
              <ActivitiesAreaBoxPointsName>
                Swimming
              </ActivitiesAreaBoxPointsName>
            </ActivitiesAreaBoxPoints>
          </ActivitiesAreaBox>
        </ActivitiesArea>
        <ReviewsArea>
          <ReviewsAreaTitle>{comment.length} Reviews</ReviewsAreaTitle>
          {comment.map((data, index) => {
            return (
              <ReviewsAreaBox key={index}>
                {data.photoURL ? (
                  <ReviewerImage src={data.photoURL} />
                ) : (
                  <ReviewerImage src={NativeReviewer} />
                )}

                <ReviewsAreaBoxInfo>
                  <ReviewerStars>★{data.rating}</ReviewerStars>
                  <ReviewerName>{data.email}</ReviewerName>
                  <ReviewerComment>{data.review}</ReviewerComment>
                  <CommentCreatDate>
                    {data.createdAt.toDate().toLocaleDateString()}
                  </CommentCreatDate>
                </ReviewsAreaBoxInfo>
              </ReviewsAreaBox>
            );
          })}
        </ReviewsArea>
      </RoomDetailArea>
      <MapArea>
        <MapProductDetail />
      </MapArea>
    </>
  );
}

export default RoomDetail;
