import { gql } from "@apollo/client";

export const CREATE_PROFILE = gql`
  mutation CreateProfile($input: CreateProfileDTO!) {
    createProfile(input: $input) {
      id
      imageUrl
      name
      email
    }
  }
`;
