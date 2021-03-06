import React from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import MapAutocomplete from "./MapAutocamplete";
import styled from "styled-components";
import { RiDeleteBin2Line } from "react-icons/ri";
import PopupEditData from "./PopupEditData";

const Infobox = styled.div`
  margin: 30px;
  padding: 30px;
  width: 90%;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  border-radius: 10px;
  display: flex;
`;

const Info = styled.div`
  margin-right: 20px;
`;

const Delete = styled.button`
  font-size: 20px;
  border-style: none;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const Rooms = styled.div`
  margin-left: 50px;
  margin-top: 20px;
`;

const RoomsTitle = styled.div`
  font-size: 25px;
`;

const RoomsInput = styled.input`
  display: flex;
  margin-top: 10px;
  width: 400px;
  height: 30px;
`;

const CreateBtn = styled.button`
  margin-top: 30px;
  width: 100%;
  height: 27px;
`;

const RoomsArea = styled.div`
  display: flex;
  margin: 30px;
  padding: 30px;
`;

const RoomsTageArea = styled.div`
  margin-left: 40px;
`;

const RoomsTage = styled.select`
  width: 300px;
  height: 20px;
  margin-top: 10px;
`;

function AddCamp() {
  const [name, setName] = React.useState("");
  const [guests, setGuests] = React.useState("");
  const [stars, setStars] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [topicTag, setTopicTag] = React.useState("");
  const [discountTag, setDiscountTag] = React.useState("");
  const [otherTag, setOtherTag] = React.useState("");
  const [commentCount, setCommentCount] = React.useState(0);
  const [product, setProduct] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [address, setAddress] = React.useState("");
  const [placeId, setPlaceId] = React.useState("");
  const [latitude, setLatitude] = React.useState({});
  const history = useHistory();

  const GetAddress = (addressdata) => {
    setAddress(addressdata[0]);
    setPlaceId(addressdata[1]);
    setLatitude(addressdata[2]);
  };

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("product")
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          const id = doc.id;
          return { ...doc.data(), id };
        });
        setProduct(data);
      });
  }, []);

  function onSubmit() {
    const documentRef = firebase.firestore().collection("product").doc();
    const imageRef = firebase.storage().ref("Product-image/" + documentRef.id);
    const metadata = {
      contentType: image.type,
    };
    imageRef.put(image, metadata).then(() => {
      imageRef.getDownloadURL().then((imageURL) => {
        console.log(commentCount);
        documentRef
          .set({
            name,
            guests,
            stars,
            price,
            imageURL,
            address,
            placeId,
            latitude,
            comment,
            commentCount,
            topicTag,
            discountTag,
            otherTag,
            // id: firebase.firestore.collection("product"),
          })
          .then(() => {
            window.alert("?????????????????????");
            // history.push("/");
          });
      });
    });
  }

  function renderRoom(item) {
    return (
      <Infobox>
        <Info>??????????????????{item.name}</Info>
        <Info>????????????{item.address}</Info>
        <Info>???????????????{item.guests} guests</Info>
        <Info>NT.{item.price}/night</Info>
        <PopupEditData item={item} />
        <Delete
          onClick={() => {
            deleteroom(item.id);
          }}
        >
          <RiDeleteBin2Line />
        </Delete>
      </Infobox>
    );
  }

  function deleteroom(item) {
    firebase
      .firestore()
      .collection("product")
      .doc(item)
      .delete()
      .then((error) => {
        alert("????????????");
      });
  }

  return (
    <Rooms>
      <RoomsTitle>???????????????</RoomsTitle>
      <RoomsArea>
        <div>
          <RoomsInput
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            // multiple
            // onChange={OnFileChange}
          />

          <RoomsInput
            placeholder="???????????????"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <MapAutocomplete placeaddress={GetAddress} />
          <RoomsInput
            placeholder="???????????????"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
          <RoomsInput
            placeholder="???????????????"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          />
          <RoomsInput
            placeholder="???????????????"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <RoomsInput
            placeholder="???????????????"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <RoomsTageArea>
          ????????????
          <form>
            ???????????????
            <RoomsTage
              value={topicTag}
              onChange={(e) => setTopicTag(e.target.value)}
            >
              <option value="Seaview">seaview</option>
              <option value="Mountainview">Mountainview</option>
              <option value="SwimmingPool">Swimming Pool</option>
              <option value="Barbecue">Barbecue</option>
            </RoomsTage>
          </form>
          <form>
            ???????????????
            <RoomsTage
              value={discountTag}
              onChange={(e) => setDiscountTag(e.target.value)}
            >
              <option value="????????????">????????????</option>
              <option value="????????????">????????????</option>
              <option value="?????????">?????????</option>
              <option value="????????????">????????????</option>
            </RoomsTage>
          </form>
          <form>
            ???????????????
            <RoomsTage
              value={otherTag}
              onChange={(e) => setOtherTag(e.target.value)}
            >
              <option value="?????????">?????????</option>
              <option value="??????">??????</option>
              <option value="????????????">????????????</option>
              <option value="???????????????">???????????????</option>
            </RoomsTage>
          </form>
          <CreateBtn onClick={() => onSubmit()}>??????</CreateBtn>
        </RoomsTageArea>
      </RoomsArea>

      <div className="campaing">
        <RoomsTitle>???????????????</RoomsTitle>
        {product.map((item) => renderRoom(item))}
      </div>
    </Rooms>
  );
}

export default AddCamp;
