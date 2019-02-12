import * as NS from '../../namespace';

export function resetSearchResults(): NS.IResetSearchResults {
  return { type: 'REPOSITORIES_SEARCH:RESET_SEARCH_RESULTS' };
}
