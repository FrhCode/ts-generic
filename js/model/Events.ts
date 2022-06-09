import callback from "../interface/callback";

class Events {
    private events: { [key: string]: callback[] } = {};

    on = (eventName: string, callback: callback): void => {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);

        this.events[eventName] = handlers;
    };

    trigger = (eventName: string): void => {
        const handlers = this.events[eventName];

        if (!handlers) return;
        for (let i = 0; i < handlers.length; i++) {
            handlers[i]();
        }
    };
}

export default Events;
