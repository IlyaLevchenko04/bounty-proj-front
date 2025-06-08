import type { Bounty } from "@/shared/types/bounties";

interface BountyCardProps {
  bounty: Bounty;
}

export const BountyCard = ({ bounty }: BountyCardProps) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {bounty.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{bounty.description}</p>
        </div>
        <span
          className={`px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(bounty.status)}`}
        >
          {bounty.status}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">Target:</span>
          <span className="ml-2">{bounty.targetName}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">Location:</span>
          <span className="ml-2">{bounty.planet}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">Reward:</span>
          <span className="ml-2 text-green-600 font-semibold">
            {bounty.reward} credits
          </span>
        </div>
      </div>
    </div>
  );
};
