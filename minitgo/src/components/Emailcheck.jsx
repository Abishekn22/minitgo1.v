import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [emailData, setEmailData] = useState({
    from: '', // Initialize with an empty string or default if needed
    to: '',
    subject: '',
    text: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/send-email', emailData);
      alert('Email sent successfully: ' + response.data);
      console.log(response.data);
    } catch (error) {
      alert('Error sending email: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>From:</label>
          <input type="email" name="from" value={emailData.from} onChange={handleChange} required />
        </div>
        <div>
          <label>To:</label>
          <input type="email" name="to" value={emailData.to} onChange={handleChange} required />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" name="subject" value={emailData.subject} onChange={handleChange} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="text" value={emailData.text} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default App;
