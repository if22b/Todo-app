//./plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init(
      'phc_YHoD7W16GKThZKFuu3ptg269CEE4L2G4zrKepTSjGgT',
      {
        api_host: 'https://us.i.posthog.com',
      }
    );

    posthog.onFeatureFlags(() => {
      console.log('Feature flags are available.');
    });
  },
};
