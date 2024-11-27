const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Mount the routes
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});