const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const contactRoutes = require('./routes/contact');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://subham:srajpatna@myproject.igo9v.mongodb.net/test?retryWrites=true&w=majority&appName=myproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Use contact routes
app.use('/api/contact', contactRoutes);

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Serve static files from React app (if deployed in the same project)
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
