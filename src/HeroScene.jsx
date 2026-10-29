import React, {Suspense, useEffect, useMemo, useRef} from 'react';
import {Canvas, events, useFrame, useThree} from '@react-three/fiber';
import {Line, RoundedBox} from '@react-three/drei';
import * as THREE from 'three';
import {createCardBack,createRibbonGeometry,createRibbonTexture,ribbonSegments,ribbonColumns} from './cardDetails';

// Keep the printed face unlit: studio lights should affect the holder, not bleach the type.
function createCardFace(anisotropy) {
  const canvas=document.createElement('canvas');
  canvas.width=2048; canvas.height=2730;
  const ctx=canvas.getContext('2d');
  const texture=new THREE.CanvasTexture(canvas);
  texture.colorSpace=THREE.SRGBColorSpace;
  texture.anisotropy=anisotropy;
  texture.minFilter=THREE.LinearFilter;
  texture.magFilter=THREE.LinearFilter;
  texture.generateMipmaps=false;
  const draw=image=>{
    ctx.fillStyle='#f5f4ea';ctx.fillRect(0,0,2048,2730);
    ctx.fillStyle='#333c2e';ctx.font='500 41px Arial';
    ctx.fillText('THE HUMAN BEHIND THE CODE',100,145);
    ctx.font='78px Arial';ctx.fillText('↗',1850,156);
    ctx.strokeStyle='#bac1ad';ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(100,215);ctx.lineTo(1948,215);ctx.stroke();
    ctx.fillStyle='#cbd2bc';ctx.fillRect(100,280,1848,1490);
    ctx.save();ctx.beginPath();ctx.rect(100,280,1848,1490);ctx.clip();
    ctx.fillStyle='#edf0df';ctx.font='italic 420px Georgia';ctx.fillText('hello.',130,850);
    if(image)ctx.drawImage(image,220,0,650,525,100,280,1848,1490);
    ctx.restore();
    ctx.fillStyle='#252c22';ctx.font='bold 143px Arial';
    ctx.fillText('Mohammed',100,1985);ctx.fillText('Ashfaque',100,2150);
    ctx.font='58px Arial';ctx.fillText('Python / Full-stack developer',100,2280);
    ctx.fillStyle='#5f7047';ctx.font='160px Arial';ctx.fillText('✳',1775,2135);
    ctx.beginPath();ctx.moveTo(100,2370);ctx.lineTo(1948,2370);ctx.stroke();
    ctx.fillStyle='#252c22';
    for(let i=0;i<75;i++)ctx.fillRect(100+i*9,2430,2+(i%4)*1.5,155);
    ctx.font='41px monospace';ctx.fillText('HUMAN / DEVELOPER',930,2475);
    ctx.font='bold 46px monospace';ctx.fillText('KERALA, INDIA',930,2555);
    ctx.font='35px monospace';ctx.fillText('PERSONAL ID — 001',930,2615);
    texture.needsUpdate=true;
  };
  draw();const image=new Image();image.onload=()=>draw(image);image.src='/portrait.png';
  return texture;
}

function HangingCard({reset,flipped,onDrag,heroRef}) {
  const {size,camera,gl}=useThree();
  const zoom=size.width<430?100:size.width<760?125:145;
  const worldWidth=size.width/zoom,worldHeight=size.height/zoom;
  const mobile=size.width<760;
  const home=useMemo(()=>new THREE.Vector3(mobile?.12:worldWidth*.255,mobile?-worldHeight*.235:worldHeight*.09,0),[mobile,worldWidth,worldHeight]);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const badge=useRef(),stitch=useRef(),farStitch=useRef(),sheen=useRef();
  const position=useRef(home.clone()),velocity=useRef(new THREE.Vector3()),target=useRef(home.clone());
  const dragging=useRef(false),offset=useRef(new THREE.Vector3()),last=useRef(new THREE.Vector3()),lastTime=useRef(0);
  const cardScale=mobile?.82:1;
  const face=useMemo(()=>createCardFace(gl.capabilities.getMaxAnisotropy()),[gl]);
  const back=useMemo(()=>createCardBack(gl.capabilities.getMaxAnisotropy()),[gl]);
  const ribbon=useMemo(createRibbonGeometry,[]),ribbonTexture=useMemo(createRibbonTexture,[]);
  const curve=useMemo(()=>new THREE.CatmullRomCurve3(Array.from({length:4},()=>new THREE.Vector3())),[]);
  const sheenMaterial=useMemo(()=>new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{time:{value:0}},vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec2 vUv; uniform float time; void main(){float stripe=pow(max(0.0,1.0-abs(vUv.x+vUv.y*.4-mod(time*.12,2.0)+.5)*7.0),3.0);gl_FragColor=vec4(1.,1.,1.,stripe*.12);}'}),[]);
  useEffect(()=>{camera.zoom=zoom;camera.updateProjectionMatrix();position.current.copy(home);target.current.copy(home);velocity.current.set(0,0,0);},[zoom,camera,home]);
  useEffect(()=>()=>{face.dispose();back.dispose();ribbon.dispose();ribbonTexture.dispose();sheenMaterial.dispose();},[face,back,ribbon,ribbonTexture,sheenMaterial]);
  useEffect(()=>{dragging.current=false;target.current.copy(home);velocity.current.set(0,0,0);onDrag(false);document.body.style.cursor='';},[reset,home,onDrag]);
  const release=e=>{
    if(!dragging.current)return;
    dragging.current=false;onDrag(false);document.body.style.cursor='';
    if(e?.target?.hasPointerCapture?.(e.pointerId))e.target.releasePointerCapture(e.pointerId);
  };
  useEffect(()=>{const cancel=()=>release();window.addEventListener('blur',cancel);return()=>{window.removeEventListener('blur',cancel);document.body.style.cursor='';};},[]);
  const pointerPosition=e=>{
    const rect=heroRef.current.getBoundingClientRect();
    return new THREE.Vector3((e.clientX-rect.left-size.width/2)/zoom,-(e.clientY-rect.top-size.height/2)/zoom,0);
  };
  useFrame(({clock},dt)=>{
    dt=Math.min(dt,.035);
    const p=position.current;
    if(!dragging.current){
      velocity.current.addScaledVector(home.clone().sub(p),dt*34);
      velocity.current.multiplyScalar(Math.exp(-dt*5.3));
      p.addScaledVector(velocity.current,dt);
    }else p.lerp(target.current,1-Math.exp(-dt*28));
    if(badge.current){
      badge.current.position.copy(p);
      const displacement=p.x-home.x;
      badge.current.rotation.z=THREE.MathUtils.damp(badge.current.rotation.z,-.045+displacement*.075+velocity.current.x*.025,7,dt);
      const yaw=(flipped?Math.PI:0)-.075+(dragging.current?displacement*.045:0);
      badge.current.rotation.y=reduced?yaw:THREE.MathUtils.damp(badge.current.rotation.y,yaw,7,dt);
    }
    const angle=badge.current?.rotation.z||0;
    const top=new THREE.Vector3(-Math.sin(angle)*1.84*cardScale,Math.cos(angle)*1.84*cardScale,0).add(p);
    const anchor=new THREE.Vector3(home.x-.1,mobile?home.y+3:worldHeight/2+.2,-.1);
    curve.points[0].copy(anchor);
    curve.points[1].copy(anchor).lerp(top,.35);
    curve.points[2].copy(anchor).lerp(top,.75);curve.points[2].x+=(p.x-home.x)*.1;
    curve.points[3].copy(top);
    // The top stays fixed while the lower ribbon follows the card's actual yaw.
    // A surface ribbon (rather than a flat line) makes the half-twist visible.
    const positions=ribbon.attributes.position,nearEdge=[],farEdge=[];
    const yaw=badge.current?.rotation.y||0;
    for(let row=0;row<=ribbonSegments;row++){
      const t=row/ribbonSegments,center=curve.getPoint(t),tangent=curve.getTangent(t).normalize();
      let side=new THREE.Vector3(1,0,0).projectOnPlane(tangent);
      if(side.lengthSq()<.001)side.set(0,0,1).projectOnPlane(tangent);
      side.normalize().applyAxisAngle(tangent,-yaw*t*t*(3-2*t));
      const normal=new THREE.Vector3().crossVectors(side,tangent).normalize();
      for(let col=0;col<=ribbonColumns;col++){
        const u=col/ribbonColumns,p=center.clone().addScaledVector(side,(u-.5)*.135).addScaledVector(normal,Math.sin(u*Math.PI)*.006);
        positions.setXYZ(row*(ribbonColumns+1)+col,p.x,p.y,p.z);
        if(col===0)nearEdge.push(p.x,p.y,p.z);if(col===ribbonColumns)farEdge.push(p.x,p.y,p.z);
      }
    }
    positions.needsUpdate=true;ribbon.computeVertexNormals();ribbon.computeBoundingSphere();
    stitch.current?.geometry.setPositions(nearEdge);farStitch.current?.geometry.setPositions(farEdge);
    sheenMaterial.uniforms.time.value=reduced?0:clock.elapsedTime;
  });
  return <>
    <mesh geometry={ribbon} raycast={()=>null} frustumCulled={false}><meshStandardMaterial map={ribbonTexture} side={THREE.DoubleSide} roughness={.85} metalness={.05}/></mesh>
    <Line ref={stitch} points={[[home.x,0,0],[home.x,1,0]]} color="#93a477" lineWidth={.8} raycast={()=>null}/>
    <Line ref={farStitch} points={[[home.x,0,0],[home.x,1,0]]} color="#334528" lineWidth={.8} raycast={()=>null}/>
    <group ref={badge} position={home.toArray()} scale={cardScale}
      onPointerDown={e=>{e.stopPropagation();e.nativeEvent.preventDefault();target.current.copy(position.current);velocity.current.set(0,0,0);dragging.current=true;onDrag(true);offset.current.copy(position.current).sub(pointerPosition(e));last.current.copy(position.current);lastTime.current=performance.now();e.target.setPointerCapture(e.pointerId);document.body.style.cursor='grabbing';}}
      onPointerMove={e=>{if(!dragging.current)return;e.stopPropagation();const next=pointerPosition(e).add(offset.current);const halfCard=1.28*cardScale;next.x=THREE.MathUtils.clamp(next.x,-worldWidth/2+halfCard,worldWidth/2-halfCard);next.y=THREE.MathUtils.clamp(next.y,-worldHeight/2+1.8*cardScale,worldHeight/2-1.8*cardScale);const now=performance.now(),dt=Math.max(.016,(now-lastTime.current)/1000);velocity.current.copy(next).sub(last.current).divideScalar(dt).clampLength(0,9);target.current.copy(next);last.current.copy(next);lastTime.current=now;}}
      onPointerUp={e=>{e.stopPropagation();release(e);}}
      onPointerCancel={release}
      onPointerOver={()=>{if(!dragging.current)document.body.style.cursor='grab';}}
      onPointerOut={()=>{if(!dragging.current)document.body.style.cursor='';}}>
      <RoundedBox args={[2.57,3.43,.12]} radius={.12} smoothness={8}><meshPhysicalMaterial color="#dce0d1" metalness={.22} roughness={.3} clearcoat={1}/></RoundedBox>
      <mesh position={[0,0,.071]}><planeGeometry args={[2.44,3.26]}/><meshBasicMaterial map={face} toneMapped={false}/></mesh>
      <mesh position={[0,0,-.071]} rotation={[0,Math.PI,0]}><planeGeometry args={[2.44,3.26]}/><meshBasicMaterial map={back} toneMapped={false}/></mesh>
      <mesh ref={sheen} position={[0,0,.075]} raycast={()=>null}><planeGeometry args={[2.44,3.26]}/><primitive object={sheenMaterial} attach="material"/></mesh>
      <mesh position={[0,1.91,0]}><torusGeometry args={[.15,.033,16,40]}/><meshStandardMaterial color="#bfc3b8" metalness={1} roughness={.22}/></mesh>
      <RoundedBox args={[.42,.34,.17]} position={[0,1.73,.1]} radius={.055} smoothness={6}><meshStandardMaterial color="#b7bdaf" metalness={.85} roughness={.22}/></RoundedBox>
      <RoundedBox args={[.13,.21,.02]} position={[0,1.75,.195]} radius={.05}><meshStandardMaterial color="#6a7360" metalness={.7} roughness={.2}/></RoundedBox>
      <RoundedBox args={[.42,.34,.17]} position={[0,1.73,-.1]} radius={.055} smoothness={6}><meshStandardMaterial color="#b7bdaf" metalness={.85} roughness={.22}/></RoundedBox>
      <RoundedBox args={[.13,.21,.02]} position={[0,1.75,-.195]} radius={.05}><meshStandardMaterial color="#6a7360" metalness={.7} roughness={.2}/></RoundedBox>
    </group>
  </>;
}

class Fallback extends React.Component {
  state={error:false};static getDerivedStateFromError(){return {error:true};}
  render(){return this.state.error?<div className="fallback-card"><img src="/portrait.png" alt="Mohammed Ashfaque"/><strong>Mohammed Ashfaque</strong><span>Python / Full-stack developer</span></div>:this.props.children;}
}
export default function HeroScene({reset,flipped,heroRef,onDrag}) {
  return <Fallback><Canvas orthographic dpr={[1.5,2.5]} camera={{position:[0,0,10],zoom:145,near:.1,far:100}} gl={{alpha:true,antialias:true,powerPreference:'high-performance'}} eventSource={heroRef}
    events={state=>({...events(state),compute:(event,state)=>{const rect=heroRef.current?.getBoundingClientRect();if(!rect)return;const control=event.target?.closest?.('.hero-art button,.hero-copy a');if(control){state.pointer.set(100,100);}else{state.pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);}state.raycaster.setFromCamera(state.pointer,state.camera);}})}>
    <ambientLight intensity={1.3}/><directionalLight position={[3,5,5]} intensity={2}/><directionalLight position={[-5,2,3]} intensity={1} color="#e2e7d7"/>
    <Suspense fallback={null}><HangingCard reset={reset} flipped={flipped} heroRef={heroRef} onDrag={onDrag}/></Suspense>
  </Canvas></Fallback>;
}
