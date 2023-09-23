const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

const url = "mongodb://127.0.0.1:27017";
const dbName = "resumedb";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

async function createUser(req, res) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db(dbName);
    const collection = db.collection("resumes");

    const { first_name, last_name, email, gender, phone, age, password } = req.body;

    const newUser = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      phone: phone,
      age: age,
      password: password,
      skills: [] // Initialize the skills array for the new user
    };

    const result = await collection.insertOne(newUser);
    console.log("Created document:", result.insertedId);

    res.send(result.insertedId);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Disconnected from the database");
  }
}

async function loginDocument(req, res) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db(dbName);
    const collection = db.collection("resumes");
    const { email, password } = req.body;

    const user = await collection.findOne({ email: email });
    if (user && user.password === password) {
      console.log("Login successful");

      // Send user data as response
      res.json(user);
    } else {
      console.log("Invalid email or password");
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred during login");
  } finally {
    await client.close();
    console.log("Disconnected from the database");
  }
}

app.post("/addSkill", async (req, res) => {
  const { email, skillName } = req.body;

  console.log("Received request to add skill:", email, skillName);

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db(dbName);
    const collection = db.collection("resumes");

    const updateResult = await collection.updateOne(
      { email: email },
      { $push: { skills: skillName } }
    );

    if (updateResult.modifiedCount === 1) {
      console.log("Skill added successfully");
      return res.status(200).send("Skill added successfully");
    } else {
      console.error("Error adding skill. No documents modified.");
      return res.status(500).send("Error adding skill. No documents modified.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while adding skill");
  } finally {
    await client.close();
    console.log("Disconnected from the database");
  }
});

app.post("/addEducation", async (req, res) => {
  const { email, educationName } = req.body;

  console.log("Received request to add education:", email, educationName);

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db(dbName);
    const collection = db.collection("resumes");

    const updateResult = await collection.updateOne(
      { email: email },
      { $push: { education: educationName } }
    );

    if (updateResult.modifiedCount === 1) {
      console.log("Education added successfully");
      return res.status(200).send("Education added successfully");
    } else {
      console.error("Error adding education. No documents modified.");
      return res.status(500).send("Error adding education. No documents modified.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while adding education");
  } finally {
    await client.close();
    console.log("Disconnected from the database");
  }
});

app.post("/addExperience", async (req, res) => {
  const { email, experienceName } = req.body;

  console.log("Received request to add experience:", email, experienceName);

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db(dbName);
    const collection = db.collection("resumes");

    const updateResult = await collection.updateOne(
      { email: email },
      { $push: { experience: experienceName } }
    );

    if (updateResult.modifiedCount === 1) {
      console.log("Experience added successfully");
      return res.status(200).send("Experience added successfully");
    } else {
      console.error("Error adding experience. No documents modified.");
      return res.status(500).send("Error adding experience. No documents modified.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while adding experience");
  } finally {
    await client.close();
    console.log("Disconnected from the database");
  }
});

app.post("/addLanguage", async (req, res) => {
  const { email, languageName } = req.body;

  console.log("Received request to add language:", email, languageName);

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db(dbName);
    const collection = db.collection("resumes");

    const updateResult = await collection.updateOne(
      { email: email },
      { $push: { languages: languageName } }
    );

    if (updateResult.modifiedCount === 1) {
      console.log("Language added successfully");
      return res.status(200).send("Language added successfully");
    } else {
      console.error("Error adding language. No documents modified.");
      return res.status(500).send("Error adding language. No documents modified.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while adding language");
  } finally {
    await client.close();
    console.log("Disconnected from the database");
  }
});



app.post("/create", (req, res) => {
  createUser(req, res);
});

app.post("/login", (req, res) => {
  loginDocument(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
