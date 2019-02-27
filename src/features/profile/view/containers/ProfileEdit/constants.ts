import { FormFieldNames } from 'shared/types/form';
import {
  isRequired, makeMaxCharactersValidator, makeMinCharactersValidator, composeValidators,
} from 'shared/validators';
import { IProfileEditFormFields } from '../../../namespace';

export const fieldNames: FormFieldNames<IProfileEditFormFields> = {
  age: 'age',
  nickname: 'nickname',
  name: 'name',
  bio: 'bio',
  avatarURL: 'avatarURL',
};

export const validateName = composeValidators(
  isRequired,
  makeMinCharactersValidator(3, 'Name'),
  makeMaxCharactersValidator(35, 'Name'),
);

export const validateNickname = composeValidators(
  isRequired,
  makeMinCharactersValidator(5, 'Nickname'),
  makeMaxCharactersValidator(20, 'Nickname'),
);

export const validateBio = makeMaxCharactersValidator(200, 'Bio');
