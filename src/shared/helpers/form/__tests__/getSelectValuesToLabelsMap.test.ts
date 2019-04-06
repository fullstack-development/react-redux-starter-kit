import { ISelectOption } from 'shared/types/form';
import { getSelectValuesToLabelsMap } from '../';

describe('(shared/helpers/form) getSelectValuesToLabelsMap', () => {
  it('should return select values to labels map from select options', () => {
    const selectOptions: ISelectOption[] = [
      { value: 1, label: 'label1' },
      { value: 2, label: 'label2' },
      { value: 3, label: 'label3' },
    ];
    const valuesToLabelsMap = getSelectValuesToLabelsMap(selectOptions);
    selectOptions.forEach(option => {
      expect(valuesToLabelsMap[option.value]).toBe(option.label);
    });
  });
});
