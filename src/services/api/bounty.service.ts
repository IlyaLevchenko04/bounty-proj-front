import { ENV } from "@/shared/constants/env";
import type { Bounty } from "@/shared/types/bounties";
import axios from "axios";
import { getAuthHeader } from "./auth.service";

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

export const getBountyById = async (id: string): Promise<Bounty> => {
  try {
    const res = await axios.get(`${ENV.API_URL}/bounties/${id}`, {
      headers: getAuthHeader(),
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Fetch bounties failed";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const acceptBounty = async ({
  bountyId,
  userId,
}: {
  bountyId: string;
  userId: string;
}) => {
  if (!userId) return console.error("No userId was provided");

  try {
    const res = await axios.post(
      `${ENV.API_URL}/bounties/${bountyId}/accept`,
      {
        userId,
      },
      {
        headers: getAuthHeader(),
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Fetch bounties failed";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createBounty = async (
  bountyData: Omit<Bounty, "_id" | "status">
) => {
  const response = await axios.post<Bounty>(
    `${ENV.API_URL}/bounties`,
    {
      ...bountyData,
      status: "open",
    },
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};
