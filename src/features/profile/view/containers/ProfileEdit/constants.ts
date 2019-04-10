import { FormFieldNames } from 'shared/types/form';
import { IProfileEditFormFields } from '../../../namespace';

export const fieldNames: FormFieldNames<IProfileEditFormFields> = {
  age: 'age',
  nickname: 'nickname',
  name: 'name',
  bio: 'bio',
  avatarURL: 'avatarURL',
};

export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 35;
export const MIN_NICKNAME_LENGTH = 3;
export const MAX_NICKNAME_LENGTH = 13;
export const MAX_BIO_LENGTH = 200;
