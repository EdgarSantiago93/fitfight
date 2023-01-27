"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const styles_1 = require("./styles");
const EntryNotSubmitted = (props) => {
    const {} = props;
    const { classes } = (0, styles_1.useStyles)();
    return (react_1.default.createElement("div", { className: classes.notSubmitted },
        react_1.default.createElement(core_1.Grid, null,
            react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                react_1.default.createElement("div", { className: classes.label }, "Tracker"),
                react_1.default.createElement("div", { style: {
                        backgroundImage: 'url(https://placedog.net/500/800)',
                    }, className: classes.image })),
            react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                react_1.default.createElement("div", { className: classes.label }, "Pose"),
                react_1.default.createElement("div", { style: {
                        backgroundImage: 'url(https://placedog.net/500/800)',
                    }, className: classes.image })),
            react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                react_1.default.createElement(core_1.TextInput, { label: "Calorias", radius: "md", size: "md" })),
            react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                react_1.default.createElement(core_1.TextInput, { label: "Minutos ejercicio", radius: "md", size: "md" })),
            react_1.default.createElement(core_1.Grid.Col, { span: 12 },
                react_1.default.createElement("div", { style: {
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '100%',
                        alignContent: 'center',
                    } },
                    react_1.default.createElement(core_1.Button, { component: "a", href: "#", variant: "subtle", leftIcon: react_1.default.createElement(react_1.default.Fragment, null, "\uD83D\uDE34") }, "Hoy es descanso"),
                    react_1.default.createElement(core_1.Button, { component: "a", href: "#", variant: "outline", leftIcon: react_1.default.createElement(react_1.default.Fragment, null, "\uD83D\uDCAA") }, "Vamos"))))));
};
exports.default = EntryNotSubmitted;
//# sourceMappingURL=index.js.map