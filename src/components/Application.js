import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointments from "./Appointments";
import { stat } from "fs";
import { getAppointmentsForDay } from "./helpers/selectors";


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

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  useEffect(() =>{
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
      console.log(state.days)
    })

  }, [])




  // useEffect(() => {
  //   axios.get("/api/days")
  //     .then((response) => {
  //       console.log(response.data)
  //       setState({...state, days: response.data})

  //     })
  // }, [])


  const parsedAppointments = dailyAppointments.map(appointment => {
    return (
      <Appointments
        key={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
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
