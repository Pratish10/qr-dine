'use client';

import React, { useEffect, useState } from 'react';
import { NewMenuSheet } from './menus/components/new-menu-sheet';
import { NewTableSheet } from './table/components/new-table-sheet';

export const SheetProvider = (): React.JSX.Element | null => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<React.Fragment>
			<NewTableSheet />
			<NewMenuSheet />
		</React.Fragment>
	);
};
