import axios from "axios";
import config from "../config";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const verifyToken = async () => {
    if (cookies.get("TOKEN") != null) {
        return axios
            .get(`${config.url_api}verifyToken`, {
                headers: { Authorization: cookies.get("TOKEN") || "" }
            })
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                return false;
            });
    } else {
        return false;
    }
};
