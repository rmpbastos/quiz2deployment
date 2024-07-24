const mongoose = require("mongoose");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// const mongoURI =
//   "mongodb+srv://quiz2user:123@cluster0.7rlxnxb.mongodb.net/Summer24";


// Create a Schema object
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  myName: { type: String },
  mySID: { type: String }
});

// Create a Model object
const Student = mongoose.model("s24students", studentSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});




app.post("/", async (req, res) => {
  // get the data from the form
  const mongoURI = req.body.myuri; // Capture the submitted MongoDB URI
  console.log("Received MongoDB URI: ", mongoURI);


  // connect to the database and log the connection
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // add the data to the database
    const myName = "Rafael Martins de Paiva Bastos";
    const mySID = "300335322";

    const newStudent = new Student({
      myName,
      mySID,
    });

    await newStudent.save();
    // send a response to the user
    res.send(`<h1>Document Added</h1>`);
  } catch (err) {
    console.error("Error:", err);
    res.status(400).send("Error: " + err);
  }
});

app.post("/", async (req, res) => {
  // get the data from the form
  const mongoURI = req.body.myuri; // Capture the submitted MongoDB URI
  console.log("Received MongoDB URI: ", mongoURI); 
})






// app.post("/", async (req, res) => {
//   // get the data from the form

//   // connect to the database and log the connection
//   await mongoose
//     .connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log("Connected to MongoDB");
//     })
//     .catch((error) => {
//       console.error("Error connecting to MongoDB", error);
//     });

//   // add the data to the database
//   const myName = req.body.name;
//   const mySID = req.body.sid;

//   const newStudent = new Student({
//     myName,
//     mySID
//   });
//   newStudent
//         .save()
//         .then(() => res.json("Student added!"))
//         .catch((err) => res.status(400).send("Error: " + err));


//   // send a response to the user
//   res.send(`<h1>Document  Added</h1>`);
// });




app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});



