import * as NS from '../../namespace';

export function resetUserDetails(): NS.IResetUserDetails {
  return { type: 'USERS_SEARCH:RESET_USER_DETAILS' };
}

export function resetSearchResults(): NS.IResetSearchResults {
  return { type: 'USERS_SEARCH:RESET_SEARCH_RESULTS' };
}
