import TablesDAO from "../dao/tablesDAO.js"

export default class TablesController {
  static async apiGetTables(req, res, next) {
    const tablesPerPage = req.query.tablesPerPage ? parseInt(req.query.tablesPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    // let filters = {}
    // if (req.query.cuisine) {
    //   filters.cuisine = req.query.cuisine
    // } else if (req.query.zipcode) {
    //   filters.zipcode = req.query.zipcode
    // } else if (req.query.name) {
    //   filters.name = req.query.name
    // }

    let filters = {}
    if (req.query.numGuests) {
      filters.numGuests = req.query.numGuests
    }
    if (req.query.dateTime) {
      filters.dateTime = req.query.dateTime
    }

    const { tablesList, totalNumTables } = await TablesDAO.getTables({
      filters,
      page,
      tablesPerPage,
    })

    let response = {
        tables: tablesList,
        page: page,
        filters: filters,
        entries_per_page: tablesPerPage,
        total_results: totalNumTables,
    }
    res.json(response)
  }
}