printjson(db.people.aggregate([
    {
        $group:{
            _id:'$sex', 
            averageHight:{$avg: {$toDouble: '$height'}}, 
            averageWeight:{$avg:{ $toDouble: '$weight'}}
        }
    }
]))