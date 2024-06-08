import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import UserList from './components/UserList';
import Loading from './components/Loading';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching users...');
    setTimeout(() => {
      axios.get('http://localhost:5000/api/users')
        .then(response => {
          console.log('Users fetched:', response.data);
          setUsers(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the users!", error);
          setLoading(false);
        });
    }, 1000); 
  }, []);

  const handleDelete = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
  };

  const handleUpdate = (updatedUser) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user._id === updatedUser._id ? updatedUser : user))
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container sx={{width:'100%', objectFit:'contain'}}>
      <UserList users={users} onDelete={handleDelete} onUpdate={handleUpdate} />
    </Container>
  );
};

export default App;
