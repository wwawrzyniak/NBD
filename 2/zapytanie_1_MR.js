function map (){
   emit(this.sex, {
      weight: Number(this.weight),
      height: Number(this.height)
   })
};
   
function reduce(sex, people_measurements) {
   var res = { 
      weights : [], 
      heights : [] 
   }
   people_measurements.forEach( person => {
      res.weights.push(person.weight),
      res.heights.push(person.height)
   })
   return res;
}
   
function finalize(sex, people_measurements) {
   var res = { 
      average_weigth :  Array.avg(people_measurements.weights),
      average_height : Array.avg(people_measurements.heights)
   }
   return res;
}

db.people.mapReduce(map,reduce,
   {
      out: "avg_w_h_per_sex" ,
      finalize: finalize
   }
)
   
printjson(db.avg_w_h_per_sex.find().toArray());
  