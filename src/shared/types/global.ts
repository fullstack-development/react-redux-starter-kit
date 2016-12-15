// Global definitions (you shouldn't import it, it is global scope)


interface Window { devToolsExtension: Function }
interface Environment {
    NODE_ENV: string
}

interface Process {
    env : Environment
}

interface Require {
    context: Function
}

declare const process : Process;
declare const require : Require;

declare module 'react-tap-event-plugin';
declare module 'bem-cn';
declare module '*.styl';
declare module '*.png';
declare module 'shared/*';
