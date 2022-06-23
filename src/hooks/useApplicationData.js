import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from 'components/helpers/selectors';
import { stat } from 'fs';


const useApplicationData = function () {

  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {}

  });


  const setDay = function (day) {
    setState({ ...state, day: day });
  };



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

const updateSpots = (state) => {

  const dayToChange = state.days.find(day => day.name === state.day);
  const newDay = {...dayToChange };


  const spots = (dayToChange.appointments.filter(appointmentId => {

     return !state.appointments[appointmentId].interview
    })
  ).length



  newDay.spots = spots;

  const newDaysArray = [...state.days];
  const dayIndex = state.days.findIndex((day) => day.name === state.day);

  newDaysArray[dayIndex] = newDay;

  const newState = {...state, days: newDaysArray};

  return newState;

}

  //Based on the id of the appointment, updates state with interview object
  function bookInterview(id, interview) {
  //  console.log('Id and interview:', id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //const newState = {...state};

    //const newNewState = updateSpots(newState)

    const newState = updateSpots({...state, appointments})

    //Updates database with the saved interview(persistent data)
    return axios.put(`/api/appointments/${id}`, {
      interview: interview
    }).then(() => {
      //setState({ ...state, appointments })
      setState(newState)
    })

  }




  function cancelInterview(id) {

    //Spreads the existing interview object in state.appointments at the given id (initially not null)
    const appointmentInterview = {
      ...state.appointments[id].interview

    }
    //Spreads the appointment object at the given id
    const appointment = {
      ...state.appointments[id],
      interview: null

    }
    //Spreads all appointments and sets the appointment object at the given id to appointment above
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    // const newState = {...state};

    // const newNewState = updateSpots(newState)
    const newState = updateSpots({...state, appointments})

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(newState)

      })
  }



  return {
    state: state, setState,
    setDay: setDay,
    bookInterview: bookInterview,
    cancelInterview: cancelInterview
  }

}



export default useApplicationData;