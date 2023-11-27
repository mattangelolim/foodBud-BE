const express = require("express");
const router = express.Router();
const Package = require("../../models/packageRate");
const Op = require("sequelize");

router.get("/all/packages", async (req, res) => {
  try {
    const AllPackage = await Package.findAll();

    res.status(200).json({ AllPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/add/package", async (req, res) => {
  try {
    const { package_name, pax_count, rate } = req.body;

    const existingPackage = await Package.findOne({
      where: {
        package_name: package_name,
        pax_count: pax_count,
      },
    });

    if (existingPackage) {
      return res.status(400).json({ message: "Package already exist" });
    }

    const AddPackage = await Package.create({
      package_name: package_name,
      pax_count: pax_count,
      rate: rate,
    });

    res.status(201).json({ message: "Package Created", AddPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/delete/package", async (req, res) => {
  try {
    const packageId = req.query.packageId;

    // Check if the package with the provided ID exists
    const existingPackage = await Package.findByPk(packageId);

    if (!existingPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // If the package exists, proceed with deletion
    await Package.destroy({
      where: {
        id: packageId,
      },
    });

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/package/names", async (req, res) => {
  try {
    const packageNames = await Package.findAll({
      attributes: [
        [
          Sequelize.fn("DISTINCT", Sequelize.col("package_name")),
          "package_name",
        ],
      ],
    });

    const packageNamesList = packageNames.map(
      (Package) => Package.package_name
    );

    res.json({ package_names: packageNamesList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
