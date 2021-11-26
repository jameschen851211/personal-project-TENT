// import React from "react";
// import firebase from "firebase";

// function TripsCardsImage(props) {
//   const [itemData, setItemData] = React.useState([]);
//   console.log(itemData);
//   const data = props.data;
//   console.log(data);

//   React.useEffect(() => {
//     firebase
//       .firestore()
//       .collection("product")
//       .where("id", "==", data)
//       .get()
//       .then((snapshot) => {
//         snapshot.forEach((doc) => {
//           console.log(doc.data());
//         });
//       });
//   }, []);

//   return <div></div>;
// }

// export default TripsCardsImage;
