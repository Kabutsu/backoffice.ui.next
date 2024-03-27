type GraphQLResponse<T> = {
  data: T;
  errors?: Array<{ message: string } & Record<string, any>>;
};

type ApiResponse<T extends string, U> = GraphQLResponse<{
  [key in T]: U;
}>;

export type {
  GraphQLResponse,
  ApiResponse
};
