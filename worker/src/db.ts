import { Pool, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = <R extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<R>> => {
  return pool.query<R>(text, params);
};

export default pool;
