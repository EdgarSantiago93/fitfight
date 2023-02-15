"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const styles_1 = require("./styles");
const modals_1 = require("@mantine/modals");
const moment_1 = __importDefault(require("moment"));
const ImageUploader_1 = __importDefault(require("../../Components/ImageUploader"));
const form_1 = require("@mantine/form");
const entry_1 = require("../../api/entry");
const EntryNotSubmitted = (props) => {
    const form = (0, form_1.useForm)({
        initialValues: {
            pose_img: false,
            tracker_img: false,
            calories: '',
            minutes: '',
            is_rest_day: false,
        },
    });
    const {} = props;
    const { classes } = (0, styles_1.useStyles)();
    const openSubmitRestDayModal = () => (0, modals_1.openConfirmModal)({
        title: 'Día de descanso',
        centered: true,
        children: (react_1.default.createElement(core_1.Text, { size: "sm" },
            "Vas a subir un d\u00EDa de descanso para el d\u00EDa de hoy(",
            (0, moment_1.default)().format('DD'),
            "), solo puedes tener un d\u00EDa de descanso por semana. \u00BFEst\u00E1s seguro de continuar?")),
        labels: { confirm: '😴 Continuar', cancel: 'Cancelar' },
        confirmProps: { color: 'red' },
        onCancel: () => { },
        onConfirm: () => processRestDay(),
    });
    const openSubmitModal = () => (0, modals_1.openConfirmModal)({
        title: 'Entrada para ' + (0, moment_1.default)().format('DD') + ' de ' + (0, moment_1.default)().format('MMMM'),
        centered: true,
        children: (react_1.default.createElement(core_1.Text, { size: "sm" },
            "Vas a subir una entrada para el d\u00EDa de hoy(",
            (0, moment_1.default)().format('DD'),
            " de",
            ' ',
            (0, moment_1.default)().format('MMMM'),
            "). ",
            react_1.default.createElement("b", null, "No"),
            " se puede modificar despu\u00E9s, \u00BFEst\u00E1s seguro de continuar?")),
        labels: { confirm: '💪 Vamos', cancel: 'Cancelar' },
        confirmProps: { color: 'red' },
        onCancel: () => { },
        onConfirm: () => processEntry(),
    });
    const openConfirmEmptyModal = () => (0, modals_1.openConfirmModal)({
        title: 'Tienes campos vacios',
        centered: true,
        children: (react_1.default.createElement(core_1.Text, { size: "sm" },
            "Tienes campos vacios. \u00A0",
            react_1.default.createElement("b", null, "No"),
            " podr\u00E1s modificar esta entrada despu\u00E9s, \u00BFEst\u00E1s seguro de continuar?")),
        labels: { confirm: 'Confirmar', cancel: 'Regresar' },
        confirmProps: { color: 'red' },
        onCancel: () => { },
        onConfirm: () => processEntry(true),
    });
    const processRestDay = () => {
        form.values.is_rest_day = true;
        processEntry().then(() => {
            form.values.is_rest_day = false;
        });
    };
    const processEntry = async (override = false) => {
        if (!form.isDirty() && override === false && form.values.is_rest_day === false) {
            (0, modals_1.closeAllModals)();
            return setTimeout(() => {
                openConfirmEmptyModal();
            }, 300);
        }
        props.overlayLoad(true);
        const processEntryCall = await (0, entry_1.createEntry)(form.values);
        if (processEntryCall?.success) {
            window.location.reload();
        }
        else {
            props.overlayLoad(false);
        }
    };
    const [trackerLoading, setTrackerLoading] = react_1.default.useState(false);
    const [poseLoading, setPoseLoading] = react_1.default.useState(false);
    react_1.default.useEffect(() => { }, []);
    return (react_1.default.createElement("div", { className: classes.notSubmitted },
        react_1.default.createElement(core_1.Grid, null,
            react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                react_1.default.createElement("div", { className: classes.label }, "Tracker"),
                react_1.default.createElement(ImageUploader_1.default, { formValue: "tracker_img", form: form, loading: setTrackerLoading, key: "tracker_img_key" })),
            react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                react_1.default.createElement("div", { className: classes.label }, "Pose"),
                react_1.default.createElement(ImageUploader_1.default, { formValue: "pose_img", form: form, loading: setPoseLoading, key: "pose_img_key" })),
            react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                react_1.default.createElement(core_1.TextInput, { label: "Calorias", radius: "md", size: "md", ...form.getInputProps('calories') })),
            react_1.default.createElement(core_1.Grid.Col, { span: 6 },
                react_1.default.createElement(core_1.TextInput, { label: "Minutos ejercicio", radius: "md", size: "md", ...form.getInputProps('minutes') })),
            react_1.default.createElement(core_1.Grid.Col, { span: 12 },
                react_1.default.createElement("div", { style: {
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '100%',
                        alignContent: 'center',
                    } },
                    react_1.default.createElement(core_1.Button, { component: "a", href: "#", variant: "subtle", leftIcon: react_1.default.createElement(react_1.default.Fragment, null, "\uD83D\uDE34"), onClick: () => openSubmitRestDayModal(), disabled: poseLoading || trackerLoading }, "Hoy es descanso"),
                    react_1.default.createElement(core_1.Button, { component: "a", href: "#", variant: "outline", leftIcon: react_1.default.createElement(react_1.default.Fragment, null, "\uD83D\uDCAA"), onClick: () => openSubmitModal(), disabled: poseLoading || trackerLoading }, "Vamos"))))));
};
exports.default = EntryNotSubmitted;
//# sourceMappingURL=index.js.map