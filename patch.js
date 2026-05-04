// Run this once after `npm install` to fix the friend_source_flags null crash
// Usage: node patch.js

const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "node_modules",
  "discord.js-selfbot-v13",
  "src",
  "managers",
  "ClientUserSettingManager.js"
);

if (!fs.existsSync(filePath)) {
  console.error("File not found:", filePath);
  console.error("Make sure you ran `npm install` first.");
  process.exit(1);
}

let content = fs.readFileSync(filePath, "utf8");

const before = "data.friend_source_flags.all";
const after  = "data.friend_source_flags?.all";

if (content.includes(after)) {
  console.log("✅ Already patched — nothing to do.");
  process.exit(0);
}

if (!content.includes(before)) {
  console.error("❌ Could not find the target line. Library version may differ.");
  process.exit(1);
}

content = content.replace(before, after);
fs.writeFileSync(filePath, content, "utf8");
console.log("✅ Patched successfully!");