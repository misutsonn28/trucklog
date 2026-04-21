import assert from 'node:assert/strict';

function formatDate(value){
  if(!value) return '—';
  if(/^\d{4}-\d{2}-\d{2}$/.test(String(value))){
    const [y,m,d] = String(value).split('-').map(Number);
    const localDate = new Date(y, m - 1, d);
    return new Intl.DateTimeFormat('cs-CZ').format(localDate);
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : new Intl.DateTimeFormat('cs-CZ').format(d);
}

function kmDiff(start,end){
  const s = Number(start || 0);
  const e = Number(end || 0);
  return e > s ? e - s : 0;
}

function csvEscape(value){
  const text = String(value ?? '');
  return /[";\n\r]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
}
function buildCsv(rows){
  return rows.map(row => row.map(csvEscape).join(';')).join('\r\n');
}

assert.equal(formatDate('2026-04-21'), new Intl.DateTimeFormat('cs-CZ').format(new Date(2026,3,21)));
assert.equal(kmDiff(100, 180), 80);
assert.equal(kmDiff(180, 100), 0);
assert.equal(buildCsv([["a;b", 'x"y']]), '"a;b";"x""y"');

console.log('All tests passed');
