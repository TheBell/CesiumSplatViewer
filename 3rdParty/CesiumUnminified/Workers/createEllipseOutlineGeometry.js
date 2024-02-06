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
  EllipseOutlineGeometry_default
} from "./chunk-CBP7ONT3.js";
import "./chunk-WHZLA5JD.js";
import "./chunk-OTPDFNNC.js";
import "./chunk-XVCY7IQY.js";
import "./chunk-CFTXHNCX.js";
import "./chunk-ZHIQO6ZI.js";
import "./chunk-EB6UHD3Q.js";
import "./chunk-FEWGMCO4.js";
import "./chunk-WDWR4ZYR.js";
import "./chunk-UHN3LLCB.js";
import {
  Cartesian3_default,
  Ellipsoid_default
} from "./chunk-STBYJ7QD.js";
import "./chunk-ZR73YOC4.js";
import "./chunk-WFQOWAK2.js";
import "./chunk-L2LEAKDQ.js";
import "./chunk-RXWVRM3Z.js";
import "./chunk-CQDZ7WTN.js";
import {
  defined_default
} from "./chunk-ZQWDP7TC.js";

// packages/engine/Source/Workers/createEllipseOutlineGeometry.js
function createEllipseOutlineGeometry(ellipseGeometry, offset) {
  if (defined_default(offset)) {
    ellipseGeometry = EllipseOutlineGeometry_default.unpack(ellipseGeometry, offset);
  }
  ellipseGeometry._center = Cartesian3_default.clone(ellipseGeometry._center);
  ellipseGeometry._ellipsoid = Ellipsoid_default.clone(ellipseGeometry._ellipsoid);
  return EllipseOutlineGeometry_default.createGeometry(ellipseGeometry);
}
var createEllipseOutlineGeometry_default = createEllipseOutlineGeometry;
export {
  createEllipseOutlineGeometry_default as default
};
