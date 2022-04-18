function map (){
    emit(this.job, {
        count : 0
    })
 };
    
 function reduce(job, people) {
    var count =0;
    people.forEach(person => 
        count +=1)
    return count;
 }
    
 
 
 db.people.mapReduce(map,reduce,
    {
       out: "jobs" 
    }
 )
    
 printjson(db.jobs.find().toArray());
   