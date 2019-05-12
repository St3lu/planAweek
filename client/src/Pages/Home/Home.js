import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const Home = props => {
  return (
    <div>
      {props.data.loading ? (
        <p>Loading..</p>
      ) : (
        props.data.getAllUsers.map(el => (
          <p key={el.email}>
            {el.username} : {el.email}
          </p>
        ))
      )}
    </div>
  );
};

const getAllUsersQuery = gql`
  query {
    getAllUsers {
      email
      username
    }
  }
`;

export default graphql(getAllUsersQuery)(Home);
