import { getBounties } from "@/services/api/bounty.service";
import type { Bounty } from "@/shared/types/bounties";
import { useEffect, useState } from "react";
import { BountyCard } from "./components/BountyCard";

export const Bounties = () => {
  const [bounties, setBounties] = useState<Bounty[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBounties();
        setBounties(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bounties.map((bounty) => (
          <BountyCard key={bounty._id} bounty={bounty} />
        ))}
      </div>
    </div>
  );
};
