import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Modal, Button } from "antd";

class CreateMealModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          visible={true}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back">Return</Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

const getMealsQuery = gql`
  query {
    me {
      userId
    }
  }
`;

export default graphql(getMealsQuery)(CreateMealModal);
