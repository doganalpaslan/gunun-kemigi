import {normalize,dailyBones,roundBones,dayNumber,answerAliases} from './bones.js?v=b6ff2c9-0020';
import {createSkull} from './skull.js?v=b6ff2c9-0020';
import {notesForDay} from './study.js?v=b6ff2c9-0020';
import {GameSound} from './sound.js?v=b6ff2c9-0020';
const $=s=>document.querySelector(s);
const localDate=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function write(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{$('#storage-note').textContent='Tarayıcı depolaması kullanılamıyor. İlerlemeniz bu oturumda korunur.'}}
let date=localDate();let prefs={...read('kemik:preferences',{upper:false,sound:true}),mode:'latin'};
const fresh=()=>({round:0,index:0,typed:'',done:false,errors:0,keystrokes:0,correctKeys:0,attempts:0,first:0,misses:{},round3Misses:{},between:false,questionErrors:0,round3Errors:0,started:Date.now(),elapsed:0});
let state=read(`kemik:v4:${date}:${prefs.mode}`,fresh());
if(!Number.isInteger(state.round)||state.round<0||state.round>2||!Number.isInteger(state.index)||state.index<0||state.index>7||typeof state.typed!=='string'||typeof state.misses!=='object')state=fresh();
let skull,busy=false,submitted=false,timer=null;const sound=new GameSound(prefs.sound);
for(const event of ['pointerdown','keydown'])document.addEventListener(event,()=>sound.unlock(),{capture:true});
const current=()=>roundBones(date,state.round)[state.index];
const name=b=>prefs.mode==='latin'?b.latin:b.tr;

const aliases=b=>answerAliases(b,prefs.mode);
const display=s=>prefs.upper?s.toLocaleUpperCase(prefs.mode==='tr'?'tr-TR':'en-US'):s.toLocaleLowerCase(prefs.mode==='tr'?'tr-TR':'en-US');
function save(){write(`kemik:v4:${date}:${prefs.mode}`,state);write('kemik:preferences',prefs)}
function streak(){const s=read('kemik:streak',{count:0,last:null});return s.last&&(dayNumber(date)-dayNumber(s.last)<=1)?s.count:0;}
function paint(){
 $('#date').textContent=new Date(date+'T12:00:00').toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'});$('#date').dateTime=date;
 $('#streak').textContent=streak();$('#case').setAttribute('aria-pressed',String(prefs.upper));$('#case').setAttribute('aria-label',prefs.upper?'Küçük harf kullan':'Büyük harf kullan');
 $('#sound').textContent=prefs.sound?'Ses açık':'Ses kapalı';$('#sound').setAttribute('aria-pressed',String(prefs.sound));
 $('#game').hidden=state.done;$('#results').hidden=!state.done;
 if(state.done){renderResults();return}
 $('#game').classList.toggle('round-ended',!!state.between);$('#round-end').hidden=!state.between;$('#answer-area').hidden=!!state.between;$('#keyboard').hidden=!!state.between;
 if(state.between){$('#round-end-title').textContent=`Tur ${state.round} bitti · 8 / 8`;$('#round-end-copy').textContent=state.round===1?'Sekizi de toz oldu. Şimdi adlar kayboluyor. İlk harf ve bir ipucu kalıyor.':'Bir tur daha kaldı. Şimdi ezberden, öbür taraftan hatırlayın.';$('#next-round').innerHTML=`${state.round+1}. tura başla <kbd>gir</kbd>`;return}
 const b=current();$('#round').textContent=`Tur ${state.round+1} · ${['Görerek yazın','İlk harften hatırlayın','Diğer taraftan, ezberden yazın'][state.round]} · ${state.index+1} / 8`;
 renderAnswer();$('#translation').textContent=state.round===1?b.clue:state.round===0?b.tr:'';
 $('#explanation').textContent=state.round===0||submitted?b.fact:'';
 skull?.setBone(b,state.round);buildKeyboard();
}
function renderAnswer(){
 const b=current(),out=$('#answer'),previous=out.dataset.typed||'';let target=name(b);const matched=aliases(b).find(a=>a.startsWith(normalize(state.typed)));if(state.typed&&matched&&matched!==normalize(target))target=matched;out.dataset.typed=state.typed;out.replaceChildren();out.classList.toggle('long',target.length>22||state.typed.length>22);
 const typed=state.typed;let prefix='';
 for(let i=0;i<typed.length;i++){prefix+=typed[i];const span=document.createElement('span');span.className=i>=previous.length&&typed.startsWith(previous)?'letter':'settled';if(!aliases(b).some(a=>a.startsWith(normalize(prefix))))span.classList.add('wrong');span.textContent=display(typed[i]);out.append(span)}
 let hint='';if(!submitted){if(state.round===0)hint=target.slice(typed.length);if(state.round===1){hint=typed.length===0?target[0]+'·'.repeat(Math.max(3,target.length-1)):'·'.repeat(Math.max(0,target.length-typed.length));}if(state.round===2&&typed.length===0)hint='';}
 const ghost=document.createElement('span');ghost.className='ghost';ghost.textContent=display(hint);
 const caret=document.createElement('span');caret.className='caret';caret.setAttribute('aria-hidden','true');if(!submitted)out.append(caret);out.append(ghost);
 const ready=aliases(b).includes(normalize(typed));document.querySelector('[data-key="Enter"]')?.classList.toggle('ready',ready);
 out.setAttribute('aria-valuetext',`${display(typed)}${state.round===0?' '+display(hint):''}`);
}
function buildKeyboard(){
 const tr=true;const rows=[
 ['"','1','2','3','4','5','6','7','8','9','0','*','-',{label:'sil',key:'Backspace',width:'wide'}],
 [{label:'tab',key:'Tab',width:'wide'},'q','w','e','r','t','y','u','ı','o','p','ğ','ü',{label:'gir',key:'Enter',width:'wide'}],
 [{label:'caps',key:'CapsLock',width:'xwide'},'a','s','d','f','g','h','j','k','l','ş','i',','],
 [{label:'shift',key:'Shift',width:'xwide'},'<','z','x','c','v','b','n','m','ö','ç','.',{label:'shift',key:'Shift',width:'xwide'}],
 [{label:'',key:'none',width:'spacer'},{label:'boşluk',key:' ',width:'space'},{label:'',key:'none',width:'spacer'}]
 ];
 const keyboard=$('#keyboard');keyboard.replaceChildren();keyboard.classList.toggle('turkish',tr);
 for(const row of rows){const el=document.createElement('div');el.className='keyrow';for(const item of row){const k=typeof item==='string'?{label:prefs.upper?item.toLocaleUpperCase('tr-TR'):item,key:item}:item;const button=document.createElement('button');button.type='button';button.className='key '+(k.width||'');button.textContent=k.label;button.dataset.key=k.key;button.tabIndex=k.key==='none'?-1:0;button.setAttribute('aria-label',k.key===' '?'Boşluk':k.key==='Tab'?'Sıradaki sözcük':k.key==='Backspace'?'Son harfi sil':k.key==='Enter'?'Yanıtı gönder':k.label);if(k.key==='none')button.setAttribute('aria-hidden','true');if(k.key==='CapsLock'&&prefs.upper)button.classList.add('mod-on');el.append(button)}keyboard.append(el)}
 document.querySelector('[data-key="Enter"]').classList.toggle('ready',aliases(current()).includes(normalize(state.typed)));
}
function pressFeedback(key){for(const el of document.querySelectorAll('.key'))if(el.dataset.key===key||el.dataset.key.toLocaleLowerCase('tr-TR')===key.toLocaleLowerCase('tr-TR')){el.classList.add('pressed');setTimeout(()=>el.classList.remove('pressed'),110)}}
function wrong(message){sound.play('wrong');$('#feedback').textContent=message;const el=$('#answer-area');el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}
function act(key){
 if(state.done||busy)return;if(state.between){if(key==='Enter')startRound();return}sound.unlock();pressFeedback(key);
 if(key==='Shift'||key==='CapsLock'){prefs.upper=!prefs.upper;save();paint();return}
 if(key==='Backspace'){state.typed=state.typed.slice(0,-1);sound.play('key');$('#feedback').textContent='';save();renderAnswer();return}
 if(key==='Enter'){submit();return}
 if(key==='Tab')key=' ';
 if(key.length!==1||state.typed.length>=60||(!/[\p{L}0-9 "*<,.\-]/u.test(key)))return;
 state.typed+=key;state.keystrokes++;
 const okay=aliases(current()).some(a=>a.startsWith(normalize(state.typed)));
 if(okay){state.correctKeys++;if(key!==' ')sound.play('letter',state.typed.length-1);$('#feedback').textContent='';}else{state.errors++;state.questionErrors=(state.questionErrors||0)+1;if(state.round===2){state.round3Errors=(state.round3Errors||0)+1;(state.round3Misses??={})[current().id]=true;}state.misses[current().id]=(state.misses[current().id]||0)+1;wrong('Bu harfi kontrol edin. Sil tuşuyla düzeltebilirsiniz.');}
 save();renderAnswer();
}
function submit(){
 if(!state.typed.trim()){wrong('Önce kemiğin adını yazın.');return}
 state.attempts++;
 if(!aliases(current()).includes(normalize(state.typed))){state.questionErrors=(state.questionErrors||0)+1;if(state.round===2){state.round3Errors=(state.round3Errors||0)+1;(state.round3Misses??={})[current().id]=true;}state.misses[current().id]=(state.misses[current().id]||0)+1;wrong('Bu kemiğin adını yeniden deneyin.');save();return}
 busy=true;submitted=true;sound.play('correct');$('#feedback').textContent='Doğru.';state.first+=state.questionErrors?0:1;state.typed=name(current());paint();
 timer=setTimeout(()=>{submitted=false;$('#game').classList.add(state.index===7?'dissolving':'transitioning');timer=setTimeout(()=>{next();$('#game').classList.remove('transitioning','dissolving');},state.index===7?540:220)},700);
}
function next(){
 state.typed='';state.questionErrors=0;state.index++;if(state.index===8){state.index=0;state.round++;if(state.round<3){state.between=true;sound.play('round');}if(state.round===3){state.round=2;state.index=7;state.done=true;sound.play('day');state.elapsed=Date.now()-state.started;const s=read('kemik:streak',{last:null,count:0});if(s.last!==date)write('kemik:streak',{last:date,count:s.last&&dayNumber(date)-dayNumber(s.last)===1?s.count+1:1});}}
 busy=false;$('#feedback').textContent='';save();paint();
}
function startRound(){if(!state.between)return;state.between=false;save();paint();$('#answer').focus({preventScroll:true});}
$('#next-round').onclick=startRound;
function renderResults(){
 const total=state.keystrokes||1,accuracy=Math.round(state.correctKeys/total*100),first=Math.round(state.first/24*100),wpm=Math.round(state.correctKeys/5/Math.max(state.elapsed/60000,.1));const host=$('#results');host.replaceChildren();
 const add=(tag,text,cls,parent=host)=>{const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;parent.append(el);return el};
 add('p',`Gün tamamlandı · ${date}`,'eyebrow');add('h2','Bugünün sekiz kemiğini artık görerek, hatırlayarak ve başka bir açıdan adlandırabiliyorsunuz.');
 const stats=add('div','','stats');for(const [label,val] of [['İlk denemede',`%${first}`],['Sonraki tekrar','Yarın'],['Kelime/dk · isabet',`${wpm} · %${accuracy}`]]){const item=add('div','',null,stats);add('small',label,null,item);add('strong',val,null,item)}
 const miles=add('div','','milestones');for(const [text,achieved] of [['Günü tamamla',true],['3. turu hatasız bitir',!state.round3Errors],['Yarın yeniden hatırla (ilk tekrar yarın)',false]]){const p=add('div','',null,miles);add('span','★',achieved?'achieved':'pending',p);p.append(document.createTextNode(text))}
 add('h4','Bildiklerin');const grid=add('div','','result-grid');for(const b of dailyBones(date)){const card=add('article','','result-card',grid);add('h3',display(name(b)),null,card);add('p',b.fact,null,card);const missed=state.round3Misses?.[b.id];add('p',missed?'3. turda kaçırıldı, yarın yine':state.misses[b.id]?'tekrarla hatırlandı':'ilk denemede',missed?'score retry':'score',card)}
 add('h4','Sınav için');for(const note of notesForDay(dailyBones(date)))add('p',note.text,'study-note');
 const button=add('button','Sonuçları kopyala','primary');button.onclick=async()=>{try{await navigator.clipboard.writeText(`Günün kemiği · ${date}\n8 kemik · 3 tur · %${accuracy} doğruluk\n${streak()} günlük seri`);button.textContent='Kopyalandı.'}catch{button.textContent='Kopyalama kullanılamıyor.'}};
}
$('#keyboard').addEventListener('click',e=>{const button=e.target.closest('[data-key]');if(button)act(button.dataset.key)});
document.addEventListener('keydown',e=>{if($('#instructions').open||e.ctrlKey||e.metaKey||e.altKey)return;if(e.target.closest('nav')||e.target.closest('#results')||e.target.closest('footer'))return;if(e.key==='Tab')return;if(e.key===' '||e.key==='Enter'||e.key==='Backspace'||e.key.length===1){e.preventDefault();act(e.key)}});
$('#case').onclick=()=>{prefs.upper=!prefs.upper;save();paint();if(!state.done)$('#answer').focus({preventScroll:true})};
$('#sound').onclick=()=>{prefs.sound=!prefs.sound;sound.enabled=prefs.sound;sound.unlock();save();paint();if(!state.done)$('#answer').focus({preventScroll:true})};
$('#help').onclick=()=>$('#instructions').showModal();$('#close-help').onclick=$('#start').onclick=()=>{$('#instructions').close();$('#answer').focus({preventScroll:true})};
function checkDay(){if(date!==localDate()){clearTimeout(timer);save();date=localDate();state=read(`kemik:v4:${date}:${prefs.mode}`,fresh());busy=false;submitted=false;$('#game').classList.remove('transitioning');paint()}}
setInterval(checkDay,30000);document.addEventListener('visibilitychange',checkDay);
paint();createSkull($('#skull')).then(view=>{skull=view;$('#loading').hidden=true;paint();document.body.dataset.ready='true'}).catch(error=>{console.error(error);$('#loading').classList.add('error');$('#loading').textContent='3B model yüklenemedi. WebGL destekli bir tarayıcıda sayfayı yenileyin.';document.body.dataset.ready='error'});
