/**
 * Purple Pulse Widget
 * One line to embed: <script src="https://purple-poll.com/widget.js"></script>
 * 
 * Options (data attributes):
 *   data-topic="Economy"     — filter by topic tag (optional)
 *   data-count="3"           — number of questions to show (1-5, default 3)
 *   data-dark="1"            — dark mode
 *   data-width="400"         — max width in px (default 480)
 *   data-height="500"        — max height in px (default auto)
 *   data-publisher="NYT"     — publisher name for analytics
 */
(function(){
  // Find the script tag to read data attributes
  var scripts = document.querySelectorAll('script[src*="purple-poll.com/widget"]');
  var script = scripts[scripts.length - 1];

  var topic     = script.getAttribute('data-topic')     || '';
  var count     = script.getAttribute('data-count')     || '3';
  var dark      = script.getAttribute('data-dark')      || '0';
  var width     = script.getAttribute('data-width')     || '480';
  var height    = script.getAttribute('data-height')    || '';
  var publisher = script.getAttribute('data-publisher') || window.location.hostname || 'embedded';
  var align     = script.getAttribute('data-align')     || 'center'; // left, center, right

  // Build iframe src
  var src = 'https://purple-poll.com/widget.html'
    + '?topic='     + encodeURIComponent(topic)
    + '&count='     + encodeURIComponent(count)
    + '&dark='      + encodeURIComponent(dark)
    + '&publisher=' + encodeURIComponent(publisher);

  // Create container
  var container = document.createElement('div');
  container.style.cssText = [
    'max-width:' + width + 'px',
    'margin:' + (align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : '0'),
    'width:100%',
    'font-family:Georgia,serif'
  ].join(';');

  // Create iframe
  var iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.style.cssText = [
    'width:100%',
    'border:none',
    'display:block',
    height ? 'height:' + height + 'px' : 'height:620px',
    'overflow:hidden'
  ].join(';');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('title', 'Purple Poll - Live civic polling');
  iframe.setAttribute('loading', 'lazy');

  // Auto-resize iframe based on content
  window.addEventListener('message', function(e){
    if(e.data && e.data.type === 'purple-resize' && e.data.height){
      var newH = Math.max(400, e.data.height + 20);
      iframe.style.height = newH + 'px';
    }
    if(e.data && e.data.type === 'purple-voted'){
      // Publisher can hook into this event
      var event = new CustomEvent('purpleVoted', {
        detail: {topicId: e.data.topicId, option: e.data.option, publisher: publisher}
      });
      document.dispatchEvent(event);
    }
  });

  container.appendChild(iframe);

  // Insert after the script tag
  script.parentNode.insertBefore(container, script.nextSibling);

  // Expose Purple widget API
  window.PurplePulse = {
    refresh: function(){ iframe.src = iframe.src; },
    setTopic: function(t){ iframe.src = src.replace(/topic=[^&]*/, 'topic=' + encodeURIComponent(t)); },
    onVote: function(cb){ document.addEventListener('purpleVoted', function(e){ cb(e.detail); }); }
  };
})();
