import { createBounty } from "@/services/api/bounty.service";
import { LocalStorageKeys } from "@/shared/constants/localStorageKeys";
import type { IBounty } from "@/shared/types/bounties";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type CreateBountyFormData = Omit<
  IBounty,
  "_id" | "status" | "postedBy" | "acceptedBy"
>;

export const CreateBounty = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateBountyFormData>({
    title: "",
    description: "",
    targetName: "",
    planet: "",
    reward: 0,
    imageUrl: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "reward" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userId = localStorage.getItem(LocalStorageKeys.USER_ID);
      if (!userId) {
        throw new Error("User not authenticated");
      }

      await createBounty({
        ...formData,
        postedBy: userId,
      });

      navigate({ to: "/bounty" });
    } catch (error) {
      console.error("Error creating bounty:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create New Bounty
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter bounty title"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the bounty details"
              />
            </div>

            {/* Target Name */}
            <div>
              <label
                htmlFor="targetName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Target Name
              </label>
              <input
                type="text"
                id="targetName"
                name="targetName"
                required
                value={formData.targetName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter target's name"
              />
            </div>

            {/* Planet */}
            <div>
              <label
                htmlFor="planet"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Planet
              </label>
              <input
                type="text"
                id="planet"
                name="planet"
                required
                value={formData.planet}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter planet name"
              />
            </div>

            {/* Reward */}
            <div>
              <label
                htmlFor="reward"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reward (credits)
              </label>
              <input
                type="number"
                id="reward"
                name="reward"
                required
                min="0"
                value={formData.reward}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter reward amount"
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL (optional)
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter image URL"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {isLoading ? "Creating..." : "Create Bounty"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
