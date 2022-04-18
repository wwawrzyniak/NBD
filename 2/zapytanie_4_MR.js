function map (){
    emit(this.nationality, {
    height: Number(this.height),
    weight: Number(this.weight) })
};
    
function reduce (nationality, people_measurements){
    var result =  {BMI : []}
    people_measurements.forEach(person => {
        result.BMI.push(person.weight / ((person.height/100)*(person.height/100)))
    });
    return result;
};
    
function finalize (nationality, people_measurements) {
    var res = { 
        min_BMI :  Math.min(...people_measurements.BMI),
        avg_BMI: Array.avg(people_measurements.BMI),
        max_BMI : Math.max(...people_measurements.BMI)
    }
    return res;
}
        
db.people.mapReduce(map,reduce,{out: "BMI",finalize: finalize})
    
printjson(db.BMI.find().sort( { _id: 1 } ).toArray())