"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("./styles");
const NoEntry = () => {
    const { classes } = (0, styles_1.useStyles)();
    react_1.default.useEffect(() => { }, []);
    const getImg = (min = 0, max = 100) => {
        let difference = max - min;
        let rand = Math.random();
        rand = Math.floor(rand * difference);
        rand = rand + min;
        if (rand == 7) {
            rand = 6;
        }
        return rand;
    };
    return (react_1.default.createElement("div", { className: classes.noEntry },
        react_1.default.createElement("div", { className: classes.label }, "No hay registro para este d\u00EDa"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("img", { src: `/img/dogs/${getImg(1, 7)}.png`, alt: "", className: classes.dogImg }))));
};
exports.default = NoEntry;
//# sourceMappingURL=index.js.map