type Listener = () => void;

const eventEmitter = {
    listeners: [] as Listener[],
    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => this.unsubscribe(listener);
    },
    unsubscribe(listener: Listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    },
    emit() {
        this.listeners.forEach(listener => listener());
    },
};

export default eventEmitter;