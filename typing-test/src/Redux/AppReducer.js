const initState = {
  presentText: "",
  wpm: 0,
  accuracy: 0,
  pressedkey: 0,
  wpmIn5: 0,
  typedText : ""
};

function AppReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE": {
      return { ...state, presentText: payload };
    }
    case "SHOW": {
      return { ...state, wpm: payload.wpm, accuracy: payload.accuracy };
    }
    case "5MIN": {
      return {
        ...state,
        pressedkey: payload.allchar,
        wpmIn5: payload.allchar,
        wpm : payload.allchar / 5,
      };
    }
    case "ONCHANGE": {
      return {
        ...state,
        typedText : payload.text
      };
    }
    case "WPMCHANGE": {
      return {
        ...state,
        wpm : payload.WPM
      };
    }

    default:
      return state;
  }
}
export { AppReducer };
