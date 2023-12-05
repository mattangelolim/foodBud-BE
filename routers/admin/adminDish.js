const express = require("express")
const router = express.Router()
const Dishes = require("../../models/dishes")
const Op = require("sequelize")

router.get("/all/dishes", async (req, res) => {
    try {

        const AllDishes = await Dishes.findAll()

        res.status(200).json({AllDishes})


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
})

router.post("/add/dish", async (req, res) => {
    try {
        const { dish_name, dish_type, dish_price } = req.body

        const dishExist = await Dishes.findOne({
            where: {
                dish_name: dish_name
            }
        })

        if (dishExist) {
            // Dish with the same name already exists
            return res.status(400).json({ message: "Dish name already exists" });
        }

        const postDish = await Dishes.create({
            dish_name: dish_name,
            dish_type: dish_type,
            dish_price: dish_price
        })

        if (!postDish) {
            return res.status(400).json({ message: "an error occured" })
        }


        res.status(201).json({ message: "dish created", postDish })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
})

router.post("/delete/dish", async (req, res) => {
    try {
        const dishId = req.query.dishId;

        // Check if the package with the provided ID exists
        const existingDishes = await Dishes.findByPk(dishId);

        if (!existingDishes) {
            return res.status(404).json({ message: "Dish not found" });
        }

        // If the package exists, proceed with deletion
        await Dishes.destroy({
            where: {
                id: dishId,
            },
        });

        res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router