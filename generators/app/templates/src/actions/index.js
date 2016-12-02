export const action = (type, payload, meta) => ({
  type,
  payload,
  meta,
  error: payload instanceof Error,
});

export const ERROR = {
    CATCH: 'ERROR_CATCH'
  };