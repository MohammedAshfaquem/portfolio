import * as THREE from 'three';

function roundedPath(path,x,y,width,height,radius){
  path.moveTo(x+radius,y);path.lineTo(x+width-radius,y);
  path.quadraticCurveTo(x+width,y,x+width,y+radius);path.lineTo(x+width,y+height-radius);
  path.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);path.lineTo(x+radius,y+height);
  path.quadraticCurveTo(x,y+height,x,y+height-radius);path.lineTo(x,y+radius);
  path.quadraticCurveTo(x,y,x+radius,y);path.closePath();return path;
}
function cardShape(width,height,radius){
  const shape=roundedPath(new THREE.Shape(),-width/2,-height/2,width,height,radius);
  // A real opening, shared by the holder and both printed faces.
  shape.holes.push(roundedPath(new THREE.Path(),-.185,1.535,.37,.07,.035));
  return shape;
}
export function createBadgeBody(){
  const geometry=new THREE.ExtrudeGeometry(cardShape(2.57,3.43,.12),{depth:.1,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.012,bevelThickness:.012,curveSegments:20});
  geometry.translate(0,0,-.05);return geometry;
}
export function createBadgeFace(){
  const geometry=new THREE.ShapeGeometry(cardShape(2.44,3.26,.04),20);
  const positions=geometry.attributes.position,uv=geometry.attributes.uv;
  for(let i=0;i<positions.count;i++)uv.setXY(i,positions.getX(i)/2.44+.5,positions.getY(i)/3.26+.5);
  uv.needsUpdate=true;return geometry;
}
