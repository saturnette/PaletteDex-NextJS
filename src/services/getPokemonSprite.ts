export async function getPokemonSprite(pokemonNumber: number) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
    );
    const data = await response.json();
    const spriteUrl = data.sprites.other["dream_world"].front_default;
    return spriteUrl;
  } catch (error) {
    console.error("Error fetching the Pokémon sprite:", error);
    return "https://archives.bulbagarden.net/media/upload/thumb/a/a1/Substitute_artwork.png/250px-Substitute_artwork.png";
  }
}
