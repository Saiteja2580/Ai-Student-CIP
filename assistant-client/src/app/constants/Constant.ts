import { environment } from '../../env/env.local';

export const Constant = {
  API_URL: `${environment.apiBaseUrl}`,
  QUIZ: {
    GENERATE_QUIZ_URL: `${environment.apiBaseUrl}/quiz/generate-quiz`,
    SUBMIT_QUIZ_URL: `${environment.apiBaseUrl}/quiz/submit-quiz`,
    QUIZ_BY_ID_URL: `${environment.apiBaseUrl}/quiz/getResultById`,
    TOTAL_QUIZ_ATTEMPTED_URL: `${environment.apiBaseUrl}/quiz/getQuizByUserId`,
  },
  SCHEDULE: {
    ADD_SCHEDULE_FORM_URL: `${environment.apiBaseUrl}/schedule/add-schedule-form`,
    ADD_SCHEDULE_TEXT_URL: `${environment.apiBaseUrl}/schedule/add-schedule-text`,
    GET_SCHEDULE_URL: `${environment.apiBaseUrl}/schedule`,
    DELETE_SCHEDULE_URL: `${environment.apiBaseUrl}/schedule`,
    UPDATE_SCHEDULE_URL: `${environment.apiBaseUrl}/schedule`,
  },
  TASK: {
    GET_TASK_URL: `${environment.apiBaseUrl}/task`,
    ADD_TASK_URL: `${environment.apiBaseUrl}/task`,
    UPDATE_TASK_URL: `${environment.apiBaseUrl}/task`,
    DELETE_TASK_URL: `${environment.apiBaseUrl}/task`,
    UPDATE_STATUS_URL: `${environment.apiBaseUrl}/task`,
  },
  CAREER: {
    GET_QUESTION_RESPONSE_URL: `${environment.apiBaseUrl}/career/ask`,
    GET_CHAT_HISTORY_URL: `${environment.apiBaseUrl}/career/history`,
  },
};
