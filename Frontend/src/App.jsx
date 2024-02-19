import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    Username: '',
    Email: '',
    Link: ''
  });

  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:500/users')
      .then(res => res.json())
      .then(result => {
        setUsers(result);
        setLoading(false);
        console.log(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const deleteUser = (Username) => {
    fetch('http://localhost:500/deleteUser', { // Make sure to use the correct port (500)
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Username }),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        // Fetch users again after deletion
        fetchUsers();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const addUser = () => {
    fetch('http://localhost:500/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        // Fetch users again after adding a new user
        fetchUsers();
        // Clear the form fields
        setNewUser({
          Username: '',
          Email: '',
          Link: ''
        });
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.Username}</td>
              <td>{user.Email}</td>
              <td>{user.Link}</td>
              <td>
                <button onClick={() => deleteUser(user.Username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add User</h2>
        <form>
          <label>Username:
            <input type="text" name="Username" value={newUser.Username} onChange={handleInputChange} />
          </label>
          <label>Email:
            <input type="text" name="Email" value={newUser.Email} onChange={handleInputChange} />
          </label>
          <label>Link:
            <input type="text" name="Link" value={newUser.Link} onChange={handleInputChange} />
          </label>
          <button type="button" onClick={addUser}>Add User</button>
        </form>
      </div>
    </div>
  );
}
