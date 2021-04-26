import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
} from 'graphql';
import { getJobs } from '../../components/jobs/controller';

const JobType = new GraphQLObjectType({
    name: 'Job',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        description: { type: GraphQLString },
        dateLastEdited: { type: GraphQLString },
    }),
});

const JobListType = new GraphQLObjectType({
    name: 'Jobs',
    fields: () => ({
        count: { type: GraphQLInt },
        jobs: { type: new GraphQLList(JobType) },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        jobs: {
            type: JobListType,
            args: {
                page: { type: GraphQLInt },
                size: { type: GraphQLInt },
                search: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return await getJobs(args);
            },
        },
    },
});

// Export the schema
export default new GraphQLSchema({
    query: RootQuery,
});
