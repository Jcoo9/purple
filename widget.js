/**
 * Purple Pulse Widget
 * <script src="https://purple-poll.com/widget.js" data-publisher="SiteName" data-count="3"></script>
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
  var UID='pp'+Math.random().toString(36).slice(2,7);

  // Inject styles
  var css=[
    '#'+UID+',#'+UID+' *{box-sizing:border-box!important}',
    '#'+UID+'{font-family:Georgia,serif;max-width:520px;background:'+(DARK?'#1a1714':'#f7f4ef')+';color:'+(DARK?'#f0ece4':'#141210')+';border:2px solid '+(DARK?'#f0ece4':'#141210')+';margin:16px 0}',
    '#'+UID+' .ph{padding:10px 14px;border-bottom:1px solid '+(DARK?'#3a3530':'#d4cdc2')+';display:flex;align-items:center;justify-content:space-between}',
    '#'+UID+' .pl{font-family:serif;font-size:18px;font-weight:900}',
    '#'+UID+' .pv{font-family:monospace;font-size:7px;letter-spacing:.1em;text-transform:uppercase;color:#1565c0;display:flex;align-items:center;gap:4px}',
    '#'+UID+' .pvd{width:5px;height:5px;border-radius:50%;background:#1565c0;animation:ppulse 1.5s infinite}',
    '@keyframes ppulse{0%,100%{opacity:1}50%{opacity:.3}}',
    '#'+UID+' .pq{padding:14px 16px;font-size:17px;font-weight:900;line-height:1.3;border-bottom:1px solid '+(DARK?'#3a3530':'#d4cdc2')+'}',
    '#'+UID+' .ptag{font-family:monospace;font-size:7px;letter-spacing:.1em;text-transform:uppercase;color:'+(DARK?'#8a837a':'#7a736a')+';margin-bottom:8px}',
    '#'+UID+' .ps{display:flex!important;flex-direction:row!important;background:'+(DARK?'#252118':'#141210')+';cursor:pointer;width:100%}',
    '#'+UID+' .psl{padding:8px 10px;flex:1;min-width:0}',
    '#'+UID+' .psdiv{width:1px;background:rgba(255,255,255,.15);flex-shrink:0}',
    '#'+UID+' .psll{font-family:monospace;font-size:7px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}',
    '#'+UID+' .pst{font-family:Georgia,serif;font-size:11px;font-style:italic;color:rgba(255,255,255,.7);line-height:1.4}',
    '#'+UID+' .pb{display:flex!important;flex-direction:row!important;border-bottom:1px solid '+(DARK?'#3a3530':'#d4cdc2')+';width:100%}',
    '#'+UID+' .pbb{padding:16px;cursor:pointer;background:transparent;border:none;display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;transition:background .15s}',
    '#'+UID+' .pbb:hover{background:'+(DARK?'#252118':'#eeeae3')+'}',
    '#'+UID+' .pbbl{font-size:26px;font-weight:900;font-family:Georgia,serif}',
    '#'+UID+' .pbbs{font-family:monospace;font-size:7px;letter-spacing:.1em;text-transform:uppercase;color:'+(DARK?'#8a837a':'#7a736a')+'}',
    '#'+UID+' .pdiv{background:'+(DARK?'#3a3530':'#d4cdc2')+';width:1px;flex-shrink:0}',
    '#'+UID+' .pn{display:flex!important;flex-direction:row!important;border-bottom:1px solid '+(DARK?'#3a3530':'#d4cdc2')+';width:100%}',
    '#'+UID+' .pnb{padding:8px;cursor:pointer;background:transparent;border:none;font-family:monospace;font-size:7px;letter-spacing:.06em;text-transform:uppercase;color:'+(DARK?'#8a837a':'#7a736a')+';flex:1;transition:background .15s}',
    '#'+UID+' .pnb:hover{background:'+(DARK?'#252118':'#eeeae3')+'}',
    '#'+UID+' .pr{padding:14px 16px;display:none}',
    '#'+UID+' .pr.show{display:block}',
    '#'+UID+' .prh{font-size:14px;font-weight:700;margin-bottom:8px}',
    '#'+UID+' .pbar{height:10px;display:flex;border-radius:3px;overflow:hidden;margin:6px 0}',
    '#'+UID+' .pstat{display:flex;justify-content:space-between;font-family:monospace;font-size:9px;margin-bottom:8px}',
    '#'+UID+' .preason{border-left:3px solid #7b3fa0;padding:8px 10px;background:'+(DARK?'#252118':'#eeeae3')+';font-size:12px;font-style:italic;line-height:1.5}',
    '#'+UID+' .pf{padding:8px 14px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid '+(DARK?'#3a3530':'#d4cdc2')+'}',
    '#'+UID+' .pfc{font-family:monospace;font-size:8px;color:'+(DARK?'#8a837a':'#7a736a')+'}',
    '#'+UID+' .pfcta{font-family:monospace;font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:'+(DARK?'#f0ece4':'#141210')+';text-decoration:none;border:1px solid '+(DARK?'#f0ece4':'#141210')+';padding:4px 10px}',
    '#'+UID+' .pdots{display:flex;align-items:center;justify-content:center;gap:8px;padding:8px;border-top:1px solid '+(DARK?'#3a3530':'#d4cdc2')+'}',
    '#'+UID+' .pdot{width:6px;height:6px;border-radius:50%;background:'+(DARK?'#3a3530':'#d4cdc2')+';cursor:pointer;transition:background .2s;border:none;padding:0}',
    '#'+UID+' .pdot.on{background:'+(DARK?'#f0ece4':'#141210')+'}'
  ].join('');
  // Google Analytics
  if(!document.querySelector('script[src*="G-GGXNH132QJ"]')){
    var gas=document.createElement('script');
    gas.async=true;
    gas.src='https://www.googletagmanager.com/gtag/js?id=G-GGXNH132QJ';
    document.head.appendChild(gas);
    window.dataLayer=window.dataLayer||[];
    function gtag(){dataLayer.push(arguments);}
    gtag('js',new Date());
    gtag('config','G-GGXNH132QJ');
  }
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  // Container
  var wrap=document.createElement('div');wrap.id=UID;
  wrap.innerHTML='<div style="padding:20px;text-align:center;font-family:monospace;font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:'+(DARK?'#8a837a':'#7a736a')+'">Loading Purple Pulse...</div>';
  script.parentNode.insertBefore(wrap,script.nextSibling);

  var questions=[],curQ=0,voted={},expanded={};
  try{
    // Normalize publisher key to avoid www/non-www duplicates
    var _pk='pw_'+PUBLISHER.replace(/^www\./,'');
    voted=JSON.parse(localStorage.getItem(_pk)||'{}');
    PUBLISHER=PUBLISHER.replace(/^www\./,'');
  }catch(e){}

  function tv(t){return(t.votes_yes||0)+(t.votes_no||0)+(t.votes_conditional||0)+(t.votes_unsure||0);}
  function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  function render(){
    var t=questions[curQ];
    if(!t){
      wrap.innerHTML='<div style="padding:16px;text-align:center;font-family:monospace;font-size:9px;color:'+(DARK?'#8a837a':'#7a736a')+'">No questions available. <a href="https://purple-poll.com" target="_blank" style="color:#1565c0">Visit Purple →</a></div>';
      return;
    }
    var tot=tv(t);
    var yesPct=tot>0?Math.round(((t.votes_yes||0)/tot)*100):50;
    var noPct=100-yesPct;
    var isFlipped=t.yes_alignment==='right';
    var yClr=isFlipped?'#c62828':'#1565c0';
    var nClr=isFlipped?'#1565c0':'#c62828';
    var hasVoted=voted[t.id];
    var tag=(t.tags||['General'])[0];
    var isExp=expanded[t.id];

    // Dots
    var dots='';
    if(questions.length>1){
      dots='<div class="pdots">';
      for(var di=0;di<questions.length;di++){
        dots+='<button class="pdot'+(di===curQ?' on':'')+'" onclick="window.ppq'+UID+'('+di+')"></button>';
      }
      dots+='</div>';
    }

    wrap.innerHTML=
      // Header
      '<div class="ph"><div class="pl">Purple</div><div class="pv"><span class="pvd"></span>'+tot+' votes</div></div>'+

      // Question
      '<div class="pq"><div class="ptag">'+esc(tag)+(t.is_hot?' · 🔥':'')+' · '+tot+' votes</div>'+esc(t.question)+'</div>'+

      // Both sides — expands inline, no external link
      '<div class="ps" onclick="window.ppx'+UID+'()">'+
        '<div class="psl">'+
          '<div class="psll" style="color:'+yClr+'">← Left argues</div>'+
          '<div class="pst" id="'+UID+'l" style="-webkit-line-clamp:'+(isExp?'unset':'2')+';display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden">'+(isExp&&t._left?esc(t._left):'Tap to read both arguments →')+'</div>'+
        '</div>'+
        '<div class="psdiv"></div>'+
        '<div class="psl">'+
          '<div class="psll" style="color:'+nClr+'">Right argues →</div>'+
          '<div class="pst" id="'+UID+'r" style="-webkit-line-clamp:'+(isExp?'unset':'2')+';display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden">'+(isExp&&t._right?esc(t._right):'Tap to expand →')+'</div>'+
        '</div>'+
      '</div>'+
      '<div style="text-align:center;padding:4px;background:'+(DARK?'#252118':'#141210')+'"><span style="font-family:monospace;font-size:7px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.35)">'+(isExp?'▲ Tap to collapse':'★ Tap to read both sides before you vote')+'</span></div>'+

      // Vote buttons
      (!hasVoted?
        '<div class="pb">'+
          '<button class="pbb" onclick="window.ppv'+UID+'(\''+t.id+'\',\'yes\')">'+
            '<span class="pbbl" style="color:'+yClr+'">Yes</span>'+
            '<span class="pbbs">I agree</span>'+
          '</button>'+
          '<div class="pdiv"></div>'+
          '<button class="pbb" onclick="window.ppv'+UID+'(\''+t.id+'\',\'no\')">'+
            '<span class="pbbl" style="color:'+nClr+'">No</span>'+
            '<span class="pbbs">I disagree</span>'+
          '</button>'+
        '</div>'+
        '<div class="pn">'+
          '<button class="pnb" onclick="window.ppv'+UID+'(\''+t.id+'\',\'conditional\')">~ Yes, with conditions</button>'+
          '<button class="pnb" onclick="window.ppv'+UID+'(\''+t.id+'\',\'unsure\')">? Not sure yet</button>'+
        '</div>'
      :'')+

      // Result
      '<div class="pr'+(hasVoted?' show':'')+'" id="'+UID+'res">'+
        '<div class="prh">'+
          (hasVoted?'You voted <strong style="color:'+(hasVoted==='yes'?yClr:nClr)+'">'+hasVoted+'</strong> — here\'s where America stands:':'Results')+
        '</div>'+
        '<div class="pbar">'+
          '<div style="width:'+yesPct+'%;background:'+yClr+'"></div>'+
          '<div style="width:'+noPct+'%;background:'+nClr+'"></div>'+
        '</div>'+
        '<div class="pstat">'+
          '<span style="color:'+yClr+'">Yes '+yesPct+'%</span>'+
          '<span>'+tot+' votes</span>'+
          '<span style="color:'+nClr+'">No '+noPct+'%</span>'+
        '</div>'+
      '</div>'+

      // Footer — ONE external link
      '<div class="pf">'+
        '<span class="pfc">Purple Pulse · '+questions.length+' question'+(questions.length!==1?'s':'')+'</span>'+
        '<a class="pfcta" href="https://purple-poll.com?ref='+encodeURIComponent(PUBLISHER)+'" target="_blank">More on Purple →</a>'+
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
        // Update text if showing fallback
        var lEl=document.getElementById(UID+'l');
        var rEl=document.getElementById(UID+'r');
        if(lEl&&lEl.textContent.indexOf('Tap')===0){
          lEl.textContent=t._left?t._left.split('.')[0]+'.':'';
        }
        if(rEl&&rEl.textContent.indexOf('Tap')===0){
          rEl.textContent=t._right?t._right.split('.')[0]+'.':'';
        }
      }
    }).catch(function(){});
  }

  // Expand/collapse both sides inline
  window['ppx'+UID]=function(){
    var t=questions[curQ];if(!t)return;
    expanded[t.id]=!expanded[t.id];
    if(expanded[t.id]&&!t._sidesLoaded)loadSides(t);
    render();
  };

  // Vote
  window['ppv'+UID]=function(topicId,option){
    if(voted[topicId])return;
    voted[topicId]=option;
    try{localStorage.setItem('pw_'+PUBLISHER.replace(/^www\./,''),JSON.stringify(voted));}catch(e){}
    var t=questions.find(function(x){return x.id===topicId;});
    if(t)t['votes_'+option]=(t['votes_'+option]||0)+1;
    render();
    // Save vote
    fetch(SURL+'/rest/v1/widget_votes',{
      method:'POST',
      headers:{'apikey':SKEY,'Authorization':'Bearer '+ANON,'Content-Type':'application/json','Prefer':'return=minimal'},
      body:JSON.stringify({topic_id:topicId,vote_option:option,publisher:PUBLISHER,referrer:document.referrer,voted_at:new Date().toISOString()})
    }).catch(function(){});
    // Auto-advance
    if(curQ<questions.length-1)setTimeout(function(){curQ++;render();},2500);
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
        wrap.innerHTML='<div style="padding:16px;text-align:center"><a href="https://purple-poll.com" target="_blank" style="font-family:monospace;font-size:9px;color:#1565c0">Visit Purple →</a></div>';
        return;
      }
      var unvoted=topics.filter(function(t){return !voted[t.id];});
      var scored=unvoted.map(function(t){
        var tot=tv(t)||1,yesPct=Math.round(((t.votes_yes||0)/tot)*100),gap=Math.abs(yesPct-50);
        return Object.assign({},t,{_score:(100-gap)*Math.min(1,tot/15)});
      }).sort(function(a,b){return b._score-a._score;});
      questions=scored.slice(0,COUNT);
      if(!questions.length){
        wrap.innerHTML='<div style="padding:16px;text-align:center;font-family:monospace;font-size:9px;color:'+(DARK?'#8a837a':'#7a736a')+'">You\'ve voted on all questions! <a href="https://purple-poll.com" target="_blank" style="color:#1565c0">See results →</a></div>';
        return;
      }
      render();
    })
    .catch(function(){
      wrap.innerHTML='<div style="padding:16px;text-align:center;font-family:monospace;font-size:9px;color:'+(DARK?'#8a837a':'#7a736a')+'">Purple Pulse unavailable. <a href="https://purple-poll.com" target="_blank" style="color:#1565c0">Visit purple-poll.com →</a></div>';
    });
})();
