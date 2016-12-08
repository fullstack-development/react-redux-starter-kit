import * as React from 'react';

interface Props {}

class App extends React.Component<Props, null> {
    render () {
        const {children} = this.props;

        return (
            <div>
                <p>Hello from app</p>
                {children}
            </div>
        );
    }
}

export {Props};
export default App;
