import { AxiosPromise, AxiosResponse } from "axios";
import callback from "../interface/callback";

interface ModelAttributes<T> {
    get<K extends keyof T>(key: K): T[K];
    set(props: T): void;
    getAll(): T;
}

interface Sync<T> {
    save(data: T): AxiosPromise<T>;
    fetch(id: number): AxiosPromise<T>;
}

interface Event {
    on(eventName: string, callback: callback): void;
    trigger(event: string): void;
}
interface hasId {
    id?: number;
}
class Model<T extends hasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private Sync: Sync<T>,
        private events: Event
    ) {}

    on = this.events.on;

    trigger = this.events.trigger;

    get = this.attributes.get;

    set(props: T) {
        this.attributes.set(props);
        this.events.trigger("change");
    }

    fetch() {
        const id = this.attributes.get("id");

        if (typeof id !== "number") throw Error("Please Provide an ID");

        this.Sync.fetch(id).then((resp: AxiosResponse): void => {
            this.set(resp.data);
        });
    }

    save() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.Sync.save(this.attributes.getAll()).then((resp) => {
            this.trigger("save");
        });
    }
}

export default Model;
