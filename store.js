/* 前台活动页与收集后台共用的数据层（静态站，数据存于 localStorage） */
(function (g) {
  'use strict';

  var KEY = 'hb_records';
  var ADMIN_PASS = '123';

  var TYPES = {
    book: { name: '书籍' },
    agent: { name: '智能体' }
  };

  var ACT_TITLES = { act1: '官方素材分享', act2: '原创内容分享', act3: '评论区分享' };

  var REWARD = {
    book: {
      base: '50 泡泡币',
      baseDesc: '小说分享 · 每日首次有效分享',
      tiers: [
        { lv: '50', rw: '100 泡泡币' },
        { lv: '100', rw: '会员 1 小时' },
        { lv: '200', rw: '会员 3 小时' },
        { lv: '500', rw: '会员 1 天' },
        { lv: '1000', rw: '会员 15 天' },
        { lv: '2000', rw: '会员 30 天' },
        { lv: '10000+', rw: '现金奖励 100 元', top: true }
      ]
    },
    agent: {
      base: '30 轮对话额度',
      baseDesc: '智能体分享 · 每日首次有效分享',
      tiers: [
        { lv: '50', rw: '50 轮对话额度' },
        { lv: '100', rw: '100 轮对话额度' },
        { lv: '200', rw: '250 轮对话额度' },
        { lv: '500', rw: '50 活动金币' },
        { lv: '1000', rw: '100 活动金币' },
        { lv: '2000', rw: '200 活动金币' },
        { lv: '10000+', rw: '现金奖励 100 元', top: true }
      ]
    }
  };

  var STATUS = {
    ing: { t: '审核中', c: 'ing' },
    ok: { t: '审核通过', c: 'ok' },
    reject: { t: '未通过', c: 'reject' }
  };

  function getRecords() {
    try {
      var list = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(list) ? list : [];
    } catch (e) { return []; }
  }

  function saveRecords(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch (e) { return false; }
  }

  function findRecord(id) {
    return getRecords().filter(function (r) { return String(r.id) === String(id); })[0] || null;
  }

  function updateRecord(id, patch) {
    var list = getRecords();
    list.forEach(function (r) {
      if (String(r.id) === String(id)) Object.keys(patch).forEach(function (k) { r[k] = patch[k]; });
    });
    return saveRecords(list);
  }

  function statusOf(r) { return STATUS[r.status] || STATUS.ing; }

  // 一条记录可领取的奖励：首次提交得基础奖励，填写了点赞+收藏的按达到的热度档位计算
  function rewardsOf(r) {
    var R = REWARD[r.type] || REWARD.book;
    var out = [];
    if (r.kind !== '数据更新') out.push({ key: 'base', name: R.base, desc: '基础奖励' });
    if (r.interact !== undefined && r.interact !== '') {
      var n = +r.interact;
      R.tiers.forEach(function (t) {
        var lv = parseInt(t.lv, 10);
        if (n >= lv) out.push({ key: 't' + lv, name: t.rw, desc: t.lv + ' 互动档位' });
      });
    }
    return out;
  }

  function fmtTime(ts) {
    var d = new Date(ts);
    function p(n) { return n < 10 ? '0' + n : n; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  g.HB = {
    KEY: KEY,
    TYPES: TYPES,
    ACT_TITLES: ACT_TITLES,
    REWARD: REWARD,
    STATUS: STATUS,
    getRecords: getRecords,
    saveRecords: saveRecords,
    findRecord: findRecord,
    updateRecord: updateRecord,
    statusOf: statusOf,
    rewardsOf: rewardsOf,
    fmtTime: fmtTime,
    checkAdminPass: function (p) { return String(p || '') === ADMIN_PASS; }
  };
})(window);
