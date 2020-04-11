(window.webpackJsonp = window.webpackJsonp || []).push([[0], {111: function(e, t) {}, 119: function(e, t, a) {
  'use strict'; a.r(t); const n = a(0); const r = a.n(n); const o = a(52); const c = a.n(o); const s = a(9); const l = a(23); const i = a(11); Boolean('localhost' === window.location.hostname || '[::1]' === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)); const m = a(10); const u = a(54); const b = a(1); const g = a(55); const d = a.n(g).a.create(); const f = Symbol('LoginRequest'); const p = Symbol('LoginFailure'); const h = Symbol('LoginSuccess'); const y = Symbol('RegisterRequest'); const O = Symbol('RegisterFailure'); const j = Symbol('RegisterSuccess'); const k = Symbol('ConfirmRequest'); const v = Symbol('ConfirmFailure'); const S = Symbol('ConfirmSuccess'); const E = Symbol('OAuthRequest'); const N = Symbol('OAuthFailure'); const w = Symbol('OAuthCallbackRequest'); const C = Symbol('OAuthCallbackFailure'); const x = Symbol('OAuthCallbackSuccess'); const F = Symbol('FetchMeRequest'); const R = Symbol('FetchMeSuccess'); const W = Symbol('FetchMeRequest'); const q = Symbol('FetchMessagesRequest'); const M = Symbol('FetchMessagesSuccess'); const A = Symbol('FetchMessagesFailure'); function I() {
    return function(e, t) {
      e({type: q}); const a = t().token; d.get('/api/messages', {headers: {Authorization: 'Bearer '.concat(a)}}).then(function(t) {
        e({type: M, messages: t.data.messages});
      }).catch(function(t) {
        if (401 === t.response.status) return localStorage.removeItem('token'), void window.location.reload(!0); console.error(t.response.data), e({type: A});
      });
    };
  } const D = a(25); const L = a(56); const _ = a.n(L); const B = Symbol('WebsocketConnected'); const J = Symbol('WebsocketDisconnected'); const z = Symbol('NewMessage'); let G = null; Object(s.b)(function(e) {
    return {token: e.token, messages: e.messages, isWebsocketConnected: e.isWebsocketConnected};
  }, function(e) {
    return Object(b.a)({dispatch: e}, Object(m.b)({fetchMessages: I}, e));
  })(function(e) {
    const t = e.token; const a = e.messages; const o = e.isWebsocketConnected; const c = e.dispatch; const s = e.fetchMessages; const l = Object(n.useState)(''); const i = Object(D.a)(l, 2); const m = i[0]; const u = i[1]; return Object(n.useEffect)(function() {
      G = _()('http://localhost:3001?token='.concat(t)), s(), G.on('connect', function() {
        console.log('connect'), c({type: B});
      }), G.on('disconnect', function() {
        console.log('disconnect'), c({type: J});
      }), G.on('system_message', function(e) {
        console.log('system_message', e), c({type: z, message: e});
      }), G.on('user_message', function(e) {
        console.log('user_message', e), c({type: z, message: e});
      });
    }, []), r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {style: {minHeight: '100vh'}, className: 'row justify-content-center'}, r.a.createElement('div', {className: 'col col-md-6', style: {display: 'flex', flexDirection: 'column'}}, r.a.createElement('div', {className: 'my-4', style: {flexGrow: 1}}, a.fetching && r.a.createElement('div', {className: 'spinner-border', role: 'status'}, r.a.createElement('span', {className: 'sr-only'}, 'Loading...')), !a.fetching && 0 === a.list.length && r.a.createElement('p', {className: 'text-muted'}, '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442'), a.list.map(function(e) {
      return r.a.createElement('div', {className: 'card'}, r.a.createElement('div', {className: 'card-body'}, r.a.createElement('p', {className: 'card-text'}, e.text), r.a.createElement('p', {className: 'card-text text-muted'}, 'Timothy, 10:29')));
    })), r.a.createElement('form', {onSubmit: function(e) {
      e.preventDefault(), o && m && (G.emit('message', m), u(''));
    }, className: 'form-inline form-row text-center my-4'}, r.a.createElement('input', {type: 'text', value: m, disabled: !o, onChange: function(e) {
      return u(e.target.value);
    }, className: 'form-control col', placeholder: 'message'}), r.a.createElement('button', {disabled: !o, type: 'submit', className: 'btn btn-info'}, 'Send')))));
  }); const H = {token: localStorage.getItem('token') || null, login: {error: null, processing: !1}, registration: {errors: null, processing: !1, complete: !1}, confirmation: {error: null, processing: !1}, oauth: {error: null, processing: !1}, oauthCallback: {error: null, processing: !1}, isWebsocketConnected: !1, messages: {fetching: !1, list: []}, me: {data: {}, fetching: !1}}; const T = Object(m.c)(function() {
    const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : H; const t = arguments.length > 1 ? arguments[1] : void 0; switch (t.type) {
      case f: return Object(b.a)({}, e, {login: Object(b.a)({}, H.login, {processing: !0})}); case h: return localStorage.setItem('token', t.token), Object(b.a)({}, e, {login: H.login, token: t.token}); case p: return Object(b.a)({}, e, {login: Object(b.a)({}, H.login, {error: t.error, processing: !1})}); case y: return Object(b.a)({}, e, {registration: Object(b.a)({}, H.registration, {processing: !0})}); case j: return Object(b.a)({}, e, {registration: Object(b.a)({}, H.registration, {processing: !1, complete: !0})}); case O: return Object(b.a)({}, e, {registration: Object(b.a)({}, H.registration, {errors: t.errors, processing: !1})}); case k: return Object(b.a)({}, e, {confirmation: Object(b.a)({}, H.confirmation, {processing: !0})}); case S: return localStorage.setItem('token', t.token), Object(b.a)({}, e, {confirmation: H.confirmation, token: t.token}); case v: return Object(b.a)({}, e, {confirmation: Object(b.a)({}, H.confirmation, {error: t.error, processing: !1})}); case E: return Object(b.a)({}, e, {oauth: Object(b.a)({}, H.oauth, {processing: !0})}); case N: return Object(b.a)({}, e, {oauth: Object(b.a)({}, H.oauth, {error: t.error, processing: !1})}); case w: return Object(b.a)({}, e, {oauthCallback: Object(b.a)({}, H.oauthCallback, {processing: !0})}); case C: return Object(b.a)({}, e, {oauthCallback: Object(b.a)({}, H.oauthCallback, {error: t.error, processing: !1})}); case x: return localStorage.setItem('token', t.token), Object(b.a)({}, e, {oauthCallback: H.oauthCallback, token: t.token}); case q: return Object(b.a)({}, e, {messages: Object(b.a)({}, e.messages, {fetching: !0})}); case M: return Object(b.a)({}, e, {messages: Object(b.a)({}, e.messages, {list: t.messages.concat(e.messages), fetching: !1})}); case A: return Object(b.a)({}, e, {messages: Object(b.a)({}, e.messages, {fetching: !1})}); case F: return Object(b.a)({}, e, {me: Object(b.a)({}, e.me, {data: {}, fetching: !0})}); case R: return Object(b.a)({}, e, {me: Object(b.a)({}, e.me, {data: t.data, fetching: !1})}); case W: return Object(b.a)({}, e, {me: Object(b.a)({}, e.me, {data: {}, fetching: !1})}); case B: return Object(b.a)({}, e, {isWebsocketConnected: !0}); case J: return Object(b.a)({}, e, {isWebsocketConnected: !1}); default: return e;
    }
  }, Object(m.a)(u.a)); const V = a(58); function $() {
    return r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row login-form justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('div', {className: 'text-center border border-light p-5'}, r.a.createElement('p', {className: 'h4 mb-4'}, '\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c')))));
  } const K = Object(s.b)(function(e) {
    return {token: e.token};
  })(function(e) {
    const t = e.token; const a = Object(V.a)(e, ['token']); return r.a.createElement(i.b, Object.assign({}, a, {render: function() {
      return t ? r.a.createElement($, null) : r.a.createElement(i.a, {to: '/login'});
    }}));
  }); const P = a(24); function Q(e) {
    const t = Object(n.useState)({}); const a = Object(D.a)(t, 2); const o = a[0]; const c = a[1]; function s(e) {
      c(Object(b.a)({}, o, Object(P.a)({}, e.target.name, e.target.value)));
    } return r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('form', {onSubmit: function(t) {
      return e.onSubmit(t, o);
    }, className: 'text-center border border-light p-5', noValidate: !0}, r.a.createElement('p', {className: 'h4 mb-4'}, e.title), e.error && r.a.createElement('p', {className: 'text-left text-danger'}, e.error), e.fields.map(function(t) {
      let a = 'form-control'; return e.errors && (e.errors[t.name] ? a += ' is-invalid' : a += ' is-valid'), r.a.createElement('div', {className: 'form-row mb-4', key: t.name}, r.a.createElement('input', {value: o[t.name] || '', onChange: s, type: t.type, name: t.name, required: !0, className: a, disabled: e.disabled, placeholder: t.placeholder}), e.errors && e.errors[t.name] && r.a.createElement('div', {className: 'invalid-feedback text-left'}, e.errors[t.name]));
    }), r.a.createElement('button', {disabled: e.disabled, className: 'btn btn-info btn-block my-4', type: 'submit'}, e.button)))));
  } const U = [{type: 'email', name: 'email', placeholder: 'email', icon: 'fa-at'}, {type: 'password', name: 'password', placeholder: '\u043f\u0430\u0440\u043e\u043b\u044c', icon: 'fa-key'}]; const X = {loginAction: function(e) {
    const t = e.email; const a = e.password; return function(e, n) {
      e({type: f}), d.post('/api/login', {email: t, password: a}).then(function(t) {
        e({type: h, token: t.data.token});
      }).catch(function(t) {
        e({type: p, error: t.response.data.error});
      });
    };
  }}; const Y = Object(s.b)(function(e) {
    return {login: e.login, token: e.token};
  }, X)(function(e) {
    const t = e.token; const a = e.login; const n = e.loginAction; return t ? r.a.createElement(i.a, {to: '/'}) : r.a.createElement(Q, {disabled: a.processing, title: '\u0412\u0445\u043e\u0434', validated: a.errors, error: a.error, onSubmit: function(e, t) {
      e.preventDefault(), a.processing || n(t);
    }, fields: U, button: '\u0412\u043e\u0439\u0442\u0438'});
  }); c.a.render(r.a.createElement(s.a, {store: T}, r.a.createElement(l.a, null, r.a.createElement(i.b, {exact: !0, path: '/', component: K}), r.a.createElement(i.b, {path: '/login', component: Y}))), document.getElementById('root')), 'serviceWorker' in navigator && navigator.serviceWorker.ready.then(function(e) {
    e.unregister();
  });
}, 59: function(e, t, a) {
  e.exports = a(119);
}}, [[59, 1, 2]]]);
// # sourceMappingURL=main.5f3b549e.chunk.js.map
