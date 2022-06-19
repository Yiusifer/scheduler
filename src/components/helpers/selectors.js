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
  let parsedInterview = {};

  if (interview !== null) {
    for (let interviewerId in state.interviewers) {
      if (interview.interviewer == interviewerId) {
        parsedInterview['student'] = interview.student;
        parsedInterview['interviewer'] = state.interviewers[interviewerId];
        return parsedInterview;
      }
    }
  }
  return null
}