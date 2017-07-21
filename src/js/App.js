// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import { getCurrentLocale, getLocaleData } from 'grommet/utils/Locale';
import { Router, browserHistory as history } from 'react-router';
import { routes } from './Routes';
import store from './store';
let locale = getCurrentLocale();
addLocaleData(en);

let messages;
try {
  // rtl driven by hardcoding languages for now
  if ('he' === locale || 'ar' === locale.slice(0, 2)) {
    document.documentElement.classList.add("rtl");
  } else {
    document.documentElement.classList.remove("rtl");
  }
  messages = require('../messages/' + locale);
} catch (e) {
  messages = require('../messages/en-US');
}
var localeData = getLocaleData(messages, locale);
export default () => (
  <Provider store={store}>
    <IntlProvider locale={localeData.locale} messages={localeData.messages}>
      <Router routes={routes} history={history} />
    </IntlProvider>
  </Provider>
);
