const applyLanguageFromTranslation = (obj: any, lang: string) => {
  if (!obj || typeof obj !== 'object') return obj;

  const result = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (key === 'translations') return;
    else if (value && Array.isArray(value)) result[key] = value.map((el) => applyLanguageFromTranslation(el, lang));
    else if (value && typeof value === 'object' && typeof (value as Date).getMonth !== 'function') {
      result[key] = applyLanguageFromTranslation(value, lang);
    }
    else result[key] = value;
  });

  // Apply translations
  if (lang !== 'lt' && obj.translations?.length) {
    const target = obj.translations.find((el) => el.locale === lang);
    if (target) {
      Object.keys(target).forEach((translatedKey) => {
        if (translatedKey === 'uuid' || translatedKey === 'locale') return;
        result[translatedKey] = target[translatedKey];
      });
    }
  }

  return result;
};

export default applyLanguageFromTranslation;
