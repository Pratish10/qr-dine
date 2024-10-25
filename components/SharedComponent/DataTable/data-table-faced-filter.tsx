/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type Column } from '@tanstack/react-table';
import React from 'react';

interface DataTableFacetedFilterProps<TData, TValue> {
	column?: Column<TData, TValue>;
	title?: string;
	options: Array<{
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}>;
}

export function DataTableFacetedFilter<TData, TValue>({ column, title, options }: DataTableFacetedFilterProps<TData, TValue>): JSX.Element {
	const facets = column?.getFacetedUniqueValues();
	const selectedValues = new Set(column?.getFilterValue() as string[]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' size='sm' className='h-8 border-dashed'>
					{title}
					{selectedValues?.size > 0 && (
						<React.Fragment>
							<Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
								{selectedValues.size}
							</Badge>
							<div className='hidden space-x-1 lg:flex'>
								{selectedValues.size > 2 ? (
									<Badge variant='secondary' className='rounded-sm px-1 font-normal'>
										{selectedValues.size} selected
									</Badge>
								) : (
									options
										.filter((option) => selectedValues.has(option.value))
										.map((option) => (
											<Badge variant='secondary' key={option.value} className='rounded-sm px-1 font-normal'>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</React.Fragment>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0' align='start'>
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{selectedValues.size > 0 && (
							<React.Fragment>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem onSelect={() => column?.setFilterValue(undefined)} className='justify-center text-center'>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</React.Fragment>
						)}
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.has(option.value);
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(option.value);
											} else {
												selectedValues.add(option.value);
											}
											const filterValues = Array.from(selectedValues);
											column?.setFilterValue(filterValues.length > 0 ? filterValues : undefined);
										}}
									>
										<div
											className={cn(
												'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
												isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
											)}
										>
											<CheckIcon className={cn('h-4 w-4')} />
										</div>
										<span>{option.label}</span>
										{facets?.get(option.value) && (
											<span className='ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
												{facets.get(option.value)}
											</span>
										)}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}