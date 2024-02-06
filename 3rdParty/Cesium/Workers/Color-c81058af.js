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
define(["exports","./when-4ca4e419","./Check-430b3551","./Math-c0afb7aa","./Transforms-54271159"],function(e,u,r,g,o){"use strict";function a(e,r,o){return o<0&&(o+=1),1<o&&--o,6*o<1?e+6*(r-e)*o:2*o<1?r:3*o<2?e+(r-e)*(2/3-o)*6:e}function F(e,r,o,t){this.red=u.defaultValue(e,1),this.green=u.defaultValue(r,1),this.blue=u.defaultValue(o,1),this.alpha=u.defaultValue(t,1)}var t,f,s;F.fromCartesian4=function(e,r){return u.defined(r)?(r.red=e.x,r.green=e.y,r.blue=e.z,r.alpha=e.w,r):new F(e.x,e.y,e.z,e.w)},F.fromBytes=function(e,r,o,t,f){return e=F.byteToFloat(u.defaultValue(e,255)),r=F.byteToFloat(u.defaultValue(r,255)),o=F.byteToFloat(u.defaultValue(o,255)),t=F.byteToFloat(u.defaultValue(t,255)),u.defined(f)?(f.red=e,f.green=r,f.blue=o,f.alpha=t,f):new F(e,r,o,t)},F.fromAlpha=function(e,r,o){return u.defined(o)?(o.red=e.red,o.green=e.green,o.blue=e.blue,o.alpha=r,o):new F(e.red,e.green,e.blue,r)},o.FeatureDetection.supportsTypedArrays()&&(t=new ArrayBuffer(4),f=new Uint32Array(t),s=new Uint8Array(t)),F.fromRgba=function(e,r){return f[0]=e,F.fromBytes(s[0],s[1],s[2],s[3],r)},F.fromHsl=function(e,r,o,t,f){e=u.defaultValue(e,0)%1,r=u.defaultValue(r,0),o=u.defaultValue(o,0),t=u.defaultValue(t,1);var s,n,C=o,l=o,i=o;return 0!==r&&(C=a(n=2*o-(s=o<.5?o*(1+r):o+r-o*r),s,e+1/3),l=a(n,s,e),i=a(n,s,e-1/3)),u.defined(f)?(f.red=C,f.green=l,f.blue=i,f.alpha=t,f):new F(C,l,i,t)},F.fromRandom=function(e,r){var o,t,f=(e=u.defaultValue(e,u.defaultValue.EMPTY_OBJECT)).red;u.defined(f)||(o=u.defaultValue(e.minimumRed,0),t=u.defaultValue(e.maximumRed,1),f=o+g.CesiumMath.nextRandomNumber()*(t-o));var s,n,C=e.green;u.defined(C)||(s=u.defaultValue(e.minimumGreen,0),n=u.defaultValue(e.maximumGreen,1),C=s+g.CesiumMath.nextRandomNumber()*(n-s));var l,i,a=e.blue;u.defined(a)||(l=u.defaultValue(e.minimumBlue,0),i=u.defaultValue(e.maximumBlue,1),a=l+g.CesiumMath.nextRandomNumber()*(i-l));var E,O,b=e.alpha;return u.defined(b)||(E=u.defaultValue(e.minimumAlpha,0),O=u.defaultValue(e.maximumAlpha,1),b=E+g.CesiumMath.nextRandomNumber()*(O-E)),u.defined(r)?(r.red=f,r.green=C,r.blue=a,r.alpha=b,r):new F(f,C,a,b)};var n=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,C=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,l=/^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i,i=/^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;F.fromCssColorString=function(e,r){u.defined(r)||(r=new F);var o=F[e.toUpperCase()];if(u.defined(o))return F.clone(o,r),r;var t=n.exec(e);return null!==t?(r.red=parseInt(t[1],16)/15,r.green=parseInt(t[2],16)/15,r.blue=parseInt(t[3],16)/15,r.alpha=1,r):null!==(t=C.exec(e))?(r.red=parseInt(t[1],16)/255,r.green=parseInt(t[2],16)/255,r.blue=parseInt(t[3],16)/255,r.alpha=1,r):null!==(t=l.exec(e))?(r.red=parseFloat(t[1])/("%"===t[1].substr(-1)?100:255),r.green=parseFloat(t[2])/("%"===t[2].substr(-1)?100:255),r.blue=parseFloat(t[3])/("%"===t[3].substr(-1)?100:255),r.alpha=parseFloat(u.defaultValue(t[4],"1.0")),r):null!==(t=i.exec(e))?F.fromHsl(parseFloat(t[1])/360,parseFloat(t[2])/100,parseFloat(t[3])/100,parseFloat(u.defaultValue(t[4],"1.0")),r):r=void 0},F.packedLength=4,F.pack=function(e,r,o){return o=u.defaultValue(o,0),r[o++]=e.red,r[o++]=e.green,r[o++]=e.blue,r[o]=e.alpha,r},F.unpack=function(e,r,o){return r=u.defaultValue(r,0),u.defined(o)||(o=new F),o.red=e[r++],o.green=e[r++],o.blue=e[r++],o.alpha=e[r],o},F.byteToFloat=function(e){return e/255},F.floatToByte=function(e){return 1===e?255:256*e|0},F.clone=function(e,r){if(u.defined(e))return u.defined(r)?(r.red=e.red,r.green=e.green,r.blue=e.blue,r.alpha=e.alpha,r):new F(e.red,e.green,e.blue,e.alpha)},F.equals=function(e,r){return e===r||u.defined(e)&&u.defined(r)&&e.red===r.red&&e.green===r.green&&e.blue===r.blue&&e.alpha===r.alpha},F.equalsArray=function(e,r,o){return e.red===r[o]&&e.green===r[o+1]&&e.blue===r[o+2]&&e.alpha===r[o+3]},F.prototype.clone=function(e){return F.clone(this,e)},F.prototype.equals=function(e){return F.equals(this,e)},F.prototype.equalsEpsilon=function(e,r){return this===e||u.defined(e)&&Math.abs(this.red-e.red)<=r&&Math.abs(this.green-e.green)<=r&&Math.abs(this.blue-e.blue)<=r&&Math.abs(this.alpha-e.alpha)<=r},F.prototype.toString=function(){return"("+this.red+", "+this.green+", "+this.blue+", "+this.alpha+")"},F.prototype.toCssColorString=function(){var e=F.floatToByte(this.red),r=F.floatToByte(this.green),o=F.floatToByte(this.blue);return 1===this.alpha?"rgb("+e+","+r+","+o+")":"rgba("+e+","+r+","+o+","+this.alpha+")"},F.prototype.toBytes=function(e){var r=F.floatToByte(this.red),o=F.floatToByte(this.green),t=F.floatToByte(this.blue),f=F.floatToByte(this.alpha);return u.defined(e)?(e[0]=r,e[1]=o,e[2]=t,e[3]=f,e):[r,o,t,f]},F.prototype.toRgba=function(){return s[0]=F.floatToByte(this.red),s[1]=F.floatToByte(this.green),s[2]=F.floatToByte(this.blue),s[3]=F.floatToByte(this.alpha),f[0]},F.prototype.brighten=function(e,r){return e=1-e,r.red=1-(1-this.red)*e,r.green=1-(1-this.green)*e,r.blue=1-(1-this.blue)*e,r.alpha=this.alpha,r},F.prototype.darken=function(e,r){return e=1-e,r.red=this.red*e,r.green=this.green*e,r.blue=this.blue*e,r.alpha=this.alpha,r},F.prototype.withAlpha=function(e,r){return F.fromAlpha(this,e,r)},F.add=function(e,r,o){return o.red=e.red+r.red,o.green=e.green+r.green,o.blue=e.blue+r.blue,o.alpha=e.alpha+r.alpha,o},F.subtract=function(e,r,o){return o.red=e.red-r.red,o.green=e.green-r.green,o.blue=e.blue-r.blue,o.alpha=e.alpha-r.alpha,o},F.multiply=function(e,r,o){return o.red=e.red*r.red,o.green=e.green*r.green,o.blue=e.blue*r.blue,o.alpha=e.alpha*r.alpha,o},F.divide=function(e,r,o){return o.red=e.red/r.red,o.green=e.green/r.green,o.blue=e.blue/r.blue,o.alpha=e.alpha/r.alpha,o},F.mod=function(e,r,o){return o.red=e.red%r.red,o.green=e.green%r.green,o.blue=e.blue%r.blue,o.alpha=e.alpha%r.alpha,o},F.multiplyByScalar=function(e,r,o){return o.red=e.red*r,o.green=e.green*r,o.blue=e.blue*r,o.alpha=e.alpha*r,o},F.divideByScalar=function(e,r,o){return o.red=e.red/r,o.green=e.green/r,o.blue=e.blue/r,o.alpha=e.alpha/r,o},F.ALICEBLUE=u.freezeObject(F.fromCssColorString("#F0F8FF")),F.ANTIQUEWHITE=u.freezeObject(F.fromCssColorString("#FAEBD7")),F.AQUA=u.freezeObject(F.fromCssColorString("#00FFFF")),F.AQUAMARINE=u.freezeObject(F.fromCssColorString("#7FFFD4")),F.AZURE=u.freezeObject(F.fromCssColorString("#F0FFFF")),F.BEIGE=u.freezeObject(F.fromCssColorString("#F5F5DC")),F.BISQUE=u.freezeObject(F.fromCssColorString("#FFE4C4")),F.BLACK=u.freezeObject(F.fromCssColorString("#000000")),F.BLANCHEDALMOND=u.freezeObject(F.fromCssColorString("#FFEBCD")),F.BLUE=u.freezeObject(F.fromCssColorString("#0000FF")),F.BLUEVIOLET=u.freezeObject(F.fromCssColorString("#8A2BE2")),F.BROWN=u.freezeObject(F.fromCssColorString("#A52A2A")),F.BURLYWOOD=u.freezeObject(F.fromCssColorString("#DEB887")),F.CADETBLUE=u.freezeObject(F.fromCssColorString("#5F9EA0")),F.CHARTREUSE=u.freezeObject(F.fromCssColorString("#7FFF00")),F.CHOCOLATE=u.freezeObject(F.fromCssColorString("#D2691E")),F.CORAL=u.freezeObject(F.fromCssColorString("#FF7F50")),F.CORNFLOWERBLUE=u.freezeObject(F.fromCssColorString("#6495ED")),F.CORNSILK=u.freezeObject(F.fromCssColorString("#FFF8DC")),F.CRIMSON=u.freezeObject(F.fromCssColorString("#DC143C")),F.CYAN=u.freezeObject(F.fromCssColorString("#00FFFF")),F.DARKBLUE=u.freezeObject(F.fromCssColorString("#00008B")),F.DARKCYAN=u.freezeObject(F.fromCssColorString("#008B8B")),F.DARKGOLDENROD=u.freezeObject(F.fromCssColorString("#B8860B")),F.DARKGRAY=u.freezeObject(F.fromCssColorString("#A9A9A9")),F.DARKGREEN=u.freezeObject(F.fromCssColorString("#006400")),F.DARKGREY=F.DARKGRAY,F.DARKKHAKI=u.freezeObject(F.fromCssColorString("#BDB76B")),F.DARKMAGENTA=u.freezeObject(F.fromCssColorString("#8B008B")),F.DARKOLIVEGREEN=u.freezeObject(F.fromCssColorString("#556B2F")),F.DARKORANGE=u.freezeObject(F.fromCssColorString("#FF8C00")),F.DARKORCHID=u.freezeObject(F.fromCssColorString("#9932CC")),F.DARKRED=u.freezeObject(F.fromCssColorString("#8B0000")),F.DARKSALMON=u.freezeObject(F.fromCssColorString("#E9967A")),F.DARKSEAGREEN=u.freezeObject(F.fromCssColorString("#8FBC8F")),F.DARKSLATEBLUE=u.freezeObject(F.fromCssColorString("#483D8B")),F.DARKSLATEGRAY=u.freezeObject(F.fromCssColorString("#2F4F4F")),F.DARKSLATEGREY=F.DARKSLATEGRAY,F.DARKTURQUOISE=u.freezeObject(F.fromCssColorString("#00CED1")),F.DARKVIOLET=u.freezeObject(F.fromCssColorString("#9400D3")),F.DEEPPINK=u.freezeObject(F.fromCssColorString("#FF1493")),F.DEEPSKYBLUE=u.freezeObject(F.fromCssColorString("#00BFFF")),F.DIMGRAY=u.freezeObject(F.fromCssColorString("#696969")),F.DIMGREY=F.DIMGRAY,F.DODGERBLUE=u.freezeObject(F.fromCssColorString("#1E90FF")),F.FIREBRICK=u.freezeObject(F.fromCssColorString("#B22222")),F.FLORALWHITE=u.freezeObject(F.fromCssColorString("#FFFAF0")),F.FORESTGREEN=u.freezeObject(F.fromCssColorString("#228B22")),F.FUCHSIA=u.freezeObject(F.fromCssColorString("#FF00FF")),F.GAINSBORO=u.freezeObject(F.fromCssColorString("#DCDCDC")),F.GHOSTWHITE=u.freezeObject(F.fromCssColorString("#F8F8FF")),F.GOLD=u.freezeObject(F.fromCssColorString("#FFD700")),F.GOLDENROD=u.freezeObject(F.fromCssColorString("#DAA520")),F.GRAY=u.freezeObject(F.fromCssColorString("#808080")),F.GREEN=u.freezeObject(F.fromCssColorString("#008000")),F.GREENYELLOW=u.freezeObject(F.fromCssColorString("#ADFF2F")),F.GREY=F.GRAY,F.HONEYDEW=u.freezeObject(F.fromCssColorString("#F0FFF0")),F.HOTPINK=u.freezeObject(F.fromCssColorString("#FF69B4")),F.INDIANRED=u.freezeObject(F.fromCssColorString("#CD5C5C")),F.INDIGO=u.freezeObject(F.fromCssColorString("#4B0082")),F.IVORY=u.freezeObject(F.fromCssColorString("#FFFFF0")),F.KHAKI=u.freezeObject(F.fromCssColorString("#F0E68C")),F.LAVENDER=u.freezeObject(F.fromCssColorString("#E6E6FA")),F.LAVENDAR_BLUSH=u.freezeObject(F.fromCssColorString("#FFF0F5")),F.LAWNGREEN=u.freezeObject(F.fromCssColorString("#7CFC00")),F.LEMONCHIFFON=u.freezeObject(F.fromCssColorString("#FFFACD")),F.LIGHTBLUE=u.freezeObject(F.fromCssColorString("#ADD8E6")),F.LIGHTCORAL=u.freezeObject(F.fromCssColorString("#F08080")),F.LIGHTCYAN=u.freezeObject(F.fromCssColorString("#E0FFFF")),F.LIGHTGOLDENRODYELLOW=u.freezeObject(F.fromCssColorString("#FAFAD2")),F.LIGHTGRAY=u.freezeObject(F.fromCssColorString("#D3D3D3")),F.LIGHTGREEN=u.freezeObject(F.fromCssColorString("#90EE90")),F.LIGHTGREY=F.LIGHTGRAY,F.LIGHTPINK=u.freezeObject(F.fromCssColorString("#FFB6C1")),F.LIGHTSEAGREEN=u.freezeObject(F.fromCssColorString("#20B2AA")),F.LIGHTSKYBLUE=u.freezeObject(F.fromCssColorString("#87CEFA")),F.LIGHTSLATEGRAY=u.freezeObject(F.fromCssColorString("#778899")),F.LIGHTSLATEGREY=F.LIGHTSLATEGRAY,F.LIGHTSTEELBLUE=u.freezeObject(F.fromCssColorString("#B0C4DE")),F.LIGHTYELLOW=u.freezeObject(F.fromCssColorString("#FFFFE0")),F.LIME=u.freezeObject(F.fromCssColorString("#00FF00")),F.LIMEGREEN=u.freezeObject(F.fromCssColorString("#32CD32")),F.LINEN=u.freezeObject(F.fromCssColorString("#FAF0E6")),F.MAGENTA=u.freezeObject(F.fromCssColorString("#FF00FF")),F.MAROON=u.freezeObject(F.fromCssColorString("#800000")),F.MEDIUMAQUAMARINE=u.freezeObject(F.fromCssColorString("#66CDAA")),F.MEDIUMBLUE=u.freezeObject(F.fromCssColorString("#0000CD")),F.MEDIUMORCHID=u.freezeObject(F.fromCssColorString("#BA55D3")),F.MEDIUMPURPLE=u.freezeObject(F.fromCssColorString("#9370DB")),F.MEDIUMSEAGREEN=u.freezeObject(F.fromCssColorString("#3CB371")),F.MEDIUMSLATEBLUE=u.freezeObject(F.fromCssColorString("#7B68EE")),F.MEDIUMSPRINGGREEN=u.freezeObject(F.fromCssColorString("#00FA9A")),F.MEDIUMTURQUOISE=u.freezeObject(F.fromCssColorString("#48D1CC")),F.MEDIUMVIOLETRED=u.freezeObject(F.fromCssColorString("#C71585")),F.MIDNIGHTBLUE=u.freezeObject(F.fromCssColorString("#191970")),F.MINTCREAM=u.freezeObject(F.fromCssColorString("#F5FFFA")),F.MISTYROSE=u.freezeObject(F.fromCssColorString("#FFE4E1")),F.MOCCASIN=u.freezeObject(F.fromCssColorString("#FFE4B5")),F.NAVAJOWHITE=u.freezeObject(F.fromCssColorString("#FFDEAD")),F.NAVY=u.freezeObject(F.fromCssColorString("#000080")),F.OLDLACE=u.freezeObject(F.fromCssColorString("#FDF5E6")),F.OLIVE=u.freezeObject(F.fromCssColorString("#808000")),F.OLIVEDRAB=u.freezeObject(F.fromCssColorString("#6B8E23")),F.ORANGE=u.freezeObject(F.fromCssColorString("#FFA500")),F.ORANGERED=u.freezeObject(F.fromCssColorString("#FF4500")),F.ORCHID=u.freezeObject(F.fromCssColorString("#DA70D6")),F.PALEGOLDENROD=u.freezeObject(F.fromCssColorString("#EEE8AA")),F.PALEGREEN=u.freezeObject(F.fromCssColorString("#98FB98")),F.PALETURQUOISE=u.freezeObject(F.fromCssColorString("#AFEEEE")),F.PALEVIOLETRED=u.freezeObject(F.fromCssColorString("#DB7093")),F.PAPAYAWHIP=u.freezeObject(F.fromCssColorString("#FFEFD5")),F.PEACHPUFF=u.freezeObject(F.fromCssColorString("#FFDAB9")),F.PERU=u.freezeObject(F.fromCssColorString("#CD853F")),F.PINK=u.freezeObject(F.fromCssColorString("#FFC0CB")),F.PLUM=u.freezeObject(F.fromCssColorString("#DDA0DD")),F.POWDERBLUE=u.freezeObject(F.fromCssColorString("#B0E0E6")),F.PURPLE=u.freezeObject(F.fromCssColorString("#800080")),F.RED=u.freezeObject(F.fromCssColorString("#FF0000")),F.ROSYBROWN=u.freezeObject(F.fromCssColorString("#BC8F8F")),F.ROYALBLUE=u.freezeObject(F.fromCssColorString("#4169E1")),F.SADDLEBROWN=u.freezeObject(F.fromCssColorString("#8B4513")),F.SALMON=u.freezeObject(F.fromCssColorString("#FA8072")),F.SANDYBROWN=u.freezeObject(F.fromCssColorString("#F4A460")),F.SEAGREEN=u.freezeObject(F.fromCssColorString("#2E8B57")),F.SEASHELL=u.freezeObject(F.fromCssColorString("#FFF5EE")),F.SIENNA=u.freezeObject(F.fromCssColorString("#A0522D")),F.SILVER=u.freezeObject(F.fromCssColorString("#C0C0C0")),F.SKYBLUE=u.freezeObject(F.fromCssColorString("#87CEEB")),F.SLATEBLUE=u.freezeObject(F.fromCssColorString("#6A5ACD")),F.SLATEGRAY=u.freezeObject(F.fromCssColorString("#708090")),F.SLATEGREY=F.SLATEGRAY,F.SNOW=u.freezeObject(F.fromCssColorString("#FFFAFA")),F.SPRINGGREEN=u.freezeObject(F.fromCssColorString("#00FF7F")),F.STEELBLUE=u.freezeObject(F.fromCssColorString("#4682B4")),F.TAN=u.freezeObject(F.fromCssColorString("#D2B48C")),F.TEAL=u.freezeObject(F.fromCssColorString("#008080")),F.THISTLE=u.freezeObject(F.fromCssColorString("#D8BFD8")),F.TOMATO=u.freezeObject(F.fromCssColorString("#FF6347")),F.TURQUOISE=u.freezeObject(F.fromCssColorString("#40E0D0")),F.VIOLET=u.freezeObject(F.fromCssColorString("#EE82EE")),F.WHEAT=u.freezeObject(F.fromCssColorString("#F5DEB3")),F.WHITE=u.freezeObject(F.fromCssColorString("#FFFFFF")),F.WHITESMOKE=u.freezeObject(F.fromCssColorString("#F5F5F5")),F.YELLOW=u.freezeObject(F.fromCssColorString("#FFFF00")),F.YELLOWGREEN=u.freezeObject(F.fromCssColorString("#9ACD32")),F.TRANSPARENT=u.freezeObject(new F(0,0,0,0)),e.Color=F});