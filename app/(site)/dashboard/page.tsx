import { getCurrentUser } from '@/hooks/getCurrentUser';
import React from 'react';

const Dashboard = async (): Promise<React.JSX.Element> => {
	const user = await getCurrentUser();

	return <div>{JSON.stringify(user)}</div>;
};

export default Dashboard;
