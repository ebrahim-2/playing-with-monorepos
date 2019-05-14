import React from "react";
import { Form, Button, Divider, Icon } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { Link } from "react-router-dom";
import Email from "./EmailField";
import Password from "./PasswordField";
import ErrorMessageHandler from "./ErrorMessage";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useMutation } from "react-apollo-hooks";
import {
  LOGIN_OR_REGISTER_WITH_GOOGLE,
  LOGIN_OR_REGISTER_WITH_FACEBOOK
} from "../mutations";
import { CURRENT_USER } from "../queries";

const Frm = ({
  showUserName,
  validationSchema,
  initialValues,
  onSubmit,
  showForgotPasswordLink = false,
  path = "Register",
  history
}) => {
  const loginOrRegisterWithGoogle = useMutation(LOGIN_OR_REGISTER_WITH_GOOGLE);
  const loginOrRegisterWithFacebook = useMutation(
    LOGIN_OR_REGISTER_WITH_FACEBOOK
  );
  const responseGoogle = async ({ profileObj, googleId }) => {
    try {
      const { data } = await loginOrRegisterWithGoogle({
        variables: {
          data: {
            name: profileObj.name,
            googleId
          }
        },
        update: (cache, { data }) => {
          cache.writeQuery({
            query: CURRENT_USER,
            data: {
              me: data.register.user
            }
          });
        }
      });
      localStorage.setItem("token", data.authGoogle.token);
      history.push("/secret");
    } catch (error) {
      console.log(error);
    }
  };

  const facebookResponse = async ({ name, userID }) => {
    try {
      const { data } = await loginOrRegisterWithFacebook({
        variables: {
          data: {
            name,
            facebookId: userID
          }
        },
        update: (cache, { data }) => {
          cache.writeQuery({
            query: CURRENT_USER,
            data: {
              me: data.register.user
            }
          });
        }
      });
      localStorage.setItem("token", data.authFacebook.token);
      history.push("/secret");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {props => {
        return (
          <Form onSubmit={props.handleSubmit} loading={props.isSubmitting}>
            {showUserName ? (
              <>
                <ErrorMessageHandler field="name" />
                <Form.Field>
                  <Field type="text" name="name" placeholder="Username" />
                </Form.Field>
              </>
            ) : null}
            <Email />
            <Password />
            {showForgotPasswordLink ? (
              <Link
                to="/forgot-password"
                style={{ float: "right", paddingTop: 9 }}
              >
                Forgot Password?
              </Link>
            ) : null}
            <Button type="submit" basic>
              Submit
            </Button>
            <Divider horizontal>
              <p>
                <em>OR</em>
              </p>
            </Divider>
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
            <FacebookLogin
              appId="351814088793425"
              autoLoad={false}
              fields="name,email,picture"
              callback={facebookResponse}
              render={renderProps => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="ui facebook right floated labeled icon button"
                >
                  <Icon name="facebook f" /> {path} With Facebook
                </button>
              )}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Frm;
