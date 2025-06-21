const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000 || 10255;
var mongoConnection = process.env.mongoConnection || "mongodb://scentsnmemories-azure:wFD9ItSQeuTmlnLBkUBtNLorleOl7JMIIDfiHtuVrgtMBZlxZd5va4IvUznCuKzZXhaeVje9JYKUACDbcN3vbA==@scentsnmemories-azure.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@scentsnmemories-azure@";
//"mongodb://localhost:27017/e-comm-store-db";
// || "mongodb://scentsnmemories-azure:IRhI8N0P012RwgpEFSGc0bTSK5UwksYCq6RVNfahrRkGvYTA6Hl5yDha6SrjzwHmeYBG1J1f1hCtACDb5snFBw==@scentsnmemories-azure.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@scentsnmemories-azure@";
const cors = require("cors");
app.use(cors({
  origin: 'https://www.scentsnmemories.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  
}));

app.options('*', cors()); 
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
  console.log("aa");
  await mongoose.connect(mongoConnection, {
    dbName: "e-comm-store-db",
  });
  console.log("mongodb connected");
  await seedData();
}
try {
  connectDb().catch((err) => {
    console.error(err);
  });
} catch (e) {
  console.log(e);
}
app.listen(port, () => {
  console.log("Server running on port", port);
});
