import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from "graphql-tag";

const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      username
      avatar
    }
  }
`;

export class UserConsumer extends Component {
    render() {
        const { children } = this.props;
        return (
            <ApolloConsumer>
                {client => {
                    // Use client.readQuery to get the current logged in user.
                    const user = {
                        username: "Test User",
                        avatar: "/uploads/avatar1.png"
                    };
                    return React.Children.map(children, function(child){
                        return React.cloneElement(child, { user });
                    });
                }}
            </ApolloConsumer>
        )
    }
}