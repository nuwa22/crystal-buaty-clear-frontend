import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/get-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
          setLoaded(true);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to fetch users");
        });
    }
  }, [loaded]);

  return (
    <div className="w-full h-full relative p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">User List</h2>

      {loaded ? (
        <>
          {/* Desktop Table */}
          <table className="hidden md:table w-full text-left border-collapse">
            <thead className="border-b-2 border-gray-300 uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="border-b-2 border-gray-300 hover:bg-[#1e1e2f] hover:text-white"
                >
                  <td className="px-4 py-3">{user.firstName}</td>
                  <td className="px-4 py-3">{user.lastName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phone}</td>
                  <td className="px-4 py-3">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-[#252636] rounded-md p-4 shadow-md text-white flex flex-col space-y-2"
              >
                <p>
                  <span className="font-semibold">Name: </span>
                  {user.firstName} {user.lastName}
                </p>
                <p>
                  <span className="font-semibold">Email: </span>
                  {user.email}
                </p>
                <p>
                  <span className="font-semibold">Phone: </span>
                  {user.phone}
                </p>
                <p>
                  <span className="font-semibold">Role: </span>
                  {user.role}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-[90%] flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
