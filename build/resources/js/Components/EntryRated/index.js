"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const styles_1 = require("./styles");
const modals_1 = require("@mantine/modals");
const ImageViewer_1 = __importDefault(require("../ImageViewer"));
const VotingComponent = (props) => {
    const {} = props;
    const { classes } = (0, styles_1.useStyles)();
    const openVoteModal = (type) => {
        (0, modals_1.openModal)({
            centered: true,
            title: 'Votos ' + (type == 'for' ? 'a favor ✅' : 'en contra ❌'),
            children: (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center', marginTop: '10px' } }, type == 'for' ? (react_1.default.createElement(react_1.default.Fragment, null, votesFor.map((vote, index) => {
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
                }))) : (react_1.default.createElement(react_1.default.Fragment, null, votesAgainst.map((vote, index) => {
                    return (react_1.default.createElement("div", { key: 'userlistocmponentag' + index, style: { display: 'flex', marginBottom: '5px' } },
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
                })))))),
        });
    };
    const [isLoading, setIsLoading] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        generateImage();
    }, [props.entry]);
    const checkHeic = (url) => {
        if (url?.toLowerCase().includes('.heic') || url?.toLowerCase().includes('.heif')) {
            return true;
        }
        return false;
    };
    const votesFor = props.entry?.votes.filter((vote) => vote.type === 'for');
    const votesAgainst = props.entry?.votes.filter((vote) => vote.type === 'against');
    const [trackFileUrl, _setTrackFileUrl] = react_1.default.useState(props.entry?.tracker_file_signed_url);
    const [poseFileUrl, _setPoseFileUrl] = react_1.default.useState(props.entry?.pose_file_signed_url);
    const [trackerComponent, setTrackerComponent] = react_1.default.useState(react_1.default.createElement(react_1.default.Fragment, null));
    const generateImage = () => {
        setTrackerComponent(react_1.default.createElement(ImageViewer_1.default, { image: trackFileUrl, isHeic: checkHeic(trackFileUrl) }));
    };
    return (react_1.default.createElement("div", { className: classes.notSubmitted },
        react_1.default.createElement(core_1.Grid, null,
            react_1.default.createElement(core_1.Grid.Col, { span: 4 },
                react_1.default.createElement("div", { className: classes.label }, "Tracker"),
                trackerComponent),
            react_1.default.createElement(core_1.Grid.Col, { span: 4 },
                react_1.default.createElement("div", { className: classes.label }, "Pose"),
                react_1.default.createElement(ImageViewer_1.default, { image: poseFileUrl, isHeic: checkHeic(props.entry?.tracker_file_signed_url) })),
            react_1.default.createElement(core_1.Grid.Col, { span: 4 },
                react_1.default.createElement("div", { style: { height: '50%' } },
                    react_1.default.createElement("div", { className: classes.label }, "\uD83D\uDD25"),
                    react_1.default.createElement(core_1.Text, { weight: 600, style: { marginTop: '0px' } }, props.entry?.calories === '' ? '-' : props.entry?.calories)),
                react_1.default.createElement("div", { style: { height: '50%' } },
                    react_1.default.createElement("div", { className: classes.label }, "\u23F0\uD83C\uDFCB\uD83C\uDFFC"),
                    react_1.default.createElement(core_1.Text, { weight: 600, style: { marginTop: '0px' } }, props.entry?.minutes === '' ? '-' : props.entry?.minutes))),
            react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                react_1.default.createElement("div", { style: { width: '100%', textAlign: 'left' } },
                    react_1.default.createElement(core_1.Text, { weight: 600, size: "lg" }, "Votos")),
                react_1.default.createElement(core_1.Text, { weight: 600, size: "md" }, "A favor \u2705"),
                react_1.default.createElement(core_1.Avatar.Group, { spacing: "sm", onClick: () => openVoteModal('for') },
                    votesFor?.map((vote, index) => {
                        if (index < 3) {
                            return react_1.default.createElement(core_1.Avatar, { key: vote.id + 'for', src: vote.user.avatar, radius: "xl" });
                        }
                    }),
                    votesFor?.length > 3 && react_1.default.createElement(core_1.Avatar, { radius: "xl" },
                        "+",
                        votesFor.length - 3)),
                react_1.default.createElement(core_1.Text, { weight: 600, size: "md" }, "En contra \u274C"),
                react_1.default.createElement(core_1.Avatar.Group, { spacing: "sm", onClick: () => openVoteModal('against') },
                    votesAgainst?.map((vote, index) => {
                        if (index < 3) {
                            return react_1.default.createElement(core_1.Avatar, { key: vote.id + 'ag', src: vote.user.avatar, radius: "xl" });
                        }
                    }),
                    votesAgainst?.length > 3 && react_1.default.createElement(core_1.Avatar, { radius: "xl" },
                        "+",
                        votesFor.length - 3))),
            react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                react_1.default.createElement(core_1.Text, { weight: 600, size: "md" }, "Status"),
                react_1.default.createElement(core_1.Text, { weight: 600, size: "xl" },
                    props.entry?.status === 'pending' && !props.entry.is_validated ? 'Validando 🕒' : '',
                    props.entry?.status === 'validated' && props.entry.is_validated ? 'Válida 👍🏼' : '',
                    props.entry?.status === 'rejected' && !props.entry.is_validated ? 'No válida 👎🏼' : '')))));
};
exports.default = VotingComponent;
//# sourceMappingURL=index.js.map