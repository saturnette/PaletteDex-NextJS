import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { notFound } from "next/navigation";
import { IUser } from "@/interfaces/IUser";

export async function getUserData(id: string) {
  try {
    await connectMongoDB();

    const user: IUser | null = await User.findById(id);
    
    if (!user) {
      return notFound();
    }
    
    return user;
  } catch (error) {
    console.error("Error obtaining user data:", error);
    return notFound();
  }
}