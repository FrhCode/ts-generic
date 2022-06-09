import axios, { AxiosResponse } from "axios";
import Events from "./Events";

class Collections<T, K> {
    models: T[] = [];
    events: Events = new Events();

    constructor(private url: string, private deserialize: (json: K) => T) {}
    get on() {
        return this.events.on;
    }
    get trigger() {
        return this.events.trigger;
    }

    fetch() {
        axios.get<K[]>(this.url).then((resp: AxiosResponse) => {
            resp.data.forEach((element: K) => {
                this.models.push(this.deserialize(element));
            });
        });
    }
}

export default Collections;
