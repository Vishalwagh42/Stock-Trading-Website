require("dotenv").config();
const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require ("body-parser");
const cors = require ("cors");
const app = express ();
const  authMiddleware  = require ("./middleware/authMiddleware");
const path = require('path');

app.use (cors ());

app.use (bodyParser.json ( ));
app.use(express.json());

 
const authRoutes = require ("./routes/authRoutes");
const controllers = require ("./controllers/authController");

app.use("/api/auth", authRoutes);

/* Protected Example Route */
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user,
  });
});


const {PositionsModel} = require ("./model/PositionsModel");
const { HoldingsModel } = require("./model/HoldingsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { Schema } = require("mongoose");



const PORT = process.env.PORT || 3002;
const uri= process.env.MONGO_URL;



app.get("/allHoldings", async (req, res) => {
  const holdings = await HoldingsModel.find();
  res.json(holdings);
});


app.get("/allPositions",async (req,res)=>{
    let allPositions= await PositionsModel.find ( );
     res.json (allPositions);
 });
 app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    let newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();

    // Update holdings depending on mode
    if (mode === "BUY") {
      const existing = await HoldingsModel.findOne({ name });
      if (existing) {
        const prevQty = existing.qty || 0;
        const prevAvg = existing.avg || 0;
        const newQty = prevQty + Number(qty);
        const newAvg = ((prevAvg * prevQty) + Number(price) * Number(qty)) / newQty;
        existing.qty = newQty;
        existing.avg = newAvg;
        existing.price = Number(price);
        await existing.save();
      } else {
        const newHolding = new HoldingsModel({
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
        });
        await newHolding.save();
      }
    } else if (mode === "SELL") {
      const existing = await HoldingsModel.findOne({ name });
      if (existing) {
        const newQty = (existing.qty || 0) - Number(qty);
        if (newQty > 0) {
          existing.qty = newQty;
          existing.price = Number(price);
          await existing.save();
        } else {
          // removed fully
          await HoldingsModel.deleteOne({ _id: existing._id });
        }
      }
    }

    res.json({ message: "Order saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

app.get("/allOrders", async (req, res) => {
  try {
    const orders = await OrdersModel.find().sort({ _id: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dashboard', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dashboard', 'build', 'index.html'));
  });
} 

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));



// app.get("/addPositions",async (req,res)=>{
//     let tempPositions = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ]; 
// tempPositions.forEach (async (item)=>{
//     let newPosition = new PositionsModel({
//       product: item.product,
//   name: item.name,
//   qty: item.qty,
//   avg: item.avg,
//   price: item.price,
//   net: item.net,
//   day: item.day,
//   isLoss: item.isLoss,

//     });
//     newPosition.save ();
// });
// res.send ("Positions added");
// });

// app.get("/addHoldings",async (req,res)=>{
//     let tempholding = [
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
// ];
// tempholding.forEach (async (item)=>{
//     let newHolding = new HoldingsModel({
//         name: item.name,
//         qty: item.qty,
//         avg: item.avg,
//         price: item.price,
//         net: item.net,
//         day: item.day,
//     })
//     newHolding.save ();
// });
// res.send ("Holdings added");

// });

// Server is started after MongoDB connection (see mongoose.connect above)
