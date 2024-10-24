// ==UserScript==
// @name        wings.io Patches
// @namespace   http://tampermonkey.net/
// @version     3.2-(24/Oct/2024)
// @description | Dark Mode | Profanity Filter | and more... patches are designed to run on load, make required edits and reload
// @author      ⟐Ragav
// @icon        https://wings.io/images/favicon.png
// @match       https://wings.io/
// @match       https://wings.io/#*
// @run-at      document-start
// @grant       GM_getResourceText
// @require     https://raw.githubusercontent.com/google/diff-match-patch/cd60d246aecf871367313c7cf6dc8814af32c5e3/javascript/diff_match_patch.js#sha256=d422c483b926ca7cea768a03c8f0f26ebc69d5041e3deb550d2709dd40fa16ea
// @resource    wingsio_index_html              https://wings.io#sha256=b47f7772b08ff125efc1293526993b9ad50729f8a1e42fd1d92c2d5e13f526e8
// @resource    wingsio_index_html_archive      https://raw.githubusercontent.com/ragavpr/overrides-wings.io/1a053b9883321a704b64d4aff5a6ee59056d9643/index.html#sha256=b47f7772b08ff125efc1293526993b9ad50729f8a1e42fd1d92c2d5e13f526e8
// @resource    default_profanity_blacklist     https://raw.githubusercontent.com/mogade/badwords/refs/heads/master/en.txt
// @resource    patch_dark_theme                https://raw.githubusercontent.com/ragavpr/overrides-wings.io/64f94d68c8414da4f5a198d5b54e11cc5b89ee23/diff.patch#sha256=35e84754d59ca2256588150fe1a0de3e5bc28eeb8fc6ba2977089addb1f3e322
// @resource    patch_profanity_filter          https://raw.githubusercontent.com/ragavpr/overrides-wings.io/d31bc08e9e58d80f59040dba60cfe7509670b1b4/diff.patch#sha256=69e9f1ef323baeb8aac7568ad9e430469def3319442b1e4f60380bd23dde41e8
// @resource    patch_always_show_nick_input    https://raw.githubusercontent.com/ragavpr/overrides-wings.io/0eecd1bca75895c9b96346afee2c0600a432439e/diff.patch#sha256=e9ace3789b4fd92b32878e7bc2ba382ce9465d9cba0bcff5e7bc07d199553983
// @resource    patch_disable_shake             https://raw.githubusercontent.com/ragavpr/overrides-wings.io/d056e52894b7a5574391d5e1362ad8930112ec02/diff.patch#sha256=e75676367ef61ec6ca486831335c839c23a086b412a3906f7e5c7057a35772d5
// @resource    patch_mark_bots_with_emoji      https://raw.githubusercontent.com/ragavpr/overrides-wings.io/33266812371cd9c631d0c00a4ec1071243c96834/diff.patch#sha256=44df21c987f4d68f46a8a0b076ca91a83119ce600d079c54b00f4d925e71c406
// @resource    patch_mark_bots_with_color      https://raw.githubusercontent.com/ragavpr/overrides-wings.io/13c83c7ea7d81ef34c8b62fa01b339d410f74f02/diff.patch#sha256=5815ad548fee2bf94bced7ebef45e00b170bf00826bd6a43cad50411a7a95d53
// @resource    patch_remove_leaderboard_limit  https://raw.githubusercontent.com/ragavpr/overrides-wings.io/e7d048bcfdd8b4617071b72d304d052c393aac5e/diff.patch#sha256=1543dfd89d2517af4aace201addb57fdd8d2f11559d8295422040f7fb5f32863
// @license     AGPL3
// ==/UserScript==

(function () {
  // EDITABLE REGION

  // Comment to disable patch
  const patches = [
    'dark_theme',
    'profanity_filter',
    // 'always_show_nick_input',
    // 'disable_shake',
    // 'mark_bots_with_emoji',
    // 'mark_bots_with_color',
    // 'remove_leaderboard_limit',
  ];

  const settings = {
    // Game Version - 10/Oct/2024
    wingsio_use_archive: true,
    profanity_filter_character: "✲",
    debug_profanity_filter_show_filtered: false,
  }

  const profanity_regex_blacklist = [

    ...(GM_getResourceText('default_profanity_blacklist').split("\n")),
  ];
  const profanity_regex_whitelist = [

  ];
  // END OF EDITABLE REGION

  const profanity_filter_extension = `
  let profanity_regex_blacklist=\`${profanity_regex_blacklist.toString()}\`.split(',').filter(str => str.length > 0);
  let profanity_regex_whitelist=\`${profanity_regex_whitelist.toString()}\`.split(',').filter(str => str.length > 0);
  const debug_show_filtered_profanity=${settings.debug_profanity_filter_show_filtered};

  profanity_regex_blacklist = profanity_regex_blacklist.map(regex_str => new RegExp(regex_str, 'ig'));
  profanity_regex_whitelist = profanity_regex_whitelist.map(regex_str => new RegExp(regex_str, 'ig'));
  function filter_name(name) {
      for (const regex_block of profanity_regex_blacklist) {
          name = name.replaceAll(new RegExp(regex_block, 'ig'), match=>{
              for(const regex_allow of profanity_regex_whitelist) {
                  if(match.search(regex_allow) > -1) return match;
              }
              return '${settings.profanity_filter_character}'.repeat(match.length) + (debug_show_filtered_profanity ? ' ('+match+')' : '');
          })
      }
      return name;
  };`;

  function getPatchedPage() {
    const dmp = new diff_match_patch();
    dmp.Match_Distance = Infinity;

    let result, str_html = GM_getResourceText(settings.wingsio_use_archive ? "wingsio_index_html_archive" : "wingsio_index_html");

    let list_patches = [];
    for(const patch of patches) list_patches.push(...(dmp.patch_fromText(GM_getResourceText('patch_'+patch))));

    [str_html, result] = dmp.patch_apply(list_patches, str_html);
    if(patches.includes('profanity_filter')) str_html = str_html.replace('(function(w,x,s){', profanity_filter_extension+'(function(w,x,s){');

    console.log(result.every(Boolean) ? 'All patches applied successfully' : 'Failed to apply some patches');

    return str_html;
  }

  var observer = new MutationObserver(mutationRecords => {
    mutationRecords.every( record => {
      if (record.addedNodes[0]) {
        document.write('');
        observer.disconnect();
        document.write(getPatchedPage());
        document.close();
        return false
      }
      return true
    })
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
})();
