import React from 'react';
import ReactDOM from 'react-dom';
import profileReducer from './profileReducer';

const state = {
  post: [
    { id: 1, message: 'Test message 1', likeCount: 10 },
    { id: 2, message: 'Test message 2', likeCount: 15 }
  ]
};

it('length of post shhould be incremented', () => {
  // 1. test data
  const action = addPostActionCreator('new post');
  
  // 2.action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.post.length).toBe(3);
});

it('after deleting length of message should be decremented', () => {
  // 1. test data
  const action = deletePost(1);
  
  // 2.action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.post.length).toBe(1);
});
