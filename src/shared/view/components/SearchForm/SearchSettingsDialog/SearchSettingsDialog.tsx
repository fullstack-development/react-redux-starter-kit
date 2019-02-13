import * as React from 'react';
import block from 'bem-cn';

import { Button } from 'shared/view/elements';
import Dialog from '../../Dialog/Dialog';

import './SearchSettingsDialog.scss';

const b = block('search-settings-dialog');

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
      <div className={b()}>
        {renderContent()}
      </div>
    </Dialog>
  );

  function renderActions() {
    return (
      <div className={b('actions')}>
        <Button variant="outlined" onClick={onClose}>Ok</Button>
      </div>
    );
  }
}

export default SearchSettingsDialog;
