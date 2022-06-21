import React from "react";
import "components/Appointments/index.scss";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import Status from "./Status";
import Header from "components/Appointments/Header";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";


const Appointments = function (props) {


  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const STATUS = "STATUS"
  const CONFIRM = "CONFIRM"
  const DELETING = "DELETING"
  const SAVING = "SAVING"
  const EDIT = "EDIT"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Save a new interview
  function save(name, interviewer) {
    //Interview object to be passsed to bookInterview
    const interview = {
      student: name,
      interviewer
    };

    //Display status before saving/showing interview
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  ///Delete an existing interview
  function cancel() {
    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd = {() => transition(CREATE)}/>}
      {mode === SHOW && <Show interviewer = {props.interview.interviewer}
                              student = {props.interview.student}
                              onDelete = {() => transition(CONFIRM)}
                              onEdit = {() => transition(EDIT)}
                              />}

      {mode === EDIT && <Form interviewers = {props.interviewers}
                              onCancel = {() => transition(SHOW)}
                              onSave = {save}
                              student = {props.interview.student}
                              interviewer = {props.interview.interviewer}
                              />}


      {mode === CREATE && <Form interviewers = {props.interviewers}
                                onCancel = {() => transition(EMPTY)}
                                onSave = {save}
                                />}

      {mode === CONFIRM && <Confirm message = 'Delete the appointment?' onCancel = {back} onConfirm = {cancel}/>}
      {mode === SAVING && <Status message = 'Saving...'/>}
      {mode === DELETING && <Status message = 'Deleting...'/>}



    </article>


  )
}

export default Appointments;

// {props.interview ? <Show interviewer = {props.interview.interviewer} student = {props.interview.student}/> : <Empty/>}