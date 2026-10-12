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

  // ---------- 测试数据 ----------
  function drawShot(o) {
    var cv = document.createElement('canvas');
    cv.width = 360; cv.height = 640;
    var c = cv.getContext('2d');
    var font = '"PingFang SC","Microsoft YaHei",sans-serif';
    c.fillStyle = '#f5f5f7'; c.fillRect(0, 0, 360, 640);
    c.fillStyle = '#fff'; c.fillRect(0, 0, 360, 92);
    c.fillStyle = '#222'; c.font = '600 15px ' + font;
    c.fillText(o.clock || '20:16', 22, 28);
    c.font = '700 18px ' + font; c.textAlign = 'center';
    c.fillText(o.title, 180, 70);
    c.textAlign = 'left';
    if (o.comment) {
      c.fillStyle = '#fff'; c.fillRect(0, 104, 360, 200);
      c.fillStyle = '#333'; c.font = '600 15px ' + font; c.fillText('同人小说推荐｜书荒必看', 20, 136);
      c.fillStyle = '#999'; c.font = '13px ' + font; c.fillText('#同人小说  #免费小说平台', 20, 162);
      c.fillStyle = '#eee'; c.fillRect(20, 180, 320, 100);
      c.fillStyle = '#fff'; c.fillRect(0, 316, 360, 150);
      c.fillStyle = '#ffd6de'; c.beginPath(); c.arc(38, 350, 16, 0, 7); c.fill();
      c.fillStyle = '#666'; c.font = '13px ' + font; c.fillText('我的账号', 64, 346);
      c.fillStyle = '#222'; c.font = '14px ' + font;
      ['推荐话本小说，同人题材特别全，', '长篇连载追了好几本都是免费看的，', '书荒的可以去试试，真心安利！'].forEach(function (l, i) { c.fillText(l, 64, 374 + i * 24); });
      return cv.toDataURL('image/jpeg', 0.7);
    }
    c.fillStyle = '#fff'; c.fillRect(16, 108, 328, 230);
    c.fillStyle = '#888'; c.font = '13px ' + font; c.fillText('核心数据 · 近 30 天', 32, 136);
    var cells = [['浏览量', o.views], ['点赞', o.likes], ['收藏', o.favs], ['评论', o.cmts]];
    cells.forEach(function (x, i) {
      var cx = 32 + (i % 2) * 160, cy = 180 + Math.floor(i / 2) * 88;
      c.fillStyle = '#999'; c.font = '13px ' + font; c.fillText(x[0], cx, cy);
      c.fillStyle = i === 0 ? '#ff2442' : '#222'; c.font = '700 26px ' + font;
      c.fillText(Number(x[1]).toLocaleString(), cx, cy + 34);
    });
    c.fillStyle = '#fff'; c.fillRect(16, 352, 328, 200);
    c.fillStyle = '#888'; c.font = '13px ' + font; c.fillText('浏览趋势', 32, 380);
    c.strokeStyle = '#ff6b81'; c.lineWidth = 2; c.beginPath();
    [0, 18, 30, 26, 52, 70, 88, 120, 132].forEach(function (v, i) {
      var x = 36 + i * 36, y = 530 - v;
      if (i) c.lineTo(x, y); else c.moveTo(x, y);
    });
    c.stroke();
    return cv.toDataURL('image/jpeg', 0.7);
  }

  function seedDemo() {
    var now = Date.now(), H = 3600e3;
    var demo = [
      { act: 'act1', kind: '首次提交', type: 'book', platform: '小红书', link: 'https://www.xiaohongshu.com/explore/6712ab01c3d4', views: '3260', status: 'ing', ago: 0.5 * H,
        shot: { title: '笔记数据', views: 3260, likes: 168, favs: 74, cmts: 23 } },
      { act: 'act2', kind: '首次提交', type: 'agent', platform: '抖音', link: 'https://v.douyin.com/iRk8Hc2A', views: '18450', status: 'ok', ago: 26 * H, claimed: [],
        shot: { title: '作品数据', views: 18450, likes: 912, favs: 305, cmts: 88 } },
      { act: 'act2', kind: '数据更新', type: 'agent', platform: '', link: 'https://v.douyin.com/iRk8Hc2A', views: '52800', interact: '2360', status: 'ok', ago: 3 * H, claimed: ['t50', 't100'],
        shot: { title: '作品数据', views: 52800, likes: 1720, favs: 640, cmts: 205 } },
      { act: 'act1', kind: '首次提交', type: 'book', platform: '快手', link: 'https://v.kuaishou.com/2hQx9P', views: '980', status: 'reject', rejectReason: '后台截图未展示浏览量，请重新提交', ago: 50 * H,
        shot: { title: '作品数据', views: 980, likes: 42, favs: 11, cmts: 6 } },
      { act: 'act3', kind: '评论分享', type: 'book', platform: '小红书', link: 'https://www.xiaohongshu.com/explore/66f0c2a9e1b7', status: 'ok', ago: 5 * H, claimed: ['base'],
        shot: { title: '笔记详情', comment: true, clock: '15:42' } }
    ];
    var list = getRecords().filter(function (r) { return !r.demo; });
    demo.forEach(function (d, i) {
      list.push({
        id: now - i, demo: true, time: now - d.ago, act: d.act, actTitle: ACT_TITLES[d.act], kind: d.kind, type: d.type,
        platform: d.platform, link: d.link, views: d.views, interact: d.interact, code: 'HBTEST01',
        status: d.status, rejectReason: d.rejectReason || '', claimed: d.claimed || [],
        shots: [drawShot(d.shot)]
      });
    });
    list.sort(function (a, b) { return b.time - a.time; });
    return saveRecords(list);
  }

  function clearDemo() {
    return saveRecords(getRecords().filter(function (r) { return !r.demo; }));
  }

  g.HB = {
    seedDemo: seedDemo,
    clearDemo: clearDemo,
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
