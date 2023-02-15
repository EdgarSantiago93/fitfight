"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const media_1 = require("../../api/media");
const core_1 = require("@mantine/core");
const modals_1 = require("@mantine/modals");
const styles_1 = require("./styles");
const ImageUploaderTest = ({ form, formValue, loading }) => {
    const { classes } = (0, styles_1.useStyles)();
    const [uploadProgress, setUploadProgress] = react_1.default.useState(0);
    const [previewUrl, setPreviewUrl] = react_1.default.useState('');
    const [isUploading, setIsUploading] = react_1.default.useState(false);
    const [fileReady, setFileReady] = react_1.default.useState(false);
    const inputRef = react_1.default.useRef(null);
    const handleFileInput = (e) => uploadFile(e.target.files[0]);
    const checkHeic = (url) => {
        if (url?.toLowerCase().includes('.heic') || url?.toLowerCase().includes('.heif')) {
            return true;
        }
        return false;
    };
    const compressImage = async (file, { quality = 1, type = file.type }) => {
        const imageBitmap = await createImageBitmap(file);
        console.log(imageBitmap);
        console.log(imageBitmap.width);
        console.log(imageBitmap.height);
        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(imageBitmap, 0, 0);
        const blob = await new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                }
                else {
                    resolve(new Blob());
                }
            }, type, quality);
        });
        return new File([blob], file.name, {
            type: blob.type,
        });
    };
    const uploadFile = async (file) => {
        setIsUploading(true);
        loading(true);
        if (!checkHeic(file.name)) {
            console.log('no es heic, compressing');
            const compressedFile = await compressImage(file, {
                quality: 0.5,
                type: 'image/jpeg',
            });
            file = compressedFile;
        }
        const requestObject = {
            file_name: file.name,
            file_type: file.type,
            file_size: file.size,
        };
        console.log(requestObject);
        const getTokenCall = await (0, media_1.getS3Token)(requestObject);
        if (getTokenCall?.success) {
            await (0, media_1.uploadToS3)({ url: getTokenCall?.data.url, file: file }, transformProgress).then(async () => {
                await (0, media_1.getMediaSignedURL)({
                    file_key: getTokenCall?.data.key,
                    is_live: false,
                    file_type: file.type,
                })
                    .then((response) => {
                    setPreviewUrl(() => generateUrl(response.data));
                    setIsUploading(false);
                    setFileReady(true);
                    form.setFieldValue(formValue, getTokenCall?.data.id);
                    loading(false);
                })
                    .catch((_error) => {
                    loading(false);
                });
            });
        }
    };
    const generateUrl = (url) => {
        if (url?.toLowerCase().includes('.heic') || url?.toLowerCase().includes('.heif')) {
            return 'https://cpmvzflwta.cloudimg.io/' + url;
        }
        return url;
    };
    const transformProgress = (progress) => {
        let pre = Math.round(progress * 100);
        setUploadProgress(pre);
    };
    react_1.default.useEffect(() => { }, []);
    const openPhotoModal = () => {
        (0, modals_1.openModal)({
            centered: true,
            children: (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement("img", { src: previewUrl, alt: "", className: classes.photoView })),
                react_1.default.createElement("div", { style: { width: '100%', textAlign: 'center', marginTop: '10px' } },
                    react_1.default.createElement(ButtonConfirm, { callback: deleteFile, text: "Borrar" })))),
        });
    };
    const deleteFile = () => {
        setPreviewUrl('');
        setFileReady(false);
        form.setFieldValue(formValue, '');
        setIsUploading(false);
        setUploadProgress(0);
        (0, modals_1.closeAllModals)();
    };
    const ButtonConfirm = ({ callback, text }) => {
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
            react_1.default.createElement(core_1.Button, { onClick: handleClick, variant: variant, loading: isLoading }, isFirstTime ? text : 'Confirmar')));
    };
    const handleInputRefClick = () => {
        if (isUploading)
            return;
        if (inputRef.current === null)
            return;
        inputRef.current.click();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !fileReady ? (react_1.default.createElement("div", { className: classes.uploadButton, onClick: handleInputRefClick }, isUploading ? (react_1.default.createElement("div", { className: classes.loaderProgress },
            react_1.default.createElement(core_1.Loader, null),
            uploadProgress,
            "%")) : ('📸'))) : (react_1.default.createElement("div", { style: {
                backgroundImage: `url(${previewUrl})`,
            }, className: classes.image, onClick: () => openPhotoModal() })),
        react_1.default.createElement("input", { type: "file", onChange: handleFileInput, ref: inputRef, style: { display: 'none' } })));
};
exports.default = ImageUploaderTest;
//# sourceMappingURL=index.js.map