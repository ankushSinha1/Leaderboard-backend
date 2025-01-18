const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./connectDB.js");

const userRoutes = require("./routes/userRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

// Load environment variables
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(bodyParser.json());

// Middleware
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.get('/', (req,res)=>{
  console.log("Server running");
})
// WebSocket for real-time updates
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start server
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
