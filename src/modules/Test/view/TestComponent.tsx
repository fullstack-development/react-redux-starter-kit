import * as React from 'react';

interface HelloProps { compiler: string; framework: string; }

class Hello extends React.Component<HelloProps, {}> {

    static defaultProps = {
        compiler: 'TypeScript',
        framework: 'React'
    };

    greet () : string {
        return 'Hello';
    }

    render() {
        const hello : string = this.greet();
        return <h1>{hello} from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

export { HelloProps };
export default Hello;
