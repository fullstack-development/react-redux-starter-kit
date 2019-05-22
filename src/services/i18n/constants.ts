import { Lang } from 'shared/types/app';
import buildTranslationKeys from './helpers/buildTranslationKeys';
import { en } from './locales';

export const FALLBACK_LANGUAGE: Lang = 'en-US';
export const tKeys = buildTranslationKeys(en);
