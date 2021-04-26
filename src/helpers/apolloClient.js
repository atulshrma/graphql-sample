import { ApolloClient, InMemoryCache } from '@apollo/client';

let client;

export default function getClient() {
    if (!client) {
        client = new ApolloClient({
            uri: process.env.BASE_URL + '/graphql',
            cache: new InMemoryCache(),
        });
    }
    return client;
}
