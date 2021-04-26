import Jobs from './entity.js';
import buildSearchFilter from './helpers/buildSearchFilter';

export async function GetJobs({ skip, limit, search }) {
    const filter = buildSearchFilter(search);

    const jobs = await Jobs.find(filter).skip(skip).limit(limit);
    const count = await Jobs.find().estimatedDocumentCount();

    return { jobs, count };
}
