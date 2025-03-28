import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { IUser } from "@/interfaces/IUser";

export async function getTopUsers(): Promise<IUser[]> {
  try {
    await connectMongoDB();

    const topUsers: IUser[] = await User.find({})
      .sort({ elo: -1 })
      .limit(10)

    return topUsers;
  } catch (error) {
    console.error("Error obtaining top users:", error);
    throw new Error("Failed to fetch top users");
  }
}
