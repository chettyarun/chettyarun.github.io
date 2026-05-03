// Outbound link click tracking
document.addEventListener('click', function(e) {
  var a = e.target.closest('a');
  if (a && a.hostname !== location.hostname && window.goatcounter) {
    window.goatcounter.count({
      path: 'click:' + a.href,
      title: a.innerText || a.href,
      event: true
    });
  }
});

// Time on page — fires when tab is hidden or page is unloaded
var _gcStart = Date.now();
var _gcTracked = false;
function _gcTrackTime() {
  if (_gcTracked || !window.goatcounter) return;
  var secs = Math.round((Date.now() - _gcStart) / 1000);
  if (secs > 3) {
    _gcTracked = true;
    window.goatcounter.count({
      path: 'time:' + location.pathname,
      title: String(secs) + 's',
      event: true
    });
  }
}
document.addEventListener('visibilitychange', function() {
  if (document.hidden) _gcTrackTime();
});
window.addEventListener('beforeunload', _gcTrackTime);
