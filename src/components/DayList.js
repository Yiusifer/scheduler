import React from "react";
import DayListItem from "./DayListItem";

const DayList = function(props) {

  const DayListComponents = props.days.map(Day => {
    return (
      <DayListItem
        id = {Day.id}
        name = {Day.name}
        spots = {Day.spots}
        />
    )
  })


  return (
    <ul> {DayListComponents} </ul>
  )
}

export default DayList;