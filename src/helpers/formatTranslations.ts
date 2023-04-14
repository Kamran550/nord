const formatTranslations = (obj: any, uuidKey = 'uuid') => {
  if (!obj || typeof obj !== 'object') return obj;

  const result: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (key === 'translations') return;
    else if (value && Array.isArray(value)) result[key] = value.map((el) => formatTranslations(el));
    else if (value && typeof value === 'object' && typeof (value as Date).getMonth !== 'function') {
      result[key] = formatTranslations(value);
    }
    else result[key] = value;
  });

  // Format
  if (obj.translations.length) {
    Object.keys(obj.translations[0]).forEach(key => {
      if (key === uuidKey || key === 'locale') return;
      result[key] = {
        'lt': obj[key],
        ...obj.translations.reduce((s, c) => ({ ...s, [c.locale]: c[key] }), {})
      };
    });
  }

  return result;
};

export default formatTranslations;
