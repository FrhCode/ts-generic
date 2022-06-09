class Attributes<T> {
    constructor(private data: T) {}
    get = <K extends keyof T>(props: K): T[K] => {
        return this.data[props];
    };

    set = (props: T): void => {
        Object.assign(this.data, props);
    };

    getAll(): T {
        return this.data;
    }
}

export default Attributes;
