import { ENV } from "@/shared/constants/env";
import type { Bounty } from "@/shared/types/bounties";
import axios from "axios";

export const getBounties = async (): Promise<Bounty[]> => {
  try {
    const res = await axios.get(`${ENV.API_URL}/bounties`);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Fetch bounties failed";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
};
