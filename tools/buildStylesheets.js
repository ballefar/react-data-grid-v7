'use strict';

const fs = require('fs').promises;
const { dirname } = require('path');
const less = require('less');
const CleanCSS = require('clean-css');

const cleanCSS = new CleanCSS({
  level: { 1: { specialComments: false }, 2: {} },
  rebase: false,
  returnPromise: true
});

[
  './packages/react-data-grid-v7/style/react-data-grid-v7.less',
  './packages/react-data-grid-v7-addons/style/react-data-grid-v7-addons.less'
].forEach(buildStylesheet);

async function buildStylesheet(path) {
  const buf = await fs.readFile(path);
  try {
    const { css } = await less.render(buf.toString(), { filename: path });
    const { styles } = await cleanCSS.minify(css);
    const dest = path.replace('/style/', '/dist/').replace('.less', '.css');
    await fs.mkdir(dirname(dest), { recursive: true });
    await fs.writeFile(dest, styles);
  } catch (err) {
    console.error(err.message || err);
    process.exitCode = 1;
  }
}
