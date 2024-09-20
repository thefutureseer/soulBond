declare module 'graphql-schema' {

  // Type for getting promises, following camelCase for field names
  export type GetPromisesData = {
    getPromises: Array<{
      id: string;
      title: string;
      description: string;
      status: string;
    }>;
  };

  // Type for User, again using camelCase for field names
  export type User = {
    id: string;
    name: string;
    promises: Promise[]; // User has an array of promises
  };

  // Type for Promise, ensuring PascalCase for type and camelCase for fields
  export type Promise = {
    id: string;
    title: string;
    description: string;
    status: string;
    creator: User; // Reference to the creator (User type)
  };

  // Query definitions for GraphQL queries
  export type Query = {
    getUsers: User[]; // Fetches an array of users
    getUser: (id: string) => User | null; // Fetch a single user by ID
    getPromises: Promise[]; // Fetches an array of promises
    getPromise: (id: string) => Promise | null; // Fetch a single promise by ID
  };

  // Mutation definitions for GraphQL mutations
  export type Mutation = {
    createUser: (name: string) => User; // Create a new user
    createPromise: (title: string, description: string, creatorId: string) => Promise; // Create a new promise
    updatePromise: (id: string, title?: string, description?: string, status?: string) => Promise; // Update an existing promise
  };
};