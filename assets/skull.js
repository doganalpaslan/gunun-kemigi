import * as THREE from './vendor/three.module.min.js';
// Region files are loaded on demand. At most five decoded regions stay in GPU memory.
export async function createSkull(canvas){
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0xfaf9f6,0);
 const closeCanvas=document.createElement('canvas');closeCanvas.id='close-view';closeCanvas.setAttribute('aria-hidden','true');canvas.after(closeCanvas);
 const closeRenderer=new THREE.WebGLRenderer({canvas:closeCanvas,antialias:true,alpha:true,powerPreference:'low-power'});closeRenderer.setPixelRatio(Math.min(devicePixelRatio,1.5));closeRenderer.setClearColor(0x000000,0);
 // Keep the bright lights from clipping the translucent grey surface to white.
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.85;closeRenderer.toneMapping=renderer.toneMapping;closeRenderer.toneMappingExposure=.85;
 const scene=new THREE.Scene(),pivot=new THREE.Group(),root=new THREE.Group();pivot.add(root);scene.add(pivot);
 scene.add(new THREE.HemisphereLight(0xffffff,0x827e72,2.6));
 for(const [x,y,z,power] of [[-3,5,6,3],[4,0,-3,1.1]]){const l=new THREE.DirectionalLight(0xfffcf6,power);l.position.set(x,y,z);scene.add(l);}
 const gray=new THREE.MeshStandardMaterial({color:0xa8a79d,roughness:.64,transparent:true,opacity:.20,depthWrite:false,side:THREE.FrontSide});
 const red=new THREE.MeshStandardMaterial({color:0xc20d38,roughness:.34,metalness:.03});
 const response=await fetch('assets/model/manifest.json');if(!response.ok)throw Error('Model dizini yüklenemedi');const manifest=await response.json();
 const cache=new Map();let request=0,running=true,lastId='',activeBone,angle=0,targetAngle=0,tilt=.08,targetTilt=.08,frame,mainCenter=new THREE.Vector3(),closeCenter=new THREE.Vector3(),mainSize=100,closeSize=50,ready=false,mainBox=new THREE.Box3(),closeBox=new THREE.Box3();
 const camera=new THREE.OrthographicCamera(-200,200,200,-200,.1,5000);camera.position.set(0,0,2000);camera.lookAt(0,0,0);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const observer=new ResizeObserver(()=>{const {width,height}=canvas.getBoundingClientRect();renderer.setSize(width,height,false);closeRenderer.setSize(closeCanvas.clientWidth,closeCanvas.clientHeight,false)});observer.observe(canvas);
 async function load(region){
  if(cache.has(region)){const v=cache.get(region);cache.delete(region);cache.set(region,v);return v;}
  const res=await fetch(`assets/model/${region==='skull'?'skull':region}.bin`);if(!res.ok)throw Error('Bölge yüklenemedi');const buffer=await res.arrayBuffer(),group=new THREE.Group();
  const entries=manifest.filter(m=>m.region===region);
  // Bring the paired hands/feet together without changing their internal anatomical relationships.
  const sideCenters={};
  if(region==='hand'||region==='foot')for(const side of [-1,1]){const box=new THREE.Box3();for(const item of entries){const p=new Float32Array(buffer,item.offset,item.vertices*3);for(let i=0;i<p.length;i+=3)if(Math.sign(p[i])===side)box.expandByPoint(new THREE.Vector3(p[i],p[i+1],p[i+2]));}sideCenters[side]=box.getCenter(new THREE.Vector3()).x;}
  for(const item of entries){
   const source=new Float32Array(buffer,item.offset,item.vertices*3),points=new Float32Array(source.length);
   for(let i=0;i<source.length;i+=3){let x=source[i];if(sideCenters[Math.sign(x)]!==undefined)x=x-sideCenters[Math.sign(x)]+Math.sign(x)*(region==='hand'?65:75);points[i]=x;points[i+1]=source[i+2];points[i+2]=-source[i+1];}
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(points,3));g.setIndex(new THREE.BufferAttribute(new Uint16Array(buffer,item.offset+source.byteLength,item.indices),1));g.computeVertexNormals();g.computeBoundingBox();
   const mesh=new THREE.Mesh(g,gray);mesh.name=item.id;group.add(mesh);
  }
  cache.set(region,group);
  return group;
 }
 async function setBone(b,r){
  if(lastId===`${b.id}:${r}`)return;lastId=`${b.id}:${r}`;activeBone=b;ready=false;const token=++request;canvas.dataset.loading='true';canvas.dataset.bone=b.id;
  const loading=document.querySelector('#loading');loading.hidden=false;loading.textContent='Kemikler yükleniyor.';
  try{
   const regions=b.region==='arm'?['shoulder','arm','forearm']:b.region==='thigh'?['pelvis','thigh','knee']:b.region==='knee'?['thigh','knee','leg']:[b.region||'skull'];const groups=await Promise.all(regions.map(load));if(token!==request)return;root.clear();root.add(...groups);const meshes=groups.flatMap(g=>g.children);
   const whole=new THREE.Box3(),target=new THREE.Box3();
   for(const m of meshes){const active=b.meshes.includes(m.name);m.material=active?red:gray;m.renderOrder=active?0:1;whole.union(m.geometry.boundingBox);if(active)target.union(m.geometry.boundingBox);}
   if(target.isEmpty())throw Error('Kemik ağı bulunamadı');
   whole.getCenter(mainCenter);target.getCenter(closeCenter);mainBox.copy(whole);closeBox.copy(target);
   const size=whole.getSize(new THREE.Vector3());mainSize=Math.max(size.y,size.x,size.z)*.56;
   // For long paired limbs, provide a full regional context in the main view.
   const ts=target.getSize(new THREE.Vector3());closeSize=Math.max(ts.x,ts.y,ts.z)*.65;
   // Frame one anatomical side of paired targets, retaining every contextual mesh.
   const targets=meshes.filter(m=>b.meshes.includes(m.name));
   if(targets.length>1){
    const side=Math.sign(targets[0].geometry.boundingBox.getCenter(new THREE.Vector3()).x);
    closeBox.makeEmpty();
    for(const m of targets)if(Math.sign(m.geometry.boundingBox.getCenter(new THREE.Vector3()).x)===side)closeBox.union(m.geometry.boundingBox);
    closeBox.getCenter(closeCenter);
   }
   if(b.region==='knee'){mainCenter.copy(closeCenter);mainSize=150;}
   for(const [k,g] of cache){if(cache.size<=5)break;if(!groups.includes(g)){cache.delete(k);g.traverse(m=>m.geometry?.dispose());}}
   targetAngle=(b.angle||.25)+(r===2?Math.PI:0);targetTilt=(b.tilt||0)+(['foot'].includes(b.region)?-.55:.08);
   angle=targetAngle;tilt=targetTilt;canvas.dataset.loading='false';loading.hidden=true;ready=true;
   canvas.setAttribute('aria-label',r===0?`${b.tr} kırmızı renkle gösteriliyor.`:'Sorulan kemik kırmızı renkle gösteriliyor.');
  }catch(error){if(token!==request)return;console.error(error);loading.hidden=false;loading.textContent='Kemikler yüklenemedi. Sayfayı yenileyerek yeniden deneyin.';canvas.dataset.loading='error';}
 }
 let lastFrame=0;
 function draw(now){if(!running)return;frame=requestAnimationFrame(draw);if(now-lastFrame<32||document.hidden||canvas.closest('[hidden]')||!ready)return;lastFrame=now;
  const w=canvas.clientWidth,h=canvas.clientHeight,mobile=w<600,drift=reduced?0:Math.sin(now*.00024)*.17;
  renderer.setScissorTest(false);renderer.clear();renderer.setScissorTest(true);
  function view(x,y,vw,vh,a,t,scale,center,close){
   const output=close?closeRenderer:renderer;
   output.setViewport(x,y,vw,vh);output.setScissor(x,y,vw,vh);const box=close?closeBox:mainBox,centerForFit=center;
   if(close||activeBone.region!=='knee'){const rotation=new THREE.Euler(t,a,0),point=new THREE.Vector3();let extentX=0,extentY=0;for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){point.set(x,y,z).sub(centerForFit).applyEuler(rotation);extentX=Math.max(extentX,Math.abs(point.x));extentY=Math.max(extentY,Math.abs(point.y));}scale=Math.max(extentY,extentX/(vw/vh))*(close?2.5:1.12);}
   camera.left=-scale*vw/vh;camera.right=scale*vw/vh;camera.top=scale;camera.bottom=-scale;camera.updateProjectionMatrix();
   root.position.copy(center).multiplyScalar(-1);pivot.rotation.set(t,a,0);
   // Both views use the same translucent regional context and opaque red target.
   output.render(scene,camera);
  }
  view(w*(mobile?.02:.16),10,w*(mobile?.74:.62),h-20,angle+drift,tilt,mainSize,mainCenter,false);
  view(0,0,closeCanvas.clientWidth,closeCanvas.clientHeight,angle+Math.PI*.65+(reduced?0:now*.00008),tilt-.18,closeSize,closeCenter,true);
 }
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;document.querySelector('#loading').hidden=false;document.querySelector('#loading').textContent='Görüntü durdu. Sayfayı yenileyerek devam edebilirsiniz.';});
 frame=requestAnimationFrame(draw);
 return {setBone,dispose(){running=false;cancelAnimationFrame(frame);observer.disconnect();for(const g of cache.values())g.traverse(m=>m.geometry?.dispose());gray.dispose();red.dispose();renderer.dispose();closeRenderer.dispose();closeCanvas.remove();}};
}
