/**
 * Update .env.local with Supabase credentials
 */

const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "../.env.local");
const envExamplePath = path.join(__dirname, "../.env.example");

const credentials = {
  SUPABASE_URL: "https://giqrkglcjstwvhbslpiu.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpcXJrZ2xjanN0d3ZoYnNscGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0OTUzODQsImV4cCI6MjA3ODA3MTM4NH0.hFmUK2jpm64soZPb8LCKUtXmh99wkXEHy1CriOYFeyA",
  SUPABASE_SERVICE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpcXJrZ2xjanN0d3ZoYnNscGl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjQ5NTM4NCwiZXhwIjoyMDc4MDcxMzg0fQ.Zkj41lLJITCHDID8SYCWjgiDTc9PlHGArHj_kRlnJgU",
};

function updateEnvFile() {
  let envContent = "";

  // Read existing .env.local if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf8");
  } else if (fs.existsSync(envExamplePath)) {
    envContent = fs.readFileSync(envExamplePath, "utf8");
  }

  // Update or add credentials
  const lines = envContent.split("\n");
  const newLines = [];
  const updatedKeys = new Set();

  // Process existing lines
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) {
      newLines.push(line);
      continue;
    }

    const [key] = trimmedLine.split("=");
    if (credentials[key]) {
      newLines.push(`${key}=${credentials[key]}`);
      updatedKeys.add(key);
    } else {
      newLines.push(line);
    }
  }

  // Add missing credentials
  for (const [key, value] of Object.entries(credentials)) {
    if (!updatedKeys.has(key)) {
      newLines.push(`${key}=${value}`);
    }
  }

  // Write updated content
  fs.writeFileSync(envPath, newLines.join("\n"), "utf8");
  console.log("✅ Updated .env.local with Supabase credentials");
}

updateEnvFile();

