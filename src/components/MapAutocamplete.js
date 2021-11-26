import React from "react";
import styled from "styled-components";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const InputArea = styled.div`
  width: 30%;
  margin: 15px 0px;
`;

const Input = styled.input`
  border-radius: 5px;
  width: 320%;
  height: 4vmin;
  padding-left: 10px;
  padding-top: 0.5vmin;
  font-size: 2vmin;
  @media screen and (max-width: 800px) {
    font-size: 1.5vmin;
  }
`;

function MapAutocomplete(props) {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (pickValue) => {
    const results = await geocodeByAddress(pickValue);
    const latLng = await getLatLng(results[0]);
    const placeId = results[0].place_id;
    setAddress(pickValue);
    setCoordinates(latLng);

    // 把座標位置和地址、placeId傳回去給父層
    const data = [pickValue, placeId, latLng];
    props.placeaddress(data);
  };

  return (
    <InputArea>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* <p>Latitude：{coordinates.lat}</p> */}
            {/* <p>Longitude：{coordinates.lng}</p> */}

            <Input {...getInputProps({ placeholder: "Type address" })} />
            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#16A085" : "#fff",
                };

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={suggestion.placeId}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </InputArea>
  );
}

export default MapAutocomplete;
