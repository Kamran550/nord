interface Response {
  ltEntity: any;
  translates: any[]
}

const parseTranslatedObjects = (obj: any, allLocales = false): Response => {
  const languages = ['lt', 'en', 'no'];
  const shared: Record<string, any> = {};
  const translated: Record<string, any> = {};
  languages.forEach((lang) => (translated[lang] = {}));

  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach(entry => {
        const translates = parseTranslatedObjects(entry, true);

        languages.forEach(lang => {
          if (!translates[lang]) return;

          if (!Array.isArray(translated[lang][key])) translated[lang][key] = [];
          translated[lang][key].push(translates[lang]);
        });
      });
    }
    else if (typeof obj[key] === 'object' && languages.some(lang => obj[key][lang])) {
      languages.forEach(lang => {
        if (obj[key][lang]) translated[lang][key] = obj[key][lang];
      });
    }
    else {
      shared[key] = obj[key];
    }
  });

  if (allLocales) {
    const result = {};
    Object.keys(translated).forEach(key => {
      if (Object.values(translated[key]).filter(Boolean).length) {
        result[key] = { ...translated[key], ...shared };
      }
    });
    return result as any;
  }

  const { lt, ...rest } = translated;
  return {
    ltEntity: { ...shared, ...lt },
    translates: Object.keys(rest)
      .filter(key => !!Object.values(rest[key]).filter(Boolean).length)
      .map(key => ({ locale: key, ...rest[key] }))
  };
};

export default parseTranslatedObjects;
