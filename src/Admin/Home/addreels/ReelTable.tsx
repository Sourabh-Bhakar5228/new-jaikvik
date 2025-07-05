import type { Reel } from "./reel";

interface ReelTableProps {
  reels?: Reel[]; // Optional now
  onEdit?: (reel: Reel) => void;
  onDelete?: (id: string) => void;
}

const ReelTable = ({
  reels = [],
  onEdit = () => {},
  onDelete = () => {},
}: ReelTableProps) => {
  if (reels.length === 0) {
    return <p className="text-gray-400">No reels found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">
              Poster
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">
              Video URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {reels.map((reel) => (
            <tr key={reel.id} className="hover:bg-gray-750">
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={reel.poster}
                  alt="Poster"
                  className="h-16 w-16 object-cover rounded border border-gray-600"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300 max-w-xs truncate">
                  {reel.video}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                <button
                  onClick={() => onEdit(reel)}
                  className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => onDelete(reel.id!)}
                  className="inline-flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReelTable;
