import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { useState } from 'react';

const useConfirm = (title: string, message: string): [() => JSX.Element, () => Promise<boolean>] => {
	const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

	const confirm = async (): Promise<boolean> =>
		await new Promise((resolve) => {
			setPromise({ resolve });
		});

	const handleClose = (): void => {
		setPromise(null);
	};

	const handleConfirm = (): void => {
		promise?.resolve(true);
		handleClose();
	};

	const handleCancel = (): void => {
		promise?.resolve(false);
		handleClose();
	};

	const ConfirmationDialog = (): JSX.Element => (
		<Dialog open={promise !== null} onOpenChange={handleCancel}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{message}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button size='sm' variant='outline' onClick={handleCancel}>
						Cancel
					</Button>
					<Button size='sm' variant='destructive' onClick={handleConfirm}>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);

	return [ConfirmationDialog, confirm];
};

export default useConfirm;
