interface Window { devToolsExtension: Function }
interface Environment {
    NODE_ENV: string
}

interface Process {
    env : Environment
}

declare const process : Process;


