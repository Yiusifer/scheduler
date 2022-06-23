import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointments from "./Appointments";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "./helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {

  const { state, setState, setDay, bookInterview, cancelInterview } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

 // console.log(state.days)


  const parsedAppointments = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview)
    console.log(interview)

    return (
      <Appointments
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
