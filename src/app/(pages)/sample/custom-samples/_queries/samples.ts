import { gql } from "@apollo/client";

import { PaginatedApolloResponse } from "~/server/types";

import { Sample } from "../page";

export type Samples = PaginatedApolloResponse<"samples", Array<Sample>>;

export default gql`
  query PaginatedCustomSamples(
    $skip: Int!,
    $take: Int!,
  ) {
    samples: paginatedSample(
      skip: $skip,
      take: $take,
      order: { countryCultureLanguageId: ASC, name: ASC },
      where: {
        clonedFromSampleId: { eq: null },
        isDisabled: { eq: false },
      }
    ) {
      totalCount,
      items {
        id
        countryCultureLanguageId
        owningWorkspace
        name
        numberOfRespondents
        actualIr
        lastUsedDate
        author
      }
    }
  }
`;
