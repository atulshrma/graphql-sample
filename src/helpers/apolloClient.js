import { ApolloClient, InMemoryCache } from '@apollo/client';

let client;

export default function getClient() {
    if (!client) {
        client = new ApolloClient({
            // TODO: Figure out how process.env can be used with docker + webpack
            // uri: process.env.BASE_URL + '/graphql',
            uri: `http://${window.location.host}/graphql`,
            cache: new InMemoryCache(),
        });
    }
    return client;
}
