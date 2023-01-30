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
const NoEntry_1 = __importDefault(require("../../Components/NoEntry"));
const EntryRated_1 = __importDefault(require("../../Components/EntryRated"));
const DayToCome_1 = __importDefault(require("../../Components/DayToCome"));
const PageHeader_1 = __importDefault(require("../../Components/PageHeader"));
const Home = (props) => {
    const {} = props;
    const user = props['user'];
    const entries = props['entries'];
    const { classes, cx } = (0, styles_1.useStyles)();
    moment_1.default.locale('es');
    const daysEs = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
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
            return react_1.default.createElement(EntryRated_1.default, { entry: selection.entry });
        }
        if (!selection.entry?.is_validated && selection.entry?.status == 'pending') {
            return react_1.default.createElement(EntryRated_1.default, { entry: selection.entry });
        }
        if (selection.entry?.status == 'forced_rest') {
            return react_1.default.createElement("div", null, "Se acabo la semna");
        }
        if ((0, moment_1.default)().format('DD') < selection.date) {
            return react_1.default.createElement(DayToCome_1.default, null);
        }
        if (!selection.entry) {
            return react_1.default.createElement(NoEntry_1.default, null);
        }
    };
    const setDayAndIndex = (day, index) => {
        setSelectedDay(day);
        setSelectedDayIndex(index);
    };
    const [shouldVote, setShouldVote] = react_1.default.useState(false);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.wrapper },
            react_1.default.createElement(core_1.LoadingOverlay, { visible: isLoadingOverlay, overlayBlur: 2 }),
            react_1.default.createElement(PageHeader_1.default, { user: user, showCal: true, showLb: true }),
            !shouldVote && (react_1.default.createElement(core_1.Container, { className: classes.missingVotesContainer, sx: (theme) => ({
                    backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FBAB3E', deg: 45 }),
                }), onClick: () => (window.location.href = '/vote') },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: classes.missingVotesContainer_top }, "12 entradas por votar"),
                    react_1.default.createElement("div", { className: classes.missingVotesContainer_bottom }, "Mostrar detalles")),
                react_1.default.createElement("div", { className: classes.missingVotesContainer_icon },
                    react_1.default.createElement(core_1.ThemeIcon, { variant: "light", radius: "xl", size: "lg" },
                        react_1.default.createElement(tabler_icons_react_1.ChevronRight, null))))),
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