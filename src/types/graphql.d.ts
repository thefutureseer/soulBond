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
  edits: SoulPromise[]; // Array of related promises
  createdAt: Date;
  updatedAt: Date;
};

export type SoulPromise = {
  id: string;
  title: string;
  description: string;
  edits?: EditsLog[]; // Array of related soulpromises
  version: number;
  createdById: string; // ID of the user who created the promise  
  createdBy: User; // User who created the soulpromise
  createdAt: Date;
  updatedAt: Date;
  status: StatusUs; // Enum value for status
};

export type EditsLog = {
  id: string;
  version: number;
  editedBy: User; // User who edited the promise
  editedByUserId: string;
  parentId: string;
  parent?: SoulPromise; // Parent promise
  changes: JsonValue; // Allow JsonValue instead of Record<string, any>
  createdAt: Date;
};

// Define the structure of the response for GET_PROMISES
export interface GetPromisesQueryResult {
  getPromises: EditsLog[]; // An array of newest edits to SoulPromises
}

//Edit button
export interface EditButtonFormProps {
  params: {
    id: string;
  };
}

// Type for fetching a single promise
export type GetPromiseQueryResult = {
  getPromise: EditsLog | null; // A single SoulPromise or null if not found
};

export type CreatePromiseResponse = {
  createPromise: SoulPromise; // The promise that was created
};

export type UpdatePromiseResponse = {
  updatePromise: EditsLog; // The promise that was updated
};

export type CreateUserInput = {
  name: string;
  email: string;
};

export type CreatePromiseInput = {
  input: {
    title: string;        // Title of the promise
    description: string;  // Description of the promise
    createdById: string;  // ID of the user who created the promise
  };
};

export type UpdatePromiseInput = {
  title?: string;
  description?: string;
  status?: StatusUs;
  createdBy: string;
  updatedAt: Date;
  changes: {
    title: string;
    description: string;
    status: StatusUs;
    version: number;
  };
};

export type Query = {
  getUsers: User[]; // Fetches an array of users
  getUser: (id: string) => User | null; // Fetch a single user by ID
  getPromises: EditsLog[]; // Fetches an array of promises
  getPromise: (id: string) => EditsLog | null; // Fetch a single promise by ID
};

export type Mutation = {
  createUser: (input: CreateUserInput) => User; // Create a new user
  createPromise: (input: CreatePromiseInput) => SoulPromise; // Create a new promise
  updatePromise: (input: UpdatePromiseInput) => EditsLog; // Update an existing promise
};