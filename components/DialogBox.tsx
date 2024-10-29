import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';

interface DialogBoxProps {
	header: string;
	content: React.ReactNode | string;
	show: boolean;
	onClose: () => void;
	onAction: () => void;
	onActionButtonLabel: string;
}

export function DialogBox({ header, content, show, onClose, onAction, onActionButtonLabel }: DialogBoxProps): React.JSX.Element {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		setOpen(show);
	}, [show]);

	const handleDelete = (): void => {
		onAction();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{header}</DialogTitle>
					<DialogDescription>{content}</DialogDescription>
				</DialogHeader>
				<DrawerFooter className='flex pt-2'>
					<div className='flex justify-center'>
						<DrawerClose asChild onClick={onClose}>
							<Button size='sm' className='mx-2' variant='outline'>
								Cancel
							</Button>
						</DrawerClose>
						<DrawerClose asChild onClick={handleDelete}>
							<Button size='sm' className='mx-2' variant='destructive'>
								{onActionButtonLabel}
							</Button>
						</DrawerClose>
					</div>
				</DrawerFooter>
			</DialogContent>
		</Dialog>
	);
}
