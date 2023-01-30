"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const styles_1 = require("./styles");
const moment_1 = __importDefault(require("moment"));
const VotingComponent_1 = __importDefault(require("../../Components/VotingComponent"));
const PageHeader_1 = __importDefault(require("../../Components/PageHeader"));
const Vote = (props) => {
    const {} = props;
    const user = props['user'];
    const entriesToVoteOn = props['entriesToVoteOn'];
    const earliestEntry = props['earliestEntry'];
    const { classes } = (0, styles_1.useStyles)();
    moment_1.default.locale('es');
    react_1.default.useEffect(() => {
        console.log(entriesToVoteOn);
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.wrapper },
            react_1.default.createElement(PageHeader_1.default, { user: user, showHome: true, showCal: true, showLb: true }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center' } },
                    react_1.default.createElement(core_1.Text, null, "Voting")),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(VotingComponent_1.default, { earliestEntry: earliestEntry, entry: entriesToVoteOn[0] }))))));
};
exports.default = Vote;
//# sourceMappingURL=index.js.map