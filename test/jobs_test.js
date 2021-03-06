import { expect } from 'chai';
import Jobs from '../src/components/jobs/entity';
import { getJobs } from '../src/components/jobs/controller';

const TEXT_SEARCH_NAMES = [
    'The Lord of the Rings: The Return of the King',
    'District Solutions Orchestrator',
    'Human Web Agent',
    'The Lion King',
];

const PHRASE_SEARCH_NAMES = [
    'The Lord of the Rings: The Return of the King',
    'Human Web Agent',
];

const ASC_NAME_LIST = [
    'District Solutions Orchestrator',
    'Future Functionality Officer',
    'Human Web Agent',
    'The Lion King',
    'The Lord of the Rings: The Return of the King',
];

const RECENT_EDIT_NAME_LIST = [
    'District Solutions Orchestrator',
    'The Lord of the Rings: The Return of the King',
    'Human Web Agent',
    'The Lion King',
    'Future Functionality Officer',
];

describe('Jobs', () => {
    describe('getJobs', () => {
        it('should return all docs on empty search', async () => {
            const { count } = await getJobs({});
            const totalCount = await Jobs.find().estimatedDocumentCount();
            expect(count).to.equal(totalCount);
        });

        it('should return phrase match on quoted search', async () => {
            const { count, jobs } = await getJobs({ search: '"the king"' });
            expect(count).to.equal(2);
            expect(jobs.map(({ name }) => name)).to.have.members(
                PHRASE_SEARCH_NAMES,
            );
        });

        it('should return text match on normal search', async () => {
            const { count, jobs } = await getJobs({ search: 'the king' });
            expect(count).to.equal(4);
            expect(jobs.map(({ name }) => name)).to.have.members(
                TEXT_SEARCH_NAMES,
            );
        });

        it('should return jobs in ascending order by name', async () => {
            const { jobs } = await getJobs({ orderBy: { name: 1 } });
            expect(jobs.map(({ name }) => name)).to.eql(ASC_NAME_LIST);
        });

        it('should return jobs in descending order by date', async () => {
            const { jobs } = await getJobs({
                orderBy: { dateLastEdited: -1 },
            });
            expect(jobs.map(({ name }) => name)).to.eql(RECENT_EDIT_NAME_LIST);
        });
    });
});
