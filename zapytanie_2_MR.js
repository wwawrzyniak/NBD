function map (){
    this.credit.forEach(function(card){ emit(card.currency, { 
        balance: card.balance});
     });
};
function reduce (currency, people){
    var result =  {balances : []}
    people.forEach(person => {
            result.balances.push(Number(person.balance))
    });
    return result;
};
function finalize(currency, people){
    var res = {
        sum_balances : Array.sum(people.balances)
    }
    return res;
}
 
db.people.mapReduce(map,reduce,{ out: "balances", finalize: finalize})
    
printjson(db.balances.find().sort( { _id: 1 } ).toArray())
   