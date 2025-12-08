import { useSearchParams } from "react-router-dom";
import { useUsersQuery } from "../hooks/useUsersQuery";

export function UsersListPage() {
  // (A) Page from URL query parameter
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);

  // (B) Fetch users via TanStack Query
  const { data, isPending, isError } = useUsersQuery(page);

  const goToPage = (p: number) => {
    setParams({ page: String(p) });
  };

  if (isPending) return <p className="p-4 text-gray-600">Loading...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load users.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      {/* Users Table */}
      <div className="bg-white shadow rounded-md">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>

          <tbody>
            {data?.data?.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-3 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-4 py-1 bg-gray-100 rounded">
          Page {data.currentPage} / {data.totalPages}
        </span>

        <button
          disabled={page >= data.totalPages}
          onClick={() => goToPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
