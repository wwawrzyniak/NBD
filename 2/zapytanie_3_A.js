printjson(db.people.aggregate([ 
    {
        $group:{
            _id:null,
            uniqueCount: {$addToSet: "$job"}
        }
    }
]).toArray())