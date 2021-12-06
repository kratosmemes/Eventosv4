import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

//Importando lenguajes
const enL = require('./Translations/en.json');
const esL = require('./Translations/es.json');
const itL = require('./Translations/it.json');
const deL = require('./Translations/de.json');
const frL = require('./Translations/fr.json');

i18n.translations = {
    en: enL,
    es: esL,
    it: itL,
    de: deL,
    fr: frL
}

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;