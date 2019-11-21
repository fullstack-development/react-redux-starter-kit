import * as NS from '../../namespace';

export function saveProfile(payload: NS.IProfileEditFormFields): NS.ISaveProfile {
  return { type: 'PROFILE:SAVE_PROFILE', payload };
}
