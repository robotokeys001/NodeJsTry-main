// this = riferisce all'oggetto dove THIS e usato
//        (l'oggetto dipende dal contesto immediato)
//        object.name = this.name

const person1 = {
    name : "Spongebob",
    favFood : "Hamburgers",
    sayHello : function(){console.log(`Hi! I am ${this.name}`)},
    eat : function(){console.log(`${this.name} is eating ${this.favFood}`)}
}

//La keyword .this non funziona con ()=>
    const person2 = {
    name : "Patrick",
    favFood : "pizza",
    sayHello : ()=>{console.log(`Hi! I am ${this.name}`)},
    eat : ()=>{console.log(`${this.name} is eating ${this.favFood}`)}
}

person1.eat();
person2.eat();