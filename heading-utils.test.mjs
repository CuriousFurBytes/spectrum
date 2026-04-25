import test from 'node:test';
import assert from 'node:assert/strict';
import { splitHeading } from './theme.js';

test('splits single word heading by characters', () => {
  assert.deepEqual(splitHeading('Spectrum'), { lead: 'Spec', accent: 'trum' });
});

test('splits two-word heading into one word each', () => {
  assert.deepEqual(splitHeading('Color Tokens'), { lead: 'Color', accent: 'Tokens' });
});

test('splits 5-word heading into first half words and second half words', () => {
  assert.deepEqual(splitHeading('Vibrant Semantic UI Color System'), {
    lead: 'Vibrant Semantic UI',
    accent: 'Color System'
  });
});
