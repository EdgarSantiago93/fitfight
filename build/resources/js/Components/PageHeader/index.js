"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const styles_1 = require("./styles");
const tabler_icons_react_1 = require("tabler-icons-react");
const moment_1 = __importDefault(require("moment"));
const PageHeader = ({ user, showHome = false, showLb = false, showCal = false }) => {
    const { classes } = (0, styles_1.useStyles)();
    moment_1.default.locale('es');
    const getGreeting = () => {
        const currentHour = (0, moment_1.default)().hour();
        if (currentHour >= 6 && currentHour < 12) {
            return 'Buenos días';
        }
        else if (currentHour >= 12 && currentHour < 18) {
            return 'Buenas tardes';
        }
        else if (currentHour >= 18 || currentHour < 6) {
            return 'Buenas noches';
        }
        return 'Hola';
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Group, null,
            react_1.default.createElement(core_1.Image, { src: "/img/logo_h.png", width: 95, onClick: () => (window.location.href = '/') })),
        react_1.default.createElement("div", { className: classes.greeting },
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: classes.greeting_text },
                    getGreeting(),
                    ","),
                react_1.default.createElement("div", { className: classes.greeting_text_name }, user.name)),
            react_1.default.createElement("div", { className: classes.avatarContainer },
                showHome && (react_1.default.createElement(core_1.ActionIcon, { color: "red", size: "xl", radius: "xl", variant: "filled", onClick: () => (window.location.href = '/'), style: { marginRight: 5 } },
                    react_1.default.createElement(tabler_icons_react_1.Home2, { size: 34 }))),
                showLb && (react_1.default.createElement(core_1.ActionIcon, { color: "red", size: "xl", radius: "xl", variant: "filled", onClick: () => (window.location.href = '/lb'), style: { marginRight: 5 } },
                    react_1.default.createElement(tabler_icons_react_1.Medal, { size: 34 }))),
                showCal && (react_1.default.createElement(core_1.ActionIcon, { color: "red", size: "xl", radius: "xl", variant: "filled", onClick: () => (window.location.href = '/cal'), style: { marginRight: 5 } },
                    react_1.default.createElement(tabler_icons_react_1.Calendar, { size: 34 }))),
                react_1.default.createElement(core_1.Menu, { shadow: "md", width: 200 },
                    react_1.default.createElement(core_1.Menu.Target, null,
                        react_1.default.createElement(core_1.Avatar, { src: user.avatar, size: 40, radius: 100 })),
                    react_1.default.createElement(core_1.Menu.Dropdown, null,
                        react_1.default.createElement(core_1.Menu.Item, { icon: react_1.default.createElement(tabler_icons_react_1.Logout, { size: 14 }), onClick: () => (window.location.href = 'logout') }, "Cerrar sesi\u00F3n")))))));
};
exports.default = PageHeader;
//# sourceMappingURL=index.js.map