// ==UserScript==
// @name         wings.io Patches
// @namespace    http://tampermonkey.net/
// @version      1-(22/Oct/2024)
// @description  Patches are designed to run on load, tailor changes yourself and reload
// @author       ⟐Ragav
// @icon         https://wings.io/images/favicon.png
// @match        https://wings.io
// @run-at       document-start
// @grant        none
// @license      AGPL3
// ==/UserScript==
  
(function() {
  //EDITABLE REGION

  //Default wings.io Patches
  const default_Gradient = true
  const default_drawClouds = true
  const default_drawWater = true
  const default_drawExplosions = false //High FPS displays are common, shake effects not good on them.
  const default_drawSun = true
  const default_drawItems = true
  const default_drawTrails = true
  // const default_drawSplashes = true //Not boolean skipping

  //Additional Custom Patches
  const filter_names_with_profanity = true
  const mark_bots_with_emoji = false
  const highlight_bots_names = false
  const always_show_nick_input = false

  const max_leaderboard = 10; //-1 to disable limit
  const disable_you_under_leaderboard = false //true if no-limit for leaderboard

  const profanity_filter_character = '✲'
  //Enclose with single quotes only, avoid single quotes in regex, not tested
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
      '[t\\+]w[a@][t\\+][s\\$]?'
  ];
  const profanity_regex_whitelist = [

  //EDITABLE REGION ENDED
  //DO NOT EDIT AFTER THIS REGION

  ];
  const append = `
  let profanity_regex_blacklist=['${profanity_regex_blacklist.join("','")}"'];
  let profanity_regex_whitelist=['${profanity_regex_whitelist.join("','")}"'];

  profanity_regex_blacklist = profanity_regex_blacklist.map(regex_str => new RegExp(regex_str, 'ig'));
  profanity_regex_whitelist = profanity_regex_whitelist.map(regex_str => new RegExp(regex_str, 'ig'));
  function filter_name(name) {
      for (const regex_block of profanity_regex_blacklist) {
          name = name.replaceAll(new RegExp(regex_block, 'ig'), match=>{
              for(const regex_allow of profanity_regex_whitelist) {
                  if(match.search(regex_allow) > -1) return match;
              }
              return '${profanity_filter_character}'.repeat(match.length);
          })
      }
      return name;
  };`

function combineScript(a) {
      //wings.io effects, apply default preference
      if(!default_Gradient) a = a.replace('tb=!0','tb=0')
      if(!default_drawClouds) a = a.replace('ob=!0','ob=0')
      if(!default_drawWater) a = a.replace('Na=!0','Na=0')
      if(!default_drawExplosions) a = a.replace('pb=!0','pb=0')
      if(!default_drawSun) a = a.replace('qb=!0','qb=0')
      if(!default_drawItems) a = a.replace('rb=!0','rb=0')
      if(!default_drawTrails) a = a.replace('Ya=!0','Ya=0')

      //Custom Patches
      if(always_show_nick_input) a = a.replace('s("#nickInput").hide(),', '')

      if(mark_bots_with_emoji || filter_names_with_profanity) {
          a = a.replace('C.setIsBot(p),', '')
          a = a.replace('C.setName(O)','C.setIsBot(p);C.setName(O)');
      }

      if(mark_bots_with_emoji) a = a.replace("this.name=c;","this.name=c;if(this.isBot){this.name+=' 🤖'};");
      if(filter_names_with_profanity) a = append + a.replace('this.name=c;', "this.name=filter_name(c);");

      if(highlight_bots_names) {
          a = a.replace(':"rgba(255,220,0,1.0)"',':r.isBot?"rgba(60,255,0,1.0)":"rgba(255,220,0,1.0)"')
          a = a.replace('a.fillStyle="rgba(255,255,255,1.0)"','a.fillStyle=b.isBot?"rgba(60,255,0,1.0)":a.fillStyle="rgba(255,255,255,1.0)"')
      }

      if(max_leaderboard < 0) a = a.replace('10<m&&(m=10);','')
      else if(max_leaderboard != 10) a = a.replace('10<m&&(m=10);',`${max_leaderboard}<m&&(m=${max_leaderboard});`)

      if(disable_you_under_leaderboard || max_leaderboard < 0) a = a.replace('a.drawImage(r,n,f+5)','')
  return a;
}

if(window.top != window.self || (window.iWings && window.iWings.enabled)) { if(window.iWings && window.iWings.versions) window.iWings.versions.push('script v15'); return; }
if(!window.iWings) window.iWings = { enabled: true, versions: ['script v15'] }; var isFirefox = /Firefox/.test(navigator.userAgent);

if(isFirefox) {
  var scriptChanged = false;
  window.addEventListener('beforescriptexecute', function(e) {
    if(e.target.innerHTML.length > 100000 && !scriptChanged) {
      e.preventDefault();
      e.stopPropagation();
      scriptChanged = true;
      e.target.remove();
      var oriScript = e.target.innerHTML;
      var finalScript = combineScript(oriScript);
      var elem = document.createElement('script');
      elem.innerHTML = finalScript;
      document.body.appendChild(elem);
              document.querySelector("#openModal").remove()
    }
    if(scriptChanged) window.removeEventListener(e.type, true);
  }, true);
}
else {
  var httpReq = new XMLHttpRequest();
  httpReq.open('GET', 'https://wings.io/', true);
  httpReq.onreadystatechange = function() {
    if(httpReq.readyState == 4 && httpReq.status == 200) {
      var tempDOM = document.createElement('div');
      tempDOM.innerHTML = httpReq.responseText;
      for(var i = 0; i < tempDOM.children.length; i++) {
        if(tempDOM.children[i].tagName.toUpperCase() == 'SCRIPT' && tempDOM.children[i].innerHTML.length > 100000) {
          var oriScript = tempDOM.children[i].innerHTML;
          var finalScript = combineScript(oriScript);
          tempDOM.children[i].innerHTML = finalScript;
          document.open();
          document.write(tempDOM.innerHTML);
                      document.querySelector("#openModal").remove()
          document.close();
          break;
        }
      }
    }
  };
  httpReq.send();
}

})();
