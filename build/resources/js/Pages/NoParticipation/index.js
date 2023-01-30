"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const tabler_icons_react_1 = require("tabler-icons-react");
const styles_1 = require("./styles");
const moment_1 = __importDefault(require("moment"));
const PageHeader_1 = __importDefault(require("../../Components/PageHeader"));
const NoParticipation = (props) => {
    const {} = props;
    const user = props['user'];
    const { classes } = (0, styles_1.useStyles)();
    moment_1.default.locale('es');
    react_1.default.useEffect(() => { }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.wrapper },
            react_1.default.createElement(PageHeader_1.default, { user: user, showHome: true, showCal: true, showLb: true }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { style: { width: '100%', fontSize: '40px', textAlign: 'center' } }, "\u270B\uD83C\uDFFC"),
                "Para votar tienes que participar hoy. ",
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                "- Sube una sesi\u00F3n de ejercicio.",
                react_1.default.createElement("br", null),
                "- Marca hoy como d\u00EDa de descanso. ",
                react_1.default.createElement("br", null),
                " - Si ya tienes 5 sesiones + 1 d\u00EDa de descanso esta semana, automaticamente puedes votar.",
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center' } },
                    react_1.default.createElement(core_1.Button, { onClick: () => (window.location.href = '/'), leftIcon: react_1.default.createElement(tabler_icons_react_1.ChevronLeft, { size: 20 }) }, "Regresar"))))));
};
exports.default = NoParticipation;
//# sourceMappingURL=index.js.map