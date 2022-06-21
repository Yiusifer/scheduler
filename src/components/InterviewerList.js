import React from "react"
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";



const InterviewerList = function (props) {

  console.log(props)

  const parsedInterviewerList = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key = {interviewer.id}
        name = {interviewer.name}
        avatar = {interviewer.avatar}
        selected = {interviewer.id === props.value.id}
        setInterviewer = {() => props.onChange(interviewer.id)}

      />
    )
  })
  console.log(parsedInterviewerList)

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