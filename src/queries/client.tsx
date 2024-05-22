import { ApolloClient, InMemoryCache } from '@apollo/client'

// Initialize Apollo Client
export const client = new ApolloClient({
	uri: 'https://knwxh8dmh1.execute-api.eu-central-1.amazonaws.com/graphql',
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					program: {
						// Don't cache separate results based on
						// any of this field's arguments.
						keyArgs: false,

						// Concatenate the incoming list items with
						// the existing list items.
						merge(existing = [], incoming) {
							return {
								...existing,
								...incoming,
								events: [...(existing.events || []), ...(incoming.events || [])],
							}
						},
					},
				},
			},
		},
	}),
})
