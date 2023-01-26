"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@mantine/core");
const form_1 = require("@mantine/form");
const auth_1 = require("../../api/auth");
const Login = (props) => {
    const form = (0, form_1.useForm)({
        initialValues: {
            email: '',
            password: '',
        },
    });
    const {} = props;
    react_1.default.useEffect(() => { }, []);
    const users = props['users'];
    const data = users.map((user) => {
        return {
            image: user.avatar,
            label: user.name,
            value: user.email,
        };
    });
    const SelectItem = react_1.default.forwardRef(({ image, label, description, ...others }, ref) => (react_1.default.createElement("div", { ref: ref, ...others },
        react_1.default.createElement(core_1.Group, { noWrap: true },
            react_1.default.createElement(core_1.Avatar, { src: image, radius: 100 }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(core_1.Text, { size: "md", weight: "semi-bold" }, label))))));
    const [isLoading, setIsLoading] = react_1.default.useState(false);
    const attemptLogin = async (data) => {
        setIsLoading(true);
        const apiCall = await (0, auth_1.login)(data);
        console.log('apiCall', apiCall);
        if (apiCall?.success) {
            console.log('successss');
            return (window.location.href = '/');
        }
        setIsLoading(false);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Container, { size: 420, my: 40 },
            react_1.default.createElement(core_1.Center, null,
                react_1.default.createElement(core_1.Image, { src: "/img/full_logo.png", width: 200 })),
            react_1.default.createElement(core_1.Paper, { withBorder: true, shadow: "md", p: 30, mt: 30, radius: "md" },
                react_1.default.createElement("form", { onSubmit: form.onSubmit((values) => attemptLogin(values)) },
                    react_1.default.createElement(core_1.Select, { label: "Bartolo", placeholder: "Escoge tu nombre", itemComponent: SelectItem, data: data, maxDropdownHeight: 400, nothingFound: "No hay nadie", filter: (value, item) => item.label?.toLowerCase().includes(value.toLowerCase().trim()) || false, required: true, ...form.getInputProps('email'), disabled: isLoading }),
                    react_1.default.createElement(core_1.PasswordInput, { label: "Password", placeholder: "Your password", required: true, mt: "md", ...form.getInputProps('password'), disabled: isLoading }),
                    react_1.default.createElement(core_1.Button, { fullWidth: true, mt: "xl", type: "submit", loading: isLoading }, "Entrar"))))));
};
exports.default = Login;
//# sourceMappingURL=index.js.map