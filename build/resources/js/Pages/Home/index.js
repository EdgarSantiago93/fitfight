"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const tabler_icons_react_1 = require("tabler-icons-react");
const styles_1 = require("./styles");
const Home = (props) => {
    const {} = props;
    const user = props['user'];
    const { classes } = (0, styles_1.useStyles)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.wrapper },
            react_1.default.createElement(core_1.Group, null,
                react_1.default.createElement(core_1.Image, { src: "/img/logo_h.png", width: 95 })),
            react_1.default.createElement("div", { className: classes.greeting },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: classes.greeting_text }, "Buenos dias,"),
                    react_1.default.createElement("div", { className: classes.greeting_text_name }, user.name)),
                react_1.default.createElement("div", { className: classes.avatarContainer },
                    react_1.default.createElement(core_1.Avatar, { src: user.avatar, size: 40, radius: 100 }))),
            react_1.default.createElement("div", { className: classes.missingVotesContainer },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: classes.missingVotesContainer_top }, "12 votos faltantes"),
                    react_1.default.createElement("div", { className: classes.missingVotesContainer_bottom }, "Mostrar")),
                react_1.default.createElement("div", { className: classes.missingVotesContainer_icon },
                    react_1.default.createElement(core_1.ThemeIcon, { variant: "light", radius: "xl", size: "xl" },
                        react_1.default.createElement(tabler_icons_react_1.ChevronRight, null)))),
            react_1.default.createElement(core_1.Box, { sx: (theme) => ({
                    height: 40,
                    backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FCAD3F', deg: 90 }),
                    color: theme.white,
                }) }, "Custom gradient"),
            react_1.default.createElement("div", { className: classes.actionButton },
                react_1.default.createElement(core_1.ActionIcon, { size: 70, radius: 100, variant: "filled", sx: (theme) => ({
                        backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FCAD3F', deg: 90 }),
                        color: theme.white,
                    }) },
                    react_1.default.createElement(tabler_icons_react_1.CirclePlus, { size: 34 }))))));
};
exports.default = Home;
//# sourceMappingURL=index.js.map