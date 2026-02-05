import pool from './src/db';

process.env.DATABASE_URL = 'postgres://user:pass@google.com:5432/dbname'; // Using a host that definitely won't accept postgres connection

async function run() {
  try {
    console.log('Attempting to query...');
    await pool.query('SELECT NOW()');
    console.log('Query success');
  } catch (err) {
    console.error('Caught error:');
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();
