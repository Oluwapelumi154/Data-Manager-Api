exports.errorMessage = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: "error",
    message,
  });
};
exports.successMessage = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: "success",
    message,
  });
};
exports.sessionResponsesMessage = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};
exports.serviceResponse = (statusCode, message, data) => ({ statusCode, message, data });
