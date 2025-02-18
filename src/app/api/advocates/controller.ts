import db from "../../../db";
import { asc, ilike, or, countDistinct, sql } from 'drizzle-orm';
import { advocates } from "../../../db/schema";


export async function getAdvocates({page, size, query}: { page: number; size: number; query?: string;}) {
  const offset = (page - 1) * size;
  
  if (!query) {
    try {
      const data = await Promise.all([
        db.select({ count: countDistinct(advocates.id) }).from(advocates),
        db.selectDistinct().from(advocates).limit(size).offset(offset).orderBy(asc(advocates.createdAt))]);
      return data;
    } catch (error) {
        console.error("Error executing queries:", error);
        throw error;
    }
  }

  const filters = [
    ilike(advocates.firstName, `${query}%`), 
    ilike(advocates.lastName, `${query}%`),
    ilike(advocates.city, `${query}%`),
    ilike(advocates.degree, `${query}%`),
    ilike(sql`specialties::text`, `%${query}%`),
  ]
  
  try {
    const data = await Promise.all([
      db.select({count: countDistinct(advocates.id)}).from(advocates).where(or(...filters)),
      db.select().from(advocates).where(or(...filters)).limit(size).offset(offset).orderBy(asc(advocates.createdAt))
      ]);
    return data;
  } catch (error) {
      console.error("Error executing queries:", error);
      throw error;
  }
}