'use client';
import React from 'react';
import Image from 'next/image';
import { Brain, Leaf, MessageCircle } from 'lucide-react';

const Community = () => {
	console.log('');
	return (
		<div className='flex h-auto w-full justify-center rounded-[24px] md:m-28'>
			<div className='flex h-full w-[90%] snap-center snap-always flex-col items-center space-y-10 md:flex-row md:space-y-0'>
				<div className='w-full space-y-10 rounded p-10 text-xl font-black md:w-[50%] md:text-2xl lg:rounded-[24px]'>
					<div className='space-y-2'>
						<div className='flex'>
							<MessageCircle
								size={35}
								className='mr-5 text-[#107528] transition-colors animate-in animate-out hover:text-[#1ba63c]'
							/>
							<h1 className='justify-left flex h-auto w-full snap-center items-center font-bold'>
								Connect
							</h1>
						</div>
						<p className='text-base text-foreground/50'>
							Connect with other gardeners Id mollit nostrud amet adipisicing
							laboris proident eu qui enim mollit.
						</p>
					</div>

					<div className='space-y-2'>
						<div className='flex'>
							<Brain
								size={35}
								className='mr-5 text-[#107528] transition-colors animate-in animate-out hover:text-[#1ba63c]'
							/>
							<h1 className='justify-left flex h-auto w-full snap-center items-center font-bold'>
								Learn
							</h1>
						</div>
						<p className='text-base text-foreground/50'>
							Learn from nature and your community Id mollit nostrud amet
							adipisicing laboris proident eu qui enim mollit.
						</p>
					</div>

					<div className='space-y-2'>
						<div className='flex'>
							<Leaf
								size={35}
								className='mr-5 text-[#107528] transition-colors animate-in animate-out hover:text-[#1ba63c]'
							/>
							<h1 className='justify-left flex h-auto w-full snap-center items-center font-bold'>
								Grow
							</h1>
						</div>
						<p className='text-base text-foreground/50'>
							Grow your garden with regenerative agriculture principles Id
							mollit nostrud amet adipisicing irure.
						</p>
					</div>
				</div>

				<div className='flex h-[300px] w-full flex-col items-center justify-center gap-5 rounded-[24px] border bg-[#5f19eb] p-3 drop-shadow-sm transition-colors duration-700 animate-in animate-out md:m-0 md:h-[400px] md:w-[50%] md:justify-center'>
					<div className='relative h-[100px] w-[100px] md:h-[150px] md:w-[150px]'>
						<Image
							src={'/discord-mark-white.svg'}
							alt='Discord QR'
							fill
							className=''
						/>
					</div>

					<div className='relative flex h-auto w-full items-center justify-between rounded-[22px] bg-[#262626] p-2 md:w-[90%] md:rounded-[26px] lg:w-[350px]'>
						<div className='w-[70%]'>
							<h2 className='text-center text-xl font-extrabold text-white lg:text-3xl'>
								JOIN THE <br />
								COMMUNITY
							</h2>
						</div>
						<div className='relative h-[100px] w-[100px] rounded-[20px] bg-[hsl(0,0%,90%)] p-3 md:rounded-[22px]'>
							<Image
								src={'/QR-plain-black.svg'}
								alt='Discord QR'
								fill
								placeholder='blur'
								blurDataURL={'/QR-plain-black.svg'}
								className='p-3'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Community;
