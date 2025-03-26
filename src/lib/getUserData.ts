import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { notFound } from "next/navigation";

export async function getUserData(id: string) {
  try {
    await connectMongoDB();

    const user = await User.findById(id);
    return user
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return notFound();
  }
}
