import React from "react";
import "components/Appointments/index.scss";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import Header from "components/Appointments/Header";

const Appointments = function(props) {
  console.log(Empty)
  return (
    <article className="appointment">
      <Header time = {props.time}/>
      {props.interview ? <Show interviewer = {props.interview.interviewer} student = {props.interview.student}/> : <Empty/>}

    </article>

  )
}

export default Appointments;