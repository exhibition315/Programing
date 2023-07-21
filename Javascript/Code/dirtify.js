const handler = {
  isDirty: false,
  dirtyFields: {},
  get(target, property) {
    if (property === "isDirty") {
      return this.isDirty;
    }
    if (property === "dirtyFields") {
      return this.dirtyFields;
    }
    if (typeof target[property] === "object" && target[property] !== null) {
      return new Proxy(target[property], handler);
    }
    return target[property];
  },
  set(target, property, value) {
    if (property === "isDirty") {
      return false;
    }
    if (property === "dirtyFields") {
      return false;
    }
    this.isDirty = true;
    this.dirtyFields = {
      ...this.dirtyFields,
      [property]: true,
    };
    target[property] = value;
    return true;
  },
};

const dirtify = (obj) => new Proxy(obj, handler);

const obj = dirtify({ a: 1, b: { c: 2 } });
obj.a = 3;
// obj.isDirty change to true