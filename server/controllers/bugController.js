import Bug from "../models/bugModel.js";

const createBug = async (req, res) => {
  try {
    const { title, description, severity } = req.body;

    const bug = await Bug.create({
      title,
      description,
      severity,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Bug created successfully",
      bug
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create bug",
      error: error.message
    });
  }
};

export { createBug };