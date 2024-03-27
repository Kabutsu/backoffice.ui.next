import { gql } from "@apollo/client";

import { ApolloResponse } from "~/server/types";

import { Supplier } from "../page";

export type Suppliers = ApolloResponse<"supplier", Array<Supplier>>;

export default gql`
  query FetchAllSuppliers {
    supplier {
      id
      name
    }
  }
`;
