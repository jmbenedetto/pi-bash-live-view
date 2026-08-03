import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');

test('documents an explicit Linux node-pty build that preserves global script policy', () => {
  assert.equal(pkg.scripts?.['setup:linux'], 'npm rebuild node-pty --ignore-scripts=false');
  assert.match(readme, /npm run setup:linux/);
  assert.match(readme, /ignore-scripts=true/);
  assert.match(readme, /Linux/);
});
