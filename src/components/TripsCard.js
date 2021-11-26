import React from "react";
import PopupButton from "./PopupButton";
import PopupIsCommented from "./PopupIsCommented";
import firebase from "firebase";
import styled from "styled-components";

const Trips = styled.div`
  /* margin: 0px auto; */
  padding: 30px;
  width: 100%;
  /* width: 100%; */
`;

const Title = styled.div`
  font-size: 40px;
  margin: 20px;
  padding: 10px;
  font-weight: 600;
`;

const TripsCardWrapper = styled.div`
  display: flex;
`;

const TripsCards = styled.div`
  margin: 25px;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-style: solid;
  border: 1px solid rgb(221, 221, 221);
  width: 350px;
  height: 320px;
  margin-bottom: 30px;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 70%;
  overflow: hidden;
  border-radius: 7px;
`;

const TripsCardsBox = styled.div`
  padding: 0px 10px 10px 20px;
  display: flex;
`;

const CardName = styled.div`
  color: #252e48;
  font-size: 18px;
  font-weight: 800;
  line-height: 5px;
  margin-top: 15px;
`;

const CardDate = styled.div`
  color: gray;
  font-weight: 600;
  font-size: 15px;
  margin-top: 15px;
`;

const CardCount = styled.div`
  font-size: 5px;
  font-weight: 700;
  margin-top: 5px;
`;

const Wrapper = styled.div`
  width: 80%;
`;

function TripsCard() {
  const [itemData, setItemData] = React.useState([]);

  React.useEffect(() => {
    // console.log(firebase.auth().currentUser.uid);
    firebase
      .firestore()
      .collection("successfullyOrder")
      .where("uid", "==", firebase.auth().currentUser?.uid)
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        snapshot.forEach((doc) => {
          const data = doc.data();
          setItemData((itemData) => [...itemData, data]);
          console.log(itemData);
        });
      });
  }, []);

  function renderTripsCard(data) {
    return (
      <TripsCards>
        <Image src={data.imageURL} />
        <TripsCardsBox>
          <Wrapper>
            <CardName>{data.name}</CardName>
            <CardDate>
              {data.startDate.toDate().toLocaleDateString()}-
              {data.endDate.toDate().toLocaleDateString()}
            </CardDate>
            <CardCount>{data.count}位房客</CardCount>
          </Wrapper>
          {data.isCommented ? (
            <PopupIsCommented itemID={data.itemID} />
          ) : (
            <PopupButton itemID={data.itemID} />
          )}
        </TripsCardsBox>
      </TripsCards>
    );
  }

  return (
    <Trips>
      <Title>Trips</Title>
      <TripsCardWrapper>
        {itemData.map((data) => renderTripsCard(data))}
      </TripsCardWrapper>
    </Trips>
  );
}

export default TripsCard;
