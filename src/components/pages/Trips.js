import React from "react";
import "../../App.css";
import TripsCard from "../TripsCard";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Trips() {
  return (
    <>
      <Navbar />
      <TripsCard />
      <Footer />
    </>
  );
}

export default Trips;
