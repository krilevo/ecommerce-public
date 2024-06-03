const Category = require("../models/categoryModel");
const { handleServerError } = require("../utils/helper");

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get top categories
exports.getTopCategories = async (req, res) => {
  try {
    const categories = await Category.find({ 
      $or: [
        { parent: { $exists: false } },
        { parent: null}
      ]
    });
    res.status(200).json(categories);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get bottom categories
exports.getBottomCategories = async (req, res) => {
  try {
    const bottomCategories = await Category.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "name",
          foreignField: "parent",
          as: "subcategories",
        },
      },
      {
        $match: {
          subcategories: [],
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          fullPath: 1,
        },
      },
    ]);

    res.status(200).json(bottomCategories);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get sub categories
exports.getSubCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $match: { parent: req.params.parent }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'name',
          foreignField: 'parent',
          as: 'subcategories'
        }
      },
      {
        $addFields: {
          hasSubcategories: { $gt: [{ $size: '$subcategories' }, 0] }
        }
      },
      {
        $project: {
          subcategories: 0
        }
      }
    ]);

    res.status(200).json(categories);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, parent, parentFullpath, createTopCategory } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    if (createTopCategory) {
      const category = await Category.create({ name });
      return res.status(201).json(category);
    }
    
    const parentCategory = parent;
    const fullPath = parentFullpath;

    // Create a new category with the calculated fullPath
    const category = await Category.create({ name, parentCategory, fullPath });
  
    res.status(201).json(category);
  } catch (error) {
    handleServerError(res, error);
  }
};

// // Update a category
// exports.updateCategory = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     if (!category) {
//       return res.status(404).json({ error: "Category not found" });
//     }
//     res.status(200).json(category);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const categoriesToDelete = await Category.find({ 
      $or: [
        { fullPath: { $regex: category } },
        { name: category }
      ] 
    });

    if (categoriesToDelete.length === 0) {
      return res.status(404).json({ error: "No matching categories found" });
    }

    const deletedCategories = await Category.deleteMany({ 
      $or: [
        { fullPath: { $regex: category } },
        { name: category }
      ] 
    });

    if (deletedCategories.deletedCount > 0) {
      return res.status(200).json({ message: "Categories deleted successfully" });
    } else {
      return res.status(404).json({ error: "No categories deleted" });
    }
  } catch (error) {
    handleServerError(res, error);
  }
};
