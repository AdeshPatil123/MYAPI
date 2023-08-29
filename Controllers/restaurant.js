const restaurantData  = require('../Models/restaurant');
// const restaurantData = require("../Models/data.json");
const _ = require("underscore");


exports.getAllRestaurants = async (req, res) => {
    try{
        let RestaurantData =await restaurantData.find();
        const count = RestaurantData.length
        res.status(200).json({
            message : "All restaurants fetched successfully",
            count:count,
            restaurants : RestaurantData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};

exports.getAllRestaurantsByLocation =async (req, res) => {
    try{
        let RestaurantData = await restaurantData.find();
        let filteredData = _.where(RestaurantData, {city: req.params.cityName});
        res.status(200).json({
            message : `Restaurants in ${req.params.cityName} city fetched successfully`,
            restaurants : filteredData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};

exports.getRestaurantsByFilters =async (req, res) => {
    try {
        
        let RestaurantData = await restaurantData.find();
        const {mealType, location, cuisine, lowCost, highCost, sort, page} = req.query;
        if (!mealType && !location && !cuisine && !lowCost && !highCost && !sort && !page) {
            return res.status(400).json({ message: "At least one query parameter is required." });
        }
  
        let filteredData = RestaurantData;
  
        // Filter by meal type
        if (mealType) {
            filteredData = filteredData.filter((restaurant) => restaurant.mealtype_id.some((c)=> c.id === parseInt(mealType)));
        }
  
        // Filter by location
        if (location) {
            filteredData = filteredData.filter((restaurant) => restaurant.location_id === parseInt(location));
        }
  
        // Filter by cuisine
        if (cuisine) {
            filteredData = filteredData.filter((restaurant) => restaurant.cuisine.some((c) => c.id === parseInt(cuisine)));
        }
  
        // Filter by cost range
        if (lowCost && highCost) {
            filteredData = filteredData.filter((restaurant) => restaurant.min_price >= parseInt(lowCost) && restaurant.min_price <= parseInt(highCost));
        }
  
        // Sort by rating
        if (sort === "rating") {
            filteredData.sort((a, b) => b.aggregate_rating - a.aggregate_rating);
        }
  
        // Pagination
        const pageSize = 2; // Number of restaurants per page
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        // const paginatedData = filteredData.slice(startIndex, endIndex);
        const count = filteredData.length;
        res.status(200).json({
            message: "Restaurants fetched successfully with filters",
            count:count,
            restaurants:filteredData,
        });
    } 
    catch (err) {
        res.status(500).send(err);
    }
};