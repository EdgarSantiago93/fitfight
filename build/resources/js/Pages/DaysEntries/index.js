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
const modals_1 = require("@mantine/modals");
const ImageViewer_1 = __importDefault(require("../../Components/ImageViewer"));
const DaysEntries = (props) => {
    const {} = props;
    const today = props['today'];
    const user = props['user'];
    const { classes } = (0, styles_1.useStyles)();
    moment_1.default.locale('es');
    react_1.default.useEffect(() => { }, []);
    const openVoteModal = (type, votes) => {
        (0, modals_1.openModal)({
            centered: true,
            title: 'Votos ' + (type == 'for' ? 'a favor ✅' : 'en contra ❌'),
            children: (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center', marginTop: '10px' } },
                    react_1.default.createElement(react_1.default.Fragment, null, votes.map((vote, index) => {
                        return (react_1.default.createElement("div", { key: 'userlistocmponent' + index, style: { display: 'flex', marginBottom: '5px' } },
                            react_1.default.createElement(core_1.Avatar, { src: vote.user.avatar, radius: "xl", size: 33 }),
                            react_1.default.createElement("div", { style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '33px',
                                    marginLeft: '10px',
                                } },
                                react_1.default.createElement(core_1.Text, { weight: 500 },
                                    " ",
                                    vote.user.name,
                                    " "))));
                    }))))),
        });
    };
    const checkHeic = (url) => {
        if (url?.toLowerCase().includes('.heic') || url?.toLowerCase().includes('.heif')) {
            return true;
        }
        return false;
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.wrapper },
            react_1.default.createElement(PageHeader_1.default, { user: user, showHome: true, showCal: true, showLb: true, showToday: false }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center' } },
                    react_1.default.createElement(core_1.Text, null,
                        "Participaciones del ",
                        (0, moment_1.default)().format('MM'),
                        " de",
                        react_1.default.createElement("span", { style: { textTransform: 'capitalize', marginLeft: '3px' } }, (0, moment_1.default)().format('MMMM')))),
                react_1.default.createElement("div", null,
                    !today && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center', marginTop: '30px', fontWeight: 600 } }, "No hay participaciones para hoy"))),
                    today &&
                        today.map((entry, _index) => {
                            const votesFor = entry?.votes.filter((vote) => vote.type == 'for');
                            const votesAgainst = entry?.votes.filter((vote) => vote.type == 'against');
                            return (react_1.default.createElement("div", { key: entry.id, className: classes.entryContainer },
                                react_1.default.createElement(core_1.Grid, null,
                                    react_1.default.createElement(core_1.Grid.Col, { span: 12, className: classes.entryGrid },
                                        react_1.default.createElement("div", { className: classes.owner },
                                            react_1.default.createElement(core_1.Avatar, { key: entry.id, src: entry.user.avatar, radius: "xl", size: 'sm' }),
                                            react_1.default.createElement("span", { className: classes.ownerName }, entry.user.name),
                                            react_1.default.createElement("span", { className: classes.ownerAt }, "@"),
                                            react_1.default.createElement("span", { className: classes.ownerDate }, (0, moment_1.default)(entry.created_at?.full_value).format('HH:mm')))),
                                    react_1.default.createElement(core_1.Grid.Col, { span: 4 },
                                        react_1.default.createElement("div", { className: classes.label }, "Tracker"),
                                        react_1.default.createElement(ImageViewer_1.default, { image: entry?.tracker_file_signed_url, isSmall: true, isHeic: checkHeic(entry?.tracker_file_signed_url) })),
                                    react_1.default.createElement(core_1.Grid.Col, { span: 4 },
                                        react_1.default.createElement("div", { className: classes.label }, "Pose"),
                                        react_1.default.createElement(ImageViewer_1.default, { image: entry?.pose_file_signed_url, isSmall: true, isHeic: checkHeic(entry?.tracker_file_signed_url) })),
                                    react_1.default.createElement(core_1.Grid.Col, { span: 4 },
                                        react_1.default.createElement("div", { style: { height: '50%' } },
                                            react_1.default.createElement("div", { className: classes.label }, "\uD83D\uDD25"),
                                            react_1.default.createElement(core_1.Text, { weight: 600, style: { marginTop: '0px' } }, entry?.calories == '' ? '-' : entry?.calories)),
                                        react_1.default.createElement("div", { style: { height: '50%' } },
                                            react_1.default.createElement("div", { className: classes.label }, "\u23F0\uD83C\uDFCB\uD83C\uDFFC"),
                                            react_1.default.createElement(core_1.Text, { weight: 600, style: { marginTop: '0px' } }, entry?.minutes == '' ? '-' : entry?.minutes))),
                                    react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                                        react_1.default.createElement("div", { className: classes.label }, " A favor \u2705"),
                                        react_1.default.createElement(core_1.Avatar.Group, { spacing: "sm", onClick: () => openVoteModal('for', votesFor) },
                                            votesFor?.map((vote, index) => {
                                                if (index < 3) {
                                                    return (react_1.default.createElement(core_1.Avatar, { key: vote.id + 'for', src: vote.user.avatar, radius: "xl", size: 'sm' }));
                                                }
                                            }),
                                            votesFor?.length > 3 && (react_1.default.createElement(core_1.Avatar, { radius: "xl", size: 'sm' },
                                                "+",
                                                votesFor.length - 3)))),
                                    react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                                        react_1.default.createElement("div", { className: classes.label }, " En contra \u274C"),
                                        react_1.default.createElement(core_1.Avatar.Group, { spacing: "sm", onClick: () => openVoteModal('against', votesAgainst) },
                                            votesAgainst?.map((vote, index) => {
                                                if (index < 3) {
                                                    return (react_1.default.createElement(core_1.Avatar, { key: vote.id + 'for', src: vote.user.avatar, radius: "xl", size: 'sm' }));
                                                }
                                            }),
                                            votesAgainst?.length > 3 && (react_1.default.createElement(core_1.Avatar, { radius: "xl", size: 'sm' },
                                                "+",
                                                votesAgainst.length - 3)))))));
                        }))))));
};
exports.default = DaysEntries;
//# sourceMappingURL=index.js.map