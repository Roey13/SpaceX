const initialState = {
  landings: null,
  currLanding: null,
  currRocket: null,
  currLaunchpad: null
}

export function landingsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_LANDINGS':
      return { ...state, landings: action.landings, currLanding: null, currRocket: null,  currLaunchpad: null}
    case 'GET_LANDING_BY_ID':
      return { ...state, currLanding: action.currLanding }
    case 'GET_ROCKET_BY_ID':
      return { ...state, currRocket: action.currRocket }
    case 'GET_LAUNCHPAD_BY_ID':
      return { ...state, currLaunchpad: action.currLaunchpad }
    default:
      return state
  }
}