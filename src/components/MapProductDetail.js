import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import tent from "../imge/camping-tent.png";
import styled from "styled-components";
import firebase from "firebase";
import { useParams } from "react-router";

const StyledInfoRating = styled.h3`
  color: gray;
  font-family: sans-serif;
  font-weight: bold;
  text-align: center;
`;

const libraries = ["places"];
const mapContainerStyle = {
  height: "50vmin",
  width: "100%",
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAAuyNVSxdv2VTjUe_N7hyH8drXIoypa_E",
    libraries,
  });

  const [selected, setSelected] = useState(null);
  const [places, setPlaces] = useState();
  const { itemID } = useParams();

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("product")
      .where("__name__", "==", itemID)
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

  return places ? (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={{
          lat: places[0].latitude.lat,
          lng: places[0].latitude.lng,
        }}
        clickableIcons={false}
        // onLoad={onMapLoad}
      >
        {/* <Marker
          position={currentLocation}
          draggable={true}
          onDragEnd={(coords) => dragMarker(coords)}
        /> */}
        {places.map((marker) => (
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
            <div>
              <StyledInfoRating>📍{selected.address}</StyledInfoRating>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  ) : (
    <div>loading</div>
  );
}
