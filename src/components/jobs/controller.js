import boom from 'boom';
import { GetJobs } from './usecases';

export async function getJobs({ page = 1, size = 10, search = '' }) {
    try {
        const skip = (page - 1) * size;
        const limit = size;
        const { jobs, count } = await GetJobs({ skip, limit, search });
        return { jobs, count };
    } catch (err) {
        throw boom.boomify(err);
    }
}
