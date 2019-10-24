import { ISelectOption } from 'shared/types/form';

type ValueLabelMap = Record<ISelectOption['value'], ISelectOption['label']>;

function getSelectValuesToLabelsMap(selectOptions: ISelectOption[]): ValueLabelMap {
  return selectOptions.reduce((map, option) => ({ ...map, [option.value]: option.label }), {});
}

export { getSelectValuesToLabelsMap };
