#!/usr/bin/env node
// Prints a bcrypt hash for a password, for seeding/resetting app_users.password_hash
// directly in Supabase's SQL editor.
//
// Usage: npm run hash-password -- 'somePassword123'

import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: npm run hash-password -- '<password>'");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log(hash);
