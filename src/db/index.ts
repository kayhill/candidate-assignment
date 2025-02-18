import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    throw new Error("environment variable DATABASE_URL undefined");
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  export default db;
