const fs = require('fs');
const path = require('path');

// List of .env file names to merge (excluding the base .env)
const envFiles = ['.env.development', '.env.production'];

// Function to log with color
function logWithColor(message, color) {
  console.log(`\x1b[${color}m%s\x1b[0m`, message);
}

// Function to merge .env files
function mergeEnvFiles(baseEnvFile, additionalFiles) {
  let combinedEnv = {};
  let filesToMerge = [baseEnvFile, ...additionalFiles];

  filesToMerge.forEach((file) => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      content.split('\n').forEach((line) => {
        if (line && line.includes('=')) {
          const [key, value] = line.split('=');
          if (combinedEnv[key] !== undefined) {
            logWithColor(
              `Warning: Duplicate key "${key}" found in ${file}. Using the latest value.`,
              33,
            ); // Yellow
          }
          combinedEnv[key] = value;
        }
      });
    } else if (file !== baseEnvFile) {
      console.warn(`File not found: ${file}`);
    }
  });

  return Object.entries(combinedEnv)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
}

// Start message
logWithColor('⏳ Creating .env file...', 36); // Cyan

// Check for an existing .env file
const baseEnvFile = '.env';
const mergedContent = mergeEnvFiles(baseEnvFile, envFiles);

// Write the merged content to the .env file
fs.writeFileSync(path.join(__dirname, baseEnvFile), mergedContent);

// Success message
logWithColor('✅ Merged .env file created successfully.', 32);
