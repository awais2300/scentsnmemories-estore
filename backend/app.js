const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000 || 10255;
var mongoConnection = process.env.mongoConnection || "mongodb://scentsnmemories-azure:wFD9ItSQeuTmlnLBkUBtNLorleOl7JMIIDfiHtuVrgtMBZlxZd5va4IvUznCuKzZXhaeVje9JYKUACDbcN3vbA==@scentsnmemories-azure.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@scentsnmemories-azure@";
//"mongodb://localhost:27017/e-comm-store-db";
// || "mongodb://scentsnmemories-azure:IRhI8N0P012RwgpEFSGc0bTSK5UwksYCq6RVNfahrRkGvYTA6Hl5yDha6SrjzwHmeYBG1J1f1hCtACDb5snFBw==@scentsnmemories-azure.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@scentsnmemories-azure@";
const cors = require("cors");
const allowedOrigins = [
  'http://localhost:4200',
  'https://www.scentsnmemories.com'
];

app.use(cors({
  origin: 'https://gray-forest-06c81221e.6.azurestaticapps.net',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // if you use cookies/auth headers
}));

//app.options('*', cors()); // enable preflight requests for all routes
app.use(express.json());
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");
const seedData = require("./handlers/data-seed");

app.use((req, res, next) => {
  req.user = { id: "644c1f5f0f3e2a456789abcd" };  // Replace with any fixed user ID for testing
  next();
});
app.get("/", (req, res) => {
  console.log("a", mongoConnection);
  res.send("Server running is running");
});
app.use("/category"/*, verifyToken*//*, isAdmin*/, categoryRoutes);
app.use("/brand"/*, verifyToken*//*, isAdmin*/, brandRoutes);
app.use("/orders"/*, verifyToken*//*, isAdmin*/, orderRoutes);
app.use("/product"/*, verifyToken*//*, isAdmin*/, productRoutes);
app.use("/customer"/*, verifyToken*/, customerRoutes);
app.use("/auth", authRoutes);
async function connectDb() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(mongoConnection, {
    dbName: "e-comm-store-db",
  });
  console.log("MongoDB connected");

  await seedData(); // If seedData runs model operations, this is fine here

  // Start server only after DB connection and seed
  app.listen(port, () => {
    console.log("Server running on port", port);
  });
}

connectDb().catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1); // Exit the app if DB connection fails
});
