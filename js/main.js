const form = document.getElementById('form');
const input = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-container');

let pokemones = JSON.parse(localStorage.getItem('pokemones')) || [];

const saveLocalStorage = pokemonesList => {
    localStorage.setItem('pokemones' ,JSON.stringify(pokemonesList));
};
//funcion para renderizar HTML
const renderPokemon = pokemon => {
    return `
        <h3 id="name">${pokemon.name}</h3>
        <h3 id="stats" >${pokemon.stats[0].base_stat} </h3>
        <img
          className="pokemon-img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <ul id="list-types">
        <b>Tipos:</b>
        ${tipo}
        </ul>
        <div class= "weight">
        <h4>Peso</h4>
        <p>${pokemon.weight} </p>
        </div>
        <div class="height">
        <h4>Altura</h4>
        <p>${pokemon.height}</p>
        </div>
        `;
}

//funcion para la logica de render
const renderPokemonesList = pokemonesList => {
    cardContainer.innerHTML = pokemonesList.map(pokemon  => renderPokemon(pokemon)).join('');
}
const searchPokemon = async e => {
    e.preventDefault();
const searchPokemon = input.value.trim();

if(searchPokemon == ''){
    alert('Ingrese un ID');
    return;
}
const fetchedPokemon = await requestPokemon(searchPokemon);

if(!fetchedPokemon.id){
    alert('El ID ingresado no existe');
    form.reset();
    return;
}else if(pokemones.some(pokemon => pokemon.id == fetchedPokemon.id)){
    alert('Ya mostramos ese pokemon con ese ID');
    form.reset();
    return;
}
pokemones = [fetchedPokemon, ...pokemones];
renderPokemonesList(pokemones);
saveLocalStorage(pokemones);
form.reset();
};


const init = () => {
    form.addEventListener('submit' , searchPokemon);
};
init();