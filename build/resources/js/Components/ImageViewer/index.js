"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const modals_1 = require("@mantine/modals");
const styles_1 = require("./styles");
const ImageViewer = ({ image, isSmall = false, isHeic = false }) => {
    const { classes, cx } = (0, styles_1.useStyles)();
    react_1.default.useEffect(() => {
        console.log('image', image);
    }, [image]);
    const [imageUrl, _setImageUrl] = react_1.default.useState(`${isHeic ? 'https://cpmvzflwta.cloudimg.io/' : ''}${image}`);
    const openPhotoModal = () => {
        (0, modals_1.openModal)({
            centered: true,
            children: (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement("img", { src: imageUrl, alt: "", className: classes.photoView })),
                react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center', marginTop: '10px' } },
                    react_1.default.createElement(core_1.Button, { onClick: () => (0, modals_1.closeAllModals)() }, "Cerrar")))),
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, image ? (react_1.default.createElement("div", { style: {
            backgroundImage: `url(${imageUrl})`,
        }, key: imageUrl, className: cx(isSmall ? classes.smallImage : classes.image), onClick: () => openPhotoModal() })) : (react_1.default.createElement("div", { className: cx(isSmall ? classes.noImageSmall : classes.noImage), key: imageUrl }, "\uD83E\uDD37\uD83C\uDFFC\u200D\u2642\uFE0F"))));
};
exports.default = ImageViewer;
//# sourceMappingURL=index.js.map