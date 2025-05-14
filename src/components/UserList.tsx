import { useEffect, useState } from "react";
import type { User } from "../types/User";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Server error");
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>👤 {user.name}</strong>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p className="email">
              <strong>📧 Email:</strong> {user.email}
            </p>
            <p>
              <strong>📞 Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>🌐 Website:</strong> {user.website}
            </p>
            <p className="city">
              <strong>📍 Address:</strong> {user.address.street},{" "}
              {user.address.suite}, {user.address.city}, {user.address.zipcode}
            </p>
            <p>
              <strong>📌 Coordinates:</strong> {user.address.geo.lat},{" "}
              {user.address.geo.lng}
            </p>
            <p>
              <strong>🏢 Company:</strong> {user.company.name}
              <br />
              <em>{user.company.catchPhrase}</em>
              <br />
              <small>{user.company.bs}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
