"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const styles_1 = require("./styles");
const ImageViewer_1 = __importDefault(require("../ImageViewer"));
const EntryRated = (props) => {
    const {} = props;
    const { classes } = (0, styles_1.useStyles)();
    const [isLoading, setIsLoading] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        console.log('entry rated');
        console.log(props.earliestEntry);
    }, []);
    const ButtonConfirm = ({ callback, text, color }) => {
        const [isFirstTime, setIsFirstTime] = react_1.default.useState(true);
        const [isLoading, setIsLoading] = react_1.default.useState(false);
        const [timeoutVar, setTimeoutVar] = react_1.default.useState('');
        const handleClick = () => {
            if (isFirstTime) {
                setIsFirstTime(false);
                setTimeoutVar(() => setTimeout(() => {
                    setIsFirstTime(true);
                }, 2000));
            }
            else {
                clearTimeout(timeoutVar);
                setIsLoading(true);
                callback();
            }
        };
        let variant = isFirstTime ? 'filled' : 'outline';
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Button, { onClick: handleClick, variant: variant, loading: isLoading, color: color, style: { width: '100%' } }, isFirstTime ? text : 'Confirmar')));
    };
    return (react_1.default.createElement("div", { className: classes.notSubmitted },
        react_1.default.createElement(core_1.Grid, { sx: (theme) => ({
                backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FBAB3E', deg: 45 }),
                borderRadius: '10px',
                marginBottom: '10px',
            }) },
            react_1.default.createElement(core_1.Grid.Col, { span: 12 },
                react_1.default.createElement("div", { style: {
                        display: 'flex',
                        height: '35px',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        padding: '0px 8px',
                        paddingBottom: '0px',
                    } },
                    react_1.default.createElement(core_1.Avatar, { src: props.earliestEntry?.user?.avatar, radius: "xl", size: 35 }),
                    react_1.default.createElement("div", { className: classes.label, style: { marginLeft: '5px', letterSpacing: '-.5' } }, props.earliestEntry?.user?.name))),
            react_1.default.createElement(core_1.Grid.Col, { span: 12, style: { display: 'flex', justifyContent: 'space-between', paddingTop: '0px' } },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: classes.label }, "Tracker"),
                    react_1.default.createElement(ImageViewer_1.default, { image: props.earliestEntry?.tracker_file_signed_url, isSmall: true }),
                    ' '),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: classes.label }, "Pose"),
                    react_1.default.createElement(ImageViewer_1.default, { image: props.earliestEntry?.pose_file_signed_url, isSmall: true }),
                    ' '),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { style: { height: '50%' } },
                        react_1.default.createElement("div", { className: classes.label }, "Calorias"),
                        react_1.default.createElement(core_1.Text, { weight: 600, style: { marginTop: '0px' } }, props.earliestEntry?.calories == '' ? '-' : props.earliestEntry?.calories)),
                    react_1.default.createElement("div", { style: { height: '50%' } },
                        react_1.default.createElement("div", { className: classes.label }, "Minutos Ejercicio"),
                        react_1.default.createElement(core_1.Text, { weight: 600, style: { marginTop: '0px' } }, props.earliestEntry?.minutes == '' ? '-' : props.earliestEntry?.minutes))))),
        react_1.default.createElement(core_1.Grid, null,
            react_1.default.createElement(core_1.Grid.Col, { span: 12 },
                react_1.default.createElement("div", { style: {
                        display: 'flex',
                        height: '35px',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        padding: '0px 8px',
                    } },
                    react_1.default.createElement(core_1.Avatar, { src: props.entry?.user?.avatar, radius: "xl", size: 35 }),
                    react_1.default.createElement("div", { className: classes.label, style: { marginLeft: '5px', letterSpacing: '-.5' } }, props.entry?.user?.name))),
            react_1.default.createElement(core_1.Grid.Col, { span: 4 },
                react_1.default.createElement("div", { className: classes.label }, "Tracker"),
                react_1.default.createElement(ImageViewer_1.default, { image: props.entry?.tracker_file_signed_url })),
            react_1.default.createElement(core_1.Grid.Col, { span: 4 },
                react_1.default.createElement("div", { className: classes.label }, "Pose"),
                react_1.default.createElement(ImageViewer_1.default, { image: props.entry?.pose_file_signed_url })),
            react_1.default.createElement(core_1.Grid.Col, { span: 4 },
                react_1.default.createElement("div", { style: { height: '50%' } },
                    react_1.default.createElement("div", { className: classes.label }, "Calorias"),
                    react_1.default.createElement(core_1.Text, { weight: 600, style: { marginTop: '0px' } }, props.entry?.calories == '' ? '-' : props.entry?.calories)),
                react_1.default.createElement("div", { style: { height: '50%' } },
                    react_1.default.createElement("div", { className: classes.label }, "Minutos Ejercicio"),
                    react_1.default.createElement(core_1.Text, { weight: 600, style: { marginTop: '0px' } }, props.entry?.minutes == '' ? '-' : props.entry?.minutes))),
            react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center' } },
                    react_1.default.createElement(core_1.Text, { weight: 600, size: "lg" }, "Votos"))),
            react_1.default.createElement(core_1.Grid.Col, { span: 12 },
                react_1.default.createElement("div", { style: { display: 'flex', width: '100%' } },
                    react_1.default.createElement("div", { style: { paddingLeft: '3px', paddingRight: '3px', width: '100%' } },
                        react_1.default.createElement(ButtonConfirm, { callback: () => { }, text: "\uD83D\uDC4E", color: "red" })),
                    react_1.default.createElement("div", { style: { paddingLeft: '3px', paddingRight: '3px', width: '100%' } },
                        react_1.default.createElement(ButtonConfirm, { callback: () => { }, text: "\uD83D\uDC4D", color: "green" }),
                        ' '))))));
};
exports.default = EntryRated;
//# sourceMappingURL=index.js.map