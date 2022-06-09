import axios, { AxiosPromise } from "axios";

interface hasId {
    id?: number;
}

class Sync<T extends hasId> {
    constructor(private url: string) {}
    save(data: T): AxiosPromise<T> {
        const { id } = data;

        if (id) {
            return axios.put<T>(this.url + "/" + id, data);
        } else {
            return axios.post<T>(this.url, data);
        }
    }

    fetch(id: number): AxiosPromise<T> {
        return axios.get(this.url + "/" + id);
    }
}

export default Sync;
