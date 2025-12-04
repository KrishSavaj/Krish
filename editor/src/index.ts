import "@svgdotjs/svg.draggable.js";
import "@svgdotjs/svg.panzoom.js";
import { Model } from "./models/model";
import { Presenter } from "./presenter/presenter";
import { View } from "./view/view";

let model = new Model();
let view = new View("svg-wrapper");
let presenter = new Presenter(model, view);
