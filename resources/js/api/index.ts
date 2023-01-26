// import { showErrorNotificationWithColor } from "@/helpers";
import axios from "axios";

import { showNotification } from '@mantine/notifications';

export const instance = axios.create({
	headers: {
		"Content-Type": "application/json",
		accept: "application/json",
		"content-type": "application/json",
	},
});


instance.interceptors.request.use(
	(request) => {
		return request;
	},
	async (error) => { console.log('error',error); }
);

instance.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		console.log("Error");
		// console.log(JSON.stringify(err.response?.data?.errors));
		console.log(err.response);
		if (err.response) {
			if (err.response.status === 419 || err.response.status === 401) {
				showNotification({
					title: "Sesión vencida",
					message: "Por favor reinicia sesión",
				});
				// showErrorNotification({ title: "Sesión vencida", message: "Por favor reinicia sesión", color: 'orange' });
				setTimeout(() => {
					window.location.reload();
				}, 3000);
				return { success: false };
			}
			if (err.response.status === 400) {
				showNotification({
					title: "Duplicado",
					message: "Ya existe un registro con estos datos",
				});
				// showErrorNotification({ title: "Duplicado", message: "Ya existe un registro con estos datos", color: 'orange' });
				return { success: false };
			}
			if (err.response.status === 422) {
				console.log(err.response);
				let msg = err.response.data || "";
				console.log(msg);

				showNotification({
					title: "Error de datos",
					message: msg,
				});
				// showErrorNotification({ title: "Error de datos", message: msg, color: 'orange' });
				return { success: false };
			}
			if (err.response.status === 403) {
				console.log(err.response);
				let msg = err.response.data || "";
				console.log(msg);
				showNotification({
					title: "Error de autorización",
					message: msg,
				});
				// showErrorNotification({ title: "Error de autorización", message: msg, color: 'orange' });
				return { success: false };
			}
			if (err.response.status === 404) {
				showNotification({
					title: "Oh oh",
					message: "No se encontró el recurso solicitado",
				});
				// showErrorNotification({ title: "Oh oh", message: "No se encontró el recurso solicitado" });
				return { success: false };
			}

			if (err.response.data.errors) {
				console.log("Error");
				console.log(err.response.data);
				let errors = err.response.data.errors;
				Object.keys(errors).map(function (key, _index) {
					console.log(key);
					let joined = errors[key].join(", ");
					return showNotification({
						title: "Aviso",
						message: joined,
					});
					// return showErrorNotification({ title: "Aviso", message: joined, color: 'orange' });
				});
				return { success: false };
			}
			// return { success: false };
		}

		// console.log('ERROR normal');
		// showErrorNotification({ title: "Error", message: "Ocurrió un error", color: 'red' });
		showNotification({
			title: "Error",
			message: "Ocurrió un error",
		});
		return { success: false };
	},
);
