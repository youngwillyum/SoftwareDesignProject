import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(RestaurantsCtrl.apiGetRestaurants) //all restaurants
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById) //specific restaurant with specific id - also return all reviews associated with restaurant
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines) //return list of all cuisines

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router