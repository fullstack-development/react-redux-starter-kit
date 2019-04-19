import React from 'react';

import { Button } from 'shared/view/elements';

import Dialog from '../../Dialog/Dialog';

interface IProps {
  isOpen: boolean;
  dialogTitleText: string;
  dialogSubmitText: string;
  renderContent(): React.ReactChild;
  onClose(): void;
}

function SearchSettingsDialog(props: IProps) {
  const { isOpen, onClose, renderContent, dialogTitleText, dialogSubmitText } = props;
  return (
    <Dialog
      title={dialogTitleText}
      onClose={onClose}
      open={isOpen}
    >
      <Dialog.Content>
        {renderContent()}
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="outlined" onClick={onClose}>
          {dialogSubmitText}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default SearchSettingsDialog;
