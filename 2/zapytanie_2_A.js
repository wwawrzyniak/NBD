 printjson(db.people.aggregate([
     {
         "$unwind" : "$credit" 
    },
    {
        "$group" : {
            "_id" : "$credit.currency",
            "sumOfBalance" : {
                "$sum" :{
                     $toDouble:"$credit.balance"
                    }
                }
        }
    }
]).toArray())