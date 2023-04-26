const express = require("express"); //used for creating APIs
const app = express();
const { connectDatabase } = require("./Connections/connection"); //for database connection
const STUDENT_MODELS = require("./models/students");
const CAR_MODELS = require("./models/cars");
app.use(express.json()); //enables json transportation

//Creating post api for receiving data from frontend to backend
app.post("/api/studentsdata", async (req, res) => {
  try {
    console.log(req.body);
    const newstudentob = {
      name: req.body.Studentname,
      age: req.body.Age,
      class: req.body.Class,
      rollno: req.body.Rollno,
      email: req.body.Email,
      hobby: req.body.Hobby,
    };
    console.log(newstudentob);
    const Student = await STUDENT_MODELS(newstudentob);
    await Student.save();
    return res.json({ success: true, message: "data saved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

app.get("/api/getstudentsdata", async (req, res) => {
  try {
    const Studentsdata = await STUDENT_MODELS.find();
    return res.json({ success: true, data: Studentsdata });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

app.get("/api/lateststudnents", async (req, res) => {
  try {
    const sortedStudents = await STUDENT_MODELS.find().sort({ age: 1 });
    // We write .sort() to sort data and inside .sort(Object mentioning key field)   // -1 means descending order and 1 is ascending
    return res.json({ success: true, data: sortedStudents });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

// to get limited data from database
app.get("/api/limitedstudents", async (req, res) => {
  try {
    const sortedStudents = await STUDENT_MODELS.find().limit(1);
    // for getting limited documents we use .limti(Number). It will give only the given number of documents
    return res.json({ success: true, data: sortedStudents });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
// to get latest 2 studnets
app.get("/api/latesttwo", async (req, res) => {
  try {
    const sortedStudents = await STUDENT_MODELS.find()
      .sort({ age: -1 })
      .limit(2);
    // always sort comes first then limit
    return res.json({ success: true, data: sortedStudents });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});
// to get filtered documents
app.get("/api/filterdoc", async (req, res) => {
  try {
    const filteredStudents = await STUDENT_MODELS.find(
      {
        age: 20,
        class: "ECE",
      },
      { name: 1, class: 1, hobby: 1 }
    ).sort({ createdAt: -1 });
    return res.json({ success: true, data: filteredStudents });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
});
//Car models
app.post("/api/cardetails", async (req, res) => {
  try {
    console.log(req.body);
    const CarDetails = {
      modelname: req.body.Carname,
      CountryOfOrigin: req.body.countryname,
      YearofOrigin: req.body.year,
      brandname: req.body.brand,
      isluxury: req.body.luxury,
    };
    console.log(CarDetails);
    const car = await CAR_MODELS(CarDetails);
    await car.save();
    return res.json({ success: true, message: "data saved successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
});

app.get("/api/getcardetails", async (req, res) => {
  try {
    const Cardata = await CAR_MODELS.find();
    return res.json({ success: true, data: Cardata });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
});

//filterdetails
app.get("/api/filtercardetails", async (req, res) => {
  try {
    const filtereddata = await CAR_MODELS.find(
      {
        isluxury: true,
      },
      { modelname: 1, CountryOfOrigin: 1, YearofOrigin: 1 }
    )
      .sort({ createdAt: -1 })
      .limit(2);
    return res.json({ success: true, data: filtereddata });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
});
connectDatabase();
const PORT = 8000;
app.listen(PORT, async () => {
  console.log("server is running at Port", PORT);
});
