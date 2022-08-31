export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
export const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const APP_NAME = process.env.NEXT_PUBLIC_APPNAME;
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION;
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION;
export const LOCAL_STORAGE_SELECTED_INDEX = 'selectedIndex';

// API Endpoints for the application
/** @type {{
 * submitVote:({ propositionId:number, target:string }) => string,
 * getProposedTranslations:(sentenceVoId:number) => string,
 * getSentences:(queryString:string) => string,
 * addNewProposition:() => string,
 * }}
 * */
export const API_ENDPOINTS = {
  submitVote: ({ propositionId, target }) =>
    `${API_URL}/reaction/${propositionId}?target=${target}`,
  getProposedTranslations: (sentenceVoId) =>
    `${API_URL}/proposed/translations/${sentenceVoId}`,
  getSentences: (queryString) =>
    `${API_URL}/sentences${queryString && `?${queryString}`}`,
  addNewProposition: () => `${API_URL}/propose/new/translation`,
};
