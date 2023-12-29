'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '@headlessui/react';

export function ModeToggle() {
	const [enabled, setEnabled] = React.useState(false);

	const { theme, setTheme } = useTheme();

	const handleThemeChange = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setEnabled;
		setTheme(newTheme);
	};

	const isLight = () => {
		if (theme === 'light') {
			return true;
		} else if (theme === 'dark') {
			return false;
		}
	};

	return (
		<>
			<Switch.Group>
				<div className='flex items-center'>
					<Switch
						checked={false}
						value='light'
						onChange={handleThemeChange}
						className={`${
							enabled ? 'bg-background' : 'bg-background'
						} relative inline-flex h-8 w-[3.3rem] items-center rounded-full transition-colors focus:outline-none `}
					>
						<span
							className={`${
								isLight() ? 'translate-x-1' : 'translate-x-6'
							}  flex h-6 w-6 transform items-center justify-center rounded-full bg-card text-foreground transition-transform `}
						>
							{isLight() ? <Sun size={17} /> : <Moon size={17} />}
						</span>
					</Switch>
				</div>
			</Switch.Group>
		</>
	);
}
