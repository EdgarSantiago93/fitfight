"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("./styles");
const ForcedRest = () => {
    const { classes } = (0, styles_1.useStyles)();
    react_1.default.useEffect(() => { }, []);
    return (react_1.default.createElement("div", { className: classes.noEntry },
        react_1.default.createElement("div", { className: classes.label }, "Se acab\u00F3 la semana"),
        react_1.default.createElement("div", null, "\uD83C\uDF19")));
};
exports.default = ForcedRest;
//# sourceMappingURL=index.js.map