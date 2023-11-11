const express = require("express");
const router = express.Router();
const Package = require("../../models/Package")
const Package_Rate = require("../../models/packageRate")
const Additional = require("../../models/additional");
const AddOnMenu = require("../../models/addonMenu");


router.get("/invoice/receipt", async (req,res) =>{
    try {
        const event_id = req.query.event_id
        const PackageFound = await Package.findOne ({
            where:{
                event_id:event_id
            }
        })

        if(!PackageFound){
            res.status(400).json({ message: "NO event found"})
        }

        const package_avail = PackageFound.package_type

        const PackageRate = await Package_Rate.findOne ({
            where:{
                package_name: package_avail
            }
        })

        const Additionals = await Additional.findAll({
            where:{
                event_Id: event_id
            }
        })
        const addon = Additionals.map(addons => addons.dataValues.addons_name)

        // console.log(addon)

        const addOnsRates = await AddOnMenu.findAll({
            where: {
              addons_name: addon,
            },
          });
          
          const addonDetails = addOnsRates.map(addonRate => ({
            addons_name: addonRate.addons_name,
            addons_price: addonRate.addons_price,
          }));

        //   console.log(addonDetails)

        const response = {
            packageRate: PackageRate,
            addonDetails: addonDetails,
          };


        res.status(200).json(response)




    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
})

module.exports = router