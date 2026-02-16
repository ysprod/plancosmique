#!/usr/bin/env node

/**
 * Build version generator script
 * Generates a BUILD_VERSION environment variable for cache busting
 */

const fs = require('fs');
const path = require('path');

// Generate version based on timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const envPath = path.join(__dirname, '.env.local');

// Read existing .env.local or create new content
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf-8');
}

// Remove old BUILD_VERSION if exists
envContent = envContent.replace(/^BUILD_VERSION=.*$\n?/m, '');

// Add new BUILD_VERSION at the top
const newEnvContent = `BUILD_VERSION=${timestamp}\n${envContent}`;

// Write updated .env.local
fs.writeFileSync(envPath, newEnvContent, 'utf-8');

console.log(`✅ Build version generated: ${timestamp}`);
console.log(`📝 Updated .env.local`);
