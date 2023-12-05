const express = require("express");
const router = express.Router();
const Package = require("../../models/Package");
const Headcount = require("../../models/Headcount");
const PackageRate = require("../../models/packageRate");
const Additional = require("../../models/additional")
const AddonMenu = require("../../models/addonMenu")
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

    const totalRate = rates.reduce((sum, entry) => sum + (entry.rate || 0), 0);

    const addons = await Additional.findAll({
      attributes: ['addons_name']
    });

    const addOnsArr = addons.map(addon => addon.addons_name);

    // console.log(addOnsArr)

    // Fetching addons prices for all addons
    const rateAddons = await AddonMenu.findAll({
      where: {
        addons_name: addOnsArr
      },
      attributes: ['addons_name', 'addons_price']
    });

    // Grouping prices by addon name and summing their prices
    const addonCounts = {};

    // Calculate the count for each addon name
    addOnsArr.forEach(addon => {
      addonCounts[addon] = (addonCounts[addon] || 0) + 1;
    });

    // Create an array to hold individual addon entries with multiplied prices
    const addonEntries = [];

    // Calculate the total price for each addon entry
    rateAddons.forEach(addon => {
      const priceMultiplier = addonCounts[addon.addons_name] || 1;
      const multipliedPrice = addon.addons_price * priceMultiplier;
      addonEntries.push({
        addons_name: addon.addons_name,
        addons_price: multipliedPrice
      });
    });

    // console.log(addonEntries);

    const addonTotalPrices = {};

    // Calculate the total price for each addon name
    addonEntries.forEach(addon => {
      if (!addonTotalPrices[addon.addons_name]) {
        addonTotalPrices[addon.addons_name] = 0;
      }
      addonTotalPrices[addon.addons_name] += addon.addons_price;
    });

    const totalSum = Object.values(addonTotalPrices).reduce((sum, price) => sum + price, 0);

    // console.log(totalSum)

    const totalNet = totalSum + totalRate

    res.json({ net: totalNet});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
