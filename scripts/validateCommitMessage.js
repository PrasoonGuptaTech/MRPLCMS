const fs = require('node:fs');
const message = fs.readFileSync(process.argv[2], 'utf8').trim();
const regex = /^(feat|fix|chore|docs|refactor|test|style):\s.+$/;
if (!regex.test(message)) {
  console.error(
    'Invalid commit message. Use: feat|fix|chore|docs|refactor|test|style: description',
  );
  process.exit(1);
}
