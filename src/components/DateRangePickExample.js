import React from "react";
import { zhTW } from "date-fns/locale";
import { DateRangePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import styled from "styled-components";
import firebase from "firebase";
import { useParams } from "react-router";

const Input = styled.input`
  width: 139px;
  height: 55px;
  cursor: pointer;
  border: 1px solid rgb(221, 221, 221);
`;

const Range = styled.div`
  margin: 0px 20px;
  padding: 10px;
`;

function DateRangePickerExample(props) {
  const [successfullyOrder, setSuccessfullyOrder] = React.useState([]);
  const { itemID } = useParams();

  const startDate = successfullyOrder.map((date) => {
    return date.startDate.seconds * 1000;
  });

  console.log(startDate);

  const endDate = successfullyOrder.map((date) => {
    return date.endDate.seconds * 1000;
  });

  const Days = (endDate[0] - startDate[0]) / (24 * 60 * 60) / 1000;
  console.log(Days);

  let DayRange = [];
  console.log(DayRange);

  for (let i = 0; i < Days; i++) {
    DayRange.push(startDate[0] + 24 * 60 * 60 * 1000 * (i + 1));
  }

  function isDateInArray(value, array) {
    for (let i = 0; i < array.length; i++) {
      if (value === array[i]) {
        return true;
      }
    }
    return false;
  }

  const modifiers = {
    disabled: (date) => {
      return +date === startDate[0] || isDateInArray(+date, DayRange);
    },
  };

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("successfullyOrder")
      .where("itemID", "==", itemID)
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setSuccessfullyOrder(data);
        console.log(data);
      });
  }, []);

  return (
    <DateRangePicker
      startDate={props.startDate}
      endDate={props.endDate}
      onStartDateChange={props.setStartDate}
      onEndDateChange={props.setEndDate}
      minimumDate={new Date()}
      minimumLength={1}
      format="dd MMM yyyy"
      locale={zhTW}
      modifiers={modifiers}
      // modifiersClassNames={modifiersClassNames}
    >
      {({ startDateInputProps, endDateInputProps, focus }) => (
        <Range>
          <Input {...startDateInputProps} placeholder="入住" />
          <Input {...endDateInputProps} placeholder="退房" />
        </Range>
      )}
    </DateRangePicker>
  );
}

export default DateRangePickerExample;
