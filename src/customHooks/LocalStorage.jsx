const LocalStorage = ({ key, value }) => {
  const item = JSON.parse(localStorage.getItem(key) || []);

  const setItem = localStorage.setItem(key, JSON.stringify(value));

  return [item, setItem];
};

export default LocalStorage;
