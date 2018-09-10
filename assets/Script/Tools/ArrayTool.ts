export default class ArrayTool {
    static group<T>(arr: T[], ...funcs: ((t: T) => boolean)[]): T[][] {
        const funcGroups: T[][] = [][funcs.length];
        for (const a of arr) {
            for (let i = 0; i < funcs.length; i++) {
                const func = funcs[i];
                if (func(a)) {
                    funcGroups[i].push(a);
                }
            }
        }

        return funcGroups;
    }

    static find<T>(arr: T[], func: (a: T) => boolean): T {
        for (const a of arr) {
            if (func(a))
                return a;
        }
        return null;
    }

    static finds<T>(arr: T[], func: (a: T) => boolean): T[] {
        const ts: T[] = [];
        for (const a of arr) {
            if (func(a))
                ts.push(a);
        }
        return ts;
    }

    static insert<T>(arr: T[], index: number, item: T) {
        arr.splice(index, 0, item);
    }

    static remove<T>(arr: T[], item: T) {
        const index = arr.indexOf(item);
        if (index != -1)
            arr.splice(index, 1);
    }

    static fastRemove<T>(arr: T[], item: T) {
        const index = arr.indexOf(item);
        if (index != -1) {
            const last = arr.length - 1;
            arr[index] = arr[last];
            arr[last] = null;
        }
    }

    static equals<T>(arr1: T[], arr2: T[]) {
        if (arr1.length != arr2.length)
            return false;

        for (let i = 0; i < arr1.length; i++) {
            const a1 = arr1[i];
            const a2 = arr2[i];
            if (a1 != a2)
                return false;
        }
        return true;
    }

    static toArray<T>(obj: Object) {
        const arr = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key];
                arr.push(element);
            }
        }
        return arr;
    }
}