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
define(["exports","./Math-c0afb7aa"],function(r,P){"use strict";var t={computePositions:function(r,t,a,e,i){for(var n=.5*r,o=-n,s=e+e,c=new Float64Array(3*(i?2*s:s)),u=0,f=0,h=i?3*s:0,y=i?3*(s+e):3*e,M=0;M<e;M++){var m=M/e*P.CesiumMath.TWO_PI,v=Math.cos(m),b=Math.sin(m),d=v*a,l=b*a,p=v*t,C=b*t;c[f+h]=d,c[f+h+1]=l,c[f+h+2]=o,c[f+y]=p,c[f+y+1]=C,c[f+y+2]=n,f+=3,i&&(c[u++]=d,c[u++]=l,c[u++]=o,c[u++]=p,c[u++]=C,c[u++]=n)}return c}};r.CylinderGeometryLibrary=t});
