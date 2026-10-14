(function () {
  'use strict';

  var app = document.getElementById('app');
  var screen = document.getElementById('screen');

  // ---------------- 数据 ----------------
  var TYPES = HB.TYPES;
  var REWARD = HB.REWARD;

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
    set: function (k, v) { try { localStorage.setItem('hb_' + k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  };
  var state = {
    type: store.get('type', 'book'),
    platform: '小红书',
    tagIdx: 0,
    shots: emptyShots()
  };
  function emptyShots() { return { comment: [], data: [], upd: [] }; }

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate();
  }
  function usedToday(act) { return store.get('used_' + act + '_' + todayKey(), 0); }
  function addUsed(act) { store.set('used_' + act + '_' + todayKey(), usedToday(act) + 1); }
  function shareCode() { return store.get('code', ''); }

  var getRecords = HB.getRecords;
  var recordStatus = HB.statusOf;
  var fmtTime = HB.fmtTime;
  function addRecord(rec) {
    var list = getRecords();
    rec.id = Date.now();
    rec.time = Date.now();
    rec.code = shareCode();
    rec.status = 'ing';
    rec.claimed = [];
    list.unshift(rec);
    if (HB.saveRecords(list)) return;
    rec.shots = [];
    rec.shotsDropped = true;
    if (!HB.saveRecords(list)) toast('本地存储空间不足，记录保存失败');
  }

  // 截图压缩后再存，避免撑爆 localStorage
  function compressImage(file, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 720, w = img.width, h = img.height;
        if (w > max) { h = Math.round(h * max / w); w = max; }
        var cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        cv.getContext('2d').drawImage(img, 0, 0, w, h);
        cb(cv.toDataURL('image/jpeg', 0.72));
      };
      img.onerror = function () { toast('图片读取失败'); };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

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
  function copyText(text, msg) {
    msg = msg || '已复制';
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { toast(msg); }, fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast(msg); } catch (e) { toast('复制失败，请长按手动复制'); }
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
          recordEntry() +
          rewardNotes('奖励规则') +
        '</div>' +
      '</div>';
  }

  function recordEntry() {
    var list = getRecords();
    var ing = 0, ok = 0;
    list.forEach(function (r) {
      var c = recordStatus(r).c;
      if (c === 'ing') ing++;
      if (c === 'ok') ok++;
    });
    return '<div class="card"><div class="card-title">我的提交记录' +
      (list.length ? '<button class="sub link" data-go="records">查看全部 ›</button>' : '') + '</div>' +
      '<div class="rec-stats"' + (list.length ? ' data-go="records" style="cursor:pointer"' : '') + '>' +
        '<div><b>' + list.length + '</b><span>累计提交</span></div>' +
        '<div><b>' + ing + '</b><span>审核中</span></div>' +
        '<div><b>' + ok + '</b><span>已通过</span></div>' +
      '</div>' +
      (list.length ? ''
        : '<p class="rec-empty">还没有提交记录，参与活动后可在这里查看帖子数据</p>' +
          '<button class="link-btn" data-demo>生成测试记录看看效果</button>') +
      updEntry() +
      '</div>';
  }

  function updEntry() {
    return '<div class="upd"><button type="button" class="upd-toggle" data-go="records">' +
      '<span><b>旧帖数据更新</b><em>帖子热度上涨？在提交记录中选择原帖更新数据</em></span>' +
      '<i>去更新 ›</i></button></div>';
  }

  function recordRows(r, full) {
    var rows = [];
    rows.push(['宣传内容', TYPES[r.type].name]);
    if (r.platform) rows.push(['发布平台', r.platform]);
    if (r.views !== undefined && r.views !== '') rows.push(['浏览量', '<b>' + (+r.views).toLocaleString() + '</b>']);
    if (r.likes !== undefined && r.likes !== '') rows.push(['点赞', '<b>' + (+r.likes).toLocaleString() + '</b>']);
    if (r.favs !== undefined && r.favs !== '') rows.push(['收藏', '<b>' + (+r.favs).toLocaleString() + '</b>']);
    if (r.interact !== undefined && r.interact !== '' && (full || r.likes === undefined)) rows.push(['点赞 + 收藏', '<b>' + (+r.interact).toLocaleString() + '</b>']);
    if (full && r.code) rows.push(['分享码', r.code]);
    rows.push(['提交时间', fmtTime(r.time)]);
    return '<div class="rec-rows">' + rows.map(function (x) {
      return '<div><span>' + x[0] + '</span><span>' + x[1] + '</span></div>';
    }).join('') + '</div>';
  }

  function recordHead(r) {
    var st = recordStatus(r);
    return '<div class="rec-hd"><span class="rec-act">' + r.actTitle + '</span><span class="rec-kind">' + r.kind + '</span>' +
      (r.demo ? '<span class="rec-kind demo">测试</span>' : '') +
      '<span class="rec-st ' + st.c + '">' + st.t + '</span></div>';
  }

  function recordItem(r) {
    var rewards = HB.rewardsOf(r);
    var claimed = (r.claimed || []).length;
    return '<div class="rec-item" data-go="record/' + r.id + '">' +
      recordHead(r) + recordRows(r, false) +
      '<div class="rec-foot"><span>' +
        (r.kind === '数据更新' ? '档位奖励在原帖记录中领取' : '奖励 ' + claimed + ' / ' + rewards.length + ' 已领取') +
      '</span><span class="more">' + (HB.canUpdate(r) ? '<em class="upd-pill">可更新数据</em>' : '') + '查看详情 ›</span></div>' +
      '</div>';
  }

  function renderRecordDetail(id) {
    var r = HB.findRecord(id);
    var head = '<div class="page act ' + (r ? r.type : state.type) + '"><div class="topbar"><div class="row">' +
      '<button class="back" data-back>‹</button><div class="ttl">记录详情</div><span class="spacer"></span></div></div>' +
      '<div class="act-body">';
    if (!r) {
      app.innerHTML = head + '<div class="card"><p class="rec-empty">记录不存在或已被删除</p></div></div></div>';
      return;
    }
    var st = recordStatus(r);
    var isUpd = r.kind === '数据更新';
    var claimed = r.claimed || [];
    function claimRow(w, reached) {
      var done = claimed.indexOf(w.key) >= 0;
      var can = st.c === 'ok' && reached && !done;
      var label = done ? '已领取' : st.c === 'reject' ? '不可领取' : st.c !== 'ok' ? '审核通过后领取' : !reached ? '未达到' : '领取 ' + w.name;
      return '<div class="claim-row"><div class="claim-info"><b>' + w.name + '</b><span>' + w.desc + '</span></div>' +
        '<button class="btn claim' + (done ? ' done' : '') + '" data-claim="' + w.key + '"' + (can ? '' : ' disabled') + '>' + label + '</button></div>';
    }

    var rewardCard;
    if (isUpd) {
      var parent = HB.findRecord(r.parent);
      rewardCard = '<div class="card"><div class="card-title">奖励领取</div>' +
        '<p class="note" style="margin-top:0">数据更新审核通过后，新达到的档位奖励会计入原帖，请在原帖记录中领取。数据更新审核时效 3 天。</p>' +
        (parent ? '<button class="btn block ghost" style="margin-top:12px" data-go="record/' + parent.id + '">查看原帖记录 ›</button>' : '') +
        '</div>';
    } else {
      var R = REWARD[r.type];
      var rows = claimRow({ key: 'base', name: R.base, desc: '基础奖励 · 首次发布审核通过' }, true);
      if (r.act !== 'act3') {
        rows += '<div class="sub-title" style="margin:14px 0 4px">作品数据档位奖励<span>每达到一档均可领取</span></div>' +
          HB.tiersOf(r).map(function (t) { return claimRow(t, t.reached); }).join('');
      }
      rewardCard = '<div class="card"><div class="card-title">奖励领取</div>' + rows +
        (st.c === 'ing' ? '<p class="note">首次发布的帖子审核时效 1 天，审核通过后即可领取基础奖励。</p>' : '') +
        '</div>';
    }

    var shotCard = (r.shots && r.shots.length) || r.shotsDropped ?
      '<div class="card"><div class="card-title">上传截图<span class="sub">点击查看大图</span></div>' +
        (r.shots && r.shots.length ? '<div class="rec-shots big">' + r.shots.map(function (s) {
          return '<img src="' + s + '" alt="" data-view>';
        }).join('') + '</div>' : '<p class="rec-empty">截图因存储空间不足未保存</p>') +
      '</div>' : '';

    app.innerHTML = head +
      '<div class="card">' + recordHead(r) + recordRows(r, true) +
        '<div class="rec-link-row"><div class="rec-link" title="' + esc(r.link) + '">' + esc(r.link) + '</div>' +
        '<button class="btn ghost" data-copy-link>复制</button></div>' +
        (st.c === 'reject' && r.rejectReason ? '<div class="warn" style="margin-top:12px">未通过原因：' + esc(r.rejectReason) + '</div>' : '') +
      '</div>' +
      shotCard +
      (HB.canUpdate(r) ? updateCard(r) : '') +
      rewardCard +
      '</div></div>';
  }

  function updateCard(r) {
    var ups = HB.updatesOf(r).sort(function (a, b) { return b.time - a.time; });
    var pending = ups.some(function (u) { return u.status === 'ing'; });
    var hist = ups.length ? '<div class="upd-hist">' + ups.map(function (u) {
      var s = recordStatus(u);
      return '<div class="upd-hist-row" data-go="record/' + u.id + '"><span>' + fmtTime(u.time) + '</span>' +
        '<span>点赞+收藏 <b>' + (+u.interact).toLocaleString() + '</b></span>' +
        '<span class="rec-st ' + s.c + '">' + s.t + '</span></div>';
    }).join('') + '</div>' : '';
    var form = pending
      ? '<p class="note">已有一次数据更新正在审核中，审核时效 3 天，审核完成后可再次更新。</p>'
      : '<form id="updForm" novalidate>' +
          uploadField('upd', '帖子后台数据截图', '请上传最新的帖子后台数据页截图，需清晰展示浏览量、点赞、收藏') +
          statsFields('u') +
          '<button class="btn block" type="submit">提交数据更新</button>' +
        '</form>';
    return '<div class="card"><div class="card-title">旧帖数据更新<span class="sub">审核时效 3 天</span></div>' +
      '<p class="step-desc">帖子热度上涨后，提交最新作品数据，审核通过后达到的每一档奖励都可在下方领取，不占用每日参与次数。</p>' +
      hist + form + '</div>';
  }

  function renderRecords() {
    var list = getRecords();
    var f = state.recFilter || 'all';
    var tabs = [['all', '全部'], ['act1', '官方素材'], ['act2', '原创内容'], ['act3', '评论区']];
    var shown = list.filter(function (r) { return f === 'all' || r.act === f; });
    app.innerHTML = '<div class="page act ' + state.type + '"><div class="topbar"><div class="row">' +
      '<button class="back" data-back>‹</button><div class="ttl">提交记录</div><span class="spacer"></span></div>' +
      '<div class="rec-tabs">' + tabs.map(function (t) {
        return '<button data-rec-filter="' + t[0] + '" class="' + (f === t[0] ? 'on' : '') + '">' + t[1] + '</button>';
      }).join('') + '</div></div>' +
      '<div class="act-body">' +
      '<div class="rec-tip"><b>旧帖数据更新</b>选择要更新的原帖进入详情，上传最新后台数据截图并填写浏览量、点赞、收藏，审核时效 3 天。</div>' +
      (shown.length ? shown.map(function (r) { return '<div class="card">' + recordItem(r) + '</div>'; }).join('')
        : '<div class="card"><p class="rec-empty">暂无记录</p></div>') +
      '</div></div>';
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

  function codeBody(where) {
    var code = shareCode();
    where = where || '帖子';
    return '<div class="code-box"><div class="code ' + (code ? '' : 'empty') + '">' + (code || '尚未领取分享码') + '</div>' +
      (code ? '<button class="btn ghost" data-copy-code="' + where + '">复制</button>' : '<button class="btn" data-get-code>立即领取</button>') +
      '</div><div class="code-must">分享码必须添加在' + where + '末尾，未添加或位置不对将无法通过审核</div>' +
      '<p class="note">分享码与话本账号 ID 绑定，系统将校验分享码是否属于当前账号，使用他人分享码无效。</p>';
  }

  function publishBody(text) {
    return '<p class="text">' + text + '</p>';
  }

  function rewardBody(withTiers) {
    var r = REWARD[state.type];
    var html = '<div class="base-reward"><div><div class="t">基础奖励</div><div class="v">' + r.base + '</div></div>' +
      '<div class="t" style="text-align:right">' + r.baseDesc.replace(' · ', '<br>') + '</div></div>';
    if (withTiers) {
      html += '<div class="muted" style="margin-bottom:8px">热度追加奖励 · 点赞数 + 收藏数每达到一档，该档奖励均可领取</div>' +
        '<div class="tiers">' + r.tiers.map(function (t) {
          return '<div class="tier' + (t.top ? ' top' : '') + '"><span class="lv">' + t.lv + '</span><span class="rw">' + t.rw + '</span></div>';
        }).join('') + '</div>';
    }
    return html;
  }

  function statsFields(p) {
    return '<div class="field"><label>帖子数据<em>*</em></label><div class="stat-inputs">' +
      [['Views', '浏览量'], ['Likes', '点赞'], ['Favs', '收藏']].map(function (x) {
        return '<div><span>' + x[1] + '</span><input id="' + p + x[0] + '" type="number" min="0" inputmode="numeric" placeholder="0" /></div>';
      }).join('') +
      '</div><p class="field-hint" style="margin:6px 0 0">请与后台截图中的数据保持一致</p></div>';
  }

  function readStats(p) {
    var v = {};
    var ok = ['Views', 'Likes', 'Favs'].every(function (k) {
      var el = document.getElementById(p + k);
      v[k] = el ? el.value.trim() : '';
      return /^\d+$/.test(v[k]);
    });
    return ok ? { views: v.Views, likes: v.Likes, favs: v.Favs, interact: String(+v.Likes + +v.Favs) } : null;
  }

  function rewardNotes(title, cls) {
    return '<div class="foot-notes ' + (cls || '') + '"><div class="hd">' + (title || '奖励说明') + '</div><ol>' +
      '<li>每种奖励每日最多参与 1 次，每日首次有效分享可领基础奖励。</li>' +
      '<li>同一条分享内容仅可选择一种奖励模式，不可同时领取小说奖励和智能体奖励。</li>' +
      '<li>单篇帖子首次发布审核通过后，可领取基础奖励；作品数据每达到一个档位，该档奖励均可领取。</li>' +
      '<li>各档位奖励独立发放、互不抵扣，达到高档位时低档位奖励同样可领，同一档位不可重复领取。</li>' +
      '<li>参与活动需领取专属分享码，分享码必须添加在帖子末尾；分享码与话本账号 ID 绑定，使用他人分享码、冒用账号等行为无效。</li>' +
      '<li>单个用户每月最多领取 5 次万赞现金奖励，超出后帖子仍可参与，其他奖励正常计算。</li>' +
      '<li>首次发布的帖子审核时效 1 天；旧帖数据更新审核时效 3 天，请在「我的提交记录」中选择原帖更新。</li>' +
      '</ol></div>';
  }

  function submitBody(actKey, opts) {
    opts = opts || {};
    var act = ACTS[actKey];
    var left = Math.max(0, act.limit - usedToday(actKey));
    var plats = ['小红书', '抖音', '快手'].map(function (p) {
      return '<button type="button" data-plat="' + p + '" class="' + (state.platform === p ? 'on' : '') + '">' + p + '</button>';
    }).join('');
    var shots = opts.shots ? uploadField('comment', '评论截图') : '';
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
      (opts.updEntry ? '<div class="upd-wrap">' + updEntry() + '</div>' : '');
  }

  function uploadField(bucket, label, hint) {
    var list = state.shots[bucket];
    return '<div class="field"><label>' + label + '<em>*</em></label>' +
      (hint ? '<p class="field-hint">' + hint + '</p>' : '') +
      '<div class="upload">' +
      list.map(function (src, i) {
        return '<div class="thumb-img"><img src="' + src + '" alt="" data-view><button type="button" data-del="' + bucket + ':' + i + '">×</button></div>';
      }).join('') +
      (list.length < 3 ? '<label class="add"><b>+</b>上传截图<input type="file" accept="image/*" hidden data-bucket="' + bucket + '"></label>' : '') +
      '</div></div>';
  }

  // ---------------- 活动页 ----------------
  function renderAct1() {
    var a = ACTS.act1, t = state.type;
    var copies = '<div class="copy-item"><div class="txt clamp3">' + esc(a.copies[t][0]) + '</div>' +
      '<div class="ops"><button class="btn ghost" data-copy="0">复制文案</button></div></div>';
    var own = t === 'agent' ? '和智能体的聊天对话' : '喜欢的小说片段';
    var posters = '<div class="poster-one">' +
      '<div class="poster"><canvas width="360" height="480" data-poster="0"></canvas></div>' +
      '<div class="poster-side">' +
        '<button class="btn block ghost" data-dl="0">下载配图</button>' +
        '<div class="own-shot"><b>更推荐自己截图</b>' +
          '截一张你' + own + '，和官方配图一起发布，真实的内容更容易获得点赞和收藏。</div>' +
      '</div></div>';
    return introBanner(a) +
      step(1, '领取素材 · 复制文案', '点击复制', copies) +
      step(2, '下载活动配图', '', posters) +
      step(3, '领取专属分享码', '', codeBody()) +
      step(4, '发布到社交平台', '', publishBody('将官方文案、配图和你自己的截图一起发布到小红书、抖音、快手等社交媒体平台，并在<b>帖子末尾</b>添加专属分享码。')) +
      step(5, '上传帖子链接及分享码', '', submitBody('act1', { updEntry: true })) +
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
      step(2, '发布原创内容', '', publishBody('围绕上方推荐方向自主创作，发布到小红书、抖音、快手等平台，并在<b>帖子末尾</b>添加专属分享码。')) +
      step(3, '上传帖子链接及分享码', '', submitBody('act2', { updEntry: true })) +
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
      step(1, '领取专属分享码', '', codeBody('评论')) +
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
      ['二、奖励规则',
        ['book', 'agent'].map(function (k, i) {
          var R = REWARD[k];
          return '<b>（' + '一二'[i] + '）' + (k === 'book' ? '小说' : '智能体') + '分享奖励</b><br>' +
            '基础奖励：完成有效分享，每日首次参与可得 ' + R.base + '，每日最多参与 1 次。<br>' +
            '热度追加奖励（统计指标：点赞数 + 收藏数），作品数据每达到一个档位，该档奖励均可领取：<br>' +
            R.tiers.map(function (t) { return '· ' + t.lv + ' 互动：' + t.rw; }).join('<br>');
        }).join('<br><br>')],
      ['三、奖励说明',
        '<b>1. 小说与智能体奖励不可重复领取</b><br>同一条分享内容仅可选择一种奖励模式，不可同时领取小说奖励和智能体奖励。<br>' +
        '<b>2. 单篇帖子奖励规则</b><br>单篇帖子可根据热度变化持续获得追加奖励：首次发布审核通过后，可领取基础奖励；作品数据每达到一个档位，该档奖励均可领取，达到高档位时低档位奖励同样可领；同一奖励档位不可重复领取。<br>' +
        '<b>3. 分享码绑定规则</b><br>参与活动需领取专属分享码，<b>分享码必须添加在帖子末尾</b>。分享码与话本账号 ID 绑定；用户提交内容时需上传对应分享码；系统会校验分享码是否属于当前账号；使用他人分享码、冒用账号等行为无效。'],
      ['四、参与限制', '活动一（官方素材分享）每日最多 1 次；活动二（原创内容分享）每日最多 1 次；活动三（评论区分享）每日最多 2 次。单个用户每月最多领取 5 次万赞现金奖励，超过后帖子仍可参与，但不再发放现金奖励，其他奖励正常计算。'],
      ['五、内容有效期', '提交内容后 2 个月内不得删除、隐藏帖子，不得修改为与活动无关内容或限制他人查看。如发现违规，平台有权取消活动资格、收回违规奖励、限制后续参与。'],
      ['六、审核规则', '平台将审核：是否为本人账号发布、帖子末尾是否包含有效分享码、发布时间是否符合要求、内容是否符合活动规范、是否存在刷赞刷收藏等异常行为。首次发布的帖子审核时效 1 天，旧帖数据更新审核时效 3 天。'],
      ['七、旧帖数据更新', '首次提交无需填写浏览量、点赞、收藏。帖子热度上涨后，可在「我的提交记录」中选择原帖，上传最新后台数据截图并填写浏览量、点赞、收藏，审核通过后作品数据达到的每一档奖励均可在原帖记录中领取。数据更新不占用每日参与次数。'],
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
    state.shots = emptyShots();
    state.tagIdx = 0;
    state.updOpen = false;
    if (ACTS[key]) renderAct(key);
    else if (key === 'rules') renderRules();
    else if (key === 'records') { state.recFilter = 'all'; renderRecords(); }
    else if (key.indexOf('record/') === 0) renderRecordDetail(key.slice(7));
    else renderHome();
    screen.scrollTop = 0;
  }

  // ---------------- 事件 ----------------
  function renderKeepingForm(act) {
    var vals = {};
    app.querySelectorAll('input[id]:not([type=file])').forEach(function (i) { vals[i.id] = i.value; });
    if (act) renderAct(act, true);
    else {
      var top = screen.scrollTop;
      renderRecordDetail(location.hash.replace('#/record/', ''));
      screen.scrollTop = top;
    }
    Object.keys(vals).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.value = vals[id];
    });
  }

  function validLink(s) {
    return /^https?:\/\/\S+/i.test(s) || /(xhslink|xiaohongshu|douyin|kuaishou)/i.test(s);
  }

  var viewer = document.getElementById('viewer');
  viewer.addEventListener('click', function () { viewer.classList.remove('show'); });
  app.addEventListener('click', function (e) {
    var img = e.target.closest('img[data-view]');
    if (!img) return;
    viewer.querySelector('img').src = img.src;
    viewer.classList.add('show');
  });

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
    if (el.hasAttribute('data-copy-code')) {
      copyText(shareCode(), '已复制，请将分享码添加在' + el.getAttribute('data-copy-code') + '末尾');
      return;
    }
    if (el.hasAttribute('data-copy')) {
      var txt = ACTS.act1.copies[state.type][+el.getAttribute('data-copy')];
      copyText(txt + (shareCode() ? '\n分享码：' + shareCode() : ''), shareCode() ? '已复制，分享码已附在文案末尾，请勿删除' : '已复制');
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
    if (el.hasAttribute('data-del')) {
      var parts = el.getAttribute('data-del').split(':');
      state.shots[parts[0]].splice(+parts[1], 1);
      renderKeepingForm(act);
      return;
    }
    if (el.hasAttribute('data-demo')) {
      HB.seedDemo();
      location.hash = '#/records';
      toast('已生成 5 条测试记录');
      return;
    }
    if (el.hasAttribute('data-claim')) {
      var rid = location.hash.replace('#/record/', '');
      var rec = HB.findRecord(rid);
      if (!rec || HB.statusOf(rec).c !== 'ok') return;
      var key = el.getAttribute('data-claim');
      var w = HB.rewardsOf(rec).filter(function (x) { return x.key === key; })[0];
      if (!w || (rec.claimed || []).indexOf(key) >= 0) return;
      HB.updateRecord(rid, { claimed: (rec.claimed || []).concat(key) });
      renderRecordDetail(rid);
      toast('领取成功：' + w.name + '，已发放至话本账号');
      return;
    }
    if (el.hasAttribute('data-copy-link')) {
      var cur = HB.findRecord(location.hash.replace('#/record/', ''));
      if (cur) copyText(cur.link);
      return;
    }
    if (el.hasAttribute('data-rec-filter')) {
      state.recFilter = el.getAttribute('data-rec-filter');
      renderRecords();
      return;
    }
  });

  app.addEventListener('change', function (e) {
    var bucket = e.target.getAttribute('data-bucket');
    if (!bucket || !e.target.files[0]) return;
    compressImage(e.target.files[0], function (src) {
      state.shots[bucket].push(src);
      renderKeepingForm(currentAct());
    });
  });

  app.addEventListener('submit', function (e) {
    e.preventDefault();
    var act = currentAct();
    if (e.target.id === 'updForm') {
      var parent = HB.findRecord(location.hash.replace('#/record/', ''));
      if (!parent) return;
      if (!state.shots.upd.length) return toast('请上传帖子后台数据截图');
      var us = readStats('u');
      if (!us) return toast('请完整填写浏览量、点赞、收藏');
      addRecord({
        act: parent.act, actTitle: parent.actTitle, kind: '数据更新', type: parent.type, platform: parent.platform,
        link: parent.link, parent: parent.id, views: us.views, likes: us.likes, favs: us.favs, interact: us.interact,
        shots: state.shots.upd.slice()
      });
      state.shots.upd = [];
      renderKeepingForm(null);
      toast('数据更新已提交，审核时效 3 天');
      return;
    }
    var link = document.getElementById('fLink').value.trim();
    var code = document.getElementById('fCode').value.trim().toUpperCase();
    if (usedToday(act) >= ACTS[act].limit) return toast('今日参与次数已用完');
    if (!validLink(link)) return toast('请填写有效的帖子链接');
    if (act === 'act3' && !state.shots.comment.length) return toast('请上传评论截图');
    if (!shareCode()) return toast('请先领取专属分享码');
    if (code !== shareCode()) return toast('分享码与当前账号不匹配');
    addUsed(act);
    addRecord({
      act: act, actTitle: ACTS[act].title, kind: act === 'act3' ? '评论分享' : '首次提交', type: state.type,
      platform: state.platform, link: link, shots: act === 'act3' ? state.shots.comment.slice() : []
    });
    state.shots = emptyShots();
    renderAct(act, true);
    toast('提交成功！已选择「' + TYPES[state.type].name + '」奖励模式，审核时效 1 天');
  });

  window.addEventListener('hashchange', route);

  function clock() {
    var d = new Date(), m = d.getMinutes();
    document.getElementById('clock').textContent = d.getHours() + ':' + (m < 10 ? '0' + m : m);
  }
  clock(); setInterval(clock, 10000);

  if (/[?&]demo=1/.test(location.search)) {
    HB.seedDemo();
    history.replaceState(null, '', location.pathname + '#/records');
  }
  route();
})();
