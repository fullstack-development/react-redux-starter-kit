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
      renderActions={renderActions}
    >
      {renderContent()}
    </Dialog>
  );

  function renderActions() {
    return <Button variant="outlined" onClick={onClose}>Ok</Button>;
  }
}

export default SearchSettingsDialog;
