type GraphQLResponse<T> = {
  data: T;
  errors?: Array<{ message: string } & Record<string, any>>;
};

type ApiResponse<T extends string, U> = GraphQLResponse<{
  [key in T]: U;
}>;

type PaginatedApiResponse<T extends string, U> = ApiResponse<T, {
  totalCount: number;
  items: U;
}>;

type ApolloResponse<T extends string, U> = {
  [key in T]: U;
};

export type {
  GraphQLResponse,
  ApiResponse,
  PaginatedApiResponse,
  ApolloResponse,
};
