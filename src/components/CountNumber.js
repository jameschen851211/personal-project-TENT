import React from "react";
import "./CountNum.css";
import styled from "styled-components";

const HandleAdd = styled.div`
  background-color: #00bfac;
  color: rgb(229, 226, 226);
  width: 25px;
  height: 25px;
  cursor: pointer;
  text-align: center;
  border-radius: 300px;
  line-height: 23px;
`;

const HandleReduce = styled.div`
  background-color: #00bfac;
  color: rgb(229, 226, 226);
  width: 25px;
  height: 25px;
  cursor: pointer;
  text-align: center;
  border-radius: 300px;
  line-height: 23px;
`;

const CountArea = styled.div`
  margin: -31px 30px 5px 30px;
  padding: 10px;
  display: flex;
  border: 1px solid #eae8e4;
  justify-content: space-between;
  width: 268px;
`;

const Count = styled.span`
  font-size: 20px;
  color: gray;
`;

function CountNum({ count, setCount }) {
  const handleClickReduce = () => {
    if (count >= 1) {
      setCount(count - 1);
    } else {
      return;
    }
  };

  const handleClickAdd = () => {
    setCount(count + 1);
  };

  return (
    <CountArea>
      <HandleReduce onClick={handleClickReduce}>-</HandleReduce>
      <Count>{count}</Count>
      <HandleAdd onClick={handleClickAdd}>+</HandleAdd>
    </CountArea>
  );
}

export default CountNum;
