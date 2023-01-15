import axios from "axios";

export const fetchUser = async () => {
    return axios
        .get("https://raw.githubusercontent.com/light9639/Shoe-Store/main/data/Shoes.json")
        .then((res) => res.data.Men)
        .catch((error) => error);
};
