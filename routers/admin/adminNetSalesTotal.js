const express = require("express");
const router = express.Router();
const Package = require("../../models/Package");
const Headcount = require("../../models/Headcount");
const PackageRate = require("../../models/packageRate");
const { Op } = require("sequelize");

router.get("/net/sales", async (req, res) => {
  try {
    // Find all packages
    const foundPackages = await Package.findAll();

    // Extract headcount IDs from each package
    const headcountIds = foundPackages.map((package) => package.headcount_id);

    // Log the result for debugging
    console.log("All Headcount IDs:", headcountIds);

    const paxCounts = await Headcount.findAll({
      where: {
        headcount_id: headcountIds,
      },
      attributes: ["headcount_id", "hc_kids", "hc_adults"],
    });

    const combinedData = await Promise.all(
      foundPackages.map(async (package) => {
        const correspondingPaxCount = paxCounts.find(
          (paxCount) => paxCount.headcount_id === package.headcount_id
        );

        // Calculate the sum of hc_kids and hc_adults
        const paxCount =
          (package.hc_kids || 0) +
          (correspondingPaxCount ? correspondingPaxCount.hc_kids : 0) +
          (package.hc_adults || 0) +
          (correspondingPaxCount ? correspondingPaxCount.hc_adults : 0);

        return {
          package: package.package_type,
          pax_count: paxCount,
        };
      })
    );

    const rates = await Promise.all(
        combinedData.map(async (entry) => {
          const rate = await PackageRate.findOne({
            where: {
              package_name: entry.package,
              pax_count: {
                [Op.lte]: entry.pax_count,
              },
            },
            order: [["pax_count", "DESC"]],
          });
  
          return {
            package: entry.package,
            pax_count: entry.pax_count,
            rate: rate ? rate.rate : 23000,
          };
        })
      );
  
      // Respond with the array of results
      const totalRate = rates.reduce((sum, entry) => sum + (entry.rate || 0), 0);


      res.json(totalRate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
