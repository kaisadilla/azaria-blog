/**
 * Generates the className string from the arguments given.
 * Two types of arguments can be passed:
 ** A string, which will be added to the class names.
 ** An array containing a string and a boolean. The string will be added as
 * a class name only if the boolean given is true.
 * @param params 
 * @returns 
 */
export function getClassString (
    ...params: (string | boolean | [string, boolean | undefined] | undefined | null)[]
) : string
{
    let str = "";

    for (const classEntry of params) {
        if (classEntry === undefined) {
            continue;
        }
        if (classEntry === null) {
            continue;
        }
        if (classEntry === false) {
            continue;
        }
        // if the entry is conditional.
        if (Array.isArray(classEntry)) {
            if (classEntry[1]) {
                str += classEntry[0] + " ";
            }
        }
        else {
            str += classEntry + " ";
        }
    }

    return str.trim();
}

export function clampNumber (num: number, min: number, max: number) {
    return Math.max(Math.min(num, max), min);
}

export function truncateNumber (num: number, decimalPlaces: number) {
    const multiplier = 10 ** decimalPlaces;
    const numToTrim = num * multiplier;
    const truncated = Math[numToTrim < 0 ? 'ceil' : 'floor'](numToTrim);
    return truncated / multiplier;
}

export interface Vec2 {
    x: number;
    y: number;
}

/**
 * Removes the item in the array at the index given. This MUTATES the array
 * given, and doesn't return anything.
 * @param arr The array to remove an item from.
 * @param index The index of the item to remove.
 */
export function deleteArrayItemAt<T> (arr: T[], index: number) {
    arr.splice(index, 1);
}

export function deleteArrayItem<T> (arr: T[], item: T) {
    const index = arr.indexOf(item);
    if (index !== -1) {
        deleteArrayItemAt(arr, index);
    }
}

export function arrayUnion<T> (a: T[], b: T[]) {
    const set = new Set<T>();

    for (const item of [...a, ...b]) {
        set.add(item);
    }

    return Array.from(set);
}

/**
 * Splits a string into the lines it includes.
 * @param string The string to split into lines.
 */
export function splitIntoLines (string: string) {
    return string.split(/\r?\n|\r|\n/g);
}