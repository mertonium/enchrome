var candidate_search = function(possibles, callback) {
  var url = 'http://electnext.com/api/v1/candidate_search.js?possibles[]=' + possibles.join('&possibles[]=');
  var request = new XMLHttpRequest();

  request.open('GET', url, true);
  console.log(url);
  request.onreadystatechange = function(ev) {
    var candidates;
    if (request.readyState == 4) {
      if (request.status == 200) {
        console.log(request.responseText);
        candidates = JSON.parse(request.responseText);
        callback(candidates);
      } else {
        callback(null);
      }
    }
  };
  request.send(null);
};

var display_results = function(candidates) {
  var i = 0, results, return_html = '';
  results = document.getElementById("results");
  results.innerHTML = '';
  if(candidates) {
    return_html = '<ul class="enchrome-result-list">';
    for(; i < candidates.length; i+=1) {
      return_html += '<li class="group"><strong class="left">'+candidates[i].name+'</strong> <span class="right">'+(candidates[i].title || '')+'</span></li>';
    }
    return_html += '</ul>';
  } else {
    return_html = '<p>Couldn\'t find politicians...</p>';
  }
  results.innerHTML = return_html;
};


function scan() {
  var possibles = chrome.extension.getBackgroundPage().selected_possibles;
  if (possibles) candidate_search(possibles, display_results);
}
window.onload = scan;