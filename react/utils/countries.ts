import countries_en from 'i18n-country-code/locales/en.json'
import countries_pt from 'i18n-country-code/locales/pt.json'
import countries_es from 'i18n-country-code/locales/es.json'

export const getCountries = (includedCountries: string[] | undefined, language: string = 'en-us') => {
  const languageBase = language.split('-')[0]
  const countries =
    (languageBase === 'en' && countries_en) ||
    (languageBase === 'pt' && countries_pt) ||
    (languageBase === 'es' && countries_es)

  return Object.keys(countries).reduce((prev: any, element: any) => {
    if (includedCountries) {
      if (includedCountries.includes(element)) {
        return [...prev, { label: countries[element], value: element }]
      }
      return prev
    }
    return [...prev, { label: countries[element], value: element }]
  }, [])
}