import React, { useContext, useState } from 'react'
import { FriendsContext } from './FriendsContext';

const hooks = () => {
  const friendsContext = useContext(FriendsContext);
  const { friends, selectedFriend, setSelectedFriend, addNewFriend } = friendsContext;

  const [friendInput, setFriendInput] = useState('');

  const handleNewFriendInput = event => {
    setFriendInput(event.target.value);
  };

  const handleAddNewFriend = friend => {
    addNewFriend(friend);
    setFriendInput('');
  };

  const { id: selectedId, name: selectedName } = selectedFriend || {};

  return (
    <div style={{ padding: 20 }}>
      <div>
      <label style={{ paddingRight: 10 }}>Add friend</label>
      <input
        onKeyDown={({ keyCode }) => keyCode === 13 && handleAddNewFriend(friendInput)}
        onChange={handleNewFriendInput}
        value={friendInput}
      />
      <h2>Selected: { selectedName }</h2>
      </div>
      <div style={{ paddingTop: 10 }}>
      { Object.values(friends).map(({ id, name }) =>
        <div
          style={{
            padding: 5,
            margin: '5px 0',
            border: `1px ${id === selectedId ? 'dashed yellow' : 'solid black'}`,
          }}
          key={id}
          onClick={() => setSelectedFriend(id)}
        >
          <p>{ name }</p>
        </div>
      )
      }
      </div>
    </div>
  )
};

export default hooks;
