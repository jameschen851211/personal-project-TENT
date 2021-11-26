import React from "react";
import "../../App.css";
import MyWishList from "../MyWishList";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Wishlists() {
  return (
    <>
      <Navbar />
      <MyWishList />
      <Footer />
    </>
  );
}
