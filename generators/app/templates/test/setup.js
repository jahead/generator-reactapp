import { jsdom } from 'jsdom';
import 'babel-polyfill';

global.document = jsdom();
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.window.location.hash = '?env=TEST';
