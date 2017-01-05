//abstract attacks away in an attack list

function Pokemon(name, health, type1, type2, attackObject){
  this.name = name
  this.health = health
  this.type1 = type1
  this.type2 = type2
  this.attackObject = attackObject
  this.attack = function (baseAttack, hitrate){
    const generatedForHitRate = Math.random()
    if(generatedForHitRate > hitrate) return 0;
    const damage = Math.round(Math.random() * (baseAttack-5) + 5) 
    return damage 
  }
  this.attackPokemon = function (attackedPokemon){
    const damage = this.attack(this.attackObject.damage, this.attackObject.hitrate)
    attackedPokemon.health = attackedPokemon.health - damage
  }
}




function battle(){
  let pikachu = new Pokemon("Pikachu", 100, "electric", null, {damage: 15, hitrate: .8})
  let charmander = new Pokemon("Charmander", 100, "fire", null, {damage: 15, hitrate: .8})
  while(true){
    if(pikachu.health < 1){
      console.log("Charmander wins!\n")
      break
    }
    if(charmander.health < 1){
      console.log("Pikachu wins!\n")
      break
    }
    pikachu.attackPokemon(charmander)
    charmander.attackPokemon(pikachu)
  }
}

battle()