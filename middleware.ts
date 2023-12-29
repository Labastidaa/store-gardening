import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';

import { NextRequest, NextResponse } from 'next/server';

export default authMiddleware({
	publicRoutes: [
		'/',
		'/categories/:path*',
		'/:locale/sign-in',
		'/api/categories/fetch/route',
		'/products/:path*',
		'/api/:path*'
	],
	debug:true,
	afterAuth(auth, req:NextRequest) {

		if(auth.userId && auth.isApiRoute){
			return NextResponse.next()
		}

		if(auth.userId && req.nextUrl.pathname.includes('/cart') && (req.nextUrl.searchParams.has('success'))){
			return NextResponse.next()
		}
		
		if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

		if (auth.userId && !auth.isPublicRoute) {
			return NextResponse.next()
		}

		if(req.nextUrl.pathname.startsWith('/admin')){
			if(!(auth.orgRole === 'admin')){
				const redirectUrl = `${req.nextUrl.origin}/`;
				return NextResponse.redirect(redirectUrl);
			}
		}

		return NextResponse.next();
	},

});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)'],
};

