/**
 * Purple Pulse Widget — inline embed, no iframe
 * <script src="https://purple-poll.com/widget.js" data-count="3"></script>
 */
(function(){
  var SURL='https://snwvxdbgbvloubyphmtw.supabase.co';
  var SKEY='sb_publishable_oCg4DwrNfjpfapVkbnzKnA_EpGNgSnw';
  var ANON='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud3Z4ZGJnYnZsb3VieXBobXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NjQ3NjQsImV4cCI6MjA5MzM0MDc2NH0.Wi6_jXt6Q3QLC9EOuQB_bsqmAEDLjM3358KEoXFkZXQ';

  var scripts=document.querySelectorAll('script[src*="purple-poll.com/widget"]');
  var script=scripts[scripts.length-1];
  var TOPIC=script.getAttribute('data-topic')||'';
  var COUNT=Math.min(parseInt(script.getAttribute('data-count')||'3'),5);
  var DARK=script.getAttribute('data-dark')==='1';
  var PUBLISHER=script.getAttribute('data-publisher')||window.location.hostname||'embedded';
  var UID='pp-'+Math.random().toString(36).slice(2,8);

  // Inject styles
  var style=document.createElement('style');
  style.textContent=[
    '#'+UID+',#'+UID+' *{box-sizing:border-box!important}','#'+UID+'{font-family:Georgia,serif;max-width:520px;background:'+(DARK?'#1a1714':'#f7f4ef')+';color:'+(DARK?'#f0ece4':'#141210')+';border:2px solid '+(DARK?'#f0ece4':'#141210')+';margin:16px 0}',
    '#'+UID+' .pp-head{padding:10px 14px;border-bottom:1px solid '+(DARK?'#3a3530':'#d4cdc2')+';display:flex;align-items:center;justify-content:space-between}',
    '#'+UID+' .pp-logo{font-family:serif;font-size:18px;font-weight:900}',
    '#'+UID+' .pp-live{font-family:monospace;font-size:7px;letter-spacing:.1em;text-transform:uppercase;color:#1565c0;display:flex;align-items:center;gap:4px}',
    '#'+UID+' .pp-dot{width:5px;height:5px;border-radius:50%;background:#1565c0;animation:pp-pulse 1.5s infinite}',
    '@keyframes pp-pulse{0%,100%{opacity:1}50%{opacity:.3}}',
    '#'+UID+' .pp-q{padding:14px 16px;font-size:17px;font-weight:900;line-height:1.3;border-bottom:1px solid '+(DARK?'#3a3530':'#d4cdc2')+'}',
    '#'+UID+' .pp-tag{font-family:monospace;font-size:7px;letter-spacing:.1em;text-transform:uppercase;color:'+(DARK?'#8a837a':'#7a736a')+';margin-bottom:8px}',
    '#'+UID+' .pp-sides{display:flex!important;flex-direction:row!important;background:'+(DARK?'#252118':'#141210')+';cursor:pointer;width:100%!important;box-sizing:border-box!important}',
    '#'+UID+' .pp-side{padding:8px 10px!important;flex:1!important;min-width:0!important;box-sizing:border-box!important}',
    '#'+UID+' .pp-side-div{width:1px;background:rgba(255,255,255,.15)}',
    '#'+UID+' .pp-side-lbl{font-family:monospace;font-size:7px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}',
    '#'+UID+' .pp-side-txt{font-family:Georgia,serif;font-size:11px;font-style:italic;color:rgba(255,255,255,.7);line-height:1.35}',
    '#'+UID+' .pp-btns{display:flex!important;flex-direction:row!important;width:100%!important;border-bottom:1px solid '+(DARK?'#3a3530':'#d4cdc2')+'}',
    '#'+UID+' .pp-btn{padding:16px;cursor:pointer;background:transparent;border:none;display:flex;flex-direction:column;align-items:center;gap:4px;transition:background .15s;width:100%}',
    '#'+UID+' .pp-btn:hover{background:'+(DARK?'#252118':'#eeeae3')+'}',
    '#'+UID+' .pp-btn-lbl{font-size:26px;font-weight:900;font-family:Georgia,serif}',
    '#'+UID+' .pp-btn-sub{font-family:monospace;font-size:7px;letter-spacing:.1em;text-transform:uppercase;color:'+(DARK?'#8a837a':'#7a736a')+'}',
    '#'+UID+' .pp-div{background:'+(DARK?'#3a3530':'#d4cdc2')+'}',
    '#'+UID+' .pp-nuance{display:flex!important;flex-direction:row!important;width:100%!important;border-bottom:1px solid '+(DARK?'#3a3530':'#d4cdc2')+'}',
    '#'+UID+' .pp-nuance-btn{padding:8px;cursor:pointer;background:transparent!important;border:none!important;font-family:monospace!important;font-size:7px!important;letter-spacing:.06em!important;text-transform:uppercase!important;color:'+(DARK?'#8a837a':'#7a736a')+';flex:1!important;transition:background .15s}',
    '#'+UID+' .pp-nuance-btn:hover{background:'+(DARK?'#252118':'#eeeae3')+'}',
    '#'+UID+' .pp-result{padding:14px 16px;display:none}',
    '#'+UID+' .pp-result.show{display:block}',
    '#'+UID+' .pp-result-hed{font-size:14px;font-weight:700;margin-bottom:8px}',
    '#'+UID+' .pp-bar{height:10px;display:flex;border-radius:3px;overflow:hidden;margin:6px 0}',
    '#'+UID+' .pp-stats{display:flex;justify-content:space-between;font-family:monospace;font-size:9px;margin-bottom:8px}',
    '#'+UID+' .pp-reason{border-left:3px solid #7b3fa0;padding:8px 10px;background:'+(DARK?'#252118':'#eeeae3')+';font-size:12px;font-style:italic;line-height:1.5}',
    '#'+UID+' .pp-footer{padding:8px 14px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid '+(DARK?'#3a3530':'#d4cdc2')+'}',
    '#'+UID+' .pp-count{font-family:monospace;font-size:8px;color:'+(DARK?'#8a837a':'#7a736a')+'}',
    '#'+UID+' .pp-cta{font-family:monospace;font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:'+(DARK?'#f0ece4':'#141210')+';text-decoration:none;border:1px solid '+(DARK?'#f0ece4':'#141210')+';padding:4px 10px}',
    '#'+UID+' .pp-dots{display:flex;align-items:center;justify-content:center;gap:8px;padding:8px;border-top:1px solid '+(DARK?'#3a3530':'#d4cdc2')+'}',
    '#'+UID+' .pp-dot2{width:6px;height:6px;border-radius:50%;background:'+(DARK?'#3a3530':'#d4cdc2')+';cursor:pointer;transition:background .2s}',
    '#'+UID+' .pp-dot2.active{background:'+(DARK?'#f0ece4':'#141210')+'}'
  ].join('');
  document.head.appendChild(style);

  // Create container
  var wrap=document.createElement('div');
  wrap.id=UID;
  wrap.innerHTML='<div style="padding:20px;text-align:center;font-family:monospace;font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:'+(DARK?'#8a837a':'#7a736a')+'">Loading Purple Pulse...</div>';
  script.parentNode.insertBefore(wrap,script.nextSibling);

  var questions=[];
  var curQ=0;
  var voted={};
  try{voted=JSON.parse(localStorage.getItem('pw_'+PUBLISHER)||'{}');}catch(e){}

  function tv(t){return(t.votes_yes||0)+(t.votes_no||0)+(t.votes_conditional||0)+(t.votes_unsure||0);}
  function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  function render(){
    var t=questions[curQ];
    if(!t){wrap.innerHTML='<div style="padding:16px;text-align:center;font-family:monospace;font-size:9px;color:'+(DARK?'#8a837a':'#7a736a')+'">No questions available. <a href="https://purple-poll.com" style="color:#1565c0">Visit Purple →</a></div>';return;}
    var tot=tv(t);
    var yesPct=tot>0?Math.round(((t.votes_yes||0)/tot)*100):50;
    var noPct=100-yesPct;
    var isFlipped=t.yes_alignment==='right';
    var yesClr=isFlipped?'#c62828':'#1565c0';
    var noClr=isFlipped?'#1565c0':'#c62828';
    var hasVoted=voted[t.id];
    var tag=(t.tags||['General'])[0];

    var dots=questions.length>1?'<div class="pp-dots">'+questions.map(function(_,i){return'<div class="pp-dot2'+(i===curQ?' active':'')+'" onclick="window[\'ppQ_'+UID+'\']('+i+')"></div>';}).join('')+'</div>':'';

    wrap.innerHTML=
      '<div class="pp-head">'+
        '<div class="pp-logo">Purple</div>'+
        '<div class="pp-live"><span class="pp-dot"></span>Live Poll</div>'+
      '</div>'+
      '<div class="pp-q">'+
        '<div class="pp-tag">'+esc(tag)+(t.is_hot?' · 🔥':'')+' · '+tot+' votes</div>'+
        esc(t.question)+
      '</div>'+
      '<div class="pp-sides" onclick="window.open(\'https://purple-poll.com?q='+t.id+'&ref='+encodeURIComponent(PUBLISHER)+'\',\'_blank\')">'+
        '<div class="pp-side">'+
          '<div class="pp-side-lbl" style="color:'+yesClr+'">← Left argues</div>'+
          '<div class="pp-side-txt" id="'+UID+'-l-'+t.id+'">Tap to read both sides on Purple →</div>'+
        '</div>'+
        '<div class="pp-side-div"></div>'+
        '<div class="pp-side">'+
          '<div class="pp-side-lbl" style="color:'+noClr+'">Right argues →</div>'+
          '<div class="pp-side-txt" id="'+UID+'-r-'+t.id+'">Read before you vote</div>'+
        '</div>'+
      '</div>'+
      (!hasVoted?
        '<div class="pp-btns">'+
          '<button class="pp-btn" onclick="window[\'ppV_'+UID+'\'](\''+t.id+'\',\'yes\')">'+
            '<span class="pp-btn-lbl" style="color:'+yesClr+'">Yes</span>'+
            '<span class="pp-btn-sub">I agree</span>'+
          '</button>'+
          '<div class="pp-div"></div>'+
          '<button class="pp-btn" onclick="window[\'ppV_'+UID+'\'](\''+t.id+'\',\'no\')">'+
            '<span class="pp-btn-lbl" style="color:'+noClr+'">No</span>'+
            '<span class="pp-btn-sub">I disagree</span>'+
          '</button>'+
        '</div>'+
        '<div class="pp-nuance">'+
          '<button class="pp-nuance-btn" onclick="window[\'ppV_'+UID+'\'](\''+t.id+'\',\'conditional\')">~ Yes, but with conditions</button>'+
          '<button class="pp-nuance-btn" onclick="window[\'ppV_'+UID+'\'](\''+t.id+'\',\'unsure\')">? Not sure yet</button>'+
        '</div>'
      :'')+
      '<div class="pp-result'+(hasVoted?' show':'')+'" id="'+UID+'-res-'+t.id+'">'+
        '<div class="pp-result-hed">'+
          (hasVoted?'You voted <strong style="color:'+(hasVoted==='yes'?yesClr:noClr)+'">'+hasVoted+'</strong> — here\'s where America stands:':'Results')+
        '</div>'+
        '<div class="pp-bar">'+
          '<div style="width:'+yesPct+'%;background:'+yesClr+'"></div>'+
          '<div style="width:'+noPct+'%;background:'+noClr+'"></div>'+
        '</div>'+
        '<div class="pp-stats">'+
          '<span style="color:'+yesClr+'">Yes '+yesPct+'%</span>'+
          '<span>'+tot+' votes</span>'+
          '<span style="color:'+noClr+'">No '+noPct+'%</span>'+
        '</div>'+
      '</div>'+
      '<div class="pp-footer">'+
        '<span class="pp-count">Purple Pulse · '+questions.length+' question'+(questions.length!==1?'s':'')+'</span>'+
        '<a class="pp-cta" href="https://purple-poll.com?ref='+encodeURIComponent(PUBLISHER)+'" target="_blank">More on Purple →</a>'+
      '</div>'+
      dots;

    // Load party positions async
    loadSides(t);
  }

  function loadSides(t){
    if(t._sl)return;t._sl=true;
    fetch(SURL+'/functions/v1/party-positions',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+SKEY},
      body:JSON.stringify({question:t.question,topic_id:t.id})
    }).then(function(r){return r.json();}).then(function(d){
      if(d.positions){
        var l=document.getElementById(UID+'-l-'+t.id);
        var r=document.getElementById(UID+'-r-'+t.id);
        if(l&&d.positions.left)l.textContent=d.positions.left.split('.')[0]+'.';
        if(r&&d.positions.right)r.textContent=d.positions.right.split('.')[0]+'.';
      }
    }).catch(function(){});
  }

  window['ppV_'+UID]=function(topicId,option){
    if(voted[topicId])return;
    voted[topicId]=option;
    try{localStorage.setItem('pw_'+PUBLISHER,JSON.stringify(voted));}catch(e){}
    var t=questions.find(function(x){return x.id===topicId;});
    if(t)t['votes_'+option]=(t['votes_'+option]||0)+1;
    render();
    // Save to Supabase
    fetch(SURL+'/rest/v1/widget_votes',{
      method:'POST',
      headers:{'apikey':SKEY,'Authorization':'Bearer '+ANON,'Content-Type':'application/json','Prefer':'return=minimal'},
      body:JSON.stringify({topic_id:topicId,vote_option:option,publisher:PUBLISHER,referrer:document.referrer,voted_at:new Date().toISOString()})
    }).catch(function(){});
    // Also update topic vote count
    fetch(SURL+'/rest/v1/topics?id=eq.'+topicId,{
      method:'PATCH',
      headers:{'apikey':SKEY,'Authorization':'Bearer '+ANON,'Content-Type':'application/json','Prefer':'return=minimal'},
      body:JSON.stringify(function(){var o={};o['votes_'+option]=(t?tv(t):1);return o;}())
    }).catch(function(){});
    // Auto-advance
    if(curQ<questions.length-1)setTimeout(function(){curQ++;render();},2500);
  };

  window['ppQ_'+UID]=function(idx){curQ=idx;render();};

  // Load questions
  var query=SURL+'/rest/v1/topics?select=*&status=eq.live&order=created_at.desc&limit=30';
  if(TOPIC)query+='&tags=cs.{'+encodeURIComponent(TOPIC)+'}';
  fetch(query,{headers:{'apikey':SKEY,'Authorization':'Bearer '+ANON}})
    .then(function(r){return r.json();})
    .then(function(topics){
      if(!Array.isArray(topics)||!topics.length){
        wrap.innerHTML='<div style="padding:16px;text-align:center"><a href="https://purple-poll.com" style="font-family:monospace;font-size:9px;color:#1565c0">Visit Purple →</a></div>';
        return;
      }
      // Sort by divisiveness
      var scored=topics.filter(function(t){return !voted[t.id];}).map(function(t){
        var tot=tv(t)||1,yesPct=Math.round(((t.votes_yes||0)/tot)*100),gap=Math.abs(yesPct-50);
        return Object.assign({},t,{_score:(100-gap)*Math.min(1,tot/15)});
      }).sort(function(a,b){return b._score-a._score;});
      // Fallback to unvoted if not enough divisive
      if(scored.length<COUNT){
        var extra=topics.filter(function(t){return!voted[t.id]&&!scored.find(function(s){return s.id===t.id;});});
        scored=scored.concat(extra);
      }
      questions=scored.slice(0,COUNT);
      if(!questions.length){
        wrap.innerHTML='<div style="padding:16px;text-align:center;font-family:monospace;font-size:9px;color:#7a736a">You\'ve voted on all current questions! <a href="https://purple-poll.com" style="color:#1565c0">See results →</a></div>';
        return;
      }
      render();
    })
    .catch(function(e){
      wrap.innerHTML='<div style="padding:16px;text-align:center;font-family:monospace;font-size:9px;color:#7a736a">Purple Pulse unavailable. <a href="https://purple-poll.com" style="color:#1565c0">Visit purple-poll.com →</a></div>';
    });

  // Expose API
  window.PurplePulse=window.PurplePulse||{};
  window.PurplePulse[PUBLISHER]={refresh:function(){curQ=0;render();}};
})();
