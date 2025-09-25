import { compare as s } from 'https://testingcf.jsdelivr.net/npm/compare-versions/+esm';
import { default as e } from 'https://testingcf.jsdelivr.net/npm/json5/+esm';
import * as t from 'https://testingcf.jsdelivr.net/npm/mathjs/+esm';
import { default as a } from 'https://testingcf.jsdelivr.net/npm/toml/+esm';
function n(t, e) {}
function i(t) {
  return Array.isArray(t) && 2 === t.length && 'string' == typeof t[1];
}
function r(t) {
  return 'array' === t.type;
}
function o(t) {
  return 'object' === t.type;
}
const c = {
    SINGLE_VARIABLE_UPDATED: 'mag_variable_updated',
    VARIABLE_UPDATE_ENDED: 'mag_variable_update_ended',
    VARIABLE_UPDATE_STARTED: 'mag_variable_update_started',
  },
  l = 'mag_invoke_mvu',
  d = 'mag_update_variable';
const u = t,
  f = '$__META_EXTENSIBLE__$';
function m(t, e, a = !1) {
  if (Array.isArray(t)) {
    let s,
      n,
      i = !1,
      o = a;
    e &&
      (r(e)
        ? ((i = !0 === e.extensible), (o = !0 === e.recursiveExtensible || a), (s = e.elementType), (n = e.template))
        : console.error(`Type mismatch: expected array schema but got ${e.type} at path`));
    const c = t.findIndex(
      t => _.isObject(t) && !_.isDate(t) && '$arrayMeta' in t && '$meta' in t && !0 === t.$arrayMeta,
    );
    if (-1 !== c) {
      const e = t[c];
      (void 0 !== e.$meta.extensible && (i = e.$meta.extensible),
        void 0 !== e.$meta.template && (n = e.$meta.template),
        t.splice(c, 1),
        console.log('Array metadata element found and processed.'));
    }
    const l = t.indexOf(f);
    l > -1 && ((i = !0), t.splice(l, 1), console.log('Extensible marker found and removed from an array.'));
    const d = {
      type: 'array',
      extensible: i || a,
      recursiveExtensible: o,
      elementType: t.length > 0 ? m(t[0], s, o) : { type: 'any' },
    };
    return (void 0 !== n && (d.template = n), d);
  }
  if (_.isObject(t) && !_.isDate(t)) {
    const s = t;
    let n,
      i = !1,
      r = a;
    e &&
      (o(e)
        ? ((i = !0 === e.extensible), (r = !0 === e.recursiveExtensible || a), (n = e.properties))
        : console.error(`Type mismatch: expected object schema but got ${e.type} at path`));
    const c = {
      type: 'object',
      properties: {},
      extensible: i || !0 === s.$meta?.extensible || !0 === s.$meta?.recursiveExtensible || a,
      recursiveExtensible: r || !0 === s.$meta?.recursiveExtensible,
    };
    void 0 !== s.$meta?.template
      ? (c.template = s.$meta.template)
      : e && o(e) && e.template && (c.template = e.template);
    const l = s.$meta;
    s.$meta && delete s.$meta;
    for (const e in t) {
      const t = n?.[e],
        a = !1 !== c.extensible && c.recursiveExtensible,
        i = m(s[e], t, a);
      let r = !c.extensible;
      (Array.isArray(l?.required) && l.required.includes(e) && (r = !0),
        !1 === t?.required ? (r = !1) : !0 === t?.required && (r = !0),
        (c.properties[e] = { ...i, required: r }));
    }
    return c;
  }
  const s = typeof t;
  return 'string' === s || 'number' === s || 'boolean' === s ? { type: s } : { type: 'any' };
}
function p(t, e) {
  if (!e || !t) return t || null;
  const a = _.toPath(e);
  let s = t;
  for (const t of a) {
    if (!s) return null;
    if (/^\d+$/.test(t)) {
      if (!r(s)) return null;
      s = s.elementType;
    } else {
      if (!o(s) || !s.properties[t]) return null;
      s = s.properties[t];
    }
  }
  return s;
}
function g(t) {
  console.log('Reconciling schema with current data state...');
  const e = m(_.cloneDeep(t.stat_data), t.schema);
  if (!o(e))
    return void console.error('Generated schema is not an object schema, which is unexpected for stat_data root');
  const a = e;
  (void 0 !== t.schema?.strictTemplate && (a.strictTemplate = t.schema.strictTemplate),
    void 0 !== t.schema?.strictSet && (a.strictSet = t.schema.strictSet),
    void 0 !== t.schema?.concatTemplateArray && (a.concatTemplateArray = t.schema.concatTemplateArray),
    _.has(t.stat_data, '$meta.strictTemplate') && (a.strictTemplate = t.stat_data.$meta?.strictTemplate),
    _.has(t.stat_data, '$meta.strictSet') && (a.strictSet = t.stat_data.$meta?.strictSet),
    _.has(t.stat_data, '$meta.concatTemplateArray') && (a.concatTemplateArray = t.stat_data.$meta?.concatTemplateArray),
    (t.schema = a),
    console.log('Schema reconciliation complete.'));
}
function y(t) {
  if (Array.isArray(t)) {
    let e = t.length;
    for (; e--; )
      t[e] === f ||
      (_.isObject(t[e]) && !_.isDate(t[e]) && '$arrayMeta' in t[e] && '$meta' in t[e] && !0 === t[e].$arrayMeta)
        ? t.splice(e, 1)
        : y(t[e]);
  } else if (((e = t), _.isObject(e) && !_.isDate(e))) {
    delete t.$meta;
    for (const e in t) y(t[e]);
  }
  var e;
}
const h = { 是否显示变量更新错误: '是', 构建信息: '未知' },
  b = { type: 'script', script_id: 'function' == typeof getScriptId ? getScriptId() : 'default-script-id' };
function v(t) {
  const e = ['是否显示变量更新错误'];
  for (const a of e)
    if (a in t) {
      const e = t[a];
      ('string' != typeof e || '是' !== e) && (t[a] = '否');
    }
}
function A(t) {
  try {
    t.构建信息 = '2025-09-15T15:54:05.906Z (45fae43)';
  } catch (t) {}
}
async function E() {
  const t = getVariables(b) || {};
  if (
    !(function (t) {
      return !(!t || 'object' != typeof t) && '是否显示变量更新错误' in t && 'string' == typeof t.是否显示变量更新错误;
    })(t)
  ) {
    const e = _.merge({}, h, t);
    return (v(e), A(e), await replaceVariables(e, b), e);
  }
  const e = _.merge({}, h, t);
  return (v(e), A(e), _.isEqual(t, e) || (await replaceVariables(e, b)), e);
}
function S(t) {
  return _.isString(t) ? t.replace(/^[\\"'` ]*(.*?)[\\"'` ]*$/, '$1') : t;
}
function w(t, e, a = !1, s = !0) {
  if (!e) return t;
  const n = _.isObject(t) && !Array.isArray(t) && !_.isDate(t),
    i = Array.isArray(t),
    r = Array.isArray(e);
  return n && !r
    ? _.merge({}, e, t)
    : i && r
      ? s
        ? _.concat(t, e)
        : _.merge([], e, t)
      : ((n || i) && r !== i) || (!n && !i && _.isObject(e) && !Array.isArray(e))
        ? (console.error(
            `Template type mismatch: template is ${r ? 'array' : 'object'}, but value is ${i ? 'array' : 'object'}. Skipping template merge.`,
          ),
          t)
        : n || i || !r || a
          ? t
          : s
            ? _.concat([t], e)
            : _.merge([], e, [t]);
}
function O(t) {
  if ('string' != typeof t) return t;
  const e = t.trim();
  if ('true' === e) return !0;
  if ('false' === e) return !1;
  if ('null' === e) return null;
  if ('undefined' !== e) {
    try {
      return JSON.parse(e);
    } catch (t) {
      if ((e.startsWith('{') && e.endsWith('}')) || (e.startsWith('[') && e.endsWith(']')))
        try {
          const t = new Function(`return ${e};`)();
          if (_.isObject(t) || Array.isArray(t)) return t;
        } catch (t) {}
    }
    try {
      const t = { Math, math: u },
        a = u.evaluate(e, t);
      if (u.isComplex(a) || u.isMatrix(a)) return a.toString();
      if (void 0 === a && !/^[a-zA-Z_]+$/.test(e)) return e;
      if (void 0 !== a) return parseFloat(a.toPrecision(12));
    } catch (t) {}
    try {
      return YAML.parse(e);
    } catch (t) {}
    return S(t);
  }
}
function D(t, e) {
  let a = 1,
    s = !1,
    n = '';
  for (let i = e; i < t.length; i++) {
    const e = t[i],
      r = i > 0 ? t[i - 1] : '';
    if ((('"' !== e && "'" !== e && '`' !== e) || '\\' === r || (s ? e === n && (s = !1) : ((s = !0), (n = e))), !s))
      if ('(' === e) a++;
      else if (')' === e && (a--, 0 === a)) return i;
  }
  return -1;
}
function I(t) {
  const e = [];
  let a = '',
    s = !1,
    n = '',
    i = 0,
    r = 0,
    o = 0;
  for (let c = 0; c < t.length; c++) {
    const l = t[c];
    (('"' !== l && "'" !== l && '`' !== l) ||
      (0 !== c && '\\' === t[c - 1]) ||
      (s ? l === n && (s = !1) : ((s = !0), (n = l))),
      s || ('(' === l && o++, ')' === l && o--, '[' === l && i++, ']' === l && i--, '{' === l && r++, '}' === l && r--),
      ',' !== l || s || 0 !== o || 0 !== i || 0 !== r ? (a += l) : (e.push(a.trim()), (a = '')));
  }
  return (a.trim() && e.push(a.trim()), e);
}
async function T(t) {
  return (
    structuredClone(
      _(SillyTavern.chat)
        .slice(0, t + 1)
        .map(t => _.get(t, ['variables', t.swipe_id ?? 0]))
        .findLast(t => _.has(t, 'stat_data')),
    ) ?? getVariables()
  );
}
function N(t) {
  const e = [];
  let a = '',
    s = !1,
    n = '';
  for (let i = 0; i < t.length; i++) {
    const r = t[i];
    ('"' !== r && "'" !== r) || (0 !== i && '\\' === t[i - 1])
      ? '.' !== r || s
        ? (a += r)
        : (e.push(a), (a = ''))
      : s
        ? r === n
          ? (s = !1)
          : (a += r)
        : ((s = !0), (n = r));
  }
  return (a && e.push(a), e.join('.'));
}
async function M(t, e, a, s = '', n = !1) {
  const i = t.$internal?.display_data,
    r = t.$internal?.delta_data;
  if (_.has(t, e)) {
    const o = _.get(t, e);
    if (Array.isArray(o) && 2 === o.length) {
      const l = _.cloneDeep(o[0]);
      ((o[0] = a), _.set(t, e, o));
      const d = s ? `(${s})` : '',
        u = `${S(JSON.stringify(l))}->${S(JSON.stringify(a))} ${d}`;
      return (
        i && _.set(i, e, u),
        r && _.set(r, e, u),
        console.info(`Set '${e}' to '${S(JSON.stringify(a))}' ${d}`),
        n && (await eventEmit(c.SINGLE_VARIABLE_UPDATED, t, e, l, a)),
        !0
      );
    }
    {
      const l = _.cloneDeep(o);
      _.set(t, e, a);
      const d = s ? `(${s})` : '',
        u = S(JSON.stringify(a)),
        f = `${S(JSON.stringify(l))}->${u} ${d}`;
      return (
        i && _.set(i, e, f),
        r && _.set(r, e, f),
        console.info(`Set '${e}' to '${u}' ${d}`),
        n && (await eventEmit(c.SINGLE_VARIABLE_UPDATED, t, e, l, a)),
        !0
      );
    }
  }
  return !1;
}
async function j(t, e) {
  const a = !1,
    s = _.cloneDeep(e),
    l = { stat_data: {} },
    d = (function (t) {
      const e = [];
      let a = 0;
      for (; a < t.length; ) {
        const s = t.substring(a).match(/_\.(set|insert|assign|remove|unset|delete|add)\(/);
        if (!s || void 0 === s.index) break;
        const n = s[1],
          i = a + s.index,
          r = i + s[0].length,
          o = D(t, r);
        if (-1 === o) {
          a = r;
          continue;
        }
        let c = o + 1;
        if (c >= t.length || ';' !== t[c]) {
          a = o + 1;
          continue;
        }
        c++;
        let l = '';
        const d = t.substring(c).match(/^\s*\/\/(.*)/);
        d && ((l = d[1].trim()), (c += d[0].length));
        const u = t.substring(i, c),
          f = I(t.substring(r, o));
        let m = !1;
        ((('set' === n && f.length >= 2) ||
          ('assign' === n && f.length >= 2) ||
          ('insert' === n && f.length >= 2) ||
          ('remove' === n && f.length >= 1) ||
          ('unset' === n && f.length >= 1) ||
          ('delete' === n && f.length >= 1) ||
          ('add' === n && 2 === f.length)) &&
          (m = !0),
          m && e.push({ command: n, fullMatch: u, args: f, reason: l }),
          (a = c));
      }
      return e;
    })(substitudeMacros(t)),
    u = await E();
  ((e.stat_data.$internal = { display_data: s.stat_data, delta_data: l.stat_data || {} }),
    await eventEmit(c.VARIABLE_UPDATE_STARTED, e, a));
  let f,
    m,
    y = !1;
  const h = function (t) {
      (console.warn(t), (f = { error_last: t, error_command: m }));
    },
    b = e.schema,
    v = b?.strictTemplate ?? !1,
    A = b?.concatTemplateArray ?? !0,
    T = b?.strictSet ?? !1;
  for (const t of d) {
    const a = N(S(t.args[0])),
      d = t.reason ? `(${t.reason})` : '';
    let u = '';
    switch (((m = t), t.command)) {
      case 'set': {
        if (!_.has(e.stat_data, a)) {
          h(`Path '${a}' does not exist in stat_data, skipping set command ${d}`);
          continue;
        }
        let s = _.get(e.stat_data, a);
        let r = O(t.args.length >= 3 ? t.args[2] : t.args[1]);
        r instanceof Date && (r = r.toISOString());
        let o = !1;
        if (T || !Array.isArray(s) || 2 !== s.length || 'string' != typeof s[1] || Array.isArray(s[0]))
          'number' == typeof s && null !== r ? _.set(e.stat_data, a, Number(r)) : _.set(e.stat_data, a, r);
        else {
          const t = _.cloneDeep(s[0]);
          ((s[0] = 'number' == typeof s[0] && null !== r ? Number(r) : r), (s = t), (o = !0));
        }
        let l = _.get(e.stat_data, a);
        (n(), o && (l = l[0]));
        ((u =
          !T && i(s) && Array.isArray(l)
            ? `${S(JSON.stringify(s[0]))}->${S(JSON.stringify(l[0]))} ${d}`
            : `${S(JSON.stringify(s))}->${S(JSON.stringify(l))} ${d}`),
          (y = !0),
          console.info(`Set '${a}' to '${JSON.stringify(l)}' ${d}`),
          await eventEmit(c.SINGLE_VARIABLE_UPDATED, e.stat_data, a, s, l));
        break;
      }
      case 'insert':
      case 'assign': {
        const s = a,
          n = '' === s ? e.stat_data : _.get(e.stat_data, s),
          i = p(b, s);
        if (null !== n && !Array.isArray(n) && !_.isObject(n)) {
          h(`Cannot assign into path '${s}' because it holds a primitive value (${typeof n}). Operation skipped. ${d}`);
          continue;
        }
        if (i) {
          if ('object' === i.type && !1 === i.extensible) {
            if (2 === t.args.length) {
              h(`SCHEMA VIOLATION: Cannot merge data into non-extensible object at path '${s}'. ${d}`);
              continue;
            }
            if (t.args.length >= 3) {
              const e = String(O(t.args[1]));
              if (!_.has(i.properties, e)) {
                h(`SCHEMA VIOLATION: Cannot assign new key '${e}' into non-extensible object at path '${s}'. ${d}`);
                continue;
              }
            }
          } else if ('array' === i.type && (!1 === i.extensible || void 0 === i.extensible)) {
            h(`SCHEMA VIOLATION: Cannot assign elements into non-extensible array at path '${s}'. ${d}`);
            continue;
          }
        } else if ('' !== s && !_.get(e.stat_data, _.toPath(s).slice(0, -1).join('.'))) {
          h(`Cannot assign into non-existent path '${s}' without an extensible parent. ${d}`);
          continue;
        }
        const l = _.cloneDeep(_.get(e.stat_data, a));
        let f = !1;
        if (2 === t.args.length) {
          let n = O(t.args[1]);
          n instanceof Date
            ? (n = n.toISOString())
            : Array.isArray(n) && (n = n.map(t => (t instanceof Date ? t.toISOString() : t)));
          let o = '' === s ? e.stat_data : _.get(e.stat_data, a);
          if (
            (Array.isArray(o) || _.isObject(o) || ((o = Array.isArray(n) ? [] : {}), _.set(e.stat_data, a, o)),
            Array.isArray(o))
          ) {
            ((n = w(n, i && r(i) ? i.template : void 0, v, A)),
              o.push(n),
              (u = `ASSIGNED ${JSON.stringify(n)} into array '${a}' ${d}`),
              (f = !0));
          } else if (_.isObject(o)) {
            if (!_.isObject(n) || Array.isArray(n)) {
              h(`Cannot merge ${Array.isArray(n) ? 'array' : 'non-object'} into object at '${a}'`);
              continue;
            }
            (_.merge(o, n), (u = `MERGED object ${JSON.stringify(n)} into object '${a}' ${d}`), (f = !0));
          }
        } else if (t.args.length >= 3) {
          let n = O(t.args[2]);
          const c = O(t.args[1]);
          n instanceof Date
            ? (n = n.toISOString())
            : Array.isArray(n) && (n = n.map(t => (t instanceof Date ? t.toISOString() : t)));
          let l = '' === s ? e.stat_data : _.get(e.stat_data, a);
          const m = i && (r(i) || o(i)) ? i.template : void 0;
          Array.isArray(l) && 'number' == typeof c
            ? ((n = w(n, m, v, A)),
              l.splice(c, 0, n),
              (u = `ASSIGNED ${JSON.stringify(n)} into '${a}' at index ${c} ${d}`),
              (f = !0))
            : _.isObject(l)
              ? ((n = w(n, m, v, A)),
                (l[String(c)] = n),
                (u = `ASSIGNED key '${c}' with value ${JSON.stringify(n)} into object '${a}' ${d}`),
                (f = !0))
              : ((l = {}),
                _.set(e.stat_data, a, l),
                (n = w(n, m, v, A)),
                (l[String(c)] = n),
                (u = `CREATED object at '${a}' and ASSIGNED key '${c}' ${d}`),
                (f = !0));
        }
        if (!f) {
          h(`Invalid arguments for _.assign on path '${a}'`);
          continue;
        }
        {
          const t = _.get(e.stat_data, a);
          ((y = !0), console.info(u), await eventEmit(c.SINGLE_VARIABLE_UPDATED, e.stat_data, a, l, t));
        }
        break;
      }
      case 'unset':
      case 'delete':
      case 'remove': {
        if (!_.has(e.stat_data, a)) {
          h(`undefined Path: ${a} in _.remove command`);
          continue;
        }
        let s,
          n = a;
        if (t.args.length > 1) ((s = O(t.args[1])), 'string' == typeof s && (s = S(s)));
        else {
          const t = _.toPath(a),
            e = t.pop();
          e && ((s = /^\d+$/.test(e) ? Number(e) : e), (n = t.join('.')));
        }
        if (void 0 === s) {
          h(`Could not determine target for deletion for command on path '${a}' ${d}`);
          continue;
        }
        if ('' !== n && !_.has(e.stat_data, n)) {
          h(`Cannot remove from non-existent path '${n}'. ${d}`);
          continue;
        }
        const i = p(b, n);
        if (i)
          if ('array' === i.type) {
            if (!0 !== i.extensible) {
              h(`SCHEMA VIOLATION: Cannot remove element from non-extensible array at path '${n}'. ${d}`);
              continue;
            }
          } else if ('object' === i.type) {
            const t = String(s);
            if (_.has(i.properties, t) && !0 === i.properties[t].required) {
              h(`SCHEMA VIOLATION: Cannot remove required key '${t}' from path '${n}'. ${d}`);
              continue;
            }
          }
        const r = t.args.length > 1 ? O(t.args[1]) : void 0;
        let o = !1;
        if (void 0 === r) {
          const t = _.get(e.stat_data, a);
          (_.unset(e.stat_data, a),
            (u = `REMOVED path '${a}' ${d}`),
            (o = !0),
            await eventEmit(c.SINGLE_VARIABLE_UPDATED, e.stat_data, a, t, void 0));
        } else {
          const t = _.get(e.stat_data, a);
          if (!Array.isArray(t) && !_.isObject(t)) {
            h(`Cannot remove from path '${a}' because it is not an array or object. Skipping command. ${d}`);
            continue;
          }
          if (Array.isArray(t)) {
            const s = _.cloneDeep(t);
            let n = -1;
            ((n = 'number' == typeof r ? r : t.findIndex(t => _.isEqual(t, r))),
              n >= 0 &&
                n < t.length &&
                (t.splice(n, 1),
                (o = !0),
                (u = `REMOVED item from '${a}' ${d}`),
                await eventEmit(c.SINGLE_VARIABLE_UPDATED, e.stat_data, a, s, t)));
          } else if (_.isObject(t))
            if ('number' == typeof r) {
              const e = Object.keys(t),
                s = r;
              if (s >= 0 && s < e.length) {
                const n = e[s];
                (_.unset(t, n), (o = !0), (u = `REMOVED ${s + 1}th entry ('${n}') from object '${a}' ${d}`));
              }
            } else {
              const e = String(r);
              _.has(t, e) && (delete t[e], (o = !0), (u = `REMOVED key '${e}' from object '${a}' ${d}`));
            }
        }
        if (!o) {
          h(`Failed to execute remove on '${a}'`);
          continue;
        }
        ((y = !0), console.info(u));
        break;
      }
      case 'add': {
        if (!_.has(e.stat_data, a)) {
          h(`Path '${a}' does not exist in stat_data, skipping add command ${d}`);
          continue;
        }
        const s = _.cloneDeep(_.get(e.stat_data, a)),
          r = _.get(e.stat_data, a);
        let o = r;
        const l = i(r) && 'object' != typeof r[0];
        l && (n(), (o = r[0]));
        let f = null;
        if (o instanceof Date) f = o;
        else if ('string' == typeof o) {
          const t = new Date(o);
          !isNaN(t.getTime()) && isNaN(Number(o)) && (f = t);
        }
        if (2 !== t.args.length) {
          h(`Invalid number of arguments for _.add on path '${a}' ${d}`);
          continue;
        }
        {
          const i = O(t.args[1]);
          if (f) {
            if ('number' != typeof i) {
              h(`Delta '${t.args[1]}' for Date operation is not a number, skipping add command ${d}`);
              continue;
            }
            const o = new Date(f.getTime() + i),
              m = o.toISOString();
            l ? (n(), (r[0] = m), _.set(e.stat_data, a, r)) : _.set(e.stat_data, a, m);
            const p = _.get(e.stat_data, a);
            ((u = l
              ? `${JSON.stringify(s[0])}->${JSON.stringify(p[0])} ${d}`
              : `${JSON.stringify(s)}->${JSON.stringify(p)} ${d}`),
              (y = !0),
              console.info(
                `ADDED date '${a}' from '${f.toISOString()}' to '${o.toISOString()}' by delta '${i}'ms ${d}`,
              ),
              await eventEmit(c.SINGLE_VARIABLE_UPDATED, e.stat_data, a, s, p));
          } else {
            if ('number' != typeof o) {
              h(`Path '${a}' value is not a date or number; skipping add command ${d}`);
              continue;
            }
            {
              if ('number' != typeof i) {
                h(`Delta '${t.args[1]}' is not a number, skipping add command ${d}`);
                continue;
              }
              let n = o + i;
              ((n = parseFloat(n.toPrecision(12))),
                l ? ((r[0] = n), _.set(e.stat_data, a, r)) : _.set(e.stat_data, a, n));
              const f = _.get(e.stat_data, a);
              ((u = l
                ? `${JSON.stringify(s[0])}->${JSON.stringify(f[0])} ${d}`
                : `${JSON.stringify(s)}->${JSON.stringify(f)} ${d}`),
                (y = !0),
                console.info(`ADDED number '${a}' from '${o}' to '${n}' by delta '${i}' ${d}`),
                await eventEmit(c.SINGLE_VARIABLE_UPDATED, e.stat_data, a, s, f));
            }
          }
        }
        break;
      }
    }
    u && (_.set(s.stat_data, a, u), _.set(l.stat_data, a, u));
  }
  if (
    ((e.display_data = s.stat_data),
    (e.delta_data = l.stat_data),
    await eventEmit(c.VARIABLE_UPDATE_ENDED, e, a),
    delete e.stat_data.$internal,
    y && g(e),
    f && '是' === u.是否显示变量更新错误)
  ) {
    const t = f.error_command.fullMatch;
    'undefined' != typeof toastr &&
      toastr.warning(`最近错误: ${f.error_last}`, `发生变量更新错误，可能需要重Roll:${t}`, { timeOut: 6e3 });
  }
  return y || a;
}
let k = 0;
async function V(t) {
  if (!('undefined' != typeof jest || ('undefined' != typeof process && !1))) {
    const e = Date.now();
    if (e - k < 3e3)
      return (
        console.info(`Rate limit applied: handleVariablesInMessage skipped for message ${t}`),
        void toastr.warning('避免同时调用 MESSAGE_RECEIVED 多次', 'gemini轮询兼容', { timeOut: 1e3 })
      );
    k = e;
  }
  const e = getChatMessages(t).at(-1);
  if (!e) return;
  let a = e.message;
  if (a.length < 5) return;
  const s = 0 === t ? 0 : t - 1,
    n = await T(s);
  if (!_.has(n, 'stat_data')) return void console.error(`cannot found stat_data for ${s}`);
  if (await j(a, n)) {
    const t = getVariables({ type: 'chat' });
    ((t.stat_data = n.stat_data),
      (t.display_data = n.display_data),
      (t.delta_data = n.delta_data),
      (t.schema = n.schema),
      (t.initialized_lorebooks = n.initialized_lorebooks),
      await replaceVariables(t, { type: 'chat' }));
  }
  (await insertOrAssignVariables(
    {
      stat_data: n.stat_data,
      display_data: n.display_data,
      delta_data: n.delta_data,
      schema: n.schema,
      initialized_lorebooks: n.initialized_lorebooks,
    },
    { type: 'message', message_id: t },
  ),
    'user' !== e.role &&
      (a.includes('<StatusPlaceHolderImpl/>') || (a += '\n\n<StatusPlaceHolderImpl/>'),
      await setChatMessages([{ message_id: t, message: a }], { refresh: 'affected' })));
}
async function L(t, e) {
  if (void 0 === e.old_variables) return;
  e.new_variables = _.cloneDeep(e.old_variables);
  const a = e.new_variables;
  (await j(t, a)) || delete e.new_variables;
}
function x(t, e, a, s) {
  _.forEach(e, (t, e) => {
    const n = e;
    if (_.isArray(t)) {
      if (2 === t.length && _.isString(t[1])) {
        if (_.isArray(_.get(a, n))) {
          const i = _.get(a, n);
          if (2 === i.length)
            if ((_.set(s, `${n}[1]`, t[1]), _.isObject(t[0]) && !_.isArray(t[0]))) {
              const a = _.get(s, `${e}[0]`);
              (_.has(t[0], 'description') &&
                _.isString(t[0].description) &&
                _.has(i[0], 'description') &&
                _.set(s, `${n}[0].description`, t[0].description),
                x(`${n}[0]`, t[0], i[0], a));
            } else _.isArray(t[0]) && x(`${n}[0]`, t[0], i[0], s[0]);
        }
      } else if (_.isArray(_.get(a, n))) {
        const e = _.get(a, n);
        t.forEach((a, i) => {
          if (i < e.length && _.isObject(a)) {
            const r = _.get(s, `${n}[${i}]`);
            (_.has(a, 'description') &&
              _.isString(a.description) &&
              _.has(e[i], 'description') &&
              _.set(r, 'description', a.description),
              x(`${n}[${i}]`, t[i], e[i], r));
          }
        });
      }
    } else if (_.isObject(t)) {
      if (_.has(t, 'description') && _.isString(t.description)) {
        const n = `${e}.description`;
        _.has(a, n) && _.set(s, n, t.description);
      }
      _.has(a, e) && _.isObject(a[e]) && x(n, t, a[e], s[e]);
    }
  });
}
async function C() {
  let t;
  try {
    if (0 === SillyTavern.chat.length)
      return (
        console.error('不存在任何一条消息，退出'),
        void toastr.error('无开场白，无法进行初始化', '变量初始化失败')
      );
    t = (await T(getLastMessageId())) ?? {
      display_data: {},
      initialized_lorebooks: {},
      stat_data: {},
      delta_data: {},
      schema: { type: 'object', properties: {} },
    };
  } catch (t) {
    return void console.error('不存在任何一条消息，退出');
  }
  if (
    (void 0 === t &&
      (t = {
        display_data: {},
        initialized_lorebooks: {},
        stat_data: {},
        delta_data: {},
        schema: { type: 'object', properties: {} },
      }),
    _.has(t, 'initialized_lorebooks') || (t.initialized_lorebooks = {}),
    Array.isArray(t.initialized_lorebooks))
  ) {
    console.warn('Old "initialized_lorebooks" array format detected. Migrating to the new object format.');
    const e = t.initialized_lorebooks,
      a = {};
    for (const t of e) a[t] = [];
    t.initialized_lorebooks = a;
  }
  (t.stat_data || (t.stat_data = {}), t.schema || (t.schema = { extensible: !1, properties: {}, type: 'object' }));
  const e = await R(t);
  if (e) {
  }
  if (e || !t.schema || _.isEmpty(t.schema)) {
    const e = m(structuredClone(t.stat_data), t.schema);
    (o(e)
      ? (_.has(t.stat_data, '$meta.strictTemplate') && (e.strictTemplate = t.stat_data.$meta?.strictTemplate),
        _.has(t.stat_data, '$meta.concatTemplateArray') &&
          (e.concatTemplateArray = t.stat_data.$meta?.concatTemplateArray),
        _.has(t.stat_data, '$meta.strictSet') && (e.strictSet = t.stat_data.$meta?.strictSet),
        (t.schema = e))
      : console.error('Generated schema is not an object schema, which is unexpected for stat_data root'),
      y(t.stat_data));
  }
  if (e) {
    if ((console.info('Init chat variables.'), await insertOrAssignVariables(t), 0 == getLastMessageId())) {
      const e = getChatMessages(0, { include_swipes: !0 })[0];
      await setChatMessages([
        {
          message_id: 0,
          swipes_data: await Promise.all(
            e.swipes.map(async e => {
              const a = structuredClone(t);
              return (await j(e, a), console.log('变量初始化完成'), a);
            }),
          ),
        },
      ]);
    } else await setChatMessage({ data: t }, getLastMessageId());
    try {
      toastr.info(
        `有新的世界书初始化变量被加载，当前使用世界书: ${YAML.stringify(t.initialized_lorebooks)}`,
        '变量初始化成功',
      );
    } catch (t) {}
    await (async function () {
      const t = {
          scan_depth: 2,
          context_percentage: 100,
          budget_cap: 0,
          min_activations: 0,
          max_depth: 0,
          max_recursion_steps: 0,
          insertion_strategy: 'character_first',
          include_names: !1,
          recursive: !0,
          case_sensitive: !1,
          match_whole_words: !1,
          use_group_scoring: !1,
          overflow_alert: !1,
        },
        e = getLorebookSettings();
      _.isEqual(_.merge({}, e, t), e) || setLorebookSettings(t);
    })();
  }
}
async function R(t, s) {
  const n =
    s ||
    (await (async function () {
      const t = [...(await getLorebookSettings()).selected_global_lorebooks],
        e = await getCurrentCharPrimaryLorebook();
      return (null !== e && t.push(e), t);
    })());
  let i = !1;
  (t.initialized_lorebooks && !Array.isArray(t.initialized_lorebooks)) || (t.initialized_lorebooks = {});
  for (const s of n) {
    if (_.has(t.initialized_lorebooks, s)) continue;
    t.initialized_lorebooks[s] = [];
    const n = await getLorebookEntries(s);
    for (const s of n)
      if (s.comment?.toLowerCase().includes('[initvar]')) {
        const n = substitudeMacros(s.content);
        let i = null,
          r = null;
        try {
          i = YAML.parse(n);
        } catch (t) {
          try {
            i = e.parse(n);
          } catch (t) {
            try {
              i = a.parse(n);
            } catch (t) {
              r = new Error(`Failed to parse content as YAML/JSON, JSON5, or TOML: ${t}`);
            }
          }
        }
        if (r)
          throw (
            console.error(`Failed to parse lorebook entry[${s.comment}]: ${r}`),
            toastr.error(r.message, 'Failed to parse lorebook entry', { timeOut: 5e3 }),
            r
          );
        i && (t.stat_data = _.merge(t.stat_data, i));
      }
    i = !0;
  }
  return i;
}
const P = ['重新处理变量', '重新读取初始变量', '清除旧楼层变量'];
let G = 0;
async function J() {
  if (!('undefined' != typeof jest || ('undefined' != typeof process && !1))) {
    const t = Date.now();
    if (t - G < 3e3)
      return (
        console.info('Rate limit applied: 重新处理变量 button skipped'),
        void toastr.warning('避免重复点击', '防止连点', { timeOut: 1e3 })
      );
    G = t;
  }
  const t = {
    display_data: {},
    initialized_lorebooks: {},
    stat_data: {},
    delta_data: {},
    schema: { type: 'object', properties: {} },
  };
  try {
    if (!(await R(t)))
      return (console.error('没有找到 InitVar 数据'), void toastr.error('没有找到 InitVar 数据', '', { timeOut: 3e3 }));
  } catch (t) {
    return void console.error('加载 InitVar 数据失败:', t);
  }
  (await g(t), y(t.stat_data));
  const e = getLastMessageId();
  if (e < 0) return (console.error('没有找到消息'), void toastr.error('没有找到消息', '', { timeOut: 3e3 }));
  const a = await T(e);
  if (!_.has(a, 'stat_data'))
    return (
      console.error('最新消息中没有找到 stat_data'),
      void toastr.error('最新消息中没有 stat_data', '', { timeOut: 3e3 })
    );
  const s = { stat_data: void 0, schema: void 0 };
  ((s.stat_data = _.merge({}, t.stat_data, a.stat_data)),
    (s.schema = _.merge({}, a.schema, t.schema)),
    (s.initialized_lorebooks = _.merge({}, t.initialized_lorebooks, a.initialized_lorebooks)),
    (s.display_data = structuredClone(s.stat_data)),
    (s.delta_data = a.delta_data),
    x(0, t.stat_data, a.stat_data, s.stat_data),
    await g(s),
    y(s.stat_data),
    await replaceVariables(s, { type: 'message', message_id: e }),
    await setChatMessage({}, e),
    await replaceVariables(s, { type: 'chat' }),
    console.info('InitVar更新完成'),
    toastr.success('InitVar描述已更新', '', { timeOut: 3e3 }));
}
function B() {
  (!(function () {
    const t = getScriptButtons(getScriptId()),
      e = t.map(t => t.name);
    for (const a of P.filter(t => !e.includes(t))) t.push({ name: a, visible: !1 });
    replaceScriptButtons(getScriptId(), t);
  })(),
    eventOnButton('重新处理变量', async function () {
      if (!('undefined' != typeof jest || ('undefined' != typeof process && !1))) {
        const t = Date.now();
        if (t - G < 3e3)
          return (
            console.info('Rate limit applied: 重新处理变量 button skipped'),
            void toastr.warning('避免重复点击', '防止连点', { timeOut: 1e3 })
          );
        G = t;
      }
      const t = getLastMessageId();
      t < 1 ||
        (0 !== SillyTavern.chat.length &&
          (await deleteVariable('stat_data', { type: 'message', message_id: t }),
          await deleteVariable('delta_data', { type: 'message', message_id: t }),
          await deleteVariable('display_data', { type: 'message', message_id: t }),
          await deleteVariable('schema', { type: 'message', message_id: t }),
          await V(getLastMessageId())));
    }),
    eventOnButton('重新读取初始变量', J),
    eventOnButton('清除旧楼层变量', async function () {
      const t = await SillyTavern.callGenericPopup(
        '<h4>清除旧楼层变量信息以减小聊天文件大小避免手机崩溃</h4>请填写要保留变量信息的楼层数 (如 10 为保留最后 10 层)<br><strong>注意: 你将不能正常回退游玩到没保留变量信息的楼层</strong>',
        SillyTavern.POPUP_TYPE.INPUT,
        '10',
      );
      if (!t) return;
      const e = parseInt(t);
      isNaN(e)
        ? toastr.error(`请输入有效的楼层数, 你输入的是 '${t}'`, '清理旧楼层变量失败')
        : (SillyTavern.chat.slice(0, -e).forEach(t => {
            void 0 !== t.variables &&
              t.variables.forEach(t => {
                (_.unset(t, 'stat_data'), _.unset(t, 'display_data'), _.unset(t, 'delta_data'), _.unset(t, 'schema'));
              });
          }),
          SillyTavern.saveChat().then(() =>
            toastr.success(`已清理旧变量, 保留了最后 ${e} 层的变量`, '清理旧楼层变量成功'),
          ));
    }));
}
function U() {
  return {
    events: c,
    parseMessage: async function (t, e) {
      const a = { old_variables: e };
      return (await L(t, a), a.new_variables);
    },
    getMvuData: function (t) {
      return getVariables(t);
    },
    replaceMvuData: async function (t, e) {
      await replaceVariables(t, e);
    },
    getCurrentMvuData: function () {
      return getVariables({ type: 'message', message_id: getCurrentMessageId() });
    },
    replaceCurrentMvuData: async function (t) {
      await replaceVariables(t, { type: 'message', message_id: getCurrentMessageId() });
    },
    reloadInitVar: async function (t) {
      return await R(t);
    },
    setMvuVariable: async function (t, e, a, { reason: s = '', is_recursive: n = !1 } = {}) {
      return await M(t.stat_data, e, a, s, n);
    },
    getMvuVariable: function (t, e, { category: a = 'stat', default_value: s } = {}) {
      let n;
      switch (a) {
        case 'stat':
          n = t.stat_data;
          break;
        case 'display':
          n = t.display_data;
          break;
        case 'delta':
          n = t.delta_data;
      }
      const i = _.get(n, e, s);
      return (function (t) {
        return Array.isArray(t) && 2 === t.length && 'string' == typeof t[1];
      })(i)
        ? i[0]
        : i;
    },
    getRecordFromMvuData: function (t, e) {
      return (function (t, e) {
        let a;
        switch (t) {
          case 'stat':
            a = e.stat_data;
            break;
          case 'display':
            a = e.display_data;
            break;
          case 'delta':
            a = e.delta_data;
        }
        return a;
      })(e, t);
    },
  };
}
($(async () => {
  (B(),
    (function () {
      const t = U();
      (_.set(window, 'Mvu', t), _.set(window.parent, 'Mvu', t), eventEmit('global_Mvu_initialized'));
    })(),
    eventOn(tavern_events.GENERATION_STARTED, C),
    eventOn(tavern_events.MESSAGE_SENT, C),
    eventOn(tavern_events.MESSAGE_SENT, V),
    eventOn(tavern_events.MESSAGE_RECEIVED, V),
    eventOn(l, L),
    eventOn(d, M),
    await E());
  try {
    _.set(parent.window, 'handleVariablesInMessage', V);
  } catch (t) {}
  try {
    toastr.info('构建信息: 2025-09-15T15:54:05.906Z (45fae43)', 'MVU加载成功');
    const t = await getTavernHelperVersion();
    s(t, '3.2.13', '<') &&
      toastr.warning('酒馆助手版本过低, 可能无法正常处理, 请更新至 3.2.13 或更高版本（建议保持酒馆助手最新）');
  } catch (t) {}
}),
  $(window).on('unload', () => {
    (eventRemoveListener(tavern_events.GENERATION_STARTED, C),
      eventRemoveListener(tavern_events.MESSAGE_SENT, C),
      eventRemoveListener(tavern_events.MESSAGE_SENT, V),
      eventRemoveListener(tavern_events.MESSAGE_RECEIVED, V),
      eventRemoveListener(l, L));
  }));

// 装备系统功能
window.equipmentSystem = {
  // 装备品质配置
  qualityConfig: {
    common: { color: '#6c757d', multiplier: 1.0, name: '普通' },
    uncommon: { color: '#0c5460', multiplier: 1.2, name: '优秀' },
    rare: { color: '#155724', multiplier: 1.5, name: '稀有' },
    epic: { color: '#721c24', multiplier: 2.0, name: '史诗' },
    legendary: { color: '#856404', multiplier: 3.0, name: '传说' },
    mythic: { color: '#383d41', multiplier: 5.0, name: '神话' },
  },

  // 生成随机装备
  generateRandomEquipment: function (slot, level = 1) {
    const slotInfo = {
      weapon: { name: '武器', icon: '⚔️', primaryStats: ['attack', 'critical'] },
      armor: { name: '护甲', icon: '🛡️', primaryStats: ['defense', 'hp'] },
      accessory: { name: '饰品', icon: '💍', primaryStats: ['magic', 'speed'] },
      special: { name: '特殊', icon: '✨', primaryStats: ['energy', 'accuracy'] },
    }[slot];

    const qualities = Object.keys(this.qualityConfig);
    const quality = this.getRandomQuality(level);
    const qualityInfo = this.qualityConfig[quality];

    const equipment = {
      id: this.generateId(),
      name: this.generateEquipmentName(slot, quality),
      emoji: slotInfo.icon,
      quality: quality,
      level: level,
      slot: slot,
      base_stats: {},
      attributes: [],
      skills: [],
      description: this.generateDescription(slot, quality, level),
    };

    // 生成基础属性
    slotInfo.primaryStats.forEach(stat => {
      const baseValue = Math.floor(10 * qualityInfo.multiplier * level);
      equipment.base_stats[stat] = baseValue;
    });

    // 生成随机词条
    const attributeCount = this.getAttributeCount(quality, level);
    for (let i = 0; i < attributeCount; i++) {
      equipment.attributes.push(this.generateRandomAttribute(level));
    }

    return equipment;
  },

  getRandomQuality: function (level) {
    const weights = {
      common: 50,
      uncommon: 25,
      rare: 15,
      epic: 7,
      legendary: 2.5,
      mythic: 0.5,
    };

    const levelBonus = Math.min(level * 0.1, 0.5);
    Object.keys(weights).forEach(quality => {
      if (quality !== 'common') {
        weights[quality] *= 1 + levelBonus;
      }
    });

    return this.weightedRandom(weights);
  },

  weightedRandom: function (weights) {
    const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * total;

    for (const [key, weight] of Object.entries(weights)) {
      random -= weight;
      if (random <= 0) return key;
    }
    return 'common';
  },

  generateEquipmentName: function (slot, quality) {
    const prefixes = {
      common: ['破旧的', '普通的', '简单的'],
      uncommon: ['精制的', '优质的', '坚固的'],
      rare: ['稀有的', '珍贵的', '精美的'],
      epic: ['史诗的', '传奇的', '强大的'],
      legendary: ['传说的', '神话的', '不朽的'],
      mythic: ['神器的', '天赐的', '永恒的'],
    };

    const names = {
      weapon: ['剑', '刀', '斧', '锤', '矛', '弓', '法杖'],
      armor: ['胸甲', '护甲', '战袍', '法袍', '轻甲', '重甲'],
      accessory: ['戒指', '项链', '护符', '手镯', '耳环', '徽章'],
      special: ['神器', '圣物', '宝物', '法器', '灵器', '仙器'],
    };

    const prefix = prefixes[quality][Math.floor(Math.random() * prefixes[quality].length)];
    const name = names[slot][Math.floor(Math.random() * names[slot].length)];

    return `${prefix}${name}`;
  },

  generateDescription: function (slot, quality, level) {
    const descriptions = {
      weapon: '一把锋利的武器，能够造成可观的伤害。',
      armor: '坚固的护甲，能够有效保护穿戴者。',
      accessory: '神秘的饰品，蕴含着特殊的力量。',
      special: '稀有的特殊装备，拥有独特的能力。',
    };

    const qualityDesc = {
      common: '虽然普通，但依然实用。',
      uncommon: '制作精良，品质上乘。',
      rare: '稀有珍贵，价值不菲。',
      epic: '史诗级别的装备，威力强大。',
      legendary: '传说中的神器，威力无穷。',
      mythic: '神话级别的至宝，超越凡俗。',
    };

    return `${descriptions[slot]} ${qualityDesc[quality]}`;
  },

  getAttributeCount: function (quality, level) {
    const baseCount = {
      common: 0,
      uncommon: 1,
      rare: 2,
      epic: 3,
      legendary: 4,
      mythic: 5,
    };

    const levelBonus = Math.floor(level / 10);
    return Math.min(baseCount[quality] + levelBonus, 6);
  },

  generateRandomAttribute: function (level) {
    const types = ['attack', 'defense', 'magic', 'speed', 'critical', 'accuracy', 'hp', 'energy'];
    const type = types[Math.floor(Math.random() * types.length)];

    const value = Math.floor(10 * (0.5 + Math.random()) * level);
    const modifier = Math.random() < 0.3 ? 'percentage' : 'flat';

    return {
      type: type,
      value: modifier === 'percentage' ? Math.floor(value / 10) : value,
      modifier: modifier,
      description: modifier === 'percentage' ? `${type} +${Math.floor(value / 10)}%` : `${type} +${value}`,
    };
  },

  generateId: function () {
    return 'eq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // 计算装备总属性
  calculateEquipmentStats: function (equipment) {
    const totalStats = { ...equipment.base_stats };

    equipment.attributes.forEach(attr => {
      if (attr.modifier === 'percentage') {
        const baseStat = totalStats[attr.type] || 0;
        totalStats[attr.type] = Math.floor(baseStat * (1 + attr.value / 100));
      } else {
        totalStats[attr.type] = (totalStats[attr.type] || 0) + attr.value;
      }
    });

    return totalStats;
  },

  // 应用装备效果到角色
  applyEquipmentEffects: function (character, equipment) {
    const stats = this.calculateEquipmentStats(equipment);

    Object.entries(stats).forEach(([stat, value]) => {
      if (character[stat] !== undefined) {
        character[stat] += value;
      }
    });
  },
};

// 装备制作系统
window.equipmentCrafting = {
  materials: {
    iron: { name: '铁矿石', icon: '⛏️', rarity: 'common' },
    steel: { name: '钢锭', icon: '🔩', rarity: 'uncommon' },
    mithril: { name: '秘银', icon: '✨', rarity: 'rare' },
    adamant: { name: '精金', icon: '💎', rarity: 'epic' },
    dragon_scale: { name: '龙鳞', icon: '🐉', rarity: 'legendary' },
    phoenix_feather: { name: '凤凰羽毛', icon: '🔥', rarity: 'mythic' },
  },

  recipes: {
    weapon: {
      common: [{ material: 'iron', amount: 3 }],
      uncommon: [
        { material: 'steel', amount: 2 },
        { material: 'iron', amount: 1 },
      ],
      rare: [
        { material: 'mithril', amount: 1 },
        { material: 'steel', amount: 2 },
      ],
      epic: [
        { material: 'adamant', amount: 1 },
        { material: 'mithril', amount: 2 },
      ],
      legendary: [
        { material: 'dragon_scale', amount: 1 },
        { material: 'adamant', amount: 2 },
      ],
      mythic: [
        { material: 'phoenix_feather', amount: 1 },
        { material: 'dragon_scale', amount: 2 },
      ],
    },
    armor: {
      common: [{ material: 'iron', amount: 4 }],
      uncommon: [
        { material: 'steel', amount: 3 },
        { material: 'iron', amount: 1 },
      ],
      rare: [
        { material: 'mithril', amount: 2 },
        { material: 'steel', amount: 2 },
      ],
      epic: [
        { material: 'adamant', amount: 2 },
        { material: 'mithril', amount: 2 },
      ],
      legendary: [
        { material: 'dragon_scale', amount: 2 },
        { material: 'adamant', amount: 2 },
      ],
      mythic: [
        { material: 'phoenix_feather', amount: 2 },
        { material: 'dragon_scale', amount: 2 },
      ],
    },
  },

  canCraft: function (slot, quality, materials) {
    const recipe = this.recipes[slot]?.[quality];
    if (!recipe) return false;

    return recipe.every(requirement => {
      const available = materials[requirement.material] || 0;
      return available >= requirement.amount;
    });
  },

  craftEquipment: function (slot, quality, materials) {
    if (!this.canCraft(slot, quality, materials)) {
      return { success: false, message: '材料不足' };
    }

    const recipe = this.recipes[slot][quality];
    const newMaterials = { ...materials };

    recipe.forEach(requirement => {
      newMaterials[requirement.material] -= requirement.amount;
    });

    const equipment = window.equipmentSystem.generateRandomEquipment(slot, 1);
    equipment.quality = quality;

    return {
      success: true,
      equipment: equipment,
      materials: newMaterials,
    };
  },
};

// 装备强化系统
window.equipmentUpgrade = {
  upgradeMaterials: {
    enhancement_stone: { name: '强化石', icon: '💎', rarity: 'common' },
    magic_crystal: { name: '魔法水晶', icon: '🔮', rarity: 'uncommon' },
    divine_essence: { name: '神圣精华', icon: '✨', rarity: 'rare' },
  },

  getUpgradeSuccessRate: function (currentLevel, targetLevel) {
    const baseRate = 0.8;
    const levelPenalty = (targetLevel - currentLevel) * 0.1;
    return Math.max(0.1, baseRate - levelPenalty);
  },

  upgradeEquipment: function (equipment, targetLevel, materials) {
    if (targetLevel <= equipment.level) {
      return { success: false, message: '目标等级必须高于当前等级' };
    }

    const successRate = this.getUpgradeSuccessRate(equipment.level, targetLevel);
    const isSuccess = Math.random() < successRate;

    if (isSuccess) {
      const upgradedEquipment = { ...equipment };
      upgradedEquipment.level = targetLevel;

      const levelDiff = targetLevel - equipment.level;
      Object.keys(upgradedEquipment.base_stats).forEach(stat => {
        upgradedEquipment.base_stats[stat] += levelDiff * 2;
      });

      return {
        success: true,
        equipment: upgradedEquipment,
        message: '强化成功！',
      };
    } else {
      return {
        success: false,
        message: '强化失败，装备等级不变',
      };
    }
  },
};

console.log('装备系统已加载到 bundle.js');
//# sourceMappingURL=bundle.js.map
