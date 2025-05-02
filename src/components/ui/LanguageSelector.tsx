import { useTranslation } from "react-i18next";

  return (
    <select
      onChange={e => i18n.changeLanguage(e.target.value)}
      defaultValue={i18n.language}
      className="ml-auto border px-2 py-1 rounded"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
};

export default LanguageSelector;