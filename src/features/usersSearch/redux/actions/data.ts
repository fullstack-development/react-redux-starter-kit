import * as NS from '../../namespace';

export function resetUserDetails(): NS.IResetUserDetails {
  return { type: 'USER_SEARCH:RESET_USER_DETAILS' };
}

export function resetSearchResults(): NS.IResetSearchResults {
  return { type: 'USER_SEARCH:RESET_SEARCH_RESULTS' };
}
