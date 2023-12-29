import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';

export async function getOrders() {
	const user = await currentUser();

	const orders = await prisma.order.findMany({
		where: {
			userId: user?.id,
		},
		include: {
			user: true,
			orderItems: {
				include: {
					product: {
						include: {
							images: true,
						},
					},
				},
			},
		},
	});

	return orders;
}
