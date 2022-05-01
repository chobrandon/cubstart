const express = require("express");
const Photographer = require("../models/Photographer");
const bcrypt = require("bcrypt");
const router = express.Router();

// REGISTRATION
router.post("/register", async (req, res) => {
  try {
    // PASSWORD ENCRYPTION
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATE NEW USER
    const newPhotographer = await new Photographer({
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.profilePicture,
      city: req.body.city,
      yearsExperience: req.body.yearsExperience,
      description: req.body.description,
      photos: req.body.photos,
      contactInfo: req.body.contactInfo,
    });

    // SAVE NEW USER INTO MONGODB
    const photographer = await newPhotographer.save();
    res.status(200).json(photographer);
  } catch (err) {
    console.log(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const photographer = await Photographer.findOne({ email: req.body.email });
    if (!photographer) {
      res.status(404).json("Photographer not found");
      return;
    }
    const attemptPassword = await bcrypt.compare(
      req.body.password,
      photographer.password
    );

    // VALIDATE PASSWORD
    if (!attemptPassword) {
      res.status(400).json("Wrong password");
    }
    res.status(200).json(photographer);
  } catch (err) {
    console.log(err);
  }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      // YOUR CODE HERE
      await Photographer.findByIdAndUpdate(req.body.userId, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(403).json("No permissions");
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      await Photographer.findByIdAndDelete(req.body.userId);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(403).json("No permissions");
  }
});

module.exports = router;
