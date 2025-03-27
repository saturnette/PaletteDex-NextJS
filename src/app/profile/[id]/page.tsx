import { getUserData } from "@/services/getUserData";
import { getPokemonSprite } from "@/services/getPokemonSprite";
import { UserInfo } from "@/components/profile/UserInfo";
import { Pokedex } from "@/components/pokedex/Pokedex";

const profilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const user = await getUserData(id);
  const spriteUrl = await getPokemonSprite(
    user.companionPokemon?.number ?? user.pokemonCollection[0]?.number ?? 1
  );

  const pokemonCollection = user.pokemonCollection.map(pokemon => pokemon.number);
  return (
    <div className="bg-primary pb-10">
      <UserInfo spriteUrl={spriteUrl} user={user} />
      <Pokedex userPokemonCollection={pokemonCollection}/>
    </div>
  );
};

export default profilePage;
