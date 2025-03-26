import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  name: { type: String, required: true },
  count: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    showdownNick: { type: String, required: true },
    winsLadder: { type: Number, default: 0 },
    lossesLadder: { type: Number, default: 0 },
    elo: { type: Number, default: 1000 },
    coins: { type: Number, default: 0 },
    pokemonCollection: [pokemonSchema],
    companionPokemon: pokemonSchema,
    companionBattles: { type: Number, default: 0 },
    favoriteColor: {
      type: String,
      enum: ["blue", "red"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ showdownNick: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
