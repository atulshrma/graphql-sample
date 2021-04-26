const SUPPORTED_KEYS = ['name', 'dateLastEdited'];

export default function buildSortMap(orderBy) {
    if (typeof orderBy !== 'object') {
        return;
    }

    const validKeys = Object.keys(orderBy).filter((key) =>
        SUPPORTED_KEYS.includes(key),
    );

    if (!validKeys.length) {
        return;
    }

    return validKeys.reduce((sort, key) => {
        sort[key] = orderBy[key];
        return sort;
    }, {});
}
