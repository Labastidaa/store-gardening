import AdminClient from './components/client';

const Admin = async () => {
	return (
		<div className='flex min-h-[calc(100vh-100px)] w-full flex-col items-center justify-center gap-5 p-5'>
			<h1 className='bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text p-5 text-5xl font-bold text-transparent'>
				Rhizlium
			</h1>
			<AdminClient />
		</div>
	);
};

export default Admin;
