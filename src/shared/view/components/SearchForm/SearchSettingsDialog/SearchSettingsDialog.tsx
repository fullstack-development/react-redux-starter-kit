import React from 'react';
import { Button } from 'shared/view/elements';
import Dialog from '../../Dialog/Dialog';

interface IProps {
  isOpen: boolean;
  renderContent(): React.ReactChild;
  onClose(): void;
}

function SearchSettingsDialog(props: IProps)  {
  const { isOpen, onClose, renderContent } = props;
  return (
    <Dialog
      title="Search settings"
      onClose={onClose}
      open={isOpen}
    >
      <Dialog.Content>
        {renderContent()}
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="outlined" onClick={onClose}>Ok</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default SearchSettingsDialog;
