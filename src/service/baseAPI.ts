import axios from "axios";

export const baseURL = "https://car-rental-api.goit.global/";

export const BASE_API = axios.create({ baseURL });
