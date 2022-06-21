export function getAppointmentsForDay(state, day) {
  let filteredInterviews = [];
  state.days.filter(weekday => {
    if (weekday.name === day) {
      for (let appoinmentId of weekday.appointments) {
        for (let appointmentListing in state.appointments) {
          if (appoinmentId == appointmentListing) {
            filteredInterviews.push(state.appointments[appoinmentId])
          }
        }
      }
    }
  }
  )
  return filteredInterviews;
}


export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer]


  return { ...interview, interviewer }


}



export function getInterviewersForDay(state, day) {
  let filteredInterviewers = [];
  state.days.filter(weekday => {
    if (weekday.name === day) {
      for (let interviewerId of weekday.interviewers) {
        for (let interviewer in state.interviewers) {
          if (interviewerId == interviewer) {
            filteredInterviewers.push(state.interviewers[interviewer])
          }
        }
      }
    }
  }
  )
  return filteredInterviewers;
}

