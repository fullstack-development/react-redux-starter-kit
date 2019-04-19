import React from 'react';

import { Button } from 'shared/view/elements';
import { useTranslation, tKeys } from 'services/i18n';

import Dialog from '../../Dialog/Dialog';

interface IProps {
  isOpen: boolean;
  renderContent(): React.ReactChild;
  onClose(): void;
}

const { searchSettings, ok } = tKeys.shared;
function SearchSettingsDialog(props: IProps) {
  const { isOpen, onClose, renderContent } = props;
  const { t } = useTranslation();
  return (
    <Dialog
      title={t(searchSettings)}
      onClose={onClose}
      open={isOpen}
    >
      <Dialog.Content>
        {renderContent()}
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="outlined" onClick={onClose}>
          {t(ok)}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default SearchSettingsDialog;
