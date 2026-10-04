const STORAGE_KEY = "movix-region";

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" });
  } catch {
    return null;
  }
})();

const languageNames = (() => {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" });
  } catch {
    return null;
  }
})();

export const regionName = (code) => {
  try {
    return regionNames?.of(code) || code;
  } catch {
    return code;
  }
};

export const languageName = (code) => {
  try {
    return languageNames?.of(code) || code;
  } catch {
    return code;
  }
};

export const getRegion = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
  } catch {
    return detectRegion();
  }
  return detectRegion();
};

export const saveRegion = (code) => {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    return;
  }
};

const detectRegion = () => {
  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const language of languages) {
    const region = language?.split("-")[1];
    if (region && region.length === 2) return region.toUpperCase();
  }

  return "US";
};
