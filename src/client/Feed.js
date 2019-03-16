import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const GET_POSTS = gql`{ 
  posts { 
    id
    text
    user {
      avatar
      username
    }
  }
}`;

const ADD_POST = gql`
  mutation addPost($post : PostInput!) {
    addPost(post : $post) {
      id
      text
      user {
        username
        avatar
      }
    }
  }
`;

const ADD_POST_MUTATION = graphql(ADD_POST, {
    name: 'addPost'
  });
  
  const GET_POSTS_QUERY = graphql(GET_POSTS, {
    props: ({ data: { loading, error, posts } }) => ({
      loading,
      posts,
      error
    })
  });
  
  export default compose(GET_POSTS_QUERY, ADD_POST_MUTATION)(Feed);