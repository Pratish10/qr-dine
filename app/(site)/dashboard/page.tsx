import { useCurrentSession } from "@/hooks/useCurrentSession";
import React from "react";

const Dashboard = async () => {
  const user = await useCurrentSession();
  return <div>{JSON.stringify(user)}</div>;
};

export default Dashboard;
