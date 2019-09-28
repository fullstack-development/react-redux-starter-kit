import * as NS from '../../namespace';

export function resetRepository(): NS.IResetRepository {
  return { type: 'PROFILE:RESET_REPOSITORY' };
}
