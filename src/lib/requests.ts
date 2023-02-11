import ky from "ky";
import { API_URL } from "@/config";

export const api = ky.extend({
  prefixUrl: API_URL,
});
