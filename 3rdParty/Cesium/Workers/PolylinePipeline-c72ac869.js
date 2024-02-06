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
define(["exports","./when-4ca4e419","./Check-430b3551","./Math-c0afb7aa","./Cartesian2-0cd32dae","./Transforms-54271159","./IntersectionTests-f6b67adc","./Plane-c1df5803","./EllipsoidRhumbLine-aeb03c9a","./EllipsoidGeodesic-f0d5153e"],function(a,T,e,w,P,y,v,m,b,r){"use strict";var A={numberOfPoints:function(a,e,r){var t=P.Cartesian3.distance(a,e);return Math.ceil(t/r)},numberOfPointsRhumbLine:function(a,e,r){var t=Math.pow(a.longitude-e.longitude,2)+Math.pow(a.latitude-e.latitude,2);return Math.ceil(Math.sqrt(t/(r*r)))}},o=new P.Cartographic;A.extractHeights=function(a,e){for(var r=a.length,t=new Array(r),n=0;n<r;n++){var i=a[n];t[n]=e.cartesianToCartographic(i,o).height}return t};var E=new y.Matrix4,S=new P.Cartesian3,R=new P.Cartesian3,M=new m.Plane(P.Cartesian3.UNIT_X,0),D=new P.Cartesian3,G=new m.Plane(P.Cartesian3.UNIT_X,0),x=new P.Cartesian3,N=new P.Cartesian3,I=[];function k(a,e,r){var t=I;if(t.length=a,e===r){for(i=0;i<a;i++)t[i]=e;return t}for(var n=(r-e)/a,i=0;i<a;i++){var o=e+i*n;t[i]=o}return t}var V=new P.Cartographic,L=new P.Cartographic,_=new P.Cartesian3,O=new P.Cartesian3,B=new P.Cartesian3,U=new r.EllipsoidGeodesic,z=new b.EllipsoidRhumbLine;A.wrapLongitude=function(a,e){var r=[],t=[];if(T.defined(a)&&0<a.length){e=T.defaultValue(e,y.Matrix4.IDENTITY);var n=y.Matrix4.inverseTransformation(e,E),i=y.Matrix4.multiplyByPoint(n,P.Cartesian3.ZERO,S),o=P.Cartesian3.normalize(y.Matrix4.multiplyByPointAsVector(n,P.Cartesian3.UNIT_Y,R),R),s=m.Plane.fromPointNormal(i,o,M),c=P.Cartesian3.normalize(y.Matrix4.multiplyByPointAsVector(n,P.Cartesian3.UNIT_X,D),D),l=m.Plane.fromPointNormal(i,c,G),u=1;r.push(P.Cartesian3.clone(a[0]));for(var h=r[0],f=a.length,C=1;C<f;++C){var g,d,p=a[C];(m.Plane.getPointDistance(l,h)<0||m.Plane.getPointDistance(l,p)<0)&&(g=v.IntersectionTests.lineSegmentPlane(h,p,s,x),T.defined(g)&&(d=P.Cartesian3.multiplyByScalar(o,5e-9,N),m.Plane.getPointDistance(s,h)<0&&P.Cartesian3.negate(d,d),r.push(P.Cartesian3.add(g,d,new P.Cartesian3)),t.push(u+1),P.Cartesian3.negate(d,d),r.push(P.Cartesian3.add(g,d,new P.Cartesian3)),u=1)),r.push(P.Cartesian3.clone(a[C])),u++,h=p}t.push(u)}return{positions:r,lengths:t}},A.generateArc=function(a){T.defined(a)||(a={});var e=a.positions,r=e.length,t=T.defaultValue(a.ellipsoid,P.Ellipsoid.WGS84),n=T.defaultValue(a.height,0),i=y.isArray(n);if(r<1)return[];if(1===r){var o,s=t.scaleToGeodeticSurface(e[0],O);return 0!==(n=i?n[0]:n)&&(o=t.geodeticSurfaceNormal(s,_),P.Cartesian3.multiplyByScalar(o,n,o),P.Cartesian3.add(s,o,s)),[s.x,s.y,s.z]}var c,l=a.minDistance;T.defined(l)||(c=T.defaultValue(a.granularity,w.CesiumMath.RADIANS_PER_DEGREE),l=w.CesiumMath.chordLength(c,t.maximumRadius));for(var u=0,h=0;h<r-1;h++)u+=A.numberOfPoints(e[h],e[h+1],l);var f=3*(u+1),C=new Array(f),g=0;for(h=0;h<r-1;h++)g=function(a,e,r,t,n,i,o,s){var c=t.scaleToGeodeticSurface(a,O),l=t.scaleToGeodeticSurface(e,B),u=A.numberOfPoints(a,e,r),h=t.cartesianToCartographic(c,V),f=t.cartesianToCartographic(l,L),C=k(u,n,i);U.setEndPoints(h,f);var g=U.surfaceDistance/u,d=s;h.height=n;var p=t.cartographicToCartesian(h,_);P.Cartesian3.pack(p,o,d),d+=3;for(var v=1;v<u;v++){var m=U.interpolateUsingSurfaceDistance(v*g,L);m.height=C[v],p=t.cartographicToCartesian(m,_),P.Cartesian3.pack(p,o,d),d+=3}return d}(e[h],e[h+1],l,t,i?n[h]:n,i?n[h+1]:n,C,g);I.length=0;var d=e[r-1],p=t.cartesianToCartographic(d,V);p.height=i?n[r-1]:n;var v=t.cartographicToCartesian(p,_);return P.Cartesian3.pack(v,C,f-3),C};var X=new P.Cartographic,q=new P.Cartographic;A.generateRhumbArc=function(a){T.defined(a)||(a={});var e=a.positions,r=e.length,t=T.defaultValue(a.ellipsoid,P.Ellipsoid.WGS84),n=T.defaultValue(a.height,0),i=y.isArray(n);if(r<1)return[];if(1===r){var o,s=t.scaleToGeodeticSurface(e[0],O);return 0!==(n=i?n[0]:n)&&(o=t.geodeticSurfaceNormal(s,_),P.Cartesian3.multiplyByScalar(o,n,o),P.Cartesian3.add(s,o,s)),[s.x,s.y,s.z]}for(var c,l=T.defaultValue(a.granularity,w.CesiumMath.RADIANS_PER_DEGREE),u=0,h=t.cartesianToCartographic(e[0],X),f=0;f<r-1;f++)c=t.cartesianToCartographic(e[f+1],q),u+=A.numberOfPointsRhumbLine(h,c,l),h=P.Cartographic.clone(c,X);var C=3*(u+1),g=new Array(C),d=0;for(f=0;f<r-1;f++)d=function(a,e,r,t,n,i,o,s){var c=t.scaleToGeodeticSurface(a,O),l=t.scaleToGeodeticSurface(e,B),u=t.cartesianToCartographic(c,V),h=t.cartesianToCartographic(l,L),f=A.numberOfPointsRhumbLine(u,h,r),C=k(f,n,i);z.ellipsoid.equals(t)||(z=new b.EllipsoidRhumbLine(void 0,void 0,t)),z.setEndPoints(u,h);var g=z.surfaceDistance/f,d=s;u.height=n;var p=t.cartographicToCartesian(u,_);P.Cartesian3.pack(p,o,d),d+=3;for(var v=1;v<f;v++){var m=z.interpolateUsingSurfaceDistance(v*g,L);m.height=C[v],p=t.cartographicToCartesian(m,_),P.Cartesian3.pack(p,o,d),d+=3}return d}(e[f],e[f+1],l,t,i?n[f]:n,i?n[f+1]:n,g,d);I.length=0;var p=e[r-1],v=t.cartesianToCartographic(p,V);v.height=i?n[r-1]:n;var m=t.cartographicToCartesian(v,_);return P.Cartesian3.pack(m,g,C-3),g},A.generateCartesianArc=function(a){for(var e=A.generateArc(a),r=e.length/3,t=new Array(r),n=0;n<r;n++)t[n]=P.Cartesian3.unpack(e,3*n);return t},A.generateCartesianRhumbArc=function(a){for(var e=A.generateRhumbArc(a),r=e.length/3,t=new Array(r),n=0;n<r;n++)t[n]=P.Cartesian3.unpack(e,3*n);return t},a.PolylinePipeline=A});
