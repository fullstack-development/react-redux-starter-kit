import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as block from 'bem-cn';
import 'shared/view/styles/base.styl';
import './styles.styl';
import './fonts';

interface Props {}

class App extends React.Component<Props, null> {
    render () {
        const b = block('application');
        const {children} = this.props;

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div className={b()}>
                    <header>
                        <AppBar title="Example app" />
                    </header>
                    <main>
                        {children}
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}

export {Props};
export default App;
