/**
 * Creates a new object with specified keys omitted
 * @param obj - Source object
 * @param keys - Keys to omit from the object
 * @returns New object without the specified keys
 */
export const omit = <T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys: K[]
): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result as Omit<T, K>;
};
