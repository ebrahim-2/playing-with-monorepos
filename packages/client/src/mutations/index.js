import gql from "graphql-tag";

export const FORGOT_PASSWORD = gql`
  mutation($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const LOGIN = gql`
  mutation($data: LoginInputType!) {
    login(data: $data) {
      user {
        name
      }
      token
    }
  }
`;

export const REGISTER = gql`
  mutation($data: RegisterInputType!) {
    register(data: $data) {
      user {
        name
        _id
      }
      token
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation($password: String!, $token: String!) {
    changePassword(password: $password, token: $token) {
      token
    }
  }
`;

export const LOGIN_OR_REGISTER_WITH_GOOGLE = gql`
  mutation($data: AuthGoogleInput!) {
    authGoogle(data: $data) {
      token
    }
  }
`;

export const LOGIN_OR_REGISTER_WITH_FACEBOOK = gql`
  mutation($data: AuthFacebookInput!) {
    authFacebook(data: $data) {
      token
      user {
        name
      }
    }
  }
`;
