import { acceptBounty, getBountyById } from "@/services/api/bounty.service";
import { LocalStorageKeys } from "@/shared/constants/localStorageKeys";
import type { Bounty } from "@/shared/types/bounties";
import { Navigate, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const BountyPage = () => {
  const { bountyId } = useParams({ from: "/bounty/$bountyId" });
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate({ from: "/bounty/$bountyId" });

  useEffect(() => {
    const fetchData = async () => {
      if (!bountyId) return;

      try {
        setIsLoading(true);
        const data = await getBountyById(bountyId);
        setBounty(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bountyId]);

  if (!bountyId) return <Navigate to="/bounty" />;
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (!bounty)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Bounty not found
      </div>
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-yellow-100 text-yellow-800";
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const onAcceptClick = async () => {
    const userId = localStorage.getItem(LocalStorageKeys.USER_ID) || "";
    try {
      await acceptBounty({ userId, bountyId });

      navigate({ to: "/bounty" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {bounty.title}
              </h1>
              <p className="text-gray-600">{bounty.description}</p>
            </div>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(bounty.status)}`}
            >
              {bounty.status}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Target Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Target Information
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Target Name
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {bounty.targetName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Last Known Location
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">{bounty.planet}</p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Details
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Posted By
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {bounty.postedBy.username}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Posted Date
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(bounty.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Reward Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Reward
              </h2>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600 !mb-[24px]">
                  {bounty.reward.toLocaleString()} credits
                </p>
                {bounty.status !== "accepted" && (
                  <button
                    className="w-full bg-blue-600 text-white py-[16px] px-[32px] rounded-md hover:bg-blue-700 transition-colors"
                    onClick={onAcceptClick}
                  >
                    Accept Bounty
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
