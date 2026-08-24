import { multiple } from './lib.js';
import { render } from './main.js';

const results = [
  multiple(6, 4),
  multiple(5, 5),
  multiple(25, 5),
];

render(results);
