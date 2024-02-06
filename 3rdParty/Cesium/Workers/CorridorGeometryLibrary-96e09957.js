/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./when-4ca4e419","./Math-c0afb7aa","./Cartesian2-0cd32dae","./Transforms-54271159","./PolylineVolumeGeometryLibrary-b709d38d","./PolylinePipeline-c72ac869"],function(a,o,U,G,c,I,q){"use strict";var e={},j=new G.Cartesian3,p=new G.Cartesian3,m=new G.Cartesian3,g=new G.Cartesian3,k=[new G.Cartesian3,new G.Cartesian3],F=new G.Cartesian3,H=new G.Cartesian3,J=new G.Cartesian3,K=new G.Cartesian3,W=new G.Cartesian3,X=new G.Cartesian3,Y=new G.Cartesian3,Z=new G.Cartesian3,$=new G.Cartesian3,_=new G.Cartesian3,d=new c.Quaternion,h=new c.Matrix3;function aa(a,e,r,n,t){var i,s=G.Cartesian3.angleBetween(G.Cartesian3.subtract(e,a,j),G.Cartesian3.subtract(r,a,p)),o=n===I.CornerType.BEVELED?1:Math.ceil(s/U.CesiumMath.toRadians(5))+1,C=3*o,l=new Array(C);l[C-3]=r.x,l[C-2]=r.y,l[C-1]=r.z,i=t?c.Matrix3.fromQuaternion(c.Quaternion.fromAxisAngle(G.Cartesian3.negate(a,j),s/o,d),h):c.Matrix3.fromQuaternion(c.Quaternion.fromAxisAngle(a,s/o,d),h);var y=0;e=G.Cartesian3.clone(e,j);for(var u=0;u<o;u++)e=c.Matrix3.multiplyByVector(i,e,e),l[y++]=e.x,l[y++]=e.y,l[y++]=e.z;return l}function ea(a,e,r,n){var t=j;return[(t=(n||(e=G.Cartesian3.negate(e,e)),G.Cartesian3.add(a,e,t))).x,t.y,t.z,r.x,r.y,r.z]}function ra(a,e,r,n){for(var t=new Array(a.length),i=new Array(a.length),s=G.Cartesian3.multiplyByScalar(e,r,j),o=G.Cartesian3.negate(s,p),C=0,l=a.length-1,y=0;y<a.length;y+=3){var u=G.Cartesian3.fromArray(a,y,m),c=G.Cartesian3.add(u,o,g);t[C++]=c.x,t[C++]=c.y,t[C++]=c.z;var d=G.Cartesian3.add(u,s,g);i[l--]=d.z,i[l--]=d.y,i[l--]=d.x}return n.push(t,i),n}e.addAttribute=function(a,e,r,n){var t=e.x,i=e.y,s=e.z;o.defined(r)&&(a[r]=t,a[r+1]=i,a[r+2]=s),o.defined(n)&&(a[n]=s,a[n-1]=i,a[n-2]=t)};var na=new G.Cartesian3,ta=new G.Cartesian3;e.computePositions=function(a){var e=a.granularity,r=a.positions,n=a.ellipsoid,t=a.width/2,i=a.cornerType,s=a.saveAttributes,o=F,C=H,l=J,y=K,u=W,c=X,d=Y,p=Z,m=$,g=_,h=[],f=s?[]:void 0,w=s?[]:void 0,z=r[0],x=r[1],C=G.Cartesian3.normalize(G.Cartesian3.subtract(x,z,C),C),o=n.geodeticSurfaceNormal(z,o),y=G.Cartesian3.normalize(G.Cartesian3.cross(o,C,y),y);s&&(f.push(y.x,y.y,y.z),w.push(o.x,o.y,o.z)),d=G.Cartesian3.clone(z,d),z=x,l=G.Cartesian3.negate(C,l);for(var P,v,A,B,E,S,b,D,M,T=[],N=r.length,L=1;L<N-1;L++){o=n.geodeticSurfaceNormal(z,o),x=r[L+1],C=G.Cartesian3.normalize(G.Cartesian3.subtract(x,z,C),C),u=G.Cartesian3.normalize(G.Cartesian3.add(C,l,u),u);var O=G.Cartesian3.multiplyByScalar(o,G.Cartesian3.dot(C,o),na);G.Cartesian3.subtract(C,O,O),G.Cartesian3.normalize(O,O);var R,V,Q=G.Cartesian3.multiplyByScalar(o,G.Cartesian3.dot(l,o),ta);G.Cartesian3.subtract(l,Q,Q),G.Cartesian3.normalize(Q,Q),U.CesiumMath.equalsEpsilon(Math.abs(G.Cartesian3.dot(O,Q)),1,U.CesiumMath.EPSILON7)||(u=G.Cartesian3.cross(u,o,u),u=G.Cartesian3.cross(o,u,u),u=G.Cartesian3.normalize(u,u),R=t/Math.max(.25,G.Cartesian3.magnitude(G.Cartesian3.cross(u,l,j))),V=I.PolylineVolumeGeometryLibrary.angleIsGreaterThanPi(C,l,z,n),u=G.Cartesian3.multiplyByScalar(u,R,u),V?(p=G.Cartesian3.add(z,u,p),g=G.Cartesian3.add(p,G.Cartesian3.multiplyByScalar(y,t,g),g),m=G.Cartesian3.add(p,G.Cartesian3.multiplyByScalar(y,2*t,m),m),k[0]=G.Cartesian3.clone(d,k[0]),k[1]=G.Cartesian3.clone(g,k[1]),h=ra(q.PolylinePipeline.generateArc({positions:k,granularity:e,ellipsoid:n}),y,t,h),s&&(f.push(y.x,y.y,y.z),w.push(o.x,o.y,o.z)),c=G.Cartesian3.clone(m,c),y=G.Cartesian3.normalize(G.Cartesian3.cross(o,C,y),y),m=G.Cartesian3.add(p,G.Cartesian3.multiplyByScalar(y,2*t,m),m),d=G.Cartesian3.add(p,G.Cartesian3.multiplyByScalar(y,t,d),d),i===I.CornerType.ROUNDED||i===I.CornerType.BEVELED?T.push({leftPositions:aa(p,c,m,i,V)}):T.push({leftPositions:ea(z,G.Cartesian3.negate(u,u),m,V)})):(m=G.Cartesian3.add(z,u,m),g=G.Cartesian3.add(m,G.Cartesian3.negate(G.Cartesian3.multiplyByScalar(y,t,g),g),g),p=G.Cartesian3.add(m,G.Cartesian3.negate(G.Cartesian3.multiplyByScalar(y,2*t,p),p),p),k[0]=G.Cartesian3.clone(d,k[0]),k[1]=G.Cartesian3.clone(g,k[1]),h=ra(q.PolylinePipeline.generateArc({positions:k,granularity:e,ellipsoid:n}),y,t,h),s&&(f.push(y.x,y.y,y.z),w.push(o.x,o.y,o.z)),c=G.Cartesian3.clone(p,c),y=G.Cartesian3.normalize(G.Cartesian3.cross(o,C,y),y),p=G.Cartesian3.add(m,G.Cartesian3.negate(G.Cartesian3.multiplyByScalar(y,2*t,p),p),p),d=G.Cartesian3.add(m,G.Cartesian3.negate(G.Cartesian3.multiplyByScalar(y,t,d),d),d),i===I.CornerType.ROUNDED||i===I.CornerType.BEVELED?T.push({rightPositions:aa(m,c,p,i,V)}):T.push({rightPositions:ea(z,u,p,V)})),l=G.Cartesian3.negate(C,l)),z=x}return o=n.geodeticSurfaceNormal(z,o),k[0]=G.Cartesian3.clone(d,k[0]),k[1]=G.Cartesian3.clone(z,k[1]),h=ra(q.PolylinePipeline.generateArc({positions:k,granularity:e,ellipsoid:n}),y,t,h),s&&(f.push(y.x,y.y,y.z),w.push(o.x,o.y,o.z)),i===I.CornerType.ROUNDED&&(A=F,B=H,E=J,S=(v=h)[1],B=G.Cartesian3.fromArray(v[1],S.length-3,B),E=G.Cartesian3.fromArray(v[0],0,E),b=aa(A=G.Cartesian3.midpoint(B,E,A),B,E,I.CornerType.ROUNDED,!1),D=v.length-1,M=v[D-1],S=v[D],B=G.Cartesian3.fromArray(M,M.length-3,B),E=G.Cartesian3.fromArray(S,0,E),P=[b,aa(A=G.Cartesian3.midpoint(B,E,A),B,E,I.CornerType.ROUNDED,!1)]),{positions:h,corners:T,lefts:f,normals:w,endPositions:P}},a.CorridorGeometryLibrary=e});
