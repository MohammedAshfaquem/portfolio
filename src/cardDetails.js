import * as THREE from 'three';

export function createCardBack(anisotropy) {
  const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=2730;
  const c=canvas.getContext('2d');
  c.fillStyle='#293524';c.fillRect(0,0,2048,2730);
  c.fillStyle='#c1d1a7';c.font='42px monospace';c.fillText('A LITTLE MORE ABOUT ME',110,160);
  c.font='165px Georgia';c.fillStyle='#eef0df';c.fillText('Thoughtful',110,455);c.fillText('by nature.',110,650);
  c.fillStyle='#a9bd8d';c.font='220px Arial';c.fillText('✳',1650,630);
  const rule=y=>{c.strokeStyle='#627253';c.lineWidth=3;c.beginPath();c.moveTo(110,y);c.lineTo(1938,y);c.stroke();};
  const label=(text,y)=>{c.fillStyle='#b0c498';c.font='40px monospace';c.fillText(text,110,y);};
  const text=(text,y,size=66)=>{c.fillStyle='#edf0e2';c.font=`${size}px Arial`;c.fillText(text,110,y);};
  rule(810);label('MY EVERYDAY TOOLKIT',945);text('Python · FastAPI · Django',1070);text('React · PostgreSQL',1175);
  rule(1315);label('BASED IN',1450);text('Kerala, India',1575,88);
  label('THE FOUNDATION',1770);text('Bachelor of Computer Applications',1880,61);text('University of Calicut · 2022–2025',1980,53);
  rule(2140);label('LET’S BUILD SOMETHING GOOD.',2275);text('ashfaquemvkpadi05@gmail.com',2390,56);
  c.font='bold 86px Arial';c.fillStyle='#eef0df';c.fillText('Ashfaque',110,2600);c.font='36px monospace';c.fillText('PERSONAL ID / 001',1450,2590);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=anisotropy;texture.generateMipmaps=false;texture.minFilter=THREE.LinearFilter;return texture;
}

export const ribbonSegments=64;
export const ribbonColumns=4;
export function createRibbonGeometry(){
  const geometry=new THREE.BufferGeometry();
  const positions=new Float32Array((ribbonSegments+1)*(ribbonColumns+1)*3);
  const uv=new Float32Array((ribbonSegments+1)*(ribbonColumns+1)*2),indices=[];
  for(let row=0;row<=ribbonSegments;row++)for(let col=0;col<=ribbonColumns;col++){
    const i=row*(ribbonColumns+1)+col;uv[i*2]=col/ribbonColumns;uv[i*2+1]=row/ribbonSegments;
    if(row<ribbonSegments&&col<ribbonColumns){const a=i,b=i+1,c=i+ribbonColumns+1,d=c+1;indices.push(a,c,b,b,c,d);}
  }
  geometry.setAttribute('position',new THREE.BufferAttribute(positions,3).setUsage(THREE.DynamicDrawUsage));geometry.setAttribute('uv',new THREE.BufferAttribute(uv,2));geometry.setIndex(indices);return geometry;
}

export function createRibbonTexture(){
  const canvas=document.createElement('canvas');canvas.width=128;canvas.height=512;const c=canvas.getContext('2d');
  c.fillStyle='#52633e';c.fillRect(0,0,128,512);
  c.fillStyle='#84976a';c.fillRect(6,0,3,512);c.fillRect(119,0,3,512);
  c.strokeStyle='#a1af843d';c.lineWidth=1;
  for(let y=0;y<512;y+=5){c.beginPath();c.moveTo(12,y);c.lineTo(116,y+2);c.stroke();}
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}
