import { IPokemon } from "@/interfaces/IPokemon";

const pokemonCache: { [key: string]: IPokemon[] } = {};

export async function getPokemonData(limit = 151, retryAttempts = 3) {
  if (pokemonCache[limit]) {
    console.log("Returning cached Pokémon data");
    return pokemonCache[limit];
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const pokemonList = data.results;

    const pokemonDataPromises = pokemonList.map(
      async (pokemon: { name: string; url: string }) => {
        return fetchPokemonDetails(pokemon.url, retryAttempts);
      }
    );

    const pokemonData = await Promise.allSettled(pokemonDataPromises);

    const successfulPokemon = pokemonData
      .filter(
        (result): result is PromiseFulfilledResult<IPokemon> =>
          result.status === "fulfilled"
      )
      .map(
        (result) => (result as PromiseFulfilledResult<IPokemon>).value
      );

    pokemonCache[limit] = successfulPokemon;

    console.log("Fetched and cached Pokémon data");
    return successfulPokemon;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return [];
  }
}

async function fetchPokemonDetails(
  url: string,
  retriesLeft: number
): Promise<IPokemon> {
  try {
    const pokemonResponse = await fetch(url, {
      signal: AbortSignal.timeout(5000),
    });

    if (!pokemonResponse.ok) {
      throw new Error(`HTTP error! status: ${pokemonResponse.status}`);
    }

    const pokemonData = await pokemonResponse.json();

    return {
      name: pokemonData.name,
      number: pokemonData.id,
      spriteUrl: pokemonData.sprites.other["dream_world"].front_default,
      types: pokemonData.types.map(
        (typeInfo: { type: { name: string } }) => typeInfo.type.name
      ),
    };
  } catch (error) {
    if (
      retriesLeft > 0 &&
      (error instanceof TypeError || error instanceof Error)
    ) {
      console.log(`Retrying fetch for ${url}, attempts left: ${retriesLeft}`);
      return fetchPokemonDetails(url, retriesLeft - 1);
    }
    throw error;
  }
}