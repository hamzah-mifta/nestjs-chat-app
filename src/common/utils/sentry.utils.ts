import * as Sentry from '@sentry/node';

export const captureError = (
  error: any,
  context: string,
  payload: any,
  user?: object,
): void => {
  if (context) {
    Sentry.addBreadcrumb({ message: context });
  }

  if (payload) {
    Sentry.setContext('payload', payload);
  }

  if (user) {
    Sentry.setUser(user);
  }

  Sentry.captureException(error);
};
