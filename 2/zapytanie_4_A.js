printjson(db.people.aggregate([
    {
        $group:{
            _id:'$nationality', 
            MinBMI:{$min: {$divide : [{ $toDouble:"$weight"}, { $pow : [{ $divide : [{ $toDouble:"$height"},100]},2]}]}}, 
            AvgBMI:{$avg: {$divide : [{ $toDouble:"$weight"}, { $pow : [{ $divide : [{ $toDouble:"$height"},100]},2]}]}},
            MaxBMI:{$max: {$divide : [{ $toDouble:"$weight"}, { $pow:  [{ $divide : [{ $toDouble:"$height"},100]},2]}]}}
        }
    }
]).toArray())