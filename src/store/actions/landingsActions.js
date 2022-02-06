import { landingsService } from '../../services/landingsService'

export function getLandings(){
  return async dispatch => {
    try {
      const landings = await landingsService.getLandings()
      dispatch({ type: 'GET_LANDINGS', landings })
    } catch (err) {}
  }
}

export function getLandingById(id){
  return async dispatch => {
    try {
      const currLanding = await landingsService.getLandingById(id)
      dispatch({ type: 'GET_LANDING_BY_ID', currLanding })
    } catch (err) {}
  }
}

export function getRocketById(id){
  return async dispatch => {
    try {
      const currRocket = await landingsService.getRocketById(id)
      dispatch({ type: 'GET_ROCKET_BY_ID', currRocket })
    } catch (err) {}
  }
}

export function getLaunchpadById(id){
  return async dispatch => {
    try {
      const currLaunchpad = await landingsService.getLaunchpadById(id)
      dispatch({ type: 'GET_LAUNCHPAD_BY_ID', currLaunchpad })
    } catch (err) {}
  }
}