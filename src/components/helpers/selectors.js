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