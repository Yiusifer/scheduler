import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointments from "./Appointments";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "./helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {}

  });

  // const [days, setDays] = useState([])
  // const [day, setDay] = useState('Monday');

  const setDay = function (day) {
    setState({ ...state, day: day });
  }



  //Based on the id of the appointment, updates state with interview object
  function bookInterview(id, interview) {
    console.log('Id and interview:', id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Updates database with the saved interview(persistent data)
    return axios.put(`/api/appointments/${id}`, {
      interview: interview
    }).then(() => {
      setState({ ...state, appointments })

    })
    // .catch((error) => {
    //   console.log(`Error: ${error}`)
    // })
  }

  //Spread the interview object within appointments before setting it to null?
  function cancelInterview(id) {

    //Spreads the existing interview object in state.appointments at the given id (initially not null)
    const appointmentInterview = {
      ...state.appointments[id].interview

    }
    //Spreads the appointment object at the given id
    const appointment = {
      ...state.appointments[id],
      interview: null
      //Use spread version of interview object instead of setting it directly? => appointmentInterview


    }
    //Spreads all appointments and sets the appointment object at the given id to appointment above
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    console.log('This is the appointment interview:', appointmentInterview)

   return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({ ...state, appointments })
    })
    // .catch((error) => {
    //   console.log(`Error: ${error.response.data}`)
    // })

  }


  const dailyAppointments = getAppointmentsForDay(state, state.day)

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })

  }, [])

  //console.log('Interviewers:', JSON.stringify(state.interviewers))


  // useEffect(() => {
  //   axios.get("/api/days")
  //     .then((response) => {
  //       console.log(response.data)
  //       setState({...state, days: response.data})

  //     })
  // }, [])

  ///console.log('This is the state:', state)

  const parsedAppointments = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview)

    return (
      <Appointments
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}


      //{...appointment}
      />
    )

  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            value={state.day}
            //setDay = {(setDay) => console.log(state.day)}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointments key="last" time="5pm" />
      </section>


    </main>
  );
}
