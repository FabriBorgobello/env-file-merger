const fs = require('fs');
const path = require('path');

const envFiles = ['.env.development', '.env.production'];

function logWithColor(message, color) {
  console.log(`\x1b[${color}m%s\x1b[0m`, message);
}

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
            );
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

logWithColor('⏳ Creating .env file...', 36);

// Check for an existing .env file
const baseEnvFile = '.env';
const mergedContent = mergeEnvFiles(baseEnvFile, envFiles);

fs.writeFileSync(path.join(__dirname, baseEnvFile), mergedContent);

logWithColor('✅ Merged .env file created successfully.', 32);
