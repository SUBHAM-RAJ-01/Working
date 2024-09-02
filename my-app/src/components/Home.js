import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    fetch('http://localhost:5000/api/contact')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleReply = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  return (
    <div className="home">
      <h2>Contact Messages</h2>
      <table className="messages-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id}>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.message}</td>
              <td>
                <button onClick={() => handleReply(message.email)}>Reply</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
