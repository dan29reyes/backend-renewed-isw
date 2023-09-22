function successResponse(data, statusCode = 200) {
  return {
    statusCode,
    success: true,
    message: "OK",
    data,
  };
}

module.exports = {
  successResponse,
};
