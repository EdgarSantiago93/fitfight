
import { instance } from "../";

export const login = async(data:any) => {
	return instance
		.post('/login', data)
		.then((response) => {
			return response.data;
		});
};


