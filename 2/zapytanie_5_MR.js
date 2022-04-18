function map (){
    var s = this.sex;
    var n = this.nationality
    this.credit.forEach(function(card){ emit(card.currency, { sex: s, nationality : n, 
        balance: card.balance});
     });
};
    
function reduce (currency, people){
    var result =  {balances : []}
    people.forEach(person => {
        if(person.sex == 'Female' && person.nationality == "Poland"){
            result.balances.push(Number(person.balance))
        }
    });
    return result;
};
    
function finalize(currency, people){
    var res = {
        sum_balances : Array.sum(people.balances),
        average_balances: Array.avg(people.balances)
    }
    return res;
}

        
db.people.mapReduce(map,reduce,{ out: "balances2", finalize: finalize})
    
printjson(db.balances2.find().sort( { _id: 1 } ).toArray())