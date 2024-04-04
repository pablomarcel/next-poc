// src/pages/api/graphql.js
import { ApolloServer, gql } from 'apollo-server-micro';
import pool from '../../db'; // Importing the pool instance from db.js

// GraphQL type definitions
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Mutation {
    addUser(name: String!, email: String!): User!
  }

  type Query {
    sayHello: String
    users: [User!]!
  }
`;

// GraphQL resolvers
const resolvers = {
    Query: {
        sayHello: () => 'Hello World!',
        users: async () => {
            try {
                const { rows } = await pool.query('SELECT * FROM users');
                return rows;
            } catch (e) {
                console.error(e.stack);
                throw new Error('Failed to fetch users');
            }
        },
    },
    Mutation: {
        addUser: async (_, { name, email }) => {
            try {
                const { rows } = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
                return rows[0];
            } catch (e) {
                console.error(e.stack);
                throw new Error('Failed to add user');
            }
        },
    },
};

// Creating the Apollo Server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Here you could add additional context from the request if needed
    },
});

// Start the Apollo Server
const startServer = apolloServer.start();

export default async function handler(req, res) {
    // Set up CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Should be the domain of your client app in production
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );

    // Handle preflight requests for CORS
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    await startServer;
    // Creating the handler for the Apollo Server
    apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
}

// Next.js API route configuration
export const config = {
    api: {
        bodyParser: false,
    },
};
