import {
  CURRENT_ORG
} from '../actions/types'

const initialState = {
  currentOrg: 'Hello'
}

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_ORG:
      return {...state, currentOrg: action.payload}
    default:
      return state
  }
}

export default orgReducer
