import React from "react";
import CardItem from "./CardsItem";
import "./Cards.css";

import newTaipei from "../imge/甜蜜點休閒莊園.jpeg";
import Miaoli from "../imge/山美學.webp";
import Pingtung from "../imge/O’GLAMPING 墾丁貓鼻頭露營莊園.jpeg";

function Cards() {
  return (
    <div className="cards">
      <h1>Check out more different camping types!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src={newTaipei}
              text="Recommended camping sites in northern Taiwan  "
              label="新北"
              path="/products/search/新北"
            />
            <CardItem
              src={Pingtung}
              text="Recommended camping areas in southern Taiwan "
              label="屏東"
              path="/products/search/屏東"
            />
            <CardItem
              src={Miaoli}
              text="Recommended Camping Sites in Central Taiwan "
              label="苗栗"
              path="/products/search/苗栗"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
