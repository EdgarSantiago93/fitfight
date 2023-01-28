"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
const axios_1 = __importDefault(require("axios"));
const notifications_1 = require("@mantine/notifications");
const tabler_icons_react_1 = require("tabler-icons-react");
const react_1 = __importDefault(require("react"));
exports.instance = axios_1.default.create({
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'content-type': 'application/json',
    },
});
exports.instance.interceptors.request.use((request) => {
    return request;
}, async (error) => {
    console.log('error', error);
});
exports.instance.interceptors.response.use((res) => {
    return res;
}, async (err) => {
    console.log('Error');
    console.log(err.response);
    if (err.response) {
        if (err.response.status === 419 || err.response.status === 401) {
            (0, notifications_1.showNotification)({
                title: 'Sesión vencida',
                message: 'Por favor reinicia sesión',
            });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            return { success: false };
        }
        if (err.response.status === 400) {
            let msg = err.response.data || '';
            (0, notifications_1.showNotification)({
                title: 'Error de datos',
                message: msg,
            });
            return { success: false };
        }
        if (err.response.status === 409) {
            let msg = err.response.data || '';
            (0, notifications_1.showNotification)({
                disallowClose: false,
                autoClose: 50000,
                title: 'Uh oh!',
                message: msg,
                color: 'white',
                icon: react_1.default.createElement(tabler_icons_react_1.ExclamationMark, { color: "white" }),
                loading: false,
                styles: (theme) => ({
                    root: {
                        'borderColor': '#FBAB3E',
                        '&::before': { backgroundColor: theme.white },
                    },
                    closeButton: {},
                }),
            });
            return { success: false };
        }
        if (err.response.status === 422) {
            console.log(err.response);
            let msg = err.response.data || '';
            console.log(msg);
            (0, notifications_1.showNotification)({
                title: 'Error de datos',
                message: msg,
            });
            return { success: false };
        }
        if (err.response.status === 403) {
            console.log(err.response);
            let msg = err.response.data || '';
            console.log(msg);
            (0, notifications_1.showNotification)({
                title: 'Error de autorización',
                message: msg,
            });
            return { success: false };
        }
        if (err.response.status === 404) {
            (0, notifications_1.showNotification)({
                title: 'Oh oh',
                message: 'No se encontró el recurso solicitado',
            });
            return { success: false };
        }
        if (err.response.data.errors) {
            console.log('Error');
            console.log(err.response.data);
            let errors = err.response.data.errors;
            Object.keys(errors).map(function (key, _index) {
                console.log(key);
                let joined = errors[key].join(', ');
                return (0, notifications_1.showNotification)({
                    title: 'Aviso',
                    message: joined,
                });
            });
            return { success: false };
        }
    }
    (0, notifications_1.showNotification)({
        title: 'Error',
        message: 'Ocurrió un error',
    });
    return { success: false };
});
//# sourceMappingURL=index.js.map