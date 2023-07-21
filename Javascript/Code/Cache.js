export default class Cache {
  static config = {
    ttl: 600,
    cleanup: 3600,
  };

  static data = {};

  constructor(config = {}) {
    Cache.config = {
      ...Cache.config,
      ...config,
    };

    setInterval(Cache.cleanup, Cache.config.cleanup * 1000);
  }

  static create(config) {
    return new Cache(config);
  }

  static set(key, value, expires = this.config.ttl) {
    this.data[key] = {
      expires: expires === 0 ? 0 : Date.now() + expires * 1000,
      value,
    };
  }

  static get(key, defaultValue = null) {
    if (!this.has(key)) {
      return defaultValue;
    }
    return this.data[key].value;
  }

  static has(key) {
    const data = this.data?.[key];
    return !!(data && !this.expired(data.expires));
  }

  static remove(key) {
    delete this.data[key];
  }

  static removeAll() {
    this.data = {};
  }

  static expired(time) {
    if (time === 0) return false;

    return time < Date.now();
  }

  static cleanup() {
    for (const [key, value] of Object.entries(Cache.data)) {
      if (Cache.expired(value.expires)) {
        Cache.remove(key);
      }
    }
  }
}
