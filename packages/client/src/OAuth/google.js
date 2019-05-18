import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from 'react-apollo-hooks';
import { Icon } from 'semantic-ui-react';

import { CURRENT_USER } from './queries';
import { LOGIN_OR_REGISTER_WITH_FACEBOOK } from './mutations';

const GoogleAuth = ({ path, history }) => {
  const loginOrRegisterWithGoogle = useMutation(
    LOGIN_OR_REGISTER_WITH_FACEBOOK
  );

  const responseGoogle = async ({ profileObj, googleId }) => {
    try {
      const { data } = await loginOrRegisterWithGoogle({
        variables: {
          data: {
            name: profileObj.name,
            googleId,
          },
        },
        update: (cache, { data }) => {
          cache.writeQuery({
            query: CURRENT_USER,
            data: {
              me: data.authGoogle.user,
            },
          });
        },
      });
      localStorage.setItem('token', data.authGoogle.token);
      history.push('/secret');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <GoogleLogin
      clientId="750525016321-hs6um0d2o34tksfeg9da78da501fto25.apps.googleusercontent.com"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      render={renderProps => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="ui google plus labeled icon button"
        >
          <Icon name="google" /> {path} With Google
        </button>
      )}
    />
  );
};

export default GoogleAuth;
