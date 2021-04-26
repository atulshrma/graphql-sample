import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLEnumType,
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

const SortEnumType = new GraphQLEnumType({
    name: 'Sort',
    values: {
        asc: { value: 1 },
        desc: { value: -1 },
    },
});

const JobsOrderByInputType = new GraphQLInputObjectType({
    name: 'JobsOrderByInput',
    fields: () => ({
        name: { type: SortEnumType },
        dateLastEdited: { type: SortEnumType },
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
                orderBy: { type: JobsOrderByInputType },
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
