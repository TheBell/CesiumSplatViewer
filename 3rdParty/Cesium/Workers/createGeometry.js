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

import{a as p}from"./chunk-Z4JIB7LW.js";import{a as y}from"./chunk-I2HWO5GE.js";import"./chunk-JHIAZSOG.js";import"./chunk-U6DTV3QJ.js";import"./chunk-6DAVGPDG.js";import"./chunk-7QABODOW.js";import"./chunk-GRJNEOGG.js";import"./chunk-VNVZTCOJ.js";import"./chunk-MPKNGXNB.js";import"./chunk-FJLRBJVR.js";import"./chunk-J5MMCAQH.js";import"./chunk-SUWCXIJL.js";import"./chunk-S33R2VDU.js";import"./chunk-CPATWQME.js";import"./chunk-7L2366HQ.js";import"./chunk-4KJB5WPM.js";import"./chunk-TMRPEJD4.js";import"./chunk-SE4VZQCC.js";import"./chunk-DCSR3CQL.js";import"./chunk-G5CUMCNC.js";import"./chunk-G3JRBJ3F.js";import{a as f,b as m,e as i}from"./chunk-55SYPJAW.js";var k=m({"./combineGeometry.js":()=>import("./combineGeometry.js"),"./createBoxGeometry.js":()=>import("./createBoxGeometry.js"),"./createBoxOutlineGeometry.js":()=>import("./createBoxOutlineGeometry.js"),"./createCircleGeometry.js":()=>import("./createCircleGeometry.js"),"./createCircleOutlineGeometry.js":()=>import("./createCircleOutlineGeometry.js"),"./createCoplanarPolygonGeometry.js":()=>import("./createCoplanarPolygonGeometry.js"),"./createCoplanarPolygonOutlineGeometry.js":()=>import("./createCoplanarPolygonOutlineGeometry.js"),"./createCorridorGeometry.js":()=>import("./createCorridorGeometry.js"),"./createCorridorOutlineGeometry.js":()=>import("./createCorridorOutlineGeometry.js"),"./createCylinderGeometry.js":()=>import("./createCylinderGeometry.js"),"./createCylinderOutlineGeometry.js":()=>import("./createCylinderOutlineGeometry.js"),"./createEllipseGeometry.js":()=>import("./createEllipseGeometry.js"),"./createEllipseOutlineGeometry.js":()=>import("./createEllipseOutlineGeometry.js"),"./createEllipsoidGeometry.js":()=>import("./createEllipsoidGeometry.js"),"./createEllipsoidOutlineGeometry.js":()=>import("./createEllipsoidOutlineGeometry.js"),"./createFrustumGeometry.js":()=>import("./createFrustumGeometry.js"),"./createFrustumOutlineGeometry.js":()=>import("./createFrustumOutlineGeometry.js"),"./createGeometry.js":()=>import("./createGeometry.js"),"./createGroundPolylineGeometry.js":()=>import("./createGroundPolylineGeometry.js"),"./createPlaneGeometry.js":()=>import("./createPlaneGeometry.js"),"./createPlaneOutlineGeometry.js":()=>import("./createPlaneOutlineGeometry.js"),"./createPolygonGeometry.js":()=>import("./createPolygonGeometry.js"),"./createPolygonOutlineGeometry.js":()=>import("./createPolygonOutlineGeometry.js"),"./createPolylineGeometry.js":()=>import("./createPolylineGeometry.js"),"./createPolylineVolumeGeometry.js":()=>import("./createPolylineVolumeGeometry.js"),"./createPolylineVolumeOutlineGeometry.js":()=>import("./createPolylineVolumeOutlineGeometry.js"),"./createRectangleGeometry.js":()=>import("./createRectangleGeometry.js"),"./createRectangleOutlineGeometry.js":()=>import("./createRectangleOutlineGeometry.js"),"./createSimplePolylineGeometry.js":()=>import("./createSimplePolylineGeometry.js"),"./createSphereGeometry.js":()=>import("./createSphereGeometry.js"),"./createSphereOutlineGeometry.js":()=>import("./createSphereOutlineGeometry.js"),"./createTaskProcessorWorker.js":()=>import("./createTaskProcessorWorker.js"),"./createVectorTileClampedPolylines.js":()=>import("./createVectorTileClampedPolylines.js"),"./createVectorTileGeometries.js":()=>import("./createVectorTileGeometries.js"),"./createVectorTilePoints.js":()=>import("./createVectorTilePoints.js"),"./createVectorTilePolygons.js":()=>import("./createVectorTilePolygons.js"),"./createVectorTilePolylines.js":()=>import("./createVectorTilePolylines.js"),"./createVerticesFromGoogleEarthEnterpriseBuffer.js":()=>import("./createVerticesFromGoogleEarthEnterpriseBuffer.js"),"./createVerticesFromHeightmap.js":()=>import("./createVerticesFromHeightmap.js"),"./createVerticesFromQuantizedTerrainMesh.js":()=>import("./createVerticesFromQuantizedTerrainMesh.js"),"./createWallGeometry.js":()=>import("./createWallGeometry.js"),"./createWallOutlineGeometry.js":()=>import("./createWallOutlineGeometry.js"),"./decodeDraco.js":()=>import("./decodeDraco.js"),"./decodeGoogleEarthEnterprisePacket.js":()=>import("./decodeGoogleEarthEnterprisePacket.js"),"./decodeI3S.js":()=>import("./decodeI3S.js"),"./transcodeKTX2.js":()=>import("./transcodeKTX2.js"),"./transferTypedArrayTest.js":()=>import("./transferTypedArrayTest.js"),"./upsampleQuantizedTerrainMesh.js":()=>import("./upsampleQuantizedTerrainMesh.js")});var c={};async function g(r){let e=c[r];return i(e)||(typeof exports=="object"?c[e]=e=f(`Workers/${r}`):(e=(await k(`./${r}.js`)).default,c[e]=e)),e}async function h(r,e){let o=r.subTasks,l=o.length,s=new Array(l);for(let t=0;t<l;t++){let n=o[t],u=n.geometry,a=n.moduleName;i(a)?s[t]=g(a).then(d=>d(u,n.offset)):s[t]=u}return Promise.all(s).then(function(t){return p.packCreateGeometryResults(t,e)})}var C=y(h);export{C as default};
