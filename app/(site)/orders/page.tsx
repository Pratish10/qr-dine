'use client';
import { ordersList, orderStatus } from '@/recoil/orders/atom';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TableLoader } from '@/components/table-loader';
import { DataTable } from '@/components/SharedComponent/DataTable/data-table';
import { OrderColumn } from './columns';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useGetOrders } from '@/hooks/orders/use-get-orders';
import { restaurant } from '@/recoil/restaurant/atom';

const Orders = () => {
	const { id } = useRecoilValue(restaurant);
	const { refetch, isRefetching } = useGetOrders(id ?? '');
	const orderStat = useRecoilValue(orderStatus);
	const ordersData = useRecoilValue(ordersList);
	return (
		<motion.div
			className='my-9 pb-24'
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -10, opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<Card className='p-1 dark:bg-gray-900'>
				<CardHeader>
					<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
						<div>
							<CardTitle>Orders</CardTitle>
							<CardDescription>Manage your orders</CardDescription>
						</div>
						<div className='flec items-center space-x-3'>
							<Button variant='green' className='mt-2 sm:mt-0 sm:ml-auto' size='sm' onClick={() => refetch()}>
								<RefreshCw className='mr-2' size={20} />
								Refresh
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{orderStat === 'loading' || isRefetching ? (
						<TableLoader />
					) : (
						<DataTable columns={OrderColumn} data={ordersData ?? []} searchKey='orderNumber' />
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default Orders;
