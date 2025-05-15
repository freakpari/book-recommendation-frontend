type Listener = () => void;

const likeEventEmitter = {
  listeners: [] as Listener[],

  subscribe(listener: Listener) {
    likeEventEmitter.listeners.push(listener);
    return () => {
      likeEventEmitter.listeners = likeEventEmitter.listeners.filter(
        l => l !== listener
      );
    };
  },

  emit() {
    likeEventEmitter.listeners.forEach(listener => listener());
  },
};

export default likeEventEmitter;
