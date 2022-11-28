import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let restaurants //store reference to database

export default class RestaurantsDAO {
    //for connecting to database - call right when serer runs
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}`)
        }
    }

    //get list of restaurants
    static async getRestaurants({filters = null, page = 0, restaurantsPerPage = 20,} = {}) {
        //put together a query
        let query
        if (filters) {
            if ("name" in filters) {
                //anywhere in text, search for name passed in 
                //in MongoDB Atlas specify which fields will be searched when $text search
                query = { $text: { $search: filters["name"] } }
            } else if ("cuisine" in filters) {
                //if cuisine from DB entry equals cuisine that was passed in
                query = { "cuisine": { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                //if zipcode from DB entry equals cuisine that was passed in
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }


        let cursor
        try {
            cursor = await restaurants.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        //cursor now has every single result
        //displayCursor will have a subset of the results
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const restaurantsList = await displayCursor.toArray() //create array from displayCursor
            const totalNumRestaurants = await restaurants.countDocuments(query)
            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }

    static async getRestaurantByID(id) {
        try {
            //pipelines help match dif collections together
            const pipeline = [
                { $match: { _id: new ObjectId(id)} },
                { 
                    $lookup: {
                        from: "reviews",
                        let: {id: "$_id"},
                        pipeline: [
                            { $match: { $expr: { $eq: ["$restaurant_id", "$$id"]}}},
                            { $sort: { date: -1}}
                        ],
                        as: "reviews"
                    }
                },
                { $addFields: { reviews: "$reviews" }}
            ]
            return await restaurants.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getRestaurantByID: ${e}`)
            throw e
        }
    }
    
    static async getCuisines() {
        let cuisines = []
        try {
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        } catch (e) {
            console.error(`Unable to get cuisines, ${e}`)
            return cuisines
        }
    }
}