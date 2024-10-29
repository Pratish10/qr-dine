'use client';

import React, { useEffect, useState } from 'react';
import { NewMenuSheet } from './menus/components/new-menu-sheet';
import { NewTableSheet } from './table/components/new-table-sheet';
import { CategoryModal } from '@/components/category-modal';

export const SheetProvider = (): React.JSX.Element | null => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<React.Fragment>
			<CategoryModal />
			<NewTableSheet />
			<NewMenuSheet />
		</React.Fragment>
	);
};
