import Jobs from './entity';
import buildSearchFilter from './helpers/buildSearchFilter';
import buildSortMap from './helpers/buildSortMap';

export async function GetJobs({ skip, limit, search, orderBy }) {
    const filter = buildSearchFilter(search);
    const sort = buildSortMap(orderBy);

    const jobs = await Jobs.find(filter).sort(sort).skip(skip).limit(limit);
    const count = await Jobs.find(filter).count();

    return { jobs, count };
}
