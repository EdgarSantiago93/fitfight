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
    const entries = props['entries'];
    const { classes, cx } = (0, styles_1.useStyles)();
    moment_1.default.locale('es');
    const daysEs = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
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
    const getCurrentWeek = () => {
        var currentDate = (0, moment_1.default)();
        var weekStart = currentDate.clone().startOf('isoWeek');
        var days = [];
        for (var i = 0; i <= 6; i++) {
            let c = (0, moment_1.default)(weekStart).add(i, 'days');
            let userEntry = entries.find((e) => e.created_at.day == c.format('DD'));
            let v = {
                day: daysEs[c.format('d')],
                date: c.format('DD'),
                month: c.format('MMMM'),
                entry: userEntry,
            };
            days.push(v);
        }
        return days;
    };
    const [currentWeek, setCurrentWeek] = react_1.default.useState(() => getCurrentWeek());
    const [selectedDay, setSelectedDay] = react_1.default.useState((0, moment_1.default)().format('DD'));
    const [selectedDayIndex, setSelectedDayIndex] = react_1.default.useState((0, moment_1.default)().isoWeekday() - 1);
    const [isLoading, setisLoading] = react_1.default.useState();
    const [isLoadingOverlay, setIsLoadingOverlay] = react_1.default.useState(false);
    react_1.default.useEffect(() => { }, []);
    const getDayContainerClasses = (day) => {
        return cx(classes.dateContainer, { [classes.today]: (0, moment_1.default)().format('DD') == day.date }, { [classes.selectedDay]: selectedDay == day.date }, { [classes.validated]: day.entry?.is_validated && day.entry?.status == 'validated' }, {
            [classes.validatedSelected]: selectedDay == day.date && day.entry?.is_validated && day.entry?.status == 'validated',
        }, { [classes.forcedRest]: day.entry?.status == 'forced_rest' }, {
            [classes.pending]: !day.entry?.is_validated && !day.entry?.is_rest_day && day.entry?.status == 'pending',
        });
    };
    const generateComponent = () => {
        const selection = currentWeek[selectedDayIndex];
        console.log('selection', selection);
        if (!selection.entry && (0, moment_1.default)().format('DD') == selection.date) {
            return react_1.default.createElement(EntryNotSubmitted_1.default, { overlayLoad: setIsLoadingOverlay });
        }
        if (selection.entry?.is_rest_day) {
            return react_1.default.createElement("div", null, "Es un dia de descanso");
        }
        if (selection.entry?.is_validated && selection.entry?.status == 'validated') {
            return react_1.default.createElement("div", null, "Ya fue validado");
        }
        if (!selection.entry?.is_validated && selection.entry?.status == 'pending') {
            return react_1.default.createElement("div", null, "Esperando validacion");
        }
        if (selection.entry?.status == 'forced_rest') {
            return react_1.default.createElement("div", null, "Se acabo la semna");
        }
        if ((0, moment_1.default)().format('DD') < selection.date) {
            return react_1.default.createElement("div", null, "El dia aun no llega");
        }
    };
    const setDayAndIndex = (day, index) => {
        setSelectedDay(day);
        setSelectedDayIndex(index);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.wrapper },
            react_1.default.createElement(core_1.LoadingOverlay, { visible: isLoadingOverlay, overlayBlur: 2 }),
            react_1.default.createElement(core_1.Group, null,
                react_1.default.createElement(core_1.Image, { src: "/img/logo_h.png", width: 95 })),
            react_1.default.createElement("div", { className: classes.greeting },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: classes.greeting_text },
                        getGreeting(),
                        ","),
                    react_1.default.createElement("div", { className: classes.greeting_text_name }, user.name)),
                react_1.default.createElement("div", { className: classes.avatarContainer },
                    react_1.default.createElement(core_1.Menu, { shadow: "md", width: 200 },
                        react_1.default.createElement(core_1.Menu.Target, null,
                            react_1.default.createElement(core_1.Avatar, { src: user.avatar, size: 40, radius: 100 })),
                        react_1.default.createElement(core_1.Menu.Dropdown, null,
                            react_1.default.createElement(core_1.Menu.Item, { icon: react_1.default.createElement(tabler_icons_react_1.Logout, { size: 14 }), onClick: () => (window.location.href = 'logout') }, "Cerrar sesi\u00F3n"))))),
            react_1.default.createElement(core_1.Container, { className: classes.missingVotesContainer, sx: (theme) => ({
                    backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FBAB3E', deg: 45 }),
                }) },
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
                    } }, currentWeek.map((day, index) => {
                    return (react_1.default.createElement("div", { key: 'datebutton' + index, className: getDayContainerClasses(day), onClick: () => setDayAndIndex(day.date, index) },
                        react_1.default.createElement("div", { className: classes.day }, day.day),
                        react_1.default.createElement("div", { className: classes.date }, day.date),
                        react_1.default.createElement("div", null,
                            day.entry?.is_rest_day ? '😴' : null,
                            !day.entry && (0, moment_1.default)().format('DD') > day.date ? '❌' : null,
                            day.entry?.is_validated &&
                                day.entry?.status == 'validated' &&
                                !day.entry?.is_rest_day
                                ? '✅'
                                : null,
                            !day.entry?.is_validated &&
                                day.entry?.status == 'pending' &&
                                !day.entry?.is_rest_day
                                ? '🕒'
                                : null)));
                })),
                react_1.default.createElement("div", { className: classes.entryDescription },
                    isLoading && (react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center', marginTop: '50px' } },
                        react_1.default.createElement(core_1.Loader, { variant: "bars" }))),
                    generateComponent())))));
};
exports.default = Home;
//# sourceMappingURL=index.js.map