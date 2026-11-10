import * as THREE from './vendor/three.module.min.js';
// Region files are loaded on demand. At most five decoded regions stay in GPU memory.
export async function createSkull(canvas){
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0xfaf9f6,0);
 const closeCanvas=document.createElement('canvas');closeCanvas.id='close-view';closeCanvas.setAttribute('aria-hidden','true');canvas.after(closeCanvas);
 const closeRenderer=new THREE.WebGLRenderer({canvas:closeCanvas,antialias:true,alpha:true,powerPreference:'low-power'});closeRenderer.setPixelRatio(Math.min(devicePixelRatio,1.5));closeRenderer.setClearColor(0x000000,0);
 // Glass is unlit so studio lighting cannot wash its grey tint out to white.
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
 closeRenderer.toneMapping=renderer.toneMapping;closeRenderer.toneMappingExposure=1;
 const scene=new THREE.Scene(),pivot=new THREE.Group(),root=new THREE.Group();pivot.add(root);scene.add(pivot);
 scene.add(new THREE.HemisphereLight(0xffffff,0x999999,1.4));
 const light=new THREE.DirectionalLight(0xffffff,1.6);light.position.set(-3,5,6);scene.add(light);
 const gray=new THREE.ShaderMaterial({
  transparent:true,depthWrite:false,side:THREE.DoubleSide,forceSinglePass:false,
  uniforms:{edgeFade:{value:false},viewSize:{value:new THREE.Vector2()}},
  vertexShader:`varying vec3 surfaceNormal;
   void main(){surfaceNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  fragmentShader:`uniform bool edgeFade;uniform vec2 viewSize;varying vec3 surfaceNormal;
   void main(){
    float rim=pow(1.0-abs(normalize(surfaceNormal).z),2.0);
    // Neutral grey faces, darker and more opaque at grazing angles.
    vec3 tint=mix(vec3(0.18),vec3(0.075),rim);
    float alpha=mix(0.30,0.48,rim);
    if(edgeFade){vec2 p=(gl_FragCoord.xy/viewSize-0.5)*2.0;alpha*=1.0-smoothstep(0.65,1.0,length(p));}
    gl_FragColor=vec4(tint,alpha);
    #include <colorspace_fragment>
   }`
 });
 // Opacity stays one; the transparent queue allows this solid target to render
 // after both glass passes. Depth testing still preserves the target's own shape.
 const red=new THREE.MeshStandardMaterial({color:0xd0103a,roughness:.58,metalness:0,transparent:true,opacity:1});
 const response=await fetch('assets/model/manifest.json?v=b6ff2c9-0020');if(!response.ok)throw Error('Model dizini yüklenemedi');const manifest=await response.json();
 const cache=new Map();let request=0,running=true,lastId='',activeBone,angle=0,targetAngle=0,tilt=.08,targetTilt=.08,frame,mainCenter=new THREE.Vector3(),closeCenter=new THREE.Vector3(),mainSize=100,closeSize=50,ready=false,mainBox=new THREE.Box3(),closeBox=new THREE.Box3(),closeSide=0,closeTargets=[];
 const camera=new THREE.OrthographicCamera(-200,200,200,-200,.1,5000);camera.position.set(0,0,2000);camera.lookAt(0,0,0);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const observer=new ResizeObserver(()=>{const {width,height}=canvas.getBoundingClientRect();renderer.setSize(width,height,false);closeRenderer.setSize(closeCanvas.clientWidth,closeCanvas.clientHeight,false)});observer.observe(canvas);
 async function load(region){
  if(cache.has(region)){const v=cache.get(region);cache.delete(region);cache.set(region,v);return v;}
  const res=await fetch(`assets/model/${region==='skull'?'skull':region}.bin?v=b6ff2c9-0020`);if(!res.ok)throw Error('Bölge yüklenemedi');const buffer=await res.arrayBuffer(),group=new THREE.Group();
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
   for(const m of meshes){const active=b.meshes.includes(m.name);m.material=active?red:gray;m.renderOrder=active?2:0;whole.union(m.geometry.boundingBox);if(active)target.union(m.geometry.boundingBox);}
   if(target.isEmpty())throw Error('Kemik ağı bulunamadı');
   whole.getCenter(mainCenter);target.getCenter(closeCenter);mainBox.copy(whole);closeBox.copy(target);
   const size=whole.getSize(new THREE.Vector3());mainSize=Math.max(size.y,size.x,size.z)*.56;
   // For long paired limbs, provide a full regional context in the main view.
   const ts=target.getSize(new THREE.Vector3());closeSize=Math.max(ts.x,ts.y,ts.z)*.65;
   // A bilateral target has lateral centers on both sides of the midline.
   // Central chains (vertebrae, sternum) must retain their entire target.
   const targets=meshes.filter(m=>b.meshes.includes(m.name));
   const lateralThreshold=Math.max(3,ts.x*.15);
   const centers=targets.map(m=>m.geometry.boundingBox.getCenter(new THREE.Vector3()).x);
   closeSide=centers.some(x=>x>lateralThreshold)&&centers.some(x=>x< -lateralThreshold)?Math.sign(centers[0]):0;
   if(closeSide){
    closeBox.makeEmpty();
    for(const m of targets)if(Math.sign(m.geometry.boundingBox.getCenter(new THREE.Vector3()).x)===closeSide)closeBox.union(m.geometry.boundingBox);
    closeBox.getCenter(closeCenter);
   }
   for(const m of meshes){
    const x=m.geometry.boundingBox.getCenter(new THREE.Vector3()).x;
    m.userData.closeVisible=!closeSide||Math.abs(x)<3||Math.sign(x)===closeSide;
   }
   closeTargets=targets.filter(m=>m.userData.closeVisible);
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
   pivot.position.set(0,0,0);
   const rotation=new THREE.Euler(t,a,0),point=new THREE.Vector3();
   if(close){
    // Fit the actual projected vertices, not a rotated axis-aligned box, which
    // excessively shrinks oblique wrists/feet. Refit during the turn as well.
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    for(const m of closeTargets){const p=m.geometry.attributes.position;for(let i=0;i<p.count;i++){
     point.fromBufferAttribute(p,i).sub(center).applyEuler(rotation);
     minX=Math.min(minX,point.x);maxX=Math.max(maxX,point.x);minY=Math.min(minY,point.y);maxY=Math.max(maxY,point.y);
    }}
    pivot.position.set(-(minX+maxX)/2,-(minY+maxY)/2,0);
    scale=Math.max((maxY-minY)/2,(maxX-minX)/2/(vw/vh))*2.0;
   }else if(activeBone.region!=='knee'){
    let extentX=0,extentY=0;
    for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
     point.set(x,y,z).sub(centerForFit).applyEuler(rotation);extentX=Math.max(extentX,Math.abs(point.x));extentY=Math.max(extentY,Math.abs(point.y));
    }
    scale=Math.max(extentY,extentX/(vw/vh))*1.12;
   }
   camera.left=-scale*vw/vh;camera.right=scale*vw/vh;camera.top=scale;camera.bottom=-scale;camera.updateProjectionMatrix();
   root.position.copy(center).multiplyScalar(-1);pivot.rotation.set(t,a,0);
   for(const g of root.children)for(const m of g.children)m.visible=!close||m.userData.closeVisible;
   gray.uniforms.edgeFade.value=close;
   output.getDrawingBufferSize(gray.uniforms.viewSize.value);
   output.render(scene,camera);
  }
  view(w*(mobile?.02:.16),10,w*(mobile?.74:.62),h-20,angle+drift,tilt,mainSize,mainCenter,false);
  view(0,0,closeCanvas.clientWidth,closeCanvas.clientHeight,angle+Math.PI*.65+(reduced?0:now*.00008),tilt-.18,closeSize,closeCenter,true);
 }
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;document.querySelector('#loading').hidden=false;document.querySelector('#loading').textContent='Görüntü durdu. Sayfayı yenileyerek devam edebilirsiniz.';});
 frame=requestAnimationFrame(draw);
 return {setBone,dispose(){running=false;cancelAnimationFrame(frame);observer.disconnect();for(const g of cache.values())g.traverse(m=>m.geometry?.dispose());gray.dispose();red.dispose();renderer.dispose();closeRenderer.dispose();closeCanvas.remove();}};
}
