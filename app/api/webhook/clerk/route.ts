import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
		);
	}

	const headerPayload = headers();
	const svix_id = headerPayload.get('svix-id');
	const svix_timestamp = headerPayload.get('svix-timestamp');
	const svix_signature = headerPayload.get('svix-signature');

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400,
		});
	}

	const payload = await req.json();
	const body = JSON.stringify(payload);

	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	try {
		evt = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error occured', {
			status: 400,
		});
	}

	const eventType = evt.type;

	try {
		if (eventType === 'user.created' || eventType === 'user.updated') {
			const userData = evt.data;
			const createdUser = await prisma.user.upsert({
				where: { clerkId: userData.id },
				create: {
					clerkId: userData.id,
					fullName: `${userData.first_name} ${userData.last_name}`,
					email: userData.email_addresses[0].email_address,
					image: userData.image_url,
				},
				update: {
					clerkId: userData.id,
					fullName: `${userData.first_name} ${userData.last_name}`,
					email: userData.email_addresses[0].email_address,
					image: userData.image_url,
				},
			});
			console.log('User created:', createdUser);
		}

		if(eventType === 'user.created'){
			const userData = evt.data;
			const cart = await prisma.cart.create({
				data: {
					user: {
						connect: {
							clerkId: userData.id,
						},
					},
					CartItem: {
						create: [],
					},
				},
			});

			console.log('Cart created:', cart);

		}
		return new Response('CLERK SESSION SUCCESSFULLY SYNC WITH PRISMA', {
			status: 200,
		});

	} catch (error) {
		console.error('Error syncing data with Prisma:', error);
		return new Response('Error Clerk Webhook', { status: 500 });
	}
}
