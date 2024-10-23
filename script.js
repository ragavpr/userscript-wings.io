// ==UserScript==
// @name         wings.io Patches
// @namespace    http://tampermonkey.net/
// @version      2.0-(22/Oct/2024)
// @description  Patches are designed to run on load, make necessary changes and reload
// @author       ⟐Ragav
// @icon         https://wings.io/images/favicon.png
// @match        https://wings.io
// @run-at       document-start
// @grant        none
// @license      AGPL3
// ==/UserScript==

(function () {
  //EDITABLE REGION

  //Default wings.io Patches
  const default_Gradient = true;
  const default_drawClouds = true;
  const default_drawWater = true;
  const default_drawExplosions = true; //High FPS displays are common, shake effects are optimized only for 60fps, recommended to disable.
  const default_drawSun = true;
  const default_drawItems = true;
  const default_drawTrails = true;
  // const default_drawSplashes = true //Not boolean skipping

  //Additional Custom Patches
  const dark_theme = true;
  const enable_splashes_in_dark_theme = false; //sprites only designed for light-theme

  const filter_names_with_profanity = true;

  const mark_bots_with_emoji = false;
  const highlight_bots_names = false;

  const always_show_nick_input = false;

  const max_leaderboard = 10; //-1 to disable limit
  const disable_you_under_leaderboard = false; //true if no-limit for leaderboard

  const profanity_filter_character = "✲";

  //DEBUG SETTINGS - Keep them disabled
  const debug_show_filtered_profanity = false;

  const profanity_regex_whitelist = [

  ];
  const profanity_regex_blacklist = [
    '^[a@][s\\$][s\\$]$',
    '[a@][s\\$][s\\$]h[o0][l1][e3][s\\$]?',
    'b[a@][s\\$][t\\+][a@]rd ',
    'b[e3][a@][s\\$][t\\+][i1][a@]?[l1]([i1][t\\+]y)?',
    'b[e3][a@][s\\$][t\\+][i1][l1][i1][t\\+]y',
    'b[e3][s\\$][t\\+][i1][a@][l1]([i1][t\\+]y)?',
    'b[i1][t\\+]ch[s\\$]?',
    'b[i1][t\\+]ch[e3]r[s\\$]?',
    'b[i1][t\\+]ch[e3][s\\$]',
    'b[i1][t\\+]ch[i1]ng?',
    'b[l1][o0]wj[o0]b[s\\$]?',
    'c[l1][i1][t\\+]',
    '^(c|k|ck|q)[o0](c|k|ck|q)[s\\$]?$',
    '(c|k|ck|q)[o0](c|k|ck|q)[s\\$]u',
    '(c|k|ck|q)[o0](c|k|ck|q)[s\\$]u(c|k|ck|q)[e3]d ',
    '(c|k|ck|q)[o0](c|k|ck|q)[s\\$]u(c|k|ck|q)[e3]r',
    '(c|k|ck|q)[o0](c|k|ck|q)[s\\$]u(c|k|ck|q)[i1]ng',
    '(c|k|ck|q)[o0](c|k|ck|q)[s\\$]u(c|k|ck|q)[s\\$]',
    '^cum[s\\$]?$',
    'cumm??[e3]r',
    'cumm?[i1]ngcock',
    '(c|k|ck|q)um[s\\$]h[o0][t\\+]',
    '(c|k|ck|q)un[i1][l1][i1]ngu[s\\$]',
    '(c|k|ck|q)un[i1][l1][l1][i1]ngu[s\\$]',
    '(c|k|ck|q)unn[i1][l1][i1]ngu[s\\$]',
    '(c|k|ck|q)un[t\\+][s\\$]?',
    '(c|k|ck|q)un[t\\+][l1][i1](c|k|ck|q)',
    '(c|k|ck|q)un[t\\+][l1][i1](c|k|ck|q)[e3]r',
    '(c|k|ck|q)un[t\\+][l1][i1](c|k|ck|q)[i1]ng',
    'cyb[e3]r(ph|f)u(c|k|ck|q)',
    'd[a@]mn',
    'd[i1]ck',
    'd[i1][l1]d[o0]',
    'd[i1][l1]d[o0][s\\$]',
    'd[i1]n(c|k|ck|q)',
    'd[i1]n(c|k|ck|q)[s\\$]',
    '[e3]j[a@]cu[l1]',
    '(ph|f)[a@]g[s\\$]?',
    '(ph|f)[a@]gg[i1]ng',
    '(ph|f)[a@]gg?[o0][t\\+][s\\$]?',
    '(ph|f)[a@]gg[s\\$]',
    '(ph|f)[e3][l1][l1]?[a@][t\\+][i1][o0]',
    '(ph|f)u(c|k|ck|q)',
    '(ph|f)u(c|k|ck|q)[s\\$]?',
    'g[a@]ngb[a@]ng[s\\$]?',
    'g[a@]ngb[a@]ng[e3]d',
    'g[a@]y',
    'h[o0]m?m[o0]',
    'h[o0]rny',
    'j[a@](c|k|ck|q)\\-?[o0](ph|f)(ph|f)?',
    'j[e3]rk\\-?[o0](ph|f)(ph|f)?',
    'j[i1][s\\$z][s\\$z]?m?',
    '[ck][o0]ndum[s\\$]?',
    'mast(e|ur)b(8|ait|ate)',
    'n+[i1]+[gq]+[e3]*r+[s\\$]*',
    '[o0]rg[a@][s\\$][i1]m[s\\$]?',
    '[o0]rg[a@][s\\$]m[s\\$]?',
    'p[e3]nn?[i1][s\\$]',
    'p[i1][s\\$][s\\$]',
    'p[i1][s\\$][s\\$][o0](ph|f)(ph|f) ',
    'p[o0]rn',
    'p[o0]rn[o0][s\\$]?',
    'p[o0]rn[o0]gr[a@]phy',
    'pr[i1]ck[s\\$]?',
    'pu[s\\$][s\\$][i1][e3][s\\$]',
    'pu[s\\$][s\\$]y[s\\$]?',
    '[s\\$][e3]x',
    '[s\\$]h[i1][t\\+][s\\$]?',
    '[s\\$][l1]u[t\\+][s\\$]?',
    '[s\\$]mu[t\\+][s\\$]?',
    '[s\\$]punk[s\\$]?',
    '[t\\+]w[a@][t\\+][s\\$]?',
  ];
  //END OF EDITABLE REGION

  const append = `
  let profanity_regex_blacklist=['${profanity_regex_blacklist.join("','")}"'];
  let profanity_regex_whitelist=['${profanity_regex_whitelist.join("','")}"'];
  const debug_show_filtered_profanity=${debug_show_filtered_profanity};

  profanity_regex_blacklist = profanity_regex_blacklist.map(regex_str => new RegExp(regex_str, 'ig'));
  profanity_regex_whitelist = profanity_regex_whitelist.map(regex_str => new RegExp(regex_str, 'ig'));
  function filter_name(name) {
      for (const regex_block of profanity_regex_blacklist) {
          name = name.replaceAll(new RegExp(regex_block, 'ig'), match=>{
              for(const regex_allow of profanity_regex_whitelist) {
                  if(match.search(regex_allow) > -1) return match;
              }
              return '${profanity_filter_character}'.repeat(match.length) + (debug_show_filtered_profanity ? ' ('+match+')' : '');
          })
      }
      return name;
  };`;

  function combineScript(a) {
    //wings.io effects, apply default preference
    if (!default_Gradient) a = a.replace("tb=!0", "tb=0");
    if (!default_drawClouds) a = a.replace("ob=!0", "ob=0");
    if (!default_drawWater) a = a.replace("Na=!0", "Na=0");
    if (!default_drawExplosions) a = a.replace("pb=!0", "pb=0");
    if (!default_drawSun) a = a.replace("qb=!0", "qb=0");
    if (!default_drawItems) a = a.replace("rb=!0", "rb=0");
    if (!default_drawTrails) a = a.replace("Ya=!0", "Ya=0");

    //Custom Patches
    if (always_show_nick_input) a = a.replace('s("#nickInput").hide(),', "");

    if (mark_bots_with_emoji || filter_names_with_profanity) {
      a = a.replace("C.setIsBot(p),", "");
      a = a.replace("C.setName(O)", "C.setIsBot(p);C.setName(O)");
    }

    if (mark_bots_with_emoji)
      a = a.replace(
        "this.name=c;",
        "this.name=c;if(this.isBot){this.name+=' 🤖'};"
      );
    if (filter_names_with_profanity)
      a = append + a.replace("this.name=c;", "this.name=filter_name(c);");

    if (highlight_bots_names) {
      a = a.replace(
        ':"rgba(255,220,0,1.0)"',
        ':r.isBot?"rgba(60,255,0,1.0)":"rgba(255,220,0,1.0)"'
      );
      a = a.replace(
        'a.fillStyle="rgba(255,255,255,1.0)"',
        'a.fillStyle=b.isBot?"rgba(60,255,0,1.0)":"rgba(255,255,255,1.0)"'
      );
    }

    if (max_leaderboard < 0) a = a.replace("10<m&&(m=10);", "");
    else if (max_leaderboard != 10)
      a = a.replace(
        "10<m&&(m=10);",
        `${max_leaderboard}<m&&(m=${max_leaderboard});`
      );

    if (disable_you_under_leaderboard || max_leaderboard < 0)
      a = a.replace("a.drawImage(r,n,f+5)", "");

    if (dark_theme) {
      //Don't even try
      if(!enable_splashes_in_dark_theme) a = a.replace("b,f,d,a){","b,f,d,a){return;");
      a = a.replace("9,188,255,1.0","0,56,77,0.5");
      a = a.replace("8,164,254,1.0","0,48,76,0.5");
      a = a.replace("7,142,252,1.0","1,42,76,0.5");
      a = a.replace("7,142,252,1.0","1,42,76,0.5");
      a = a.replace("0,132,232,1.0","0,43,77,0.5");
      a = a.replace("0,90,190,1.0","0,24,51,0.5");
      a = a.replace("190,227,249,","39,62,73,");
      a = a.replace("190,227,249,","39,62,73,");
      a = a.replace("179,222,250,","47,72,85,");
      a = a.replace("179,222,250,","47,72,85,");
      a = a.replace("l=c=1,","l=1,c=0.8,");
      a = a.replace("c=.8)","c=.6)");
      a = a.replace('m)+",231,252,1.0','m-149)+",48,67,1.0');
      a = a.replace(`f)+
",145,202,1.0`,'f-35)+",16,22,1.0');
      a = a.replace('#62bae2','#041622');
      a = a.replace(',"rgba(255,255,255,0.4)"',',"rgba(160,160,160,0.4)"');
      a = a.replace('255,255,255,0.13','160,160,160,0.13');
      a = a.replace('255,255,255,0.05','160,160,160,0.05');
      a = a.replace('.2,"rgba(255,255,255,0','.2,"rgba(160,160,160,0');
      a = a.replace('a.fillStyle="rgba(255,255,255,1)";','a.fillStyle="rgba(160,160,160,1)";')
      a = a.replace('if(u.isSpaceWars()){','{');
      a = a.replace('if(u.isSpaceWars())f','f');
      a = a.replace('w(a);else ','w(a);if(!u.isSpaceWars()) ');
      a = a.replace('background-color: #FFF;','background-color: #000;color: #FFF;');
      a = a.replace('background-color: #FFF;','background-color: #000;color: #FFF;');
      a = a.replace('background-color: #FFF;','background-color: #000;color: #FFF;');
      a = a.replace('background-color: #FFF;','background-color: #000;color: #FFF;');
      a = a.replace('PI);a.fill()','PI);a.fill();let craters=[[-30,-15,15],[-20,25,10],[10,0,12]];a.fillStyle = "rgba(145,145,145,1)";for(const [x, y, r] of craters){a.beginPath();a.arc(c+x, b+y, r, 0, 2 * Math.PI);a.fill();}');
      //GM_addStyle("html { background: #041622 !important; } .text-muted { color: #aaa !important; }");
    }

    return a;
  }

  if (window.top != window.self || (window.iWings && window.iWings.enabled)) {
    if (window.iWings && window.iWings.versions)
      window.iWings.versions.push("script-j6dh");
    return;
  }
  if (!window.iWings)
    window.iWings = { enabled: true, versions: ["script-j6dh"] };
  var isFirefox = /Firefox/.test(navigator.userAgent);

  if (isFirefox) {
    var scriptChanged = false;
    window.addEventListener(
      "beforescriptexecute",
      function (e) {
        if (e.target.innerHTML.length > 100000 && !scriptChanged) {
          e.preventDefault();
          e.stopPropagation();
          scriptChanged = true;
          e.target.remove();
          var oriScript = e.target.innerHTML;
          var finalScript = combineScript(oriScript);
          var elem = document.createElement("script");
          elem.innerHTML = finalScript;
          document.body.appendChild(elem);
          document.querySelector("#openModal").remove();
        }
        if (scriptChanged) window.removeEventListener(e.type, true);
      },
      true
    );
  } else {
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", "https://wings.io/", true);
    httpReq.onreadystatechange = function () {
      if (httpReq.readyState == 4 && httpReq.status == 200) {
        var tempDOM = document.createElement("div");
        tempDOM.innerHTML = httpReq.responseText;
        for (var i = 0; i < tempDOM.children.length; i++) {
          if (
            tempDOM.children[i].tagName.toUpperCase() == "SCRIPT" &&
            tempDOM.children[i].innerHTML.length > 100000
          ) {
            var oriScript = tempDOM.children[i].innerHTML;
            var finalScript = combineScript(oriScript);
            tempDOM.children[i].innerHTML = finalScript;
            document.open();
            document.write(tempDOM.innerHTML);
            document.querySelector("#openModal").remove();
            document.close();
            break;
          }
        }
      }
    };
    httpReq.send();
  }
})();
