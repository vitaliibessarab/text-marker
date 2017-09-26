import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { pattern as urlPattern, name as urlTokenName } from './lib/url';
import { pattern as newlinePattern, name as newlineTokenName } from './lib/newline';
import tableTokenizer, {middleware as tableware} from './lib/types/table';
import textRangeSearch from './lib/types/range';
import specialCharacter from './lib/types/special_character';
import blockSearch from './lib/types/block';
import App from './components/app.component';
import lex, { printTokens } from './lib/lexer';
import stubs from './lib/types/__stubs__/text.stubs';
import utilStubs from './lib/__stubs__/utils.stubs';

let text;
// text = 'foo *bar _foo* baz_';
// text = stubs.tables.twoColumn;
// text = stubs.largeText;
// text = stubs.tables.markUpBetweenCells;
// text = stubs.markUp;
// text = '**foo bar foo baz**';
// text = utilStubs.twoRowTable.text;
text = '*foo bar foo baz*';
// text = utilStubs.twoRowTable.text;
// text = utilStubs.blockSpansCells.text;
text = 'foo2 *bar2 baz2\tlorem2 ipsum2*';
window.text = text;

setTimeout(() => {
  let patterns = [
    blockSearch({ open: '*', close: '*' }, 'BOLD'),
    // blockSearch({ open: '<i>', close: '</i>' }, 'UNDERLINE'),
    // blockSearch({ open: '_', close: '_' }, 'UNDERLINE'),
    // specialCharacter('\n', 'NEWLINE'),
    // blockSearch({ open: '-', close: '-' }, 'STRIKETHROUGH'),
    tableTokenizer('\t'),
    // textRangeSearch('bar baz', 'FIND'),
    // textRangeSearch(' a', 'FIND'),
    // textRangeSearch(urlPattern, urlTokenName),
    // keywordTokenizer('/buzz', 'BUZZ'),
    // textRangeSearch('yar bar', 'FIND'),
    // textRangeSearch('bar foo', 'HIGHLIGHT'),
    // textRangeSearch('foo baz', 'MARK'),
    // textRangeSearch('foo', 'MARK'),
    // textRangeSearch('Aenean', 'IPSUM')
  ];
  let sample = text;
  console.log('parsing ', sample.length, 'characters');
  let sum = 0;
  let tokens;
  let count = 1;
  for (let i = 0; i < count; i++) {
    // console.profile('parse');
    performance.mark('parse-start');
    tokens = lex(sample, patterns, [tableware]);
    performance.mark('parse-end');
    // console.profileEnd('parse');
    performance.measure('parse', 'parse-start', 'parse-end');
  }
  performance.getEntriesByName('parse').forEach((timing) => {
    sum += timing.duration;
  });
  console.log('parsing average over', count, 'times:', sum / count, 'ms');
  console.log('tokens: ', tokens);
}, 0);


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App text={text} />,
    document.getElementById('app')
  );
});

