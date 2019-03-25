import CURRENT_ORG from './types'

export const updateCurrentOrg = currentOrganization => {
  return {
    type: CURRENT_ORG,
    payload: currentOrganization
  }
}
