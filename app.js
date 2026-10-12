(function () {
  'use strict';

  var app = document.getElementById('app');
  var screen = document.getElementById('screen');

  // ---------------- 数据 ----------------
  var TYPES = {
    book: { name: '书籍' },
    agent: { name: '智能体' }
  };

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

  var ACTS = {
    act1: {
      title: '官方素材分享',
      limit: 1,
      short: '领取官方文案与配图，一键快速分享',
      icon: '素',
      intro: {
        book: { h: '官方素材 · 小说分享', p: '平台已为你准备好官方文案与配图，复制、下载后即可在社交平台发布，轻松成为话本分享官。', chips: ['分享小说精彩内容', '推荐热门作品'] },
        agent: { h: '官方素材 · 智能体分享', p: '平台已为你准备好智能体体验文案与配图，复制、下载后即可在社交平台发布。', chips: ['分享智能体体验', '推荐热门角色'] }
      },
      copies: {
        book: [
          '最近在「话本小说」挖到宝藏了！剧情节奏超紧凑，名场面一个接一个，熬夜也停不下来～同人题材也超多，书荒的姐妹快冲！\n#话本小说 #小说推荐 #书荒推荐',
          '书荒救星来了！「话本小说」免费小说平台，热门同人、原创都能找到，人物关系写得太好嗑了，已经连追三本，强推！\n#话本小说 #同人小说 #免费小说'
        ],
        agent: [
          '谁懂啊！在「话本」里和 AI 角色聊天也太上头了吧！回复超有代入感，像真的有人在陪我说话～附上我的聊天截图！\n#话本智能体 #AI对话 #智能体推荐',
          '每天下班第一件事就是打开「话本」找我的智能体聊天，情绪价值拉满，性格设定也超细致，强烈推荐给需要陪伴的你！\n#话本智能体 #AI陪伴 #人机恋'
        ]
      },
      posters: {
        book: [
          { t: '话本小说', s: '书荒救星\n热门同人免费读', c: ['#ffeed8', '#ffdbe6'] },
          { t: '名场面', s: '一口气看到天亮\n停不下来', c: ['#fff3cc', '#ffe0d6'] },
          { t: '宝藏小说', s: '人物关系\n太好嗑了', c: ['#ffe0ec', '#efe4ff'] }
        ],
        agent: [
          { t: '话本智能体', s: '懂你的 AI 角色\n24 小时陪伴', c: ['#e2f0ff', '#ece4ff'] },
          { t: '趣味聊天', s: '每一句回复\n都超有代入感', c: ['#ffe6ef', '#e2ecff'] },
          { t: '角色陪伴', s: '情绪价值\n拉满', c: ['#ece4ff', '#ffe4ec'] }
        ]
      }
    },
    act2: {
      title: '原创内容分享',
      limit: 1,
      short: '自主创作，分享你的真实体验',
      icon: '创',
      intro: {
        book: { h: '原创分享 · 小说方向', p: '用户自主创作分享内容，用你自己的方式分享在话本小说中的真实阅读体验，优质内容热度越高，奖励越丰厚。' },
        agent: { h: '原创分享 · 智能体方向', p: '用户自主创作分享内容，记录你与喜欢的智能体互动的日常，分享真实的角色陪伴体验。' }
      },
      req: {
        book: {
          what: '在小红书、抖音或快手分享「话本小说」，可发布精彩片段、名场面推荐或真实阅读体验；发布时需带上专属分享码与内容相关的话题标签。请使用自行创作的内容，官方活动下发的素材不参与本活动。',
          dirs: [
            '分享小说中的精彩片段，搭配阅读截图。',
            '推荐让你印象深刻的名场面，说说你的感受。',
            '梳理并介绍书中的人物关系，帮助新读者入坑。',
            '分享你在话本小说的真实阅读体验。',
            '推荐你喜欢的同人作品，附上书名与亮点。'
          ],
          tip: '请围绕以上选题分享真实阅读体验，不要发布与话本小说无关的内容。'
        },
        agent: {
          what: '在小红书、抖音或快手分享「话本智能体」，可发布有趣的聊天截图、角色互动或真实使用体验；发布时需带上专属分享码与内容相关的话题标签。请使用自行创作的内容，官方活动下发的素材不参与本活动。',
          dirs: [
            '分享与喜欢的 AI 角色的互动截图。',
            '分享有趣的聊天记录、聊天梗或对话。',
            '分享你使用话本智能体的真实体验。',
            '记录角色陪伴的日常，展示互动自然、活人感强的瞬间。'
          ],
          tip: '请围绕以上选题分享真实使用体验，不要发布与话本智能体无关的内容。'
        }
      }
    },
    act3: {
      title: '评论区分享',
      limit: 2,
      short: '在相关帖子评论区分享真实体验',
      icon: '评',
      intro: {
        book: { h: '评论区分享 · 小说方向', p: '在小红书、抖音等平台，找到非官方账号、非本人发布的相关帖子，在评论区分享你的话本小说阅读体验。', chips: ['每日 2 次', '30 字以上', '配截图'] },
        agent: { h: '评论区分享 · 智能体方向', p: '在小红书、抖音等平台，找到非官方账号、非本人发布的相关帖子，在评论区分享你的话本智能体使用体验。', chips: ['每日 2 次', '30 字以上', '配聊天截图'] }
      },
      postTags: {
        book: ['同人社区', '同人小说', '小说平台', '免费小说平台'],
        agent: ['人机恋', 'AI对话App', '智能体推荐']
      },
      commentReq: {
        book: ['真实阅读体验', '包含「话本小说」关键词', '搭配相关截图', '评论字数不少于 30 字'],
        agent: ['真实使用体验', '包含话本智能体相关内容', '搭配聊天截图', '评论字数不少于 30 字']
      },
      shotReq: ['评论发布后 2 分钟内截图上传', '截图不允许裁剪', '必须展示手机左上角本地时间', '保留完整帖子信息', '能清晰查看评论内容']
    }
  };

  // 社交 App 搜索跳转：先尝试唤起 App，失败则打开网页版
  var SOCIAL = {
    xhs: {
      name: '小红书',
      scheme: function (k) { return 'xhsdiscover://search/result?keyword=' + k; },
      web: function (k) { return 'https://www.xiaohongshu.com/search_result?keyword=' + k; }
    },
    dy: {
      name: '抖音',
      scheme: function (k) { return 'snssdk1128://search?keyword=' + k; },
      web: function (k) { return 'https://www.douyin.com/search/' + k; }
    }
  };

  // ---------------- 状态 ----------------
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('hb_' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('hb_' + k, JSON.stringify(v)); } catch (e) {} }
  };
  var state = {
    type: store.get('type', 'book'),
    platform: '小红书',
    tagIdx: 0,
    shots: []
  };

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate();
  }
  function usedToday(act) { return store.get('used_' + act + '_' + todayKey(), 0); }
  function addUsed(act) { store.set('used_' + act + '_' + todayKey(), usedToday(act) + 1); }
  function shareCode() { return store.get('code', ''); }

  // ---------------- 工具 ----------------
  var toastTimer;
  function toast(msg) {
    var el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 1800);
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { toast('已复制'); }, fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('已复制'); } catch (e) { toast('复制失败，请长按手动复制'); }
      document.body.removeChild(ta);
    }
  }
  function list(items, cls) {
    return '<ul class="' + cls + '">' + items.map(function (t) {
      return '<li>' + esc(t) + '</li>';
    }).join('') + '</ul>';
  }
  function isMobile() { return /Android|iPhone|iPad|iPod|HarmonyOS/i.test(navigator.userAgent); }

  function openSocial(key, keyword) {
    var s = SOCIAL[key], k = encodeURIComponent(keyword);
    if (!isMobile()) {
      window.open(s.web(k), '_blank');
      toast('已在新窗口打开' + s.name + '网页版');
      return;
    }
    toast('正在打开' + s.name + '…');
    var timer = setTimeout(function () {
      if (!document.hidden) location.href = s.web(k);
    }, 2000);
    document.addEventListener('visibilitychange', function onVis() {
      if (document.hidden) { clearTimeout(timer); document.removeEventListener('visibilitychange', onVis); }
    });
    location.href = s.scheme(k);
  }

  // ---------------- 首页 ----------------
  function renderHome() {
    var actBtns = ['act1', 'act2', 'act3'].map(function (k, i) {
      var a = ACTS[k];
      return '<button class="act-btn" data-go="' + k + '">' +
        '<div class="info"><div class="name">活动' + '一二三'[i] + '：' + a.title +
        '<span class="tag-limit">每日' + a.limit + '次</span></div>' +
        '<div class="desc">' + a.short + '</div></div>' +
        '<span class="go">去参与</span></button>';
    }).join('');

    app.innerHTML =
      '<div class="page home">' +
        '<div class="hero">' +
          '<button class="rules-entry" data-go="rules">活动规则 ›</button>' +
          '<span class="brand">话本 · 用户宣传活动</span>' +
          '<h1>话本分享官<br>征集活动</h1>' +
          '<p>分享你在话本小说中的精彩阅读体验，或记录与你喜欢的智能体互动的日常，即可成为「话本分享官」。</p>' +
          '<div class="cash">优质内容最高领 <b>100</b> 元现金</div>' +
        '</div>' +
        '<div class="wrap">' +
          '<div class="card">' +
            '<div class="card-title">活动时间</div>' +
            '<ol class="num-list">' +
              '<li>参与活动的帖子 / 评论发布时间需 ≥ <b>2026年10月20日 00:00</b></li>' +
              '<li>活动开始前发布的内容不参与奖励</li>' +
            '</ol>' +
          '</div>' +
          '<div class="card"><div class="card-title">活动奖励</div>' +
            '<div class="reward-dual">' +
              '<div class="reward-box book"><div class="t">小说分享</div><div class="v">50 泡泡币</div><div class="d">每日首次有效分享</div></div>' +
              '<div class="reward-box agent"><div class="t">智能体分享</div><div class="v">30 轮对话</div><div class="d">每日首次有效分享</div></div>' +
            '</div>' +
            '<div class="sub-title">热度追加奖励<span>统计指标：点赞数 + 收藏数</span></div>' +
            '<div class="tier-table">' +
              '<div class="tr th"><span>点赞+收藏</span><span>小说分享</span><span>智能体分享</span></div>' +
              REWARD.book.tiers.map(function (t, i) {
                var ag = REWARD.agent.tiers[i];
                return '<div class="tr' + (t.top ? ' top' : '') + '"><span>' + t.lv + '</span><span>' + t.rw + '</span><span>' + ag.rw + '</span></div>';
              }).join('') +
            '</div>' +
          '</div>' +
          '<div class="card"><div class="card-title">选择参与方式<span class="sub">点击进入活动</span></div>' + actBtns + '</div>' +
        '</div>' +
      '</div>';
  }

  // ---------------- 活动页组件 ----------------
  function topbar(act) {
    var segs = Object.keys(TYPES).map(function (k) {
      return '<button data-type="' + k + '" class="' + (state.type === k ? 'on' : '') + '">' +
        TYPES[k].name + '</button>';
    }).join('');
    return '<div class="topbar"><div class="row">' +
      '<button class="back" data-go="">‹</button><div class="ttl">' + act.title + '</div>' +
      '<button class="rules-link" data-go="rules">规则</button></div>' +
      '<div class="picker"><div class="lbl">选择宣传内容</div>' +
      '<div class="seg"><div class="thumb"></div>' + segs + '</div></div></div>';
  }

  function introBanner(act) {
    var it = act.intro[state.type];
    return '<div class="intro-banner"><h2>' + it.h + '</h2><p>' + it.p + '</p>' +
      '<div class="chips">' + it.chips.map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div></div>';
  }

  function step(n, title, sub, body) {
    return '<div class="card step-card"><div class="step-head">' +
      '<span class="step-no">步骤<b>' + n + '</b></span>' +
      '<div class="step-title">' + title + (sub ? '<span class="sub">' + sub + '</span>' : '') + '</div></div>' +
      body + '</div>';
  }

  function codeBody() {
    var code = shareCode();
    return '<div class="code-box"><div class="code ' + (code ? '' : 'empty') + '">' + (code || '尚未领取分享码') + '</div>' +
      (code ? '<button class="btn ghost" data-copy-code>复制</button>' : '<button class="btn" data-get-code>立即领取</button>') +
      '</div><p class="note">分享码与话本账号 ID 绑定，系统将校验分享码是否属于当前账号，使用他人分享码无效。</p>';
  }

  function publishBody(text) {
    return '<p class="text">' + text + '</p>';
  }

  function rewardBody(withTiers) {
    var r = REWARD[state.type];
    var html = '<div class="base-reward"><div><div class="t">基础奖励</div><div class="v">' + r.base + '</div></div>' +
      '<div class="t" style="text-align:right">' + r.baseDesc.replace(' · ', '<br>') + '</div></div>';
    if (withTiers) {
      html += '<div class="muted" style="margin-bottom:8px">热度追加奖励 · 统计指标：累计点赞数 + 收藏数</div>' +
        '<div class="tiers">' + r.tiers.map(function (t) {
          return '<div class="tier' + (t.top ? ' top' : '') + '"><span class="lv">' + t.lv + '</span><span class="rw">' + t.rw + '</span></div>';
        }).join('') + '</div>';
    }
    return html;
  }

  function rewardNotes() {
    return '<div class="foot-notes"><div class="hd">奖励说明</div><ol>' +
      '<li>每种奖励每日最多参与 1 次，每日首次有效分享可领基础奖励。</li>' +
      '<li>同一条分享内容仅可选择一种奖励模式，不可同时领取小说奖励和智能体奖励。</li>' +
      '<li>单篇帖子首次审核通过领基础奖励，后续热度达到更高档位，平台主动补发对应追加奖励，无需重复提交。</li>' +
      '<li>同一奖励档位不可重复领取；万赞现金奖励无需扣除此前已领取的奖励。</li>' +
      '<li>单个用户每月最多领取 5 次万赞现金奖励，超出后帖子仍可参与，其他奖励正常计算。</li>' +
      '<li>普通内容 1 个工作日内完成审核，审核通过后奖励自动发放至话本账号。</li>' +
      '</ol></div>';
  }

  function submitBody(actKey, opts) {
    opts = opts || {};
    var act = ACTS[actKey];
    var left = Math.max(0, act.limit - usedToday(actKey));
    var plats = ['小红书', '抖音', '快手'].map(function (p) {
      return '<button type="button" data-plat="' + p + '" class="' + (state.platform === p ? 'on' : '') + '">' + p + '</button>';
    }).join('');
    var shots = '';
    if (opts.shots) {
      shots = '<div class="field"><label>评论截图<em>*</em></label><div class="upload">' +
        state.shots.map(function (src, i) {
          return '<div class="thumb-img"><img src="' + src + '" alt=""><button type="button" data-del-shot="' + i + '">×</button></div>';
        }).join('') +
        (state.shots.length < 3 ? '<label class="add"><b>+</b>上传截图<input type="file" accept="image/*" hidden id="shotInput"></label>' : '') +
        '</div></div>';
    }
    return '<div class="quota"><span>奖励模式：' + TYPES[state.type].name + '</span>' +
      '<span>今日剩余 <b>' + left + '</b> / ' + act.limit + ' 次</span></div>' +
      '<form id="submitForm" novalidate>' +
        '<div class="field"><label>发布平台<em>*</em></label><div class="platforms">' + plats + '</div></div>' +
        '<div class="field"><label>' + (opts.linkLabel || '帖子链接') + '<em>*</em></label>' +
          '<input id="fLink" type="url" placeholder="粘贴' + state.platform + '帖子分享链接" /></div>' +
        shots +
        '<div class="field"><label>分享码<em>*</em></label><input id="fCode" placeholder="请输入你的专属分享码" value="' + esc(shareCode()) + '" /></div>' +
        '<button class="btn block" type="submit"' + (left ? '' : ' disabled') + '>' + (left ? '提交审核' : '今日次数已用完') + '</button>' +
      '</form>' +
      (opts.update ? updateBody() : '');
  }

  function updateBody() {
    var open = state.updOpen;
    return '<div class="upd">' +
      '<button type="button" class="upd-toggle" data-upd-toggle>' +
        '<span><b>旧帖数据更新申请</b><em>已提交过的帖子热度上涨？申请更新数据</em></span>' +
        '<i>' + (open ? '收起' : '去申请') + '</i></button>' +
      (open ?
        '<form id="updForm" class="upd-form" novalidate>' +
          '<p class="step-desc">平台核实最新点赞 + 收藏数据后，按达到的最高档位补发奖励，不占用每日参与次数。</p>' +
          '<div class="field"><label>原帖链接<em>*</em></label><input id="uLink" type="url" placeholder="粘贴已提交过的帖子链接" /></div>' +
          '<div class="field"><label>当前累计点赞 + 收藏<em>*</em></label><input id="uNum" type="number" min="0" inputmode="numeric" placeholder="例如 1200" /></div>' +
          '<button class="btn block ghost" type="submit">提交数据更新申请</button>' +
        '</form>' : '') +
      '</div>';
  }

  // ---------------- 活动页 ----------------
  function renderAct1() {
    var a = ACTS.act1, t = state.type;
    var copies = '<div class="copy-item"><div class="txt clamp3">' + esc(a.copies[t][0]) + '</div>' +
      '<div class="ops"><button class="btn ghost" data-copy="0">复制文案</button></div></div>';
    var posters = a.posters[t].map(function (p, i) {
      return '<div class="poster"><canvas width="360" height="480" data-poster="' + i + '"></canvas>' +
        '<button class="dl" data-dl="' + i + '">下载</button></div>';
    }).join('');
    return introBanner(a) +
      step(1, '领取素材 · 复制文案', '点击复制', copies) +
      step(2, '下载活动配图', '点击下载', '<div class="posters">' + posters + '</div>') +
      step(3, '领取专属分享码', '', codeBody()) +
      step(4, '发布到社交平台', '', publishBody('将官方文案、配图和分享码一起发布到小红书、抖音、快手等社交媒体平台。')) +
      step(5, '上传帖子链接及分享码', '', submitBody('act1', { update: true })) +
      step(6, '审核通过领取奖励', '热度提升追加奖励', rewardBody(true));
  }

  function renderAct2() {
    var a = ACTS.act2, t = state.type, r = a.req[t];
    var intro = '<div class="card req-card">' +
      '<div class="card-title">发布要求<span class="sub">' + TYPES[t].name + '方向</span></div>' +
      '<div class="req-form"><span class="lbl">支持形式</span><span class="chip">图文</span><span class="chip">视频</span></div>' +
      '<div class="req-hd">分享什么？</div>' +
      '<p class="text">' + r.what + '</p>' +
      '<div class="dir-box"><div class="dir-hd">推荐方向</div>' +
        r.dirs.map(function (d, i) {
          return '<div class="dir-row"><span class="no">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span>' + d + '</span></div>';
        }).join('') +
        '<p class="dir-tip">' + r.tip + '</p>' +
      '</div></div>';
    return intro +
      step(1, '领取专属分享码', '', codeBody()) +
      step(2, '发布原创内容', '', publishBody('围绕上方推荐方向自主创作，带上分享码发布到小红书、抖音、快手等平台。')) +
      step(3, '上传帖子链接及分享码', '', submitBody('act2', { update: true })) +
      step(4, '审核通过获得奖励', '热度提升追加奖励', rewardBody(true));
  }

  function renderAct3() {
    var a = ACTS.act3, t = state.type;
    var tags = a.postTags[t];
    if (state.tagIdx >= tags.length) state.tagIdx = 0;
    var pick =
      '<div class="jump-row" style="margin-top:0">' +
        '<button class="jump-btn xhs" data-jump="xhs"><span class="logo">红</span>去小红书选帖</button>' +
        '<button class="jump-btn dy" data-jump="dy"><span class="logo">抖</span>去抖音选帖</button>' +
      '</div>' +
      '<p class="step-desc" style="margin-top:12px">帖子标签需包含以下任一，选择标签后点击上方按钮去 App 搜索选帖：</p>' +
      '<div class="tags">' + tags.map(function (d, i) {
        return '<button data-tag="' + i + '" class="' + (i === state.tagIdx ? 'on' : '') + '">#' + d + '</button>';
      }).join('') + '</div>' +
      '<div class="warn" style="margin-top:12px">需寻找 <b>非官方账号、非本人发布</b> 的相关帖子进行评论。</div>';
    return introBanner(a) +
      step(1, '领取专属分享码', '', codeBody()) +
      step(2, '选择帖子', '', pick) +
      step(3, '发布评论', '', list(a.commentReq[t], 'dots')) +
      step(4, '截图并上传', '每日 2 次', list(a.shotReq, 'dots') +
        '<div style="height:12px"></div>' + submitBody('act3', { linkLabel: '评论所在帖子链接', shots: true })) +
      step(5, '审核通过获得奖励', '', rewardBody(false));
  }

  var RENDER = { act1: renderAct1, act2: renderAct2, act3: renderAct3 };

  function renderAct(key, keepScroll) {
    var top = screen.scrollTop;
    app.innerHTML = '<div class="page act ' + state.type + '">' + topbar(ACTS[key]) +
      '<div class="act-body">' + RENDER[key]() + rewardNotes() + '</div></div>';
    if (key === 'act1') drawPosters();
    if (keepScroll) screen.scrollTop = top;
  }

  // ---------------- 规则页 ----------------
  function renderRules() {
    var secs = [
      ['一、活动时间', '活动开始时间：2026年10月20日 00:00。参与活动的帖子 / 评论发布时间需 ≥ 2026年10月20日 00:00，活动开始前发布的内容不参与奖励。'],
      ['二、奖励规则', '小说分享：每日首次有效分享得 50 泡泡币；智能体分享：每日首次有效分享得 30 轮对话额度。均为每日最多 1 次，热度追加奖励统计指标为点赞数 + 收藏数。'],
      ['三、奖励说明', '1. 同一条分享内容仅可选择一种奖励模式，不可同时领取小说奖励和智能体奖励。<br>2. 单篇帖子首次审核通过可领基础奖励，后续达到更高热度档位可获对应追加奖励，同一档位不可重复领取。例：小说分享达到 50 互动领 100 泡泡币；1000 互动补发会员 15 天；2000 互动再补发会员 15 天；10000 互动额外领现金 100 元。万赞现金奖励无需扣除此前已领奖励。<br>3. 分享码与话本账号 ID 绑定，提交时需上传对应分享码，使用他人分享码、冒用账号等行为无效。'],
      ['四、参与限制', '活动一（官方素材分享）每日最多 1 次；活动二（原创内容分享）每日最多 1 次；活动三（评论区分享）每日最多 2 次。单个用户每月最多领取 5 次万赞现金奖励，超过后帖子仍可参与，但不再发放现金奖励，其他奖励正常计算。'],
      ['五、内容有效期', '提交内容后 2 个月内不得删除、隐藏帖子，不得修改为与活动无关内容或限制他人查看。如发现违规，平台有权取消活动资格、收回违规奖励、限制后续参与。'],
      ['六、审核规则', '平台将审核：是否为本人账号发布、是否包含有效分享码、发布时间是否符合要求、内容是否符合活动规范、是否存在刷赞刷收藏等异常行为。普通内容 1 个工作日内完成审核，高热内容视情况延长，审核通过后奖励自动发放至账号。'],
      ['七、热度追踪', '帖子提交成功后，平台会持续关注点赞数、收藏数变化，达到新的奖励档位将主动补发对应奖励，用户无需重复提交。'],
      ['八、违规处理', '使用多个账号重复参与、使用他人帖子、搬运复制他人内容、虚假编造体验、购买点赞收藏、提交虚假截图、恶意刷取奖励等行为，平台有权取消资格、不发放或收回奖励、限制账号参与活动。'],
      ['九、特别说明', '活动奖励以平台审核结果为准；如发现异常增长或违规行为，平台有权重新审核奖励资格；活动规则可能根据实际运营情况调整，调整内容将在活动页面公布。']
    ];
    app.innerHTML = '<div class="page act book"><div class="topbar"><div class="row">' +
      '<button class="back" data-back>‹</button><div class="ttl">活动规则</div><span class="spacer"></span></div></div>' +
      '<div class="act-body"><div class="card">' + secs.map(function (s) {
        return '<div class="rule-sec"><h3>' + s[0] + '</h3><p class="text">' + s[1] + '</p></div>';
      }).join('') + '</div></div></div>';
  }

  // ---------------- 配图 ----------------
  function drawPoster(cv, p) {
    var ctx = cv.getContext('2d'), w = cv.width, h = cv.height;
    var dark = state.type === 'agent' ? '#5a6aab' : '#b0607a';
    var g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, p.c[0]); g.addColorStop(1, p.c[1]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,.55)';
    ctx.beginPath(); ctx.arc(w - 30, 60, 110, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(30, h - 40, 80, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = dark;
    ctx.font = '600 22px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('话本 · 分享官', 28, 56);
    ctx.font = '800 54px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(p.t, 28, 200);
    ctx.globalAlpha = .8;
    ctx.font = '500 28px "PingFang SC","Microsoft YaHei",sans-serif';
    p.s.split('\n').forEach(function (line, i) { ctx.fillText(line, 28, 260 + i * 42); });
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    roundRect(ctx, 28, h - 92, 220, 50, 25); ctx.fill();
    ctx.fillStyle = dark;
    ctx.font = '700 22px "PingFang SC","Microsoft YaHei",sans-serif';
    var code = shareCode();
    ctx.fillText(code ? '分享码 ' + code : '搜索「话本」', 46, h - 59);
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function drawPosters() {
    var items = ACTS.act1.posters[state.type];
    app.querySelectorAll('canvas[data-poster]').forEach(function (cv) {
      drawPoster(cv, items[+cv.getAttribute('data-poster')]);
    });
  }

  // ---------------- 路由 ----------------
  function currentAct() {
    var key = location.hash.replace('#/', '').replace('#', '');
    return ACTS[key] ? key : null;
  }
  function route() {
    var key = location.hash.replace('#/', '').replace('#', '');
    state.shots = [];
    state.tagIdx = 0;
    state.updOpen = false;
    if (ACTS[key]) renderAct(key);
    else if (key === 'rules') renderRules();
    else renderHome();
    screen.scrollTop = 0;
  }

  // ---------------- 事件 ----------------
  function renderKeepingForm(act) {
    var link = document.getElementById('fLink'), code = document.getElementById('fCode');
    var lv = link ? link.value : '', cv = code ? code.value : '';
    renderAct(act, true);
    if (document.getElementById('fLink')) document.getElementById('fLink').value = lv;
    if (document.getElementById('fCode')) document.getElementById('fCode').value = cv;
  }

  app.addEventListener('click', function (e) {
    var el = e.target.closest('button, [data-go]');
    if (!el) return;
    var act = currentAct();

    if (el.hasAttribute('data-back')) {
      if (history.length > 1) history.back(); else location.hash = '#/';
      return;
    }
    if (el.hasAttribute('data-go')) {
      var to = el.getAttribute('data-go');
      location.hash = to ? '#/' + to : '#/';
      return;
    }
    if (el.hasAttribute('data-type')) {
      var t = el.getAttribute('data-type');
      if (t !== state.type) { state.type = t; state.tagIdx = 0; store.set('type', t); renderKeepingForm(act); }
      return;
    }
    if (el.hasAttribute('data-get-code')) {
      var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', code = 'HB';
      for (var i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
      store.set('code', code);
      renderKeepingForm(act);
      document.getElementById('fCode').value = code;
      toast('领取成功：' + code);
      return;
    }
    if (el.hasAttribute('data-copy-code')) { copyText(shareCode()); return; }
    if (el.hasAttribute('data-copy')) {
      var txt = ACTS.act1.copies[state.type][+el.getAttribute('data-copy')];
      copyText(txt + (shareCode() ? '\n分享码：' + shareCode() : ''));
      return;
    }
    if (el.hasAttribute('data-dl')) {
      var idx = el.getAttribute('data-dl');
      var cv = app.querySelector('canvas[data-poster="' + idx + '"]');
      var a = document.createElement('a');
      a.href = cv.toDataURL('image/png');
      a.download = '话本分享官_' + TYPES[state.type].name + '_' + (+idx + 1) + '.png';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      toast('配图已下载');
      return;
    }
    if (el.hasAttribute('data-tag')) {
      state.tagIdx = +el.getAttribute('data-tag');
      app.querySelectorAll('[data-tag]').forEach(function (b) { b.classList.toggle('on', b === el); });
      return;
    }
    if (el.hasAttribute('data-jump')) {
      openSocial(el.getAttribute('data-jump'), ACTS.act3.postTags[state.type][state.tagIdx]);
      return;
    }
    if (el.hasAttribute('data-plat')) {
      state.platform = el.getAttribute('data-plat');
      app.querySelectorAll('[data-plat]').forEach(function (b) { b.classList.toggle('on', b === el); });
      var link = document.getElementById('fLink');
      if (link) link.placeholder = '粘贴' + state.platform + '帖子分享链接';
      return;
    }
    if (el.hasAttribute('data-upd-toggle')) {
      state.updOpen = !state.updOpen;
      renderKeepingForm(act);
      return;
    }
    if (el.hasAttribute('data-del-shot')) {
      state.shots.splice(+el.getAttribute('data-del-shot'), 1);
      renderKeepingForm(act);
      return;
    }
  });

  app.addEventListener('change', function (e) {
    if (e.target.id !== 'shotInput' || !e.target.files[0]) return;
    var reader = new FileReader();
    reader.onload = function () { state.shots.push(reader.result); renderKeepingForm(currentAct()); };
    reader.readAsDataURL(e.target.files[0]);
  });

  app.addEventListener('submit', function (e) {
    e.preventDefault();
    var act = currentAct();
    if (e.target.id === 'updForm') {
      var uLink = document.getElementById('uLink').value.trim();
      var uNum = document.getElementById('uNum').value.trim();
      if (!/^https?:\/\/\S+/i.test(uLink) && !/(xhslink|xiaohongshu|douyin|kuaishou)/i.test(uLink)) return toast('请填写有效的原帖链接');
      if (!/^\d+$/.test(uNum)) return toast('请填写当前累计点赞 + 收藏数');
      state.updOpen = false;
      renderKeepingForm(act);
      toast('数据更新申请已提交，核实后将按最高档位补发奖励');
      return;
    }
    var link = document.getElementById('fLink').value.trim();
    var code = document.getElementById('fCode').value.trim().toUpperCase();
    if (usedToday(act) >= ACTS[act].limit) return toast('今日参与次数已用完');
    if (!/^https?:\/\/\S+/i.test(link) && !/(xhslink|xiaohongshu|douyin|kuaishou)/i.test(link)) return toast('请填写有效的帖子链接');
    if (act === 'act3' && !state.shots.length) return toast('请上传评论截图');
    if (!shareCode()) return toast('请先领取专属分享码');
    if (code !== shareCode()) return toast('分享码与当前账号不匹配');
    addUsed(act);
    state.shots = [];
    renderAct(act, true);
    toast('提交成功！已选择「' + TYPES[state.type].name + '」奖励模式，预计 1 个工作日内完成审核');
  });

  window.addEventListener('hashchange', route);

  function clock() {
    var d = new Date(), m = d.getMinutes();
    document.getElementById('clock').textContent = d.getHours() + ':' + (m < 10 ? '0' + m : m);
  }
  clock(); setInterval(clock, 10000);

  route();
})();
