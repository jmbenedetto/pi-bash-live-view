import test from 'node:test';
import assert from 'node:assert/strict';
import { visibleWidth } from '@earendil-works/pi-tui';
import { buildWidgetAnsiLines } from '../widget.ts';

const defaultStyle = {
  bold: false,
  dim: false,
  italic: false,
  underline: false,
  inverse: false,
  invisible: false,
  strikethrough: false,
  fgMode: 'default',
  fg: 0,
  bgMode: 'default',
  bg: 0,
};

function makeSnapshotLine(text) {
  return Array.from(text).map((ch) => ({ ch, style: { ...defaultStyle } }));
}

function assertLinesFit(lines, width) {
  for (const line of lines) {
    assert.ok(
      visibleWidth(line) <= width,
      `expected line width <= ${width}, got ${visibleWidth(line)} for ${JSON.stringify(line)}`,
    );
  }
}

test('live widget keeps emoji feedback output within a 75-column terminal', () => {
  const width = 75;
  const snapshot = [
    makeSnapshotLine('## 2. (line 18) Feedback on: "✅ The global Just recipes pi, pi-mcp, pi-mc'),
  ];

  const rendered = buildWidgetAnsiLines({
    snapshot,
    width,
    rows: 1,
    elapsedMs: 143000,
  });

  assert.equal(rendered.length, 3);
  assertLinesFit(rendered, width);
});

test('live widget keeps wide-character titles within terminal width', () => {
  const width = 40;
  const rendered = buildWidgetAnsiLines({
    title: 'Live terminal 微信图片 very long title',
    snapshot: [makeSnapshotLine('ok')],
    width,
    rows: 1,
    elapsedMs: 315300,
  });

  assertLinesFit(rendered, width);
});
