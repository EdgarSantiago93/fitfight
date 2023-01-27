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
const EntryNotSubmitted_1 = __importDefault(require("../../Components/EntryNotSubmitted"));
const Home = (props) => {
    const {} = props;
    const user = props['user'];
    const { classes, cx } = (0, styles_1.useStyles)();
    const daysEs = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    const getCurrentWeek = () => {
        var currentDate = (0, moment_1.default)();
        var weekStart = currentDate.clone().startOf('isoWeek');
        var days = [];
        for (var i = 0; i <= 6; i++) {
            let c = (0, moment_1.default)(weekStart).add(i, 'days');
            let v = {
                day: daysEs[c.format('d')],
                date: c.format('DD'),
                month: c.format('MMMM'),
            };
            days.push(v);
        }
        return days;
    };
    moment_1.default.locale('es-mx');
    react_1.default.useEffect(() => { }, []);
    const [selectedDay, setSelectedDay] = react_1.default.useState((0, moment_1.default)().format('DD'));
    const [isLoading, setisLoading] = react_1.default.useState();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.wrapper },
            react_1.default.createElement(core_1.Group, null,
                react_1.default.createElement(core_1.Image, { src: "/img/logo_h.png", width: 95 })),
            react_1.default.createElement("div", { className: classes.greeting },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: classes.greeting_text }, "Buenos dias,"),
                    react_1.default.createElement("div", { className: classes.greeting_text_name }, user.name)),
                react_1.default.createElement("div", { className: classes.avatarContainer },
                    react_1.default.createElement(core_1.Menu, { shadow: "md", width: 200 },
                        react_1.default.createElement(core_1.Menu.Target, null,
                            react_1.default.createElement(core_1.Avatar, { src: user.avatar, size: 40, radius: 100 })),
                        react_1.default.createElement(core_1.Menu.Dropdown, null,
                            react_1.default.createElement(core_1.Menu.Item, { icon: react_1.default.createElement(tabler_icons_react_1.Logout, { size: 14 }), onClick: () => (window.location.href = 'logout') }, "Cerrar sesi\u00F3n"))))),
            react_1.default.createElement("div", { className: classes.missingVotesContainer },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: classes.missingVotesContainer_top }, "12 entradas por votar"),
                    react_1.default.createElement("div", { className: classes.missingVotesContainer_bottom }, "Mostrar detalles")),
                react_1.default.createElement("div", { className: classes.missingVotesContainer_icon },
                    react_1.default.createElement(core_1.ThemeIcon, { variant: "light", radius: "xl", size: "xl" },
                        react_1.default.createElement(tabler_icons_react_1.ChevronRight, null)))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: classes.todayDateContainer },
                    react_1.default.createElement("div", null, (0, moment_1.default)().format('DD [de] ')),
                    react_1.default.createElement("div", { style: { textTransform: 'capitalize', marginLeft: '3px' } }, (0, moment_1.default)().format('MMMM'))),
                react_1.default.createElement("div", { className: classes.todayLabel }, "Hoy"),
                react_1.default.createElement("div", { style: {
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignContent: 'center',
                        marginTop: '10px',
                    } }, getCurrentWeek().map((day, index) => {
                    return (react_1.default.createElement("div", { key: 'datebutton' + index, className: cx(classes.dateContainer, selectedDay == day.date ? classes.selectedDay : null, (0, moment_1.default)().format('DD') == day.date ? classes.today : null), onClick: () => setSelectedDay(day.date) },
                        react_1.default.createElement("div", { className: classes.day }, day.day),
                        react_1.default.createElement("div", { className: classes.date }, day.date)));
                })),
                react_1.default.createElement("div", { className: classes.entryDescription },
                    isLoading && (react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center', marginTop: '50px' } },
                        react_1.default.createElement(core_1.Loader, { variant: "bars" }))),
                    react_1.default.createElement(EntryNotSubmitted_1.default, null)),
                react_1.default.createElement("div", { className: classes.notSubmitted },
                    "not submitted",
                    react_1.default.createElement(core_1.Grid, null,
                        react_1.default.createElement(core_1.Grid.Col, { span: 6 }, "foto de tracker"),
                        react_1.default.createElement(core_1.Grid.Col, { span: 6 }, "foto de pose"),
                        react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                            react_1.default.createElement(core_1.TextInput, { placeholder: "Your name", label: "Calorias", radius: "md", size: "md" })),
                        react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                            react_1.default.createElement(core_1.TextInput, { placeholder: "Your name", label: "Minutos ejercicio", radius: "md", size: "md" })))),
                react_1.default.createElement("div", { className: classes.inprogress }, "inprogress"),
                react_1.default.createElement("div", { className: classes.valid }, "valid"),
                react_1.default.createElement("div", { className: classes.invalid }, "invalid")))));
};
exports.default = Home;
//# sourceMappingURL=index.js.map