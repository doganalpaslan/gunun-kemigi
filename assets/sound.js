// The reel contains room noise and physical key strikes, so these are synthesized approximations.
export class GameSound{
 constructor(enabled){this.enabled=enabled;this.context=null;}
 unlock(){if(!this.enabled)return;try{this.context??=new (window.AudioContext||window.webkitAudioContext)();if(this.context.state==='suspended')this.context.resume().catch(()=>{});}catch{}}
 play(kind){if(!this.enabled)return;this.unlock();const c=this.context;if(!c||c.state!=='running')return;const t=c.currentTime;
 const tone=(freq,delay,duration,level,type='sine',end=freq)=>{const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t+delay);o.frequency.exponentialRampToValueAtTime(end,t+delay+duration);g.gain.setValueAtTime(.0001,t+delay);g.gain.exponentialRampToValueAtTime(level,t+delay+.003);g.gain.exponentialRampToValueAtTime(.0001,t+delay+duration);o.connect(g).connect(c.destination);o.start(t+delay);o.stop(t+delay+duration+.01)};
 if(kind==='key'){const n=c.createBuffer(1,Math.floor(c.sampleRate*.028),c.sampleRate),data=n.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.exp(-i/(c.sampleRate*.0045));const src=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain();filter.type='bandpass';filter.frequency.value=2900;filter.Q.value=.65;gain.gain.value=.11;src.buffer=n;src.connect(filter).connect(gain).connect(c.destination);src.start();tone(180,0,.026,.035,'sine',110);}
 if(kind==='wrong'){tone(145,0,.085,.055,'triangle',92);tone(92,.03,.065,.025,'sine');}
 if(kind==='correct'){tone(660,0,.09,.045);tone(880,.065,.14,.04);}
 }
}
