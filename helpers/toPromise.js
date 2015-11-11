export default (...args) => {
  const f = R.head(args);
  const fArgs = R.tail(args);

  return new Promise((resolve, reject) => {
    return f(...fArgs, (err, result) => err ? reject(err) : resolve(result));
  });
};
