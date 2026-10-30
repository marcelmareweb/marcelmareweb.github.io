import fs from 'node:fs';
const base='http://localhost:4323/';
const dir=process.cwd()+'/planning/phase-4/screenshots/';
const page=await (await fetch('http://127.0.0.1:9333/json/new?about:blank',{method:'PUT'})).json();
const ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise((r,j)=>{ws.addEventListener('open',r,{once:true});ws.addEventListener('error',j,{once:true});});
let id=0;const pending=new Map();const errors=[];const failed=[];
ws.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);if(p){clearTimeout(p.timer);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);else if(m.method==='Network.loadingFailed')failed.push(m.params);});
const call=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;const timer=setTimeout(()=>{pending.delete(n);reject(new Error(method+' timed out'));},20000);pending.set(n,{resolve,reject,timer});ws.send(JSON.stringify({id:n,method,params}));});
const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
await call('Page.enable');await call('Runtime.enable');await call('Network.enable');
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function navigate(name,width=1440,noJS=false,reduce=false){
 await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<640});
 await call('Emulation.setTouchEmulationEnabled',{enabled:width<640,maxTouchPoints:1});
 await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:reduce?'reduce':'no-preference'}]});
 await call('Emulation.setScriptExecutionDisabled',{value:noJS});
 const oldOrigin=await evaluate('performance.timeOrigin');
 const navigation=await call('Page.navigate',{url:base+name});
 if(navigation.errorText)throw new Error(navigation.errorText);
 for(let n=0;n<150;n++){await wait(60);if(await evaluate(`document.readyState==='complete'&&performance.timeOrigin!==${oldOrigin}`))break;}
 await evaluate('document.fonts.ready.then(()=>true)');
 return await evaluate(`(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,title:document.title,fontReady:document.fonts.status,headings:[...document.querySelectorAll('h1')].map(x=>x.textContent),missingImages:[...document.images].filter(x=>!x.complete||!x.naturalWidth).map(x=>x.src),fontFiles:performance.getEntriesByType('resource').filter(x=>x.name.endsWith('.woff2')).map(x=>({name:x.name.split('/').pop(),bytes:x.decodedBodySize})),heroHeight:document.querySelector('.hero')?.getBoundingClientRect().height,headlineHeight:document.querySelector('.hero h1')?.getBoundingClientRect().height,headlineFont:document.querySelector('.hero h1')?getComputedStyle(document.querySelector('.hero h1')).fontFamily:null}))()`);
}
async function shot(name,selector=null,full=false){
 await evaluate('window.scrollTo(0,0)');
 let clip;
 if(selector){clip=await evaluate(`(()=>{let r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:0,y:r.top+scrollY,width:innerWidth,height:r.height,scale:1}})()`);}
 else if(full){const m=await call('Page.getLayoutMetrics');clip={x:0,y:0,width:m.cssContentSize.width,height:m.cssContentSize.height,scale:1};}
 else{clip=await evaluate(`(()=>{const e=document.querySelector('.hero');const end=e?e.getBoundingClientRect().bottom:1000;return{x:0,y:0,width:innerWidth,height:Math.ceil(end),scale:1}})()`);}
 const r=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});fs.writeFileSync(dir+name,r.data,'base64');
}
const report={browser:'Chrome via CDP',viewports:[],interaction:[],limits:['No assistive-technology user testing.','No Lighthouse score is claimed.','Local resource measurements do not represent a production network profile.']};
for(const name of ['']){
 for(const width of [375,430,768,1024,1440,1920]){
  const m=await navigate(name,width);report.viewports.push({page:name,...m});
  if(width===1440||width===375){
   const key='home';
   await shot(`${key}-${width===1440?'desktop':'mobile'}.png`,name==='typography.html'?'.type-hybrid':null);
  }
  console.log(name,width,m.scrollWidth===width?'no overflow':'OVERFLOW '+m.scrollWidth);
 }
}
await navigate('');
await evaluate(`document.querySelector('input[value="market"]').focus()`);
await call('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',windowsVirtualKeyCode:32});await call('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});
report.interaction.push({test:'Keyboard Space selects a priority',pass:await evaluate('document.querySelector("input[value=market]").checked')});
await evaluate(`document.querySelector('input[value="customers"]').click()`);
report.interaction.push({test:'Two commitments expose shared demand and deferrals',pass:await evaluate(`document.querySelector('.constraint-ring').classList.contains('is-contested')&&document.querySelectorAll('.is-deferred').length===2&&document.querySelector('[data-consequences]').textContent.includes('leaves this conflict unresolved')`)});
await shot('b-choice-desktop.png','#choice');
await evaluate(`document.querySelector('input[value="ai"]').click()`);
report.interaction.push({test:'Third choice preserves earlier selections and explains capacity',pass:await evaluate(`document.querySelectorAll('input[data-choice]:checked').length===2&&!document.querySelector('input[value=ai]').checked&&document.querySelector('[data-status]').textContent.includes('Clear a selected priority')`)});
await evaluate(`document.querySelector('input[value="market"]').click();document.querySelector('input[value="ai"]').click()`);
report.interaction.push({test:'Revision updates dependencies without shared-resource warning',pass:await evaluate(`document.querySelector('[data-consequences]').textContent.includes('review rights')&&!document.querySelector('.constraint-ring').classList.contains('is-contested')`)});
await evaluate(`document.querySelector('[data-reset]').focus()`);await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r',unmodifiedText:'\r'});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
report.interaction.push({test:'Keyboard reset reopens all alternatives',pass:await evaluate(`document.querySelectorAll('input[data-choice]:checked').length===0&&document.querySelectorAll('.is-deferred').length===0`)});
await shot('b-project-desktop.png','#evidence');await shot('b-full-desktop.png',null,true);
await navigate('',375);
await evaluate(`document.querySelector('.mobile-nav summary').focus()`);await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r',unmodifiedText:'\r'});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
report.interaction.push({test:'Keyboard opens native mobile navigation',pass:await evaluate('document.querySelector(".mobile-nav").open')});
await evaluate('document.querySelector(".mobile-nav").open=false');
await evaluate(`document.querySelector('input[value="market"]').click();document.querySelector('input[value="customers"]').click()`);await shot('b-choice-mobile.png','#choice');await shot('b-project-mobile.png','#evidence');await shot('b-full-mobile.png',null,true);
await navigate('',375,false,true);await evaluate(`document.querySelector('input[value="market"]').click()`);
report.interaction.push({test:'Reduced motion disables relationship transitions',pass:await evaluate(`matchMedia('(prefers-reduced-motion: reduce)').matches&&getComputedStyle(document.querySelector('.board-shape')).transitionDuration==='0s'`)});
await navigate('',375,true);
report.interaction.push({test:'No JavaScript retains worked example, navigation and CTA',pass:await evaluate(`document.querySelector('[data-enhancement]').hidden&&document.querySelector('[data-worked-example]').open&&document.querySelector('.hero .button').getAttribute('href')==='#book'`)});
await shot('b-no-js-mobile.png','#choice');
await call('Emulation.setScriptExecutionDisabled',{value:false});

await navigate('',320);report.reflow320=await evaluate('document.documentElement.scrollWidth===innerWidth');
await navigate('',375);await evaluate('document.querySelector(".mobile-nav").open=true;document.querySelector(".mobile-nav summary").focus()');
await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
report.escapeDiagnostics=await evaluate('({open:document.querySelector(".mobile-nav").open,active:document.activeElement.outerHTML})');
report.interaction.push({test:'Escape closes mobile navigation and restores focus',pass:await evaluate('!document.querySelector(".mobile-nav").open&&document.activeElement===document.querySelector(".mobile-nav summary")')});
await navigate('',375);
const touch=await evaluate(`(()=>{const label=document.querySelector('input[value="market"]').closest('label');label.scrollIntoView({behavior:'instant',block:'center'});const r=label.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
await call('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[touch]});await call('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await wait(50);
report.interaction.push({test:'Emulated touch selects through the full label',pass:await evaluate('document.querySelector("input[value=market]").checked')});
report.allPairs=await evaluate(`(()=>{const ids=['market','customers','reliability','ai'];const results=[];for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){document.querySelector('[data-reset]').click();document.querySelector('input[value='+ids[i]+']').click();document.querySelector('input[value='+ids[j]+']').click();results.push({pair:[ids[i],ids[j]],backed:document.querySelectorAll('.is-backed[data-node]').length,deferred:document.querySelectorAll('.is-deferred[data-node]').length,shared:document.querySelector('.constraint-ring').classList.contains('is-contested')});}return results})()`);
report.palette=await evaluate(`({paper:getComputedStyle(document.body).getPropertyValue('--paper').trim(),signal:getComputedStyle(document.body).getPropertyValue('--signal').trim(),projectSelection:getComputedStyle(document.querySelector('.project-art'),'::selection').color})`);
report.errors=errors;report.failedRequests=failed;
fs.writeFileSync(process.cwd()+'/planning/phase-4/browser-results.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({interaction:report.interaction,overflow:report.viewports.filter(x=>x.width!==x.scrollWidth),missing:report.viewports.filter(x=>x.missingImages.length),errors:errors.length,failedRequests:failed.length},null,2));
await call('Page.close');ws.close();
