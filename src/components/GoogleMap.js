import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import tent from "../imge/camping-tent.png";
import styled from "styled-components";
import firebase from "firebase";
import { Link } from "react-router-dom";

const StyledInfoArea = styled.div`
  width: 200px;
`;

const StyledInfoName = styled.div`
  color: black;
  margin-top: 5px;
  font-size: 15px;
  font-family: sans-serif;
  font-weight: bold;
`;

const StyledInfoAddress = styled.h4`
  color: gray;
  font-family: sans-serif;
  font-weight: bold;
`;
const StyledInfoPrice = styled.div`
  color: black;
  font-size: 20px;
  font-family: sans-serif;
  font-weight: bold;
`;

const StyledInfoImage = styled.img`
  width: 100%;
`;

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vmin",
  width: "100%",
};

export default function App(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAAuyNVSxdv2VTjUe_N7hyH8drXIoypa_E",
    libraries,
  });

  const [selected, setSelected] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
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

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  //   console.log(nearby);
  //   console.log(selected);

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={{
          lat: 23.96363430162278,
          lng: 120.97561230851146,
        }}
        clickableIcons={false}
        // onLoad={onMapLoad}
      >
        {/* <Marker
          position={currentLocation}
          draggable={true}
          onDragEnd={(coords) => dragMarker(coords)}
        /> */}
        {places
          .filter((marker) => {
            if (props.tag === marker.topicTag) {
              return marker;
            } else if (props.tag === "All") {
              return places;
            }
            // props.tag ? marker.topicTag === props.tag : true
          })
          .map((marker) => (
            <Marker
              key={marker.placeId}
              position={{
                lat: marker.latitude.lat,
                lng: marker.latitude.lng,
              }}
              onClick={() => {
                setSelected(marker);
              }}
              icon={{
                url: tent,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(20, 20),
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          ))}

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.latitude.lat,
              lng: selected.latitude.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <Link to={`/products/${selected.id}`}>
              <StyledInfoArea>
                <StyledInfoImage src={selected.imageURL} />
                <StyledInfoName>
                  {selected.name}★{selected.stars}
                </StyledInfoName>
                <StyledInfoAddress>📍{selected.address}</StyledInfoAddress>
                <StyledInfoPrice>{selected.price}/一晚</StyledInfoPrice>
              </StyledInfoArea>
            </Link>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
