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
            window.alert("成功新增露營地");
            // history.push("/");
          });
      });
    });
  }

  function renderRoom(item) {
    return (
      <Infobox>
        <Info>露營地名稱：{item.name}</Info>
        <Info>地址：⌲{item.address}</Info>
        <Info>床位人數：{item.guests} guests</Info>
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
        alert("成功刪除");
      });
  }

  return (
    <Rooms>
      <RoomsTitle>上架露營地</RoomsTitle>
      <RoomsArea>
        <div>
          <RoomsInput
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            // multiple
            // onChange={OnFileChange}
          />

          <RoomsInput
            placeholder="露營地名稱"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <MapAutocomplete placeaddress={GetAddress} />
          <RoomsInput
            placeholder="露營地人數"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
          <RoomsInput
            placeholder="露營地評分"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          />
          <RoomsInput
            placeholder="露營地價格"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <RoomsInput
            placeholder="露營地介紹"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <RoomsTageArea>
          露營標籤
          <form>
            露營主題：
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
            地點類型：
            <RoomsTage
              value={discountTag}
              onChange={(e) => setDiscountTag(e.target.value)}
            >
              <option value="懶人露營">懶人露營</option>
              <option value="親子露營">親子露營</option>
              <option value="露營車">露營車</option>
              <option value="免搭帳篷">免搭帳篷</option>
            </RoomsTage>
          </form>
          <form>
            其他資訊：
            <RoomsTage
              value={otherTag}
              onChange={(e) => setOtherTag(e.target.value)}
            >
              <option value="大草原">大草原</option>
              <option value="夜景">夜景</option>
              <option value="遊樂設施">遊樂設施</option>
              <option value="可攜帶寵物">可攜帶寵物</option>
            </RoomsTage>
          </form>
          <CreateBtn onClick={() => onSubmit()}>建立</CreateBtn>
        </RoomsTageArea>
      </RoomsArea>

      <div className="campaing">
        <RoomsTitle>已上架商品</RoomsTitle>
        {product.map((item) => renderRoom(item))}
      </div>
    </Rooms>
  );
}

export default AddCamp;
