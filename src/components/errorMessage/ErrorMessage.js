const ErrorMessage = () => {
  return (
    <img
      style={{ width: "100%", display: "block" }}
      src={process.env.PUBLIC_URL + "/error.gif"}
      alt={"The error just happened"}
    />
  );
};

export default ErrorMessage;
