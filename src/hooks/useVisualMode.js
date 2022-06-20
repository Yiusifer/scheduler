import React, { useState } from "react";

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode])

  function transition(newMode, replace = false) {

    setMode(newMode);

    if (!replace) {
      //Only add to history if the newMode does not exist within it
      for (let historyState of history) {
        if (historyState === newMode) {
          return;
        }
      }
      setHistory(prev => ([...prev, newMode]));
    }

    if (replace) {
    // Replaces last index of history with newMode if replace = true
    setHistory(history.filter(state => state !== history[(history.length - 1)]));
    setHistory(prev => ([...prev, newMode]));

    }

  };

  function back() {
    //Will not go back farther than the initial value
    if (history.length > 1) {
      //Set mode to second last index of history array
      setMode(history[(history.length - 2)]);
      //Removes the last index of the history array
      setHistory(history.filter(state => state !== history[(history.length - 1)]));
    }

    //If only initial value within history, mode = initial value
    if (history.length === 1) {
      setMode(history[0])
    }

  };

  return { mode, transition, back }

}

