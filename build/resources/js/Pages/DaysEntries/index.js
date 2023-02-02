"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const styles_1 = require("./styles");
const moment_1 = __importDefault(require("moment"));
const PageHeader_1 = __importDefault(require("../../Components/PageHeader"));
const hooks_1 = require("@mantine/hooks");
const DaysEntries = (props) => {
    const {} = props;
    const user = props['user'];
    const userswithEntries = props['userswithEntries'];
    const { classes } = (0, styles_1.useStyles)();
    moment_1.default.locale('es');
    const participatingUsers = userswithEntries.filter((u) => u.hasEntries);
    const nonParticipatingUsers = userswithEntries.filter((u) => !u.hasEntries);
    const sortedUsers = participatingUsers
        .sort(function (x, y) {
        return x.entries.length - y.entries.length || x.totalVotes - y.totalVotes;
    })
        .reverse();
    react_1.default.useEffect(() => { }, []);
    const FirstPlaceComponent = () => {
        const [tooltipOpened, setTooltipOpened] = react_1.default.useState(false);
        const ref = (0, hooks_1.useClickOutside)(() => setTooltipOpened(false));
        return sortedUsers[0] && sortedUsers[0].hasEntries ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Tooltip, { label: `${sortedUsers[0].totalVotes} votos totales`, opened: tooltipOpened, withArrow: true },
                react_1.default.createElement("div", { onClick: () => setTooltipOpened((o) => !o), ref: ref },
                    react_1.default.createElement(core_1.Avatar, { src: sortedUsers[0].avatar, radius: 100, size: 80 }),
                    react_1.default.createElement("div", { className: classes.placeName }, sortedUsers[0].name),
                    react_1.default.createElement("div", { className: classes.placePts },
                        sortedUsers[0].entries.length,
                        " pts."))))) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Avatar, { src: "", radius: 100, size: 80 }),
            react_1.default.createElement("div", { className: classes.placeName }, "-"),
            react_1.default.createElement("div", { className: classes.placePts }, "-")));
    };
    const SecondPlaceComponent = () => {
        const [tooltipOpened, setTooltipOpened] = react_1.default.useState(false);
        const ref = (0, hooks_1.useClickOutside)(() => setTooltipOpened(false));
        return sortedUsers[1] && sortedUsers[1].hasEntries ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Tooltip, { label: `${sortedUsers[1].totalVotes} votos totales`, opened: tooltipOpened, withArrow: true },
                react_1.default.createElement("div", { onClick: () => setTooltipOpened((o) => !o), ref: ref },
                    react_1.default.createElement(core_1.Avatar, { src: sortedUsers[1].avatar, radius: 100, size: 80 }),
                    react_1.default.createElement("div", { className: classes.placeName }, sortedUsers[1].name),
                    react_1.default.createElement("div", { className: classes.placePts },
                        sortedUsers[1].entries.length,
                        " pts."))))) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Avatar, { src: "", radius: 100, size: 80 }),
            react_1.default.createElement("div", { className: classes.placeName }, "-"),
            react_1.default.createElement("div", { className: classes.placePts }, "-")));
    };
    const ThirdPlaceComponent = () => {
        const [tooltipOpened, setTooltipOpened] = react_1.default.useState(false);
        const ref = (0, hooks_1.useClickOutside)(() => setTooltipOpened(false));
        return sortedUsers[2] && sortedUsers[2].hasEntries ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Tooltip, { label: `${sortedUsers[0].totalVotes} votos totales`, opened: tooltipOpened, withArrow: true },
                react_1.default.createElement("div", { onClick: () => setTooltipOpened((o) => !o), ref: ref },
                    react_1.default.createElement(core_1.Avatar, { src: sortedUsers[2].avatar, radius: 100, size: 80 }),
                    react_1.default.createElement("div", { className: classes.placeName }, sortedUsers[2].name),
                    react_1.default.createElement("div", { className: classes.placePts },
                        sortedUsers[2].entries.length,
                        " pts."))))) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Avatar, { src: "", radius: 100, size: 80 }),
            react_1.default.createElement("div", { className: classes.placeName }, "-"),
            react_1.default.createElement("div", { className: classes.placePts }, "-")));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.wrapper },
            react_1.default.createElement(PageHeader_1.default, { user: user, showHome: true, showCal: true, showLb: false }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center' } },
                    react_1.default.createElement(core_1.Text, null,
                        "Participaciones de ",
                        (0, moment_1.default)().format('MM'),
                        react_1.default.createElement("span", { style: { textTransform: 'capitalize' } }, (0, moment_1.default)().format('MMMM')))),
                react_1.default.createElement("div", { className: classes.topRow },
                    react_1.default.createElement("div", { className: classes.secondPlace },
                        react_1.default.createElement("div", { className: classes.placeNumber }, "2"),
                        react_1.default.createElement(SecondPlaceComponent, null)),
                    react_1.default.createElement("div", { className: classes.firstPlace },
                        react_1.default.createElement("div", { className: classes.crown }, "\uD83D\uDC51"),
                        react_1.default.createElement(FirstPlaceComponent, null)),
                    react_1.default.createElement("div", { className: classes.thirdPlace },
                        react_1.default.createElement("div", { className: classes.placeNumber }, "3"),
                        react_1.default.createElement(ThirdPlaceComponent, null))),
                react_1.default.createElement("div", { className: classes.bottomRow },
                    sortedUsers.slice(2, sortedUsers.length).map((user, index) => {
                        const [tooltipOpened, setTooltipOpened] = react_1.default.useState(false);
                        const ref = (0, hooks_1.useClickOutside)(() => setTooltipOpened(false));
                        return (react_1.default.createElement("div", { className: classes.userRow, key: 'participating' + index },
                            react_1.default.createElement("div", { className: classes.userRowPlace },
                                index + 4,
                                "\u00BA"),
                            react_1.default.createElement(core_1.Avatar, { src: user.avatar, radius: 100, size: 43 }),
                            react_1.default.createElement("div", { className: classes.userRowName }, user.name),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("div", { className: classes.userRowPts },
                                    user.entries.length,
                                    "pts."),
                                react_1.default.createElement(core_1.Tooltip, { label: `${user.totalVotes} votos totales`, opened: tooltipOpened, withArrow: true },
                                    react_1.default.createElement("div", { ref: ref, className: classes.userRowTotalVotes, onClick: () => setTooltipOpened((o) => !o) },
                                        user.totalVotes,
                                        " \uD83D\uDDF3\uFE0F")))));
                    }),
                    react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center', marginTop: '5px', marginBottom: '5px' } },
                        react_1.default.createElement(core_1.Text, { weight: 600, size: "lg" }, "Bartolos que no han participado")),
                    nonParticipatingUsers.map((user, index) => {
                        return (react_1.default.createElement("div", { className: classes.userRow, key: 'nonparticipating' + index },
                            react_1.default.createElement(core_1.Avatar, { src: user.avatar, radius: 100, size: 43 }),
                            react_1.default.createElement("div", { className: classes.userRowName }, user.name),
                            react_1.default.createElement("div", { className: classes.userRowPts },
                                user.entries.length,
                                "pts.")));
                    }))))));
};
exports.default = DaysEntries;
//# sourceMappingURL=index.js.map