printjson(db.people.find({  birth_date: {$gt: '2000-01-01T00:00:00Z', $lt: '2100-12-31T23:59:59Z'} }, { _id: 0, first_name: 1, last_name: 1, location:{ city : 1} }).toArray())
