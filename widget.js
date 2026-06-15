/**
 * Purple Pulse Widget — Premium editorial embed
 * <script src="https://purple-poll.com/widget.js" data-publisher="SiteName" data-count="3"></script>
 */
(function(){
  var SURL='https://snwvxdbgbvloubyphmtw.supabase.co';
  var SKEY='sb_publishable_oCg4DwrNfjpfapVkbnzKnA_EpGNgSnw';
  var ANON='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud3Z4ZGJnYnZsb3VieXBobXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NjQ3NjQsImV4cCI6MjA5MzM0MDc2NH0.Wi6_jXt6Q3QLC9EOuQB_bsqmAEDLjM3358KEoXFkZXQ';

  var scripts=document.querySelectorAll('script[src*="purple-poll.com/widget"]');
  var script=scripts[scripts.length-1];
  var COUNT=Math.min(parseInt(script.getAttribute('data-count')||'3'),5);
  var DARK=script.getAttribute('data-dark')==='1';
  var PUBLISHER=script.getAttribute('data-publisher')||window.location.hostname||'embedded';
  var TOPIC=script.getAttribute('data-topic')||'';
  var UID='pp'+Math.random().toString(36).slice(2,7);

  // Google Analytics
  if(!document.querySelector('script[src*="G-GGXNH132QJ"]')){
    var gas=document.createElement('script');
    gas.async=true;gas.src='https://www.googletagmanager.com/gtag/js?id=G-GGXNH132QJ';
    document.head.appendChild(gas);
    window.dataLayer=window.dataLayer||[];
    function gtag(){dataLayer.push(arguments);}
    gtag('js',new Date());gtag('config','G-GGXNH132QJ');
  }

  // Design tokens
  var C={
    ink:    DARK?'#f0ece4':'#141210',
    ink2:   DARK?'#c8c0b4':'#3a3530',
    ink3:   DARK?'#8a837a':'#7a736a',
    ink4:   DARK?'#5a5450':'#b0a89e',
    paper:  DARK?'#1a1714':'#f7f4ef',
    surface:DARK?'#242018':'#f0ece4',
    rule:   DARK?'#3a3530':'#d4cdc2',
    yes:    '#1565c0',
    no:     '#c62828',
    purple: '#7b3fa0',
  };

  // Inject styles
  var css=[
    '#'+UID+' .pp-sides,.pp-btns,.pp-nuance{display:flex!important;flex-direction:row!important}','#'+UID+',#'+UID+' *{box-sizing:border-box!important}',
    '#'+UID+'{font-family:Georgia,serif;max-width:560px;background:'+C.paper+';color:'+C.ink+';border-top:3px solid '+C.ink+';border-bottom:1px solid '+C.rule+';position:relative}',

    // Header
    '#'+UID+' .pp-hd{padding:10px 16px 8px;display:flex;align-items:flex-end;justify-content:space-between;border-bottom:1px solid '+C.rule+'}',
    '#'+UID+' .pp-brand{display:flex;align-items:center;gap:8px}',
    '#'+UID+' .pp-logo{font-family:Georgia,serif;font-size:22px;font-weight:900;letter-spacing:-0.02em;color:'+C.ink+';line-height:1}',
    '#'+UID+' .pp-eyebrow{font-family:monospace;font-size:7px;letter-spacing:0.18em;text-transform:uppercase;color:'+C.ink3+';padding-bottom:1px}',
    '#'+UID+' .pp-live{display:flex;align-items:center;gap:5px;font-family:monospace;font-size:7px;letter-spacing:0.12em;text-transform:uppercase;color:'+C.yes+'}',
    '#'+UID+' .pp-dot{width:5px;height:5px;border-radius:50%;background:'+C.yes+';animation:pp-pulse 1.8s ease-in-out infinite}',
    '@keyframes pp-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.8)}}',

    // Question
    '#'+UID+' .pp-q{padding:16px 16px 12px}',
    '#'+UID+' .pp-tag{font-family:monospace;font-size:7px;letter-spacing:0.14em;text-transform:uppercase;color:'+C.ink3+';margin-bottom:6px}',
    '#'+UID+' .pp-hed{font-size:18px;font-weight:900;line-height:1.25;color:'+C.ink+';margin-bottom:0}',

    // Both sides
    '#'+UID+' .pp-sides{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;background:'+C.ink+';cursor:pointer;border-top:1px solid '+C.rule+';width:100%!important}',
    '#'+UID+' .pp-side{flex:1 1 0%!important;padding:10px 12px;min-width:0!important;max-width:50%!important;overflow:hidden}',
    '#'+UID+' .pp-side+.pp-side{border-left:1px solid rgba(255,255,255,0.12)!important}',
    '#'+UID+' .pp-side-lbl{font-family:monospace;font-size:7px;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px}',
    '#'+UID+' .pp-side-txt{font-family:Georgia,serif;font-size:11px;font-style:italic;color:rgba(255,255,255,0.65);line-height:1.45;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}',
    '#'+UID+' .pp-sides-cta{text-align:center;padding:5px;background:'+C.ink+';border-top:1px solid rgba(255,255,255,0.08)}',
    '#'+UID+' .pp-sides-cta span{font-family:monospace;font-size:7px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.3)}',

    // Vote buttons
    '#'+UID+' .pp-btns{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;border-top:1px solid '+C.rule+';border-bottom:1px solid '+C.rule+';width:100%!important}',
    '#'+UID+' .pp-btn{flex:1 1 0%!important;padding:14px 8px;cursor:pointer;background:transparent!important;border:none!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:3px;transition:background 0.15s;min-width:0!important}',
    '#'+UID+' .pp-btn:hover{background:'+C.surface+'}',
    '#'+UID+' .pp-btn+.pp-btn{border-left:1px solid '+C.rule+'!important}',
    '#'+UID+' .pp-btn-word{font-family:Georgia,serif;font-size:22px;font-weight:900;line-height:1}',
    '#'+UID+' .pp-btn-sub{font-family:monospace;font-size:7px;letter-spacing:0.1em;text-transform:uppercase;color:'+C.ink3+'}',
    '#'+UID+' .pp-nuance{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;border-bottom:1px solid '+C.rule+';width:100%!important}',
    '#'+UID+' .pp-nub{flex:1 1 0%!important;padding:7px;cursor:pointer;background:transparent!important;border:none!important;font-family:monospace!important;font-size:7px!important;letter-spacing:0.06em!important;text-transform:uppercase!important;color:'+C.ink3+';transition:background 0.15s;text-align:center!important;min-width:0!important}',
    '#'+UID+' .pp-nub:hover{background:'+C.surface+'}',
    '#'+UID+' .pp-nub+.pp-nub{border-left:1px solid '+C.rule+'!important}',

    // Result
    '#'+UID+' .pp-res{padding:14px 16px;display:none}',
    '#'+UID+' .pp-res.show{display:block}',
    '#'+UID+' .pp-res-hed{font-family:monospace;font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:'+C.ink3+';margin-bottom:10px}',
    '#'+UID+' .pp-res-nums{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}',
    '#'+UID+' .pp-res-big{font-size:32px;font-weight:900;line-height:1}',
    '#'+UID+' .pp-res-lbl{font-family:monospace;font-size:8px;letter-spacing:0.08em;text-transform:uppercase;color:'+C.ink3+'}',
    '#'+UID+' .pp-bar{height:8px;display:flex;border-radius:0;overflow:hidden;margin-bottom:8px}',
    '#'+UID+' .pp-insight{font-family:Georgia,serif;font-size:12px;font-style:italic;color:'+C.ink3+';line-height:1.5;margin-bottom:10px}',
    '#'+UID+' .pp-boost{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid '+C.rule+';cursor:pointer;transition:border-color 0.2s,background 0.2s;margin-bottom:0}',
    '#'+UID+' .pp-boost:hover{border-color:'+C.yes+';background:'+C.surface+'}',
    '#'+UID+' .pp-boost.active{border-color:'+C.yes+';background:'+C.surface+'}',
    '#'+UID+' .pp-boost-arrow{font-size:20px;font-weight:900;color:'+C.ink3+';line-height:1;transition:color 0.2s}',
    '#'+UID+' .pp-boost.active .pp-boost-arrow{color:'+C.yes+'}',
    '#'+UID+' .pp-boost-text{flex:1}',
    '#'+UID+' .pp-boost-title{font-family:monospace;font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:'+C.ink+';margin-bottom:2px}',
    '#'+UID+' .pp-boost-sub{font-family:Georgia,serif;font-size:11px;font-style:italic;color:'+C.ink3+'}',
    '#'+UID+' .pp-boost-count{font-family:monospace;font-size:11px;font-weight:700;color:'+C.ink3+'}',

    // Footer
    '#'+UID+' .pp-ft{padding:8px 16px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid '+C.rule+'}',
    '#'+UID+' .pp-ft-left{font-family:monospace;font-size:7px;letter-spacing:0.08em;color:'+C.ink4+'}',
    '#'+UID+' .pp-ft-link{font-family:monospace;font-size:7px;letter-spacing:0.1em;text-transform:uppercase;color:'+C.ink+';text-decoration:none;border-bottom:1px solid '+C.ink+';padding-bottom:1px}',

    // Dots nav
    '#'+UID+' .pp-dots{display:flex;align-items:center;justify-content:center;gap:6px;padding:8px;border-top:1px solid '+C.rule+'}',
    '#'+UID+' .pp-dot-btn{width:6px;height:6px;border-radius:50%;background:'+C.rule+';border:none;cursor:pointer;padding:0;transition:background 0.2s}',
    '#'+UID+' .pp-dot-btn.on{background:'+C.ink+'}',

    // Loading / error
    '#'+UID+' .pp-load{padding:24px 16px;text-align:center;font-family:monospace;font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:'+C.ink3+'}',
  ].join('');

  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  // Mount
  var wrap=document.createElement('div');wrap.id=UID;
  wrap.innerHTML='<div class="pp-load">Loading Purple Pulse...</div>';
  script.parentNode.insertBefore(wrap,script.nextSibling);

  var questions=[],curQ=0,voted={},boosted={};
  try{voted=JSON.parse(localStorage.getItem('ppv_'+PUBLISHER.replace(/^www\./,''))||'{}');}catch(e){}
  try{boosted=JSON.parse(localStorage.getItem('ppb_'+PUBLISHER.replace(/^www\./,''))||'{}');}catch(e){}

  function tv(t){return(t.votes_yes||0)+(t.votes_no||0)+(t.votes_conditional||0)+(t.votes_unsure||0);}

  function esc(s){
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function yClr(t){return t.yes_alignment==='right'?C.no:C.yes;}
  function nClr(t){return t.yes_alignment==='right'?C.yes:C.no;}

  function render(){
    var t=questions[curQ];
    if(!t){
      wrap.innerHTML='<div class="pp-load">No questions available. <a href="https://purple-poll.com" target="_blank" style="color:'+C.yes+'">Visit Purple</a></div>';
      return;
    }
    var tot=tv(t);
    var yesPct=tot>0?Math.round(((t.votes_yes||0)/tot)*100):50;
    var noPct=100-yesPct;
    var gap=Math.abs(yesPct-50);
    var hasVoted=voted[t.id];
    var hasBoosted=boosted[t.id];
    var tag=(t.tags&&t.tags[0])||'Politics';

    var insight='';
    if(tot>2){
      if(gap<=5)insight='America is nearly split on this one.';
      else if(yesPct>75)insight='Strong consensus — most say Yes.';
      else if(noPct>75)insight='Strong consensus — most say No.';
      else insight=(yesPct>noPct?yesPct+'% say Yes':'noPct+'% say No')+' on Purple.';
    }

    // Dots
    var dots='';
    if(questions.length>1){
      dots='<div class="pp-dots">';
      for(var di=0;di<questions.length;di++){
        dots+='<button class="pp-dot-btn'+(di===curQ?' on':'')+'" onclick="window.ppq'+UID+'('+di+')"></button>';
      }
      dots+='</div>';
    }

    wrap.innerHTML=
      // Header
      '<div class="pp-hd">'+
        '<div class="pp-brand">'+
          '<div class="pp-logo">Purple</div>'+
          '<div class="pp-eyebrow">Live Poll</div>'+
        '</div>'+
        '<div class="pp-live"><span class="pp-dot"></span>'+tot+' votes</div>'+
      '</div>'+

      // Question
      '<div class="pp-q">'+
        '<div class="pp-tag">'+esc(tag)+(t.is_hot?' &middot; Hot':'')+'</div>'+
        '<div class="pp-hed">'+esc(t.question)+'</div>'+
      '</div>'+

      // Both sides (expand inline on tap)
      '<div class="pp-sides" onclick="window.ppx'+UID+'()">'+
        '<div class="pp-side">'+
          '<div class="pp-side-lbl" style="color:'+yClr(t)+'">Left argues</div>'+
          '<div class="pp-side-txt" id="'+UID+'l">'+(t._left?esc(t._left):'Tap to read both arguments')+'</div>'+
        '</div>'+
        '<div class="pp-side">'+
          '<div class="pp-side-lbl" style="color:'+nClr(t)+'">Right argues</div>'+
          '<div class="pp-side-txt" id="'+UID+'r">'+(t._right?esc(t._right):'Tap to expand')+'</div>'+
        '</div>'+
      '</div>'+
      '<div class="pp-sides-cta"><span>Read both sides before you vote</span></div>'+

      // Vote buttons (hidden if voted)
      (!hasVoted?
        '<div class="pp-btns">'+
          '<button class="pp-btn" onclick="window.ppv'+UID+'(\''+t.id+'\',\'yes\')">'+
            '<span class="pp-btn-word" style="color:'+yClr(t)+'">Yes</span>'+
            '<span class="pp-btn-sub">I agree</span>'+
          '</button>'+
          '<button class="pp-btn" onclick="window.ppv'+UID+'(\''+t.id+'\',\'no\')">'+
            '<span class="pp-btn-word" style="color:'+nClr(t)+'">No</span>'+
            '<span class="pp-btn-sub">I disagree</span>'+
          '</button>'+
        '</div>'+
        '<div class="pp-nuance">'+
          '<button class="pp-nub" onclick="window.ppv'+UID+'(\''+t.id+'\',\'conditional\')">~ Yes, with conditions</button>'+
          '<button class="pp-nub" onclick="window.ppv'+UID+'(\''+t.id+'\',\'unsure\')">? Not sure yet</button>'+
        '</div>'
      :'')+

      // Result
      '<div class="pp-res'+(hasVoted?' show':'')+'" id="'+UID+'res">'+
        '<div class="pp-res-hed">'+
          (hasVoted?'You voted <strong style="color:'+(hasVoted==='yes'?yClr(t):nClr(t))+'">'+hasVoted+'</strong> &mdash; here\'s where America stands':'Results')+
        '</div>'+
        '<div class="pp-res-nums">'+
          '<div><div class="pp-res-big" style="color:'+yClr(t)+'">'+yesPct+'%</div><div class="pp-res-lbl">Yes</div></div>'+
          '<div style="text-align:right"><div class="pp-res-big" style="color:'+nClr(t)+'">'+noPct+'%</div><div class="pp-res-lbl">No</div></div>'+
        '</div>'+
        '<div class="pp-bar">'+
          '<div style="width:'+yesPct+'%;background:'+yClr(t)+'"></div>'+
          '<div style="width:'+noPct+'%;background:'+nClr(t)+'"></div>'+
        '</div>'+
        (insight?'<div class="pp-insight">'+insight+'</div>':'')+

        // Boost
        '<div class="pp-boost'+(hasBoosted?' active':'')+'" onclick="window.ppb'+UID+'(\''+t.id+'\')">'+
          '<div class="pp-boost-arrow">&#9650;</div>'+
          '<div class="pp-boost-text">'+
            '<div class="pp-boost-title">'+(hasBoosted?'You boosted this':'Send this to more Americans')+'</div>'+
            '<div class="pp-boost-sub">'+(hasBoosted?'Others will see it more often':'Push this question to more voters')+'</div>'+
          '</div>'+
          '<div class="pp-boost-count">'+(t.boosts>0?t.boosts:'')+'</div>'+
        '</div>'+
      '</div>'+

      // Footer
      '<div class="pp-ft">'+
        '<span class="pp-ft-left">Purple Pulse &middot; '+questions.length+' question'+(questions.length!==1?'s':'')+'</span>'+
        '<a class="pp-ft-link" href="https://purple-poll.com?ref='+encodeURIComponent(PUBLISHER)+'" target="_blank">More on Purple</a>'+
      '</div>'+
      dots;

    // Load party positions
    loadSides(t);
  }

  function loadSides(t){
    if(t._sidesLoaded)return;
    t._sidesLoaded=true;
    fetch(SURL+'/functions/v1/party-positions',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+ANON},
      body:JSON.stringify({question:t.question,topic_id:t.id})
    }).then(function(r){return r.json();}).then(function(d){
      if(d.positions){
        t._left=d.positions.left||'';
        t._right=d.positions.right||'';
        if(d.positions.yes_alignment)t.yes_alignment=d.positions.yes_alignment;
        var lEl=document.getElementById(UID+'l');
        var rEl=document.getElementById(UID+'r');
        if(lEl&&t._left)lEl.textContent=t._left.split('.')[0]+'.';
        if(rEl&&t._right)rEl.textContent=t._right.split('.')[0]+'.';
      }
    }).catch(function(){});
  }

  // Expand both sides inline
  window['ppx'+UID]=function(){
    var t=questions[curQ];if(!t)return;
    var lEl=document.getElementById(UID+'l');
    var rEl=document.getElementById(UID+'r');
    if(!lEl||!rEl)return;
    var isExp=lEl.style.webkitLineClamp==='unset';
    if(isExp){
      lEl.style.webkitLineClamp='2';rEl.style.webkitLineClamp='2';
    } else {
      lEl.style.webkitLineClamp='unset';rEl.style.webkitLineClamp='unset';
      if(!t._sidesLoaded)loadSides(t);
      if(t._left)lEl.textContent=t._left;
      if(t._right)rEl.textContent=t._right;
    }
  };

  // Vote
  window['ppv'+UID]=function(topicId,option){
    if(voted[topicId])return;
    voted[topicId]=option;
    try{localStorage.setItem('ppv_'+PUBLISHER.replace(/^www\./,''),JSON.stringify(voted));}catch(e){}
    var t=questions.find(function(x){return x.id===topicId;});
    if(t)t['votes_'+option]=(t['votes_'+option]||0)+1;
    render();
    fetch(SURL+'/rest/v1/widget_votes',{
      method:'POST',
      headers:{'apikey':SKEY,'Authorization':'Bearer '+ANON,'Content-Type':'application/json','Prefer':'return=minimal'},
      body:JSON.stringify({topic_id:topicId,vote_option:option,publisher:PUBLISHER,referrer:document.referrer,voted_at:new Date().toISOString()})
    }).catch(function(){});
    if(curQ<questions.length-1)setTimeout(function(){curQ++;render();},2800);
  };

  // Boost
  window['ppb'+UID]=function(topicId){
    if(boosted[topicId])return;
    boosted[topicId]=true;
    try{localStorage.setItem('ppb_'+PUBLISHER.replace(/^www\./,''),JSON.stringify(boosted));}catch(e){}
    var t=questions.find(function(x){return x.id===topicId;});
    if(t)t.boosts=(t.boosts||0)+1;
    render();
    fetch(SURL+'/rest/v1/topics?id=eq.'+topicId,{
      method:'PATCH',
      headers:{'apikey':SKEY,'Authorization':'Bearer '+ANON,'Content-Type':'application/json','Prefer':'return=minimal'},
      body:JSON.stringify({boosts:(t&&t.boosts)||1})
    }).catch(function(){});
  };

  // Navigate dots
  window['ppq'+UID]=function(idx){curQ=idx;render();};

  // Load questions
  var q=SURL+'/rest/v1/topics?select=*&status=eq.live&order=created_at.desc&limit=30';
  if(TOPIC)q+='&tags=cs.{'+encodeURIComponent(TOPIC)+'}';

  fetch(q,{headers:{'apikey':SKEY,'Authorization':'Bearer '+ANON}})
    .then(function(r){return r.json();})
    .then(function(topics){
      if(!Array.isArray(topics)||!topics.length){
        wrap.innerHTML='<div class="pp-load"><a href="https://purple-poll.com" target="_blank" style="color:'+C.yes+'">Visit Purple &#8594;</a></div>';
        return;
      }
      var unvoted=topics.filter(function(t){return !voted[t.id];});
      var scored=unvoted.map(function(t){
        var tot=tv(t)||1,yesPct=Math.round(((t.votes_yes||0)/tot)*100),gap=Math.abs(yesPct-50);
        return Object.assign({},t,{_score:(100-gap)*Math.min(1,tot/15)+(t.boosts||0)*3});
      }).sort(function(a,b){return b._score-a._score;});
      questions=scored.slice(0,COUNT);
      if(!questions.length){
        wrap.innerHTML='<div class="pp-load">You\'ve voted on all questions! <a href="https://purple-poll.com" target="_blank" style="color:'+C.yes+'">See results &#8594;</a></div>';
        return;
      }
      render();
    })
    .catch(function(){
      wrap.innerHTML='<div class="pp-load">Purple Pulse unavailable. <a href="https://purple-poll.com" target="_blank" style="color:'+C.yes+'">Visit purple-poll.com &#8594;</a></div>';
    });
})();
