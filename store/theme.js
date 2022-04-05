export const state = () => ({
  darkMode: window.localStorage.getItem("darkMode") === "true" ? true : false,
});

export const mutations = {
  SET(state, darkMode) {
    state.darkMode = darkMode;
    document.body.style.setProperty(
      "--primaryText",
      darkMode ? "#ebebeb" : "#282c2c"
    );
    document.body.style.setProperty(
      "--primaryBackground",
      darkMode ? "#282c2c" : "#ebebeb"
    );
    document.body.style.setProperty(
      "--secondaryBackground",
      darkMode ? "#454a4a" : "#ffffff"
    );
    document.body.style.setProperty(
      "--subtitleColor",
      darkMode ? "#bcbcbc" : "#656565"
    );
  },
};

export const actions = {
  SET(state, darkMode) {
    return new Promise((resolve) => {
      state.commit("SET", darkMode);
      window.localStorage.setItem("darkMode", darkMode);
      resolve(true);
    });
  },
};
