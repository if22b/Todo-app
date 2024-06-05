import posthog from 'posthog-js';

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init(
      'phc_mUTrNZYbj4qQyOGn2K1szr3qokj67CktsCfM60ZbBVt',
      {
        api_host: 'https://us.i.posthog.com',
      }
    );
  },
};
