/**
 * Node.js 22+ exposes localStorage as a global (Web Storage API).
 * Next.js DevOverlay reads localStorage during SSR in dev mode.
 * Without --localstorage-file pointing to a valid SQLite DB, this crashes.
 * Run as `predev` — creates the DB so NODE_OPTIONS in `dev` script can point to it.
 */
import { DatabaseSync } from 'node:sqlite'
import { existsSync } from 'node:fs'

const LS_FILE = '/tmp/surte-ls.db'

if (!existsSync(LS_FILE)) {
  const db = new DatabaseSync(LS_FILE)
  db.exec('CREATE TABLE IF NOT EXISTS ItemTable (key TEXT NOT NULL, value TEXT NOT NULL)')
  db.close()
  console.log(`[setup-dev] Created localStorage DB at ${LS_FILE}`)
}
