import { getPokemonSprite } from "@/services/getPokemonSprite";
import { IUser } from "@/interfaces/IUser";

export async function getUsersSprites(topUsers: IUser[]) {
  return Promise.all(
    topUsers.map(async (user, index) => {
      const spriteUrl = await getPokemonSprite(
        user.companionPokemon?.number ?? user.pokemonCollection[0]?.number ?? 1
      );
      return {
        ...(user._doc || user),
        spriteUrl,
        position: index + 1,
      };
    })
  );
}
