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
define(["exports","./when-4ca4e419","./Check-430b3551","./Math-c0afb7aa","./Cartesian2-0cd32dae","./Transforms-54271159","./GeometryAttribute-aec59577"],function(t,p,n,b,O,a,R){"use strict";var G=Math.cos,x=Math.sin,f=Math.sqrt,r={computePosition:function(t,n,a,r,e,o,s){var i,g=n.radiiSquared,h=t.nwCorner,u=t.boundingRectangle,c=h.latitude-t.granYCos*r+e*t.granXSin,C=G(c),l=x(c),S=g.z*l,d=h.longitude+r*t.granYSin+e*t.granXCos,w=C*G(d),M=C*x(d),X=g.x*w,Y=g.y*M,m=f(X*w+Y*M+S*l);o.x=X/m,o.y=Y/m,o.z=S/m,a&&(i=t.stNwCorner,p.defined(i)?(c=i.latitude-t.stGranYCos*r+e*t.stGranXSin,d=i.longitude+r*t.stGranYSin+e*t.stGranXCos,s.x=(d-t.stWest)*t.lonScalar,s.y=(c-t.stSouth)*t.latScalar):(s.x=(d-u.west)*t.lonScalar,s.y=(c-u.south)*t.latScalar))}},y=new R.Matrix2,v=new O.Cartesian3,P=new O.Cartographic,W=new O.Cartesian3,_=new a.GeographicProjection;function T(t,n,a,r,e,o,s){var i=Math.cos(n),g=r*i,h=a*i,u=Math.sin(n),c=r*u,C=a*u;v=_.project(t,v),v=O.Cartesian3.subtract(v,W,v);var l=R.Matrix2.fromRotation(n,y);v=R.Matrix2.multiplyByVector(l,v,v),v=O.Cartesian3.add(v,W,v),--o,--s;var S=(t=_.unproject(v,t)).latitude,d=S+o*C,w=S-g*s,M=S-g*s+o*C,X=Math.max(S,d,w,M),Y=Math.min(S,d,w,M),m=t.longitude,p=m+o*h,G=m+s*c,x=m+s*c+o*h;return{north:X,south:Y,east:Math.max(m,p,G,x),west:Math.min(m,p,G,x),granYCos:g,granYSin:c,granXCos:h,granXSin:C,nwCorner:t}}r.computeOptions=function(t,n,a,r,e,o,s){var i=t.east,g=t.west,h=t.north,u=t.south,c=!1,C=!1;h===b.CesiumMath.PI_OVER_TWO&&(c=!0),u===-b.CesiumMath.PI_OVER_TWO&&(C=!0);var l,S,d,w=h-u,M=(l=i<g?b.CesiumMath.TWO_PI-g+i:i-g)/((S=Math.ceil(l/n)+1)-1),X=w/((d=Math.ceil(w/n)+1)-1),Y=O.Rectangle.northwest(t,o),m=O.Rectangle.center(t,P);0===a&&0===r||(m.longitude<Y.longitude&&(m.longitude+=b.CesiumMath.TWO_PI),W=_.project(m,W));var p,G,x,R=X,f=M,y=O.Rectangle.clone(t,e),v={granYCos:R,granYSin:0,granXCos:f,granXSin:0,nwCorner:Y,boundingRectangle:y,width:S,height:d,northCap:c,southCap:C};return 0!==a&&(h=(p=T(Y,a,M,X,0,S,d)).north,u=p.south,i=p.east,g=p.west,v.granYCos=p.granYCos,v.granYSin=p.granYSin,v.granXCos=p.granXCos,v.granXSin=p.granXSin,y.north=h,y.south=u,y.east=i,y.west=g),0!==r&&(a-=r,x=T(G=O.Rectangle.northwest(y,s),a,M,X,0,S,d),v.stGranYCos=x.granYCos,v.stGranXCos=x.granXCos,v.stGranYSin=x.granYSin,v.stGranXSin=x.granXSin,v.stNwCorner=G,v.stWest=x.west,v.stSouth=x.south),v},t.RectangleGeometryLibrary=r});
