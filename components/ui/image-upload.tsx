'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	disabled,
	onChange,
	onRemove,
	value,
}) => {
	{
		/* HYDRATION HANDLING */
	}
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleUpload = (result: any) => {
		onChange(result.info?.secure_url);
	};

	if (!isMounted) {
		return null;
	}

	{
		/* HYDRATION END */
	}

	return (
		<div className=''>
			<div className='mb-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3'>
				{/* 
          Value is an array of strings ( see types definition above )
          meaning is an array of url's
        */}
				{value.map((url) => (
					<div
						key={url}
						className='relative h-[200px] w-full overflow-hidden rounded-md md:w-[200px]'
					>
						<div className='absolute right-2 top-2 z-10'>
							<Button
								type='button'
								onClick={() => onRemove(url)}
								variant='destructive'
								size='sm'
							>
								<Trash className='h-4 w-4' />
							</Button>
						</div>
						<Image
							fill
							className='object-cover'
							alt='Image'
							src={url}
							placeholder='blur'
							blurDataURL={url}
							sizes='max-width(200px)'
						/>
					</div>
				))}
			</div>

			{/* 
        CLOUDINARY UPLOAD COMPONENT 
        using uploadPreset from Cloudinary: Unsigned preset
      */}
			<CldUploadWidget
				onUpload={(result) => handleUpload(result)}
				uploadPreset='eh64ejgl'
			>
				{({ open }) => {
					const onClick = () => {
						open();
					};

					return (
						<Button
							type='button'
							disabled={disabled}
							variant='secondary'
							onClick={onClick}
						>
							<ImagePlus className='mr-2 h-4 w-4' />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
