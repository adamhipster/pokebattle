const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const pokemons = {
  pikachu: new Pokemon("Pikachu", 100, "electric", null, {thunderbolt: "thunderbolt", tackle: "tackle"}),
  charmander: new Pokemon("Charmander", 100, "fire", null, {ember: "ember", tackle: "tackle"}),
}

function Pokemon(name, health, type1, type2, attacks){
  this.name = name
  this.health = health
  this.type1 = type1
  this.type2 = type2
  this.attacks = attacks
  this.calculateDamage = function (baseAttack, hitrate){
    const generatedForHitRate = Math.random()
    if(generatedForHitRate > hitrate) return 0;
    const damage = Math.round(Math.random() * (baseAttack-5) + 5) 
    return damage 
  }
  this.attackPokemon = function (attackedPokemon, attackName){
    const damage = this.calculateDamage(this.allPokemonAttacks[attackName].damage, this.allPokemonAttacks[attackName].hitrate)
    attackedPokemon.health = attackedPokemon.health - damage
  }
  this.allPokemonAttacks = {
    thunderbolt: {damage: 15, hitrate: .8},
    ember: {damage: 15, hitrate: .8},
    tackle: {damage: 9, hitrate: .98},
  }
}

function battle(pokemon1, pokemon2){

    if(pokemon1.health < 1){
      console.log(pokemon2.name + " wins!\n")
      rl.close()
      process.exit()
      return
    }
    if(pokemon2.health < 1){
      console.log(pokemon1.name + " wins!\n")
      rl.close()
      process.exit()
      return
    }

    rl.question(`please choose an attack for ${pokemon1.name}, you can choose: ${Object.keys(pokemon1.attacks)}\n`, function(userInputLine){
      if(userInputLine in pokemon1.attacks){
        pokemon1.attackPokemon(pokemon2, pokemon1.attacks[userInputLine])
        console.log(`${pokemon1.name} uses ${userInputLine}!`)
        pokemon2.attackPokemon(pokemon1, pokemon2.attacks["tackle"])
        console.log(`${pokemon2.name} uses tackle!`)
        console.log(`${pokemon1.name}: ${pokemon1.health} hp ----- ${pokemon2.name}: ${pokemon2.health} hp`)

        //When a correct user input is given we need to make the program loop by invoking the same function as before
        battle(pokemons.pikachu, pokemons.charmander)
      }
      else {
        console.log(`You typed ${userInputLine}, which is not a valid attack. Try again\n`)

        //When a wrong user input is given we need to make the program loop by invoking the same function as before, but without doing the actual battle
        battle(pokemons.pikachu, pokemons.charmander)
      }
    })
}

//This starts the program
battle(pokemons.pikachu, pokemons.charmander)