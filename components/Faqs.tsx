import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';

const Faqs = () => {
	return (
		<div className='m-10 h-auto w-[90%]'>
			<Card className='rounded-[24px] p-2 sm:p-5'>
				<CardHeader>
					<CardTitle className='text-3xl font-bold sm:text-3xl'>FAQs</CardTitle>
				</CardHeader>
				<CardContent className='text-sm sm:text-base'>
					<Accordion type='single' collapsible>
						<AccordionItem value='item-1'>
							<AccordionTrigger className='text-left'>
								How can I choose the right soil for my plants?
							</AccordionTrigger>
							<AccordionContent>
								Selecting the right soil is crucial for plant health. We offer a
								variety of substrates to build different soils depending on the
								plant needs. Feel free to reach out to our gardening experts for
								personalized recommendations based on your specific plants and
								garden conditions.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-2'>
							<AccordionTrigger className='text-left'>
								What payment methods do you accept?
							</AccordionTrigger>
							<AccordionContent>
								We accept various payment methods, including credit/debit cards,
								PayPal, and other secure payment options. Your payment
								information is encrypted and processed securely for your peace
								of mind.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-3'>
							<AccordionTrigger className='text-left'>
								How can I track my order?
							</AccordionTrigger>
							<AccordionContent>
								Once your order is shipped, you will receive a confirmation
								email with a tracking number. You can use this tracking number
								to monitor the status and location of your package.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-4'>
							<AccordionTrigger className='text-left'>
								Do you offer international shipping?
							</AccordionTrigger>
							<AccordionContent>
								At the moment, we only offer shipping within [your
								country/region]. However, we are working on expanding our
								shipping options to serve our international customers better in
								the future.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-5'>
							<AccordionTrigger className='text-left'>
								How can I contact your customer support?
							</AccordionTrigger>
							<AccordionContent>
								You can reach our customer support team through our Discord
								Channel, WhatsApp or by sending an email to
								[support@rhizlium.com]. We are here to assist you with any
								questions or concerns you may have.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</CardContent>
			</Card>
		</div>
	);
};

export default Faqs;
