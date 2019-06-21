import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Route, Redirect } from "react-router-dom";

class C extends React.PureComponent {
  renderRoute = routeProps => {
    const { data, component } = this.props;
    if (!data || data.loading) {
      return null;
    }

    if (!data.me) {
      return <Redirect to="/login" />;
    }
    const Component = component;

    return <Component userId={this.props.data.me._id} {...routeProps} />;
  };

  render() {
    const { data, component, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const MeQuery = gql`
  query {
    me {
      username
      _id
    }
  }
`;

export const AuthRoute = graphql(MeQuery)(C);
