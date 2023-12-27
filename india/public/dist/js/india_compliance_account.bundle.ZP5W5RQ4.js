(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", { value: mod, enumerable: true }) : target2, mod));

  // node_modules/vuex/dist/vuex.common.js
  var require_vuex_common = __commonJS({
    "node_modules/vuex/dist/vuex.common.js"(exports, module) {
      "use strict";
      function applyMixin(Vue3) {
        var version = Number(Vue3.version.split(".")[0]);
        if (version >= 2) {
          Vue3.mixin({ beforeCreate: vuexInit });
        } else {
          var _init = Vue3.prototype._init;
          Vue3.prototype._init = function(options) {
            if (options === void 0)
              options = {};
            options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
            _init.call(this, options);
          };
        }
        function vuexInit() {
          var options = this.$options;
          if (options.store) {
            this.$store = typeof options.store === "function" ? options.store() : options.store;
          } else if (options.parent && options.parent.$store) {
            this.$store = options.parent.$store;
          }
        }
      }
      var target2 = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
      var devtoolHook = target2.__VUE_DEVTOOLS_GLOBAL_HOOK__;
      function devtoolPlugin(store) {
        if (!devtoolHook) {
          return;
        }
        store._devtoolHook = devtoolHook;
        devtoolHook.emit("vuex:init", store);
        devtoolHook.on("vuex:travel-to-state", function(targetState) {
          store.replaceState(targetState);
        });
        store.subscribe(function(mutation, state) {
          devtoolHook.emit("vuex:mutation", mutation, state);
        }, { prepend: true });
        store.subscribeAction(function(action, state) {
          devtoolHook.emit("vuex:action", action, state);
        }, { prepend: true });
      }
      function find(list, f) {
        return list.filter(f)[0];
      }
      function deepCopy(obj, cache) {
        if (cache === void 0)
          cache = [];
        if (obj === null || typeof obj !== "object") {
          return obj;
        }
        var hit = find(cache, function(c) {
          return c.original === obj;
        });
        if (hit) {
          return hit.copy;
        }
        var copy = Array.isArray(obj) ? [] : {};
        cache.push({
          original: obj,
          copy
        });
        Object.keys(obj).forEach(function(key) {
          copy[key] = deepCopy(obj[key], cache);
        });
        return copy;
      }
      function forEachValue(obj, fn) {
        Object.keys(obj).forEach(function(key) {
          return fn(obj[key], key);
        });
      }
      function isObject2(obj) {
        return obj !== null && typeof obj === "object";
      }
      function isPromise2(val) {
        return val && typeof val.then === "function";
      }
      function assert2(condition, msg) {
        if (!condition) {
          throw new Error("[vuex] " + msg);
        }
      }
      function partial(fn, arg) {
        return function() {
          return fn(arg);
        };
      }
      var Module = function Module2(rawModule, runtime) {
        this.runtime = runtime;
        this._children = /* @__PURE__ */ Object.create(null);
        this._rawModule = rawModule;
        var rawState = rawModule.state;
        this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
      };
      var prototypeAccessors3 = { namespaced: { configurable: true } };
      prototypeAccessors3.namespaced.get = function() {
        return !!this._rawModule.namespaced;
      };
      Module.prototype.addChild = function addChild(key, module2) {
        this._children[key] = module2;
      };
      Module.prototype.removeChild = function removeChild2(key) {
        delete this._children[key];
      };
      Module.prototype.getChild = function getChild(key) {
        return this._children[key];
      };
      Module.prototype.hasChild = function hasChild(key) {
        return key in this._children;
      };
      Module.prototype.update = function update5(rawModule) {
        this._rawModule.namespaced = rawModule.namespaced;
        if (rawModule.actions) {
          this._rawModule.actions = rawModule.actions;
        }
        if (rawModule.mutations) {
          this._rawModule.mutations = rawModule.mutations;
        }
        if (rawModule.getters) {
          this._rawModule.getters = rawModule.getters;
        }
      };
      Module.prototype.forEachChild = function forEachChild(fn) {
        forEachValue(this._children, fn);
      };
      Module.prototype.forEachGetter = function forEachGetter(fn) {
        if (this._rawModule.getters) {
          forEachValue(this._rawModule.getters, fn);
        }
      };
      Module.prototype.forEachAction = function forEachAction(fn) {
        if (this._rawModule.actions) {
          forEachValue(this._rawModule.actions, fn);
        }
      };
      Module.prototype.forEachMutation = function forEachMutation(fn) {
        if (this._rawModule.mutations) {
          forEachValue(this._rawModule.mutations, fn);
        }
      };
      Object.defineProperties(Module.prototype, prototypeAccessors3);
      var ModuleCollection = function ModuleCollection2(rawRootModule) {
        this.register([], rawRootModule, false);
      };
      ModuleCollection.prototype.get = function get3(path) {
        return path.reduce(function(module2, key) {
          return module2.getChild(key);
        }, this.root);
      };
      ModuleCollection.prototype.getNamespace = function getNamespace(path) {
        var module2 = this.root;
        return path.reduce(function(namespace, key) {
          module2 = module2.getChild(key);
          return namespace + (module2.namespaced ? key + "/" : "");
        }, "");
      };
      ModuleCollection.prototype.update = function update$1(rawRootModule) {
        update4([], this.root, rawRootModule);
      };
      ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
        var this$1 = this;
        if (runtime === void 0)
          runtime = true;
        if (true) {
          assertRawModule(path, rawModule);
        }
        var newModule = new Module(rawModule, runtime);
        if (path.length === 0) {
          this.root = newModule;
        } else {
          var parent = this.get(path.slice(0, -1));
          parent.addChild(path[path.length - 1], newModule);
        }
        if (rawModule.modules) {
          forEachValue(rawModule.modules, function(rawChildModule, key) {
            this$1.register(path.concat(key), rawChildModule, runtime);
          });
        }
      };
      ModuleCollection.prototype.unregister = function unregister(path) {
        var parent = this.get(path.slice(0, -1));
        var key = path[path.length - 1];
        var child = parent.getChild(key);
        if (!child) {
          if (true) {
            console.warn("[vuex] trying to unregister module '" + key + "', which is not registered");
          }
          return;
        }
        if (!child.runtime) {
          return;
        }
        parent.removeChild(key);
      };
      ModuleCollection.prototype.isRegistered = function isRegistered(path) {
        var parent = this.get(path.slice(0, -1));
        var key = path[path.length - 1];
        if (parent) {
          return parent.hasChild(key);
        }
        return false;
      };
      function update4(path, targetModule, newModule) {
        if (true) {
          assertRawModule(path, newModule);
        }
        targetModule.update(newModule);
        if (newModule.modules) {
          for (var key in newModule.modules) {
            if (!targetModule.getChild(key)) {
              if (true) {
                console.warn("[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed");
              }
              return;
            }
            update4(path.concat(key), targetModule.getChild(key), newModule.modules[key]);
          }
        }
      }
      var functionAssert = {
        assert: function(value) {
          return typeof value === "function";
        },
        expected: "function"
      };
      var objectAssert = {
        assert: function(value) {
          return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
        },
        expected: 'function or object with "handler" function'
      };
      var assertTypes = {
        getters: functionAssert,
        mutations: functionAssert,
        actions: objectAssert
      };
      function assertRawModule(path, rawModule) {
        Object.keys(assertTypes).forEach(function(key) {
          if (!rawModule[key]) {
            return;
          }
          var assertOptions = assertTypes[key];
          forEachValue(rawModule[key], function(value, type) {
            assert2(assertOptions.assert(value), makeAssertionMessage(path, key, type, value, assertOptions.expected));
          });
        });
      }
      function makeAssertionMessage(path, key, type, value, expected) {
        var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
        if (path.length > 0) {
          buf += ' in module "' + path.join(".") + '"';
        }
        buf += " is " + JSON.stringify(value) + ".";
        return buf;
      }
      var Vue2;
      var Store = function Store2(options) {
        var this$1 = this;
        if (options === void 0)
          options = {};
        if (!Vue2 && typeof window !== "undefined" && window.Vue) {
          install2(window.Vue);
        }
        if (true) {
          assert2(Vue2, "must call Vue.use(Vuex) before creating a store instance.");
          assert2(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
          assert2(this instanceof Store2, "store must be called with the new operator.");
        }
        var plugins = options.plugins;
        if (plugins === void 0)
          plugins = [];
        var strict = options.strict;
        if (strict === void 0)
          strict = false;
        this._committing = false;
        this._actions = /* @__PURE__ */ Object.create(null);
        this._actionSubscribers = [];
        this._mutations = /* @__PURE__ */ Object.create(null);
        this._wrappedGetters = /* @__PURE__ */ Object.create(null);
        this._modules = new ModuleCollection(options);
        this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
        this._subscribers = [];
        this._watcherVM = new Vue2();
        this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
        var store = this;
        var ref2 = this;
        var dispatch = ref2.dispatch;
        var commit = ref2.commit;
        this.dispatch = function boundDispatch(type, payload) {
          return dispatch.call(store, type, payload);
        };
        this.commit = function boundCommit(type, payload, options2) {
          return commit.call(store, type, payload, options2);
        };
        this.strict = strict;
        var state = this._modules.root.state;
        installModule(this, state, [], this._modules.root);
        resetStoreVM(this, state);
        plugins.forEach(function(plugin) {
          return plugin(this$1);
        });
        var useDevtools = options.devtools !== void 0 ? options.devtools : Vue2.config.devtools;
        if (useDevtools) {
          devtoolPlugin(this);
        }
      };
      var prototypeAccessors$1 = { state: { configurable: true } };
      prototypeAccessors$1.state.get = function() {
        return this._vm._data.$$state;
      };
      prototypeAccessors$1.state.set = function(v) {
        if (true) {
          assert2(false, "use store.replaceState() to explicit replace store state.");
        }
      };
      Store.prototype.commit = function commit(_type, _payload, _options) {
        var this$1 = this;
        var ref2 = unifyObjectStyle(_type, _payload, _options);
        var type = ref2.type;
        var payload = ref2.payload;
        var options = ref2.options;
        var mutation = { type, payload };
        var entry = this._mutations[type];
        if (!entry) {
          if (true) {
            console.error("[vuex] unknown mutation type: " + type);
          }
          return;
        }
        this._withCommit(function() {
          entry.forEach(function commitIterator(handler) {
            handler(payload);
          });
        });
        this._subscribers.slice().forEach(function(sub) {
          return sub(mutation, this$1.state);
        });
        if (options && options.silent) {
          console.warn("[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools");
        }
      };
      Store.prototype.dispatch = function dispatch(_type, _payload) {
        var this$1 = this;
        var ref2 = unifyObjectStyle(_type, _payload);
        var type = ref2.type;
        var payload = ref2.payload;
        var action = { type, payload };
        var entry = this._actions[type];
        if (!entry) {
          if (true) {
            console.error("[vuex] unknown action type: " + type);
          }
          return;
        }
        try {
          this._actionSubscribers.slice().filter(function(sub) {
            return sub.before;
          }).forEach(function(sub) {
            return sub.before(action, this$1.state);
          });
        } catch (e) {
          if (true) {
            console.warn("[vuex] error in before action subscribers: ");
            console.error(e);
          }
        }
        var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
          return handler(payload);
        })) : entry[0](payload);
        return new Promise(function(resolve2, reject) {
          result.then(function(res) {
            try {
              this$1._actionSubscribers.filter(function(sub) {
                return sub.after;
              }).forEach(function(sub) {
                return sub.after(action, this$1.state);
              });
            } catch (e) {
              if (true) {
                console.warn("[vuex] error in after action subscribers: ");
                console.error(e);
              }
            }
            resolve2(res);
          }, function(error) {
            try {
              this$1._actionSubscribers.filter(function(sub) {
                return sub.error;
              }).forEach(function(sub) {
                return sub.error(action, this$1.state, error);
              });
            } catch (e) {
              if (true) {
                console.warn("[vuex] error in error action subscribers: ");
                console.error(e);
              }
            }
            reject(error);
          });
        });
      };
      Store.prototype.subscribe = function subscribe(fn, options) {
        return genericSubscribe(fn, this._subscribers, options);
      };
      Store.prototype.subscribeAction = function subscribeAction(fn, options) {
        var subs = typeof fn === "function" ? { before: fn } : fn;
        return genericSubscribe(subs, this._actionSubscribers, options);
      };
      Store.prototype.watch = function watch(getter, cb, options) {
        var this$1 = this;
        if (true) {
          assert2(typeof getter === "function", "store.watch only accepts a function.");
        }
        return this._watcherVM.$watch(function() {
          return getter(this$1.state, this$1.getters);
        }, cb, options);
      };
      Store.prototype.replaceState = function replaceState2(state) {
        var this$1 = this;
        this._withCommit(function() {
          this$1._vm._data.$$state = state;
        });
      };
      Store.prototype.registerModule = function registerModule(path, rawModule, options) {
        if (options === void 0)
          options = {};
        if (typeof path === "string") {
          path = [path];
        }
        if (true) {
          assert2(Array.isArray(path), "module path must be a string or an Array.");
          assert2(path.length > 0, "cannot register the root module by using registerModule.");
        }
        this._modules.register(path, rawModule);
        installModule(this, this.state, path, this._modules.get(path), options.preserveState);
        resetStoreVM(this, this.state);
      };
      Store.prototype.unregisterModule = function unregisterModule(path) {
        var this$1 = this;
        if (typeof path === "string") {
          path = [path];
        }
        if (true) {
          assert2(Array.isArray(path), "module path must be a string or an Array.");
        }
        this._modules.unregister(path);
        this._withCommit(function() {
          var parentState = getNestedState(this$1.state, path.slice(0, -1));
          Vue2.delete(parentState, path[path.length - 1]);
        });
        resetStore(this);
      };
      Store.prototype.hasModule = function hasModule(path) {
        if (typeof path === "string") {
          path = [path];
        }
        if (true) {
          assert2(Array.isArray(path), "module path must be a string or an Array.");
        }
        return this._modules.isRegistered(path);
      };
      Store.prototype.hotUpdate = function hotUpdate(newOptions) {
        this._modules.update(newOptions);
        resetStore(this, true);
      };
      Store.prototype._withCommit = function _withCommit(fn) {
        var committing = this._committing;
        this._committing = true;
        fn();
        this._committing = committing;
      };
      Object.defineProperties(Store.prototype, prototypeAccessors$1);
      function genericSubscribe(fn, subs, options) {
        if (subs.indexOf(fn) < 0) {
          options && options.prepend ? subs.unshift(fn) : subs.push(fn);
        }
        return function() {
          var i = subs.indexOf(fn);
          if (i > -1) {
            subs.splice(i, 1);
          }
        };
      }
      function resetStore(store, hot) {
        store._actions = /* @__PURE__ */ Object.create(null);
        store._mutations = /* @__PURE__ */ Object.create(null);
        store._wrappedGetters = /* @__PURE__ */ Object.create(null);
        store._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
        var state = store.state;
        installModule(store, state, [], store._modules.root, true);
        resetStoreVM(store, state, hot);
      }
      function resetStoreVM(store, state, hot) {
        var oldVm = store._vm;
        store.getters = {};
        store._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
        var wrappedGetters = store._wrappedGetters;
        var computed = {};
        forEachValue(wrappedGetters, function(fn, key) {
          computed[key] = partial(fn, store);
          Object.defineProperty(store.getters, key, {
            get: function() {
              return store._vm[key];
            },
            enumerable: true
          });
        });
        var silent = Vue2.config.silent;
        Vue2.config.silent = true;
        store._vm = new Vue2({
          data: {
            $$state: state
          },
          computed
        });
        Vue2.config.silent = silent;
        if (store.strict) {
          enableStrictMode(store);
        }
        if (oldVm) {
          if (hot) {
            store._withCommit(function() {
              oldVm._data.$$state = null;
            });
          }
          Vue2.nextTick(function() {
            return oldVm.$destroy();
          });
        }
      }
      function installModule(store, rootState, path, module2, hot) {
        var isRoot = !path.length;
        var namespace = store._modules.getNamespace(path);
        if (module2.namespaced) {
          if (store._modulesNamespaceMap[namespace] && true) {
            console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
          }
          store._modulesNamespaceMap[namespace] = module2;
        }
        if (!isRoot && !hot) {
          var parentState = getNestedState(rootState, path.slice(0, -1));
          var moduleName = path[path.length - 1];
          store._withCommit(function() {
            if (true) {
              if (moduleName in parentState) {
                console.warn('[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"');
              }
            }
            Vue2.set(parentState, moduleName, module2.state);
          });
        }
        var local = module2.context = makeLocalContext(store, namespace, path);
        module2.forEachMutation(function(mutation, key) {
          var namespacedType = namespace + key;
          registerMutation(store, namespacedType, mutation, local);
        });
        module2.forEachAction(function(action, key) {
          var type = action.root ? key : namespace + key;
          var handler = action.handler || action;
          registerAction(store, type, handler, local);
        });
        module2.forEachGetter(function(getter, key) {
          var namespacedType = namespace + key;
          registerGetter(store, namespacedType, getter, local);
        });
        module2.forEachChild(function(child, key) {
          installModule(store, rootState, path.concat(key), child, hot);
        });
      }
      function makeLocalContext(store, namespace, path) {
        var noNamespace = namespace === "";
        var local = {
          dispatch: noNamespace ? store.dispatch : function(_type, _payload, _options) {
            var args = unifyObjectStyle(_type, _payload, _options);
            var payload = args.payload;
            var options = args.options;
            var type = args.type;
            if (!options || !options.root) {
              type = namespace + type;
              if (!store._actions[type]) {
                console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
                return;
              }
            }
            return store.dispatch(type, payload);
          },
          commit: noNamespace ? store.commit : function(_type, _payload, _options) {
            var args = unifyObjectStyle(_type, _payload, _options);
            var payload = args.payload;
            var options = args.options;
            var type = args.type;
            if (!options || !options.root) {
              type = namespace + type;
              if (!store._mutations[type]) {
                console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
                return;
              }
            }
            store.commit(type, payload, options);
          }
        };
        Object.defineProperties(local, {
          getters: {
            get: noNamespace ? function() {
              return store.getters;
            } : function() {
              return makeLocalGetters(store, namespace);
            }
          },
          state: {
            get: function() {
              return getNestedState(store.state, path);
            }
          }
        });
        return local;
      }
      function makeLocalGetters(store, namespace) {
        if (!store._makeLocalGettersCache[namespace]) {
          var gettersProxy = {};
          var splitPos = namespace.length;
          Object.keys(store.getters).forEach(function(type) {
            if (type.slice(0, splitPos) !== namespace) {
              return;
            }
            var localType = type.slice(splitPos);
            Object.defineProperty(gettersProxy, localType, {
              get: function() {
                return store.getters[type];
              },
              enumerable: true
            });
          });
          store._makeLocalGettersCache[namespace] = gettersProxy;
        }
        return store._makeLocalGettersCache[namespace];
      }
      function registerMutation(store, type, handler, local) {
        var entry = store._mutations[type] || (store._mutations[type] = []);
        entry.push(function wrappedMutationHandler(payload) {
          handler.call(store, local.state, payload);
        });
      }
      function registerAction(store, type, handler, local) {
        var entry = store._actions[type] || (store._actions[type] = []);
        entry.push(function wrappedActionHandler(payload) {
          var res = handler.call(store, {
            dispatch: local.dispatch,
            commit: local.commit,
            getters: local.getters,
            state: local.state,
            rootGetters: store.getters,
            rootState: store.state
          }, payload);
          if (!isPromise2(res)) {
            res = Promise.resolve(res);
          }
          if (store._devtoolHook) {
            return res.catch(function(err) {
              store._devtoolHook.emit("vuex:error", err);
              throw err;
            });
          } else {
            return res;
          }
        });
      }
      function registerGetter(store, type, rawGetter, local) {
        if (store._wrappedGetters[type]) {
          if (true) {
            console.error("[vuex] duplicate getter key: " + type);
          }
          return;
        }
        store._wrappedGetters[type] = function wrappedGetter(store2) {
          return rawGetter(local.state, local.getters, store2.state, store2.getters);
        };
      }
      function enableStrictMode(store) {
        store._vm.$watch(function() {
          return this._data.$$state;
        }, function() {
          if (true) {
            assert2(store._committing, "do not mutate vuex store state outside mutation handlers.");
          }
        }, { deep: true, sync: true });
      }
      function getNestedState(state, path) {
        return path.reduce(function(state2, key) {
          return state2[key];
        }, state);
      }
      function unifyObjectStyle(type, payload, options) {
        if (isObject2(type) && type.type) {
          options = payload;
          payload = type;
          type = type.type;
        }
        if (true) {
          assert2(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
        }
        return { type, payload, options };
      }
      function install2(_Vue2) {
        if (Vue2 && _Vue2 === Vue2) {
          if (true) {
            console.error("[vuex] already installed. Vue.use(Vuex) should be called only once.");
          }
          return;
        }
        Vue2 = _Vue2;
        applyMixin(Vue2);
      }
      var mapState = normalizeNamespace(function(namespace, states) {
        var res = {};
        if (!isValidMap(states)) {
          console.error("[vuex] mapState: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(states).forEach(function(ref2) {
          var key = ref2.key;
          var val = ref2.val;
          res[key] = function mappedState() {
            var state = this.$store.state;
            var getters = this.$store.getters;
            if (namespace) {
              var module2 = getModuleByNamespace(this.$store, "mapState", namespace);
              if (!module2) {
                return;
              }
              state = module2.context.state;
              getters = module2.context.getters;
            }
            return typeof val === "function" ? val.call(this, state, getters) : state[val];
          };
          res[key].vuex = true;
        });
        return res;
      });
      var mapMutations = normalizeNamespace(function(namespace, mutations) {
        var res = {};
        if (!isValidMap(mutations)) {
          console.error("[vuex] mapMutations: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(mutations).forEach(function(ref2) {
          var key = ref2.key;
          var val = ref2.val;
          res[key] = function mappedMutation() {
            var args = [], len = arguments.length;
            while (len--)
              args[len] = arguments[len];
            var commit = this.$store.commit;
            if (namespace) {
              var module2 = getModuleByNamespace(this.$store, "mapMutations", namespace);
              if (!module2) {
                return;
              }
              commit = module2.context.commit;
            }
            return typeof val === "function" ? val.apply(this, [commit].concat(args)) : commit.apply(this.$store, [val].concat(args));
          };
        });
        return res;
      });
      var mapGetters = normalizeNamespace(function(namespace, getters) {
        var res = {};
        if (!isValidMap(getters)) {
          console.error("[vuex] mapGetters: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(getters).forEach(function(ref2) {
          var key = ref2.key;
          var val = ref2.val;
          val = namespace + val;
          res[key] = function mappedGetter() {
            if (namespace && !getModuleByNamespace(this.$store, "mapGetters", namespace)) {
              return;
            }
            if (!(val in this.$store.getters)) {
              console.error("[vuex] unknown getter: " + val);
              return;
            }
            return this.$store.getters[val];
          };
          res[key].vuex = true;
        });
        return res;
      });
      var mapActions = normalizeNamespace(function(namespace, actions) {
        var res = {};
        if (!isValidMap(actions)) {
          console.error("[vuex] mapActions: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(actions).forEach(function(ref2) {
          var key = ref2.key;
          var val = ref2.val;
          res[key] = function mappedAction() {
            var args = [], len = arguments.length;
            while (len--)
              args[len] = arguments[len];
            var dispatch = this.$store.dispatch;
            if (namespace) {
              var module2 = getModuleByNamespace(this.$store, "mapActions", namespace);
              if (!module2) {
                return;
              }
              dispatch = module2.context.dispatch;
            }
            return typeof val === "function" ? val.apply(this, [dispatch].concat(args)) : dispatch.apply(this.$store, [val].concat(args));
          };
        });
        return res;
      });
      var createNamespacedHelpers = function(namespace) {
        return {
          mapState: mapState.bind(null, namespace),
          mapGetters: mapGetters.bind(null, namespace),
          mapMutations: mapMutations.bind(null, namespace),
          mapActions: mapActions.bind(null, namespace)
        };
      };
      function normalizeMap(map) {
        if (!isValidMap(map)) {
          return [];
        }
        return Array.isArray(map) ? map.map(function(key) {
          return { key, val: key };
        }) : Object.keys(map).map(function(key) {
          return { key, val: map[key] };
        });
      }
      function isValidMap(map) {
        return Array.isArray(map) || isObject2(map);
      }
      function normalizeNamespace(fn) {
        return function(namespace, map) {
          if (typeof namespace !== "string") {
            map = namespace;
            namespace = "";
          } else if (namespace.charAt(namespace.length - 1) !== "/") {
            namespace += "/";
          }
          return fn(namespace, map);
        };
      }
      function getModuleByNamespace(store, helper, namespace) {
        var module2 = store._modulesNamespaceMap[namespace];
        if (!module2) {
          console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
        }
        return module2;
      }
      function createLogger(ref2) {
        if (ref2 === void 0)
          ref2 = {};
        var collapsed = ref2.collapsed;
        if (collapsed === void 0)
          collapsed = true;
        var filter = ref2.filter;
        if (filter === void 0)
          filter = function(mutation, stateBefore, stateAfter) {
            return true;
          };
        var transformer = ref2.transformer;
        if (transformer === void 0)
          transformer = function(state) {
            return state;
          };
        var mutationTransformer = ref2.mutationTransformer;
        if (mutationTransformer === void 0)
          mutationTransformer = function(mut) {
            return mut;
          };
        var actionFilter = ref2.actionFilter;
        if (actionFilter === void 0)
          actionFilter = function(action, state) {
            return true;
          };
        var actionTransformer = ref2.actionTransformer;
        if (actionTransformer === void 0)
          actionTransformer = function(act) {
            return act;
          };
        var logMutations = ref2.logMutations;
        if (logMutations === void 0)
          logMutations = true;
        var logActions = ref2.logActions;
        if (logActions === void 0)
          logActions = true;
        var logger = ref2.logger;
        if (logger === void 0)
          logger = console;
        return function(store) {
          var prevState = deepCopy(store.state);
          if (typeof logger === "undefined") {
            return;
          }
          if (logMutations) {
            store.subscribe(function(mutation, state) {
              var nextState = deepCopy(state);
              if (filter(mutation, prevState, nextState)) {
                var formattedTime = getFormattedTime();
                var formattedMutation = mutationTransformer(mutation);
                var message = "mutation " + mutation.type + formattedTime;
                startMessage(logger, message, collapsed);
                logger.log("%c prev state", "color: #9E9E9E; font-weight: bold", transformer(prevState));
                logger.log("%c mutation", "color: #03A9F4; font-weight: bold", formattedMutation);
                logger.log("%c next state", "color: #4CAF50; font-weight: bold", transformer(nextState));
                endMessage(logger);
              }
              prevState = nextState;
            });
          }
          if (logActions) {
            store.subscribeAction(function(action, state) {
              if (actionFilter(action, state)) {
                var formattedTime = getFormattedTime();
                var formattedAction = actionTransformer(action);
                var message = "action " + action.type + formattedTime;
                startMessage(logger, message, collapsed);
                logger.log("%c action", "color: #03A9F4; font-weight: bold", formattedAction);
                endMessage(logger);
              }
            });
          }
        };
      }
      function startMessage(logger, message, collapsed) {
        var startMessage2 = collapsed ? logger.groupCollapsed : logger.group;
        try {
          startMessage2.call(logger, message);
        } catch (e) {
          logger.log(message);
        }
      }
      function endMessage(logger) {
        try {
          logger.groupEnd();
        } catch (e) {
          logger.log("\u2014\u2014 log end \u2014\u2014");
        }
      }
      function getFormattedTime() {
        var time = new Date();
        return " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
      }
      function repeat(str, times) {
        return new Array(times + 1).join(str);
      }
      function pad(num, maxLength) {
        return repeat("0", maxLength - num.toString().length) + num;
      }
      var index_cjs = {
        Store,
        install: install2,
        version: "3.6.2",
        mapState,
        mapMutations,
        mapGetters,
        mapActions,
        createNamespacedHelpers,
        createLogger
      };
      module.exports = index_cjs;
    }
  });

  // node_modules/vue/dist/vue.runtime.esm.js
  var emptyObject = Object.freeze({});
  function isUndef(v) {
    return v === void 0 || v === null;
  }
  function isDef(v) {
    return v !== void 0 && v !== null;
  }
  function isTrue(v) {
    return v === true;
  }
  function isFalse(v) {
    return v === false;
  }
  function isPrimitive(value) {
    return typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "boolean";
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  var _toString = Object.prototype.toString;
  function toRawType(value) {
    return _toString.call(value).slice(8, -1);
  }
  function isPlainObject(obj) {
    return _toString.call(obj) === "[object Object]";
  }
  function isRegExp(v) {
    return _toString.call(v) === "[object RegExp]";
  }
  function isValidArrayIndex(val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
  }
  function isPromise(val) {
    return isDef(val) && typeof val.then === "function" && typeof val.catch === "function";
  }
  function toString(val) {
    return val == null ? "" : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
  }
  function toNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
  }
  function makeMap(str, expectsLowerCase) {
    var map = /* @__PURE__ */ Object.create(null);
    var list = str.split(",");
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? function(val) {
      return map[val.toLowerCase()];
    } : function(val) {
      return map[val];
    };
  }
  var isBuiltInTag = makeMap("slot,component", true);
  var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
  function remove(arr, item) {
    if (arr.length) {
      var index2 = arr.indexOf(item);
      if (index2 > -1) {
        return arr.splice(index2, 1);
      }
    }
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  function cached(fn) {
    var cache = /* @__PURE__ */ Object.create(null);
    return function cachedFn(str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  }
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function(str) {
    return str.replace(camelizeRE, function(_, c) {
      return c ? c.toUpperCase() : "";
    });
  });
  var capitalize = cached(function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function(str) {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
  });
  function polyfillBind(fn, ctx) {
    function boundFn(a) {
      var l = arguments.length;
      return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    }
    boundFn._length = fn.length;
    return boundFn;
  }
  function nativeBind(fn, ctx) {
    return fn.bind(ctx);
  }
  var bind = Function.prototype.bind ? nativeBind : polyfillBind;
  function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret;
  }
  function extend(to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to;
  }
  function toObject(arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res;
  }
  function noop(a, b, c) {
  }
  var no = function(a, b, c) {
    return false;
  };
  var identity = function(_) {
    return _;
  };
  function looseEqual(a, b) {
    if (a === b) {
      return true;
    }
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function(e, i) {
            return looseEqual(e, b[i]);
          });
        } else if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime();
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function(key) {
            return looseEqual(a[key], b[key]);
          });
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b);
    } else {
      return false;
    }
  }
  function looseIndexOf(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val)) {
        return i;
      }
    }
    return -1;
  }
  function once(fn) {
    var called = false;
    return function() {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    };
  }
  var SSR_ATTR = "data-server-rendered";
  var ASSET_TYPES = [
    "component",
    "directive",
    "filter"
  ];
  var LIFECYCLE_HOOKS = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "beforeDestroy",
    "destroyed",
    "activated",
    "deactivated",
    "errorCaptured",
    "serverPrefetch"
  ];
  var config = {
    optionMergeStrategies: /* @__PURE__ */ Object.create(null),
    silent: false,
    productionTip: true,
    devtools: true,
    performance: false,
    errorHandler: null,
    warnHandler: null,
    ignoredElements: [],
    keyCodes: /* @__PURE__ */ Object.create(null),
    isReservedTag: no,
    isReservedAttr: no,
    isUnknownElement: no,
    getTagNamespace: noop,
    parsePlatformTagName: identity,
    mustUseProp: no,
    async: true,
    _lifecycleHooks: LIFECYCLE_HOOKS
  };
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
  function isReserved(str) {
    var c = (str + "").charCodeAt(0);
    return c === 36 || c === 95;
  }
  function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }
  var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");
  function parsePath(path) {
    if (bailRE.test(path)) {
      return;
    }
    var segments = path.split(".");
    return function(obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) {
          return;
        }
        obj = obj[segments[i]];
      }
      return obj;
    };
  }
  var hasProto = "__proto__" in {};
  var inBrowser = typeof window !== "undefined";
  var inWeex = typeof WXEnvironment !== "undefined" && !!WXEnvironment.platform;
  var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
  var isEdge = UA && UA.indexOf("edge/") > 0;
  var isAndroid = UA && UA.indexOf("android") > 0 || weexPlatform === "android";
  var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === "ios";
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
  var isPhantomJS = UA && /phantomjs/.test(UA);
  var isFF = UA && UA.match(/firefox\/(\d+)/);
  var nativeWatch = {}.watch;
  var supportsPassive = false;
  if (inBrowser) {
    try {
      opts = {};
      Object.defineProperty(opts, "passive", {
        get: function get3() {
          supportsPassive = true;
        }
      });
      window.addEventListener("test-passive", null, opts);
    } catch (e) {
    }
  }
  var opts;
  var _isServer;
  var isServerRendering = function() {
    if (_isServer === void 0) {
      if (!inBrowser && !inWeex && typeof global !== "undefined") {
        _isServer = global["process"] && global["process"].env.VUE_ENV === "server";
      } else {
        _isServer = false;
      }
    }
    return _isServer;
  };
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  function isNative(Ctor) {
    return typeof Ctor === "function" && /native code/.test(Ctor.toString());
  }
  var hasSymbol = typeof Symbol !== "undefined" && isNative(Symbol) && typeof Reflect !== "undefined" && isNative(Reflect.ownKeys);
  var _Set;
  if (typeof Set !== "undefined" && isNative(Set)) {
    _Set = Set;
  } else {
    _Set = /* @__PURE__ */ function() {
      function Set2() {
        this.set = /* @__PURE__ */ Object.create(null);
      }
      Set2.prototype.has = function has2(key) {
        return this.set[key] === true;
      };
      Set2.prototype.add = function add2(key) {
        this.set[key] = true;
      };
      Set2.prototype.clear = function clear() {
        this.set = /* @__PURE__ */ Object.create(null);
      };
      return Set2;
    }();
  }
  var warn = noop;
  var tip = noop;
  var generateComponentTrace = noop;
  var formatComponentName = noop;
  if (true) {
    hasConsole = typeof console !== "undefined";
    classifyRE = /(?:^|[-_])(\w)/g;
    classify = function(str) {
      return str.replace(classifyRE, function(c) {
        return c.toUpperCase();
      }).replace(/[-_]/g, "");
    };
    warn = function(msg, vm) {
      var trace = vm ? generateComponentTrace(vm) : "";
      if (config.warnHandler) {
        config.warnHandler.call(null, msg, vm, trace);
      } else if (hasConsole && !config.silent) {
        console.error("[Vue warn]: " + msg + trace);
      }
    };
    tip = function(msg, vm) {
      if (hasConsole && !config.silent) {
        console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ""));
      }
    };
    formatComponentName = function(vm, includeFile) {
      if (vm.$root === vm) {
        return "<Root>";
      }
      var options = typeof vm === "function" && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
      var name = options.name || options._componentTag;
      var file = options.__file;
      if (!name && file) {
        var match2 = file.match(/([^/\\]+)\.vue$/);
        name = match2 && match2[1];
      }
      return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : "");
    };
    repeat = function(str, n) {
      var res = "";
      while (n) {
        if (n % 2 === 1) {
          res += str;
        }
        if (n > 1) {
          str += str;
        }
        n >>= 1;
      }
      return res;
    };
    generateComponentTrace = function(vm) {
      if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
          if (tree.length > 0) {
            var last = tree[tree.length - 1];
            if (last.constructor === vm.constructor) {
              currentRecursiveSequence++;
              vm = vm.$parent;
              continue;
            } else if (currentRecursiveSequence > 0) {
              tree[tree.length - 1] = [last, currentRecursiveSequence];
              currentRecursiveSequence = 0;
            }
          }
          tree.push(vm);
          vm = vm.$parent;
        }
        return "\n\nfound in\n\n" + tree.map(function(vm2, i) {
          return "" + (i === 0 ? "---> " : repeat(" ", 5 + i * 2)) + (Array.isArray(vm2) ? formatComponentName(vm2[0]) + "... (" + vm2[1] + " recursive calls)" : formatComponentName(vm2));
        }).join("\n");
      } else {
        return "\n\n(found in " + formatComponentName(vm) + ")";
      }
    };
  }
  var hasConsole;
  var classifyRE;
  var classify;
  var repeat;
  var uid = 0;
  var Dep = function Dep2() {
    this.id = uid++;
    this.subs = [];
  };
  Dep.prototype.addSub = function addSub(sub) {
    this.subs.push(sub);
  };
  Dep.prototype.removeSub = function removeSub(sub) {
    remove(this.subs, sub);
  };
  Dep.prototype.depend = function depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  };
  Dep.prototype.notify = function notify() {
    var subs = this.subs.slice();
    if (!config.async) {
      subs.sort(function(a, b) {
        return a.id - b.id;
      });
    }
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  };
  Dep.target = null;
  var targetStack = [];
  function pushTarget(target2) {
    targetStack.push(target2);
    Dep.target = target2;
  }
  function popTarget() {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
  }
  var VNode = function VNode2(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = void 0;
    this.context = context;
    this.fnContext = void 0;
    this.fnOptions = void 0;
    this.fnScopeId = void 0;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = void 0;
    this.parent = void 0;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = void 0;
    this.isAsyncPlaceholder = false;
  };
  var prototypeAccessors = { child: { configurable: true } };
  prototypeAccessors.child.get = function() {
    return this.componentInstance;
  };
  Object.defineProperties(VNode.prototype, prototypeAccessors);
  var createEmptyVNode = function(text) {
    if (text === void 0)
      text = "";
    var node = new VNode();
    node.text = text;
    node.isComment = true;
    return node;
  };
  function createTextVNode(val) {
    return new VNode(void 0, void 0, void 0, String(val));
  }
  function cloneVNode(vnode) {
    var cloned = new VNode(vnode.tag, vnode.data, vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned;
  }
  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);
  var methodsToPatch = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse"
  ];
  methodsToPatch.forEach(function(method) {
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted2;
      switch (method) {
        case "push":
        case "unshift":
          inserted2 = args;
          break;
        case "splice":
          inserted2 = args.slice(2);
          break;
      }
      if (inserted2) {
        ob.observeArray(inserted2);
      }
      ob.dep.notify();
      return result;
    });
  });
  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
  var shouldObserve = true;
  function toggleObserving(value) {
    shouldObserve = value;
  }
  var Observer = function Observer2(value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, "__ob__", this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  };
  Observer.prototype.walk = function walk(obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive$$1(obj, keys[i]);
    }
  };
  Observer.prototype.observeArray = function observeArray(items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };
  function protoAugment(target2, src) {
    target2.__proto__ = src;
  }
  function copyAugment(target2, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      def(target2, key, src[key]);
    }
  }
  function observe(value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return;
    }
    var ob;
    if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
      ob = new Observer(value);
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob;
  }
  function defineReactive$$1(obj, key, val, customSetter, shallow) {
    var dep = new Dep();
    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return;
    }
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }
    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value;
      },
      set: function reactiveSetter(newVal) {
        var value = getter ? getter.call(obj) : val;
        if (newVal === value || newVal !== newVal && value !== value) {
          return;
        }
        if (customSetter) {
          customSetter();
        }
        if (getter && !setter) {
          return;
        }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify();
      }
    });
  }
  function set(target2, key, val) {
    if (isUndef(target2) || isPrimitive(target2)) {
      warn("Cannot set reactive property on undefined, null, or primitive value: " + target2);
    }
    if (Array.isArray(target2) && isValidArrayIndex(key)) {
      target2.length = Math.max(target2.length, key);
      target2.splice(key, 1, val);
      return val;
    }
    if (key in target2 && !(key in Object.prototype)) {
      target2[key] = val;
      return val;
    }
    var ob = target2.__ob__;
    if (target2._isVue || ob && ob.vmCount) {
      warn("Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.");
      return val;
    }
    if (!ob) {
      target2[key] = val;
      return val;
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val;
  }
  function del(target2, key) {
    if (isUndef(target2) || isPrimitive(target2)) {
      warn("Cannot delete reactive property on undefined, null, or primitive value: " + target2);
    }
    if (Array.isArray(target2) && isValidArrayIndex(key)) {
      target2.splice(key, 1);
      return;
    }
    var ob = target2.__ob__;
    if (target2._isVue || ob && ob.vmCount) {
      warn("Avoid deleting properties on a Vue instance or its root $data - just set it to null.");
      return;
    }
    if (!hasOwn(target2, key)) {
      return;
    }
    delete target2[key];
    if (!ob) {
      return;
    }
    ob.dep.notify();
  }
  function dependArray(value) {
    for (var e = void 0, i = 0, l = value.length; i < l; i++) {
      e = value[i];
      e && e.__ob__ && e.__ob__.dep.depend();
      if (Array.isArray(e)) {
        dependArray(e);
      }
    }
  }
  var strats = config.optionMergeStrategies;
  if (true) {
    strats.el = strats.propsData = function(parent, child, vm, key) {
      if (!vm) {
        warn('option "' + key + '" can only be used during instance creation with the `new` keyword.');
      }
      return defaultStrat(parent, child);
    };
  }
  function mergeData(to, from) {
    if (!from) {
      return to;
    }
    var key, toVal, fromVal;
    var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      if (key === "__ob__") {
        continue;
      }
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
        mergeData(toVal, fromVal);
      }
    }
    return to;
  }
  function mergeDataOrFn(parentVal, childVal, vm) {
    if (!vm) {
      if (!childVal) {
        return parentVal;
      }
      if (!parentVal) {
        return childVal;
      }
      return function mergedDataFn() {
        return mergeData(typeof childVal === "function" ? childVal.call(this, this) : childVal, typeof parentVal === "function" ? parentVal.call(this, this) : parentVal);
      };
    } else {
      return function mergedInstanceDataFn() {
        var instanceData = typeof childVal === "function" ? childVal.call(vm, vm) : childVal;
        var defaultData = typeof parentVal === "function" ? parentVal.call(vm, vm) : parentVal;
        if (instanceData) {
          return mergeData(instanceData, defaultData);
        } else {
          return defaultData;
        }
      };
    }
  }
  strats.data = function(parentVal, childVal, vm) {
    if (!vm) {
      if (childVal && typeof childVal !== "function") {
        warn('The "data" option should be a function that returns a per-instance value in component definitions.', vm);
        return parentVal;
      }
      return mergeDataOrFn(parentVal, childVal);
    }
    return mergeDataOrFn(parentVal, childVal, vm);
  };
  function mergeHook(parentVal, childVal) {
    var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
    return res ? dedupeHooks(res) : res;
  }
  function dedupeHooks(hooks2) {
    var res = [];
    for (var i = 0; i < hooks2.length; i++) {
      if (res.indexOf(hooks2[i]) === -1) {
        res.push(hooks2[i]);
      }
    }
    return res;
  }
  LIFECYCLE_HOOKS.forEach(function(hook) {
    strats[hook] = mergeHook;
  });
  function mergeAssets(parentVal, childVal, vm, key) {
    var res = Object.create(parentVal || null);
    if (childVal) {
      assertObjectType(key, childVal, vm);
      return extend(res, childVal);
    } else {
      return res;
    }
  }
  ASSET_TYPES.forEach(function(type) {
    strats[type + "s"] = mergeAssets;
  });
  strats.watch = function(parentVal, childVal, vm, key) {
    if (parentVal === nativeWatch) {
      parentVal = void 0;
    }
    if (childVal === nativeWatch) {
      childVal = void 0;
    }
    if (!childVal) {
      return Object.create(parentVal || null);
    }
    if (true) {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal) {
      return childVal;
    }
    var ret = {};
    extend(ret, parentVal);
    for (var key$1 in childVal) {
      var parent = ret[key$1];
      var child = childVal[key$1];
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }
      ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
    }
    return ret;
  };
  strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
    if (childVal && true) {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal) {
      return childVal;
    }
    var ret = /* @__PURE__ */ Object.create(null);
    extend(ret, parentVal);
    if (childVal) {
      extend(ret, childVal);
    }
    return ret;
  };
  strats.provide = mergeDataOrFn;
  var defaultStrat = function(parentVal, childVal) {
    return childVal === void 0 ? parentVal : childVal;
  };
  function checkComponents(options) {
    for (var key in options.components) {
      validateComponentName(key);
    }
  }
  function validateComponentName(name) {
    if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
      warn('Invalid component name: "' + name + '". Component names should conform to valid custom element name in html5 specification.');
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
      warn("Do not use built-in or reserved HTML elements as component id: " + name);
    }
  }
  function normalizeProps(options, vm) {
    var props2 = options.props;
    if (!props2) {
      return;
    }
    var res = {};
    var i, val, name;
    if (Array.isArray(props2)) {
      i = props2.length;
      while (i--) {
        val = props2[i];
        if (typeof val === "string") {
          name = camelize(val);
          res[name] = { type: null };
        } else if (true) {
          warn("props must be strings when using array syntax.");
        }
      }
    } else if (isPlainObject(props2)) {
      for (var key in props2) {
        val = props2[key];
        name = camelize(key);
        res[name] = isPlainObject(val) ? val : { type: val };
      }
    } else if (true) {
      warn('Invalid value for option "props": expected an Array or an Object, but got ' + toRawType(props2) + ".", vm);
    }
    options.props = res;
  }
  function normalizeInject(options, vm) {
    var inject = options.inject;
    if (!inject) {
      return;
    }
    var normalized = options.inject = {};
    if (Array.isArray(inject)) {
      for (var i = 0; i < inject.length; i++) {
        normalized[inject[i]] = { from: inject[i] };
      }
    } else if (isPlainObject(inject)) {
      for (var key in inject) {
        var val = inject[key];
        normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
      }
    } else if (true) {
      warn('Invalid value for option "inject": expected an Array or an Object, but got ' + toRawType(inject) + ".", vm);
    }
  }
  function normalizeDirectives(options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def$$1 = dirs[key];
        if (typeof def$$1 === "function") {
          dirs[key] = { bind: def$$1, update: def$$1 };
        }
      }
    }
  }
  function assertObjectType(name, value, vm) {
    if (!isPlainObject(value)) {
      warn('Invalid value for option "' + name + '": expected an Object, but got ' + toRawType(value) + ".", vm);
    }
  }
  function mergeOptions(parent, child, vm) {
    if (true) {
      checkComponents(child);
    }
    if (typeof child === "function") {
      child = child.options;
    }
    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives(child);
    if (!child._base) {
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm);
        }
      }
    }
    var options = {};
    var key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField(key2) {
      var strat = strats[key2] || defaultStrat;
      options[key2] = strat(parent[key2], child[key2], vm, key2);
    }
    return options;
  }
  function resolveAsset(options, type, id, warnMissing) {
    if (typeof id !== "string") {
      return;
    }
    var assets = options[type];
    if (hasOwn(assets, id)) {
      return assets[id];
    }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) {
      return assets[camelizedId];
    }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) {
      return assets[PascalCaseId];
    }
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (warnMissing && !res) {
      warn("Failed to resolve " + type.slice(0, -1) + ": " + id, options);
    }
    return res;
  }
  function validateProp(key, propOptions, propsData, vm) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    var booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
      if (absent && !hasOwn(prop, "default")) {
        value = false;
      } else if (value === "" || value === hyphenate(key)) {
        var stringIndex = getTypeIndex(String, prop.type);
        if (stringIndex < 0 || booleanIndex < stringIndex) {
          value = true;
        }
      }
    }
    if (value === void 0) {
      value = getPropDefaultValue(vm, prop, key);
      var prevShouldObserve = shouldObserve;
      toggleObserving(true);
      observe(value);
      toggleObserving(prevShouldObserve);
    }
    if (true) {
      assertProp(prop, key, value, vm, absent);
    }
    return value;
  }
  function getPropDefaultValue(vm, prop, key) {
    if (!hasOwn(prop, "default")) {
      return void 0;
    }
    var def2 = prop.default;
    if (isObject(def2)) {
      warn('Invalid default value for prop "' + key + '": Props with type Object/Array must use a factory function to return the default value.', vm);
    }
    if (vm && vm.$options.propsData && vm.$options.propsData[key] === void 0 && vm._props[key] !== void 0) {
      return vm._props[key];
    }
    return typeof def2 === "function" && getType(prop.type) !== "Function" ? def2.call(vm) : def2;
  }
  function assertProp(prop, name, value, vm, absent) {
    if (prop.required && absent) {
      warn('Missing required prop: "' + name + '"', vm);
      return;
    }
    if (value == null && !prop.required) {
      return;
    }
    var type = prop.type;
    var valid = !type || type === true;
    var expectedTypes = [];
    if (type) {
      if (!Array.isArray(type)) {
        type = [type];
      }
      for (var i = 0; i < type.length && !valid; i++) {
        var assertedType = assertType(value, type[i], vm);
        expectedTypes.push(assertedType.expectedType || "");
        valid = assertedType.valid;
      }
    }
    var haveExpectedTypes = expectedTypes.some(function(t) {
      return t;
    });
    if (!valid && haveExpectedTypes) {
      warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
      return;
    }
    var validator = prop.validator;
    if (validator) {
      if (!validator(value)) {
        warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
      }
    }
  }
  var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
  function assertType(value, type, vm) {
    var valid;
    var expectedType = getType(type);
    if (simpleCheckRE.test(expectedType)) {
      var t = typeof value;
      valid = t === expectedType.toLowerCase();
      if (!valid && t === "object") {
        valid = value instanceof type;
      }
    } else if (expectedType === "Object") {
      valid = isPlainObject(value);
    } else if (expectedType === "Array") {
      valid = Array.isArray(value);
    } else {
      try {
        valid = value instanceof type;
      } catch (e) {
        warn('Invalid prop type: "' + String(type) + '" is not a constructor', vm);
        valid = false;
      }
    }
    return {
      valid,
      expectedType
    };
  }
  var functionTypeCheckRE = /^\s*function (\w+)/;
  function getType(fn) {
    var match2 = fn && fn.toString().match(functionTypeCheckRE);
    return match2 ? match2[1] : "";
  }
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i;
      }
    }
    return -1;
  }
  function getInvalidTypeMessage(name, value, expectedTypes) {
    var message = 'Invalid prop: type check failed for prop "' + name + '". Expected ' + expectedTypes.map(capitalize).join(", ");
    var expectedType = expectedTypes[0];
    var receivedType = toRawType(value);
    if (expectedTypes.length === 1 && isExplicable(expectedType) && isExplicable(typeof value) && !isBoolean(expectedType, receivedType)) {
      message += " with value " + styleValue(value, expectedType);
    }
    message += ", got " + receivedType + " ";
    if (isExplicable(receivedType)) {
      message += "with value " + styleValue(value, receivedType) + ".";
    }
    return message;
  }
  function styleValue(value, type) {
    if (type === "String") {
      return '"' + value + '"';
    } else if (type === "Number") {
      return "" + Number(value);
    } else {
      return "" + value;
    }
  }
  var EXPLICABLE_TYPES = ["string", "number", "boolean"];
  function isExplicable(value) {
    return EXPLICABLE_TYPES.some(function(elem) {
      return value.toLowerCase() === elem;
    });
  }
  function isBoolean() {
    var args = [], len = arguments.length;
    while (len--)
      args[len] = arguments[len];
    return args.some(function(elem) {
      return elem.toLowerCase() === "boolean";
    });
  }
  function handleError(err, vm, info) {
    pushTarget();
    try {
      if (vm) {
        var cur = vm;
        while (cur = cur.$parent) {
          var hooks2 = cur.$options.errorCaptured;
          if (hooks2) {
            for (var i = 0; i < hooks2.length; i++) {
              try {
                var capture = hooks2[i].call(cur, err, vm, info) === false;
                if (capture) {
                  return;
                }
              } catch (e) {
                globalHandleError(e, cur, "errorCaptured hook");
              }
            }
          }
        }
      }
      globalHandleError(err, vm, info);
    } finally {
      popTarget();
    }
  }
  function invokeWithErrorHandling(handler, context, args, vm, info) {
    var res;
    try {
      res = args ? handler.apply(context, args) : handler.call(context);
      if (res && !res._isVue && isPromise(res) && !res._handled) {
        res.catch(function(e) {
          return handleError(e, vm, info + " (Promise/async)");
        });
        res._handled = true;
      }
    } catch (e) {
      handleError(e, vm, info);
    }
    return res;
  }
  function globalHandleError(err, vm, info) {
    if (config.errorHandler) {
      try {
        return config.errorHandler.call(null, err, vm, info);
      } catch (e) {
        if (e !== err) {
          logError(e, null, "config.errorHandler");
        }
      }
    }
    logError(err, vm, info);
  }
  function logError(err, vm, info) {
    if (true) {
      warn("Error in " + info + ': "' + err.toString() + '"', vm);
    }
    if ((inBrowser || inWeex) && typeof console !== "undefined") {
      console.error(err);
    } else {
      throw err;
    }
  }
  var isUsingMicroTask = false;
  var callbacks = [];
  var pending = false;
  function flushCallbacks() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
  var timerFunc;
  if (typeof Promise !== "undefined" && isNative(Promise)) {
    p = Promise.resolve();
    timerFunc = function() {
      p.then(flushCallbacks);
      if (isIOS) {
        setTimeout(noop);
      }
    };
    isUsingMicroTask = true;
  } else if (!isIE && typeof MutationObserver !== "undefined" && (isNative(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
    counter = 1;
    observer = new MutationObserver(flushCallbacks);
    textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function() {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
    isUsingMicroTask = true;
  } else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
    timerFunc = function() {
      setImmediate(flushCallbacks);
    };
  } else {
    timerFunc = function() {
      setTimeout(flushCallbacks, 0);
    };
  }
  var p;
  var counter;
  var observer;
  var textNode;
  function nextTick(cb, ctx) {
    var _resolve;
    callbacks.push(function() {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, "nextTick");
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== "undefined") {
      return new Promise(function(resolve2) {
        _resolve = resolve2;
      });
    }
  }
  var initProxy;
  if (true) {
    allowedGlobals = makeMap("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,require");
    warnNonPresent = function(target2, key) {
      warn('Property or method "' + key + '" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target2);
    };
    warnReservedPrefix = function(target2, key) {
      warn('Property "' + key + '" must be accessed with "$data.' + key + '" because properties starting with "$" or "_" are not proxied in the Vue instance to prevent conflicts with Vue internals. See: https://vuejs.org/v2/api/#data', target2);
    };
    hasProxy = typeof Proxy !== "undefined" && isNative(Proxy);
    if (hasProxy) {
      isBuiltInModifier = makeMap("stop,prevent,self,ctrl,shift,alt,meta,exact");
      config.keyCodes = new Proxy(config.keyCodes, {
        set: function set2(target2, key, value) {
          if (isBuiltInModifier(key)) {
            warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
            return false;
          } else {
            target2[key] = value;
            return true;
          }
        }
      });
    }
    hasHandler = {
      has: function has2(target2, key) {
        var has3 = key in target2;
        var isAllowed = allowedGlobals(key) || typeof key === "string" && key.charAt(0) === "_" && !(key in target2.$data);
        if (!has3 && !isAllowed) {
          if (key in target2.$data) {
            warnReservedPrefix(target2, key);
          } else {
            warnNonPresent(target2, key);
          }
        }
        return has3 || !isAllowed;
      }
    };
    getHandler = {
      get: function get3(target2, key) {
        if (typeof key === "string" && !(key in target2)) {
          if (key in target2.$data) {
            warnReservedPrefix(target2, key);
          } else {
            warnNonPresent(target2, key);
          }
        }
        return target2[key];
      }
    };
    initProxy = function initProxy2(vm) {
      if (hasProxy) {
        var options = vm.$options;
        var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
        vm._renderProxy = new Proxy(vm, handlers);
      } else {
        vm._renderProxy = vm;
      }
    };
  }
  var allowedGlobals;
  var warnNonPresent;
  var warnReservedPrefix;
  var hasProxy;
  var isBuiltInModifier;
  var hasHandler;
  var getHandler;
  var seenObjects = new _Set();
  function traverse(val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
  }
  function _traverse(val, seen) {
    var i, keys;
    var isA = Array.isArray(val);
    if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
      return;
    }
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return;
      }
      seen.add(depId);
    }
    if (isA) {
      i = val.length;
      while (i--) {
        _traverse(val[i], seen);
      }
    } else {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) {
        _traverse(val[keys[i]], seen);
      }
    }
  }
  var mark;
  var measure;
  if (true) {
    perf = inBrowser && window.performance;
    if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
      mark = function(tag) {
        return perf.mark(tag);
      };
      measure = function(name, startTag, endTag) {
        perf.measure(name, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
      };
    }
  }
  var perf;
  var normalizeEvent = cached(function(name) {
    var passive = name.charAt(0) === "&";
    name = passive ? name.slice(1) : name;
    var once$$1 = name.charAt(0) === "~";
    name = once$$1 ? name.slice(1) : name;
    var capture = name.charAt(0) === "!";
    name = capture ? name.slice(1) : name;
    return {
      name,
      once: once$$1,
      capture,
      passive
    };
  });
  function createFnInvoker(fns, vm) {
    function invoker() {
      var arguments$1 = arguments;
      var fns2 = invoker.fns;
      if (Array.isArray(fns2)) {
        var cloned = fns2.slice();
        for (var i = 0; i < cloned.length; i++) {
          invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
        }
      } else {
        return invokeWithErrorHandling(fns2, null, arguments, vm, "v-on handler");
      }
    }
    invoker.fns = fns;
    return invoker;
  }
  function updateListeners(on, oldOn, add2, remove$$12, createOnceHandler2, vm) {
    var name, def$$1, cur, old, event;
    for (name in on) {
      def$$1 = cur = on[name];
      old = oldOn[name];
      event = normalizeEvent(name);
      if (isUndef(cur)) {
        warn('Invalid handler for event "' + event.name + '": got ' + String(cur), vm);
      } else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          cur = on[name] = createFnInvoker(cur, vm);
        }
        if (isTrue(event.once)) {
          cur = on[name] = createOnceHandler2(event.name, cur, event.capture);
        }
        add2(event.name, cur, event.capture, event.passive, event.params);
      } else if (cur !== old) {
        old.fns = cur;
        on[name] = old;
      }
    }
    for (name in oldOn) {
      if (isUndef(on[name])) {
        event = normalizeEvent(name);
        remove$$12(event.name, oldOn[name], event.capture);
      }
    }
  }
  function mergeVNodeHook(def2, hookKey, hook) {
    if (def2 instanceof VNode) {
      def2 = def2.data.hook || (def2.data.hook = {});
    }
    var invoker;
    var oldHook = def2[hookKey];
    function wrappedHook() {
      hook.apply(this, arguments);
      remove(invoker.fns, wrappedHook);
    }
    if (isUndef(oldHook)) {
      invoker = createFnInvoker([wrappedHook]);
    } else {
      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
        invoker = oldHook;
        invoker.fns.push(wrappedHook);
      } else {
        invoker = createFnInvoker([oldHook, wrappedHook]);
      }
    }
    invoker.merged = true;
    def2[hookKey] = invoker;
  }
  function extractPropsFromVNodeData(data, Ctor, tag) {
    var propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
      return;
    }
    var res = {};
    var attrs2 = data.attrs;
    var props2 = data.props;
    if (isDef(attrs2) || isDef(props2)) {
      for (var key in propOptions) {
        var altKey = hyphenate(key);
        if (true) {
          var keyInLowerCase = key.toLowerCase();
          if (key !== keyInLowerCase && attrs2 && hasOwn(attrs2, keyInLowerCase)) {
            tip('Prop "' + keyInLowerCase + '" is passed to component ' + formatComponentName(tag || Ctor) + ', but the declared prop name is "' + key + '". Note that HTML attributes are case-insensitive and camelCased props need to use their kebab-case equivalents when using in-DOM templates. You should probably use "' + altKey + '" instead of "' + key + '".');
          }
        }
        checkProp(res, props2, key, altKey, true) || checkProp(res, attrs2, key, altKey, false);
      }
    }
    return res;
  }
  function checkProp(res, hash, key, altKey, preserve) {
    if (isDef(hash)) {
      if (hasOwn(hash, key)) {
        res[key] = hash[key];
        if (!preserve) {
          delete hash[key];
        }
        return true;
      } else if (hasOwn(hash, altKey)) {
        res[key] = hash[altKey];
        if (!preserve) {
          delete hash[altKey];
        }
        return true;
      }
    }
    return false;
  }
  function simpleNormalizeChildren(children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children);
      }
    }
    return children;
  }
  function normalizeChildren(children) {
    return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : void 0;
  }
  function isTextNode(node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment);
  }
  function normalizeArrayChildren(children, nestedIndex) {
    var res = [];
    var i, c, lastIndex, last;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === "boolean") {
        continue;
      }
      lastIndex = res.length - 1;
      last = res[lastIndex];
      if (Array.isArray(c)) {
        if (c.length > 0) {
          c = normalizeArrayChildren(c, (nestedIndex || "") + "_" + i);
          if (isTextNode(c[0]) && isTextNode(last)) {
            res[lastIndex] = createTextVNode(last.text + c[0].text);
            c.shift();
          }
          res.push.apply(res, c);
        }
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c);
        } else if (c !== "") {
          res.push(createTextVNode(c));
        }
      } else {
        if (isTextNode(c) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c.text);
        } else {
          if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
            c.key = "__vlist" + nestedIndex + "_" + i + "__";
          }
          res.push(c);
        }
      }
    }
    return res;
  }
  function initProvide(vm) {
    var provide = vm.$options.provide;
    if (provide) {
      vm._provided = typeof provide === "function" ? provide.call(vm) : provide;
    }
  }
  function initInjections(vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
      toggleObserving(false);
      Object.keys(result).forEach(function(key) {
        if (true) {
          defineReactive$$1(vm, key, result[key], function() {
            warn('Avoid mutating an injected value directly since the changes will be overwritten whenever the provided component re-renders. injection being mutated: "' + key + '"', vm);
          });
        } else {
          defineReactive$$1(vm, key, result[key]);
        }
      });
      toggleObserving(true);
    }
  }
  function resolveInject(inject, vm) {
    if (inject) {
      var result = /* @__PURE__ */ Object.create(null);
      var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key === "__ob__") {
          continue;
        }
        var provideKey = inject[key].from;
        var source = vm;
        while (source) {
          if (source._provided && hasOwn(source._provided, provideKey)) {
            result[key] = source._provided[provideKey];
            break;
          }
          source = source.$parent;
        }
        if (!source) {
          if ("default" in inject[key]) {
            var provideDefault = inject[key].default;
            result[key] = typeof provideDefault === "function" ? provideDefault.call(vm) : provideDefault;
          } else if (true) {
            warn('Injection "' + key + '" not found', vm);
          }
        }
      }
      return result;
    }
  }
  function resolveSlots(children, context) {
    if (!children || !children.length) {
      return {};
    }
    var slots = {};
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var data = child.data;
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot;
      }
      if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
        var name = data.slot;
        var slot = slots[name] || (slots[name] = []);
        if (child.tag === "template") {
          slot.push.apply(slot, child.children || []);
        } else {
          slot.push(child);
        }
      } else {
        (slots.default || (slots.default = [])).push(child);
      }
    }
    for (var name$1 in slots) {
      if (slots[name$1].every(isWhitespace)) {
        delete slots[name$1];
      }
    }
    return slots;
  }
  function isWhitespace(node) {
    return node.isComment && !node.asyncFactory || node.text === " ";
  }
  function isAsyncPlaceholder(node) {
    return node.isComment && node.asyncFactory;
  }
  function normalizeScopedSlots(slots, normalSlots, prevSlots) {
    var res;
    var hasNormalSlots = Object.keys(normalSlots).length > 0;
    var isStable = slots ? !!slots.$stable : !hasNormalSlots;
    var key = slots && slots.$key;
    if (!slots) {
      res = {};
    } else if (slots._normalized) {
      return slots._normalized;
    } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
      return prevSlots;
    } else {
      res = {};
      for (var key$1 in slots) {
        if (slots[key$1] && key$1[0] !== "$") {
          res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
        }
      }
    }
    for (var key$2 in normalSlots) {
      if (!(key$2 in res)) {
        res[key$2] = proxyNormalSlot(normalSlots, key$2);
      }
    }
    if (slots && Object.isExtensible(slots)) {
      slots._normalized = res;
    }
    def(res, "$stable", isStable);
    def(res, "$key", key);
    def(res, "$hasNormal", hasNormalSlots);
    return res;
  }
  function normalizeScopedSlot(normalSlots, key, fn) {
    var normalized = function() {
      var res = arguments.length ? fn.apply(null, arguments) : fn({});
      res = res && typeof res === "object" && !Array.isArray(res) ? [res] : normalizeChildren(res);
      var vnode = res && res[0];
      return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) ? void 0 : res;
    };
    if (fn.proxy) {
      Object.defineProperty(normalSlots, key, {
        get: normalized,
        enumerable: true,
        configurable: true
      });
    }
    return normalized;
  }
  function proxyNormalSlot(slots, key) {
    return function() {
      return slots[key];
    };
  }
  function renderList(val, render6) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === "string") {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render6(val[i], i);
      }
    } else if (typeof val === "number") {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render6(i + 1, i);
      }
    } else if (isObject(val)) {
      if (hasSymbol && val[Symbol.iterator]) {
        ret = [];
        var iterator = val[Symbol.iterator]();
        var result = iterator.next();
        while (!result.done) {
          ret.push(render6(result.value, ret.length));
          result = iterator.next();
        }
      } else {
        keys = Object.keys(val);
        ret = new Array(keys.length);
        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          ret[i] = render6(val[key], key, i);
        }
      }
    }
    if (!isDef(ret)) {
      ret = [];
    }
    ret._isVList = true;
    return ret;
  }
  function renderSlot(name, fallbackRender, props2, bindObject) {
    var scopedSlotFn = this.$scopedSlots[name];
    var nodes;
    if (scopedSlotFn) {
      props2 = props2 || {};
      if (bindObject) {
        if (!isObject(bindObject)) {
          warn("slot v-bind without argument expects an Object", this);
        }
        props2 = extend(extend({}, bindObject), props2);
      }
      nodes = scopedSlotFn(props2) || (typeof fallbackRender === "function" ? fallbackRender() : fallbackRender);
    } else {
      nodes = this.$slots[name] || (typeof fallbackRender === "function" ? fallbackRender() : fallbackRender);
    }
    var target2 = props2 && props2.slot;
    if (target2) {
      return this.$createElement("template", { slot: target2 }, nodes);
    } else {
      return nodes;
    }
  }
  function resolveFilter(id) {
    return resolveAsset(this.$options, "filters", id, true) || identity;
  }
  function isKeyNotMatch(expect, actual) {
    if (Array.isArray(expect)) {
      return expect.indexOf(actual) === -1;
    } else {
      return expect !== actual;
    }
  }
  function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
    var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
      return isKeyNotMatch(builtInKeyName, eventKeyName);
    } else if (mappedKeyCode) {
      return isKeyNotMatch(mappedKeyCode, eventKeyCode);
    } else if (eventKeyName) {
      return hyphenate(eventKeyName) !== key;
    }
    return eventKeyCode === void 0;
  }
  function bindObjectProps(data, tag, value, asProp, isSync) {
    if (value) {
      if (!isObject(value)) {
        warn("v-bind without argument expects an Object or Array value", this);
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        var hash;
        var loop = function(key2) {
          if (key2 === "class" || key2 === "style" || isReservedAttribute(key2)) {
            hash = data;
          } else {
            var type = data.attrs && data.attrs.type;
            hash = asProp || config.mustUseProp(tag, type, key2) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
          }
          var camelizedKey = camelize(key2);
          var hyphenatedKey = hyphenate(key2);
          if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
            hash[key2] = value[key2];
            if (isSync) {
              var on = data.on || (data.on = {});
              on["update:" + key2] = function($event) {
                value[key2] = $event;
              };
            }
          }
        };
        for (var key in value)
          loop(key);
      }
    }
    return data;
  }
  function renderStatic(index2, isInFor) {
    var cached2 = this._staticTrees || (this._staticTrees = []);
    var tree = cached2[index2];
    if (tree && !isInFor) {
      return tree;
    }
    tree = cached2[index2] = this.$options.staticRenderFns[index2].call(this._renderProxy, null, this);
    markStatic(tree, "__static__" + index2, false);
    return tree;
  }
  function markOnce(tree, index2, key) {
    markStatic(tree, "__once__" + index2 + (key ? "_" + key : ""), true);
    return tree;
  }
  function markStatic(tree, key, isOnce) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== "string") {
          markStaticNode(tree[i], key + "_" + i, isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }
  function markStaticNode(node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }
  function bindObjectListeners(data, value) {
    if (value) {
      if (!isPlainObject(value)) {
        warn("v-on without argument expects an Object value", this);
      } else {
        var on = data.on = data.on ? extend({}, data.on) : {};
        for (var key in value) {
          var existing = on[key];
          var ours = value[key];
          on[key] = existing ? [].concat(existing, ours) : ours;
        }
      }
    }
    return data;
  }
  function resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) {
    res = res || { $stable: !hasDynamicKeys };
    for (var i = 0; i < fns.length; i++) {
      var slot = fns[i];
      if (Array.isArray(slot)) {
        resolveScopedSlots(slot, res, hasDynamicKeys);
      } else if (slot) {
        if (slot.proxy) {
          slot.fn.proxy = true;
        }
        res[slot.key] = slot.fn;
      }
    }
    if (contentHashKey) {
      res.$key = contentHashKey;
    }
    return res;
  }
  function bindDynamicKeys(baseObj, values) {
    for (var i = 0; i < values.length; i += 2) {
      var key = values[i];
      if (typeof key === "string" && key) {
        baseObj[values[i]] = values[i + 1];
      } else if (key !== "" && key !== null) {
        warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
      }
    }
    return baseObj;
  }
  function prependModifier(value, symbol) {
    return typeof value === "string" ? symbol + value : value;
  }
  function installRenderHelpers(target2) {
    target2._o = markOnce;
    target2._n = toNumber;
    target2._s = toString;
    target2._l = renderList;
    target2._t = renderSlot;
    target2._q = looseEqual;
    target2._i = looseIndexOf;
    target2._m = renderStatic;
    target2._f = resolveFilter;
    target2._k = checkKeyCodes;
    target2._b = bindObjectProps;
    target2._v = createTextVNode;
    target2._e = createEmptyVNode;
    target2._u = resolveScopedSlots;
    target2._g = bindObjectListeners;
    target2._d = bindDynamicKeys;
    target2._p = prependModifier;
  }
  function FunctionalRenderContext(data, props2, children, parent, Ctor) {
    var this$1 = this;
    var options = Ctor.options;
    var contextVm;
    if (hasOwn(parent, "_uid")) {
      contextVm = Object.create(parent);
      contextVm._original = parent;
    } else {
      contextVm = parent;
      parent = parent._original;
    }
    var isCompiled = isTrue(options._compiled);
    var needNormalization = !isCompiled;
    this.data = data;
    this.props = props2;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = function() {
      if (!this$1.$slots) {
        normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
      }
      return this$1.$slots;
    };
    Object.defineProperty(this, "scopedSlots", {
      enumerable: true,
      get: function get3() {
        return normalizeScopedSlots(data.scopedSlots, this.slots());
      }
    });
    if (isCompiled) {
      this.$options = options;
      this.$slots = this.slots();
      this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
    }
    if (options._scopeId) {
      this._c = function(a, b, c, d) {
        var vnode = createElement(contextVm, a, b, c, d, needNormalization);
        if (vnode && !Array.isArray(vnode)) {
          vnode.fnScopeId = options._scopeId;
          vnode.fnContext = parent;
        }
        return vnode;
      };
    } else {
      this._c = function(a, b, c, d) {
        return createElement(contextVm, a, b, c, d, needNormalization);
      };
    }
  }
  installRenderHelpers(FunctionalRenderContext.prototype);
  function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
    var options = Ctor.options;
    var props2 = {};
    var propOptions = options.props;
    if (isDef(propOptions)) {
      for (var key in propOptions) {
        props2[key] = validateProp(key, propOptions, propsData || emptyObject);
      }
    } else {
      if (isDef(data.attrs)) {
        mergeProps(props2, data.attrs);
      }
      if (isDef(data.props)) {
        mergeProps(props2, data.props);
      }
    }
    var renderContext = new FunctionalRenderContext(data, props2, children, contextVm, Ctor);
    var vnode = options.render.call(null, renderContext._c, renderContext);
    if (vnode instanceof VNode) {
      return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
    } else if (Array.isArray(vnode)) {
      var vnodes = normalizeChildren(vnode) || [];
      var res = new Array(vnodes.length);
      for (var i = 0; i < vnodes.length; i++) {
        res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
      }
      return res;
    }
  }
  function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
    var clone2 = cloneVNode(vnode);
    clone2.fnContext = contextVm;
    clone2.fnOptions = options;
    if (true) {
      (clone2.devtoolsMeta = clone2.devtoolsMeta || {}).renderContext = renderContext;
    }
    if (data.slot) {
      (clone2.data || (clone2.data = {})).slot = data.slot;
    }
    return clone2;
  }
  function mergeProps(to, from) {
    for (var key in from) {
      to[camelize(key)] = from[key];
    }
  }
  var componentVNodeHooks = {
    init: function init(vnode, hydrating) {
      if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
        var mountedNode = vnode;
        componentVNodeHooks.prepatch(mountedNode, mountedNode);
      } else {
        var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
        child.$mount(hydrating ? vnode.elm : void 0, hydrating);
      }
    },
    prepatch: function prepatch(oldVnode, vnode) {
      var options = vnode.componentOptions;
      var child = vnode.componentInstance = oldVnode.componentInstance;
      updateChildComponent(child, options.propsData, options.listeners, vnode, options.children);
    },
    insert: function insert(vnode) {
      var context = vnode.context;
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isMounted) {
        componentInstance._isMounted = true;
        callHook(componentInstance, "mounted");
      }
      if (vnode.data.keepAlive) {
        if (context._isMounted) {
          queueActivatedComponent(componentInstance);
        } else {
          activateChildComponent(componentInstance, true);
        }
      }
    },
    destroy: function destroy(vnode) {
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isDestroyed) {
        if (!vnode.data.keepAlive) {
          componentInstance.$destroy();
        } else {
          deactivateChildComponent(componentInstance, true);
        }
      }
    }
  };
  var hooksToMerge = Object.keys(componentVNodeHooks);
  function createComponent(Ctor, data, context, children, tag) {
    if (isUndef(Ctor)) {
      return;
    }
    var baseCtor = context.$options._base;
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }
    if (typeof Ctor !== "function") {
      if (true) {
        warn("Invalid Component definition: " + String(Ctor), context);
      }
      return;
    }
    var asyncFactory;
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor;
      Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
      if (Ctor === void 0) {
        return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
      }
    }
    data = data || {};
    resolveConstructorOptions(Ctor);
    if (isDef(data.model)) {
      transformModel(Ctor.options, data);
    }
    var propsData = extractPropsFromVNodeData(data, Ctor, tag);
    if (isTrue(Ctor.options.functional)) {
      return createFunctionalComponent(Ctor, propsData, data, context, children);
    }
    var listeners = data.on;
    data.on = data.nativeOn;
    if (isTrue(Ctor.options.abstract)) {
      var slot = data.slot;
      data = {};
      if (slot) {
        data.slot = slot;
      }
    }
    installComponentHooks(data);
    var name = Ctor.options.name || tag;
    var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ""), data, void 0, void 0, void 0, context, { Ctor, propsData, listeners, tag, children }, asyncFactory);
    return vnode;
  }
  function createComponentInstanceForVnode(vnode, parent) {
    var options = {
      _isComponent: true,
      _parentVnode: vnode,
      parent
    };
    var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
      options.render = inlineTemplate.render;
      options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options);
  }
  function installComponentHooks(data) {
    var hooks2 = data.hook || (data.hook = {});
    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var existing = hooks2[key];
      var toMerge = componentVNodeHooks[key];
      if (existing !== toMerge && !(existing && existing._merged)) {
        hooks2[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
      }
    }
  }
  function mergeHook$1(f1, f2) {
    var merged = function(a, b) {
      f1(a, b);
      f2(a, b);
    };
    merged._merged = true;
    return merged;
  }
  function transformModel(options, data) {
    var prop = options.model && options.model.prop || "value";
    var event = options.model && options.model.event || "input";
    (data.attrs || (data.attrs = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    var existing = on[event];
    var callback = data.model.callback;
    if (isDef(existing)) {
      if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
        on[event] = [callback].concat(existing);
      }
    } else {
      on[event] = callback;
    }
  }
  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;
  function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = void 0;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType);
  }
  function _createElement(context, tag, data, children, normalizationType) {
    if (isDef(data) && isDef(data.__ob__)) {
      warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\nAlways create fresh vnode data objects in each render!", context);
      return createEmptyVNode();
    }
    if (isDef(data) && isDef(data.is)) {
      tag = data.is;
    }
    if (!tag) {
      return createEmptyVNode();
    }
    if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
      {
        warn("Avoid using non-primitive value as key, use string/number value instead.", context);
      }
    }
    if (Array.isArray(children) && typeof children[0] === "function") {
      data = data || {};
      data.scopedSlots = { default: children[0] };
      children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === "string") {
      var Ctor;
      ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        if (isDef(data) && isDef(data.nativeOn) && data.tag !== "component") {
          warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
        }
        vnode = new VNode(config.parsePlatformTagName(tag), data, children, void 0, void 0, context);
      } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, "components", tag))) {
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        vnode = new VNode(tag, data, children, void 0, void 0, context);
      }
    } else {
      vnode = createComponent(tag, data, context, children);
    }
    if (Array.isArray(vnode)) {
      return vnode;
    } else if (isDef(vnode)) {
      if (isDef(ns)) {
        applyNS(vnode, ns);
      }
      if (isDef(data)) {
        registerDeepBindings(data);
      }
      return vnode;
    } else {
      return createEmptyVNode();
    }
  }
  function applyNS(vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === "foreignObject") {
      ns = void 0;
      force = true;
    }
    if (isDef(vnode.children)) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        var child = vnode.children[i];
        if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== "svg")) {
          applyNS(child, ns, force);
        }
      }
    }
  }
  function registerDeepBindings(data) {
    if (isObject(data.style)) {
      traverse(data.style);
    }
    if (isObject(data.class)) {
      traverse(data.class);
    }
  }
  function initRender(vm) {
    vm._vnode = null;
    vm._staticTrees = null;
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode;
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = emptyObject;
    vm._c = function(a, b, c, d) {
      return createElement(vm, a, b, c, d, false);
    };
    vm.$createElement = function(a, b, c, d) {
      return createElement(vm, a, b, c, d, true);
    };
    var parentData = parentVnode && parentVnode.data;
    if (true) {
      defineReactive$$1(vm, "$attrs", parentData && parentData.attrs || emptyObject, function() {
        !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
      }, true);
      defineReactive$$1(vm, "$listeners", options._parentListeners || emptyObject, function() {
        !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
      }, true);
    } else {
      defineReactive$$1(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, true);
      defineReactive$$1(vm, "$listeners", options._parentListeners || emptyObject, null, true);
    }
  }
  var currentRenderingInstance = null;
  function renderMixin(Vue2) {
    installRenderHelpers(Vue2.prototype);
    Vue2.prototype.$nextTick = function(fn) {
      return nextTick(fn, this);
    };
    Vue2.prototype._render = function() {
      var vm = this;
      var ref2 = vm.$options;
      var render6 = ref2.render;
      var _parentVnode = ref2._parentVnode;
      if (_parentVnode) {
        vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
      }
      vm.$vnode = _parentVnode;
      var vnode;
      try {
        currentRenderingInstance = vm;
        vnode = render6.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        handleError(e, vm, "render");
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e2) {
            handleError(e2, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } finally {
        currentRenderingInstance = null;
      }
      if (Array.isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
      }
      if (!(vnode instanceof VNode)) {
        if (Array.isArray(vnode)) {
          warn("Multiple root nodes returned from render function. Render function should return a single root node.", vm);
        }
        vnode = createEmptyVNode();
      }
      vnode.parent = _parentVnode;
      return vnode;
    };
  }
  function ensureCtor(comp, base) {
    if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === "Module") {
      comp = comp.default;
    }
    return isObject(comp) ? base.extend(comp) : comp;
  }
  function createAsyncPlaceholder(factory, data, context, children, tag) {
    var node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data, context, children, tag };
    return node;
  }
  function resolveAsyncComponent(factory, baseCtor) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
      return factory.errorComp;
    }
    if (isDef(factory.resolved)) {
      return factory.resolved;
    }
    var owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
      factory.owners.push(owner);
    }
    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
      return factory.loadingComp;
    }
    if (owner && !isDef(factory.owners)) {
      var owners = factory.owners = [owner];
      var sync = true;
      var timerLoading = null;
      var timerTimeout = null;
      owner.$on("hook:destroyed", function() {
        return remove(owners, owner);
      });
      var forceRender = function(renderCompleted) {
        for (var i = 0, l = owners.length; i < l; i++) {
          owners[i].$forceUpdate();
        }
        if (renderCompleted) {
          owners.length = 0;
          if (timerLoading !== null) {
            clearTimeout(timerLoading);
            timerLoading = null;
          }
          if (timerTimeout !== null) {
            clearTimeout(timerTimeout);
            timerTimeout = null;
          }
        }
      };
      var resolve2 = once(function(res2) {
        factory.resolved = ensureCtor(res2, baseCtor);
        if (!sync) {
          forceRender(true);
        } else {
          owners.length = 0;
        }
      });
      var reject = once(function(reason) {
        warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ""));
        if (isDef(factory.errorComp)) {
          factory.error = true;
          forceRender(true);
        }
      });
      var res = factory(resolve2, reject);
      if (isObject(res)) {
        if (isPromise(res)) {
          if (isUndef(factory.resolved)) {
            res.then(resolve2, reject);
          }
        } else if (isPromise(res.component)) {
          res.component.then(resolve2, reject);
          if (isDef(res.error)) {
            factory.errorComp = ensureCtor(res.error, baseCtor);
          }
          if (isDef(res.loading)) {
            factory.loadingComp = ensureCtor(res.loading, baseCtor);
            if (res.delay === 0) {
              factory.loading = true;
            } else {
              timerLoading = setTimeout(function() {
                timerLoading = null;
                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                  factory.loading = true;
                  forceRender(false);
                }
              }, res.delay || 200);
            }
          }
          if (isDef(res.timeout)) {
            timerTimeout = setTimeout(function() {
              timerTimeout = null;
              if (isUndef(factory.resolved)) {
                reject(true ? "timeout (" + res.timeout + "ms)" : null);
              }
            }, res.timeout);
          }
        }
      }
      sync = false;
      return factory.loading ? factory.loadingComp : factory.resolved;
    }
  }
  function getFirstComponentChild(children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c;
        }
      }
    }
  }
  function initEvents(vm) {
    vm._events = /* @__PURE__ */ Object.create(null);
    vm._hasHookEvent = false;
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }
  var target;
  function add(event, fn) {
    target.$on(event, fn);
  }
  function remove$1(event, fn) {
    target.$off(event, fn);
  }
  function createOnceHandler(event, fn) {
    var _target = target;
    return function onceHandler() {
      var res = fn.apply(null, arguments);
      if (res !== null) {
        _target.$off(event, onceHandler);
      }
    };
  }
  function updateComponentListeners(vm, listeners, oldListeners) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
    target = void 0;
  }
  function eventsMixin(Vue2) {
    var hookRE = /^hook:/;
    Vue2.prototype.$on = function(event, fn) {
      var vm = this;
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          vm.$on(event[i], fn);
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        if (hookRE.test(event)) {
          vm._hasHookEvent = true;
        }
      }
      return vm;
    };
    Vue2.prototype.$once = function(event, fn) {
      var vm = this;
      function on() {
        vm.$off(event, on);
        fn.apply(vm, arguments);
      }
      on.fn = fn;
      vm.$on(event, on);
      return vm;
    };
    Vue2.prototype.$off = function(event, fn) {
      var vm = this;
      if (!arguments.length) {
        vm._events = /* @__PURE__ */ Object.create(null);
        return vm;
      }
      if (Array.isArray(event)) {
        for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
          vm.$off(event[i$1], fn);
        }
        return vm;
      }
      var cbs = vm._events[event];
      if (!cbs) {
        return vm;
      }
      if (!fn) {
        vm._events[event] = null;
        return vm;
      }
      var cb;
      var i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break;
        }
      }
      return vm;
    };
    Vue2.prototype.$emit = function(event) {
      var vm = this;
      if (true) {
        var lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
          tip('Event "' + lowerCaseEvent + '" is emitted in component ' + formatComponentName(vm) + ' but the handler is registered for "' + event + '". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "' + hyphenate(event) + '" instead of "' + event + '".');
        }
      }
      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        var info = 'event handler for "' + event + '"';
        for (var i = 0, l = cbs.length; i < l; i++) {
          invokeWithErrorHandling(cbs[i], vm, args, vm, info);
        }
      }
      return vm;
    };
  }
  var activeInstance = null;
  var isUpdatingChildComponent = false;
  function setActiveInstance(vm) {
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    return function() {
      activeInstance = prevActiveInstance;
    };
  }
  function initLifecycle(vm) {
    var options = vm.$options;
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }
    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;
    vm.$children = [];
    vm.$refs = {};
    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }
  function lifecycleMixin(Vue2) {
    Vue2.prototype._update = function(vnode, hydrating) {
      var vm = this;
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var restoreActiveInstance = setActiveInstance(vm);
      vm._vnode = vnode;
      if (!prevVnode) {
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
      } else {
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
      restoreActiveInstance();
      if (prevEl) {
        prevEl.__vue__ = null;
      }
      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }
      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el;
      }
    };
    Vue2.prototype.$forceUpdate = function() {
      var vm = this;
      if (vm._watcher) {
        vm._watcher.update();
      }
    };
    Vue2.prototype.$destroy = function() {
      var vm = this;
      if (vm._isBeingDestroyed) {
        return;
      }
      callHook(vm, "beforeDestroy");
      vm._isBeingDestroyed = true;
      var parent = vm.$parent;
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove(parent.$children, vm);
      }
      if (vm._watcher) {
        vm._watcher.teardown();
      }
      var i = vm._watchers.length;
      while (i--) {
        vm._watchers[i].teardown();
      }
      if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
      }
      vm._isDestroyed = true;
      vm.__patch__(vm._vnode, null);
      callHook(vm, "destroyed");
      vm.$off();
      if (vm.$el) {
        vm.$el.__vue__ = null;
      }
      if (vm.$vnode) {
        vm.$vnode.parent = null;
      }
    };
  }
  function mountComponent(vm, el, hydrating) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      if (true) {
        if (vm.$options.template && vm.$options.template.charAt(0) !== "#" || vm.$options.el || el) {
          warn("You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.", vm);
        } else {
          warn("Failed to mount component: template or render function not defined.", vm);
        }
      }
    }
    callHook(vm, "beforeMount");
    var updateComponent;
    if (config.performance && mark) {
      updateComponent = function() {
        var name = vm._name;
        var id = vm._uid;
        var startTag = "vue-perf-start:" + id;
        var endTag = "vue-perf-end:" + id;
        mark(startTag);
        var vnode = vm._render();
        mark(endTag);
        measure("vue " + name + " render", startTag, endTag);
        mark(startTag);
        vm._update(vnode, hydrating);
        mark(endTag);
        measure("vue " + name + " patch", startTag, endTag);
      };
    } else {
      updateComponent = function() {
        vm._update(vm._render(), hydrating);
      };
    }
    new Watcher(vm, updateComponent, noop, {
      before: function before() {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, "beforeUpdate");
        }
      }
    }, true);
    hydrating = false;
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, "mounted");
    }
    return vm;
  }
  function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
    if (true) {
      isUpdatingChildComponent = true;
    }
    var newScopedSlots = parentVnode.data.scopedSlots;
    var oldScopedSlots = vm.$scopedSlots;
    var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
    var needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode;
    if (vm._vnode) {
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;
    vm.$attrs = parentVnode.data.attrs || emptyObject;
    vm.$listeners = listeners || emptyObject;
    if (propsData && vm.$options.props) {
      toggleObserving(false);
      var props2 = vm._props;
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        var propOptions = vm.$options.props;
        props2[key] = validateProp(key, propOptions, propsData, vm);
      }
      toggleObserving(true);
      vm.$options.propsData = propsData;
    }
    listeners = listeners || emptyObject;
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
    if (needsForceUpdate) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
    if (true) {
      isUpdatingChildComponent = false;
    }
  }
  function isInInactiveTree(vm) {
    while (vm && (vm = vm.$parent)) {
      if (vm._inactive) {
        return true;
      }
    }
    return false;
  }
  function activateChildComponent(vm, direct) {
    if (direct) {
      vm._directInactive = false;
      if (isInInactiveTree(vm)) {
        return;
      }
    } else if (vm._directInactive) {
      return;
    }
    if (vm._inactive || vm._inactive === null) {
      vm._inactive = false;
      for (var i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i]);
      }
      callHook(vm, "activated");
    }
  }
  function deactivateChildComponent(vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return;
      }
    }
    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook(vm, "deactivated");
    }
  }
  function callHook(vm, hook) {
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit("hook:" + hook);
    }
    popTarget();
  }
  var MAX_UPDATE_COUNT = 100;
  var queue = [];
  var activatedChildren = [];
  var has = {};
  var circular = {};
  var waiting = false;
  var flushing = false;
  var index = 0;
  function resetSchedulerState() {
    index = queue.length = activatedChildren.length = 0;
    has = {};
    if (true) {
      circular = {};
    }
    waiting = flushing = false;
  }
  var currentFlushTimestamp = 0;
  var getNow = Date.now;
  if (inBrowser && !isIE) {
    performance = window.performance;
    if (performance && typeof performance.now === "function" && getNow() > document.createEvent("Event").timeStamp) {
      getNow = function() {
        return performance.now();
      };
    }
  }
  var performance;
  function flushSchedulerQueue() {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;
    queue.sort(function(a, b) {
      return a.id - b.id;
    });
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      if (watcher.before) {
        watcher.before();
      }
      id = watcher.id;
      has[id] = null;
      watcher.run();
      if (has[id] != null) {
        circular[id] = (circular[id] || 0) + 1;
        if (circular[id] > MAX_UPDATE_COUNT) {
          warn("You may have an infinite update loop " + (watcher.user ? 'in watcher with expression "' + watcher.expression + '"' : "in a component render function."), watcher.vm);
          break;
        }
      }
    }
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();
    resetSchedulerState();
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);
    if (devtools && config.devtools) {
      devtools.emit("flush");
    }
  }
  function callUpdatedHooks(queue2) {
    var i = queue2.length;
    while (i--) {
      var watcher = queue2[i];
      var vm = watcher.vm;
      if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
        callHook(vm, "updated");
      }
    }
  }
  function queueActivatedComponent(vm) {
    vm._inactive = false;
    activatedChildren.push(vm);
  }
  function callActivatedHooks(queue2) {
    for (var i = 0; i < queue2.length; i++) {
      queue2[i]._inactive = true;
      activateChildComponent(queue2[i], true);
    }
  }
  function queueWatcher(watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      if (!flushing) {
        queue.push(watcher);
      } else {
        var i = queue.length - 1;
        while (i > index && queue[i].id > watcher.id) {
          i--;
        }
        queue.splice(i + 1, 0, watcher);
      }
      if (!waiting) {
        waiting = true;
        if (!config.async) {
          flushSchedulerQueue();
          return;
        }
        nextTick(flushSchedulerQueue);
      }
    }
  }
  var uid$2 = 0;
  var Watcher = function Watcher2(vm, expOrFn, cb, options, isRenderWatcher) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watchers.push(this);
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$2;
    this.active = true;
    this.dirty = this.lazy;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = true ? expOrFn.toString() : "";
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
        warn('Failed watching path: "' + expOrFn + '" Watcher only accepts simple dot-delimited paths. For full control, use a function instead.', vm);
      }
    }
    this.value = this.lazy ? void 0 : this.get();
  };
  Watcher.prototype.get = function get() {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, 'getter for watcher "' + this.expression + '"');
      } else {
        throw e;
      }
    } finally {
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value;
  };
  Watcher.prototype.addDep = function addDep(dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };
  Watcher.prototype.cleanupDeps = function cleanupDeps() {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };
  Watcher.prototype.update = function update() {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };
  Watcher.prototype.run = function run() {
    if (this.active) {
      var value = this.get();
      if (value !== this.value || isObject(value) || this.deep) {
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          var info = 'callback for watcher "' + this.expression + '"';
          invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };
  Watcher.prototype.evaluate = function evaluate() {
    this.value = this.get();
    this.dirty = false;
  };
  Watcher.prototype.depend = function depend2() {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };
  Watcher.prototype.teardown = function teardown() {
    if (this.active) {
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this);
      }
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
    }
  };
  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };
  function proxy(target2, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
      return this[sourceKey][key];
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target2, key, sharedPropertyDefinition);
  }
  function initState(vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) {
      initProps(vm, opts.props);
    }
    if (opts.methods) {
      initMethods(vm, opts.methods);
    }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true);
    }
    if (opts.computed) {
      initComputed(vm, opts.computed);
    }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }
  function initProps(vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props2 = vm._props = {};
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    if (!isRoot) {
      toggleObserving(false);
    }
    var loop = function(key2) {
      keys.push(key2);
      var value = validateProp(key2, propsOptions, propsData, vm);
      if (true) {
        var hyphenatedKey = hyphenate(key2);
        if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
          warn('"' + hyphenatedKey + '" is a reserved attribute and cannot be used as component prop.', vm);
        }
        defineReactive$$1(props2, key2, value, function() {
          if (!isRoot && !isUpdatingChildComponent) {
            warn(`Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "` + key2 + '"', vm);
          }
        });
      } else {
        defineReactive$$1(props2, key2, value);
      }
      if (!(key2 in vm)) {
        proxy(vm, "_props", key2);
      }
    };
    for (var key in propsOptions)
      loop(key);
    toggleObserving(true);
  }
  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === "function" ? getData(data, vm) : data || {};
    if (!isPlainObject(data)) {
      data = {};
      warn("data functions should return an object:\nhttps://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function", vm);
    }
    var keys = Object.keys(data);
    var props2 = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      if (true) {
        if (methods && hasOwn(methods, key)) {
          warn('Method "' + key + '" has already been defined as a data property.', vm);
        }
      }
      if (props2 && hasOwn(props2, key)) {
        warn('The data property "' + key + '" is already declared as a prop. Use prop default value instead.', vm);
      } else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
    observe(data, true);
  }
  function getData(data, vm) {
    pushTarget();
    try {
      return data.call(vm, vm);
    } catch (e) {
      handleError(e, vm, "data()");
      return {};
    } finally {
      popTarget();
    }
  }
  var computedWatcherOptions = { lazy: true };
  function initComputed(vm, computed) {
    var watchers = vm._computedWatchers = /* @__PURE__ */ Object.create(null);
    var isSSR = isServerRendering();
    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === "function" ? userDef : userDef.get;
      if (getter == null) {
        warn('Getter is missing for computed property "' + key + '".', vm);
      }
      if (!isSSR) {
        watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
      }
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      } else if (true) {
        if (key in vm.$data) {
          warn('The computed property "' + key + '" is already defined in data.', vm);
        } else if (vm.$options.props && key in vm.$options.props) {
          warn('The computed property "' + key + '" is already defined as a prop.', vm);
        } else if (vm.$options.methods && key in vm.$options.methods) {
          warn('The computed property "' + key + '" is already defined as a method.', vm);
        }
      }
    }
  }
  function defineComputed(target2, key, userDef) {
    var shouldCache = !isServerRendering();
    if (typeof userDef === "function") {
      sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
      sharedPropertyDefinition.set = noop;
    } else {
      sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
      sharedPropertyDefinition.set = userDef.set || noop;
    }
    if (sharedPropertyDefinition.set === noop) {
      sharedPropertyDefinition.set = function() {
        warn('Computed property "' + key + '" was assigned to but it has no setter.', this);
      };
    }
    Object.defineProperty(target2, key, sharedPropertyDefinition);
  }
  function createComputedGetter(key) {
    return function computedGetter() {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value;
      }
    };
  }
  function createGetterInvoker(fn) {
    return function computedGetter() {
      return fn.call(this, this);
    };
  }
  function initMethods(vm, methods) {
    var props2 = vm.$options.props;
    for (var key in methods) {
      if (true) {
        if (typeof methods[key] !== "function") {
          warn('Method "' + key + '" has type "' + typeof methods[key] + '" in the component definition. Did you reference the function correctly?', vm);
        }
        if (props2 && hasOwn(props2, key)) {
          warn('Method "' + key + '" has already been defined as a prop.', vm);
        }
        if (key in vm && isReserved(key)) {
          warn('Method "' + key + '" conflicts with an existing Vue instance method. Avoid defining component methods that start with _ or $.');
        }
      }
      vm[key] = typeof methods[key] !== "function" ? noop : bind(methods[key], vm);
    }
  }
  function initWatch(vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }
  function createWatcher(vm, expOrFn, handler, options) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === "string") {
      handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options);
  }
  function stateMixin(Vue2) {
    var dataDef = {};
    dataDef.get = function() {
      return this._data;
    };
    var propsDef = {};
    propsDef.get = function() {
      return this._props;
    };
    if (true) {
      dataDef.set = function() {
        warn("Avoid replacing instance root $data. Use nested data properties instead.", this);
      };
      propsDef.set = function() {
        warn("$props is readonly.", this);
      };
    }
    Object.defineProperty(Vue2.prototype, "$data", dataDef);
    Object.defineProperty(Vue2.prototype, "$props", propsDef);
    Vue2.prototype.$set = set;
    Vue2.prototype.$delete = del;
    Vue2.prototype.$watch = function(expOrFn, cb, options) {
      var vm = this;
      if (isPlainObject(cb)) {
        return createWatcher(vm, expOrFn, cb, options);
      }
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        var info = 'callback for immediate watcher "' + watcher.expression + '"';
        pushTarget();
        invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
        popTarget();
      }
      return function unwatchFn() {
        watcher.teardown();
      };
    };
  }
  var uid$3 = 0;
  function initMixin(Vue2) {
    Vue2.prototype._init = function(options) {
      var vm = this;
      vm._uid = uid$3++;
      var startTag, endTag;
      if (config.performance && mark) {
        startTag = "vue-perf-start:" + vm._uid;
        endTag = "vue-perf-end:" + vm._uid;
        mark(startTag);
      }
      vm._isVue = true;
      if (options && options._isComponent) {
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
      }
      if (true) {
        initProxy(vm);
      } else {
        vm._renderProxy = vm;
      }
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook(vm, "beforeCreate");
      initInjections(vm);
      initState(vm);
      initProvide(vm);
      callHook(vm, "created");
      if (config.performance && mark) {
        vm._name = formatComponentName(vm, false);
        mark(endTag);
        measure("vue " + vm._name + " init", startTag, endTag);
      }
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }
  function initInternalComponent(vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    var parentVnode = options._parentVnode;
    opts.parent = options.parent;
    opts._parentVnode = parentVnode;
    var vnodeComponentOptions = parentVnode.componentOptions;
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;
    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }
  function resolveConstructorOptions(Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = resolveConstructorOptions(Ctor.super);
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        Ctor.superOptions = superOptions;
        var modifiedOptions = resolveModifiedOptions(Ctor);
        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions);
        }
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options;
  }
  function resolveModifiedOptions(Ctor) {
    var modified;
    var latest = Ctor.options;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
      if (latest[key] !== sealed[key]) {
        if (!modified) {
          modified = {};
        }
        modified[key] = latest[key];
      }
    }
    return modified;
  }
  function Vue(options) {
    if (!(this instanceof Vue)) {
      warn("Vue is a constructor and should be called with the `new` keyword");
    }
    this._init(options);
  }
  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);
  function initUse(Vue2) {
    Vue2.use = function(plugin) {
      var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
      if (installedPlugins.indexOf(plugin) > -1) {
        return this;
      }
      var args = toArray(arguments, 1);
      args.unshift(this);
      if (typeof plugin.install === "function") {
        plugin.install.apply(plugin, args);
      } else if (typeof plugin === "function") {
        plugin.apply(null, args);
      }
      installedPlugins.push(plugin);
      return this;
    };
  }
  function initMixin$1(Vue2) {
    Vue2.mixin = function(mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this;
    };
  }
  function initExtend(Vue2) {
    Vue2.cid = 0;
    var cid = 1;
    Vue2.extend = function(extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId];
      }
      var name = extendOptions.name || Super.options.name;
      if (name) {
        validateComponentName(name);
      }
      var Sub = function VueComponent(options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(Super.options, extendOptions);
      Sub["super"] = Super;
      if (Sub.options.props) {
        initProps$1(Sub);
      }
      if (Sub.options.computed) {
        initComputed$1(Sub);
      }
      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;
      ASSET_TYPES.forEach(function(type) {
        Sub[type] = Super[type];
      });
      if (name) {
        Sub.options.components[name] = Sub;
      }
      Sub.superOptions = Super.options;
      Sub.extendOptions = extendOptions;
      Sub.sealedOptions = extend({}, Sub.options);
      cachedCtors[SuperId] = Sub;
      return Sub;
    };
  }
  function initProps$1(Comp) {
    var props2 = Comp.options.props;
    for (var key in props2) {
      proxy(Comp.prototype, "_props", key);
    }
  }
  function initComputed$1(Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
      defineComputed(Comp.prototype, key, computed[key]);
    }
  }
  function initAssetRegisters(Vue2) {
    ASSET_TYPES.forEach(function(type) {
      Vue2[type] = function(id, definition) {
        if (!definition) {
          return this.options[type + "s"][id];
        } else {
          if (type === "component") {
            validateComponentName(id);
          }
          if (type === "component" && isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = this.options._base.extend(definition);
          }
          if (type === "directive" && typeof definition === "function") {
            definition = { bind: definition, update: definition };
          }
          this.options[type + "s"][id] = definition;
          return definition;
        }
      };
    });
  }
  function getComponentName(opts) {
    return opts && (opts.Ctor.options.name || opts.tag);
  }
  function matches(pattern, name) {
    if (Array.isArray(pattern)) {
      return pattern.indexOf(name) > -1;
    } else if (typeof pattern === "string") {
      return pattern.split(",").indexOf(name) > -1;
    } else if (isRegExp(pattern)) {
      return pattern.test(name);
    }
    return false;
  }
  function pruneCache(keepAliveInstance, filter) {
    var cache = keepAliveInstance.cache;
    var keys = keepAliveInstance.keys;
    var _vnode = keepAliveInstance._vnode;
    for (var key in cache) {
      var entry = cache[key];
      if (entry) {
        var name = entry.name;
        if (name && !filter(name)) {
          pruneCacheEntry(cache, key, keys, _vnode);
        }
      }
    }
  }
  function pruneCacheEntry(cache, key, keys, current) {
    var entry = cache[key];
    if (entry && (!current || entry.tag !== current.tag)) {
      entry.componentInstance.$destroy();
    }
    cache[key] = null;
    remove(keys, key);
  }
  var patternTypes = [String, RegExp, Array];
  var KeepAlive = {
    name: "keep-alive",
    abstract: true,
    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    },
    methods: {
      cacheVNode: function cacheVNode() {
        var ref2 = this;
        var cache = ref2.cache;
        var keys = ref2.keys;
        var vnodeToCache = ref2.vnodeToCache;
        var keyToCache = ref2.keyToCache;
        if (vnodeToCache) {
          var tag = vnodeToCache.tag;
          var componentInstance = vnodeToCache.componentInstance;
          var componentOptions = vnodeToCache.componentOptions;
          cache[keyToCache] = {
            name: getComponentName(componentOptions),
            tag,
            componentInstance
          };
          keys.push(keyToCache);
          if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode);
          }
          this.vnodeToCache = null;
        }
      }
    },
    created: function created() {
      this.cache = /* @__PURE__ */ Object.create(null);
      this.keys = [];
    },
    destroyed: function destroyed() {
      for (var key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
      }
    },
    mounted: function mounted() {
      var this$1 = this;
      this.cacheVNode();
      this.$watch("include", function(val) {
        pruneCache(this$1, function(name) {
          return matches(val, name);
        });
      });
      this.$watch("exclude", function(val) {
        pruneCache(this$1, function(name) {
          return !matches(val, name);
        });
      });
    },
    updated: function updated() {
      this.cacheVNode();
    },
    render: function render() {
      var slot = this.$slots.default;
      var vnode = getFirstComponentChild(slot);
      var componentOptions = vnode && vnode.componentOptions;
      if (componentOptions) {
        var name = getComponentName(componentOptions);
        var ref2 = this;
        var include = ref2.include;
        var exclude = ref2.exclude;
        if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
          return vnode;
        }
        var ref$1 = this;
        var cache = ref$1.cache;
        var keys = ref$1.keys;
        var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : "") : vnode.key;
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance;
          remove(keys, key);
          keys.push(key);
        } else {
          this.vnodeToCache = vnode;
          this.keyToCache = key;
        }
        vnode.data.keepAlive = true;
      }
      return vnode || slot && slot[0];
    }
  };
  var builtInComponents = {
    KeepAlive
  };
  function initGlobalAPI(Vue2) {
    var configDef = {};
    configDef.get = function() {
      return config;
    };
    if (true) {
      configDef.set = function() {
        warn("Do not replace the Vue.config object, set individual fields instead.");
      };
    }
    Object.defineProperty(Vue2, "config", configDef);
    Vue2.util = {
      warn,
      extend,
      mergeOptions,
      defineReactive: defineReactive$$1
    };
    Vue2.set = set;
    Vue2.delete = del;
    Vue2.nextTick = nextTick;
    Vue2.observable = function(obj) {
      observe(obj);
      return obj;
    };
    Vue2.options = /* @__PURE__ */ Object.create(null);
    ASSET_TYPES.forEach(function(type) {
      Vue2.options[type + "s"] = /* @__PURE__ */ Object.create(null);
    });
    Vue2.options._base = Vue2;
    extend(Vue2.options.components, builtInComponents);
    initUse(Vue2);
    initMixin$1(Vue2);
    initExtend(Vue2);
    initAssetRegisters(Vue2);
  }
  initGlobalAPI(Vue);
  Object.defineProperty(Vue.prototype, "$isServer", {
    get: isServerRendering
  });
  Object.defineProperty(Vue.prototype, "$ssrContext", {
    get: function get2() {
      return this.$vnode && this.$vnode.ssrContext;
    }
  });
  Object.defineProperty(Vue, "FunctionalRenderContext", {
    value: FunctionalRenderContext
  });
  Vue.version = "2.6.14";
  var isReservedAttr = makeMap("style,class");
  var acceptValue = makeMap("input,textarea,option,select,progress");
  var mustUseProp = function(tag, type, attr) {
    return attr === "value" && acceptValue(tag) && type !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
  };
  var isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck");
  var isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only");
  var convertEnumeratedValue = function(key, value) {
    return isFalsyAttrValue(value) || value === "false" ? "false" : key === "contenteditable" && isValidContentEditableValue(value) ? value : "true";
  };
  var isBooleanAttr = makeMap("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible");
  var xlinkNS = "http://www.w3.org/1999/xlink";
  var isXlink = function(name) {
    return name.charAt(5) === ":" && name.slice(0, 5) === "xlink";
  };
  var getXlinkProp = function(name) {
    return isXlink(name) ? name.slice(6, name.length) : "";
  };
  var isFalsyAttrValue = function(val) {
    return val == null || val === false;
  };
  function genClassForVnode(vnode) {
    var data = vnode.data;
    var parentNode2 = vnode;
    var childNode = vnode;
    while (isDef(childNode.componentInstance)) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data) {
        data = mergeClassData(childNode.data, data);
      }
    }
    while (isDef(parentNode2 = parentNode2.parent)) {
      if (parentNode2 && parentNode2.data) {
        data = mergeClassData(data, parentNode2.data);
      }
    }
    return renderClass(data.staticClass, data.class);
  }
  function mergeClassData(child, parent) {
    return {
      staticClass: concat(child.staticClass, parent.staticClass),
      class: isDef(child.class) ? [child.class, parent.class] : parent.class
    };
  }
  function renderClass(staticClass, dynamicClass) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
      return concat(staticClass, stringifyClass(dynamicClass));
    }
    return "";
  }
  function concat(a, b) {
    return a ? b ? a + " " + b : a : b || "";
  }
  function stringifyClass(value) {
    if (Array.isArray(value)) {
      return stringifyArray(value);
    }
    if (isObject(value)) {
      return stringifyObject(value);
    }
    if (typeof value === "string") {
      return value;
    }
    return "";
  }
  function stringifyArray(value) {
    var res = "";
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(stringified = stringifyClass(value[i])) && stringified !== "") {
        if (res) {
          res += " ";
        }
        res += stringified;
      }
    }
    return res;
  }
  function stringifyObject(value) {
    var res = "";
    for (var key in value) {
      if (value[key]) {
        if (res) {
          res += " ";
        }
        res += key;
      }
    }
    return res;
  }
  var namespaceMap = {
    svg: "http://www.w3.org/2000/svg",
    math: "http://www.w3.org/1998/Math/MathML"
  };
  var isHTMLTag = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot");
  var isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
  var isReservedTag = function(tag) {
    return isHTMLTag(tag) || isSVG(tag);
  };
  function getTagNamespace(tag) {
    if (isSVG(tag)) {
      return "svg";
    }
    if (tag === "math") {
      return "math";
    }
  }
  var unknownElementCache = /* @__PURE__ */ Object.create(null);
  function isUnknownElement(tag) {
    if (!inBrowser) {
      return true;
    }
    if (isReservedTag(tag)) {
      return false;
    }
    tag = tag.toLowerCase();
    if (unknownElementCache[tag] != null) {
      return unknownElementCache[tag];
    }
    var el = document.createElement(tag);
    if (tag.indexOf("-") > -1) {
      return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
    } else {
      return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
    }
  }
  var isTextInputType = makeMap("text,number,password,search,email,tel,url");
  function query(el) {
    if (typeof el === "string") {
      var selected = document.querySelector(el);
      if (!selected) {
        warn("Cannot find element: " + el);
        return document.createElement("div");
      }
      return selected;
    } else {
      return el;
    }
  }
  function createElement$1(tagName2, vnode) {
    var elm = document.createElement(tagName2);
    if (tagName2 !== "select") {
      return elm;
    }
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== void 0) {
      elm.setAttribute("multiple", "multiple");
    }
    return elm;
  }
  function createElementNS(namespace, tagName2) {
    return document.createElementNS(namespaceMap[namespace], tagName2);
  }
  function createTextNode(text) {
    return document.createTextNode(text);
  }
  function createComment(text) {
    return document.createComment(text);
  }
  function insertBefore(parentNode2, newNode, referenceNode) {
    parentNode2.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
    node.removeChild(child);
  }
  function appendChild(node, child) {
    node.appendChild(child);
  }
  function parentNode(node) {
    return node.parentNode;
  }
  function nextSibling(node) {
    return node.nextSibling;
  }
  function tagName(node) {
    return node.tagName;
  }
  function setTextContent(node, text) {
    node.textContent = text;
  }
  function setStyleScope(node, scopeId) {
    node.setAttribute(scopeId, "");
  }
  var nodeOps = /* @__PURE__ */ Object.freeze({
    createElement: createElement$1,
    createElementNS,
    createTextNode,
    createComment,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
    setStyleScope
  });
  var ref = {
    create: function create(_, vnode) {
      registerRef(vnode);
    },
    update: function update2(oldVnode, vnode) {
      if (oldVnode.data.ref !== vnode.data.ref) {
        registerRef(oldVnode, true);
        registerRef(vnode);
      }
    },
    destroy: function destroy2(vnode) {
      registerRef(vnode, true);
    }
  };
  function registerRef(vnode, isRemoval) {
    var key = vnode.data.ref;
    if (!isDef(key)) {
      return;
    }
    var vm = vnode.context;
    var ref2 = vnode.componentInstance || vnode.elm;
    var refs = vm.$refs;
    if (isRemoval) {
      if (Array.isArray(refs[key])) {
        remove(refs[key], ref2);
      } else if (refs[key] === ref2) {
        refs[key] = void 0;
      }
    } else {
      if (vnode.data.refInFor) {
        if (!Array.isArray(refs[key])) {
          refs[key] = [ref2];
        } else if (refs[key].indexOf(ref2) < 0) {
          refs[key].push(ref2);
        }
      } else {
        refs[key] = ref2;
      }
    }
  }
  var emptyNode = new VNode("", {}, []);
  var hooks = ["create", "activate", "update", "remove", "destroy"];
  function sameVnode(a, b) {
    return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
  }
  function sameInputType(a, b) {
    if (a.tag !== "input") {
      return true;
    }
    var i;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key;
      if (isDef(key)) {
        map[key] = i;
      }
    }
    return map;
  }
  function createPatchFunction(backend) {
    var i, j;
    var cbs = {};
    var modules2 = backend.modules;
    var nodeOps2 = backend.nodeOps;
    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules2.length; ++j) {
        if (isDef(modules2[j][hooks[i]])) {
          cbs[hooks[i]].push(modules2[j][hooks[i]]);
        }
      }
    }
    function emptyNodeAt(elm) {
      return new VNode(nodeOps2.tagName(elm).toLowerCase(), {}, [], void 0, elm);
    }
    function createRmCb(childElm, listeners) {
      function remove$$12() {
        if (--remove$$12.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove$$12.listeners = listeners;
      return remove$$12;
    }
    function removeNode(el) {
      var parent = nodeOps2.parentNode(el);
      if (isDef(parent)) {
        nodeOps2.removeChild(parent, el);
      }
    }
    function isUnknownElement$$1(vnode, inVPre) {
      return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function(ignore) {
        return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
      })) && config.isUnknownElement(vnode.tag);
    }
    var creatingElmInVPre = 0;
    function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index2) {
      if (isDef(vnode.elm) && isDef(ownerArray)) {
        vnode = ownerArray[index2] = cloneVNode(vnode);
      }
      vnode.isRootInsert = !nested;
      if (createComponent2(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return;
      }
      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      if (isDef(tag)) {
        if (true) {
          if (data && data.pre) {
            creatingElmInVPre++;
          }
          if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
            warn("Unknown custom element: <" + tag + '> - did you register the component correctly? For recursive components, make sure to provide the "name" option.', vnode.context);
          }
        }
        vnode.elm = vnode.ns ? nodeOps2.createElementNS(vnode.ns, tag) : nodeOps2.createElement(tag, vnode);
        setScope(vnode);
        {
          createChildren(vnode, children, insertedVnodeQueue);
          if (isDef(data)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
          }
          insert2(parentElm, vnode.elm, refElm);
        }
        if (data && data.pre) {
          creatingElmInVPre--;
        }
      } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps2.createComment(vnode.text);
        insert2(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps2.createTextNode(vnode.text);
        insert2(parentElm, vnode.elm, refElm);
      }
    }
    function createComponent2(vnode, insertedVnodeQueue, parentElm, refElm) {
      var i2 = vnode.data;
      if (isDef(i2)) {
        var isReactivated = isDef(vnode.componentInstance) && i2.keepAlive;
        if (isDef(i2 = i2.hook) && isDef(i2 = i2.init)) {
          i2(vnode, false);
        }
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          insert2(parentElm, vnode.elm, refElm);
          if (isTrue(isReactivated)) {
            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
          }
          return true;
        }
      }
    }
    function initComponent(vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
        vnode.data.pendingInsert = null;
      }
      vnode.elm = vnode.componentInstance.$el;
      if (isPatchable(vnode)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
        setScope(vnode);
      } else {
        registerRef(vnode);
        insertedVnodeQueue.push(vnode);
      }
    }
    function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
      var i2;
      var innerNode = vnode;
      while (innerNode.componentInstance) {
        innerNode = innerNode.componentInstance._vnode;
        if (isDef(i2 = innerNode.data) && isDef(i2 = i2.transition)) {
          for (i2 = 0; i2 < cbs.activate.length; ++i2) {
            cbs.activate[i2](emptyNode, innerNode);
          }
          insertedVnodeQueue.push(innerNode);
          break;
        }
      }
      insert2(parentElm, vnode.elm, refElm);
    }
    function insert2(parent, elm, ref$$1) {
      if (isDef(parent)) {
        if (isDef(ref$$1)) {
          if (nodeOps2.parentNode(ref$$1) === parent) {
            nodeOps2.insertBefore(parent, elm, ref$$1);
          }
        } else {
          nodeOps2.appendChild(parent, elm);
        }
      }
    }
    function createChildren(vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        if (true) {
          checkDuplicateKeys(children);
        }
        for (var i2 = 0; i2 < children.length; ++i2) {
          createElm(children[i2], insertedVnodeQueue, vnode.elm, null, true, children, i2);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps2.appendChild(vnode.elm, nodeOps2.createTextNode(String(vnode.text)));
      }
    }
    function isPatchable(vnode) {
      while (vnode.componentInstance) {
        vnode = vnode.componentInstance._vnode;
      }
      return isDef(vnode.tag);
    }
    function invokeCreateHooks(vnode, insertedVnodeQueue) {
      for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
        cbs.create[i$1](emptyNode, vnode);
      }
      i = vnode.data.hook;
      if (isDef(i)) {
        if (isDef(i.create)) {
          i.create(emptyNode, vnode);
        }
        if (isDef(i.insert)) {
          insertedVnodeQueue.push(vnode);
        }
      }
    }
    function setScope(vnode) {
      var i2;
      if (isDef(i2 = vnode.fnScopeId)) {
        nodeOps2.setStyleScope(vnode.elm, i2);
      } else {
        var ancestor = vnode;
        while (ancestor) {
          if (isDef(i2 = ancestor.context) && isDef(i2 = i2.$options._scopeId)) {
            nodeOps2.setStyleScope(vnode.elm, i2);
          }
          ancestor = ancestor.parent;
        }
      }
      if (isDef(i2 = activeInstance) && i2 !== vnode.context && i2 !== vnode.fnContext && isDef(i2 = i2.$options._scopeId)) {
        nodeOps2.setStyleScope(vnode.elm, i2);
      }
    }
    function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
      }
    }
    function invokeDestroyHook(vnode) {
      var i2, j2;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i2 = data.hook) && isDef(i2 = i2.destroy)) {
          i2(vnode);
        }
        for (i2 = 0; i2 < cbs.destroy.length; ++i2) {
          cbs.destroy[i2](vnode);
        }
      }
      if (isDef(i2 = vnode.children)) {
        for (j2 = 0; j2 < vnode.children.length; ++j2) {
          invokeDestroyHook(vnode.children[j2]);
        }
      }
    }
    function removeVnodes(vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else {
            removeNode(ch.elm);
          }
        }
      }
    }
    function removeAndInvokeRemoveHook(vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var i2;
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          rm.listeners += listeners;
        } else {
          rm = createRmCb(vnode.elm, listeners);
        }
        if (isDef(i2 = vnode.componentInstance) && isDef(i2 = i2._vnode) && isDef(i2.data)) {
          removeAndInvokeRemoveHook(i2, rm);
        }
        for (i2 = 0; i2 < cbs.remove.length; ++i2) {
          cbs.remove[i2](vnode, rm);
        }
        if (isDef(i2 = vnode.data.hook) && isDef(i2 = i2.remove)) {
          i2(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
      var canMove = !removeOnly;
      if (true) {
        checkDuplicateKeys(newCh);
      }
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx];
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          canMove && nodeOps2.insertBefore(parentElm, oldStartVnode.elm, nodeOps2.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          canMove && nodeOps2.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx)) {
            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
          }
          idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
          if (isUndef(idxInOld)) {
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          } else {
            vnodeToMove = oldCh[idxInOld];
            if (sameVnode(vnodeToMove, newStartVnode)) {
              patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
              oldCh[idxInOld] = void 0;
              canMove && nodeOps2.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
            } else {
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
            }
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
      if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
      }
    }
    function checkDuplicateKeys(children) {
      var seenKeys = {};
      for (var i2 = 0; i2 < children.length; i2++) {
        var vnode = children[i2];
        var key = vnode.key;
        if (isDef(key)) {
          if (seenKeys[key]) {
            warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
          } else {
            seenKeys[key] = true;
          }
        }
      }
    }
    function findIdxInOld(node, oldCh, start, end) {
      for (var i2 = start; i2 < end; i2++) {
        var c = oldCh[i2];
        if (isDef(c) && sameVnode(node, c)) {
          return i2;
        }
      }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index2, removeOnly) {
      if (oldVnode === vnode) {
        return;
      }
      if (isDef(vnode.elm) && isDef(ownerArray)) {
        vnode = ownerArray[index2] = cloneVNode(vnode);
      }
      var elm = vnode.elm = oldVnode.elm;
      if (isTrue(oldVnode.isAsyncPlaceholder)) {
        if (isDef(vnode.asyncFactory.resolved)) {
          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
        } else {
          vnode.isAsyncPlaceholder = true;
        }
        return;
      }
      if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
        vnode.componentInstance = oldVnode.componentInstance;
        return;
      }
      var i2;
      var data = vnode.data;
      if (isDef(data) && isDef(i2 = data.hook) && isDef(i2 = i2.prepatch)) {
        i2(oldVnode, vnode);
      }
      var oldCh = oldVnode.children;
      var ch = vnode.children;
      if (isDef(data) && isPatchable(vnode)) {
        for (i2 = 0; i2 < cbs.update.length; ++i2) {
          cbs.update[i2](oldVnode, vnode);
        }
        if (isDef(i2 = data.hook) && isDef(i2 = i2.update)) {
          i2(oldVnode, vnode);
        }
      }
      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch) {
            updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
          }
        } else if (isDef(ch)) {
          if (true) {
            checkDuplicateKeys(ch);
          }
          if (isDef(oldVnode.text)) {
            nodeOps2.setTextContent(elm, "");
          }
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          nodeOps2.setTextContent(elm, "");
        }
      } else if (oldVnode.text !== vnode.text) {
        nodeOps2.setTextContent(elm, vnode.text);
      }
      if (isDef(data)) {
        if (isDef(i2 = data.hook) && isDef(i2 = i2.postpatch)) {
          i2(oldVnode, vnode);
        }
      }
    }
    function invokeInsertHook(vnode, queue2, initial) {
      if (isTrue(initial) && isDef(vnode.parent)) {
        vnode.parent.data.pendingInsert = queue2;
      } else {
        for (var i2 = 0; i2 < queue2.length; ++i2) {
          queue2[i2].data.hook.insert(queue2[i2]);
        }
      }
    }
    var hydrationBailed = false;
    var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
    function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
      var i2;
      var tag = vnode.tag;
      var data = vnode.data;
      var children = vnode.children;
      inVPre = inVPre || data && data.pre;
      vnode.elm = elm;
      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
        vnode.isAsyncPlaceholder = true;
        return true;
      }
      if (true) {
        if (!assertNodeMatch(elm, vnode, inVPre)) {
          return false;
        }
      }
      if (isDef(data)) {
        if (isDef(i2 = data.hook) && isDef(i2 = i2.init)) {
          i2(vnode, true);
        }
        if (isDef(i2 = vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          return true;
        }
      }
      if (isDef(tag)) {
        if (isDef(children)) {
          if (!elm.hasChildNodes()) {
            createChildren(vnode, children, insertedVnodeQueue);
          } else {
            if (isDef(i2 = data) && isDef(i2 = i2.domProps) && isDef(i2 = i2.innerHTML)) {
              if (i2 !== elm.innerHTML) {
                if (typeof console !== "undefined" && !hydrationBailed) {
                  hydrationBailed = true;
                  console.warn("Parent: ", elm);
                  console.warn("server innerHTML: ", i2);
                  console.warn("client innerHTML: ", elm.innerHTML);
                }
                return false;
              }
            } else {
              var childrenMatch = true;
              var childNode = elm.firstChild;
              for (var i$1 = 0; i$1 < children.length; i$1++) {
                if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                  childrenMatch = false;
                  break;
                }
                childNode = childNode.nextSibling;
              }
              if (!childrenMatch || childNode) {
                if (typeof console !== "undefined" && !hydrationBailed) {
                  hydrationBailed = true;
                  console.warn("Parent: ", elm);
                  console.warn("Mismatching childNodes vs. VNodes: ", elm.childNodes, children);
                }
                return false;
              }
            }
          }
        }
        if (isDef(data)) {
          var fullInvoke = false;
          for (var key in data) {
            if (!isRenderedModule(key)) {
              fullInvoke = true;
              invokeCreateHooks(vnode, insertedVnodeQueue);
              break;
            }
          }
          if (!fullInvoke && data["class"]) {
            traverse(data["class"]);
          }
        }
      } else if (elm.data !== vnode.text) {
        elm.data = vnode.text;
      }
      return true;
    }
    function assertNodeMatch(node, vnode, inVPre) {
      if (isDef(vnode.tag)) {
        return vnode.tag.indexOf("vue-component") === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
      } else {
        return node.nodeType === (vnode.isComment ? 8 : 3);
      }
    }
    return function patch2(oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode)) {
          invokeDestroyHook(oldVnode);
        }
        return;
      }
      var isInitialPatch = false;
      var insertedVnodeQueue = [];
      if (isUndef(oldVnode)) {
        isInitialPatch = true;
        createElm(vnode, insertedVnodeQueue);
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
        } else {
          if (isRealElement) {
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
              oldVnode.removeAttribute(SSR_ATTR);
              hydrating = true;
            }
            if (isTrue(hydrating)) {
              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                invokeInsertHook(vnode, insertedVnodeQueue, true);
                return oldVnode;
              } else if (true) {
                warn("The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render.");
              }
            }
            oldVnode = emptyNodeAt(oldVnode);
          }
          var oldElm = oldVnode.elm;
          var parentElm = nodeOps2.parentNode(oldElm);
          createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps2.nextSibling(oldElm));
          if (isDef(vnode.parent)) {
            var ancestor = vnode.parent;
            var patchable = isPatchable(vnode);
            while (ancestor) {
              for (var i2 = 0; i2 < cbs.destroy.length; ++i2) {
                cbs.destroy[i2](ancestor);
              }
              ancestor.elm = vnode.elm;
              if (patchable) {
                for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                  cbs.create[i$1](emptyNode, ancestor);
                }
                var insert3 = ancestor.data.hook.insert;
                if (insert3.merged) {
                  for (var i$2 = 1; i$2 < insert3.fns.length; i$2++) {
                    insert3.fns[i$2]();
                  }
                }
              } else {
                registerRef(ancestor);
              }
              ancestor = ancestor.parent;
            }
          }
          if (isDef(parentElm)) {
            removeVnodes([oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode);
          }
        }
      }
      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm;
    };
  }
  var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives(vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };
  function updateDirectives(oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      _update(oldVnode, vnode);
    }
  }
  function _update(oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
    var dirsWithInsert = [];
    var dirsWithPostpatch = [];
    var key, oldDir, dir;
    for (key in newDirs) {
      oldDir = oldDirs[key];
      dir = newDirs[key];
      if (!oldDir) {
        callHook$1(dir, "bind", vnode, oldVnode);
        if (dir.def && dir.def.inserted) {
          dirsWithInsert.push(dir);
        }
      } else {
        dir.oldValue = oldDir.value;
        dir.oldArg = oldDir.arg;
        callHook$1(dir, "update", vnode, oldVnode);
        if (dir.def && dir.def.componentUpdated) {
          dirsWithPostpatch.push(dir);
        }
      }
    }
    if (dirsWithInsert.length) {
      var callInsert = function() {
        for (var i = 0; i < dirsWithInsert.length; i++) {
          callHook$1(dirsWithInsert[i], "inserted", vnode, oldVnode);
        }
      };
      if (isCreate) {
        mergeVNodeHook(vnode, "insert", callInsert);
      } else {
        callInsert();
      }
    }
    if (dirsWithPostpatch.length) {
      mergeVNodeHook(vnode, "postpatch", function() {
        for (var i = 0; i < dirsWithPostpatch.length; i++) {
          callHook$1(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
        }
      });
    }
    if (!isCreate) {
      for (key in oldDirs) {
        if (!newDirs[key]) {
          callHook$1(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
        }
      }
    }
  }
  var emptyModifiers = /* @__PURE__ */ Object.create(null);
  function normalizeDirectives$1(dirs, vm) {
    var res = /* @__PURE__ */ Object.create(null);
    if (!dirs) {
      return res;
    }
    var i, dir;
    for (i = 0; i < dirs.length; i++) {
      dir = dirs[i];
      if (!dir.modifiers) {
        dir.modifiers = emptyModifiers;
      }
      res[getRawDirName(dir)] = dir;
      dir.def = resolveAsset(vm.$options, "directives", dir.name, true);
    }
    return res;
  }
  function getRawDirName(dir) {
    return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join(".");
  }
  function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
      try {
        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
      } catch (e) {
        handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
      }
    }
  }
  var baseModules = [
    ref,
    directives
  ];
  function updateAttrs(oldVnode, vnode) {
    var opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
      return;
    }
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
      return;
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs2 = vnode.data.attrs || {};
    if (isDef(attrs2.__ob__)) {
      attrs2 = vnode.data.attrs = extend({}, attrs2);
    }
    for (key in attrs2) {
      cur = attrs2[key];
      old = oldAttrs[key];
      if (old !== cur) {
        setAttr(elm, key, cur, vnode.data.pre);
      }
    }
    if ((isIE || isEdge) && attrs2.value !== oldAttrs.value) {
      setAttr(elm, "value", attrs2.value);
    }
    for (key in oldAttrs) {
      if (isUndef(attrs2[key])) {
        if (isXlink(key)) {
          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else if (!isEnumeratedAttr(key)) {
          elm.removeAttribute(key);
        }
      }
    }
  }
  function setAttr(el, key, value, isInPre) {
    if (isInPre || el.tagName.indexOf("-") > -1) {
      baseSetAttr(el, key, value);
    } else if (isBooleanAttr(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        value = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
        el.setAttribute(key, value);
      }
    } else if (isEnumeratedAttr(key)) {
      el.setAttribute(key, convertEnumeratedValue(key, value));
    } else if (isXlink(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      baseSetAttr(el, key, value);
    }
  }
  function baseSetAttr(el, key, value) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      if (isIE && !isIE9 && el.tagName === "TEXTAREA" && key === "placeholder" && value !== "" && !el.__ieph) {
        var blocker = function(e) {
          e.stopImmediatePropagation();
          el.removeEventListener("input", blocker);
        };
        el.addEventListener("input", blocker);
        el.__ieph = true;
      }
      el.setAttribute(key, value);
    }
  }
  var attrs = {
    create: updateAttrs,
    update: updateAttrs
  };
  function updateClass(oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
      return;
    }
    var cls = genClassForVnode(vnode);
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
      cls = concat(cls, stringifyClass(transitionClass));
    }
    if (cls !== el._prevClass) {
      el.setAttribute("class", cls);
      el._prevClass = cls;
    }
  }
  var klass = {
    create: updateClass,
    update: updateClass
  };
  var RANGE_TOKEN = "__r";
  var CHECKBOX_RADIO_TOKEN = "__c";
  function normalizeEvents(on) {
    if (isDef(on[RANGE_TOKEN])) {
      var event = isIE ? "change" : "input";
      on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
      delete on[RANGE_TOKEN];
    }
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
      on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
      delete on[CHECKBOX_RADIO_TOKEN];
    }
  }
  var target$1;
  function createOnceHandler$1(event, handler, capture) {
    var _target = target$1;
    return function onceHandler() {
      var res = handler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, onceHandler, capture, _target);
      }
    };
  }
  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
  function add$1(name, handler, capture, passive) {
    if (useMicrotaskFix) {
      var attachedTimestamp = currentFlushTimestamp;
      var original = handler;
      handler = original._wrapper = function(e) {
        if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
          return original.apply(this, arguments);
        }
      };
    }
    target$1.addEventListener(name, handler, supportsPassive ? { capture, passive } : capture);
  }
  function remove$2(name, handler, capture, _target) {
    (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
  }
  function updateDOMListeners(oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
      return;
    }
    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target$1 = vnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
    target$1 = void 0;
  }
  var events = {
    create: updateDOMListeners,
    update: updateDOMListeners
  };
  var svgContainer;
  function updateDOMProps(oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
      return;
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props2 = vnode.data.domProps || {};
    if (isDef(props2.__ob__)) {
      props2 = vnode.data.domProps = extend({}, props2);
    }
    for (key in oldProps) {
      if (!(key in props2)) {
        elm[key] = "";
      }
    }
    for (key in props2) {
      cur = props2[key];
      if (key === "textContent" || key === "innerHTML") {
        if (vnode.children) {
          vnode.children.length = 0;
        }
        if (cur === oldProps[key]) {
          continue;
        }
        if (elm.childNodes.length === 1) {
          elm.removeChild(elm.childNodes[0]);
        }
      }
      if (key === "value" && elm.tagName !== "PROGRESS") {
        elm._value = cur;
        var strCur = isUndef(cur) ? "" : String(cur);
        if (shouldUpdateValue(elm, strCur)) {
          elm.value = strCur;
        }
      } else if (key === "innerHTML" && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
        svgContainer = svgContainer || document.createElement("div");
        svgContainer.innerHTML = "<svg>" + cur + "</svg>";
        var svg = svgContainer.firstChild;
        while (elm.firstChild) {
          elm.removeChild(elm.firstChild);
        }
        while (svg.firstChild) {
          elm.appendChild(svg.firstChild);
        }
      } else if (cur !== oldProps[key]) {
        try {
          elm[key] = cur;
        } catch (e) {
        }
      }
    }
  }
  function shouldUpdateValue(elm, checkVal) {
    return !elm.composing && (elm.tagName === "OPTION" || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
  }
  function isNotInFocusAndDirty(elm, checkVal) {
    var notInFocus = true;
    try {
      notInFocus = document.activeElement !== elm;
    } catch (e) {
    }
    return notInFocus && elm.value !== checkVal;
  }
  function isDirtyWithModifiers(elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers;
    if (isDef(modifiers)) {
      if (modifiers.number) {
        return toNumber(value) !== toNumber(newVal);
      }
      if (modifiers.trim) {
        return value.trim() !== newVal.trim();
      }
    }
    return value !== newVal;
  }
  var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
  };
  var parseStyleText = cached(function(cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function(item) {
      if (item) {
        var tmp = item.split(propertyDelimiter);
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return res;
  });
  function normalizeStyleData(data) {
    var style2 = normalizeStyleBinding(data.style);
    return data.staticStyle ? extend(data.staticStyle, style2) : style2;
  }
  function normalizeStyleBinding(bindingStyle) {
    if (Array.isArray(bindingStyle)) {
      return toObject(bindingStyle);
    }
    if (typeof bindingStyle === "string") {
      return parseStyleText(bindingStyle);
    }
    return bindingStyle;
  }
  function getStyle(vnode, checkChild) {
    var res = {};
    var styleData;
    if (checkChild) {
      var childNode = vnode;
      while (childNode.componentInstance) {
        childNode = childNode.componentInstance._vnode;
        if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
          extend(res, styleData);
        }
      }
    }
    if (styleData = normalizeStyleData(vnode.data)) {
      extend(res, styleData);
    }
    var parentNode2 = vnode;
    while (parentNode2 = parentNode2.parent) {
      if (parentNode2.data && (styleData = normalizeStyleData(parentNode2.data))) {
        extend(res, styleData);
      }
    }
    return res;
  }
  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function(el, name, val) {
    if (cssVarRE.test(name)) {
      el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
      el.style.setProperty(hyphenate(name), val.replace(importantRE, ""), "important");
    } else {
      var normalizedName = normalize(name);
      if (Array.isArray(val)) {
        for (var i = 0, len = val.length; i < len; i++) {
          el.style[normalizedName] = val[i];
        }
      } else {
        el.style[normalizedName] = val;
      }
    }
  };
  var vendorNames = ["Webkit", "Moz", "ms"];
  var emptyStyle;
  var normalize = cached(function(prop) {
    emptyStyle = emptyStyle || document.createElement("div").style;
    prop = camelize(prop);
    if (prop !== "filter" && prop in emptyStyle) {
      return prop;
    }
    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
      var name = vendorNames[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  });
  function updateStyle(oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
      return;
    }
    var cur, name;
    var el = vnode.elm;
    var oldStaticStyle = oldData.staticStyle;
    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
    var oldStyle = oldStaticStyle || oldStyleBinding;
    var style2 = normalizeStyleBinding(vnode.data.style) || {};
    vnode.data.normalizedStyle = isDef(style2.__ob__) ? extend({}, style2) : style2;
    var newStyle = getStyle(vnode, true);
    for (name in oldStyle) {
      if (isUndef(newStyle[name])) {
        setProp(el, name, "");
      }
    }
    for (name in newStyle) {
      cur = newStyle[name];
      if (cur !== oldStyle[name]) {
        setProp(el, name, cur == null ? "" : cur);
      }
    }
  }
  var style = {
    create: updateStyle,
    update: updateStyle
  };
  var whitespaceRE = /\s+/;
  function addClass(el, cls) {
    if (!cls || !(cls = cls.trim())) {
      return;
    }
    if (el.classList) {
      if (cls.indexOf(" ") > -1) {
        cls.split(whitespaceRE).forEach(function(c) {
          return el.classList.add(c);
        });
      } else {
        el.classList.add(cls);
      }
    } else {
      var cur = " " + (el.getAttribute("class") || "") + " ";
      if (cur.indexOf(" " + cls + " ") < 0) {
        el.setAttribute("class", (cur + cls).trim());
      }
    }
  }
  function removeClass(el, cls) {
    if (!cls || !(cls = cls.trim())) {
      return;
    }
    if (el.classList) {
      if (cls.indexOf(" ") > -1) {
        cls.split(whitespaceRE).forEach(function(c) {
          return el.classList.remove(c);
        });
      } else {
        el.classList.remove(cls);
      }
      if (!el.classList.length) {
        el.removeAttribute("class");
      }
    } else {
      var cur = " " + (el.getAttribute("class") || "") + " ";
      var tar = " " + cls + " ";
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, " ");
      }
      cur = cur.trim();
      if (cur) {
        el.setAttribute("class", cur);
      } else {
        el.removeAttribute("class");
      }
    }
  }
  function resolveTransition(def$$1) {
    if (!def$$1) {
      return;
    }
    if (typeof def$$1 === "object") {
      var res = {};
      if (def$$1.css !== false) {
        extend(res, autoCssTransition(def$$1.name || "v"));
      }
      extend(res, def$$1);
      return res;
    } else if (typeof def$$1 === "string") {
      return autoCssTransition(def$$1);
    }
  }
  var autoCssTransition = cached(function(name) {
    return {
      enterClass: name + "-enter",
      enterToClass: name + "-enter-to",
      enterActiveClass: name + "-enter-active",
      leaveClass: name + "-leave",
      leaveToClass: name + "-leave-to",
      leaveActiveClass: name + "-leave-active"
    };
  });
  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = "transition";
  var ANIMATION = "animation";
  var transitionProp = "transition";
  var transitionEndEvent = "transitionend";
  var animationProp = "animation";
  var animationEndEvent = "animationend";
  if (hasTransition) {
    if (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0) {
      transitionProp = "WebkitTransition";
      transitionEndEvent = "webkitTransitionEnd";
    }
    if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
      animationProp = "WebkitAnimation";
      animationEndEvent = "webkitAnimationEnd";
    }
  }
  var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(fn) {
    return fn();
  };
  function nextFrame(fn) {
    raf(function() {
      raf(fn);
    });
  }
  function addTransitionClass(el, cls) {
    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
      transitionClasses.push(cls);
      addClass(el, cls);
    }
  }
  function removeTransitionClass(el, cls) {
    if (el._transitionClasses) {
      remove(el._transitionClasses, cls);
    }
    removeClass(el, cls);
  }
  function whenTransitionEnds(el, expectedType, cb) {
    var ref2 = getTransitionInfo(el, expectedType);
    var type = ref2.type;
    var timeout = ref2.timeout;
    var propCount = ref2.propCount;
    if (!type) {
      return cb();
    }
    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;
    var end = function() {
      el.removeEventListener(event, onEnd);
      cb();
    };
    var onEnd = function(e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    setTimeout(function() {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  }
  var transformRE = /\b(transform|all)(,|$)/;
  function getTransitionInfo(el, expectedType) {
    var styles = window.getComputedStyle(el);
    var transitionDelays = (styles[transitionProp + "Delay"] || "").split(", ");
    var transitionDurations = (styles[transitionProp + "Duration"] || "").split(", ");
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = (styles[animationProp + "Delay"] || "").split(", ");
    var animationDurations = (styles[animationProp + "Duration"] || "").split(", ");
    var animationTimeout = getTimeout(animationDelays, animationDurations);
    var type;
    var timeout = 0;
    var propCount = 0;
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + "Property"]);
    return {
      type,
      timeout,
      propCount,
      hasTransform
    };
  }
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
    return Math.max.apply(null, durations.map(function(d, i) {
      return toMs(d) + toMs(delays[i]);
    }));
  }
  function toMs(s) {
    return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function enter(vnode, toggleDisplay) {
    var el = vnode.elm;
    if (isDef(el._leaveCb)) {
      el._leaveCb.cancelled = true;
      el._leaveCb();
    }
    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return;
    }
    if (isDef(el._enterCb) || el.nodeType !== 1) {
      return;
    }
    var css = data.css;
    var type = data.type;
    var enterClass = data.enterClass;
    var enterToClass = data.enterToClass;
    var enterActiveClass = data.enterActiveClass;
    var appearClass = data.appearClass;
    var appearToClass = data.appearToClass;
    var appearActiveClass = data.appearActiveClass;
    var beforeEnter = data.beforeEnter;
    var enter2 = data.enter;
    var afterEnter = data.afterEnter;
    var enterCancelled = data.enterCancelled;
    var beforeAppear = data.beforeAppear;
    var appear = data.appear;
    var afterAppear = data.afterAppear;
    var appearCancelled = data.appearCancelled;
    var duration = data.duration;
    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
      context = transitionNode.context;
      transitionNode = transitionNode.parent;
    }
    var isAppear = !context._isMounted || !vnode.isRootInsert;
    if (isAppear && !appear && appear !== "") {
      return;
    }
    var startClass = isAppear && appearClass ? appearClass : enterClass;
    var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
    var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
    var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
    var enterHook = isAppear ? typeof appear === "function" ? appear : enter2 : enter2;
    var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
    var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
    var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
    if (explicitEnterDuration != null) {
      checkDuration(explicitEnterDuration, "enter", vnode);
    }
    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);
    var cb = el._enterCb = once(function() {
      if (expectsCSS) {
        removeTransitionClass(el, toClass);
        removeTransitionClass(el, activeClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, startClass);
        }
        enterCancelledHook && enterCancelledHook(el);
      } else {
        afterEnterHook && afterEnterHook(el);
      }
      el._enterCb = null;
    });
    if (!vnode.data.show) {
      mergeVNodeHook(vnode, "insert", function() {
        var parent = el.parentNode;
        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
        if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
          pendingNode.elm._leaveCb();
        }
        enterHook && enterHook(el, cb);
      });
    }
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
      addTransitionClass(el, startClass);
      addTransitionClass(el, activeClass);
      nextFrame(function() {
        removeTransitionClass(el, startClass);
        if (!cb.cancelled) {
          addTransitionClass(el, toClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitEnterDuration)) {
              setTimeout(cb, explicitEnterDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    if (vnode.data.show) {
      toggleDisplay && toggleDisplay();
      enterHook && enterHook(el, cb);
    }
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
  function leave(vnode, rm) {
    var el = vnode.elm;
    if (isDef(el._enterCb)) {
      el._enterCb.cancelled = true;
      el._enterCb();
    }
    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data) || el.nodeType !== 1) {
      return rm();
    }
    if (isDef(el._leaveCb)) {
      return;
    }
    var css = data.css;
    var type = data.type;
    var leaveClass = data.leaveClass;
    var leaveToClass = data.leaveToClass;
    var leaveActiveClass = data.leaveActiveClass;
    var beforeLeave = data.beforeLeave;
    var leave2 = data.leave;
    var afterLeave = data.afterLeave;
    var leaveCancelled = data.leaveCancelled;
    var delayLeave = data.delayLeave;
    var duration = data.duration;
    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave2);
    var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
    if (isDef(explicitLeaveDuration)) {
      checkDuration(explicitLeaveDuration, "leave", vnode);
    }
    var cb = el._leaveCb = once(function() {
      if (el.parentNode && el.parentNode._pending) {
        el.parentNode._pending[vnode.key] = null;
      }
      if (expectsCSS) {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, leaveClass);
        }
        leaveCancelled && leaveCancelled(el);
      } else {
        rm();
        afterLeave && afterLeave(el);
      }
      el._leaveCb = null;
    });
    if (delayLeave) {
      delayLeave(performLeave);
    } else {
      performLeave();
    }
    function performLeave() {
      if (cb.cancelled) {
        return;
      }
      if (!vnode.data.show && el.parentNode) {
        (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
      }
      beforeLeave && beforeLeave(el);
      if (expectsCSS) {
        addTransitionClass(el, leaveClass);
        addTransitionClass(el, leaveActiveClass);
        nextFrame(function() {
          removeTransitionClass(el, leaveClass);
          if (!cb.cancelled) {
            addTransitionClass(el, leaveToClass);
            if (!userWantsControl) {
              if (isValidDuration(explicitLeaveDuration)) {
                setTimeout(cb, explicitLeaveDuration);
              } else {
                whenTransitionEnds(el, type, cb);
              }
            }
          }
        });
      }
      leave2 && leave2(el, cb);
      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }
  }
  function checkDuration(val, name, vnode) {
    if (typeof val !== "number") {
      warn("<transition> explicit " + name + " duration is not a valid number - got " + JSON.stringify(val) + ".", vnode.context);
    } else if (isNaN(val)) {
      warn("<transition> explicit " + name + " duration is NaN - the duration expression might be incorrect.", vnode.context);
    }
  }
  function isValidDuration(val) {
    return typeof val === "number" && !isNaN(val);
  }
  function getHookArgumentsLength(fn) {
    if (isUndef(fn)) {
      return false;
    }
    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
      return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
    } else {
      return (fn._length || fn.length) > 1;
    }
  }
  function _enter(_, vnode) {
    if (vnode.data.show !== true) {
      enter(vnode);
    }
  }
  var transition = inBrowser ? {
    create: _enter,
    activate: _enter,
    remove: function remove$$1(vnode, rm) {
      if (vnode.data.show !== true) {
        leave(vnode, rm);
      } else {
        rm();
      }
    }
  } : {};
  var platformModules = [
    attrs,
    klass,
    events,
    domProps,
    style,
    transition
  ];
  var modules = platformModules.concat(baseModules);
  var patch = createPatchFunction({ nodeOps, modules });
  if (isIE9) {
    document.addEventListener("selectionchange", function() {
      var el = document.activeElement;
      if (el && el.vmodel) {
        trigger(el, "input");
      }
    });
  }
  var directive = {
    inserted: function inserted(el, binding, vnode, oldVnode) {
      if (vnode.tag === "select") {
        if (oldVnode.elm && !oldVnode.elm._vOptions) {
          mergeVNodeHook(vnode, "postpatch", function() {
            directive.componentUpdated(el, binding, vnode);
          });
        } else {
          setSelected(el, binding, vnode.context);
        }
        el._vOptions = [].map.call(el.options, getValue);
      } else if (vnode.tag === "textarea" || isTextInputType(el.type)) {
        el._vModifiers = binding.modifiers;
        if (!binding.modifiers.lazy) {
          el.addEventListener("compositionstart", onCompositionStart);
          el.addEventListener("compositionend", onCompositionEnd);
          el.addEventListener("change", onCompositionEnd);
          if (isIE9) {
            el.vmodel = true;
          }
        }
      }
    },
    componentUpdated: function componentUpdated(el, binding, vnode) {
      if (vnode.tag === "select") {
        setSelected(el, binding, vnode.context);
        var prevOptions = el._vOptions;
        var curOptions = el._vOptions = [].map.call(el.options, getValue);
        if (curOptions.some(function(o, i) {
          return !looseEqual(o, prevOptions[i]);
        })) {
          var needReset = el.multiple ? binding.value.some(function(v) {
            return hasNoMatchingOption(v, curOptions);
          }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
          if (needReset) {
            trigger(el, "change");
          }
        }
      }
    }
  };
  function setSelected(el, binding, vm) {
    actuallySetSelected(el, binding, vm);
    if (isIE || isEdge) {
      setTimeout(function() {
        actuallySetSelected(el, binding, vm);
      }, 0);
    }
  }
  function actuallySetSelected(el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
      warn('<select multiple v-model="' + binding.expression + '"> expects an Array value for its binding, but got ' + Object.prototype.toString.call(value).slice(8, -1), vm);
      return;
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
      option = el.options[i];
      if (isMultiple) {
        selected = looseIndexOf(value, getValue(option)) > -1;
        if (option.selected !== selected) {
          option.selected = selected;
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i) {
            el.selectedIndex = i;
          }
          return;
        }
      }
    }
    if (!isMultiple) {
      el.selectedIndex = -1;
    }
  }
  function hasNoMatchingOption(value, options) {
    return options.every(function(o) {
      return !looseEqual(o, value);
    });
  }
  function getValue(option) {
    return "_value" in option ? option._value : option.value;
  }
  function onCompositionStart(e) {
    e.target.composing = true;
  }
  function onCompositionEnd(e) {
    if (!e.target.composing) {
      return;
    }
    e.target.composing = false;
    trigger(e.target, "input");
  }
  function trigger(el, type) {
    var e = document.createEvent("HTMLEvents");
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  }
  function locateNode(vnode) {
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
  }
  var show = {
    bind: function bind2(el, ref2, vnode) {
      var value = ref2.value;
      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      var originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
      if (value && transition$$1) {
        vnode.data.show = true;
        enter(vnode, function() {
          el.style.display = originalDisplay;
        });
      } else {
        el.style.display = value ? originalDisplay : "none";
      }
    },
    update: function update3(el, ref2, vnode) {
      var value = ref2.value;
      var oldValue = ref2.oldValue;
      if (!value === !oldValue) {
        return;
      }
      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      if (transition$$1) {
        vnode.data.show = true;
        if (value) {
          enter(vnode, function() {
            el.style.display = el.__vOriginalDisplay;
          });
        } else {
          leave(vnode, function() {
            el.style.display = "none";
          });
        }
      } else {
        el.style.display = value ? el.__vOriginalDisplay : "none";
      }
    },
    unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
      if (!isDestroy) {
        el.style.display = el.__vOriginalDisplay;
      }
    }
  };
  var platformDirectives = {
    model: directive,
    show
  };
  var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
  };
  function getRealChild(vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
      return getRealChild(getFirstComponentChild(compOptions.children));
    } else {
      return vnode;
    }
  }
  function extractTransitionData(comp) {
    var data = {};
    var options = comp.$options;
    for (var key in options.propsData) {
      data[key] = comp[key];
    }
    var listeners = options._parentListeners;
    for (var key$1 in listeners) {
      data[camelize(key$1)] = listeners[key$1];
    }
    return data;
  }
  function placeholder(h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
      return h("keep-alive", {
        props: rawChild.componentOptions.propsData
      });
    }
  }
  function hasParentTransition(vnode) {
    while (vnode = vnode.parent) {
      if (vnode.data.transition) {
        return true;
      }
    }
  }
  function isSameChild(child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag;
  }
  var isNotTextNode = function(c) {
    return c.tag || isAsyncPlaceholder(c);
  };
  var isVShowDirective = function(d) {
    return d.name === "show";
  };
  var Transition = {
    name: "transition",
    props: transitionProps,
    abstract: true,
    render: function render2(h) {
      var this$1 = this;
      var children = this.$slots.default;
      if (!children) {
        return;
      }
      children = children.filter(isNotTextNode);
      if (!children.length) {
        return;
      }
      if (children.length > 1) {
        warn("<transition> can only be used on a single element. Use <transition-group> for lists.", this.$parent);
      }
      var mode = this.mode;
      if (mode && mode !== "in-out" && mode !== "out-in") {
        warn("invalid <transition> mode: " + mode, this.$parent);
      }
      var rawChild = children[0];
      if (hasParentTransition(this.$vnode)) {
        return rawChild;
      }
      var child = getRealChild(rawChild);
      if (!child) {
        return rawChild;
      }
      if (this._leaving) {
        return placeholder(h, rawChild);
      }
      var id = "__transition-" + this._uid + "-";
      child.key = child.key == null ? child.isComment ? id + "comment" : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
      var oldRawChild = this._vnode;
      var oldChild = getRealChild(oldRawChild);
      if (child.data.directives && child.data.directives.some(isVShowDirective)) {
        child.data.show = true;
      }
      if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
        var oldData = oldChild.data.transition = extend({}, data);
        if (mode === "out-in") {
          this._leaving = true;
          mergeVNodeHook(oldData, "afterLeave", function() {
            this$1._leaving = false;
            this$1.$forceUpdate();
          });
          return placeholder(h, rawChild);
        } else if (mode === "in-out") {
          if (isAsyncPlaceholder(child)) {
            return oldRawChild;
          }
          var delayedLeave;
          var performLeave = function() {
            delayedLeave();
          };
          mergeVNodeHook(data, "afterEnter", performLeave);
          mergeVNodeHook(data, "enterCancelled", performLeave);
          mergeVNodeHook(oldData, "delayLeave", function(leave2) {
            delayedLeave = leave2;
          });
        }
      }
      return rawChild;
    }
  };
  var props = extend({
    tag: String,
    moveClass: String
  }, transitionProps);
  delete props.mode;
  var TransitionGroup = {
    props,
    beforeMount: function beforeMount() {
      var this$1 = this;
      var update4 = this._update;
      this._update = function(vnode, hydrating) {
        var restoreActiveInstance = setActiveInstance(this$1);
        this$1.__patch__(this$1._vnode, this$1.kept, false, true);
        this$1._vnode = this$1.kept;
        restoreActiveInstance();
        update4.call(this$1, vnode, hydrating);
      };
    },
    render: function render3(h) {
      var tag = this.tag || this.$vnode.data.tag || "span";
      var map = /* @__PURE__ */ Object.create(null);
      var prevChildren = this.prevChildren = this.children;
      var rawChildren = this.$slots.default || [];
      var children = this.children = [];
      var transitionData = extractTransitionData(this);
      for (var i = 0; i < rawChildren.length; i++) {
        var c = rawChildren[i];
        if (c.tag) {
          if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
            children.push(c);
            map[c.key] = c;
            (c.data || (c.data = {})).transition = transitionData;
          } else if (true) {
            var opts = c.componentOptions;
            var name = opts ? opts.Ctor.options.name || opts.tag || "" : c.tag;
            warn("<transition-group> children must be keyed: <" + name + ">");
          }
        }
      }
      if (prevChildren) {
        var kept = [];
        var removed = [];
        for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
          var c$1 = prevChildren[i$1];
          c$1.data.transition = transitionData;
          c$1.data.pos = c$1.elm.getBoundingClientRect();
          if (map[c$1.key]) {
            kept.push(c$1);
          } else {
            removed.push(c$1);
          }
        }
        this.kept = h(tag, null, kept);
        this.removed = removed;
      }
      return h(tag, null, children);
    },
    updated: function updated2() {
      var children = this.prevChildren;
      var moveClass = this.moveClass || (this.name || "v") + "-move";
      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
        return;
      }
      children.forEach(callPendingCbs);
      children.forEach(recordPosition);
      children.forEach(applyTranslation);
      this._reflow = document.body.offsetHeight;
      children.forEach(function(c) {
        if (c.data.moved) {
          var el = c.elm;
          var s = el.style;
          addTransitionClass(el, moveClass);
          s.transform = s.WebkitTransform = s.transitionDuration = "";
          el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
            if (e && e.target !== el) {
              return;
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent, cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          });
        }
      });
    },
    methods: {
      hasMove: function hasMove(el, moveClass) {
        if (!hasTransition) {
          return false;
        }
        if (this._hasMove) {
          return this._hasMove;
        }
        var clone2 = el.cloneNode();
        if (el._transitionClasses) {
          el._transitionClasses.forEach(function(cls) {
            removeClass(clone2, cls);
          });
        }
        addClass(clone2, moveClass);
        clone2.style.display = "none";
        this.$el.appendChild(clone2);
        var info = getTransitionInfo(clone2);
        this.$el.removeChild(clone2);
        return this._hasMove = info.hasTransform;
      }
    }
  };
  function callPendingCbs(c) {
    if (c.elm._moveCb) {
      c.elm._moveCb();
    }
    if (c.elm._enterCb) {
      c.elm._enterCb();
    }
  }
  function recordPosition(c) {
    c.data.newPos = c.elm.getBoundingClientRect();
  }
  function applyTranslation(c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
      c.data.moved = true;
      var s = c.elm.style;
      s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
      s.transitionDuration = "0s";
    }
  }
  var platformComponents = {
    Transition,
    TransitionGroup
  };
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;
  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);
  Vue.prototype.__patch__ = inBrowser ? patch : noop;
  Vue.prototype.$mount = function(el, hydrating) {
    el = el && inBrowser ? query(el) : void 0;
    return mountComponent(this, el, hydrating);
  };
  if (inBrowser) {
    setTimeout(function() {
      if (config.devtools) {
        if (devtools) {
          devtools.emit("init", Vue);
        } else if (true) {
          console[console.info ? "info" : "log"]("Download the Vue Devtools extension for a better development experience:\nhttps://github.com/vuejs/vue-devtools");
        }
      }
      if (config.productionTip !== false && typeof console !== "undefined") {
        console[console.info ? "info" : "log"]("You are running Vue in development mode.\nMake sure to turn on production mode when deploying for production.\nSee more tips at https://vuejs.org/guide/deployment.html");
      }
    }, 0);
  }
  var vue_runtime_esm_default = Vue;

  // node_modules/vue-router/dist/vue-router.esm.js
  function assert(condition, message) {
    if (!condition) {
      throw new Error("[vue-router] " + message);
    }
  }
  function warn2(condition, message) {
    if (!condition) {
      typeof console !== "undefined" && console.warn("[vue-router] " + message);
    }
  }
  function isError(err) {
    return Object.prototype.toString.call(err).indexOf("Error") > -1;
  }
  var View = {
    name: "router-view",
    functional: true,
    props: {
      name: {
        type: String,
        default: "default"
      }
    },
    render: function render4(_, ref2) {
      var props2 = ref2.props;
      var children = ref2.children;
      var parent = ref2.parent;
      var data = ref2.data;
      data.routerView = true;
      var h = parent.$createElement;
      var name = props2.name;
      var route = parent.$route;
      var cache = parent._routerViewCache || (parent._routerViewCache = {});
      var depth = 0;
      var inactive = false;
      while (parent && parent._routerRoot !== parent) {
        if (parent.$vnode && parent.$vnode.data.routerView) {
          depth++;
        }
        if (parent._inactive) {
          inactive = true;
        }
        parent = parent.$parent;
      }
      data.routerViewDepth = depth;
      if (inactive) {
        return h(cache[name], data, children);
      }
      var matched = route.matched[depth];
      if (!matched) {
        cache[name] = null;
        return h();
      }
      var component = cache[name] = matched.components[name];
      data.registerRouteInstance = function(vm, val) {
        var current = matched.instances[name];
        if (val && current !== vm || !val && current === vm) {
          matched.instances[name] = val;
        }
      };
      (data.hook || (data.hook = {})).prepatch = function(_2, vnode) {
        matched.instances[name] = vnode.componentInstance;
      };
      var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
      if (propsToPass) {
        propsToPass = data.props = extend2({}, propsToPass);
        var attrs2 = data.attrs = data.attrs || {};
        for (var key in propsToPass) {
          if (!component.props || !(key in component.props)) {
            attrs2[key] = propsToPass[key];
            delete propsToPass[key];
          }
        }
      }
      return h(component, data, children);
    }
  };
  function resolveProps(route, config2) {
    switch (typeof config2) {
      case "undefined":
        return;
      case "object":
        return config2;
      case "function":
        return config2(route);
      case "boolean":
        return config2 ? route.params : void 0;
      default:
        if (true) {
          warn2(false, 'props in "' + route.path + '" is a ' + typeof config2 + ", expecting an object, function or boolean.");
        }
    }
  }
  function extend2(to, from) {
    for (var key in from) {
      to[key] = from[key];
    }
    return to;
  }
  var encodeReserveRE = /[!'()*]/g;
  var encodeReserveReplacer = function(c) {
    return "%" + c.charCodeAt(0).toString(16);
  };
  var commaRE = /%2C/g;
  var encode = function(str) {
    return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ",");
  };
  var decode = decodeURIComponent;
  function resolveQuery(query2, extraQuery, _parseQuery) {
    if (extraQuery === void 0)
      extraQuery = {};
    var parse2 = _parseQuery || parseQuery;
    var parsedQuery;
    try {
      parsedQuery = parse2(query2 || "");
    } catch (e) {
      warn2(false, e.message);
      parsedQuery = {};
    }
    for (var key in extraQuery) {
      parsedQuery[key] = extraQuery[key];
    }
    return parsedQuery;
  }
  function parseQuery(query2) {
    var res = {};
    query2 = query2.trim().replace(/^(\?|#|&)/, "");
    if (!query2) {
      return res;
    }
    query2.split("&").forEach(function(param) {
      var parts = param.replace(/\+/g, " ").split("=");
      var key = decode(parts.shift());
      var val = parts.length > 0 ? decode(parts.join("=")) : null;
      if (res[key] === void 0) {
        res[key] = val;
      } else if (Array.isArray(res[key])) {
        res[key].push(val);
      } else {
        res[key] = [res[key], val];
      }
    });
    return res;
  }
  function stringifyQuery(obj) {
    var res = obj ? Object.keys(obj).map(function(key) {
      var val = obj[key];
      if (val === void 0) {
        return "";
      }
      if (val === null) {
        return encode(key);
      }
      if (Array.isArray(val)) {
        var result = [];
        val.forEach(function(val2) {
          if (val2 === void 0) {
            return;
          }
          if (val2 === null) {
            result.push(encode(key));
          } else {
            result.push(encode(key) + "=" + encode(val2));
          }
        });
        return result.join("&");
      }
      return encode(key) + "=" + encode(val);
    }).filter(function(x) {
      return x.length > 0;
    }).join("&") : null;
    return res ? "?" + res : "";
  }
  var trailingSlashRE = /\/?$/;
  function createRoute(record, location, redirectedFrom, router) {
    var stringifyQuery$$1 = router && router.options.stringifyQuery;
    var query2 = location.query || {};
    try {
      query2 = clone(query2);
    } catch (e) {
    }
    var route = {
      name: location.name || record && record.name,
      meta: record && record.meta || {},
      path: location.path || "/",
      hash: location.hash || "",
      query: query2,
      params: location.params || {},
      fullPath: getFullPath(location, stringifyQuery$$1),
      matched: record ? formatMatch(record) : []
    };
    if (redirectedFrom) {
      route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
    }
    return Object.freeze(route);
  }
  function clone(value) {
    if (Array.isArray(value)) {
      return value.map(clone);
    } else if (value && typeof value === "object") {
      var res = {};
      for (var key in value) {
        res[key] = clone(value[key]);
      }
      return res;
    } else {
      return value;
    }
  }
  var START = createRoute(null, {
    path: "/"
  });
  function formatMatch(record) {
    var res = [];
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
    return res;
  }
  function getFullPath(ref2, _stringifyQuery) {
    var path = ref2.path;
    var query2 = ref2.query;
    if (query2 === void 0)
      query2 = {};
    var hash = ref2.hash;
    if (hash === void 0)
      hash = "";
    var stringify = _stringifyQuery || stringifyQuery;
    return (path || "/") + stringify(query2) + hash;
  }
  function isSameRoute(a, b) {
    if (b === START) {
      return a === b;
    } else if (!b) {
      return false;
    } else if (a.path && b.path) {
      return a.path.replace(trailingSlashRE, "") === b.path.replace(trailingSlashRE, "") && a.hash === b.hash && isObjectEqual(a.query, b.query);
    } else if (a.name && b.name) {
      return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
    } else {
      return false;
    }
  }
  function isObjectEqual(a, b) {
    if (a === void 0)
      a = {};
    if (b === void 0)
      b = {};
    if (!a || !b) {
      return a === b;
    }
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    return aKeys.every(function(key) {
      var aVal = a[key];
      var bVal = b[key];
      if (typeof aVal === "object" && typeof bVal === "object") {
        return isObjectEqual(aVal, bVal);
      }
      return String(aVal) === String(bVal);
    });
  }
  function isIncludedRoute(current, target2) {
    return current.path.replace(trailingSlashRE, "/").indexOf(target2.path.replace(trailingSlashRE, "/")) === 0 && (!target2.hash || current.hash === target2.hash) && queryIncludes(current.query, target2.query);
  }
  function queryIncludes(current, target2) {
    for (var key in target2) {
      if (!(key in current)) {
        return false;
      }
    }
    return true;
  }
  var toTypes = [String, Object];
  var eventTypes = [String, Array];
  var Link = {
    name: "router-link",
    props: {
      to: {
        type: toTypes,
        required: true
      },
      tag: {
        type: String,
        default: "a"
      },
      exact: Boolean,
      append: Boolean,
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      event: {
        type: eventTypes,
        default: "click"
      }
    },
    render: function render5(h) {
      var this$1 = this;
      var router = this.$router;
      var current = this.$route;
      var ref2 = router.resolve(this.to, current, this.append);
      var location = ref2.location;
      var route = ref2.route;
      var href = ref2.href;
      var classes = {};
      var globalActiveClass = router.options.linkActiveClass;
      var globalExactActiveClass = router.options.linkExactActiveClass;
      var activeClassFallback = globalActiveClass == null ? "router-link-active" : globalActiveClass;
      var exactActiveClassFallback = globalExactActiveClass == null ? "router-link-exact-active" : globalExactActiveClass;
      var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
      var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
      var compareTarget = location.path ? createRoute(null, location, null, router) : route;
      classes[exactActiveClass] = isSameRoute(current, compareTarget);
      classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);
      var handler = function(e) {
        if (guardEvent(e)) {
          if (this$1.replace) {
            router.replace(location);
          } else {
            router.push(location);
          }
        }
      };
      var on = { click: guardEvent };
      if (Array.isArray(this.event)) {
        this.event.forEach(function(e) {
          on[e] = handler;
        });
      } else {
        on[this.event] = handler;
      }
      var data = {
        class: classes
      };
      if (this.tag === "a") {
        data.on = on;
        data.attrs = { href };
      } else {
        var a = findAnchor(this.$slots.default);
        if (a) {
          a.isStatic = false;
          var extend3 = _Vue.util.extend;
          var aData = a.data = extend3({}, a.data);
          aData.on = on;
          var aAttrs = a.data.attrs = extend3({}, a.data.attrs);
          aAttrs.href = href;
        } else {
          data.on = on;
        }
      }
      return h(this.tag, data, this.$slots.default);
    }
  };
  function guardEvent(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
      return;
    }
    if (e.defaultPrevented) {
      return;
    }
    if (e.button !== void 0 && e.button !== 0) {
      return;
    }
    if (e.currentTarget && e.currentTarget.getAttribute) {
      var target2 = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(target2)) {
        return;
      }
    }
    if (e.preventDefault) {
      e.preventDefault();
    }
    return true;
  }
  function findAnchor(children) {
    if (children) {
      var child;
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        if (child.tag === "a") {
          return child;
        }
        if (child.children && (child = findAnchor(child.children))) {
          return child;
        }
      }
    }
  }
  var _Vue;
  function install(Vue2) {
    if (install.installed && _Vue === Vue2) {
      return;
    }
    install.installed = true;
    _Vue = Vue2;
    var isDef2 = function(v) {
      return v !== void 0;
    };
    var registerInstance = function(vm, callVal) {
      var i = vm.$options._parentVnode;
      if (isDef2(i) && isDef2(i = i.data) && isDef2(i = i.registerRouteInstance)) {
        i(vm, callVal);
      }
    };
    Vue2.mixin({
      beforeCreate: function beforeCreate() {
        if (isDef2(this.$options.router)) {
          this._routerRoot = this;
          this._router = this.$options.router;
          this._router.init(this);
          Vue2.util.defineReactive(this, "_route", this._router.history.current);
        } else {
          this._routerRoot = this.$parent && this.$parent._routerRoot || this;
        }
        registerInstance(this, this);
      },
      destroyed: function destroyed2() {
        registerInstance(this);
      }
    });
    Object.defineProperty(Vue2.prototype, "$router", {
      get: function get3() {
        return this._routerRoot._router;
      }
    });
    Object.defineProperty(Vue2.prototype, "$route", {
      get: function get3() {
        return this._routerRoot._route;
      }
    });
    Vue2.component("router-view", View);
    Vue2.component("router-link", Link);
    var strats2 = Vue2.config.optionMergeStrategies;
    strats2.beforeRouteEnter = strats2.beforeRouteLeave = strats2.beforeRouteUpdate = strats2.created;
  }
  var inBrowser2 = typeof window !== "undefined";
  function resolvePath(relative, base, append) {
    var firstChar = relative.charAt(0);
    if (firstChar === "/") {
      return relative;
    }
    if (firstChar === "?" || firstChar === "#") {
      return base + relative;
    }
    var stack = base.split("/");
    if (!append || !stack[stack.length - 1]) {
      stack.pop();
    }
    var segments = relative.replace(/^\//, "").split("/");
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];
      if (segment === "..") {
        stack.pop();
      } else if (segment !== ".") {
        stack.push(segment);
      }
    }
    if (stack[0] !== "") {
      stack.unshift("");
    }
    return stack.join("/");
  }
  function parsePath2(path) {
    var hash = "";
    var query2 = "";
    var hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      hash = path.slice(hashIndex);
      path = path.slice(0, hashIndex);
    }
    var queryIndex = path.indexOf("?");
    if (queryIndex >= 0) {
      query2 = path.slice(queryIndex + 1);
      path = path.slice(0, queryIndex);
    }
    return {
      path,
      query: query2,
      hash
    };
  }
  function cleanPath(path) {
    return path.replace(/\/\//g, "/");
  }
  var isarray = Array.isArray || function(arr) {
    return Object.prototype.toString.call(arr) == "[object Array]";
  };
  var pathToRegexp_1 = pathToRegexp;
  var parse_1 = parse;
  var compile_1 = compile;
  var tokensToFunction_1 = tokensToFunction;
  var tokensToRegExp_1 = tokensToRegExp;
  var PATH_REGEXP = new RegExp([
    "(\\\\.)",
    "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
  ].join("|"), "g");
  function parse(str, options) {
    var tokens = [];
    var key = 0;
    var index2 = 0;
    var path = "";
    var defaultDelimiter = options && options.delimiter || "/";
    var res;
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0];
      var escaped = res[1];
      var offset = res.index;
      path += str.slice(index2, offset);
      index2 = offset + m.length;
      if (escaped) {
        path += escaped[1];
        continue;
      }
      var next = str[index2];
      var prefix = res[2];
      var name = res[3];
      var capture = res[4];
      var group = res[5];
      var modifier = res[6];
      var asterisk = res[7];
      if (path) {
        tokens.push(path);
        path = "";
      }
      var partial = prefix != null && next != null && next !== prefix;
      var repeat = modifier === "+" || modifier === "*";
      var optional = modifier === "?" || modifier === "*";
      var delimiter = res[2] || defaultDelimiter;
      var pattern = capture || group;
      tokens.push({
        name: name || key++,
        prefix: prefix || "",
        delimiter,
        optional,
        repeat,
        partial,
        asterisk: !!asterisk,
        pattern: pattern ? escapeGroup(pattern) : asterisk ? ".*" : "[^" + escapeString(delimiter) + "]+?"
      });
    }
    if (index2 < str.length) {
      path += str.substr(index2);
    }
    if (path) {
      tokens.push(path);
    }
    return tokens;
  }
  function compile(str, options) {
    return tokensToFunction(parse(str, options));
  }
  function encodeURIComponentPretty(str) {
    return encodeURI(str).replace(/[\/?#]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }
  function encodeAsterisk(str) {
    return encodeURI(str).replace(/[?#]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }
  function tokensToFunction(tokens) {
    var matches2 = new Array(tokens.length);
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === "object") {
        matches2[i] = new RegExp("^(?:" + tokens[i].pattern + ")$");
      }
    }
    return function(obj, opts) {
      var path = "";
      var data = obj || {};
      var options = opts || {};
      var encode2 = options.pretty ? encodeURIComponentPretty : encodeURIComponent;
      for (var i2 = 0; i2 < tokens.length; i2++) {
        var token = tokens[i2];
        if (typeof token === "string") {
          path += token;
          continue;
        }
        var value = data[token.name];
        var segment;
        if (value == null) {
          if (token.optional) {
            if (token.partial) {
              path += token.prefix;
            }
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined');
          }
        }
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + "`");
          }
          if (value.length === 0) {
            if (token.optional) {
              continue;
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty');
            }
          }
          for (var j = 0; j < value.length; j++) {
            segment = encode2(value[j]);
            if (!matches2[i2].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + "`");
            }
            path += (j === 0 ? token.prefix : token.delimiter) + segment;
          }
          continue;
        }
        segment = token.asterisk ? encodeAsterisk(value) : encode2(value);
        if (!matches2[i2].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
        }
        path += token.prefix + segment;
      }
      return path;
    };
  }
  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
  }
  function escapeGroup(group) {
    return group.replace(/([=!:$\/()])/g, "\\$1");
  }
  function attachKeys(re, keys) {
    re.keys = keys;
    return re;
  }
  function flags(options) {
    return options.sensitive ? "" : "i";
  }
  function regexpToRegexp(path, keys) {
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          partial: false,
          asterisk: false,
          pattern: null
        });
      }
    }
    return attachKeys(path, keys);
  }
  function arrayToRegexp(path, keys, options) {
    var parts = [];
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source);
    }
    var regexp = new RegExp("(?:" + parts.join("|") + ")", flags(options));
    return attachKeys(regexp, keys);
  }
  function stringToRegexp(path, keys, options) {
    return tokensToRegExp(parse(path, options), keys, options);
  }
  function tokensToRegExp(tokens, keys, options) {
    if (!isarray(keys)) {
      options = keys || options;
      keys = [];
    }
    options = options || {};
    var strict = options.strict;
    var end = options.end !== false;
    var route = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        route += escapeString(token);
      } else {
        var prefix = escapeString(token.prefix);
        var capture = "(?:" + token.pattern + ")";
        keys.push(token);
        if (token.repeat) {
          capture += "(?:" + prefix + capture + ")*";
        }
        if (token.optional) {
          if (!token.partial) {
            capture = "(?:" + prefix + "(" + capture + "))?";
          } else {
            capture = prefix + "(" + capture + ")?";
          }
        } else {
          capture = prefix + "(" + capture + ")";
        }
        route += capture;
      }
    }
    var delimiter = escapeString(options.delimiter || "/");
    var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;
    if (!strict) {
      route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + "(?:" + delimiter + "(?=$))?";
    }
    if (end) {
      route += "$";
    } else {
      route += strict && endsWithDelimiter ? "" : "(?=" + delimiter + "|$)";
    }
    return attachKeys(new RegExp("^" + route, flags(options)), keys);
  }
  function pathToRegexp(path, keys, options) {
    if (!isarray(keys)) {
      options = keys || options;
      keys = [];
    }
    options = options || {};
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys);
    }
    if (isarray(path)) {
      return arrayToRegexp(path, keys, options);
    }
    return stringToRegexp(path, keys, options);
  }
  pathToRegexp_1.parse = parse_1;
  pathToRegexp_1.compile = compile_1;
  pathToRegexp_1.tokensToFunction = tokensToFunction_1;
  pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;
  var regexpCompileCache = /* @__PURE__ */ Object.create(null);
  function fillParams(path, params, routeMsg) {
    try {
      var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path));
      return filler(params || {}, { pretty: true });
    } catch (e) {
      if (true) {
        warn2(false, "missing param for " + routeMsg + ": " + e.message);
      }
      return "";
    }
  }
  function createRouteMap(routes2, oldPathList, oldPathMap, oldNameMap) {
    var pathList = oldPathList || [];
    var pathMap = oldPathMap || /* @__PURE__ */ Object.create(null);
    var nameMap = oldNameMap || /* @__PURE__ */ Object.create(null);
    routes2.forEach(function(route) {
      addRouteRecord(pathList, pathMap, nameMap, route);
    });
    for (var i = 0, l = pathList.length; i < l; i++) {
      if (pathList[i] === "*") {
        pathList.push(pathList.splice(i, 1)[0]);
        l--;
        i--;
      }
    }
    return {
      pathList,
      pathMap,
      nameMap
    };
  }
  function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
    var path = route.path;
    var name = route.name;
    if (true) {
      assert(path != null, '"path" is required in a route configuration.');
      assert(typeof route.component !== "string", 'route config "component" for path: ' + String(path || name) + " cannot be a string id. Use an actual component instead.");
    }
    var pathToRegexpOptions = route.pathToRegexpOptions || {};
    var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);
    if (typeof route.caseSensitive === "boolean") {
      pathToRegexpOptions.sensitive = route.caseSensitive;
    }
    var record = {
      path: normalizedPath,
      regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
      components: route.components || { default: route.component },
      instances: {},
      name,
      parent,
      matchAs,
      redirect: route.redirect,
      beforeEnter: route.beforeEnter,
      meta: route.meta || {},
      props: route.props == null ? {} : route.components ? route.props : { default: route.props }
    };
    if (route.children) {
      if (true) {
        if (route.name && !route.redirect && route.children.some(function(child) {
          return /^\/?$/.test(child.path);
        })) {
          warn2(false, "Named Route '" + route.name + `' has a default child route. When navigating to this named route (:to="{name: '` + route.name + `'"), the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead.`);
        }
      }
      route.children.forEach(function(child) {
        var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : void 0;
        addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
      });
    }
    if (route.alias !== void 0) {
      var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
      aliases.forEach(function(alias) {
        var aliasRoute = {
          path: alias,
          children: route.children
        };
        addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path || "/");
      });
    }
    if (!pathMap[record.path]) {
      pathList.push(record.path);
      pathMap[record.path] = record;
    }
    if (name) {
      if (!nameMap[name]) {
        nameMap[name] = record;
      } else if (!matchAs) {
        warn2(false, 'Duplicate named routes definition: { name: "' + name + '", path: "' + record.path + '" }');
      }
    }
  }
  function compileRouteRegex(path, pathToRegexpOptions) {
    var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
    if (true) {
      var keys = /* @__PURE__ */ Object.create(null);
      regex.keys.forEach(function(key) {
        warn2(!keys[key.name], 'Duplicate param keys in route with path: "' + path + '"');
        keys[key.name] = true;
      });
    }
    return regex;
  }
  function normalizePath(path, parent, strict) {
    if (!strict) {
      path = path.replace(/\/$/, "");
    }
    if (path[0] === "/") {
      return path;
    }
    if (parent == null) {
      return path;
    }
    return cleanPath(parent.path + "/" + path);
  }
  function normalizeLocation(raw, current, append, router) {
    var next = typeof raw === "string" ? { path: raw } : raw;
    if (next.name || next._normalized) {
      return next;
    }
    if (!next.path && next.params && current) {
      next = assign({}, next);
      next._normalized = true;
      var params = assign(assign({}, current.params), next.params);
      if (current.name) {
        next.name = current.name;
        next.params = params;
      } else if (current.matched.length) {
        var rawPath = current.matched[current.matched.length - 1].path;
        next.path = fillParams(rawPath, params, "path " + current.path);
      } else if (true) {
        warn2(false, "relative params navigation requires a current route.");
      }
      return next;
    }
    var parsedPath = parsePath2(next.path || "");
    var basePath = current && current.path || "/";
    var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;
    var query2 = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);
    var hash = next.hash || parsedPath.hash;
    if (hash && hash.charAt(0) !== "#") {
      hash = "#" + hash;
    }
    return {
      _normalized: true,
      path,
      query: query2,
      hash
    };
  }
  function assign(a, b) {
    for (var key in b) {
      a[key] = b[key];
    }
    return a;
  }
  function createMatcher(routes2, router) {
    var ref2 = createRouteMap(routes2);
    var pathList = ref2.pathList;
    var pathMap = ref2.pathMap;
    var nameMap = ref2.nameMap;
    function addRoutes2(routes3) {
      createRouteMap(routes3, pathList, pathMap, nameMap);
    }
    function match2(raw, currentRoute, redirectedFrom) {
      var location = normalizeLocation(raw, currentRoute, false, router);
      var name = location.name;
      if (name) {
        var record = nameMap[name];
        if (true) {
          warn2(record, "Route with name '" + name + "' does not exist");
        }
        if (!record) {
          return _createRoute(null, location);
        }
        var paramNames = record.regex.keys.filter(function(key2) {
          return !key2.optional;
        }).map(function(key2) {
          return key2.name;
        });
        if (typeof location.params !== "object") {
          location.params = {};
        }
        if (currentRoute && typeof currentRoute.params === "object") {
          for (var key in currentRoute.params) {
            if (!(key in location.params) && paramNames.indexOf(key) > -1) {
              location.params[key] = currentRoute.params[key];
            }
          }
        }
        if (record) {
          location.path = fillParams(record.path, location.params, 'named route "' + name + '"');
          return _createRoute(record, location, redirectedFrom);
        }
      } else if (location.path) {
        location.params = {};
        for (var i = 0; i < pathList.length; i++) {
          var path = pathList[i];
          var record$1 = pathMap[path];
          if (matchRoute(record$1.regex, location.path, location.params)) {
            return _createRoute(record$1, location, redirectedFrom);
          }
        }
      }
      return _createRoute(null, location);
    }
    function redirect(record, location) {
      var originalRedirect = record.redirect;
      var redirect2 = typeof originalRedirect === "function" ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;
      if (typeof redirect2 === "string") {
        redirect2 = { path: redirect2 };
      }
      if (!redirect2 || typeof redirect2 !== "object") {
        if (true) {
          warn2(false, "invalid redirect option: " + JSON.stringify(redirect2));
        }
        return _createRoute(null, location);
      }
      var re = redirect2;
      var name = re.name;
      var path = re.path;
      var query2 = location.query;
      var hash = location.hash;
      var params = location.params;
      query2 = re.hasOwnProperty("query") ? re.query : query2;
      hash = re.hasOwnProperty("hash") ? re.hash : hash;
      params = re.hasOwnProperty("params") ? re.params : params;
      if (name) {
        var targetRecord = nameMap[name];
        if (true) {
          assert(targetRecord, 'redirect failed: named route "' + name + '" not found.');
        }
        return match2({
          _normalized: true,
          name,
          query: query2,
          hash,
          params
        }, void 0, location);
      } else if (path) {
        var rawPath = resolveRecordPath(path, record);
        var resolvedPath = fillParams(rawPath, params, 'redirect route with path "' + rawPath + '"');
        return match2({
          _normalized: true,
          path: resolvedPath,
          query: query2,
          hash
        }, void 0, location);
      } else {
        if (true) {
          warn2(false, "invalid redirect option: " + JSON.stringify(redirect2));
        }
        return _createRoute(null, location);
      }
    }
    function alias(record, location, matchAs) {
      var aliasedPath = fillParams(matchAs, location.params, 'aliased route with path "' + matchAs + '"');
      var aliasedMatch = match2({
        _normalized: true,
        path: aliasedPath
      });
      if (aliasedMatch) {
        var matched = aliasedMatch.matched;
        var aliasedRecord = matched[matched.length - 1];
        location.params = aliasedMatch.params;
        return _createRoute(aliasedRecord, location);
      }
      return _createRoute(null, location);
    }
    function _createRoute(record, location, redirectedFrom) {
      if (record && record.redirect) {
        return redirect(record, redirectedFrom || location);
      }
      if (record && record.matchAs) {
        return alias(record, location, record.matchAs);
      }
      return createRoute(record, location, redirectedFrom, router);
    }
    return {
      match: match2,
      addRoutes: addRoutes2
    };
  }
  function matchRoute(regex, path, params) {
    var m = path.match(regex);
    if (!m) {
      return false;
    } else if (!params) {
      return true;
    }
    for (var i = 1, len = m.length; i < len; ++i) {
      var key = regex.keys[i - 1];
      var val = typeof m[i] === "string" ? decodeURIComponent(m[i]) : m[i];
      if (key) {
        params[key.name] = val;
      }
    }
    return true;
  }
  function resolveRecordPath(path, record) {
    return resolvePath(path, record.parent ? record.parent.path : "/", true);
  }
  var positionStore = /* @__PURE__ */ Object.create(null);
  function setupScroll() {
    window.history.replaceState({ key: getStateKey() }, "");
    window.addEventListener("popstate", function(e) {
      saveScrollPosition();
      if (e.state && e.state.key) {
        setStateKey(e.state.key);
      }
    });
  }
  function handleScroll(router, to, from, isPop) {
    if (!router.app) {
      return;
    }
    var behavior = router.options.scrollBehavior;
    if (!behavior) {
      return;
    }
    if (true) {
      assert(typeof behavior === "function", "scrollBehavior must be a function");
    }
    router.app.$nextTick(function() {
      var position = getScrollPosition();
      var shouldScroll = behavior(to, from, isPop ? position : null);
      if (!shouldScroll) {
        return;
      }
      if (typeof shouldScroll.then === "function") {
        shouldScroll.then(function(shouldScroll2) {
          scrollToPosition(shouldScroll2, position);
        }).catch(function(err) {
          if (true) {
            assert(false, err.toString());
          }
        });
      } else {
        scrollToPosition(shouldScroll, position);
      }
    });
  }
  function saveScrollPosition() {
    var key = getStateKey();
    if (key) {
      positionStore[key] = {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
    }
  }
  function getScrollPosition() {
    var key = getStateKey();
    if (key) {
      return positionStore[key];
    }
  }
  function getElementPosition(el, offset) {
    var docEl = document.documentElement;
    var docRect = docEl.getBoundingClientRect();
    var elRect = el.getBoundingClientRect();
    return {
      x: elRect.left - docRect.left - offset.x,
      y: elRect.top - docRect.top - offset.y
    };
  }
  function isValidPosition(obj) {
    return isNumber(obj.x) || isNumber(obj.y);
  }
  function normalizePosition(obj) {
    return {
      x: isNumber(obj.x) ? obj.x : window.pageXOffset,
      y: isNumber(obj.y) ? obj.y : window.pageYOffset
    };
  }
  function normalizeOffset(obj) {
    return {
      x: isNumber(obj.x) ? obj.x : 0,
      y: isNumber(obj.y) ? obj.y : 0
    };
  }
  function isNumber(v) {
    return typeof v === "number";
  }
  function scrollToPosition(shouldScroll, position) {
    var isObject2 = typeof shouldScroll === "object";
    if (isObject2 && typeof shouldScroll.selector === "string") {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        var offset = shouldScroll.offset && typeof shouldScroll.offset === "object" ? shouldScroll.offset : {};
        offset = normalizeOffset(offset);
        position = getElementPosition(el, offset);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject2 && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
    if (position) {
      window.scrollTo(position.x, position.y);
    }
  }
  var supportsPushState = inBrowser2 && function() {
    var ua = window.navigator.userAgent;
    if ((ua.indexOf("Android 2.") !== -1 || ua.indexOf("Android 4.0") !== -1) && ua.indexOf("Mobile Safari") !== -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("Windows Phone") === -1) {
      return false;
    }
    return window.history && "pushState" in window.history;
  }();
  var Time = inBrowser2 && window.performance && window.performance.now ? window.performance : Date;
  var _key = genKey();
  function genKey() {
    return Time.now().toFixed(3);
  }
  function getStateKey() {
    return _key;
  }
  function setStateKey(key) {
    _key = key;
  }
  function pushState(url, replace2) {
    saveScrollPosition();
    var history = window.history;
    try {
      if (replace2) {
        history.replaceState({ key: _key }, "", url);
      } else {
        _key = genKey();
        history.pushState({ key: _key }, "", url);
      }
    } catch (e) {
      window.location[replace2 ? "replace" : "assign"](url);
    }
  }
  function replaceState(url) {
    pushState(url, true);
  }
  function runQueue(queue2, fn, cb) {
    var step = function(index2) {
      if (index2 >= queue2.length) {
        cb();
      } else {
        if (queue2[index2]) {
          fn(queue2[index2], function() {
            step(index2 + 1);
          });
        } else {
          step(index2 + 1);
        }
      }
    };
    step(0);
  }
  function resolveAsyncComponents(matched) {
    return function(to, from, next) {
      var hasAsync = false;
      var pending2 = 0;
      var error = null;
      flatMapComponents(matched, function(def2, _, match2, key) {
        if (typeof def2 === "function" && def2.cid === void 0) {
          hasAsync = true;
          pending2++;
          var resolve2 = once2(function(resolvedDef) {
            if (isESModule(resolvedDef)) {
              resolvedDef = resolvedDef.default;
            }
            def2.resolved = typeof resolvedDef === "function" ? resolvedDef : _Vue.extend(resolvedDef);
            match2.components[key] = resolvedDef;
            pending2--;
            if (pending2 <= 0) {
              next();
            }
          });
          var reject = once2(function(reason) {
            var msg = "Failed to resolve async component " + key + ": " + reason;
            warn2(false, msg);
            if (!error) {
              error = isError(reason) ? reason : new Error(msg);
              next(error);
            }
          });
          var res;
          try {
            res = def2(resolve2, reject);
          } catch (e) {
            reject(e);
          }
          if (res) {
            if (typeof res.then === "function") {
              res.then(resolve2, reject);
            } else {
              var comp = res.component;
              if (comp && typeof comp.then === "function") {
                comp.then(resolve2, reject);
              }
            }
          }
        }
      });
      if (!hasAsync) {
        next();
      }
    };
  }
  function flatMapComponents(matched, fn) {
    return flatten(matched.map(function(m) {
      return Object.keys(m.components).map(function(key) {
        return fn(m.components[key], m.instances[key], m, key);
      });
    }));
  }
  function flatten(arr) {
    return Array.prototype.concat.apply([], arr);
  }
  var hasSymbol2 = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  function isESModule(obj) {
    return obj.__esModule || hasSymbol2 && obj[Symbol.toStringTag] === "Module";
  }
  function once2(fn) {
    var called = false;
    return function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      if (called) {
        return;
      }
      called = true;
      return fn.apply(this, args);
    };
  }
  var History = function History2(router, base) {
    this.router = router;
    this.base = normalizeBase(base);
    this.current = START;
    this.pending = null;
    this.ready = false;
    this.readyCbs = [];
    this.readyErrorCbs = [];
    this.errorCbs = [];
  };
  History.prototype.listen = function listen(cb) {
    this.cb = cb;
  };
  History.prototype.onReady = function onReady(cb, errorCb) {
    if (this.ready) {
      cb();
    } else {
      this.readyCbs.push(cb);
      if (errorCb) {
        this.readyErrorCbs.push(errorCb);
      }
    }
  };
  History.prototype.onError = function onError(errorCb) {
    this.errorCbs.push(errorCb);
  };
  History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
    var this$1 = this;
    var route = this.router.match(location, this.current);
    this.confirmTransition(route, function() {
      this$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1.ensureURL();
      if (!this$1.ready) {
        this$1.ready = true;
        this$1.readyCbs.forEach(function(cb) {
          cb(route);
        });
      }
    }, function(err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1.ready) {
        this$1.ready = true;
        this$1.readyErrorCbs.forEach(function(cb) {
          cb(err);
        });
      }
    });
  };
  History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
    var this$1 = this;
    var current = this.current;
    var abort = function(err) {
      if (isError(err)) {
        if (this$1.errorCbs.length) {
          this$1.errorCbs.forEach(function(cb) {
            cb(err);
          });
        } else {
          warn2(false, "uncaught error during route navigation:");
          console.error(err);
        }
      }
      onAbort && onAbort(err);
    };
    if (isSameRoute(route, current) && route.matched.length === current.matched.length) {
      this.ensureURL();
      return abort();
    }
    var ref2 = resolveQueue(this.current.matched, route.matched);
    var updated3 = ref2.updated;
    var deactivated = ref2.deactivated;
    var activated = ref2.activated;
    var queue2 = [].concat(extractLeaveGuards(deactivated), this.router.beforeHooks, extractUpdateHooks(updated3), activated.map(function(m) {
      return m.beforeEnter;
    }), resolveAsyncComponents(activated));
    this.pending = route;
    var iterator = function(hook, next) {
      if (this$1.pending !== route) {
        return abort();
      }
      try {
        hook(route, current, function(to) {
          if (to === false || isError(to)) {
            this$1.ensureURL(true);
            abort(to);
          } else if (typeof to === "string" || typeof to === "object" && (typeof to.path === "string" || typeof to.name === "string")) {
            abort();
            if (typeof to === "object" && to.replace) {
              this$1.replace(to);
            } else {
              this$1.push(to);
            }
          } else {
            next(to);
          }
        });
      } catch (e) {
        abort(e);
      }
    };
    runQueue(queue2, iterator, function() {
      var postEnterCbs = [];
      var isValid = function() {
        return this$1.current === route;
      };
      var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
      var queue3 = enterGuards.concat(this$1.router.resolveHooks);
      runQueue(queue3, iterator, function() {
        if (this$1.pending !== route) {
          return abort();
        }
        this$1.pending = null;
        onComplete(route);
        if (this$1.router.app) {
          this$1.router.app.$nextTick(function() {
            postEnterCbs.forEach(function(cb) {
              cb();
            });
          });
        }
      });
    });
  };
  History.prototype.updateRoute = function updateRoute(route) {
    var prev = this.current;
    this.current = route;
    this.cb && this.cb(route);
    this.router.afterHooks.forEach(function(hook) {
      hook && hook(route, prev);
    });
  };
  function normalizeBase(base) {
    if (!base) {
      if (inBrowser2) {
        var baseEl = document.querySelector("base");
        base = baseEl && baseEl.getAttribute("href") || "/";
        base = base.replace(/^https?:\/\/[^\/]+/, "");
      } else {
        base = "/";
      }
    }
    if (base.charAt(0) !== "/") {
      base = "/" + base;
    }
    return base.replace(/\/$/, "");
  }
  function resolveQueue(current, next) {
    var i;
    var max = Math.max(current.length, next.length);
    for (i = 0; i < max; i++) {
      if (current[i] !== next[i]) {
        break;
      }
    }
    return {
      updated: next.slice(0, i),
      activated: next.slice(i),
      deactivated: current.slice(i)
    };
  }
  function extractGuards(records, name, bind3, reverse) {
    var guards = flatMapComponents(records, function(def2, instance, match2, key) {
      var guard = extractGuard(def2, name);
      if (guard) {
        return Array.isArray(guard) ? guard.map(function(guard2) {
          return bind3(guard2, instance, match2, key);
        }) : bind3(guard, instance, match2, key);
      }
    });
    return flatten(reverse ? guards.reverse() : guards);
  }
  function extractGuard(def2, key) {
    if (typeof def2 !== "function") {
      def2 = _Vue.extend(def2);
    }
    return def2.options[key];
  }
  function extractLeaveGuards(deactivated) {
    return extractGuards(deactivated, "beforeRouteLeave", bindGuard, true);
  }
  function extractUpdateHooks(updated3) {
    return extractGuards(updated3, "beforeRouteUpdate", bindGuard);
  }
  function bindGuard(guard, instance) {
    if (instance) {
      return function boundRouteGuard() {
        return guard.apply(instance, arguments);
      };
    }
  }
  function extractEnterGuards(activated, cbs, isValid) {
    return extractGuards(activated, "beforeRouteEnter", function(guard, _, match2, key) {
      return bindEnterGuard(guard, match2, key, cbs, isValid);
    });
  }
  function bindEnterGuard(guard, match2, key, cbs, isValid) {
    return function routeEnterGuard(to, from, next) {
      return guard(to, from, function(cb) {
        next(cb);
        if (typeof cb === "function") {
          cbs.push(function() {
            poll(cb, match2.instances, key, isValid);
          });
        }
      });
    };
  }
  function poll(cb, instances, key, isValid) {
    if (instances[key]) {
      cb(instances[key]);
    } else if (isValid()) {
      setTimeout(function() {
        poll(cb, instances, key, isValid);
      }, 16);
    }
  }
  var HTML5History = function(History$$1) {
    function HTML5History2(router, base) {
      var this$1 = this;
      History$$1.call(this, router, base);
      var expectScroll = router.options.scrollBehavior;
      if (expectScroll) {
        setupScroll();
      }
      var initLocation = getLocation(this.base);
      window.addEventListener("popstate", function(e) {
        var current = this$1.current;
        var location = getLocation(this$1.base);
        if (this$1.current === START && location === initLocation) {
          return;
        }
        this$1.transitionTo(location, function(route) {
          if (expectScroll) {
            handleScroll(router, route, current, true);
          }
        });
      });
    }
    if (History$$1)
      HTML5History2.__proto__ = History$$1;
    HTML5History2.prototype = Object.create(History$$1 && History$$1.prototype);
    HTML5History2.prototype.constructor = HTML5History2;
    HTML5History2.prototype.go = function go2(n) {
      window.history.go(n);
    };
    HTML5History2.prototype.push = function push2(location, onComplete, onAbort) {
      var this$1 = this;
      var ref2 = this;
      var fromRoute = ref2.current;
      this.transitionTo(location, function(route) {
        pushState(cleanPath(this$1.base + route.fullPath));
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      }, onAbort);
    };
    HTML5History2.prototype.replace = function replace2(location, onComplete, onAbort) {
      var this$1 = this;
      var ref2 = this;
      var fromRoute = ref2.current;
      this.transitionTo(location, function(route) {
        replaceState(cleanPath(this$1.base + route.fullPath));
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      }, onAbort);
    };
    HTML5History2.prototype.ensureURL = function ensureURL(push2) {
      if (getLocation(this.base) !== this.current.fullPath) {
        var current = cleanPath(this.base + this.current.fullPath);
        push2 ? pushState(current) : replaceState(current);
      }
    };
    HTML5History2.prototype.getCurrentLocation = function getCurrentLocation() {
      return getLocation(this.base);
    };
    return HTML5History2;
  }(History);
  function getLocation(base) {
    var path = window.location.pathname;
    if (base && path.indexOf(base) === 0) {
      path = path.slice(base.length);
    }
    return (path || "/") + window.location.search + window.location.hash;
  }
  var HashHistory = function(History$$1) {
    function HashHistory2(router, base, fallback) {
      History$$1.call(this, router, base);
      if (fallback && checkFallback(this.base)) {
        return;
      }
      ensureSlash();
    }
    if (History$$1)
      HashHistory2.__proto__ = History$$1;
    HashHistory2.prototype = Object.create(History$$1 && History$$1.prototype);
    HashHistory2.prototype.constructor = HashHistory2;
    HashHistory2.prototype.setupListeners = function setupListeners() {
      var this$1 = this;
      var router = this.router;
      var expectScroll = router.options.scrollBehavior;
      var supportsScroll = supportsPushState && expectScroll;
      if (supportsScroll) {
        setupScroll();
      }
      window.addEventListener(supportsPushState ? "popstate" : "hashchange", function() {
        var current = this$1.current;
        if (!ensureSlash()) {
          return;
        }
        this$1.transitionTo(getHash(), function(route) {
          if (supportsScroll) {
            handleScroll(this$1.router, route, current, true);
          }
          if (!supportsPushState) {
            replaceHash(route.fullPath);
          }
        });
      });
    };
    HashHistory2.prototype.push = function push2(location, onComplete, onAbort) {
      var this$1 = this;
      var ref2 = this;
      var fromRoute = ref2.current;
      this.transitionTo(location, function(route) {
        pushHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      }, onAbort);
    };
    HashHistory2.prototype.replace = function replace2(location, onComplete, onAbort) {
      var this$1 = this;
      var ref2 = this;
      var fromRoute = ref2.current;
      this.transitionTo(location, function(route) {
        replaceHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      }, onAbort);
    };
    HashHistory2.prototype.go = function go2(n) {
      window.history.go(n);
    };
    HashHistory2.prototype.ensureURL = function ensureURL(push2) {
      var current = this.current.fullPath;
      if (getHash() !== current) {
        push2 ? pushHash(current) : replaceHash(current);
      }
    };
    HashHistory2.prototype.getCurrentLocation = function getCurrentLocation() {
      return getHash();
    };
    return HashHistory2;
  }(History);
  function checkFallback(base) {
    var location = getLocation(base);
    if (!/^\/#/.test(location)) {
      window.location.replace(cleanPath(base + "/#" + location));
      return true;
    }
  }
  function ensureSlash() {
    var path = getHash();
    if (path.charAt(0) === "/") {
      return true;
    }
    replaceHash("/" + path);
    return false;
  }
  function getHash() {
    var href = window.location.href;
    var index2 = href.indexOf("#");
    return index2 === -1 ? "" : href.slice(index2 + 1);
  }
  function getUrl(path) {
    var href = window.location.href;
    var i = href.indexOf("#");
    var base = i >= 0 ? href.slice(0, i) : href;
    return base + "#" + path;
  }
  function pushHash(path) {
    if (supportsPushState) {
      pushState(getUrl(path));
    } else {
      window.location.hash = path;
    }
  }
  function replaceHash(path) {
    if (supportsPushState) {
      replaceState(getUrl(path));
    } else {
      window.location.replace(getUrl(path));
    }
  }
  var AbstractHistory = function(History$$1) {
    function AbstractHistory2(router, base) {
      History$$1.call(this, router, base);
      this.stack = [];
      this.index = -1;
    }
    if (History$$1)
      AbstractHistory2.__proto__ = History$$1;
    AbstractHistory2.prototype = Object.create(History$$1 && History$$1.prototype);
    AbstractHistory2.prototype.constructor = AbstractHistory2;
    AbstractHistory2.prototype.push = function push2(location, onComplete, onAbort) {
      var this$1 = this;
      this.transitionTo(location, function(route) {
        this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
        this$1.index++;
        onComplete && onComplete(route);
      }, onAbort);
    };
    AbstractHistory2.prototype.replace = function replace2(location, onComplete, onAbort) {
      var this$1 = this;
      this.transitionTo(location, function(route) {
        this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
        onComplete && onComplete(route);
      }, onAbort);
    };
    AbstractHistory2.prototype.go = function go2(n) {
      var this$1 = this;
      var targetIndex = this.index + n;
      if (targetIndex < 0 || targetIndex >= this.stack.length) {
        return;
      }
      var route = this.stack[targetIndex];
      this.confirmTransition(route, function() {
        this$1.index = targetIndex;
        this$1.updateRoute(route);
      });
    };
    AbstractHistory2.prototype.getCurrentLocation = function getCurrentLocation() {
      var current = this.stack[this.stack.length - 1];
      return current ? current.fullPath : "/";
    };
    AbstractHistory2.prototype.ensureURL = function ensureURL() {
    };
    return AbstractHistory2;
  }(History);
  var VueRouter = function VueRouter2(options) {
    if (options === void 0)
      options = {};
    this.app = null;
    this.apps = [];
    this.options = options;
    this.beforeHooks = [];
    this.resolveHooks = [];
    this.afterHooks = [];
    this.matcher = createMatcher(options.routes || [], this);
    var mode = options.mode || "hash";
    this.fallback = mode === "history" && !supportsPushState && options.fallback !== false;
    if (this.fallback) {
      mode = "hash";
    }
    if (!inBrowser2) {
      mode = "abstract";
    }
    this.mode = mode;
    switch (mode) {
      case "history":
        this.history = new HTML5History(this, options.base);
        break;
      case "hash":
        this.history = new HashHistory(this, options.base, this.fallback);
        break;
      case "abstract":
        this.history = new AbstractHistory(this, options.base);
        break;
      default:
        if (true) {
          assert(false, "invalid mode: " + mode);
        }
    }
  };
  var prototypeAccessors2 = { currentRoute: { configurable: true } };
  VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
    return this.matcher.match(raw, current, redirectedFrom);
  };
  prototypeAccessors2.currentRoute.get = function() {
    return this.history && this.history.current;
  };
  VueRouter.prototype.init = function init2(app) {
    var this$1 = this;
    assert(install.installed, "not installed. Make sure to call `Vue.use(VueRouter)` before creating root instance.");
    this.apps.push(app);
    if (this.app) {
      return;
    }
    this.app = app;
    var history = this.history;
    if (history instanceof HTML5History) {
      history.transitionTo(history.getCurrentLocation());
    } else if (history instanceof HashHistory) {
      var setupHashListener = function() {
        history.setupListeners();
      };
      history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
    }
    history.listen(function(route) {
      this$1.apps.forEach(function(app2) {
        app2._route = route;
      });
    });
  };
  VueRouter.prototype.beforeEach = function beforeEach(fn) {
    return registerHook(this.beforeHooks, fn);
  };
  VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
    return registerHook(this.resolveHooks, fn);
  };
  VueRouter.prototype.afterEach = function afterEach(fn) {
    return registerHook(this.afterHooks, fn);
  };
  VueRouter.prototype.onReady = function onReady2(cb, errorCb) {
    this.history.onReady(cb, errorCb);
  };
  VueRouter.prototype.onError = function onError2(errorCb) {
    this.history.onError(errorCb);
  };
  VueRouter.prototype.push = function push(location, onComplete, onAbort) {
    this.history.push(location, onComplete, onAbort);
  };
  VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
    this.history.replace(location, onComplete, onAbort);
  };
  VueRouter.prototype.go = function go(n) {
    this.history.go(n);
  };
  VueRouter.prototype.back = function back() {
    this.go(-1);
  };
  VueRouter.prototype.forward = function forward() {
    this.go(1);
  };
  VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
    var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;
    if (!route) {
      return [];
    }
    return [].concat.apply([], route.matched.map(function(m) {
      return Object.keys(m.components).map(function(key) {
        return m.components[key];
      });
    }));
  };
  VueRouter.prototype.resolve = function resolve(to, current, append) {
    var location = normalizeLocation(to, current || this.history.current, append, this);
    var route = this.match(location, current);
    var fullPath = route.redirectedFrom || route.fullPath;
    var base = this.history.base;
    var href = createHref(base, fullPath, this.mode);
    return {
      location,
      route,
      href,
      normalizedTo: location,
      resolved: route
    };
  };
  VueRouter.prototype.addRoutes = function addRoutes(routes2) {
    this.matcher.addRoutes(routes2);
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation());
    }
  };
  Object.defineProperties(VueRouter.prototype, prototypeAccessors2);
  function registerHook(list, fn) {
    list.push(fn);
    return function() {
      var i = list.indexOf(fn);
      if (i > -1) {
        list.splice(i, 1);
      }
    };
  }
  function createHref(base, fullPath, mode) {
    var path = mode === "hash" ? "#" + fullPath : fullPath;
    return base ? cleanPath(base + "/" + path) : path;
  }
  VueRouter.install = install;
  VueRouter.version = "2.8.1";
  if (inBrowser2 && window.Vue) {
    window.Vue.use(VueRouter);
  }
  var vue_router_esm_default = VueRouter;

  // ../india/india/public/js/india_compliance_account/india_compliance_account.bundle.js
  var import_vuex2 = __toESM(require_vuex_common());

  // ../india/india/public/js/india_compliance_account/components/Loading.vue
  var __vue_script__ = {
    props: {
      radius: { default: 20 },
      stroke: { default: 2 },
      color: { default: "var(--primary-color)" }
    },
    computed: {
      loadingWrapperStyle() {
        return {
          width: this.radius + "px",
          height: this.radius + "px"
        };
      },
      loadingStyle() {
        return {
          borderWidth: this.stroke + "px",
          borderColor: this.color,
          borderTopColor: "transparent"
        };
      }
    }
  };
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "loading-wrapper", style: _vm.loadingWrapperStyle }, [_c("div", { staticClass: "loading", style: _vm.loadingStyle })]);
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  var __vue_inject_styles__ = function(inject) {
    if (!inject)
      return;
    inject("data-v-09652c88_0", { source: "\n@keyframes loading-data-v-09652c88 {\n0% {\n    transform: translate(-50%, -50%) rotate(0deg);\n}\n100% {\n    transform: translate(-50%, -50%) rotate(360deg);\n}\n}\n.loading-wrapper[data-v-09652c88] {\n  position: relative;\n}\n.loading[data-v-09652c88] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  border-style: solid;\n  border-radius: 50%;\n  animation: loading-data-v-09652c88 1.3s linear infinite;\n  height: 100%;\n  width: 100%;\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/components/Loading.vue"], "names": [], "mappings": ";AAiCA;AACA;IACA,6CAAA;AACA;AACA;IACA,+CAAA;AACA;AACA;AAEA;EACA,kBAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,mBAAA;EACA,kBAAA;EACA,uDAAA;EACA,YAAA;EACA,WAAA;AACA", "file": "Loading.vue", "sourcesContent": ['<template>\n  <div class="loading-wrapper" :style="loadingWrapperStyle">\n    <div class="loading" :style="loadingStyle"></div>\n  </div>\n</template>\n\n<script>\nexport default {\n  props: {\n    radius: { default: 20 },\n    stroke: { default: 2 },\n    color: { default: "var(--primary-color)" },\n  },\n\n  computed: {\n    loadingWrapperStyle() {\n      return {\n        width: this.radius + "px",\n        height: this.radius + "px",\n      };\n    },\n    loadingStyle() {\n      return {\n        borderWidth: this.stroke + "px",\n        borderColor: this.color,\n        borderTopColor: "transparent",\n      };\n    },\n  },\n};\n<\/script>\n\n<style scoped>\n@keyframes loading {\n  0% {\n    transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n\n.loading-wrapper {\n  position: relative;\n}\n\n.loading {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  border-style: solid;\n  border-radius: 50%;\n  animation: loading 1.3s linear infinite;\n  height: 100%;\n  width: 100%;\n}\n</style>'] }, media: void 0 });
  };
  var __vue_scope_id__ = "data-v-09652c88";
  var __vue_module_identifier__ = void 0;
  var __vue_is_functional_template__ = false;
  function __vue_normalize__(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/components/Loading.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__() {
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__ = /* @__PURE__ */ __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, __vue_create_injector__, void 0, void 0);
  var Loading_default = __vue_component__;

  // ../india/india/public/js/india_compliance_account/constants.js
  var UiState = Object.freeze({
    initial: 0,
    loading: 1,
    success: 2,
    error: 3
  });

  // ../india/india/public/js/india_compliance_account/components/FormField.vue
  var __vue_script__2 = {
    components: { Loading: Loading_default },
    props: {
      value: String,
      inputType: {
        type: String,
        validator(value) {
          return ["text", "email"].includes(value);
        },
        required: true
      },
      name: {
        type: String,
        required: true
      },
      required: {
        type: Boolean,
        default: false
      },
      label: String,
      placeholder: String,
      inputClass: String,
      error: String,
      rows: Number,
      options: [Object, Array],
      validator: Function,
      state: {
        type: Number,
        default: UiState.initial
      }
    },
    computed: {
      isLoading() {
        return this.state === UiState.loading;
      },
      hasError() {
        return this.state === UiState.error || this.error;
      },
      isValid() {
        return this.state === UiState.success;
      }
    }
  };
  var __vue_render__2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      staticClass: "form-group frappe-control",
      class: this.hasError && "has-error"
    }, [
      _vm.label ? _c("label", {
        staticClass: "control-label",
        class: _vm.required && "reqd",
        attrs: { for: _vm.name }
      }, [_vm._v("\n    " + _vm._s(_vm.label) + "\n  ")]) : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "control-input" }, [
        ["text", "email"].includes(_vm.inputType) ? _c("input", {
          staticClass: "form-control",
          class: _vm.inputClass,
          attrs: {
            type: _vm.inputType || "text",
            name: _vm.name,
            id: _vm.name,
            placeholder: _vm.placeholder,
            required: _vm.required
          },
          domProps: { value: _vm.value },
          on: {
            input: function($event) {
              return _vm.$emit("input", $event.target.value);
            },
            blur: function($event) {
              _vm.$emit("blur", $event.target.value.trim());
            }
          }
        }) : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "suffix-icon" }, [
          _vm.isLoading ? _c("Loading", {
            attrs: {
              radius: "15",
              color: "var(--text-light)",
              stroke: "1.8"
            }
          }) : _vm.hasError ? _c("i", {
            staticClass: "fa fa-times-circle",
            staticStyle: { color: "var(--red-500)" }
          }) : _vm.isValid ? _c("i", {
            staticClass: "fa fa-check-circle",
            staticStyle: { color: "var(--green-500)" }
          }) : _vm._e()
        ], 1)
      ]),
      _vm._v(" "),
      _vm.error ? _c("div", { staticClass: "input-error" }, [
        _vm._v("\n    " + _vm._s(_vm.error) + "\n  ")
      ]) : _vm._e()
    ]);
  };
  var __vue_staticRenderFns__2 = [];
  __vue_render__2._withStripped = true;
  var __vue_inject_styles__2 = function(inject) {
    if (!inject)
      return;
    inject("data-v-5a47ed63_0", { source: "\n.input-error[data-v-5a47ed63] {\n  margin-top: 0.2rem;\n  color: var(--red-500);\n}\n.control-input[data-v-5a47ed63] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.suffix-icon[data-v-5a47ed63] {\n  right: 0.5em;\n  position: absolute;\n  z-index: 10;\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/components/FormField.vue"], "names": [], "mappings": ";AAqGA;EACA,kBAAA;EACA,qBAAA;AACA;AAEA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;AACA;AAEA;EACA,YAAA;EACA,kBAAA;EACA,WAAA;AACA", "file": "FormField.vue", "sourcesContent": [`<template>
  <div class="form-group frappe-control" :class="this.hasError && 'has-error'">
    <label
      :for="name"
      class="control-label"
      :class="required && 'reqd'"
      v-if="label"
    >
      {{ label }}
    </label>
    <div class="control-input">
      <input
        :type="inputType || 'text'"
        :name="name"
        :id="name"
        class="form-control"
        :class="inputClass"
        :value="value"
        :placeholder="placeholder"
        :required="required"
        v-if="['text', 'email'].includes(inputType)"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur', $event.target.value.trim())"
      />
      <div class="suffix-icon">
        <Loading
          radius="15"
          color="var(--text-light)"
          stroke="1.8"
          v-if="isLoading"
        />
        <i
          class="fa fa-times-circle"
          style="color: var(--red-500)"
          v-else-if="hasError"
        ></i>
        <i
          class="fa fa-check-circle"
          style="color: var(--green-500)"
          v-else-if="isValid"
        ></i>
      </div>
    </div>
    <div class="input-error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import Loading from "./Loading.vue";
import { UiState } from "../constants";
export default {
  components: { Loading },

  props: {
    value: String,
    inputType: {
      type: String,
      validator(value) {
        return ["text", "email"].includes(value);
      },
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: String,
    placeholder: String,
    inputClass: String,
    error: String,
    rows: Number,
    options: [Object, Array],
    validator: Function,
    state: {
      type: Number,
      default: UiState.initial,
    },
  },

  computed: {
    isLoading() {
      return this.state === UiState.loading;
    },
    hasError() {
      return this.state === UiState.error || this.error;
    },

    isValid() {
      return this.state === UiState.success;
    },
  },
};
<\/script>

<style scoped>
.input-error {
  margin-top: 0.2rem;
  color: var(--red-500);
}

.control-input {
  position: relative;
  display: flex;
  align-items: center;
}

.suffix-icon {
  right: 0.5em;
  position: absolute;
  z-index: 10;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__2 = "data-v-5a47ed63";
  var __vue_module_identifier__2 = void 0;
  var __vue_is_functional_template__2 = false;
  function __vue_normalize__2(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/components/FormField.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__2() {
    const styles = __vue_create_injector__2.styles || (__vue_create_injector__2.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__2 = /* @__PURE__ */ __vue_normalize__2({ render: __vue_render__2, staticRenderFns: __vue_staticRenderFns__2 }, __vue_inject_styles__2, __vue_script__2, __vue_scope_id__2, __vue_is_functional_template__2, __vue_module_identifier__2, false, __vue_create_injector__2, void 0, void 0);
  var FormField_default = __vue_component__2;

  // ../india/india/public/js/india_compliance_account/services/AuthService.js
  async function get_api_secret() {
    return call_server_method("india_compliance.gst_india.page.india_compliance_account.get_api_secret");
  }
  async function set_api_secret(api_secret) {
    return call_server_method("india_compliance.gst_india.page.india_compliance_account.set_api_secret", { api_secret });
  }
  function login(email) {
    return india_compliance.gst_api.call("auth/login", {
      body: { email },
      fail_silently: true
    });
  }
  function signup(email, gstin) {
    return india_compliance.gst_api.call("auth/signup", {
      body: { email, gstin },
      fail_silently: true
    });
  }
  function check_free_trial_eligibility(gstin) {
    return india_compliance.gst_api.call("auth/is_eligible_for_free_trial", {
      body: { gstin },
      fail_silently: true
    });
  }
  function get_session() {
    return call_server_method("india_compliance.gst_india.page.india_compliance_account.get_auth_session");
  }
  function set_session(session) {
    call_server_method("india_compliance.gst_india.page.india_compliance_account.set_auth_session", {
      session
    });
  }
  function validate_session(session_id) {
    return india_compliance.gst_api.call("auth/validate_session", {
      body: { session_id }
    });
  }
  function call_server_method(method, args) {
    return frappe.call({
      method,
      args,
      silent: true
    }).then((response) => response.message || null).catch(() => null);
  }

  // ../india/india/public/js/india_compliance_account/components/auth/AuthForm.vue
  var __vue_script__3 = {
    props: { isAccountRegistered: Boolean },
    components: { FormField: FormField_default, Loading: Loading_default },
    data() {
      return {
        email: {
          value: "",
          error: null,
          state: UiState.initial
        },
        gstin: {
          value: "",
          error: null,
          state: UiState.initial
        },
        isLoading: false,
        error: null,
        isRedirecting: false,
        submitLabel: "Continue"
      };
    },
    computed: {
      computedSubmitLabel() {
        if (this.isLoading)
          return "Loading...";
        if (this.isRedirecting)
          return "Redirecting...";
        if (this.isAccountRegistered)
          return "Login";
        return this.submitLabel;
      },
      actionDisabled() {
        if (this.isLoading || this.isRedirecting || this.hasInputError || !this.isSucess)
          return true;
        if (this.isAccountRegistered)
          return !this.email.value;
        return !this.email.value || !this.gstin.value;
      },
      isSucess() {
        let _isSucess = this.email.state === UiState.success;
        if (!this.isAccountRegistered)
          _isSucess = _isSucess && this.gstin.state === UiState.success;
        return !!_isSucess;
      },
      hasInputError() {
        let _hasError = this.email.error;
        if (!this.isAccountRegistered)
          _hasError = _hasError || this.gstin.error;
        return !!_hasError;
      }
    },
    watch: {
      "gstin.value"(value) {
        this.error = null;
        this.validateGstin(value);
      },
      "email.value"(_) {
        this.error = null;
      },
      isAccountRegistered() {
        this.error = null;
      }
    },
    methods: {
      async submitAuthForm() {
        this.isLoading = true;
        this.error = null;
        if (this.hasInputError)
          return;
        const email = this.email.value;
        const gstin = this.gstin.value;
        let response;
        if (this.isAccountRegistered)
          response = await login(email);
        else
          response = await signup(email, gstin);
        this.isLoading = false;
        if (response.error) {
          this.error = response.error;
          return;
        }
        if (response.message && response.message.session) {
          await this.$store.dispatch("setSession", response.message.session);
        }
        this.isRedirecting = true;
        this.$router.push({
          name: "mailSent",
          query: { email }
        });
      },
      validateEmail(value) {
        const field = this.email;
        if (!value)
          value = field.value;
        field.state = UiState.loading;
        field.error = null;
        if (!value)
          field.error = "Email is required";
        else if (!validate_email(value))
          field.error = "Invalid Email Address";
        field.state = field.error ? UiState.error : UiState.success;
      },
      async validateGstin(value) {
        const field = this.gstin;
        if (!value)
          value = field.value;
        field.error = null;
        field.state = UiState.loading;
        const set_error = (error_message) => {
          field.error = error_message;
          field.state = UiState.error;
        };
        if (!value)
          return set_error("GSTIN is required");
        value = india_compliance.validate_gstin(value);
        if (!value)
          return set_error("Invalid GSTIN detected");
        const { message, error } = await check_free_trial_eligibility(value);
        if (error)
          return set_error(error);
        this.submitLabel = message ? "Start Free Trial" : "Signup";
        field.state = UiState.success;
      }
    }
  };
  var __vue_render__3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("form", {
      on: {
        submit: function($event) {
          $event.preventDefault();
          return _vm.submitAuthForm.apply(null, arguments);
        }
      }
    }, [
      _c("FormField", {
        attrs: {
          "input-type": "email",
          name: "email",
          placeholder: "Email",
          required: true,
          error: _vm.email.error,
          state: _vm.email.state
        },
        on: { blur: _vm.validateEmail },
        model: {
          value: _vm.email.value,
          callback: function($$v) {
            _vm.$set(_vm.email, "value", typeof $$v === "string" ? $$v.trim() : $$v);
          },
          expression: "email.value"
        }
      }),
      _vm._v(" "),
      _c("transition", { attrs: { name: "slide" } }, [
        !_vm.isAccountRegistered ? _c("FormField", {
          attrs: {
            "input-type": "text",
            name: "gstin",
            placeholder: "GSTIN",
            required: true,
            error: _vm.gstin.error,
            state: _vm.gstin.state
          },
          model: {
            value: _vm.gstin.value,
            callback: function($$v) {
              _vm.$set(_vm.gstin, "value", typeof $$v === "string" ? $$v.trim() : $$v);
            },
            expression: "gstin.value"
          }
        }) : _vm._e()
      ], 1),
      _vm._v(" "),
      _c("button", {
        staticClass: "btn btn-primary btn-sm btn-block",
        attrs: { disabled: _vm.actionDisabled, type: "submit" }
      }, [_vm._v("\n    " + _vm._s(_vm.computedSubmitLabel) + "\n  ")]),
      _vm._v(" "),
      _vm.error ? _c("p", {
        staticClass: "server-error",
        domProps: { innerHTML: _vm._s(_vm.error) }
      }) : _vm._e()
    ], 1);
  };
  var __vue_staticRenderFns__3 = [];
  __vue_render__3._withStripped = true;
  var __vue_inject_styles__3 = function(inject) {
    if (!inject)
      return;
    inject("data-v-55df1b49_0", { source: "\n.server-error[data-v-55df1b49] {\n  color: var(--red-500);\n  font-size: var(--font-size-xs);\n  text-align: center;\n  margin: 0.5em 0 0 0;\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/components/auth/AuthForm.vue"], "names": [], "mappings": ";AA8LA;EACA,qBAAA;EACA,8BAAA;EACA,kBAAA;EACA,mBAAA;AACA", "file": "AuthForm.vue", "sourcesContent": ['<template>\n  <form @submit.prevent="submitAuthForm">\n    <FormField\n      input-type="email"\n      name="email"\n      placeholder="Email"\n      v-model.trim="email.value"\n      :required="true"\n      :error="email.error"\n      :state="email.state"\n      @blur="validateEmail"\n    />\n    <transition name="slide">\n      <FormField\n        v-if="!isAccountRegistered"\n        input-type="text"\n        name="gstin"\n        placeholder="GSTIN"\n        v-model.trim="gstin.value"\n        :required="true"\n        :error="gstin.error"\n        :state="gstin.state"\n      />\n    </transition>\n    <button\n      class="btn btn-primary btn-sm btn-block"\n      :disabled="actionDisabled"\n      type="submit"\n    >\n      {{ computedSubmitLabel }}\n    </button>\n    <p class="server-error" v-if="error" v-html="error"></p>\n  </form>\n</template>\n\n<script>\nimport FormField from "../FormField.vue";\nimport Loading from "../Loading.vue";\nimport { UiState } from "../../constants";\nimport {\n  login,\n  signup,\n  check_free_trial_eligibility,\n} from "../../services/AuthService";\n\nexport default {\n  props: { isAccountRegistered: Boolean },\n\n  components: { FormField, Loading },\n\n  data() {\n    return {\n      email: {\n        value: "",\n        error: null,\n        state: UiState.initial,\n      },\n      gstin: {\n        value: "",\n        error: null,\n        state: UiState.initial,\n      },\n\n      isLoading: false,\n      error: null,\n      isRedirecting: false,\n      submitLabel: "Continue",\n    };\n  },\n\n  computed: {\n    computedSubmitLabel() {\n      if (this.isLoading) return "Loading...";\n      if (this.isRedirecting) return "Redirecting...";\n\n      if (this.isAccountRegistered) return "Login";\n      return this.submitLabel;\n    },\n\n    actionDisabled() {\n      if (\n        this.isLoading ||\n        this.isRedirecting ||\n        this.hasInputError ||\n        !this.isSucess\n      )\n        return true;\n      if (this.isAccountRegistered) return !this.email.value;\n      return !this.email.value || !this.gstin.value;\n    },\n\n    isSucess() {\n      let _isSucess = this.email.state === UiState.success;\n      if (!this.isAccountRegistered)\n        _isSucess = _isSucess && this.gstin.state === UiState.success;\n      return !!_isSucess;\n    },\n\n    hasInputError() {\n      let _hasError = this.email.error;\n      if (!this.isAccountRegistered) _hasError = _hasError || this.gstin.error;\n      return !!_hasError;\n    },\n  },\n\n  watch: {\n    "gstin.value"(value) {\n      this.error = null;\n      this.validateGstin(value);\n    },\n\n    "email.value"(_) {\n      this.error = null;\n    },\n\n    isAccountRegistered() {\n      this.error = null;\n    },\n  },\n\n  methods: {\n    async submitAuthForm() {\n      this.isLoading = true;\n      this.error = null;\n      if (this.hasInputError) return;\n\n      const email = this.email.value;\n      const gstin = this.gstin.value;\n\n      let response;\n      if (this.isAccountRegistered) response = await login(email);\n      else response = await signup(email, gstin);\n\n      this.isLoading = false;\n      if (response.error) {\n        this.error = response.error;\n        return;\n      }\n\n      if (response.message && response.message.session) {\n        await this.$store.dispatch("setSession", response.message.session);\n      }\n\n      this.isRedirecting = true;\n      this.$router.push({\n        name: "mailSent",\n        query: { email },\n      });\n    },\n\n    validateEmail(value) {\n      const field = this.email;\n      if (!value) value = field.value;\n      field.state = UiState.loading;\n\n      field.error = null;\n      if (!value) field.error = "Email is required";\n      else if (!validate_email(value)) field.error = "Invalid Email Address";\n\n      field.state = field.error ? UiState.error : UiState.success;\n    },\n\n    async validateGstin(value) {\n      const field = this.gstin;\n      if (!value) value = field.value;\n\n      field.error = null;\n      field.state = UiState.loading;\n\n      const set_error = (error_message) => {\n        field.error = error_message;\n        field.state = UiState.error;\n      };\n\n      if (!value) return set_error("GSTIN is required");\n\n      value = india_compliance.validate_gstin(value);\n      if (!value) return set_error("Invalid GSTIN detected");\n\n      const { message, error } = await check_free_trial_eligibility(value);\n      if (error) return set_error(error);\n\n      this.submitLabel = message ? "Start Free Trial" : "Signup";\n      field.state = UiState.success;\n    },\n  },\n};\n<\/script>\n\n<style scoped>\n.server-error {\n  color: var(--red-500);\n  font-size: var(--font-size-xs);\n  text-align: center;\n  margin: 0.5em 0 0 0;\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__3 = "data-v-55df1b49";
  var __vue_module_identifier__3 = void 0;
  var __vue_is_functional_template__3 = false;
  function __vue_normalize__3(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/components/auth/AuthForm.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__3() {
    const styles = __vue_create_injector__3.styles || (__vue_create_injector__3.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__3 = /* @__PURE__ */ __vue_normalize__3({ render: __vue_render__3, staticRenderFns: __vue_staticRenderFns__3 }, __vue_inject_styles__3, __vue_script__3, __vue_scope_id__3, __vue_is_functional_template__3, __vue_module_identifier__3, false, __vue_create_injector__3, void 0, void 0);
  var AuthForm_default = __vue_component__3;

  // ../india/india/public/js/india_compliance_account/components/auth/MarketingInfoCheckIcon.vue
  var __vue_script__4 = {};
  var __vue_render__4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("svg", {
      attrs: {
        width: "38",
        height: "35",
        viewBox: "0 0 38 35",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }
    }, [
      _c("path", {
        attrs: {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M15.8036 0.0802048C1.71545 1.59912 -4.94777 18.1486 4.20075 28.8987C12.7871 38.988 29.9228 36.0763 34.4496 23.759C36.7899 17.3912 35.399 10.4063 32.3819 13.3768L31.7658 13.9834L31.906 15.3344C32.6083 22.104 29.6677 27.5325 23.8274 30.2485C14.8086 34.4426 4.21295 28.2392 3.57156 18.3895C2.83827 7.13083 15.2314 -0.222569 25.2226 5.54266C27.0444 6.59401 28.4383 6.01735 28.4383 4.21254C28.4383 1.96784 20.9655 -0.476446 15.8036 0.0802048ZM34.8893 1.65898C34.6949 1.76286 30.6216 5.6923 25.8375 10.3912L17.1389 18.9343L14.517 16.3886C12.4 14.3332 11.7722 13.8202 11.2569 13.725C9.65155 13.4285 8.33096 14.8134 8.72544 16.3795C8.85941 16.9109 15.296 23.4146 16.102 23.833C16.7126 24.1498 17.5442 24.149 18.1521 23.8309C18.7287 23.5291 37.5096 5.01298 37.7871 4.47268C38.6743 2.74461 36.6097 0.739694 34.8893 1.65898Z",
          fill: "#5CB946"
        }
      })
    ]);
  };
  var __vue_staticRenderFns__4 = [];
  __vue_render__4._withStripped = true;
  var __vue_inject_styles__4 = void 0;
  var __vue_scope_id__4 = void 0;
  var __vue_module_identifier__4 = void 0;
  var __vue_is_functional_template__4 = false;
  function __vue_normalize__4(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/components/auth/MarketingInfoCheckIcon.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (false) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  var __vue_component__4 = /* @__PURE__ */ __vue_normalize__4({ render: __vue_render__4, staticRenderFns: __vue_staticRenderFns__4 }, __vue_inject_styles__4, __vue_script__4, __vue_scope_id__4, __vue_is_functional_template__4, __vue_module_identifier__4, false, void 0, void 0, void 0);
  var MarketingInfoCheckIcon_default = __vue_component__4;

  // ../india/india/public/js/india_compliance_account/components/auth/MarketingInfo.vue
  var __vue_script__5 = {
    components: { MarketingInfoCheckIcon: MarketingInfoCheckIcon_default },
    created() {
      this.features = [
        "Create e-Waybills from your ERP",
        "Automate e-Invoicing",
        "Autofill party information"
      ];
    }
  };
  var __vue_render__5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [
      _vm._m(0),
      _vm._v(" "),
      _c("ul", { staticClass: "features" }, _vm._l(_vm.features, function(feature, index2) {
        return _c("li", { key: index2, staticClass: "feature" }, [
          _c("MarketingInfoCheckIcon", { staticClass: "feature-icon" }),
          _vm._v("\n      " + _vm._s(feature) + "\n    ")
        ], 1);
      }), 0)
    ]);
  };
  var __vue_staticRenderFns__5 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("h1", { staticClass: "title" }, [
        _vm._v("\n    Supercharge your\n    "),
        _c("br"),
        _vm._v(" "),
        _c("span", { staticClass: "text-highlight" }, [
          _vm._v("India Compliance")
        ])
      ]);
    }
  ];
  __vue_render__5._withStripped = true;
  var __vue_inject_styles__5 = function(inject) {
    if (!inject)
      return;
    inject("data-v-52a647e3_0", { source: "\n.marketing-info .title[data-v-52a647e3] {\n  font-size: 2.5em;\n  font-weight: bold;\n  line-height: 1.3;\n}\n.learn-more-btn[data-v-52a647e3] {\n  color: var(--primary-color);\n  align-self: flex-end;\n  font-size: 1.2em;\n  margin-right: 1em;\n}\n.features[data-v-52a647e3] {\n  list-style: none;\n  padding-left: 1em;\n  text-align: start;\n}\n.features .feature[data-v-52a647e3] {\n  font-size: 1.5em;\n  margin: 0.7em 0;\n  display: flex;\n  align-items: center;\n}\n.features .feature-icon[data-v-52a647e3] {\n  fill: #5dbe46;\n  width: 1em;\n  height: 1em;\n  margin-right: 0.4em;\n}\n@media (max-width: 991px) {\n.learn-more-btn[data-v-52a647e3] {\n    align-self: center;\n    margin-right: 0;\n}\n}\n@media (max-width: 575px) {\n.features .feature[data-v-52a647e3] {\n    font-size: 1.4em;\n}\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/components/auth/MarketingInfo.vue"], "names": [], "mappings": ";AAuCA;EACA,gBAAA;EACA,iBAAA;EACA,gBAAA;AACA;AAEA;EACA,2BAAA;EACA,oBAAA;EACA,gBAAA;EACA,iBAAA;AACA;AAEA;EACA,gBAAA;EACA,iBAAA;EACA,iBAAA;AACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;AACA;AAEA;EACA,aAAA;EACA,UAAA;EACA,WAAA;EACA,mBAAA;AACA;AAEA;AACA;IACA,kBAAA;IACA,eAAA;AACA;AACA;AAEA;AACA;IACA,gBAAA;AACA;AACA", "file": "MarketingInfo.vue", "sourcesContent": ['<template>\n  <div>\n    <h1 class="title">\n      Supercharge your\n      <br />\n      <span class="text-highlight">India Compliance</span>\n    </h1>\n    <ul class="features">\n      <li :key="index" v-for="(feature, index) in features" class="feature">\n        <MarketingInfoCheckIcon class="feature-icon" />\n        {{ feature }}\n      </li>\n    </ul>\n    <!-- <a\n      class="learn-more-btn"\n      href="https://indiacompliance.app"\n      target="_blank"\n    >\n      Learn More...</a\n    > -->\n  </div>\n</template>\n<script>\nimport MarketingInfoCheckIcon from "./MarketingInfoCheckIcon.vue";\n\nexport default {\n  components: { MarketingInfoCheckIcon },\n\n  created() {\n    this.features = [\n      "Create e-Waybills from your ERP",\n      "Automate e-Invoicing",\n      "Autofill party information",\n    ];\n  },\n};\n<\/script>\n\n<style scoped>\n.marketing-info .title {\n  font-size: 2.5em;\n  font-weight: bold;\n  line-height: 1.3;\n}\n\n.learn-more-btn {\n  color: var(--primary-color);\n  align-self: flex-end;\n  font-size: 1.2em;\n  margin-right: 1em;\n}\n\n.features {\n  list-style: none;\n  padding-left: 1em;\n  text-align: start;\n}\n\n.features .feature {\n  font-size: 1.5em;\n  margin: 0.7em 0;\n  display: flex;\n  align-items: center;\n}\n\n.features .feature-icon {\n  fill: #5dbe46;\n  width: 1em;\n  height: 1em;\n  margin-right: 0.4em;\n}\n\n@media (max-width: 991px) {\n  .learn-more-btn {\n    align-self: center;\n    margin-right: 0;\n  }\n}\n\n@media (max-width: 575px) {\n  .features .feature {\n    font-size: 1.4em;\n  }\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__5 = "data-v-52a647e3";
  var __vue_module_identifier__5 = void 0;
  var __vue_is_functional_template__5 = false;
  function __vue_normalize__5(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/components/auth/MarketingInfo.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__4() {
    const styles = __vue_create_injector__4.styles || (__vue_create_injector__4.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__5 = /* @__PURE__ */ __vue_normalize__5({ render: __vue_render__5, staticRenderFns: __vue_staticRenderFns__5 }, __vue_inject_styles__5, __vue_script__5, __vue_scope_id__5, __vue_is_functional_template__5, __vue_module_identifier__5, false, __vue_create_injector__4, void 0, void 0);
  var MarketingInfo_default = __vue_component__5;

  // ../india/india/public/js/india_compliance_account/pages/AuthPage.vue
  var __vue_script__6 = {
    components: {
      AuthForm: AuthForm_default,
      MarketingInfo: MarketingInfo_default
    },
    data() {
      return {
        isAccountRegistered: false
      };
    },
    computed: {
      title() {
        return this.isAccountRegistered ? "Welcome back" : "Let's get you started";
      }
    },
    methods: {
      toggleAuthView() {
        this.isAccountRegistered = !this.isAccountRegistered;
      },
      async checkAccountRegisted(value) {
        this.isAccountRegistered = await _isEmailRegistered(value);
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        if (vm.$store.getters.isLoggedIn)
          return next({ name: "home", replace: true });
        if (vm.$store.getters.hasSession)
          return next({ name: "mailSent", replace: true });
        next();
      });
    }
  };
  var __vue_render__6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "container auth-page" }, [
      _c("div", { staticClass: "main-content" }, [
        _c("MarketingInfo", { staticClass: "marketing-info" }),
        _vm._v(" "),
        _c("div", { staticClass: "auth-form" }, [
          _c("h3", { staticClass: "title text-center" }, [
            _vm._v("\n        " + _vm._s(_vm.title)),
            _c("span", { staticClass: "full-stop-highlight" }, [_vm._v(".")])
          ]),
          _vm._v(" "),
          _c("AuthForm", {
            attrs: { isAccountRegistered: _vm.isAccountRegistered }
          }),
          _vm._v(" "),
          _c("p", { staticClass: "change-view-btn" }, [
            _vm._v("\n        " + _vm._s(_vm.isAccountRegistered ? "Don't have an account?" : "Already have an account?") + "\n        "),
            _c("a", {
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.toggleAuthView.apply(null, arguments);
                }
              }
            }, [
              _vm._v("\n          " + _vm._s(_vm.isAccountRegistered ? "Sign Up" : "Login") + "\n        ")
            ])
          ])
        ], 1)
      ], 1)
    ]);
  };
  var __vue_staticRenderFns__6 = [];
  __vue_render__6._withStripped = true;
  var __vue_inject_styles__6 = function(inject) {
    if (!inject)
      return;
    inject("data-v-0dfdbcfa_0", { source: "\n.container.auth-page[data-v-0dfdbcfa] {\n  padding-top: 5em;\n}\n.main-content[data-v-0dfdbcfa] {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0 4em;\n  font-size: 1em;\n}\n.marketing-info[data-v-0dfdbcfa],\n.auth-form[data-v-0dfdbcfa] {\n  max-width: 50%;\n}\n.marketing-info[data-v-0dfdbcfa] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n.auth-form[data-v-0dfdbcfa] {\n  width: 400px;\n  height: 28em;\n  margin-left: 12em;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  padding: 45px 0;\n  border-radius: var(--border-radius-md);\n  box-shadow: var(--card-shadow);\n  background-color: var(--card-bg);\n}\n.auth-form .title[data-v-0dfdbcfa] {\n  font-size: 1.7em;\n}\n.auth-form form[data-v-0dfdbcfa] {\n  width: 100%;\n  max-width: 320px;\n}\n.change-view-btn[data-v-0dfdbcfa] {\n  text-align: center;\n  margin-top: 20px;\n}\n.change-view-btn a[data-v-0dfdbcfa] {\n  color: var(--primary-color);\n}\n@media (max-width: 991px) {\n.main-content[data-v-0dfdbcfa] {\n    flex-direction: column;\n    align-items: center;\n    margin-top: 5em;\n    font-size: 0.9em;\n    padding: 0;\n}\n.main-content > *[data-v-0dfdbcfa] {\n    margin: 1em 0;\n}\n.marketing-info[data-v-0dfdbcfa],\n  .auth-form[data-v-0dfdbcfa] {\n    max-width: 100%;\n}\n.marketing-info[data-v-0dfdbcfa] {\n    text-align: center;\n    align-items: center;\n}\n.auth-form[data-v-0dfdbcfa] {\n    margin-left: 0;\n}\n}\n@media (max-width: 575px) {\n.container[data-v-0dfdbcfa] {\n    padding-left: 0;\n    padding-right: 0;\n}\n.auth-form[data-v-0dfdbcfa] {\n    height: 32em;\n    border-radius: 0;\n    width: 100%;\n    padding-left: 15px;\n    padding-right: 15px;\n}\n.main-content[data-v-0dfdbcfa] {\n    font-size: 0.75em;\n}\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/pages/AuthPage.vue"], "names": [], "mappings": ";AAyEA;EACA,gBAAA;AACA;AACA;EACA,WAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,cAAA;EACA,cAAA;AACA;AAEA;;EAEA,cAAA;AACA;AAEA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;AACA;AAEA;EACA,YAAA;EACA,YAAA;EACA,iBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,8BAAA;EACA,eAAA;EACA,sCAAA;EACA,8BAAA;EACA,gCAAA;AACA;AAEA;EACA,gBAAA;AACA;AAEA;EACA,WAAA;EACA,gBAAA;AACA;AAEA;EACA,kBAAA;EACA,gBAAA;AACA;AAEA;EACA,2BAAA;AACA;AAEA;AACA;IACA,sBAAA;IACA,mBAAA;IACA,eAAA;IACA,gBAAA;IACA,UAAA;AACA;AAEA;IACA,aAAA;AACA;AAEA;;IAEA,eAAA;AACA;AAEA;IACA,kBAAA;IACA,mBAAA;AACA;AAEA;IACA,cAAA;AACA;AACA;AAEA;AACA;IACA,eAAA;IACA,gBAAA;AACA;AAEA;IACA,YAAA;IACA,gBAAA;IACA,WAAA;IACA,kBAAA;IACA,mBAAA;AACA;AAEA;IACA,iBAAA;AACA;AACA", "file": "AuthPage.vue", "sourcesContent": [`<template>
  <div class="container auth-page">
    <div class="main-content">
      <MarketingInfo class="marketing-info" />
      <div class="auth-form">
        <h3 class="title text-center">
          {{ title }}<span class="full-stop-highlight">.</span>
        </h3>
        <AuthForm :isAccountRegistered="isAccountRegistered" />
        <p class="change-view-btn">
          {{
            isAccountRegistered
              ? "Don't have an account?"
              : "Already have an account?"
          }}
          <a @click.prevent="toggleAuthView">
            {{ isAccountRegistered ? "Sign Up" : "Login" }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AuthForm from "../components/auth/AuthForm.vue";
import MarketingInfo from "../components/auth/MarketingInfo.vue";

export default {
  components: {
    AuthForm,
    MarketingInfo,
  },

  data() {
    return {
      isAccountRegistered: false,
    };
  },

  computed: {
    title() {
      return this.isAccountRegistered
        ? "Welcome back"
        : "Let's get you started";
    },
  },

  methods: {
    toggleAuthView() {
      this.isAccountRegistered = !this.isAccountRegistered;
    },

    async checkAccountRegisted(value) {
      this.isAccountRegistered = await _isEmailRegistered(value);
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$store.getters.isLoggedIn)
        return next({ name: "home", replace: true });

      if (vm.$store.getters.hasSession)
        return next({ name: "mailSent", replace: true });

      next();
    });
  },
};
<\/script>

<style scoped>
.container.auth-page {
  padding-top: 5em;
}
.main-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4em;
  font-size: 1em;
}

.marketing-info,
.auth-form {
  max-width: 50%;
}

.marketing-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.auth-form {
  width: 400px;
  height: 28em;
  margin-left: 12em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 45px 0;
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  background-color: var(--card-bg);
}

.auth-form .title {
  font-size: 1.7em;
}

.auth-form form {
  width: 100%;
  max-width: 320px;
}

.change-view-btn {
  text-align: center;
  margin-top: 20px;
}

.change-view-btn a {
  color: var(--primary-color);
}

@media (max-width: 991px) {
  .main-content {
    flex-direction: column;
    align-items: center;
    margin-top: 5em;
    font-size: 0.9em;
    padding: 0;
  }

  .main-content > * {
    margin: 1em 0;
  }

  .marketing-info,
  .auth-form {
    max-width: 100%;
  }

  .marketing-info {
    text-align: center;
    align-items: center;
  }

  .auth-form {
    margin-left: 0;
  }
}

@media (max-width: 575px) {
  .container {
    padding-left: 0;
    padding-right: 0;
  }

  .auth-form {
    height: 32em;
    border-radius: 0;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }

  .main-content {
    font-size: 0.75em;
  }
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__6 = "data-v-0dfdbcfa";
  var __vue_module_identifier__6 = void 0;
  var __vue_is_functional_template__6 = false;
  function __vue_normalize__6(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/pages/AuthPage.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__5() {
    const styles = __vue_create_injector__5.styles || (__vue_create_injector__5.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__6 = /* @__PURE__ */ __vue_normalize__6({ render: __vue_render__6, staticRenderFns: __vue_staticRenderFns__6 }, __vue_inject_styles__6, __vue_script__6, __vue_scope_id__6, __vue_is_functional_template__6, __vue_module_identifier__6, false, __vue_create_injector__5, void 0, void 0);
  var AuthPage_default = __vue_component__6;

  // ../india/india/public/js/india_compliance_account/components/PageTitle.vue
  var __vue_script__7 = {
    props: ["title"]
  };
  var __vue_render__7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("h2", { staticClass: "page-heading" }, [
      _vm._v("\n  " + _vm._s(_vm.title)),
      _c("span", { staticClass: "full-stop-highlight" }, [_vm._v(".")])
    ]);
  };
  var __vue_staticRenderFns__7 = [];
  __vue_render__7._withStripped = true;
  var __vue_inject_styles__7 = function(inject) {
    if (!inject)
      return;
    inject("data-v-45254bb0_0", { source: "\n.page-heading[data-v-45254bb0] {\n  margin-top: 1.7em;\n  font-size: 2em;\n  text-align: left;\n  margin-bottom: 2em;\n}\n.full-stop-highlight[data-v-45254bb0] {\n  color: var(--primary-color);\n  font-size: 1.2em;\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/components/PageTitle.vue"], "names": [], "mappings": ";AAaA;EACA,iBAAA;EACA,cAAA;EACA,gBAAA;EACA,kBAAA;AACA;AAEA;EACA,2BAAA;EACA,gBAAA;AACA", "file": "PageTitle.vue", "sourcesContent": ['<template>\n  <h2 class="page-heading">\n    {{ title }}<span class="full-stop-highlight">.</span>\n  </h2>\n</template>\n\n<script>\nexport default {\n  props: ["title"],\n};\n<\/script>\n\n<style scoped>\n.page-heading {\n  margin-top: 1.7em;\n  font-size: 2em;\n  text-align: left;\n  margin-bottom: 2em;\n}\n\n.full-stop-highlight {\n  color: var(--primary-color);\n  font-size: 1.2em;\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__7 = "data-v-45254bb0";
  var __vue_module_identifier__7 = void 0;
  var __vue_is_functional_template__7 = false;
  function __vue_normalize__7(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/components/PageTitle.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__6() {
    const styles = __vue_create_injector__6.styles || (__vue_create_injector__6.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__7 = /* @__PURE__ */ __vue_normalize__7({ render: __vue_render__7, staticRenderFns: __vue_staticRenderFns__7 }, __vue_inject_styles__7, __vue_script__7, __vue_scope_id__7, __vue_is_functional_template__7, __vue_module_identifier__7, false, __vue_create_injector__6, void 0, void 0);
  var PageTitle_default = __vue_component__7;

  // ../india/india/public/js/india_compliance_account/components/Message.vue
  var __vue_script__8 = {
    props: ["message", "color"],
    emits: ["dismiss"],
    data() {
      return {
        hideMessage: false
      };
    },
    methods: {
      dismiss() {
        this.hideMessage = true;
        this.$emit("dismiss");
      }
    }
  };
  var __vue_render__8 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: "fade" } }, [
      !_vm.hideMessage ? _c("div", { staticClass: "form-message", class: _vm.color }, [
        _c("span", { domProps: { innerHTML: _vm._s(_vm.message) } }),
        _vm._v(" "),
        _c("span", { staticClass: "close", on: { click: _vm.dismiss } }, [
          _vm._v("\xD7")
        ])
      ]) : _vm._e()
    ]);
  };
  var __vue_staticRenderFns__8 = [];
  __vue_render__8._withStripped = true;
  var __vue_inject_styles__8 = function(inject) {
    if (!inject)
      return;
    inject("data-v-283408d4_0", { source: "\n.close[data-v-283408d4] {\n  cursor: pointer;\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/components/Message.vue"], "names": [], "mappings": ";AA4BA;EACA,eAAA;AACA", "file": "Message.vue", "sourcesContent": ['<template>\n  <transition name="fade">\n    <div class="form-message" v-if="!hideMessage" :class="color">\n      <span v-html="message" />\n      <span class="close" @click="dismiss">&times;</span>\n    </div>\n  </transition>\n</template>\n\n<script>\nexport default {\n  props: ["message", "color"],\n  emits: ["dismiss"],\n  data() {\n    return {\n      hideMessage: false,\n    };\n  },\n  methods: {\n    dismiss() {\n      this.hideMessage = true;\n      this.$emit("dismiss");\n    },\n  },\n};\n<\/script>\n\n<style scoped>\n.close {\n  cursor: pointer;\n}\n</style>'] }, media: void 0 });
  };
  var __vue_scope_id__8 = "data-v-283408d4";
  var __vue_module_identifier__8 = void 0;
  var __vue_is_functional_template__8 = false;
  function __vue_normalize__8(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/components/Message.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__7() {
    const styles = __vue_create_injector__7.styles || (__vue_create_injector__7.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__8 = /* @__PURE__ */ __vue_normalize__8({ render: __vue_render__8, staticRenderFns: __vue_staticRenderFns__8 }, __vue_inject_styles__8, __vue_script__8, __vue_scope_id__8, __vue_is_functional_template__8, __vue_module_identifier__8, false, __vue_create_injector__7, void 0, void 0);
  var Message_default = __vue_component__8;

  // ../india/india/public/js/india_compliance_account/components/PreLoader.vue
  var __vue_script__9 = {
    components: { Loading: Loading_default }
  };
  var __vue_render__9 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "loading-container" }, [
      _c("h1", [_vm._v("India Compliance")]),
      _vm._v(" "),
      _c("h5", [_vm._v("by Resilient Tech")]),
      _vm._v(" "),
      _c("Loading", { staticClass: "mt-3", attrs: { radius: 40 } })
    ], 1);
  };
  var __vue_staticRenderFns__9 = [];
  __vue_render__9._withStripped = true;
  var __vue_inject_styles__9 = function(inject) {
    if (!inject)
      return;
    inject("data-v-fa7659a4_0", { source: "\n.loading-container[data-v-fa7659a4] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  height: calc(100vh - 60px);\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/components/PreLoader.vue"], "names": [], "mappings": ";AAiBA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,sBAAA;EACA,0BAAA;AACA", "file": "PreLoader.vue", "sourcesContent": ['<template>\n  <div class="loading-container">\n    <h1>India Compliance</h1>\n    <h5>by Resilient Tech</h5>\n    <Loading :radius="40" class="mt-3" />\n  </div>\n</template>\n\n<script>\nimport Loading from "./Loading.vue";\n\nexport default {\n  components: { Loading },\n};\n<\/script>\n\n<style scoped>\n.loading-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  height: calc(100vh - 60px);\n}\n</style>'] }, media: void 0 });
  };
  var __vue_scope_id__9 = "data-v-fa7659a4";
  var __vue_module_identifier__9 = void 0;
  var __vue_is_functional_template__9 = false;
  function __vue_normalize__9(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/components/PreLoader.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__8() {
    const styles = __vue_create_injector__8.styles || (__vue_create_injector__8.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__9 = /* @__PURE__ */ __vue_normalize__9({ render: __vue_render__9, staticRenderFns: __vue_staticRenderFns__9 }, __vue_inject_styles__9, __vue_script__9, __vue_scope_id__9, __vue_is_functional_template__9, __vue_module_identifier__9, false, __vue_create_injector__8, void 0, void 0);
  var PreLoader_default = __vue_component__9;

  // ../india/india/public/js/india_compliance_account/utils.js
  var getReadableNumber = function(num, precision = 2) {
    return format_number(num, null, precision);
  };

  // ../india/india/public/js/india_compliance_account/pages/AccountPage.vue
  var __vue_script__10 = {
    components: {
      PageTitle: PageTitle_default,
      Message: Message_default,
      PreLoader: PreLoader_default
    },
    data() {
      return {
        isLoading: true
      };
    },
    methods: {
      getReadableNumber,
      showUsage() {
        frappe.route_options = {
          integration_request_service: "India Compliance API"
        };
        frappe.set_route("List", "Integration Request");
      },
      logout() {
        frappe.confirm("Are you sure you want to logout from your India Compliance Account?", async () => {
          await this.$store.dispatch("setApiSecret", null);
          this.$router.replace({ name: "auth" });
        });
      }
    },
    computed: {
      last_synced_on() {
        let { last_usage_synced_on } = this.subscriptionDetails;
        last_usage_synced_on = last_usage_synced_on ? moment.unix(last_usage_synced_on) : moment();
        return last_usage_synced_on.format("DD-MM-YYYY HH:mm A");
      },
      subscriptionDetails() {
        return this.$store.state.account.subscriptionDetails || {};
      },
      is_unlimited_account() {
        return this.subscriptionDetails.total_credits === -1;
      },
      used_credits() {
        return this.subscriptionDetails.used_credits;
      },
      balance_credits() {
        return this.subscriptionDetails.balance_credits;
      },
      valid_upto() {
        return frappe.datetime.str_to_user(this.subscriptionDetails.expiry_date);
      },
      message() {
        return this.$route.params.message;
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.getters.isLoggedIn ? next() : next({ name: "auth", replace: true });
      });
    },
    async created() {
      if (!this.$store.getters.isLoggedIn)
        return;
      await this.$store.dispatch("fetchDetails", "subscription");
      this.isLoading = false;
    }
  };
  var __vue_render__10 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "container ic-account-page account-page" }, [
      _vm.isLoading ? _c("PreLoader") : _c("div", [
        _c("PageTitle", { attrs: { title: "India Compliance Account" } }),
        _vm._v(" "),
        _vm.message ? _c("Message", {
          attrs: {
            message: _vm.message.message,
            color: _vm.message.color
          }
        }) : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "main-content" }, [
          _c("div", { staticClass: "card subscription-info" }, [
            _c("p", { staticClass: "last-updated-text" }, [
              _vm._v("Last Updated On " + _vm._s(_vm.last_synced_on))
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "subscription-details-item" }, [
              _c("p", { staticClass: "label" }, [
                _vm._v(_vm._s(_vm.is_unlimited_account ? "Used Credits" : "Available Credits"))
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "value" }, [
                _vm._v(_vm._s(_vm.getReadableNumber(_vm.is_unlimited_account ? _vm.used_credits : _vm.balance_credits, 0)))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "subscription-details-item" }, [
              _c("p", { staticClass: "label" }, [
                _vm._v(_vm._s(_vm.is_unlimited_account ? "Next Billing Date" : "Valid Upto"))
              ]),
              _vm._v(" "),
              _c("p", {
                staticClass: "value",
                class: { "mb-4": _vm.is_unlimited_account }
              }, [_vm._v(_vm._s(_vm.valid_upto))])
            ]),
            _vm._v(" "),
            !_vm.is_unlimited_account ? _c("router-link", {
              staticClass: "btn btn-primary btn-sm btn-block",
              attrs: { to: "/purchase-credits" }
            }, [_vm._v("\n          Purchase Credits\n        ")]) : _vm._e()
          ], 1),
          _vm._v(" "),
          _c("div", { staticClass: "card" }, [
            _c("h3", { staticClass: "title" }, [_vm._v("Actions")]),
            _vm._v(" "),
            _c("ul", { staticClass: "links" }, [
              _c("a", {
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    return _vm.showUsage.apply(null, arguments);
                  }
                }
              }, [_c("li", [_vm._v("Review API Usage")])]),
              _vm._v(" "),
              _c("a", {
                attrs: {
                  href: "https://discuss.erpnext.com/c/erpnext/india-compliance/65"
                }
              }, [_c("li", [_vm._v("Community Forum")])]),
              _vm._v(" "),
              _c("a", {
                attrs: {
                  href: "https://github.com/resilient-tech/india-compliance/issues/new"
                }
              }, [_c("li", [_vm._v("Report a Bug")])]),
              _vm._v(" "),
              _c("a", {
                attrs: {
                  href: "mailto:api-support@indiacompliance.app"
                }
              }, [_c("li", [_vm._v("Email Support")])]),
              _vm._v(" "),
              _c("a", {
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    return _vm.logout.apply(null, arguments);
                  }
                }
              }, [_c("li", [_vm._v("Logout")])])
            ])
          ])
        ])
      ], 1)
    ], 1);
  };
  var __vue_staticRenderFns__10 = [];
  __vue_render__10._withStripped = true;
  var __vue_inject_styles__10 = function(inject) {
    if (!inject)
      return;
    inject("data-v-e1147bcc_0", { source: "\n.ic-account-page .main-content .card[data-v-e1147bcc] {\n  min-height: 26em;\n}\n.subscription-info[data-v-e1147bcc] {\n  align-items: center;\n  text-align: center;\n  justify-content: space-between;\n}\n.subscription-info .last-updated-text[data-v-e1147bcc] {\n  color: var(--gray-500);\n}\n.subscription-info .last-updated-text a[data-v-e1147bcc] {\n  color: var(--text-light);\n}\n.subscription-details-item[data-v-e1147bcc] {\n  font-weight: 600;\n  font-size: 1.2em;\n}\n.subscription-details-item .value[data-v-e1147bcc] {\n  font-size: 1.6em;\n  color: var(--text-color);\n}\n.links[data-v-e1147bcc] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.links li[data-v-e1147bcc] {\n  margin: 1.2em 0;\n  transition-duration: 0.3s;\n}\n.links a[data-v-e1147bcc] {\n  font-size: 1.3em;\n  font-weight: 500;\n  color: var(--text-light);\n}\n.links a[data-v-e1147bcc]:hover {\n  color: var(--text-color);\n  color: var(--primary);\n  text-decoration: none;\n}\n.links a:hover li[data-v-e1147bcc] {\n  margin-left: 0.3em;\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/pages/AccountPage.vue"], "names": [], "mappings": ";AAsIA;EACA,gBAAA;AACA;AAEA;EACA,mBAAA;EACA,kBAAA;EACA,8BAAA;AACA;AAEA;EACA,sBAAA;AACA;AACA;EACA,wBAAA;AACA;AAEA;EACA,gBAAA;EACA,gBAAA;AACA;AAEA;EACA,gBAAA;EACA,wBAAA;AACA;AAEA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;AACA;AAEA;EACA,eAAA;EACA,yBAAA;AACA;AAEA;EACA,gBAAA;EACA,gBAAA;EACA,wBAAA;AACA;AACA;EACA,wBAAA;EACA,qBAAA;EACA,qBAAA;AACA;AACA;EACA,kBAAA;AACA", "file": "AccountPage.vue", "sourcesContent": [`<template>
  <div class="container ic-account-page account-page">
    <PreLoader v-if="isLoading" />
    <div v-else>
      <PageTitle title="India Compliance Account" />
      <Message
        v-if="message"
        :message="message.message"
        :color="message.color"
      />
      <div class="main-content">
        <div class="card subscription-info">
          <p class="last-updated-text">Last Updated On {{ last_synced_on }}</p>
          <div class="subscription-details-item">
            <p class="label">{{ is_unlimited_account ? 'Used Credits' : 'Available Credits' }}</p>
            <p class="value">{{ getReadableNumber(is_unlimited_account ? used_credits : balance_credits, 0)}}</p>
          </div>
          <div class="subscription-details-item">
            <p class="label">{{ is_unlimited_account ? 'Next Billing Date' : 'Valid Upto' }}</p>
            <p class="value" :class="{ 'mb-4': is_unlimited_account }">{{ valid_upto }}</p>
          </div>
          <router-link v-if="!is_unlimited_account"
            class="btn btn-primary btn-sm btn-block"
            to="/purchase-credits"
          >
            Purchase Credits
          </router-link>
        </div>
        <div class="card">
          <h3 class="title">Actions</h3>
          <ul class="links">
            <a @click.prevent="showUsage"><li>Review API Usage</li></a>
            <!-- <a href="#"><li>Check API Status</li></a> -->
            <a href="https://discuss.erpnext.com/c/erpnext/india-compliance/65"><li>Community Forum</li></a>
            <a href="https://github.com/resilient-tech/india-compliance/issues/new"><li>Report a Bug</li></a>
            <a href="mailto:api-support@indiacompliance.app"><li>Email Support</li></a>
            <a @click.prevent="logout"><li>Logout</li></a>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import Message from "../components/Message.vue";
import PreLoader from "../components/PreLoader.vue";
import { getReadableNumber } from "../utils";

export default {
  components: {
    PageTitle,
    Message,
    PreLoader,
  },

  data() {
    return {
      isLoading: true,
    };
  },

  methods: {
    getReadableNumber,
    showUsage() {
      frappe.route_options = {
        integration_request_service: "India Compliance API",
      };
      frappe.set_route("List", "Integration Request");
    },
    logout() {
      frappe.confirm(
        "Are you sure you want to logout from your India Compliance Account?",
        async () => {
          await this.$store.dispatch("setApiSecret", null);
          this.$router.replace({ name: "auth" });
        }
      );
    }
  },
  computed: {
    last_synced_on() {
      // TODO: set based on user datetime format?
      let { last_usage_synced_on } = this.subscriptionDetails;
      last_usage_synced_on = last_usage_synced_on
        ? moment.unix(last_usage_synced_on)
        : moment();

      return last_usage_synced_on.format("DD-MM-YYYY HH:mm A");
    },

    subscriptionDetails() {
      return this.$store.state.account.subscriptionDetails || {};
    },

    is_unlimited_account() {
      return this.subscriptionDetails.total_credits === -1;
    },

    used_credits() {
      return this.subscriptionDetails.used_credits;
    },

    balance_credits() {
      return this.subscriptionDetails.balance_credits;
    },

    valid_upto() {
      return frappe.datetime.str_to_user(this.subscriptionDetails.expiry_date);
    },

    message() {
      return this.$route.params.message;
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.getters.isLoggedIn
        ? next()
        : next({ name: "auth", replace: true });
    });
  },

  async created() {
    if (!this.$store.getters.isLoggedIn) return;
    await this.$store.dispatch("fetchDetails", "subscription");
    this.isLoading = false;
  },
};
<\/script>

<style scoped>
.ic-account-page .main-content .card {
  min-height: 26em;
}

.subscription-info {
  align-items: center;
  text-align: center;
  justify-content: space-between;
}

.subscription-info .last-updated-text {
  color: var(--gray-500);
}
.subscription-info .last-updated-text a {
  color: var(--text-light);
}

.subscription-details-item {
  font-weight: 600;
  font-size: 1.2em;
}

.subscription-details-item .value {
  font-size: 1.6em;
  color: var(--text-color);
}

.links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links li {
  margin: 1.2em 0;
  transition-duration: 0.3s;
}

.links a {
  font-size: 1.3em;
  font-weight: 500;
  color: var(--text-light);
}
.links a:hover {
  color: var(--text-color);
  color: var(--primary);
  text-decoration: none;
}
.links a:hover li {
  margin-left: 0.3em;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__10 = "data-v-e1147bcc";
  var __vue_module_identifier__10 = void 0;
  var __vue_is_functional_template__10 = false;
  function __vue_normalize__10(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/pages/AccountPage.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__9() {
    const styles = __vue_create_injector__9.styles || (__vue_create_injector__9.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__10 = /* @__PURE__ */ __vue_normalize__10({ render: __vue_render__10, staticRenderFns: __vue_staticRenderFns__10 }, __vue_inject_styles__10, __vue_script__10, __vue_scope_id__10, __vue_is_functional_template__10, __vue_module_identifier__10, false, __vue_create_injector__9, void 0, void 0);
  var AccountPage_default = __vue_component__10;

  // ../india/india/public/js/india_compliance_account/pages/MailSentPage.vue
  var __vue_script__11 = {
    computed: {
      email() {
        const { session } = this.$store.state.auth;
        return session && session.email;
      },
      change_icon() {
        return frappe.utils.icon("change", "sm");
      },
      refresh_icon() {
        return frappe.utils.icon("refresh", "sm");
      }
    },
    methods: {
      async changeEmail() {
        await this.$store.dispatch("setSession", null);
        this.$router.replace({ name: "auth" });
      },
      async refresh() {
        await this.$store.dispatch("initAuth");
        this.$router.replace({ name: "auth" });
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        if (!vm.$store.getters.hasSession)
          return next({ name: "home", replace: true });
        return next();
      });
    }
  };
  var __vue_render__11 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "mail-sent-page contaier text-center" }, [
      _c("img", {
        staticClass: "mail-box-img",
        attrs: { src: "/assets/india_compliance/images/mail-box.png", alt: "" }
      }),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c("p", { staticClass: "message" }, [
        _vm._v("\n    Almost there! We've sent a verification email to\n    "),
        _c("strong", [_vm._v(_vm._s(_vm.email))]),
        _vm._v(".\n    "),
        _c("br"),
        _vm._v("\n    Please click the button in that email to confirm your email address.\n  ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "actions" }, [
        _c("button", {
          staticClass: "btn btn-secondary btn-sm",
          on: {
            click: function($event) {
              $event.stopPropagation();
              return _vm.changeEmail.apply(null, arguments);
            }
          }
        }, [
          _c("span", { domProps: { innerHTML: _vm._s(_vm.change_icon) } }),
          _vm._v("\n      Change Email\n    ")
        ]),
        _vm._v(" "),
        _c("button", {
          staticClass: "btn btn-primary btn-sm",
          on: {
            click: function($event) {
              $event.stopPropagation();
              return _vm.refresh.apply(null, arguments);
            }
          }
        }, [
          _c("span", { domProps: { innerHTML: _vm._s(_vm.refresh_icon) } }),
          _vm._v("\n      Refresh\n    ")
        ])
      ])
    ]);
  };
  var __vue_staticRenderFns__11 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("h2", { staticClass: "title" }, [
        _vm._v("\n    Verify your email"),
        _c("span", { staticClass: "text-highlight" }, [_vm._v(".")])
      ]);
    }
  ];
  __vue_render__11._withStripped = true;
  var __vue_inject_styles__11 = function(inject) {
    if (!inject)
      return;
    inject("data-v-3351c557_0", { source: "\n.mail-sent-page[data-v-3351c557] {\n  margin: 70px 0;\n}\n.mail-box-img[data-v-3351c557] {\n  width: 15em;\n  margin-bottom: 2em;\n}\n.title[data-v-3351c557] {\n  font-weight: 600;\n}\n.message[data-v-3351c557] {\n  font-weight: 300;\n  font-size: 1.3em;\n  margin-bottom: 2em;\n}\n@media screen and (max-width: 768px) {\n.message[data-v-3351c557] {\n    font-size: 1.1em;\n}\n}\n.actions button[data-v-3351c557] {\n  margin-left: 5px;\n}\n.actions button[data-v-3351c557]:first-child {\n  margin-left: 0;\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/pages/MailSentPage.vue"], "names": [], "mappings": ";AAsEA;EACA,cAAA;AACA;AAEA;EACA,WAAA;EACA,kBAAA;AACA;AAEA;EACA,gBAAA;AACA;AAEA;EACA,gBAAA;EACA,gBAAA;EACA,kBAAA;AACA;AAEA;AACA;IACA,gBAAA;AACA;AACA;AAEA;EACA,gBAAA;AACA;AAEA;EACA,cAAA;AACA", "file": "MailSentPage.vue", "sourcesContent": [`<template>
  <div class="mail-sent-page contaier text-center">
    <img
      class="mail-box-img"
      src="/assets/india_compliance/images/mail-box.png"
      alt=""
    />
    <h2 class="title">
      Verify your email<span class="text-highlight">.</span>
    </h2>
    <p class="message">
      Almost there! We've sent a verification email to
      <strong>{{ email }}</strong>.
      <br />
      Please click the button in that email to confirm your email address.
    </p>

    <div class="actions">
      <button @click.stop="changeEmail" class="btn btn-secondary btn-sm">
        <span v-html="change_icon"></span>
        Change Email
      </button>

      <button @click.stop="refresh" class="btn btn-primary btn-sm">
        <span v-html="refresh_icon"></span>
        Refresh
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    email() {
      const { session } = this.$store.state.auth;
      return session && session.email;
    },

    change_icon() {
      return frappe.utils.icon("change", "sm");
    },

    refresh_icon() {
      return frappe.utils.icon("refresh", "sm");
    },
  },
  methods: {
    async changeEmail() {
      await this.$store.dispatch("setSession", null);
      this.$router.replace({ name: "auth" });
    },

    async refresh() {
      await this.$store.dispatch("initAuth");
      this.$router.replace({ name: "auth" });
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.$store.getters.hasSession)
        return next({ name: "home", replace: true });
      return next();
    });
  },
};
<\/script>

<style scoped>
.mail-sent-page {
  margin: 70px 0;
}

.mail-box-img {
  width: 15em;
  margin-bottom: 2em;
}

.title {
  font-weight: 600;
}

.message {
  font-weight: 300;
  font-size: 1.3em;
  margin-bottom: 2em;
}

@media screen and (max-width: 768px) {
  .message {
    font-size: 1.1em;
  }
}

.actions button {
  margin-left: 5px;
}

.actions button:first-child {
  margin-left: 0;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__11 = "data-v-3351c557";
  var __vue_module_identifier__11 = void 0;
  var __vue_is_functional_template__11 = false;
  function __vue_normalize__11(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/pages/MailSentPage.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__10() {
    const styles = __vue_create_injector__10.styles || (__vue_create_injector__10.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__11 = /* @__PURE__ */ __vue_normalize__11({ render: __vue_render__11, staticRenderFns: __vue_staticRenderFns__11 }, __vue_inject_styles__11, __vue_script__11, __vue_scope_id__11, __vue_is_functional_template__11, __vue_module_identifier__11, false, __vue_create_injector__10, void 0, void 0);
  var MailSentPage_default = __vue_component__11;

  // ../india/india/public/js/india_compliance_account/services/AccountService.js
  async function get_details(type) {
    return india_compliance.gst_api.call(`account.get_${type}_details`, {
      method: "GET",
      with_api_secret: true
    });
  }
  async function update_billing_details(new_billing_details) {
    return india_compliance.gst_api.call("account.update_billing_details", {
      method: "POST",
      body: { new_billing_details },
      with_api_secret: true
    });
  }
  async function create_order(credits, amount) {
    return india_compliance.gst_api.call("account.create_order", {
      method: "POST",
      body: { credits, amount },
      with_api_secret: true
    });
  }
  async function verify_payment(orderId) {
    return india_compliance.gst_api.call("account.verify_payment", {
      method: "POST",
      body: { order_id: orderId },
      with_api_secret: true
    });
  }

  // ../india/india/public/js/india_compliance_account/pages/PurchaseCreditsPage.vue
  var __vue_script__12 = {
    components: {
      FormField: FormField_default,
      PageTitle: PageTitle_default,
      PreLoader: PreLoader_default
    },
    data() {
      return {
        isLoading: true,
        credits: 0,
        creditsInputValue: 0,
        isRedirecting: false
      };
    },
    computed: {
      calculatorDetails() {
        return this.$store.state.account.calculatorDetails || {};
      },
      creditsMultiplier() {
        return this.calculatorDetails.credits_multiplier;
      },
      minOrderQty() {
        return this.calculatorDetails.min_order_qty;
      },
      maxOrderQty() {
        return this.calculatorDetails.max_order_qty;
      },
      defaultCalculatorValue() {
        return this.calculatorDetails.default_calculator_value;
      },
      creditsValidity() {
        return this.calculatorDetails.credits_validity;
      },
      learnMoreUrl() {
        return this.calculatorDetails.learn_more_url;
      },
      rates() {
        return this.calculatorDetails.rates;
      },
      taxRate() {
        return this.calculatorDetails.tax_rate;
      },
      tax() {
        return this.netTotal * this.taxRate / 100;
      },
      netTotal() {
        let net_total = 0;
        let total_credits = this.credits;
        for (let [credits, rate] of Object.entries(this.rates)) {
          credits = Math.min(total_credits, credits);
          net_total += credits * rate / 100;
          total_credits -= credits;
          if (!total_credits)
            break;
        }
        return net_total;
      },
      grandTotal() {
        return this.netTotal + this.tax;
      },
      buttonText() {
        if (this.isRedirecting)
          return "Redirecting...";
        if (this.isDirty)
          return "Calculate";
        return "Proceed to Payment";
      },
      isDirty() {
        return this.creditsInputValue != this.credits;
      }
    },
    methods: {
      getReadableNumber,
      handleButtonClick() {
        if (this.isDirty) {
          this.updateCredits();
        } else {
          this.proceedToPayment();
        }
      },
      async proceedToPayment() {
        var _a;
        this.isRedirecting = true;
        const response = await create_order(this.credits, this.grandTotal);
        this.isRedirecting = false;
        if (response.invalid_token)
          return this.$store.dispatch("setApiSecret", null);
        if (!response.success || !((_a = response.message) == null ? void 0 : _a.order_token))
          return;
        this.$router.push({
          name: "paymentPage",
          params: {
            order: {
              token: response.message.order_token,
              credits: this.credits,
              netTotal: this.netTotal,
              tax: this.tax,
              taxRate: this.taxRate,
              grandTotal: this.grandTotal,
              validity: frappe.datetime.add_months(frappe.datetime.now_date(), this.creditsValidity)
            }
          }
        });
      },
      updateCredits() {
        this.credits = this.creditsInputValue;
        if (this.credits > this.maxOrderQty) {
          this.credits = this.maxOrderQty;
        } else if (this.credits < this.minOrderQty) {
          this.credits = this.minOrderQty;
        } else if (this.credits % this.creditsMultiplier != 0) {
          this.credits = Math.ceil(this.credits / this.creditsMultiplier) * this.creditsMultiplier;
        }
        this.creditsInputValue = this.credits;
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.getters.isLoggedIn ? next() : next({ name: "auth", replace: true });
      });
    },
    async created() {
      if (!this.$store.getters.isLoggedIn)
        return;
      await this.$store.dispatch("fetchDetails", "calculator");
      this.isLoading = false;
      this.credits = this.creditsInputValue = this.defaultCalculatorValue;
    }
  };
  var __vue_render__12 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "container ic-account-page purchase-credits-page" }, [
      _vm.isLoading ? _c("PreLoader") : _c("div", [
        _c("PageTitle", { attrs: { title: "Purchase API Credits" } }),
        _vm._v(" "),
        _c("div", { staticClass: "main-content" }, [
          _c("div", { staticClass: "card card-calculator" }, [
            _c("div", { staticClass: "calculator" }, [
              _c("p", { staticClass: "title" }, [_vm._v("Calculator")]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group frappe-control" }, [
                _c("div", { staticClass: "control-input" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model.number",
                        value: _vm.creditsInputValue,
                        expression: "creditsInputValue",
                        modifiers: { number: true }
                      }
                    ],
                    staticClass: "form-control",
                    attrs: {
                      type: "number",
                      step: _vm.creditsMultiplier,
                      min: _vm.minOrderQty,
                      max: _vm.maxOrderQty
                    },
                    domProps: { value: _vm.creditsInputValue },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return;
                        }
                        _vm.creditsInputValue = _vm._n($event.target.value);
                      },
                      blur: function($event) {
                        return _vm.$forceUpdate();
                      }
                    }
                  })
                ])
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "description" }, [
                _vm._v("\n            Credits to be purchased (to be entered in multiple of\n            " + _vm._s(_vm.creditsMultiplier) + ")\n          ")
              ]),
              _vm._v(" "),
              _c("button", {
                staticClass: "btn btn-primary btn-sm btn-block btn-tall mt-5",
                attrs: { disabled: _vm.isRedirecting },
                on: { click: _vm.handleButtonClick }
              }, [
                _vm._v("\n            " + _vm._s(_vm.buttonText) + "\n          ")
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "calculator-result mt-5" }, [
              _c("div", { staticClass: "row" }, [
                _c("p", { staticClass: "col" }, [_vm._v("Net Amount")]),
                _vm._v(" "),
                _c("p", { staticClass: "col calculator-net-value" }, [
                  _vm._v("\n              \u20B9 " + _vm._s(_vm.getReadableNumber(_vm.netTotal)) + "\n            ")
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c("p", { staticClass: "col" }, [
                  _vm._v("GST @ " + _vm._s(_vm.taxRate) + "%")
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "col calculator-net-value" }, [
                  _vm._v("\u20B9 " + _vm._s(_vm.getReadableNumber(_vm.tax)))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "calculator-total row" }, [
                _c("p", { staticClass: "col" }, [
                  _vm._v("Amount Payable")
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "col calculator-net-value" }, [
                  _vm._v("\n              \u20B9 " + _vm._s(_vm.getReadableNumber(_vm.grandTotal)) + "\n            ")
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card card-pricing" }, [
            _c("p", { staticClass: "title" }, [
              _vm._v("Simple, Predictable Pricing")
            ]),
            _vm._v(" "),
            _c("table", { staticClass: "plan-detail" }, [
              _c("tr", [
                _c("td"),
                _vm._v(" "),
                _c("td", { staticClass: "plan-header" }, [
                  _c("p", [_vm._v("Price per Credit")]),
                  _vm._v(" "),
                  _c("p", [_vm._v("(excl. GST)")])
                ])
              ]),
              _vm._v(" "),
              _vm._l(_vm.rates, function(rate, credits, index2) {
                return _c("tr", { key: index2 }, [
                  _c("td", { staticClass: "plan-list" }, [
                    _vm._v("\n              " + _vm._s(index2 == 0 ? "First" : credits == Infinity ? "Any Additional" : "Next") + "\n              " + _vm._s(credits != Infinity ? credits : "") + " Credits\n            ")
                  ]),
                  _vm._v(" "),
                  _c("td", { staticClass: "plan-list plan-price" }, [
                    _vm._v("\n              \u20B9 " + _vm._s(_vm.getReadableNumber(rate / 100)) + "\n            ")
                  ])
                ]);
              })
            ], 2),
            _vm._v(" "),
            _c("div", [
              _c("div", [
                _c("p", { staticClass: "validity-header" }, [
                  _vm._v("Lifetime Validity"),
                  _c("sup", [_vm._v("*")])
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "validity-footer" }, [
                  _vm._v("\n              Initial validity is of " + _vm._s(_vm.creditsValidity) + " months. Gets extended\n              whenever you make the next purchase.\n            ")
                ])
              ])
            ])
          ])
        ])
      ], 1)
    ], 1);
  };
  var __vue_staticRenderFns__12 = [];
  __vue_render__12._withStripped = true;
  var __vue_inject_styles__12 = function(inject) {
    if (!inject)
      return;
    inject("data-v-3a0d778c_0", { source: "\n.btn-tall[data-v-3a0d778c] {\n  font-size: 1.2em;\n}\n\n/* Card Calculator*/\n.calculator .title[data-v-3a0d778c] {\n  margin-bottom: 2em;\n}\n.calculator .description[data-v-3a0d778c] {\n  margin-top: -0.5em;\n}\n.calculator .form-control[data-v-3a0d778c] {\n  font-size: 1.4em;\n  font-weight: 600;\n  margin: 0;\n}\n.calculator-net-value[data-v-3a0d778c] {\n  font-weight: 600;\n  text-align: end;\n  font-size: 1.1em;\n}\n.calculator-total[data-v-3a0d778c] {\n  font-size: 1.3em;\n  font-weight: 600;\n  margin-top: 0.9em;\n}\n.credits-input[data-v-3a0d778c] {\n  padding: 22em;\n}\n\n/* Card Plan */\n.plan-header[data-v-3a0d778c] {\n  text-align: end;\n  font-size: 0.75em;\n  margin-bottom: 1.6em;\n  font-weight: 400;\n}\n.plan-header p[data-v-3a0d778c] {\n  margin-bottom: 0.4em;\n}\n.plan-detail[data-v-3a0d778c] {\n  font-size: 1.2em;\n  font-weight: 500;\n  margin-top: 2em;\n}\n.plan-price[data-v-3a0d778c] {\n  text-align: end;\n  font-weight: 600;\n}\n.plan-list[data-v-3a0d778c] {\n  padding-bottom: 0.9em;\n}\n.validity-header[data-v-3a0d778c] {\n  font-size: 1.4em;\n  font-weight: 500;\n}\n.validity-footer[data-v-3a0d778c] {\n  font-size: 0.9em;\n}\n@media (max-width: 400px) {\n.card[data-v-3a0d778c] {\n    min-height: 38em !important;\n}\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/pages/PurchaseCreditsPage.vue"], "names": [], "mappings": ";AA6SA;EACA,gBAAA;AACA;;AAEA,mBAAA;AAEA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;AACA;AAEA;EACA,gBAAA;EACA,gBAAA;EACA,SAAA;AACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,gBAAA;AACA;AACA;EACA,gBAAA;EACA,gBAAA;EACA,iBAAA;AACA;AACA;EACA,aAAA;AACA;;AAEA,cAAA;AACA;EACA,eAAA;EACA,iBAAA;EACA,oBAAA;EACA,gBAAA;AACA;AACA;EACA,oBAAA;AACA;AACA;EACA,gBAAA;EACA,gBAAA;EACA,eAAA;AACA;AACA;EACA,eAAA;EACA,gBAAA;AACA;AACA;EACA,qBAAA;AACA;AACA;EACA,gBAAA;EACA,gBAAA;AACA;AACA;EACA,gBAAA;AACA;AAEA;AACA;IACA,2BAAA;AACA;AACA", "file": "PurchaseCreditsPage.vue", "sourcesContent": ['<template>\n  <div class="container ic-account-page purchase-credits-page">\n    <PreLoader v-if="isLoading" />\n    <div v-else>\n      <PageTitle title="Purchase API Credits" />\n      <div class="main-content">\n        <div class="card card-calculator">\n          <div class="calculator">\n            <p class="title">Calculator</p>\n            <div class="form-group frappe-control">\n              <div class="control-input">\n                <input\n                  type="number"\n                  :step="creditsMultiplier"\n                  :min="minOrderQty"\n                  :max="maxOrderQty"\n                  class="form-control"\n                  v-model.number="creditsInputValue"\n                />\n              </div>\n            </div>\n            <p class="description">\n              Credits to be purchased (to be entered in multiple of\n              {{ creditsMultiplier }})\n            </p>\n            <button\n              class="btn btn-primary btn-sm btn-block btn-tall mt-5"\n              @click="handleButtonClick"\n              :disabled="isRedirecting"\n            >\n              {{ buttonText }}\n            </button>\n          </div>\n          <div class="calculator-result mt-5">\n            <div class="row">\n              <p class="col">Net Amount</p>\n              <p class="col calculator-net-value">\n                \u20B9 {{ getReadableNumber(netTotal) }}\n              </p>\n            </div>\n            <div class="row">\n              <p class="col">GST @ {{ taxRate }}%</p>\n              <p class="col calculator-net-value">\u20B9 {{ getReadableNumber(tax) }}</p>\n            </div>\n            <div class="calculator-total row">\n              <p class="col">Amount Payable</p>\n              <p class="col calculator-net-value">\n                \u20B9 {{ getReadableNumber(grandTotal) }}\n              </p>\n            </div>\n          </div>\n        </div>\n        <div class="card card-pricing">\n          <p class="title">Simple, Predictable Pricing</p>\n          <table class="plan-detail">\n            <tr>\n              <td></td>\n              <td class="plan-header">\n                <p>Price per Credit</p>\n                <p>(excl. GST)</p>\n              </td>\n            </tr>\n            <tr v-for="(rate, credits, index) in rates" :key="index">\n              <td class="plan-list">\n                {{\n                  index == 0 ? "First" : credits == Infinity ? "Any Additional" : "Next"\n                }}\n                {{ credits != Infinity ? credits : "" }} Credits\n              </td>\n              <td class="plan-list plan-price">\n                \u20B9 {{ getReadableNumber(rate / 100) }}\n              </td>\n            </tr>\n          </table>\n          <div>\n            <div>\n              <p class="validity-header">Lifetime Validity<sup>*</sup></p>\n              <p class="validity-footer">\n                Initial validity is of {{ creditsValidity }} months. Gets extended\n                whenever you make the next purchase.\n              </p>\n            </div>\n          </div>\n          <!-- <a :href="learnMoreUrl" target="_blank" class="text-highlight text-right">\n            learn more...\n          </a> -->\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport FormField from "../components/FormField.vue";\nimport PageTitle from "../components/PageTitle.vue";\nimport PreLoader from "../components/PreLoader.vue";\nimport { getReadableNumber } from "../utils";\nimport { create_order } from "../services/AccountService";\n\nexport default {\n  components: {\n    FormField,\n    PageTitle,\n    PreLoader,\n  },\n\n  data() {\n    return {\n      isLoading: true,\n      credits: 0,\n      creditsInputValue: 0,\n      isRedirecting: false,\n    };\n  },\n\n  computed: {\n    calculatorDetails() {\n      return this.$store.state.account.calculatorDetails || {};\n    },\n\n    creditsMultiplier() {\n      return this.calculatorDetails.credits_multiplier;\n    },\n\n    minOrderQty() {\n      return this.calculatorDetails.min_order_qty;\n    },\n\n    maxOrderQty() {\n      return this.calculatorDetails.max_order_qty;\n    },\n\n    defaultCalculatorValue() {\n      return this.calculatorDetails.default_calculator_value;\n    },\n\n    creditsValidity() {\n      return this.calculatorDetails.credits_validity;\n    },\n\n    learnMoreUrl() {\n      return this.calculatorDetails.learn_more_url;\n    },\n\n    rates() {\n      return this.calculatorDetails.rates;\n    },\n\n    taxRate() {\n      return this.calculatorDetails.tax_rate;\n    },\n    tax() {\n      return (this.netTotal * this.taxRate) / 100;\n    },\n\n    netTotal() {\n      let net_total = 0;\n      let total_credits = this.credits;\n\n      for (let [credits, rate] of Object.entries(this.rates)) {\n        credits = Math.min(total_credits, credits);\n        net_total += (credits * rate) / 100;\n        total_credits -= credits;\n        if (!total_credits) break;\n      }\n\n      return net_total;\n    },\n\n    grandTotal() {\n      return this.netTotal + this.tax;\n    },\n\n    buttonText() {\n      if (this.isRedirecting) return "Redirecting...";\n      if (this.isDirty) return "Calculate";\n      return "Proceed to Payment";\n    },\n\n    isDirty() {\n      return this.creditsInputValue != this.credits;\n    },\n  },\n\n  methods: {\n    getReadableNumber,\n    handleButtonClick() {\n      if (this.isDirty) {\n        this.updateCredits();\n      } else {\n        this.proceedToPayment();\n      }\n    },\n\n    async proceedToPayment() {\n      this.isRedirecting = true;\n      const response = await create_order(this.credits, this.grandTotal);\n      this.isRedirecting = false;\n\n      if (response.invalid_token) return this.$store.dispatch("setApiSecret", null);\n\n      if (!response.success || !response.message?.order_token) return;\n\n      this.$router.push({\n        name: "paymentPage",\n        params: {\n          order: {\n            token: response.message.order_token,\n            credits: this.credits,\n            netTotal: this.netTotal,\n            tax: this.tax,\n            taxRate: this.taxRate,\n            grandTotal: this.grandTotal,\n            validity: frappe.datetime.add_months(\n              frappe.datetime.now_date(),\n              this.creditsValidity\n            ),\n          },\n        },\n      });\n    },\n\n    updateCredits() {\n      this.credits = this.creditsInputValue;\n\n      // credits only allowed to be in multiples of creditsMultiplier\n      if (this.credits > this.maxOrderQty) {\n        this.credits = this.maxOrderQty;\n      } else if (this.credits < this.minOrderQty) {\n        this.credits = this.minOrderQty;\n      } else if (this.credits % this.creditsMultiplier != 0) {\n        this.credits =\n          Math.ceil(this.credits / this.creditsMultiplier) * this.creditsMultiplier;\n      }\n\n      this.creditsInputValue = this.credits;\n    },\n  },\n\n  beforeRouteEnter(to, from, next) {\n    next(vm => {\n      vm.$store.getters.isLoggedIn ? next() : next({ name: "auth", replace: true });\n    });\n  },\n\n  async created() {\n    if (!this.$store.getters.isLoggedIn) return;\n    await this.$store.dispatch("fetchDetails", "calculator");\n    this.isLoading = false;\n    this.credits = this.creditsInputValue = this.defaultCalculatorValue;\n  },\n};\n\n// taken from: https://stackoverflow.com/a/58812425\nfunction bisect_left(sortedList, value) {\n  if (!sortedList.length) return 0;\n\n  if (sortedList.length == 1) {\n    return value > sortedList[0] ? 1 : 0;\n  }\n\n  let lbound = 0;\n  let rbound = sortedList.length - 1;\n  return bisect_left(lbound, rbound);\n\n  // note that this function depends on closure over lbound and rbound\n  // to work correctly\n  function bisect_left(lb, rb) {\n    if (rb - lb == 1) {\n      if (sortedList[lb] < value && sortedList[rb] >= value) {\n        return lb + 1;\n      }\n\n      if (sortedList[lb] == value) {\n        return lb;\n      }\n    }\n\n    if (sortedList[lb] > value) {\n      return 0;\n    }\n\n    if (sortedList[rb] < value) {\n      return sortedList.length;\n    }\n\n    let midPoint = lb + Math.floor((rb - lb) / 2);\n    let midValue = sortedList[midPoint];\n\n    if (value <= midValue) {\n      rbound = midPoint;\n    } else if (value > midValue) {\n      lbound = midPoint;\n    }\n\n    return bisect_left(lbound, rbound);\n  }\n}\n<\/script>\n\n<style scoped>\n.btn-tall {\n  font-size: 1.2em;\n}\n\n/* Card Calculator*/\n\n.calculator .title {\n  margin-bottom: 2em;\n}\n.calculator .description {\n  margin-top: -0.5em;\n}\n\n.calculator .form-control {\n  font-size: 1.4em;\n  font-weight: 600;\n  margin: 0;\n}\n\n.calculator-net-value {\n  font-weight: 600;\n  text-align: end;\n  font-size: 1.1em;\n}\n.calculator-total {\n  font-size: 1.3em;\n  font-weight: 600;\n  margin-top: 0.9em;\n}\n.credits-input {\n  padding: 22em;\n}\n\n/* Card Plan */\n.plan-header {\n  text-align: end;\n  font-size: 0.75em;\n  margin-bottom: 1.6em;\n  font-weight: 400;\n}\n.plan-header p {\n  margin-bottom: 0.4em;\n}\n.plan-detail {\n  font-size: 1.2em;\n  font-weight: 500;\n  margin-top: 2em;\n}\n.plan-price {\n  text-align: end;\n  font-weight: 600;\n}\n.plan-list {\n  padding-bottom: 0.9em;\n}\n.validity-header {\n  font-size: 1.4em;\n  font-weight: 500;\n}\n.validity-footer {\n  font-size: 0.9em;\n}\n\n@media (max-width: 400px) {\n  .card {\n    min-height: 38em !important;\n  }\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__12 = "data-v-3a0d778c";
  var __vue_module_identifier__12 = void 0;
  var __vue_is_functional_template__12 = false;
  function __vue_normalize__12(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/pages/PurchaseCreditsPage.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__11() {
    const styles = __vue_create_injector__11.styles || (__vue_create_injector__11.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__12 = /* @__PURE__ */ __vue_normalize__12({ render: __vue_render__12, staticRenderFns: __vue_staticRenderFns__12 }, __vue_inject_styles__12, __vue_script__12, __vue_scope_id__12, __vue_is_functional_template__12, __vue_module_identifier__12, false, __vue_create_injector__11, void 0, void 0);
  var PurchaseCreditsPage_default = __vue_component__12;

  // ../india/india/public/js/india_compliance_account/pages/PaymentPage.vue
  var __vue_script__13 = {
    components: {
      PageTitle: PageTitle_default,
      PreLoader: PreLoader_default
    },
    data() {
      return {
        isLoading: true,
        billingDetails: {}
      };
    },
    beforeRouteEnter(to, from, next) {
      if (to.params.order)
        return next();
      next({ name: "home", replace: true });
    },
    computed: {
      billingGstin() {
        return this.billingDetails.billing_gstin;
      },
      businessName() {
        return this.billingDetails.business_name;
      },
      addressLine1() {
        return this.billingDetails.address_line1;
      },
      addressLine2() {
        return this.billingDetails.address_line2;
      },
      city() {
        return this.billingDetails.city;
      },
      state() {
        return this.billingDetails.state;
      },
      country() {
        return this.billingDetails.country;
      },
      pincode() {
        return this.billingDetails.pincode;
      },
      orderDetails() {
        return this.$route.params.order;
      },
      creditsValidity() {
        return frappe.datetime.str_to_user(this.orderDetails.validity);
      }
    },
    methods: {
      getReadableNumber,
      editAddress() {
        const states = frappe.boot.india_state_options || [];
        const dialog = new frappe.ui.Dialog({
          title: "Edit Billing Address",
          fields: [
            {
              label: "GSTIN",
              fieldname: "billing_gstin",
              fieldtype: "Data",
              default: this.billingGstin
            },
            {
              fieldtype: "Column Break"
            },
            {
              label: "Business Name",
              fieldname: "business_name",
              fieldtype: "Data",
              default: this.businessName
            },
            {
              fieldtype: "Section Break"
            },
            {
              label: "Address 1",
              fieldname: "address_line1",
              fieldtype: "Data",
              default: this.addressLine1
            },
            {
              label: "Address 2",
              fieldname: "address_line2",
              fieldtype: "Data",
              default: this.addressLine2
            },
            {
              label: "City",
              fieldname: "city",
              fieldtype: "Data",
              default: this.city
            },
            {
              fieldtype: "Column Break"
            },
            {
              label: "State",
              fieldname: "state",
              fieldtype: "Autocomplete",
              default: this.state,
              options: this.country.toLowerCase() === "india" ? states : []
            },
            {
              label: "Country",
              fieldname: "country",
              fieldtype: "Data",
              default: this.country,
              onchange() {
                this.value.toLowerCase() === "india" ? dialog.set_df_property("state", "options", states) : dialog.set_df_property("state", "options", []);
              }
            },
            {
              label: "Postal Code",
              fieldname: "pincode",
              fieldtype: "Data",
              default: this.pincode
            },
            {
              fieldtype: "Section Break"
            }
          ],
          primary_action_label: "Save",
          primary_action: async () => {
            const values = dialog.get_values();
            if (JSON.stringify(this.billingDetails) === JSON.stringify(values)) {
              dialog.hide();
              return;
            }
            this.billingDetails = values;
            await this.$store.dispatch("updateBillingDetails", values);
            dialog.hide();
            frappe.show_alert({
              message: "Billing Details updated successfully",
              indicator: "green"
            });
          }
        }).show();
      },
      redirectToHome(message, color) {
        this.$router.push({
          name: "home",
          replace: true,
          params: { message: { message, color } }
        });
      },
      initCashFree(orderToken) {
        const style2 = getComputedStyle(document.body);
        const primaryColor = style2.getPropertyValue("--primary");
        const cardBg = style2.getPropertyValue("--card-bg");
        const theme = document.documentElement.getAttribute("data-theme-mode") || "light";
        const dropConfig = {
          components: ["card", "netbanking", "app", "upi"],
          orderToken,
          onSuccess: async (data) => {
            if (data.order && data.order.status == "PAID") {
              const response = await verify_payment(data.order.orderId);
              if (!response.success || response.error) {
                this.redirectToHome(response.error, "red");
                return;
              }
              this.redirectToHome(`Thanks for purchasing API credits! We have successfully added <strong>${this.orderDetails.credits}</strong> credits to your account.`, "green");
            }
          },
          onFailure: (data) => {
            var _a;
            if (data.order.errorText) {
              return this.redirectToHome(data.order.errorText, "red");
            }
            frappe.throw(((_a = data.transaction) == null ? void 0 : _a.txMsg) || "Something went wrong, please try again later", "Payment Failed");
          },
          style: {
            backgroundColor: cardBg.trim(),
            color: primaryColor.trim(),
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            errorColor: "#ff0000",
            theme
          }
        };
        const cashfree = new Cashfree();
        const paymentElement = document.getElementById("payment-gateway");
        cashfree.initialiseDropin(paymentElement, dropConfig);
        document.querySelector("#payment-gateway iframe").setAttribute("scrolling", "no");
      }
    },
    created() {
      const script = document.createElement("script");
      script.setAttribute("src", "https://sdk.cashfree.com/js/ui/1.0.26/dropinClient.prod.js");
      document.head.appendChild(script);
      script.onload = async () => {
        this.initCashFree(this.$route.params.order.token);
        await this.$store.dispatch("fetchDetails", "billing");
        this.isLoading = false;
        this.billingDetails = this.$store.state.account.billingDetails;
      };
    }
  };
  var __vue_render__13 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "container ic-account-page payment-page" }, [
      _c("PageTitle", {
        staticClass: "title",
        attrs: { title: "Make Payment" }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "main-content" }, [
        _c("div", {
          staticClass: "card card-payment-gateway",
          attrs: { id: "payment-gateway" }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "card" }, [
          _vm.isLoading ? _c("PreLoader") : [
            _c("div", { staticClass: "billing-details" }, [
              _c("div", { staticClass: "sub-heading" }, [
                _c("p", { staticClass: "title" }, [
                  _vm._v("Billing Details")
                ]),
                _vm._v(" "),
                _c("a", {
                  staticClass: "text-highlight text-right",
                  on: {
                    click: function($event) {
                      $event.preventDefault();
                      return _vm.editAddress.apply(null, arguments);
                    }
                  }
                }, [_vm._v("\n              Edit\n            ")])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "billing-details-body" }, [
                _c("p", { staticClass: "company-title" }, [
                  _vm._v(_vm._s(_vm.businessName))
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "company-footer" }, [
                  _c("p", [_vm._v(_vm._s(_vm.addressLine1))]),
                  _vm._v(" "),
                  _c("p", [_vm._v(_vm._s(_vm.addressLine2))]),
                  _vm._v(" "),
                  _c("p", [
                    _vm._v(_vm._s(_vm.city) + ", " + _vm._s(_vm.billingDetails.state) + " - " + _vm._s(_vm.pincode))
                  ])
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "company-footer" }, [
                  _c("strong", [_vm._v("GSTIN: ")]),
                  _vm._v(" " + _vm._s(_vm.billingGstin))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "order-summary" }, [
              _c("div", { staticClass: "sub-heading" }, [
                _c("p", { staticClass: "title" }, [
                  _vm._v("Order Summary")
                ]),
                _vm._v(" "),
                _c("a", {
                  staticClass: "text-highlight text-right",
                  on: {
                    click: function($event) {
                      return _vm.$router.go(-1);
                    }
                  }
                }, [_vm._v("\n              Edit\n            ")])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "order-summary-body" }, [
                _c("div", { staticClass: "row" }, [
                  _c("p", { staticClass: "col" }, [
                    _vm._v("Credits Purchased")
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "col order-summary-value" }, [
                    _vm._v("\n                " + _vm._s(_vm.getReadableNumber(_vm.orderDetails.credits, 0)) + "\n              ")
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "row" }, [
                  _c("p", { staticClass: "col" }, [_vm._v("Valid Upto")]),
                  _vm._v(" "),
                  _c("p", { staticClass: "col order-summary-value" }, [
                    _vm._v("\n                " + _vm._s(_vm.creditsValidity) + "\n              ")
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "row" }, [
                  _c("p", { staticClass: "col" }, [_vm._v("Net Amount")]),
                  _vm._v(" "),
                  _c("p", { staticClass: "col order-summary-value" }, [
                    _vm._v("\n                \u20B9 " + _vm._s(_vm.getReadableNumber(_vm.orderDetails.netTotal)) + "\n              ")
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "row" }, [
                  _c("p", { staticClass: "col" }, [
                    _vm._v("GST @ " + _vm._s(_vm.orderDetails.taxRate) + "%")
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "col order-summary-value" }, [
                    _vm._v("\n                \u20B9 " + _vm._s(_vm.getReadableNumber(_vm.orderDetails.tax)) + "\n              ")
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "summary-footer row" }, [
                  _c("p", { staticClass: "col" }, [
                    _vm._v("Amount Payable")
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "col order-summary-value" }, [
                    _vm._v("\n                \u20B9 " + _vm._s(_vm.getReadableNumber(_vm.orderDetails.grandTotal)) + "\n              ")
                  ])
                ])
              ])
            ])
          ]
        ], 2)
      ])
    ], 1);
  };
  var __vue_staticRenderFns__13 = [];
  __vue_render__13._withStripped = true;
  var __vue_inject_styles__13 = function(inject) {
    if (!inject)
      return;
    inject("data-v-11909edd_0", { source: "\n.card[data-v-11909edd] {\n  max-height: 40em;\n}\n.card-payment-gateway[data-v-11909edd] {\n  padding: 0 !important;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n.order-summary-value[data-v-11909edd] {\n  font-weight: 600;\n  text-align: end;\n  font-size: 1.1em;\n}\n.summary-footer[data-v-11909edd] {\n  font-size: 1.3em;\n  font-weight: 600;\n  margin-top: 0.9em;\n}\n.plan-header[data-v-11909edd] {\n  text-align: end;\n  font-size: 0.75em;\n  margin-bottom: 1.6em;\n  font-weight: 400;\n}\n.company-title[data-v-11909edd] {\n  font-size: 1.3em;\n  font-weight: bold;\n}\n.company-footer[data-v-11909edd] {\n  font-size: 1em;\n  color: var(--text-light);\n}\n.sub-heading[data-v-11909edd] {\n  display: flex;\n  justify-content: space-between;\n  flex-direction: row;\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/pages/PaymentPage.vue"], "names": [], "mappings": ";AA6TA;EACA,gBAAA;AACA;AAEA;EACA,qBAAA;EACA,kBAAA;EACA,kBAAA;AACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,gBAAA;AACA;AAEA;EACA,gBAAA;EACA,gBAAA;EACA,iBAAA;AACA;AAEA;EACA,eAAA;EACA,iBAAA;EACA,oBAAA;EACA,gBAAA;AACA;AAEA;EACA,gBAAA;EACA,iBAAA;AACA;AAEA;EACA,cAAA;EACA,wBAAA;AACA;AAEA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;AACA", "file": "PaymentPage.vue", "sourcesContent": ['<template>\n  <div class="container ic-account-page payment-page">\n    <PageTitle title="Make Payment" class="title" />\n    <div class="main-content">\n      <div class="card card-payment-gateway" id="payment-gateway">\n        <!-- Content -->\n      </div>\n      <div class="card">\n        <PreLoader v-if="isLoading" />\n        <template v-else>\n          <div class="billing-details">\n            <div class="sub-heading">\n              <p class="title">Billing Details</p>\n              <a class="text-highlight text-right" @click.prevent="editAddress">\n                Edit\n              </a>\n            </div>\n            <div class="billing-details-body">\n              <p class="company-title">{{ businessName }}</p>\n              <div class="company-footer">\n                <p>{{ addressLine1 }}</p>\n                <p>{{ addressLine2 }}</p>\n                <p>{{ city }}, {{ billingDetails.state }} - {{ pincode }}</p>\n              </div>\n              <p class="company-footer"><strong>GSTIN: </strong> {{ billingGstin }}</p>\n            </div>\n          </div>\n          <div class="order-summary">\n            <div class="sub-heading">\n              <p class="title">Order Summary</p>\n              <a @click="$router.go(-1)" class="text-highlight text-right">\n                Edit\n              </a>\n            </div>\n            <div class="order-summary-body">\n              <div class="row">\n                <p class="col">Credits Purchased</p>\n                <p class="col order-summary-value">\n                  {{ getReadableNumber(orderDetails.credits, 0) }}\n                </p>\n              </div>\n              <div class="row">\n                <p class="col">Valid Upto</p>\n                <p class="col order-summary-value">\n                  {{ creditsValidity }}\n                </p>\n              </div>\n              <div class="row">\n                <p class="col">Net Amount</p>\n                <p class="col order-summary-value">\n                  \u20B9 {{ getReadableNumber(orderDetails.netTotal) }}\n                </p>\n              </div>\n              <div class="row">\n                <p class="col">GST @ {{ orderDetails.taxRate }}%</p>\n                <p class="col order-summary-value">\n                  \u20B9 {{ getReadableNumber(orderDetails.tax) }}\n                </p>\n              </div>\n              <div class="summary-footer row">\n                <p class="col">Amount Payable</p>\n                <p class="col order-summary-value">\n                  \u20B9 {{ getReadableNumber(orderDetails.grandTotal) }}\n                </p>\n              </div>\n            </div>\n          </div>\n        </template>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport PageTitle from "../components/PageTitle.vue";\nimport PreLoader from "../components/PreLoader.vue";\nimport { verify_payment } from "../services/AccountService";\nimport { getReadableNumber } from "../utils";\n\nexport default {\n  components: {\n    PageTitle,\n    PreLoader,\n  },\n\n  data() {\n    return {\n      isLoading: true,\n      // TODO: fix reactivity of vuex store\'s state `billingDetails` and use computed property instead\n      billingDetails: {},\n    };\n  },\n\n  beforeRouteEnter(to, from, next) {\n    if (to.params.order) return next();\n    next({ name: "home", replace: true });\n  },\n\n  computed: {\n    billingGstin() {\n      return this.billingDetails.billing_gstin;\n    },\n\n    businessName() {\n      return this.billingDetails.business_name;\n    },\n\n    addressLine1() {\n      return this.billingDetails.address_line1;\n    },\n\n    addressLine2() {\n      return this.billingDetails.address_line2;\n    },\n\n    city() {\n      return this.billingDetails.city;\n    },\n\n    state() {\n      return this.billingDetails.state;\n    },\n\n    country() {\n      return this.billingDetails.country;\n    },\n\n    pincode() {\n      return this.billingDetails.pincode;\n    },\n\n    orderDetails() {\n      return this.$route.params.order;\n    },\n\n    creditsValidity() {\n      return frappe.datetime.str_to_user(this.orderDetails.validity);\n    },\n  },\n\n  methods: {\n    getReadableNumber,\n    editAddress() {\n      const states = frappe.boot.india_state_options || [];\n      const dialog = new frappe.ui.Dialog({\n        title: "Edit Billing Address",\n        fields: [\n          {\n            label: "GSTIN",\n            fieldname: "billing_gstin",\n            fieldtype: "Data",\n            default: this.billingGstin,\n          },\n          {\n            fieldtype: "Column Break",\n          },\n          {\n            label: "Business Name",\n            fieldname: "business_name",\n            fieldtype: "Data",\n            default: this.businessName,\n          },\n          {\n            fieldtype: "Section Break",\n          },\n          {\n            label: "Address 1",\n            fieldname: "address_line1",\n            fieldtype: "Data",\n            default: this.addressLine1,\n          },\n          {\n            label: "Address 2",\n            fieldname: "address_line2",\n            fieldtype: "Data",\n            default: this.addressLine2,\n          },\n          {\n            label: "City",\n            fieldname: "city",\n            fieldtype: "Data",\n            default: this.city,\n          },\n          {\n            fieldtype: "Column Break",\n          },\n          {\n            label: "State",\n            fieldname: "state",\n            fieldtype: "Autocomplete",\n            default: this.state,\n            options: this.country.toLowerCase() === "india" ? states : []\n          },\n          {\n            label: "Country",\n            fieldname: "country",\n            fieldtype: "Data",\n            default: this.country,\n            onchange(){\n              // TODO: fix in frappe needed to update dialog options\n              this.value.toLowerCase() === "india" ?\n              dialog.set_df_property("state","options", states):\n              dialog.set_df_property("state", "options", [])\n            }\n          },\n          {\n            label: "Postal Code",\n            fieldname: "pincode",\n            fieldtype: "Data",\n            default: this.pincode,\n          },\n          {\n            fieldtype: "Section Break",\n          },\n        ],\n        primary_action_label: "Save",\n        primary_action: async () => {\n          const values = dialog.get_values();\n\n          // hack: comparing two objects\n          if (JSON.stringify(this.billingDetails) === JSON.stringify(values)) {\n            dialog.hide();\n            return;\n          }\n\n          this.billingDetails = values;\n          await this.$store.dispatch("updateBillingDetails", values);\n\n          dialog.hide();\n          frappe.show_alert({\n            message: "Billing Details updated successfully",\n            indicator: "green",\n          });\n        },\n      }).show();\n    },\n\n    redirectToHome(message, color) {\n      this.$router.push({\n        name: "home",\n        replace: true,\n        params: { message: { message, color } },\n      });\n    },\n    initCashFree(orderToken) {\n      const style = getComputedStyle(document.body);\n      const primaryColor = style.getPropertyValue("--primary");\n      const cardBg = style.getPropertyValue("--card-bg");\n      const theme =\n        document.documentElement.getAttribute("data-theme-mode") || "light";\n\n      const dropConfig = {\n        components: ["card", "netbanking", "app", "upi"],\n        orderToken,\n        onSuccess: async (data) => {\n          if (data.order && data.order.status == "PAID") {\n            const response = await verify_payment(data.order.orderId);\n            if (!response.success || response.error) {\n              this.redirectToHome(response.error, "red");\n              return;\n            }\n            this.redirectToHome(\n              `Thanks for purchasing API credits! We have successfully added <strong>${this.orderDetails.credits}</strong> credits to your account.`,\n              "green"\n            );\n          }\n        },\n        onFailure: (data) => {\n          // redirecting on order related errors\n          if (data.order.errorText) {\n            return this.redirectToHome(data.order.errorText, "red");\n          }\n\n          frappe.throw(\n            data.transaction?.txMsg ||\n              "Something went wrong, please try again later",\n            "Payment Failed"\n          );\n        },\n        style: {\n          backgroundColor: cardBg.trim(),\n          color: primaryColor.trim(),\n          fontFamily: "Inter, sans-serif",\n          fontSize: "14px",\n          errorColor: "#ff0000",\n          theme, //(or dark)\n        },\n      };\n\n      const cashfree = new Cashfree();\n      const paymentElement = document.getElementById("payment-gateway");\n      cashfree.initialiseDropin(paymentElement, dropConfig);\n\n      document\n        .querySelector("#payment-gateway iframe")\n        .setAttribute("scrolling", "no");\n    },\n  },\n\n  created() {\n    const script = document.createElement("script");\n    script.setAttribute(\n      "src",\n      "https://sdk.cashfree.com/js/ui/1.0.26/dropinClient.prod.js"\n    );\n    document.head.appendChild(script);\n    script.onload = async () => {\n      this.initCashFree(this.$route.params.order.token);\n      await this.$store.dispatch("fetchDetails", "billing");\n      this.isLoading = false;\n      this.billingDetails = this.$store.state.account.billingDetails;\n    };\n  },\n};\n<\/script>\n\n<style scoped>\n.card {\n  max-height: 40em;\n}\n\n.card-payment-gateway {\n  padding: 0 !important;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n\n.order-summary-value {\n  font-weight: 600;\n  text-align: end;\n  font-size: 1.1em;\n}\n\n.summary-footer {\n  font-size: 1.3em;\n  font-weight: 600;\n  margin-top: 0.9em;\n}\n\n.plan-header {\n  text-align: end;\n  font-size: 0.75em;\n  margin-bottom: 1.6em;\n  font-weight: 400;\n}\n\n.company-title {\n  font-size: 1.3em;\n  font-weight: bold;\n}\n\n.company-footer {\n  font-size: 1em;\n  color: var(--text-light);\n}\n\n.sub-heading {\n  display: flex;\n  justify-content: space-between;\n  flex-direction: row;\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__13 = "data-v-11909edd";
  var __vue_module_identifier__13 = void 0;
  var __vue_is_functional_template__13 = false;
  function __vue_normalize__13(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/pages/PaymentPage.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__12() {
    const styles = __vue_create_injector__12.styles || (__vue_create_injector__12.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__13 = /* @__PURE__ */ __vue_normalize__13({ render: __vue_render__13, staticRenderFns: __vue_staticRenderFns__13 }, __vue_inject_styles__13, __vue_script__13, __vue_scope_id__13, __vue_is_functional_template__13, __vue_module_identifier__13, false, __vue_create_injector__12, void 0, void 0);
  var PaymentPage_default = __vue_component__13;

  // ../india/india/public/js/india_compliance_account/router.js
  var routes = [
    {
      name: "auth",
      path: "/authentication",
      component: AuthPage_default
    },
    {
      name: "mailSent",
      path: "/mail-sent",
      component: MailSentPage_default
    },
    {
      name: "purchaseCredits",
      path: "/purchase-credits",
      component: PurchaseCreditsPage_default
    },
    {
      name: "paymentPage",
      path: "/payment-page",
      component: PaymentPage_default
    },
    {
      name: "home",
      path: "/",
      component: AccountPage_default,
      alias: "/account"
    }
  ];
  var router_default = new vue_router_esm_default({
    mode: "history",
    base: "/app/india-compliance-account",
    routes
  });

  // ../india/india/public/js/india_compliance_account/store/index.js
  var import_vuex = __toESM(require_vuex_common());

  // ../india/india/public/js/india_compliance_account/store/modules/auth.js
  var auth_default = {
    state: {
      api_secret: null,
      session: null
    },
    mutations: {
      SET_API_SECRET(state, api_secret) {
        state.api_secret = api_secret;
        state.session = null;
      },
      SET_SESSION(state, session) {
        state.session = session;
      }
    },
    actions: {
      async initAuth({ dispatch }) {
        await dispatch("authenticate");
      },
      async authenticate({ state, dispatch, commit }) {
        const api_secret = await get_api_secret();
        if (api_secret)
          return commit("SET_API_SECRET", api_secret);
        await dispatch("fetchSession");
        if (!state.session)
          return;
        const response = await validate_session(state.session.id);
        if (response.error) {
          if (response.exc_type === "InvalidSessionError") {
            await dispatch("setSession", null);
          }
          return;
        }
        if (!response.message || !response.message.api_secret)
          return;
        await dispatch("setApiSecret", response.message.api_secret);
      },
      async setSession({ commit }, session) {
        await set_session(session);
        commit("SET_SESSION", session);
      },
      async setApiSecret({ commit }, api_secret) {
        await set_api_secret(api_secret);
        commit("SET_API_SECRET", api_secret);
      },
      async fetchSession({ commit }) {
        commit("SET_SESSION", await get_session());
      }
    },
    getters: {
      isLoggedIn(state) {
        return !!state.api_secret;
      },
      hasSession(state) {
        return !!state.session;
      }
    }
  };

  // ../india/india/public/js/india_compliance_account/store/modules/account.js
  var account_default = {
    state: {
      subscriptionDetails: null,
      calculatorDetails: null,
      billingDetails: null,
      orderToken: null
    },
    mutations: {
      SET_SUBSCRIPTION_DETAILS(state, subscriptionDetails) {
        state.subscriptionDetails = subscriptionDetails;
      },
      SET_CALCULATOR_DETAILS(state, calculatorDetails) {
        state.calculatorDetails = calculatorDetails;
      },
      SET_BILLING_DETAILS(state, billingDetails) {
        state.billingDetails = billingDetails;
      },
      SET_ORDER_TOKEN(state, orderToken) {
        state.orderToken = orderToken;
      }
    },
    actions: {
      async fetchDetails({ commit }, type) {
        const response = await get_details(type);
        if (response.invalid_token)
          return this.dispatch("setApiSecret", null);
        if (!response.success || !response.message)
          frappe.throw();
        commit(`SET_${type.toUpperCase()}_DETAILS`, response.message);
      },
      async updateBillingDetails({ commit }, billingDetails) {
        const response = await update_billing_details(billingDetails);
        if (response.invalid_token)
          return this.dispatch("setApiSecret", null);
        if (!response.success || !response.message)
          frappe.throw();
        commit("SET_BILLING_DETAILS", response.message);
        return response.message;
      },
      async createOrder({ commit }, { credits, amount }) {
        const response = await create_order(credits, amount);
        if (response.invalid_token)
          return this.dispatch("setApiSecret", null);
        if (!response.success || !response.message || !response.message.order_token)
          frappe.throw();
        commit("SET_ORDER_TOKEN", response.message.order_token);
      }
    },
    getters: {}
  };

  // ../india/india/public/js/india_compliance_account/store/index.js
  var store_default = new import_vuex.default.Store({
    modules: {
      auth: auth_default,
      account: account_default
    }
  });

  // ../india/india/public/js/india_compliance_account/components/TheFooter.vue
  var __vue_script__14 = {};
  var __vue_render__14 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm._m(0);
  };
  var __vue_staticRenderFns__14 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("footer", { staticClass: "container" }, [
        _c("ul", { staticClass: "footer-menu" }),
        _vm._v(" "),
        _c("div", { staticClass: "footer-logo" }, [
          _c("p", [_vm._v("ASP Services by")]),
          _vm._v(" "),
          _c("a", { attrs: { href: "https://www.resilient.tech", target: "_blank" } }, [_c("img", { attrs: { src: "", alt: "footer-logo" } })])
        ])
      ]);
    }
  ];
  __vue_render__14._withStripped = true;
  var __vue_inject_styles__14 = function(inject) {
    if (!inject)
      return;
    inject("data-v-31cc7928_0", { source: '\nfooter[data-v-31cc7928] {\n  margin-top: 5em;\n  margin-bottom: 1em;\n  padding: 2em 3em 3em 3em;\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n}\n.footer-menu[data-v-31cc7928] {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  align-items: center;\n}\n.footer-logo p[data-v-31cc7928],\n.footer-menu a[data-v-31cc7928] {\n  color: var(--text-light);\n  opacity: 0.7;\n}\n.footer-menu li[data-v-31cc7928]:not(:last-child)::after {\n  content: "|";\n  margin: 0 1em;\n  color: var(--text-light);\n  opacity: 0.7;\n}\n.footer-logo[data-v-31cc7928] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  max-width: 13em;\n}\n.footer-logo img[data-v-31cc7928] {\n  content: url("https://india-compliance.s3.ap-south-1.amazonaws.com/logo.png");\n}\n[data-theme="dark"] .footer-logo img[data-v-31cc7928] {\n  content: url("https://india-compliance.s3.ap-south-1.amazonaws.com/logo_dark.png");\n}\n@media screen and (max-width: 768px) {\nfooter[data-v-31cc7928] {\n    flex-direction: column;\n    align-items: center;\n    padding: 2em 0;\n}\n.footer-menu[data-v-31cc7928] {\n    margin-top: 1em;\n}\n.footer-logo[data-v-31cc7928] {\n    margin-top: 1em;\n}\n}\n', map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/components/TheFooter.vue"], "names": [], "mappings": ";AAiBA;EACA,eAAA;EACA,kBAAA;EACA,wBAAA;EACA,aAAA;EACA,WAAA;EACA,8BAAA;AACA;AAEA;EACA,SAAA;EACA,UAAA;EACA,gBAAA;EACA,aAAA;EACA,mBAAA;AACA;AACA;;EAEA,wBAAA;EACA,YAAA;AACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,wBAAA;EACA,YAAA;AACA;AAEA;EACA,aAAA;EACA,sBAAA;EACA,qBAAA;EACA,eAAA;AACA;AAEA;EACA,6EAAA;AACA;AAEA;EACA,kFAAA;AACA;AAEA;AACA;IACA,sBAAA;IACA,mBAAA;IACA,cAAA;AACA;AACA;IACA,eAAA;AACA;AACA;IACA,eAAA;AACA;AACA", "file": "TheFooter.vue", "sourcesContent": ['<template>\n  <footer class="container">\n    <ul class="footer-menu">\n      <!-- <li><a href="#">FAQs</a></li>\n      <li><a href="#">Terms & Conditions</a></li>\n      <li><a href="#">Privacy Policy</a></li> -->\n    </ul>\n    <div class="footer-logo">\n      <p>ASP Services by</p>\n      <a href="https://www.resilient.tech" target="_blank">\n        <img src="" alt="footer-logo" />\n      </a>\n    </div>\n  </footer>\n</template>\n\n<style scoped>\nfooter {\n  margin-top: 5em;\n  margin-bottom: 1em;\n  padding: 2em 3em 3em 3em;\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n}\n\n.footer-menu {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  align-items: center;\n}\n.footer-logo p,\n.footer-menu a {\n  color: var(--text-light);\n  opacity: 0.7;\n}\n\n.footer-menu li:not(:last-child)::after {\n  content: "|";\n  margin: 0 1em;\n  color: var(--text-light);\n  opacity: 0.7;\n}\n\n.footer-logo {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  max-width: 13em;\n}\n\n.footer-logo img {\n  content: url("https://india-compliance.s3.ap-south-1.amazonaws.com/logo.png");\n}\n\n[data-theme="dark"] .footer-logo img {\n  content: url("https://india-compliance.s3.ap-south-1.amazonaws.com/logo_dark.png");\n}\n\n@media screen and (max-width: 768px) {\n  footer {\n    flex-direction: column;\n    align-items: center;\n    padding: 2em 0;\n  }\n  .footer-menu {\n    margin-top: 1em;\n  }\n  .footer-logo {\n    margin-top: 1em;\n  }\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__14 = "data-v-31cc7928";
  var __vue_module_identifier__14 = void 0;
  var __vue_is_functional_template__14 = false;
  function __vue_normalize__14(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/components/TheFooter.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__13() {
    const styles = __vue_create_injector__13.styles || (__vue_create_injector__13.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__14 = /* @__PURE__ */ __vue_normalize__14({ render: __vue_render__14, staticRenderFns: __vue_staticRenderFns__14 }, __vue_inject_styles__14, __vue_script__14, __vue_scope_id__14, __vue_is_functional_template__14, __vue_module_identifier__14, false, __vue_create_injector__13, void 0, void 0);
  var TheFooter_default = __vue_component__14;

  // ../india/india/public/js/india_compliance_account/IndiaComplianceAccountApp.vue
  var __vue_script__15 = {
    components: { PreLoader: PreLoader_default, TheFooter: TheFooter_default },
    data() {
      return {
        isLoading: true
      };
    },
    watch: {
      async $route() {
        frappe.router.current_route = await frappe.router.parse();
        frappe.breadcrumbs.update();
      }
    },
    async created() {
      await this.$store.dispatch("initAuth");
      this.isLoading = false;
    }
  };
  var __vue_render__15 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "india-compliance-account" }, [
      _c("transition", { attrs: { name: "fade" } }, [
        _c("div", { staticClass: "content" }, [
          _vm.isLoading ? _c("PreLoader") : _c("transition", { attrs: { name: "fade", mode: "out-in" } }, [_c("router-view")], 1)
        ], 1)
      ]),
      _vm._v(" "),
      _c("TheFooter")
    ], 1);
  };
  var __vue_staticRenderFns__15 = [];
  __vue_render__15._withStripped = true;
  var __vue_inject_styles__15 = function(inject) {
    if (!inject)
      return;
    inject("data-v-f263b484_0", { source: "\n.india-compliance-account[data-v-f263b484] {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n.india-compliance-account > .content[data-v-f263b484] {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n", map: { "version": 3, "sources": ["../india/india/public/js/india_compliance_account/IndiaComplianceAccountApp.vue"], "names": [], "mappings": ";AA0CA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;AACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AACA", "file": "IndiaComplianceAccountApp.vue", "sourcesContent": ['<template>\n  <div class="india-compliance-account">\n    <transition name="fade">\n      <div class="content">\n          <PreLoader v-if="isLoading" />\n          <transition name="fade" mode="out-in" v-else>\n            <router-view />\n          </transition>\n      </div>\n    </transition>\n    <TheFooter />\n  </div>\n</template>\n\n<script>\nimport PreLoader from "./components/PreLoader.vue";\nimport TheFooter from "./components/TheFooter.vue";\n\nexport default {\n  components: { PreLoader, TheFooter },\n\n  data() {\n    return {\n      isLoading: true,\n    };\n  },\n\n  watch: {\n    async $route() {\n      frappe.router.current_route = await frappe.router.parse();\n      frappe.breadcrumbs.update();\n    },\n  },\n\n  async created() {\n    await this.$store.dispatch("initAuth");\n    this.isLoading = false;\n  },\n};\n<\/script>\n\n<style scoped>\n.india-compliance-account {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.india-compliance-account > .content {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__15 = "data-v-f263b484";
  var __vue_module_identifier__15 = void 0;
  var __vue_is_functional_template__15 = false;
  function __vue_normalize__15(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../india/india/public/js/india_compliance_account/IndiaComplianceAccountApp.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__14() {
    const styles = __vue_create_injector__14.styles || (__vue_create_injector__14.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__15 = /* @__PURE__ */ __vue_normalize__15({ render: __vue_render__15, staticRenderFns: __vue_staticRenderFns__15 }, __vue_inject_styles__15, __vue_script__15, __vue_scope_id__15, __vue_is_functional_template__15, __vue_module_identifier__15, false, __vue_create_injector__14, void 0, void 0);
  var IndiaComplianceAccountApp_default = __vue_component__15;

  // ../india/india/public/js/india_compliance_account/india_compliance_account.bundle.js
  var IndiaComplianceAccountPage = class {
    constructor(wrapper) {
      this.pageName = "india-compliance-account";
      this.containerId = "india-compliance-account-app-container";
      $(wrapper).html(`<div id="${this.containerId}"></div>`);
      this.setTitle();
      this.show();
    }
    setTitle() {
      frappe.utils.set_title(__("India Compliance Account"));
    }
    show() {
      vue_runtime_esm_default.use(vue_router_esm_default);
      vue_runtime_esm_default.use(import_vuex2.default);
      new vue_runtime_esm_default({
        el: `#${this.containerId}`,
        router: router_default,
        store: store_default,
        render: (h) => h(IndiaComplianceAccountApp_default)
      });
      $(frappe.pages[this.pageName]).on("show", () => {
        this.setTitle();
        router_default.replace({ name: store_default.getters.isLoggedIn ? "home" : "auth" });
      });
    }
  };
  frappe.provide("india_compliance.pages");
  india_compliance.pages.IndiaComplianceAccountPage = IndiaComplianceAccountPage;
  frappe.provide("india_compliance.gst_api");
  india_compliance.gst_api.call = async function(endpoint, options) {
    var _a;
    try {
      const base_url = "https://asp.resilient.tech/v1/";
      const url = base_url + endpoint;
      const headers = { "Content-Type": "application/json" };
      if (options.headers)
        Object.assign(headers, options.headers);
      if (options.with_api_secret || options.api_secret) {
        const api_secret = options.api_secret || await get_api_secret();
        headers["x-api-key"] = api_secret;
      }
      const args = {
        method: options.method || "POST",
        headers,
        mode: "cors"
      };
      if (options.body)
        args.body = JSON.stringify(options.body);
      const response = await fetch(url, args);
      const data = await response.json();
      if (response.ok)
        return __spreadValues({ success: true }, data);
      throw new UnsuccessfulResponseError(data);
    } catch (e) {
      const error = e.message || "Something went wrong, Please try again later!";
      if (!options.fail_silently) {
        frappe.msgprint({
          message: error,
          title: "Error",
          indicator: "red"
        });
      }
      return __spreadProps(__spreadValues({}, e.response), {
        success: false,
        error,
        invalid_token: (_a = e.response.exc_type) == null ? void 0 : _a.includes("InvalidAuthorizationToken")
      });
    }
  };
  function extract_error_message(responseBody) {
    const { exc_type, exception, _server_messages } = responseBody;
    if (!exception) {
      if (_server_messages) {
        const server_messages = JSON.parse(_server_messages);
        return server_messages.map((message) => JSON.parse(message).message || "").join("\n");
      }
      return "Something went wrong, Please try again later!";
    }
    return exception.replace(new RegExp(".*" + exc_type + ":", "gi"), "").trim();
  }
  var UnsuccessfulResponseError = class extends Error {
    constructor(response) {
      super(extract_error_message(response));
      this.response = response;
    }
  };
})();
/*!
 * Vue.js v2.6.14
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */
/**
  * vue-router v2.8.1
  * (c) 2017 Evan You
  * @license MIT
  */
//# sourceMappingURL=india_compliance_account.bundle.ZP5W5RQ4.js.map
