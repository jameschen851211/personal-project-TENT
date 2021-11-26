import React from "react";
import "../App.css";
import video from "../video/video-3.mp4";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Video = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
  object-fit: contain;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 100px;
  margin-top: -100px;
  @media screen and (max-width: 960px) {
    font-size: 70px;
    margin-top: -150px;
  }
  @media screen and (max-width: 768px) {
    font-size: 50px;
    margin-top: -100px;
  }
`;

const SubTitle = styled.p`
  margin-top: 8px;
  color: #fff;
  font-size: 32px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

const SearchTitle = styled.h5`
  color: #fff;
`;

const SearchInput = styled.input`
  margin-top: -10px;
  background-color: whitesmoke;
  padding: 8px 20px;
  border-radius: 13px;
  margin-right: 10px;
  outline: none;
  border: none;
  font-size: 18px;
  margin-bottom: 16px;
  border: 1px solid #eae8e4;
  width: 300px;
  display: flex;
  @media screen and (max-width: 960px) {
    width: 300px;
    display: flex;
  }
`;

const BtnSearch = styled.div`
  background-color: #ffb517;
  color: #fff;
  padding: 8px 20px;
  border: 1px;
  transition: all 0.3s ease-out;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 24px;
`;

function HeroSection() {
  const [inputValue, setInputValue] = React.useState("");
  const history = useHistory();

  function onSubmit() {
    Swal.fire("請輸入想去的地方喔");
  }

  function pressenter(e) {
    if (e.keyCode === 13) {
      history.push(`/products/search/${inputValue}`);
    }
  }

  return (
    <Container>
      <Video src={video} autoPlay loop muted></Video>
      <Title>START CAMPING</Title>
      <SubTitle>Find your best campground</SubTitle>

      <form>
        <SearchTitle>WHERE TO?</SearchTitle>
        <SearchInput
          placeholder="Try somewhere"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => pressenter(e)}
        />
        {inputValue ? (
          <Link to={`/products/search/${inputValue}`}>
            <BtnSearch>Search</BtnSearch>
          </Link>
        ) : (
          <Link onClick={onSubmit} to={"/"}>
            <BtnSearch>Search</BtnSearch>
          </Link>
        )}
      </form>
    </Container>
  );
}

export default HeroSection;
