import React from "react"
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

//props.value = integer

const InterviewerList = function (props) {

  const parsedInterviewerList = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}

      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewerList}
      </ul>
    </section>
  )
}

export default InterviewerList