import { gql } from "@apollo/client";

export const CREATE_SERVER = gql`
  mutation CreateServer($input: CreateServerDTO!, $file: Upload!) {
    createServer(input: $input, file: $file) {
      id
      name
      imageUrl
      members {
        id
      }
    }
  }
`;
