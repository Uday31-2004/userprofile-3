import React from 'react';
import { Box } from '@mui/material';
import UserProfile from './UserProfile';

const UserList = ({ users, onDelete, onUpdate }) => {
  return (
    <Box sx={{
        top:0,
        left:0,
        display: 'flex',
        justifyContent:'center',
      flexWrap: 'wrap',
      gap: 1,
      margin:0,
      width:'100%'
      
    }}>
      {users.map(user => (
        <Box key={user._id} sx={{
            objectFit:'contain',
          width: '282px',
        }}>
          <UserProfile  user={user} onDelete={onDelete} onUpdate={onUpdate} />
        </Box>
      ))}
    </Box>
  );
};

export default UserList;
