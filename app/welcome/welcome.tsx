import { useEffect } from "react";
import useRequest from "~/hooks/useRequest";

export function Welcome() {
  const {
    data: userList,
    loading,
    callCount,
    refetch,
  } = useRequest("https://jsonplaceholder.typicode.com/users");

  useEffect(() => {
    if (loading) return;
    console.log(userList);
    console.log("Quantidade de chamadas: ", callCount);
  }, [loading]);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <h1>Hello world</h1>
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={refetch}
        >
          Buscar novamente
        </button>
        <h2>Dados de usuários:</h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          {userList &&
            userList.map((user: { id: string; name: string }) => (
              <li key={user.id}>{user.name}</li>
            ))}
        </ul>
      </div>
    </main>
  );
}
