import React from "react";
import "components/Appointments/index.scss";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import Header from "components/Appointments/Header";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";


const Appointments = function (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log('These are the interviewers', props.interviewers)
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd = {() => transition(CREATE)}/>}
      {mode === SHOW && <Show interviewer = {props.interview.interviewer} student = {props.interview.student} />}
      {mode === CREATE && <Form interviewers = {props.interviewers} onCancel = {() => transition(EMPTY)} onConfirm = {() => console.log(`Appointment confirmed`)} />}

    </article>

  )
}

export default Appointments;

// {props.interview ? <Show interviewer = {props.interview.interviewer} student = {props.interview.student}/> : <Empty/>}