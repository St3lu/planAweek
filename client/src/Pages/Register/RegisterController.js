import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import RegisterView from "./RegisterView";
import { Redirect } from "react-router-dom";

class RegisterController extends React.Component {
  state = {
    error: null,
    redirect: false
  };

  async getValues(values) {
    const mutation = await this.props.mutate({
      variables: {
        name: values.username,
        email: values.email,
        password: values.password
      }
    });

    if (!mutation.data.register.ok) {
      this.setState({ error: mutation.data.register.error });
    } else {
      this.setState({ redirect: true });
    }
  }

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to="/login" /> : null}
        <RegisterView
          error={this.state.error}
          getValues={v => this.getValues(v)}
        />
      </div>
    );
  }
}
const registerMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      ok
      error
    }
  }
`;

export default graphql(registerMutation)(RegisterController);
