import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Key } from "./Key";
import styled from "styled-components";
import logo from "../imge/logo.png";
import firebase from "firebase";
import { InfoWindow } from "@react-google-maps/api";

const StyledInfoHeader = styled.h2`
  color: #3264a8;
  font-family: sans-serif;
  font-weight: bold;
  text-align: center;
  font-size: 15px;
`;

const StyledInfoRating = styled.h3`
  color: #b31010;
  font-family: sans-serif;
  font-weight: bold;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100vmin;
`;

// Map
const SimpleMap = (props) => {
  const [selected, setSelected] = React.useState(null);
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
    console.log("載入完成!"); // 印出「載入完成」
  };
  const [places, setPlaces] = useState([]);
  const TenTMarker = ({ icon, text }) => (
    <div
      onClick={() => {
        console.log("hi");
        // setselected(data);
      }}
    >
      <img style={{ height: "50px", width: "50px" }} src={logo} alt="logo" />
    </div>
  );

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("product")
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPlaces(data);
        console.log(data);
      });
  }, []);

  return (
    // Important! Always set the container height explicitly
    <Container>
      {/* <div style={{ height: "100%", width: "100%" }}> */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: Key }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals // 設定為 true
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)} // 載入完成後執行
      >
        {places.map((data) => (
          <TenTMarker
            // key={item.place_id}
            lat={data.lat}
            lng={data.lng}
            // placeId={item.place_id}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.data.lat,
              lng: selected.data.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <StyledInfoHeader>{selected.data.name}</StyledInfoHeader>
              <StyledInfoRating>
                {" "}
                ⭐ {selected.data.stars} 📍 {selected.data.address}
              </StyledInfoRating>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMapReact>
    </Container>
  );
};

// 由於改寫成 functional component，故另外設定 defaultProps
SimpleMap.defaultProps = {
  center: {
    lat: 23.96363430162278,
    lng: 120.97561230851146,
  },
  zoom: 8,
};

// App
function Map() {
  return (
    <div className="App">
      <SimpleMap />
    </div>
  );
}

export default Map;
