import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { defaultLocale, localePrefix, locales, pathnames } from '@/i18n/config';
import R from '@/lib/config/routes';

import { EnumTokens } from './services/auth.service';

const handleI18nRouting = createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === R.LOGIN;
  // Parse current user from cookies
  const currentUserJSON = req.cookies.get(EnumTokens.CURRENT_USER)?.value;
  const currentUser = currentUserJSON
    ? (JSON.parse(currentUserJSON) as User)
    : null;

  const isAuthenticated =
    req.cookies.get(EnumTokens.ACCESS_TOKEN) &&
    req.cookies.get(EnumTokens.REFRESH_TOKEN) &&
    currentUser;

  if (pathname === '/') {
    return NextResponse.redirect(new URL(R.LOGIN, req.url));
  }

  if (isAuthenticated) {
    if (isLoginPage) {
      return NextResponse.redirect(
        new URL(roleMap[currentUser.role] + '/profile', req.url)
      );
    }
    if (!pathname.startsWith(roleMap[currentUser.role])) {
      return NextResponse.redirect(
        new URL(roleMap[currentUser.role] + '/profile', req.url)
      );
    }
    if (pathname === R.ADMIN_MANAGEMENT) {
      return NextResponse.redirect(new URL(R.ADMIN_GROUPS, req.url));
    } else if (pathname === R.TEACHER_MANAGEMENT) {
      return NextResponse.redirect(new URL(R.TEACHER_HOMEWORKS, req.url));
    } else if (pathname === R.ADMIN_FINANCES) {
      return NextResponse.redirect(new URL(R.ADMIN_STUDENTS_FINANCE, req.url));
    }
  } else {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL(R.LOGIN, req.url));
    }
  }

  return handleI18nRouting(req);
}

const roleMap: Record<Role, string> = {
  ADMIN: '/admin',
  TEACHER: '/teacher',
  STUDENT: '/student',
};

export const config = {
  matcher: [
    '/',
    '/(ru|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)',
    '/auth/:path*',
    '/student/:path*',
    '/teacher/:path*',
    '/admin/:path*',
  ],
};
