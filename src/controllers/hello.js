const test = (req, res) => res.json({ message: 'Hello, World!' });

const authTest = (req, res) =>
  res.json({ message: 'Hello, Authenticated User!' });

const nestedTest = (req, res) =>
  res.json({ message: 'Hello from a nested namespace!' });

const nestedTestDynamic = (req, res) =>
  res.json({ id: req.params.id, message: 'Hello from a nested resource!' });

const authNestedTestDynamic = (req, res) =>
  res.json({
    id: req.params.id,
    message: 'Hello from an authenticated nested resource!',
  });

export default {
  test,
  authTest,
  nestedTest,
  nestedTestDynamic,
  authNestedTestDynamic,
};
