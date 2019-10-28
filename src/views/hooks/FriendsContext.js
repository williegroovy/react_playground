import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

export const FriendsContext = createContext({});

export const FriendsContextProvider = props => {
  // Initial values are obtained from the props.
  const {
    friends: initialFriends,
    selectedFriend: initialSelectedFriend,
    children
  } = props;

  // Store values with useState.
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(initialSelectedFriend);

  const addNewFriend = userName => {
    const id = shortid.generate();
    const newFriend = { id, name: userName };

    setFriends({...friends, [id]: newFriend })
  };

  const handleSetSelectedFriend = (selectedId) => {
    setSelectedFriend(friends[selectedId]);
  };

  // Make context object.
  const friendContext = {
    friends,
    setFriends,
    selectedFriend,
    setSelectedFriend: handleSetSelectedFriend,
    addNewFriend
  };

  // Pass value in provider and return.
  return <FriendsContext.Provider value={friendContext}>{children}</FriendsContext.Provider>;
};

export const { Consumer } = FriendsContext;

const friend = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string
});

FriendsContextProvider.propTypes = {
  friends: PropTypes.objectOf(friend),
  selectedFriend: friend
};

FriendsContextProvider.defautlProps = {
  friends: {},
  selectedFriend: null
};
