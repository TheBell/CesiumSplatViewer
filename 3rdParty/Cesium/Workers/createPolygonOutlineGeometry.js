/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.113
 *
 * Copyright 2011-2022 Cesium Contributors
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
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a}from"./chunk-LL2WZQCL.js";import{a as b}from"./chunk-HZIHTLAG.js";import{a as W}from"./chunk-ORZVJTGO.js";import{a as V}from"./chunk-U6DTV3QJ.js";import"./chunk-6DAVGPDG.js";import"./chunk-7QABODOW.js";import{a as D}from"./chunk-AKJT5PX3.js";import{a as F}from"./chunk-5AYKYXSM.js";import"./chunk-7B4HF6KA.js";import{a as j,b as k}from"./chunk-ZHUH7LAE.js";import"./chunk-DJQLSPGH.js";import"./chunk-XKM7KPIL.js";import"./chunk-GRJNEOGG.js";import"./chunk-VNVZTCOJ.js";import{a as M}from"./chunk-MPKNGXNB.js";import{a as B}from"./chunk-FJLRBJVR.js";import{b as U,c as C,d as S}from"./chunk-J5MMCAQH.js";import{d as z}from"./chunk-SUWCXIJL.js";import"./chunk-S33R2VDU.js";import"./chunk-CPATWQME.js";import{a as w}from"./chunk-7L2366HQ.js";import{a as v,d as y}from"./chunk-4KJB5WPM.js";import{a as T}from"./chunk-TMRPEJD4.js";import"./chunk-SE4VZQCC.js";import"./chunk-DCSR3CQL.js";import{a as P}from"./chunk-G5CUMCNC.js";import{a as G,b as A}from"./chunk-G3JRBJ3F.js";import{e as O}from"./chunk-55SYPJAW.js";var Y=[],R=[];function K(e,t,r,H,l){let p=F.fromPoints(t,e).projectPointsOntoPlane(t,Y);k.computeWindingOrder2D(p)===j.CLOCKWISE&&(p.reverse(),t=t.slice().reverse());let n,i,o=t.length,c=0;if(H)for(n=new Float64Array(o*2*3),i=0;i<o;i++){let u=t[i],h=t[(i+1)%o];n[c++]=u.x,n[c++]=u.y,n[c++]=u.z,n[c++]=h.x,n[c++]=h.y,n[c++]=h.z}else{let u=0;if(l===b.GEODESIC)for(i=0;i<o;i++)u+=a.subdivideLineCount(t[i],t[(i+1)%o],r);else if(l===b.RHUMB)for(i=0;i<o;i++)u+=a.subdivideRhumbLineCount(e,t[i],t[(i+1)%o],r);for(n=new Float64Array(u*3),i=0;i<o;i++){let h;l===b.GEODESIC?h=a.subdivideLine(t[i],t[(i+1)%o],r,R):l===b.RHUMB&&(h=a.subdivideRhumbLine(e,t[i],t[(i+1)%o],r,R));let g=h.length;for(let d=0;d<g;++d)n[c++]=h[d]}}o=n.length/3;let f=o*2,m=M.createTypedArray(o,f);for(c=0,i=0;i<o-1;i++)m[c++]=i,m[c++]=i+1;return m[c++]=o-1,m[c++]=0,new W({geometry:new C({attributes:new B({position:new S({componentDatatype:w.DOUBLE,componentsPerAttribute:3,values:n})}),indices:m,primitiveType:U.LINES})})}function q(e,t,r,H,l){let p=F.fromPoints(t,e).projectPointsOntoPlane(t,Y);k.computeWindingOrder2D(p)===j.CLOCKWISE&&(p.reverse(),t=t.slice().reverse());let n,i,o=t.length,c=new Array(o),f=0;if(H)for(n=new Float64Array(o*2*3*2),i=0;i<o;++i){c[i]=f/3;let g=t[i],d=t[(i+1)%o];n[f++]=g.x,n[f++]=g.y,n[f++]=g.z,n[f++]=d.x,n[f++]=d.y,n[f++]=d.z}else{let g=0;if(l===b.GEODESIC)for(i=0;i<o;i++)g+=a.subdivideLineCount(t[i],t[(i+1)%o],r);else if(l===b.RHUMB)for(i=0;i<o;i++)g+=a.subdivideRhumbLineCount(e,t[i],t[(i+1)%o],r);for(n=new Float64Array(g*3*2),i=0;i<o;++i){c[i]=f/3;let d;l===b.GEODESIC?d=a.subdivideLine(t[i],t[(i+1)%o],r,R):l===b.RHUMB&&(d=a.subdivideRhumbLine(e,t[i],t[(i+1)%o],r,R));let E=d.length;for(let N=0;N<E;++N)n[f++]=d[N]}}o=n.length/(3*2);let m=c.length,u=(o*2+m)*2,h=M.createTypedArray(o+m,u);for(f=0,i=0;i<o;++i)h[f++]=i,h[f++]=(i+1)%o,h[f++]=i+o,h[f++]=(i+1)%o+o;for(i=0;i<m;i++){let g=c[i];h[f++]=g,h[f++]=g+o}return new W({geometry:new C({attributes:new B({position:new S({componentDatatype:w.DOUBLE,componentsPerAttribute:3,values:n})}),indices:h,primitiveType:U.LINES})})}function L(e){if(A.typeOf.object("options",e),A.typeOf.object("options.polygonHierarchy",e.polygonHierarchy),e.perPositionHeight&&O(e.height))throw new G("Cannot use both options.perPositionHeight and options.height");if(O(e.arcType)&&e.arcType!==b.GEODESIC&&e.arcType!==b.RHUMB)throw new G("Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.");let t=e.polygonHierarchy,r=P(e.ellipsoid,y.WGS84),H=P(e.granularity,T.RADIANS_PER_DEGREE),l=P(e.perPositionHeight,!1),_=l&&O(e.extrudedHeight),p=P(e.arcType,b.GEODESIC),s=P(e.height,0),n=P(e.extrudedHeight,s);if(!_){let i=Math.max(s,n);n=Math.min(s,n),s=i}this._ellipsoid=y.clone(r),this._granularity=H,this._height=s,this._extrudedHeight=n,this._arcType=p,this._polygonHierarchy=t,this._perPositionHeight=l,this._perPositionHeightExtrude=_,this._offsetAttribute=e.offsetAttribute,this._workerName="createPolygonOutlineGeometry",this.packedLength=a.computeHierarchyPackedLength(t,v)+y.packedLength+8}L.pack=function(e,t,r){return A.typeOf.object("value",e),A.defined("array",t),r=P(r,0),r=a.packPolygonHierarchy(e._polygonHierarchy,t,r,v),y.pack(e._ellipsoid,t,r),r+=y.packedLength,t[r++]=e._height,t[r++]=e._extrudedHeight,t[r++]=e._granularity,t[r++]=e._perPositionHeightExtrude?1:0,t[r++]=e._perPositionHeight?1:0,t[r++]=e._arcType,t[r++]=P(e._offsetAttribute,-1),t[r]=e.packedLength,t};var J=y.clone(y.UNIT_SPHERE),Q={polygonHierarchy:{}};L.unpack=function(e,t,r){A.defined("array",e),t=P(t,0);let H=a.unpackPolygonHierarchy(e,t,v);t=H.startingIndex,delete H.startingIndex;let l=y.unpack(e,t,J);t+=y.packedLength;let _=e[t++],p=e[t++],s=e[t++],n=e[t++]===1,i=e[t++]===1,o=e[t++],c=e[t++],f=e[t];return O(r)||(r=new L(Q)),r._polygonHierarchy=H,r._ellipsoid=y.clone(l,r._ellipsoid),r._height=_,r._extrudedHeight=p,r._granularity=s,r._perPositionHeight=i,r._perPositionHeightExtrude=n,r._arcType=o,r._offsetAttribute=c===-1?void 0:c,r.packedLength=f,r};L.fromPositions=function(e){e=P(e,P.EMPTY_OBJECT),A.defined("options.positions",e.positions);let t={polygonHierarchy:{positions:e.positions},height:e.height,extrudedHeight:e.extrudedHeight,ellipsoid:e.ellipsoid,granularity:e.granularity,perPositionHeight:e.perPositionHeight,arcType:e.arcType,offsetAttribute:e.offsetAttribute};return new L(t)};L.createGeometry=function(e){let t=e._ellipsoid,r=e._granularity,H=e._polygonHierarchy,l=e._perPositionHeight,_=e._arcType,p=a.polygonOutlinesFromHierarchy(H,!l,t);if(p.length===0)return;let s,n=[],i=T.chordLength(r,t.maximumRadius),o=e._height,c=e._extrudedHeight,f=e._perPositionHeightExtrude||!T.equalsEpsilon(o,c,0,T.EPSILON2),m,u;if(f)for(u=0;u<p.length;u++){if(s=q(t,p[u],i,l,_),s.geometry=a.scaleToGeodeticHeightExtruded(s.geometry,o,c,t,l),O(e._offsetAttribute)){let d=s.geometry.attributes.position.values.length/3,E=new Uint8Array(d);e._offsetAttribute===D.TOP?E=E.fill(1,0,d/2):(m=e._offsetAttribute===D.NONE?0:1,E=E.fill(m)),s.geometry.attributes.applyOffset=new S({componentDatatype:w.UNSIGNED_BYTE,componentsPerAttribute:1,values:E})}n.push(s)}else for(u=0;u<p.length;u++){if(s=K(t,p[u],i,l,_),s.geometry.attributes.position.values=k.scaleToGeodeticHeight(s.geometry.attributes.position.values,o,t,!l),O(e._offsetAttribute)){let d=s.geometry.attributes.position.values.length;m=e._offsetAttribute===D.NONE?0:1;let E=new Uint8Array(d/3).fill(m);s.geometry.attributes.applyOffset=new S({componentDatatype:w.UNSIGNED_BYTE,componentsPerAttribute:1,values:E})}n.push(s)}let h=V.combineInstances(n)[0],g=z.fromVertices(h.attributes.position.values);return new C({attributes:h.attributes,indices:h.indices,primitiveType:h.primitiveType,boundingSphere:g,offsetAttribute:e._offsetAttribute})};var x=L;function X(e,t){return O(t)&&(e=x.unpack(e,t)),e._ellipsoid=y.clone(e._ellipsoid),x.createGeometry(e)}var Oe=X;export{Oe as default};
