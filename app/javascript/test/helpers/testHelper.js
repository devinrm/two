import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Promise from 'promise-polyfill';
import fetch from 'node-fetch';
import 'babel-polyfill';

chai.use(chaiEnzyme());

// http://airbnb.io/enzyme/docs/guides/jsdom.html
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html');
const { window } = jsdom;
const copyProps = (src, target) => {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
};

global.window = window;
global.document = window.document;
global.fetch = fetch;
global.navigator = { userAgent: 'node.js' };

copyProps(window, global);

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}
