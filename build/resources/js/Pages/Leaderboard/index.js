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
const Leaderboard = (props) => {
    const {} = props;
    const user = props['user'];
    const userswithEntries = props['userswithEntries'];
    const { classes } = (0, styles_1.useStyles)();
    moment_1.default.locale('es');
    const participatingUsers = userswithEntries.filter((u) => u.hasEntries);
    const nonParticipatingUsers = userswithEntries.filter((u) => !u.hasEntries);
    const orderData = (data) => {
        return data.sort((a, b) => {
            if (a.entries.length !== b.entries.length) {
                return b.entries.length - a.entries.length;
            }
            else if (a.totalVotes !== b.totalVotes) {
                return b.totalVotes - a.totalVotes;
            }
            else {
                const aAverage = a.entries.reduce((sum, entry) => {
                    const date = new Date(entry.created_at.full_value);
                    return sum + date.valueOf();
                }, 0) / a.entries.length;
                const bAverage = b.entries.reduce((sum, entry) => {
                    const date = new Date(entry.created_at.full_value);
                    return sum + date.valueOf();
                }, 0) / b.entries.length;
                return aAverage - bAverage;
            }
        });
    };
    react_1.default.useEffect(() => { }, []);
    const sortedUsers = react_1.default.useMemo(() => orderData(participatingUsers), []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.wrapper },
            react_1.default.createElement(PageHeader_1.default, { user: user, showHome: true, showCal: true, showLb: false, showToday: true }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center' } },
                    react_1.default.createElement(core_1.Text, null,
                        "Leaderboard para",
                        ' ',
                        react_1.default.createElement("span", { style: { textTransform: 'capitalize' } }, (0, moment_1.default)().format('MMMM')))),
                react_1.default.createElement("div", { className: classes.topRow },
                    react_1.default.createElement("div", { className: classes.secondPlace },
                        react_1.default.createElement("div", { className: classes.placeNumber }, "2"),
                        react_1.default.createElement(Top3Component, { user: sortedUsers[1], classes: classes })),
                    react_1.default.createElement("div", { className: classes.firstPlace },
                        react_1.default.createElement("div", { className: classes.crown }, "\uD83D\uDC51"),
                        react_1.default.createElement(Top3Component, { user: sortedUsers[0], classes: classes })),
                    react_1.default.createElement("div", { className: classes.thirdPlace },
                        react_1.default.createElement("div", { className: classes.placeNumber }, "3"),
                        react_1.default.createElement(Top3Component, { user: sortedUsers[2], classes: classes }))),
                react_1.default.createElement("div", { className: classes.bottomRow },
                    sortedUsers.slice(3, sortedUsers.length).map((user, index) => {
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
const Top3Component = ({ user, classes }) => {
    const [tooltipOpened, setTooltipOpened] = react_1.default.useState(false);
    const ref = (0, hooks_1.useClickOutside)(() => setTooltipOpened(false));
    return user && user.hasEntries ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Tooltip, { label: `${user.totalVotes} votos totales`, opened: tooltipOpened, withArrow: true },
            react_1.default.createElement("div", { onClick: () => setTooltipOpened((o) => !o), ref: ref },
                react_1.default.createElement(core_1.Avatar, { src: user.avatar, radius: 100, size: 80 }),
                react_1.default.createElement("div", { className: classes.placeName }, user.name),
                react_1.default.createElement("div", { className: classes.placePts },
                    user.entries.length,
                    " pts."))))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Avatar, { src: "", radius: 100, size: 80 }),
        react_1.default.createElement("div", { className: classes.placeName }, "-"),
        react_1.default.createElement("div", { className: classes.placePts }, "-")));
};
exports.default = Leaderboard;
//# sourceMappingURL=index.js.map