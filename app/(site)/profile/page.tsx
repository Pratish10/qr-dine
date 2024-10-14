import { useCurrentSession } from '@/hooks/useCurrentSession';
import React from 'react';

const Profile = async (): Promise<React.JSX.Element> => {
	const user = await useCurrentSession();
	return <div>{JSON.stringify(user)}</div>;
};

export default Profile;
