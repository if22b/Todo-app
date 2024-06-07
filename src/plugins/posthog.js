import posthog from 'posthog-js';

export default {
  install(app) {
    posthog.init('phc_mUTrNZYbj4qQyOGn2K1szr3qokj67CktsCfM60ZbBVt', {
      api_host: 'https://us.i.posthog.com',
    });

    app.config.globalProperties.$posthog = posthog;
  },
};
