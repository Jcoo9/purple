// Purple Service Worker — handles push notifications and caching
const CACHE='purple-v1';

self.addEventListener('install',e=>{
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(self.clients.claim());
});

// Handle push notifications
self.addEventListener('push',e=>{
  const data=e.data?e.data.json():{};
  const title=data.title||'Purple — America\'s Real Pulse';
  const body=data.body||'A new question is waiting for your vote.';
  const url=data.url||'https://jcoo9.github.io/purple/';

  e.waitUntil(
    self.registration.showNotification(title,{
      body,
      icon:'/purple/icon-192.png',
      badge:'/purple/icon-192.png',
      tag:'purple-daily',
      renotify:true,
      requireInteraction:false,
      data:{url},
      actions:[
        {action:'vote',title:'Vote Now →'},
        {action:'dismiss',title:'Later'}
      ]
    })
  );
});

// Handle notification click
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  if(e.action==='dismiss')return;
  const url=e.notification.data?.url||'https://jcoo9.github.io/purple/';
  e.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(cls=>{
      const purpleWindow=cls.find(c=>c.url.includes('jcoo9.github.io/purple'));
      if(purpleWindow)return purpleWindow.focus();
      return clients.openWindow(url);
    })
  );
});

// Periodic background sync for streak reminders
self.addEventListener('periodicsync',e=>{
  if(e.tag==='daily-reminder'){
    e.waitUntil(showDailyReminder());
  }
});

async function showDailyReminder(){
  const hour=new Date().getHours();
  if(hour<7||hour>21)return; // Only between 7am-9pm
  return self.registration.showNotification('Purple — Today\'s Question',{
    body:'A new question is waiting. What do you think?',
    icon:'/purple/icon-192.png',
    tag:'purple-daily',
    data:{url:'https://jcoo9.github.io/purple/'}
  });
}
