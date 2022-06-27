import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React, { useState } from "react";

const Form = function (props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")

  const reset = function () {
     return setStudent(""), setInterviewer(null)
  }

  const cancel = function () {
   return reset(), props.onCancel
  //  setStudent("")
  //  setInterviewer(null)
  //  props.onCancel()
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    props.onSave(student, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit = {event => event.preventDefault}>
          <input
            className="appointment__create-input text--semi-bold"
            name= "name"
            type="text"
            value = {student}
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            data-testid = "student-name-input"
          />
        </form>

        <section className="appointment__validation">{error}</section>

        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
          />


      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>

  )
}

export default Form;