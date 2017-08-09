import {
  commitMutation,
  graphql
} from 'react-relay';
import environment from '../Environment';

const mutation = graphql`
  mutation SigninUserMutation($input: SigninUserInput!){
    signinUser(input: $input){
      token
      user {
        id
      }
    }
  }
`;

export default (email, password, callback) => {
  const variables = {
    input: {
      email: {
        email,
        password,
      },
      clientMutationId: ""
    }
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response) => {
      const token = response.signinUser.token;
      const id = response.signinUser.user.id;
      callback(id, token);
    },
    onError: (err) => console.error(err)
  })
}