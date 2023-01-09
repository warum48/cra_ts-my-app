import { gql, useReactiveVar } from "@apollo/client";

//TODO:extract from reportDetails
export const SAVE_INPUT = gql`
    mutation SaveInput($comment: String!, $id: Int!) {
      teInternalCommentUpdate(commentsInternal: $comment, teId: $id) {
        ... on MutationSuccess {
          __typename
          detail
        }
        ... on MutationError {
          __typename
          detail
          statusCode
        }
      }
    }
  `;