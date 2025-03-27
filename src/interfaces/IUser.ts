export interface IUser {
  winsLadder: number;
  lossesLadder: number;
  favoriteColor: string;
  showdownNick: string;
  elo: number;
  coins: number;
  companionPokemon?: {
    number: number;
  };
  pokemonCollection: {
    number: number;
    name: string;
    count: number;
    _id: string ;
  }[];
}
