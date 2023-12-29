'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

interface CurrencyProps {
	value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value = 0 }) => {
	// Hydration error prevention
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return <span className=''>{formatter.format(Number(value))}</span>;
};

export default Currency;
