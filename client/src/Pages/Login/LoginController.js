import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import LoginView from "./LoginView";
import { Redirect } from "react-router-dom";

class RegisterController extends React.Component {
  state = {
    error: null,
    redirect: false
  };

  async getValues(values) {
    const mutation = await this.props.mutate({
      variables: {
        email: values.email,
        password: values.password
      }
    });

    if (!mutation.data.login.ok) {
      this.setState({ error: mutation.data.login.error });
    } else {
      this.setState({ redirect: true });
    }
  }

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to="/home" /> : null}
        <LoginView
          error={this.state.error}
          getValues={v => this.getValues(v)}
        />
      </div>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
    }
  }
`;

export default graphql(loginMutation)(RegisterController);
