import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const MyList = async () => {
  const session = await getServerSession();

  if (!session) redirect("/signin");
  return (
    <div className="flex items-center justify-center min-h-screen">MyList</div>
  );
};

export default MyList;
