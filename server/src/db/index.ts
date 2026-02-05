import { Pool, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Alternatively use individual params if DATABASE_URL is not set
  // host: process.env.PGHOST,
  // user: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  // database: process.env.PGDATABASE,
  // port: parseInt(process.env.PGPORT || '5432'),
});

export const query = <R extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<R>> => {
  return pool.query<R>(text, params);
};

export default pool;
