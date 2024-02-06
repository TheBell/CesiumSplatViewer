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
define(["exports","./when-4ca4e419","./Math-c0afb7aa","./Cartesian2-0cd32dae","./EllipsoidTangentPlane-12912a91","./PolygonPipeline-97ae5e48","./PolylinePipeline-c72ac869"],function(e,C,A,f,w,E,O){"use strict";var i={};var b=new f.Cartographic,M=new f.Cartographic;function L(e,i,t,n){var r=i.length;if(!(r<2)){var a=C.defined(n),o=C.defined(t),l=!0,h=new Array(r),s=new Array(r),g=new Array(r),p=i[0];h[0]=p;var d=e.cartesianToCartographic(p,b);o&&(d.height=t[0]),l=l&&d.height<=0,s[0]=d.height,g[0]=a?n[0]:0;for(var P,c,u=1,v=1;v<r;++v){var y=i[v],m=e.cartesianToCartographic(y,M);o&&(m.height=t[v]),l=l&&m.height<=0,P=d,c=m,A.CesiumMath.equalsEpsilon(P.latitude,c.latitude,A.CesiumMath.EPSILON14)&&A.CesiumMath.equalsEpsilon(P.longitude,c.longitude,A.CesiumMath.EPSILON14)?d.height<m.height&&(s[u-1]=m.height):(h[u]=y,s[u]=m.height,g[u]=a?n[v]:0,f.Cartographic.clone(m,d),++u)}if(!(l||u<2))return h.length=u,s.length=u,g.length=u,{positions:h,topHeights:s,bottomHeights:g}}}var F=new Array(2),H=new Array(2),T={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};i.computePositions=function(e,i,t,n,r,a){var o,l=L(e,i,t,n);if(C.defined(l)){i=l.positions,t=l.topHeights,n=l.bottomHeights,3<=i.length&&(o=w.EllipsoidTangentPlane.fromPoints(i,e).projectPointsOntoPlane(i),E.PolygonPipeline.computeWindingOrder2D(o)===E.WindingOrder.CLOCKWISE&&(i.reverse(),t.reverse(),n.reverse()));var h,s,g=i.length,p=g-2,d=A.CesiumMath.chordLength(r,e.maximumRadius),P=T;if(P.minDistance=d,P.ellipsoid=e,a){for(var c=0,u=0;u<g-1;u++)c+=O.PolylinePipeline.numberOfPoints(i[u],i[u+1],d)+1;h=new Float64Array(3*c),s=new Float64Array(3*c);var v=F,y=H;P.positions=v,P.height=y;var m=0;for(u=0;u<g-1;u++){v[0]=i[u],v[1]=i[u+1],y[0]=t[u],y[1]=t[u+1];var f=O.PolylinePipeline.generateArc(P);h.set(f,m),y[0]=n[u],y[1]=n[u+1],s.set(O.PolylinePipeline.generateArc(P),m),m+=f.length}}else P.positions=i,P.height=t,h=new Float64Array(O.PolylinePipeline.generateArc(P)),P.height=n,s=new Float64Array(O.PolylinePipeline.generateArc(P));return{bottomPositions:s,topPositions:h,numCorners:p}}},e.WallGeometryLibrary=i});
