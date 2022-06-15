import React from "react";
import DayListItem from "./DayListItem";

const DayList = function(props) {

  const dayListComponents = props.days.map(day => {
    return (
      <DayListItem
        key = {day.id}
        name = {day.name}
        spots = {day.spots}
        setDay = {props.setDay}
        day = {props.day}
        days = {props.days}
        />
    )
  })


  return (
    <ul> {dayListComponents} </ul>
  )
}

export default DayList;