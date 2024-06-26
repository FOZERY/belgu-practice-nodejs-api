module.exports = (query, params) => {
    const values = []

    const conditions = Object.keys(params).map((key, index) => {
        values.push(params[key])
        return `${key} = $${index + 1}`
    })

    const parametrizedQuery = (query += ` ${conditions.join(' AND ')}`)
    return { parametrizedQuery, values }
}
