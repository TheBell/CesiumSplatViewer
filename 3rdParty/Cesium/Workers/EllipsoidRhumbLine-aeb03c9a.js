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
define(["exports","./when-4ca4e419","./Check-430b3551","./Math-c0afb7aa","./Cartesian2-0cd32dae","./defineProperties-24e785e9"],function(t,m,i,y,S,a){"use strict";function W(t,i,a){if(0===t)return i*a;var e=t*t,n=e*e,s=n*e,h=s*e,u=h*e,r=u*e,o=a;return i*((1-e/4-3*n/64-5*s/256-175*h/16384-441*u/65536-4851*r/1048576)*o-(3*e/8+3*n/32+45*s/1024+105*h/4096+2205*u/131072+6237*r/524288)*Math.sin(2*o)+(15*n/256+45*s/1024+525*h/16384+1575*u/65536+155925*r/8388608)*Math.sin(4*o)-(35*s/3072+175*h/12288+3675*u/262144+13475*r/1048576)*Math.sin(6*o)+(315*h/131072+2205*u/524288+43659*r/8388608)*Math.sin(8*o)-(693*u/1310720+6237*r/5242880)*Math.sin(10*o)+1001*r/8388608*Math.sin(12*o))}function q(t,i){if(0===t)return Math.log(Math.tan(.5*(y.CesiumMath.PI_OVER_TWO+i)));var a=t*Math.sin(i);return Math.log(Math.tan(.5*(y.CesiumMath.PI_OVER_TWO+i)))-t/2*Math.log((1+a)/(1-a))}var V=new S.Cartesian3,b=new S.Cartesian3;function n(t,i,a,e){S.Cartesian3.normalize(e.cartographicToCartesian(i,b),V),S.Cartesian3.normalize(e.cartographicToCartesian(a,b),b);var n,s,h,u,r,o,d,l,M,c,m,_,g,p,C,f,P,O,E,v=e.maximumRadius,I=e.minimumRadius,T=v*v,R=I*I;t._ellipticitySquared=(T-R)/T,t._ellipticity=Math.sqrt(t._ellipticitySquared),t._start=S.Cartographic.clone(i,t._start),t._start.height=0,t._end=S.Cartographic.clone(a,t._end),t._end.height=0,t._heading=(n=t,s=i.longitude,h=i.latitude,u=a.longitude,r=a.latitude,o=q(n._ellipticity,h),d=q(n._ellipticity,r),Math.atan2(y.CesiumMath.negativePiToPi(u-s),d-o)),t._distance=(l=t,M=e.maximumRadius,c=e.minimumRadius,m=i.longitude,_=i.latitude,g=a.longitude,p=a.latitude,P=l._heading,O=g-m,E=0,E=y.CesiumMath.equalsEpsilon(Math.abs(P),y.CesiumMath.PI_OVER_TWO,y.CesiumMath.EPSILON8)?M===c?M*Math.cos(_)*y.CesiumMath.negativePiToPi(O):(C=Math.sin(_),M*Math.cos(_)*y.CesiumMath.negativePiToPi(O)/Math.sqrt(1-l._ellipticitySquared*C*C)):(f=W(l._ellipticity,M,_),(W(l._ellipticity,M,p)-f)/Math.cos(P)),Math.abs(E))}function M(t,i,a,e,n,s){var h,u,r,o,d,l,M=n*n;return d=Math.abs(y.CesiumMath.PI_OVER_TWO-Math.abs(i))>y.CesiumMath.EPSILON8?(h=function(t,i,a){var e=t/a;if(0===i)return e;var n=e*e,s=n*e,h=s*e,u=i*i,r=u*u,o=r*u,d=o*u,l=d*u,M=l*u,c=Math.sin(2*e),m=Math.cos(2*e),_=Math.sin(4*e),g=Math.cos(4*e),p=Math.sin(6*e),C=Math.cos(6*e),f=Math.sin(8*e),P=Math.cos(8*e),O=Math.sin(10*e);return e+e*u/4+7*e*r/64+15*e*o/256+579*e*d/16384+1515*e*l/65536+16837*e*M/1048576+(3*e*r/16+45*e*o/256-e*(32*n-561)*d/4096-e*(232*n-1677)*l/16384+e*(399985-90560*n+512*h)*M/5242880)*m+(21*e*o/256+483*e*d/4096-e*(224*n-1969)*l/16384-e*(33152*n-112599)*M/1048576)*g+(151*e*d/4096+4681*e*l/65536+1479*e*M/16384-453*s*M/32768)*C+(1097*e*l/65536+42783*e*M/1048576)*P+8011*e*M/1048576*Math.cos(10*e)+(3*u/8+3*r/16+213*o/2048-3*n*o/64+255*d/4096-33*n*d/512+20861*l/524288-33*n*l/512+h*l/1024+28273*M/1048576-471*n*M/8192+9*h*M/4096)*c+(21*r/256+21*o/256+533*d/8192-21*n*d/512+197*l/4096-315*n*l/4096+584039*M/16777216-12517*n*M/131072+7*h*M/2048)*_+(151*o/6144+151*d/4096+5019*l/131072-453*n*l/16384+26965*M/786432-8607*n*M/131072)*p+(1097*d/131072+1097*l/65536+225797*M/10485760-1097*n*M/65536)*f+(8011*l/2621440+8011*M/1048576)*O+293393*M/251658240*Math.sin(12*e)}(W(n,e,t.latitude)+a*Math.cos(i),n,e),u=q(n,t.latitude),r=q(n,h),o=Math.tan(i)*(r-u),y.CesiumMath.negativePiToPi(t.longitude+o)):(h=t.latitude,o=a/(0===n?e*Math.cos(t.latitude):(l=Math.sin(t.latitude),e*Math.cos(t.latitude)/Math.sqrt(1-M*l*l))),0<i?y.CesiumMath.negativePiToPi(t.longitude+o):y.CesiumMath.negativePiToPi(t.longitude-o)),m.defined(s)?(s.longitude=d,s.latitude=h,s.height=0,s):new S.Cartographic(d,h,0)}function c(t,i,a){var e=m.defaultValue(a,S.Ellipsoid.WGS84);this._ellipsoid=e,this._start=new S.Cartographic,this._end=new S.Cartographic,this._heading=void 0,this._distance=void 0,this._ellipticity=void 0,this._ellipticitySquared=void 0,m.defined(t)&&m.defined(i)&&n(this,t,i,e)}a.defineProperties(c.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},surfaceDistance:{get:function(){return this._distance}},start:{get:function(){return this._start}},end:{get:function(){return this._end}},heading:{get:function(){return this._heading}}}),c.fromStartHeadingDistance=function(t,i,a,e,n){var s=m.defaultValue(e,S.Ellipsoid.WGS84),h=s.maximumRadius,u=s.minimumRadius,r=h*h,o=u*u,d=Math.sqrt((r-o)/r),l=M(t,i=y.CesiumMath.negativePiToPi(i),a,s.maximumRadius,d);return!m.defined(n)||m.defined(e)&&!e.equals(n.ellipsoid)?new c(t,l,s):(n.setEndPoints(t,l),n)},c.prototype.setEndPoints=function(t,i){n(this,t,i,this._ellipsoid)},c.prototype.interpolateUsingFraction=function(t,i){return this.interpolateUsingSurfaceDistance(t*this._distance,i)},c.prototype.interpolateUsingSurfaceDistance=function(t,i){return M(this._start,this._heading,t,this._ellipsoid.maximumRadius,this._ellipticity,i)},c.prototype.findIntersectionWithLongitude=function(t,i){var a=this._ellipticity,e=this._heading,n=Math.abs(e),s=this._start;if(t=y.CesiumMath.negativePiToPi(t),y.CesiumMath.equalsEpsilon(Math.abs(t),Math.PI,y.CesiumMath.EPSILON14)&&(t=y.CesiumMath.sign(s.longitude)*Math.PI),m.defined(i)||(i=new S.Cartographic),Math.abs(y.CesiumMath.PI_OVER_TWO-n)<=y.CesiumMath.EPSILON8)return i.longitude=t,i.latitude=s.latitude,i.height=0,i;if(y.CesiumMath.equalsEpsilon(Math.abs(y.CesiumMath.PI_OVER_TWO-n),y.CesiumMath.PI_OVER_TWO,y.CesiumMath.EPSILON8)){if(y.CesiumMath.equalsEpsilon(t,s.longitude,y.CesiumMath.EPSILON12))return;return i.longitude=t,i.latitude=y.CesiumMath.PI_OVER_TWO*y.CesiumMath.sign(y.CesiumMath.PI_OVER_TWO-e),i.height=0,i}var h,u=s.latitude,r=a*Math.sin(u),o=Math.tan(.5*(y.CesiumMath.PI_OVER_TWO+u))*Math.exp((t-s.longitude)/Math.tan(e)),d=(1+r)/(1-r),l=s.latitude;do{h=l;var M=a*Math.sin(h),c=(1+M)/(1-M),l=2*Math.atan(o*Math.pow(c/d,a/2))-y.CesiumMath.PI_OVER_TWO}while(!y.CesiumMath.equalsEpsilon(l,h,y.CesiumMath.EPSILON12));return i.longitude=t,i.latitude=l,i.height=0,i},c.prototype.findIntersectionWithLatitude=function(t,i){var a=this._ellipticity,e=this._heading,n=this._start;if(!y.CesiumMath.equalsEpsilon(Math.abs(e),y.CesiumMath.PI_OVER_TWO,y.CesiumMath.EPSILON8)){var s=q(a,n.latitude),h=q(a,t),u=Math.tan(e)*(h-s),r=y.CesiumMath.negativePiToPi(n.longitude+u);return m.defined(i)?(i.longitude=r,i.latitude=t,i.height=0,i):new S.Cartographic(r,t,0)}},t.EllipsoidRhumbLine=c});
