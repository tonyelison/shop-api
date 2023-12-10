const test = (req, res) => res.json({ message: 'Hello, World!' });

const authTest = (req, res) =>
  res.json({ message: 'Hello, Authenticated User!' });

export default { test, authTest };
