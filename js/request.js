

const requestPokemon = async (id) => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json();

    }catch(error){
        alert(error);
    }
}
requestPokemon();