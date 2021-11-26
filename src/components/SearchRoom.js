import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import algolia from "../utils/algolia";
import GoogleMapSearch from "./GoogleMapSearch";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Like = styled.button`
  border: none;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 8px;
  border-radius: 50%;
  font-size: 20px;
  /* margin-left: -20px; */
  cursor: pointer;
`;

const SearchResult = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const Norelevant = styled.div`
  font-size: 25px;
  margin-top: 20px;
  font-weight: 400;
`;

const Map = styled.div`
  position: sticky;
  top: 0px;
  @media screen and (max-width: 1087px) {
    display: none;
  }
`;

const Items = styled.div`
  margin: 0px;
  width: 50%;
  @media screen and (max-width: 1087px) {
    width: 100%;
  }
`;

const MapWrapper = styled.div`
  width: 50%;
`;

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
const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 1087px) {
    display: block;
  }
`;

const TagArea = styled.div`
  border-bottom: 2px solid rgb(212, 212, 212);
  padding: 20px;
  margin: 16px 0px 0px 0px;
`;

const ItemTags = styled.div`
  font-size: 15px;
  margin-top: 10px;
  margin-right: 10px;
  display: inline-block;
  background: #fbba05;
  color: white;
  padding: 5px 5px;
  border: 1px gray;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
`;

const NoResult = styled.div`
  margin: 30px;
`;

function SearchRoom() {
  const [rooms, setRooms] = React.useState();
  const [searchResults, setSearchResults] = React.useState([]);
  const search = useParams();
  const history = useHistory();

  React.useEffect(() => {
    algolia.search(search.inputValue).then((result) => {
      console.log(result);
      const searchResults = result.hits.map((hit) => {
        return hit.objectID;
      });
      setSearchResults(searchResults);
      console.log(searchResults);
    });
  }, [search.inputValue]);

  React.useEffect(() => {
    if (searchResults.length > 0) {
      let searchTerm = searchResults;
      if (searchResults.length > 10) {
        searchTerm = searchResults.slice(0, 10);
      }
      firebase
        .firestore()
        .collection("product")
        .where("__name__", "in", searchTerm)
        .onSnapshot((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            const id = docSnapshot.id;
            return { ...docSnapshot.data(), id };
          });
          setRooms(data);
          console.log(data);
        });
    }
  }, [searchResults]);

  function renderRoom(item) {
    const uid = firebase.auth().currentUser?.uid;
    function toggleCollection() {
      if (uid) {
        if (isCollected) {
          firebase
            .firestore()
            .collection("product")
            .doc(item.id)
            .update({
              collectionBy: firebase.firestore.FieldValue.arrayRemove(uid),
            });
        } else {
          firebase
            .firestore()
            .collection("product")
            .doc(item.id)
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

    return item !== undefined ? (
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
          <Like
            onClick={toggleCollection}
            style={isCollected ? { color: "red" } : { color: "grey" }}
          >
            <BsFillHeartFill />
          </Like>
          {/* <div className="rooms__item__like">like:{props.like}</div> */}
          <ItemPrice>NT.{item.price}/night</ItemPrice>

          <ItemTags>#{item.discountTag}</ItemTags>
          <ItemTags>#{item.otherTag}</ItemTags>
        </Box>
      </Item>
    ) : (
      <div>Loading</div>
    );
  }

  return rooms ? (
    <>
      <TagArea>
        <SearchResult>Search Result"{search.inputValue}"</SearchResult>
      </TagArea>

      <Wrapper>
        <Items>{rooms.map((item) => renderRoom(item))}</Items>
        <MapWrapper>
          <Map>
            <GoogleMapSearch search={rooms} />
          </Map>
        </MapWrapper>
      </Wrapper>
    </>
  ) : (
    <NoResult>
      <SearchResult>Search Result"{search.inputValue}"</SearchResult>

      <Norelevant>No relevant information</Norelevant>
    </NoResult>
  );
}

export default SearchRoom;
