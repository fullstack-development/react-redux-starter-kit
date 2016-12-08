// Global definitions (you shouldn't import it, it is global scope)

interface Window { devToolsExtension: Function }
interface Environment {
    NODE_ENV: string
}

interface Process {
    env : Environment
}

declare const process : Process;


