import Cache from "./Cache";

const HISTORY = "history";
const STATE = "state";
const PARAMETER = "parameter";

const sha256 = (value) => {
  // TODO: SHA256
  return value;
};

export default class BackHelper {
  static cache = {
    setHistory: (history = {}) => {
      Cache.set(HISTORY, history, 0);
    },
    getHistory: () => {
      const history = Cache.get(HISTORY, {});
      return history;
    },
    clearHistory: () => {
      Cache.remove(HISTORY);
    },
    setState: (state = {}) => {
      Cache.set(STATE, state, 0);
    },
    getState: () => {
      const state = Cache.get(STATE, {});
      return state;
    },
    clearState: () => {
      Cache.remove(STATE);
    },
    setBackParameter: (param = {}) => {
      Cache.set(PARAMETER, param, 0);
    },
    getBackParameter: () => {
      const param = Cache.get(PARAMETER, {});
      return param;
    },
    clearBackParameter: () => {
      Cache.remove(HISTORY);
    },
  };

  static history;

  static clearAll() {
    BackHelper.cache.clearHistory();
    BackHelper.cache.clearState();
    BackHelper.cache.clearBackParameter();
  }

  static listen(history) {
    if (history && typeof history.listen === "function") {
      this.history = history;
      const value = { step: -1, history: {}, entry: "" };
      BackHelper.cache.setHistory(value);
      history.listen(BackHelper.handleLocationChange);
    }
  }

  static setEntry(tag, state) {
    BackHelper.setAnchor(tag);
    const backToInfo = BackHelper.cache.getHistory();
    const history = {
      ...backToInfo,
      entry: tag,
    };
    BackHelper.cache.setHistory(history);
    if (state) {
      BackHelper.setState(state);
    }
  }

  static getEntry() {
    const backToInfo = BackHelper.cache.getHistory();
    return backToInfo.entry;
  }

  static setAnchor(tag, state) {
    const backToInfo = BackHelper.cache.getHistory();
    const { pathname } = this.history.location;
    const history = {
      ...backToInfo,
      history: {
        ...backToInfo.history,
        [tag]: { stack: [pathname], length: 1 },
      },
    };
    BackHelper.cache.setHistory(history);
    if (state) {
      BackHelper.setState(state);
    }
  }

  static backToEntry(param) {
    BackHelper.setBackParameter(param);
    const backToInfo = BackHelper.cache.getHistory();
    const { entry } = backToInfo;
    if (entry) {
      BackHelper.handleBack(entry);
      return;
    }
    // Should back to main page
  }

  static backToTarget(tag, param) {
    BackHelper.setBackParameter(param);
    BackHelper.handleBack(tag);
  }

  static handleLocationChange(location, action) {
    const backToInfo = BackHelper.cache.getHistory();
    if (Object.keys(backToInfo.history).length > 0) {
      const { pathname } = location;
      let info;
      switch (action) {
        case "PUSH":
          info = BackHelper.handlePush(pathname);
          break;
        case "POP":
          info = BackHelper.handlePop();
          break;
        case "REPLACE":
          info = BackHelper.handleReplace(pathname);
          break;
        default:
          info = backToInfo;
          break;
      }
      BackHelper.cache.setHistory(info);
    }
  }

  static handleBack(tag) {
    const backToInfo = BackHelper.cache.getHistory();
    if (tag in backToInfo.history) {
      const history = backToInfo.history[tag];
      const step = 1 - history.length;
      const nextHistory = {
        ...backToInfo,
        step,
      };
      BackHelper.cache.setHistory(nextHistory);
      this.history.go(step);
    }
  }

  static handlePush(pathname) {
    const backToInfo = BackHelper.cache.getHistory();
    const history = Object.keys(backToInfo.history).reduce((prev, current) => {
      const currentHistory = backToInfo.history[current];
      const { stack } = currentHistory;
      const nextHistory = {
        stack: [...stack, pathname],
        length: stack.length + 1,
      };
      return {
        ...prev,
        [current]: nextHistory,
      };
    }, {});
    return {
      ...backToInfo,
      history,
    };
  }

  static handlePop() {
    const backToInfo = BackHelper.cache.getHistory();
    const { step } = backToInfo;
    const history = Object.keys(backToInfo.history).reduce((prev, current) => {
      const currentHistory = backToInfo.history[current];
      const { stack } = currentHistory;
      const nextStack = stack.slice(0, stack.length + step);
      const nextLength = stack.length + step;
      if (nextLength === 0) {
        return prev;
      }
      const nextHistory = {
        stack: nextStack,
        length: nextLength,
      };
      return {
        ...prev,
        [current]: nextHistory,
      };
    }, {});
    return {
      ...backToInfo,
      step: -1,
      history,
    };
  }

  static handleReplace(pathname) {
    const backToInfo = BackHelper.cache.getHistory();
    const history = Object.keys(backToInfo.history).reduce((prev, current) => {
      const currentHistory = backToInfo.history[current];
      const { stack } = currentHistory;
      const nextHistory = {
        stack: [...stack.slice(0, stack.length - 1), pathname],
        length: stack.length,
      };
      return {
        ...prev,
        [current]: nextHistory,
      };
    }, {});
    return {
      ...backToInfo,
      history,
    };
  }

  static clearHistory() {
    BackHelper.cache.clearHistory();
  }

  static setState(state = {}) {
    const hash = sha256(this.history.location.pathname);
    const currentState = BackHelper.cache.getState();
    const nextState = { ...currentState, [hash]: state };
    BackHelper.cache.setState(nextState);
  }

  static getState() {
    const hash = sha256(this.history.location.pathname);
    const currentState = BackHelper.cache.getState();
    const hashState = currentState[hash] || {};
    return hashState;
  }

  static clearState() {
    BackHelper.cache.clearState();
  }

  static setBackParameter(param = {}) {
    BackHelper.cache.setBackParameter(param);
  }

  static getBackParameter() {
    const parm = BackHelper.cache.getBackParameter();
    BackHelper.cache.clearBackParameter();
    return parm;
  }

  static clearBackParameter() {
    BackHelper.cache.clearBackParameter();
  }
}
