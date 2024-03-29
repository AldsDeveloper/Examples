(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-monaco-editor', ['exports', '@angular/core', '@angular/forms', 'rxjs', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-monaco-editor'] = {}, global.ng.core, global.ng.forms, global.rxjs, global.ng.common));
}(this, (function (exports, i0, forms, rxjs, common) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var NGX_MONACO_EDITOR_CONFIG = new i0.InjectionToken('NGX_MONACO_EDITOR_CONFIG');

    var loadedMonaco = false;
    var loadPromise;
    var BaseEditor = /** @class */ (function () {
        function BaseEditor(config) {
            this.config = config;
            this.onInit = new i0.EventEmitter();
        }
        BaseEditor.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (loadedMonaco) {
                // Wait until monaco editor is available
                loadPromise.then(function () {
                    _this.initMonaco(_this._options);
                });
            }
            else {
                loadedMonaco = true;
                loadPromise = new Promise(function (resolve) {
                    var baseUrl = (_this.config.baseUrl || './assets') + '/monaco-editor/min/vs';
                    if (typeof (window.monaco) === 'object') {
                        resolve();
                        return;
                    }
                    var onGotAmdLoader = function () {
                        // Load monaco
                        window.require.config({ paths: { 'vs': "" + baseUrl } });
                        window.require(["vs/editor/editor.main"], function () {
                            if (typeof _this.config.onMonacoLoad === 'function') {
                                _this.config.onMonacoLoad();
                            }
                            _this.initMonaco(_this._options);
                            resolve();
                        });
                    };
                    // Load AMD loader if necessary
                    if (!window.require) {
                        var loaderScript = document.createElement('script');
                        loaderScript.type = 'text/javascript';
                        loaderScript.src = baseUrl + "/loader.js";
                        loaderScript.addEventListener('load', onGotAmdLoader);
                        document.body.appendChild(loaderScript);
                    }
                    else {
                        onGotAmdLoader();
                    }
                });
            }
        };
        BaseEditor.prototype.ngOnDestroy = function () {
            if (this._windowResizeSubscription) {
                this._windowResizeSubscription.unsubscribe();
            }
            if (this._editor) {
                this._editor.dispose();
                this._editor = undefined;
            }
        };
        return BaseEditor;
    }());
    BaseEditor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: BaseEditor, deps: [{ token: NGX_MONACO_EDITOR_CONFIG }], target: i0__namespace.ɵɵFactoryTarget.Component });
    BaseEditor.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: BaseEditor, selector: "ng-component", outputs: { onInit: "onInit" }, viewQueries: [{ propertyName: "_editorContainer", first: true, predicate: ["editorContainer"], descendants: true, static: true }], ngImport: i0__namespace, template: '', isInline: true });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: BaseEditor, decorators: [{
                type: i0.Component,
                args: [{
                        template: ''
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [NGX_MONACO_EDITOR_CONFIG]
                        }] }];
        }, propDecorators: { _editorContainer: [{
                    type: i0.ViewChild,
                    args: ['editorContainer', { static: true }]
                }], onInit: [{
                    type: i0.Output
                }] } });

    var EditorComponent = /** @class */ (function (_super) {
        __extends(EditorComponent, _super);
        function EditorComponent(zone, editorConfig) {
            var _this = _super.call(this, editorConfig) || this;
            _this.zone = zone;
            _this.editorConfig = editorConfig;
            _this._value = '';
            _this.propagateChange = function (_) { };
            _this.onTouched = function () { };
            return _this;
        }
        Object.defineProperty(EditorComponent.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (options) {
                this._options = Object.assign({}, this.config.defaultOptions, options);
                if (this._editor) {
                    this._editor.dispose();
                    this.initMonaco(options);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EditorComponent.prototype, "model", {
            set: function (model) {
                this.options.model = model;
                if (this._editor) {
                    this._editor.dispose();
                    this.initMonaco(this.options);
                }
            },
            enumerable: false,
            configurable: true
        });
        EditorComponent.prototype.writeValue = function (value) {
            var _this = this;
            this._value = value || '';
            // Fix for value change while dispose in process.
            setTimeout(function () {
                if (_this._editor && !_this.options.model) {
                    _this._editor.setValue(_this._value);
                }
            });
        };
        EditorComponent.prototype.registerOnChange = function (fn) {
            this.propagateChange = fn;
        };
        EditorComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        EditorComponent.prototype.initMonaco = function (options) {
            var _this = this;
            var hasModel = !!options.model;
            if (hasModel) {
                var model = monaco.editor.getModel(options.model.uri || '');
                if (model) {
                    options.model = model;
                    options.model.setValue(this._value);
                }
                else {
                    options.model = monaco.editor.createModel(options.model.value, options.model.language, options.model.uri);
                }
            }
            this._editor = monaco.editor.create(this._editorContainer.nativeElement, options);
            if (!hasModel) {
                this._editor.setValue(this._value);
            }
            this._editor.onDidChangeModelContent(function (e) {
                var value = _this._editor.getValue();
                // value is not propagated to parent when executing outside zone.
                _this.zone.run(function () {
                    _this.propagateChange(value);
                    _this._value = value;
                });
            });
            this._editor.onDidBlurEditorWidget(function () {
                _this.onTouched();
            });
            // refresh layout on resize event.
            if (this._windowResizeSubscription) {
                this._windowResizeSubscription.unsubscribe();
            }
            this._windowResizeSubscription = rxjs.fromEvent(window, 'resize').subscribe(function () { return _this._editor.layout(); });
            this.onInit.emit(this._editor);
        };
        return EditorComponent;
    }(BaseEditor));
    EditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: EditorComponent, deps: [{ token: i0__namespace.NgZone }, { token: NGX_MONACO_EDITOR_CONFIG }], target: i0__namespace.ɵɵFactoryTarget.Component });
    EditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: EditorComponent, selector: "ngx-monaco-editor", inputs: { options: "options", model: "model" }, providers: [{
                provide: forms.NG_VALUE_ACCESSOR,
                useExisting: i0.forwardRef(function () { return EditorComponent; }),
                multi: true
            }], usesInheritance: true, ngImport: i0__namespace, template: '<div class="editor-container" #editorContainer></div>', isInline: true, styles: ["\n      :host {\n          display: block;\n          height: 200px;\n      }\n\n      .editor-container {\n          width: 100%;\n          height: 98%;\n      }\n  "] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: EditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-monaco-editor',
                        template: '<div class="editor-container" #editorContainer></div>',
                        styles: ["\n      :host {\n          display: block;\n          height: 200px;\n      }\n\n      .editor-container {\n          width: 100%;\n          height: 98%;\n      }\n  "],
                        providers: [{
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return EditorComponent; }),
                                multi: true
                            }]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.NgZone }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [NGX_MONACO_EDITOR_CONFIG]
                        }] }];
        }, propDecorators: { options: [{
                    type: i0.Input,
                    args: ['options']
                }], model: [{
                    type: i0.Input,
                    args: ['model']
                }] } });

    var DiffEditorComponent = /** @class */ (function (_super) {
        __extends(DiffEditorComponent, _super);
        function DiffEditorComponent(editorConfig) {
            var _this = _super.call(this, editorConfig) || this;
            _this.editorConfig = editorConfig;
            return _this;
        }
        Object.defineProperty(DiffEditorComponent.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (options) {
                this._options = Object.assign({}, this.config.defaultOptions, options);
                if (this._editor) {
                    this._editor.dispose();
                    this.initMonaco(options);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiffEditorComponent.prototype, "originalModel", {
            set: function (model) {
                this._originalModel = model;
                if (this._editor) {
                    this._editor.dispose();
                    this.initMonaco(this.options);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiffEditorComponent.prototype, "modifiedModel", {
            set: function (model) {
                this._modifiedModel = model;
                if (this._editor) {
                    this._editor.dispose();
                    this.initMonaco(this.options);
                }
            },
            enumerable: false,
            configurable: true
        });
        DiffEditorComponent.prototype.initMonaco = function (options) {
            var _this = this;
            if (!this._originalModel || !this._modifiedModel) {
                throw new Error('originalModel or modifiedModel not found for ngx-monaco-diff-editor');
            }
            this._originalModel.language = this._originalModel.language || options.language;
            this._modifiedModel.language = this._modifiedModel.language || options.language;
            var originalModel = monaco.editor.createModel(this._originalModel.code, this._originalModel.language);
            var modifiedModel = monaco.editor.createModel(this._modifiedModel.code, this._modifiedModel.language);
            this._editorContainer.nativeElement.innerHTML = '';
            var theme = options.theme;
            this._editor = monaco.editor.createDiffEditor(this._editorContainer.nativeElement, options);
            options.theme = theme;
            this._editor.setModel({
                original: originalModel,
                modified: modifiedModel
            });
            // refresh layout on resize event.
            if (this._windowResizeSubscription) {
                this._windowResizeSubscription.unsubscribe();
            }
            this._windowResizeSubscription = rxjs.fromEvent(window, 'resize').subscribe(function () { return _this._editor.layout(); });
            this.onInit.emit(this._editor);
        };
        return DiffEditorComponent;
    }(BaseEditor));
    DiffEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: DiffEditorComponent, deps: [{ token: NGX_MONACO_EDITOR_CONFIG }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DiffEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: DiffEditorComponent, selector: "ngx-monaco-diff-editor", inputs: { options: "options", originalModel: "originalModel", modifiedModel: "modifiedModel" }, usesInheritance: true, ngImport: i0__namespace, template: '<div class="editor-container" #editorContainer></div>', isInline: true, styles: ["\n    :host {\n      display: block;\n      height: 200px;\n    }\n\n    .editor-container {\n      width: 100%;\n      height: 98%;\n    }\n  "] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: DiffEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-monaco-diff-editor',
                        template: '<div class="editor-container" #editorContainer></div>',
                        styles: ["\n    :host {\n      display: block;\n      height: 200px;\n    }\n\n    .editor-container {\n      width: 100%;\n      height: 98%;\n    }\n  "]
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [NGX_MONACO_EDITOR_CONFIG]
                        }] }];
        }, propDecorators: { options: [{
                    type: i0.Input,
                    args: ['options']
                }], originalModel: [{
                    type: i0.Input,
                    args: ['originalModel']
                }], modifiedModel: [{
                    type: i0.Input,
                    args: ['modifiedModel']
                }] } });

    var MonacoEditorModule = /** @class */ (function () {
        function MonacoEditorModule() {
        }
        MonacoEditorModule.forRoot = function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: MonacoEditorModule,
                providers: [
                    { provide: NGX_MONACO_EDITOR_CONFIG, useValue: config }
                ]
            };
        };
        return MonacoEditorModule;
    }());
    MonacoEditorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: MonacoEditorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    MonacoEditorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: MonacoEditorModule, declarations: [EditorComponent,
            DiffEditorComponent], imports: [common.CommonModule], exports: [EditorComponent,
            DiffEditorComponent] });
    MonacoEditorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: MonacoEditorModule, imports: [[
                common.CommonModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: MonacoEditorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [
                            EditorComponent,
                            DiffEditorComponent
                        ],
                        exports: [
                            EditorComponent,
                            DiffEditorComponent
                        ]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DiffEditorComponent = DiffEditorComponent;
    exports.EditorComponent = EditorComponent;
    exports.MonacoEditorModule = MonacoEditorModule;
    exports.NGX_MONACO_EDITOR_CONFIG = NGX_MONACO_EDITOR_CONFIG;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-monaco-editor.umd.js.map
