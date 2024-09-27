//create types for typeScript
export enum StatusUs {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  BROKEN = "BROKEN",
}

export type User = {
  id: string;
  name: string;
  email: string;
  edits: PromiseType[]; // Array of related promises
  createdAt: Date;
  updatedAt: Date;
};

export type PromiseType = {
  id: string;
  title: string;
  description: string;
  editedBy: User; // User who edited the promise
  editedById: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  status: StatusUs; // Enum value for status
};

export type CreatePromiseResponse = {
  createPromise: PromiseType; // The promise that was created
};

export type CreateUserInput = {
  name: string;
  email: string;
};

export type CreatePromiseInput = {
  input: {
    title: string;        // Title of the promise
    description: string;  // Description of the promise
    editedById: string;   // ID of the user who edited the promise
  };
};

export type UpdatePromiseInput = {
  id: string;
  title?: string;
  description?: string;
  status?: StatusUs;
};

export type Query = {
  getUsers: User[]; // Fetches an array of users
  getUser: (id: string) => User | null; // Fetch a single user by ID
  getPromises: PromiseType[]; // Fetches an array of promises
  getPromise: (id: string) => PromiseType | null; // Fetch a single promise by ID
};

export type Mutation = {
  createUser: (input: CreateUserInput) => User; // Create a new user
  createPromise: (input: CreatePromiseInput) => PromiseType; // Create a new promise
  updatePromise: (input: UpdatePromiseInput) => PromiseType; // Update an existing promise
};