type GraphQLResponse<T> = {
  data: T;
  errors?: Array<{ message: string } & Record<string, any>>;
};

type ApiResponse<T extends string, U> = GraphQLResponse<{
  [key in T]: U;
}>;

type ApolloResponse<T extends string, U> = {
  [key in T]: U;
};

export type {
  GraphQLResponse,
  ApiResponse,
  ApolloResponse,
};
