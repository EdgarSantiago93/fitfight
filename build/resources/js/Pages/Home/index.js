"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const tabler_icons_react_1 = require("tabler-icons-react");
const Home = (props) => {
    const {} = props;
    const user = props['user'];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement(core_1.Text, null, "Buenos dias,"),
            react_1.default.createElement(core_1.Text, null, user.name)),
        "this is the first start of sth new",
        react_1.default.createElement(core_1.Button, null, "Click me!"),
        ";",
        react_1.default.createElement("div", null,
            react_1.default.createElement(core_1.ActionIcon, { size: 70, radius: 100, variant: "filled" },
                react_1.default.createElement(tabler_icons_react_1.CirclePlus, { size: 34 })))));
};
exports.default = Home;
//# sourceMappingURL=index.js.map