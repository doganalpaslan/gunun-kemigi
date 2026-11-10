// Shared live/offline synthesis: no samples, network requests, or master-volume jumps.
export const soundDurations={letter:.2,key:.032,wrong:.12,correct:.45,round:.6,day:.9};
const pentatonic=[698.456,783.991,880,1046.502,1174.659,1396.913,1567.982,1760,2093.005];
export function synthesize(c,kind,t=c.currentTime,index=0){
 if(!(kind in soundDurations))return;
 const tone=(freq,delay,duration,level,end=freq,type='sine')=>{
  const o=c.createOscillator(),g=c.createGain(),start=t+delay;
  o.type=type;o.frequency.setValueAtTime(freq,start);o.frequency.exponentialRampToValueAtTime(end,start+duration);
  g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(level,start+.004);
  g.gain.exponentialRampToValueAtTime(.00001,start+duration-.003);g.gain.linearRampToValueAtTime(0,start+duration);
  o.connect(g).connect(c.destination);o.start(start);o.stop(start+duration);
 };
 const click=(delay,duration,level)=>{
  const n=c.createBuffer(1,Math.ceil(c.sampleRate*duration),c.sampleRate),data=n.getChannelData(0);
  // Seeded noise makes the exported WAV and live attack identical.
  let seed=739;for(let i=0;i<data.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const time=i/c.sampleRate;data[i]=(seed/2147483648-1)*Math.min(1,time/.001)*Math.exp(-time/.002);}
  const src=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain();
  filter.type='bandpass';filter.frequency.value=2100;filter.Q.value=.65;gain.gain.value=level;
  src.buffer=n;src.connect(filter).connect(gain).connect(c.destination);src.start(t+delay);
 };
 const pluck=(freq,delay,duration,level)=>{
  tone(freq,delay,duration,level);
  tone(freq*2,delay,duration,level*Math.pow(10,-14/20));
  click(delay,.006,.004);
 };
 if(kind==='letter'){
  pluck(pentatonic[Math.min(pentatonic.length-1,Math.max(0,Math.floor(index)))],0,.2,.145);
 }else if(kind==='key'){
  click(0,.028,.015);tone(240,0,.032,.008,135);
 }else if(kind==='wrong'){
  tone(233,0,.12,.065,207.65,'triangle');
 }else{
  const notes=kind==='correct'?[[698.456,0,.22],[880,.025,.22],[1046.502,.05,.22],[1396.913,.23,.22]]:
   kind==='round'?[[698.456,0,.24],[880,.12,.24],[1046.502,.24,.24],[1396.913,.36,.24]]:
   [[698.456,0,.24],[880,.16,.24],[1046.502,.32,.24],[1396.913,.48,.24],[1760,.66,.24]];
  for(const [hz,delay,duration] of notes)pluck(hz,delay,duration,.115);
 }
}
export class GameSound{
 constructor(enabled){this.enabled=enabled;this.context=null;this.pending=[];this.resuming=null;}
 unlock(){
  if(!this.enabled)return Promise.resolve();
  try{
   this.context??=new (window.AudioContext||window.webkitAudioContext)();
   if(this.context.state==='running'){this.flush();return Promise.resolve();}
   // The first gesture starts resume; play() queues until this promise resolves.
   if(!this.resuming)this.resuming=this.context.resume().then(()=>{this.resuming=null;this.flush();},()=>{this.resuming=null;});
   return this.resuming;
  }catch{return Promise.resolve();}
 }
 flush(){if(this.context?.state!=='running')return;const queue=this.pending.splice(0);if(this.enabled)for(const {kind,index} of queue)synthesize(this.context,kind,this.context.currentTime,index);}
 play(kind,index=0){
  if(!this.enabled||!(kind in soundDurations))return;
  if(this.context?.state==='running'){synthesize(this.context,kind,this.context.currentTime,index);return;}
  this.pending.push({kind,index});this.unlock();
 }
}
