# .env File Merger

This Node.js script merges multiple `.env` files into a single `.env` file. It's designed to combine a base `.env` file with additional environment-specific files (like `.env.development`, `.env.production`, etc.), creating a comprehensive set of environment variables.

## Features

- **Multiple Environment Support:** Merges different `.env` files for various environments.
- **Existing Values Preservation:** If an existing `.env` file contains values, they are included in the final result.
- **Duplicate Key Warning:** Alerts if duplicate keys are found across files.

## Usage

Place your `.env` files in the root directory of the script and run the script using Node.js:

```sh
node index.js
```

The script will merge the content from the specified files into the base `.env` file, retaining any existing values.

## Configuration

Modify the `envFiles` array in the script to include the names of the `.env` files you want to merge, excluding the base `.env` file.

Example:

```javascript
const envFiles = ['.env.development', '.env.production'];
```
