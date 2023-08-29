const express = require("express");
const router = express.Router();

const restaurantController = require("../Controllers/restaurant").getAllRestaurants;
const restaurantByLocationController = require("../Controllers/restaurant").getAllRestaurantsByLocation;
const restaurantByFilterController = require("../Controllers/restaurant").getRestaurantsByFilters;


const loginController = require("../Controllers/user").login;
const signupController = require("../Controllers/user").signup;
const menuController =require("../Controllers/menu").getAllMenuById;

router.get('/getAllRestaurants', restaurantController);
router.get('/getRestaurantsByLocation/:cityName', restaurantByLocationController);
router.get("/getRestaurantsByFilters", restaurantByFilterController);
router.get("/menu/:restId",menuController);

router.post('/login', loginController);
router.post('/signup', signupController);

module.exports = router;