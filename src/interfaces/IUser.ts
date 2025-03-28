export interface IUser {
  _id: string;
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
  _doc?: Omit<IUser, '_doc'>;
  spriteUrl?: string;
  position: number;
}
