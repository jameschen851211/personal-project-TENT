import React from "react";

import { Link } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";

const Item = styled.div`
  display: flex;
  border-bottom: 1px solid rgb(212, 212, 212);
  margin-bottom: 8px;
  padding: 10px;
  width: 100%;
`;
const ItemImage = styled.img`
  width: 300px;
  overflow: hidden;
  border-radius: 20px;
`;

const Box = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 20px;
  font-family: "-apple-system", "BlinkMacSystemFont", "Segoe UI",
    "Roboto, Oxygen", "Ubuntu, Cantarell", "Open Sans", "Helvetica Neue",
    "sans-serif";
`;

const ItemLocation = styled.div`
  color: rgb(151, 145, 145);
  padding-bottom: 8px;
`;

const ItemName = styled.div`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  width: 100%;
`;

const Hr = styled.hr`
  width: 80px;
  margin: 15px 0;
`;

const ItemGuests = styled.div`
  font-size: 18px;
  color: gray;
`;

const ItemStars = styled.div`
  color: black;
  padding: 10px 0;
  font-weight: 500;
`;

const ItemComment = styled.span`
  color: gray;
  font-weight: 400;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  font-size: 26px;
  margin-top: 20px;
`;

const Items = styled.div`
  margin: 0px auto;
  padding: 30px;
  width: 50%;
`;

const Title = styled.div`
  font-size: 40px;
  text-align: center;
  margin: 20px;
  padding: 10px;
  font-weight: 600;
`;

function MyWishList() {
  const [rooms, setRooms] = React.useState([]);
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("product")
      .where("collectionBy", "array-contains", firebase.auth().currentUser.uid)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setRooms(data);
        console.log(data);
      });
  }, []);

  function renderRoom(item) {
    return (
      <Item>
        <Link to={`/products/${item.id}`}>
          <ItemImage src={item.imageURL} />
        </Link>
        <Box>
          <ItemLocation>⌲{item.address}</ItemLocation>
          <ItemName>{item.name}</ItemName>
          <Hr />
          <ItemGuests>{item.guests} guests</ItemGuests>
          <ItemStars>
            ★{item.stars}
            <ItemComment> ({item.commentCount} comments)</ItemComment>
          </ItemStars>
          <ItemPrice>{item.price}/night</ItemPrice>
        </Box>
      </Item>
    );
  }

  return (
    <Items>
      <Title>Wishlists</Title>
      {rooms.map((item) => renderRoom(item))}
    </Items>
  );
}

export default MyWishList;
