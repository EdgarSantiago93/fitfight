"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const styles_1 = require("./styles");
const moment_1 = __importDefault(require("moment"));
const form_1 = require("@mantine/form");
const ImageUploaderTest_1 = __importDefault(require("../../Components/ImageUploaderTest"));
const Test = (props) => {
    const {} = props;
    const { classes } = (0, styles_1.useStyles)();
    moment_1.default.locale('es');
    const [isLoading, setisLoading] = react_1.default.useState();
    const [isLoadingOverlay, _setIsLoadingOverlay] = react_1.default.useState(false);
    react_1.default.useEffect(() => { }, []);
    const form = (0, form_1.useForm)({
        initialValues: {
            first_img: false,
            scd_img: false,
            thrd_img: false,
        },
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.wrapper },
            "TEST",
            react_1.default.createElement(core_1.LoadingOverlay, { visible: isLoadingOverlay, overlayBlur: 2 }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("div", { className: classes.todayDateContainer },
                            react_1.default.createElement("div", null, (0, moment_1.default)().format('DD [de] ')),
                            react_1.default.createElement("div", { style: { textTransform: 'capitalize', marginLeft: '3px' } }, (0, moment_1.default)().format('MMMM'))),
                        react_1.default.createElement("div", { className: classes.todayLabel }, "TEST UPLOAD"))),
                react_1.default.createElement("div", { className: classes.entryDescription },
                    isLoading && (react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center', marginTop: '50px' } },
                        react_1.default.createElement(core_1.Loader, { variant: "bars" }))),
                    react_1.default.createElement("div", { className: classes.label }, "1"),
                    react_1.default.createElement(ImageUploaderTest_1.default, { formValue: "first_img", form: form, loading: setisLoading, key: "first_img_key" }),
                    react_1.default.createElement("div", { className: classes.label }, "2"),
                    react_1.default.createElement(ImageUploaderTest_1.default, { formValue: "scd_img", form: form, loading: setisLoading, key: "scnd_img_key" }),
                    react_1.default.createElement("div", { className: classes.label }, "3"),
                    react_1.default.createElement(ImageUploaderTest_1.default, { formValue: "thrd_img", form: form, loading: setisLoading, key: "thrd_img_key" }))))));
};
exports.default = Test;
//# sourceMappingURL=index.js.map