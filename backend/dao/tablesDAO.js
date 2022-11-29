let tables

export default class TablesDAO {
  static async injectDB(conn) {
    if (tables) {
      return
    }
    try {
        tables = await conn.db(process.env.NS).collection("tables")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in TablesDAO: ${e}`,
      )
    }
  }

  static async getTables({
    filters = null,
    page = 0,
    tablesPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } }
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }

    let cursor
    
    try {
      cursor = await tables.find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { tablesList: [], totalNumTables: 0 }
    }

    const displayCursor = cursor.limit(tablesPerPage).skip(tablesPerPage * page)

    try {
      const tablesList = await displayCursor.toArray()
      const totalNumTables = await tables.countDocuments(query)

      return { tablesList, totalNumTables }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { tablesList: [], totalNumTables: 0 }
    }
  }
}
