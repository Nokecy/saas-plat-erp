import {configure} from '@storybook/react';
import winflex from './flex';

function flex() {
  winflex(100, 1);
}

function theme() {
  let antdRequiredStyles = 'html,body,#root,div[data-reactroot]{width:100%;height:100%;}';
  // if (Screen.width > Screen.sm) { antdRequiredStyles += 'html{font-size:
  // 100PX;}'; } create stylesheet
  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = antdRequiredStyles;
  } else {
    style.appendChild(document.createTextNode(antdRequiredStyles));
  }

  // inject stylesheet
  document.head.appendChild(style);
}

function loadStories() {

  flex();
  theme();

  require('../stories/EditXs.js');
  require('../stories/ListXs.js');

  require('../stories/Edit.js');

  // You can require as many stories as you need.
}

configure(loadStories, module);
