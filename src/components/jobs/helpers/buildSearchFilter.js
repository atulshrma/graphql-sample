export default function buildSearchFilter(search) {
    const filter = {};
    if (typeof search !== 'string' || !search) {
        return filter;
    }

    if (search.startsWith('"') && search.endsWith('"')) {
        filter.$text = {
            $search: `"${search.slice(1, search.length - 1)}"`,
        };
    } else {
        filter.$text = {
            $search: search,
        };
    }

    return filter;
}
