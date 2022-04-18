printjson(db.people.aggregate(
[{$unwind : "$credit"},
{$match : {"sex": "Female", "nationality" : "Poland"}},
{$group : {_id: "$credit.currency", 
sum : {$sum : { $toDouble:"$credit.balance"}  }, 
average : {$avg : { $toDouble: "$credit.balance"}} }}]
).toArray())