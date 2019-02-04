import * as NS from '../../namespace';

export function resetUserDetails(): NS.IResetUserDetails {
  return { type: 'GITHUB_SEARCH:RESET_USER_DETAILS' };
}
