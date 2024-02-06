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

import {
  CylinderGeometry_default
} from "./chunk-RKVM4FTV.js";
import "./chunk-SXWC3F5S.js";
import "./chunk-OTPDFNNC.js";
import "./chunk-77BFJ4XO.js";
import "./chunk-XVCY7IQY.js";
import "./chunk-CFTXHNCX.js";
import "./chunk-ZHIQO6ZI.js";
import "./chunk-EB6UHD3Q.js";
import "./chunk-FEWGMCO4.js";
import "./chunk-WDWR4ZYR.js";
import "./chunk-UHN3LLCB.js";
import "./chunk-STBYJ7QD.js";
import "./chunk-ZR73YOC4.js";
import "./chunk-WFQOWAK2.js";
import "./chunk-L2LEAKDQ.js";
import "./chunk-RXWVRM3Z.js";
import "./chunk-CQDZ7WTN.js";
import {
  defined_default
} from "./chunk-ZQWDP7TC.js";

// packages/engine/Source/Workers/createCylinderGeometry.js
function createCylinderGeometry(cylinderGeometry, offset) {
  if (defined_default(offset)) {
    cylinderGeometry = CylinderGeometry_default.unpack(cylinderGeometry, offset);
  }
  return CylinderGeometry_default.createGeometry(cylinderGeometry);
}
var createCylinderGeometry_default = createCylinderGeometry;
export {
  createCylinderGeometry_default as default
};
