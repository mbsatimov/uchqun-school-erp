import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { EnumTokens } from './services/auth.service';
import type { IUser } from './types/user.interface';
import { EnumRole } from './types/user.interface';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === '/auth/login';
  // Parse current user from cookies
  const currentUserJSON = req.cookies.get(EnumTokens.CURRENT_USER)?.value;
  const currentUser = currentUserJSON
    ? (JSON.parse(currentUserJSON) as IUser)
    : null;

  const isAuthenticated =
    req.cookies.get(EnumTokens.ACCESS_TOKEN) &&
    req.cookies.get(EnumTokens.REFRESH_TOKEN) &&
    currentUser;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (isAuthenticated) {
    if (isLoginPage) {
      return NextResponse.redirect(
        new URL(roleMap[currentUser.role] + '/profile', req.url)
      );
    } else if (
      pathname === '/admin/management' &&
      currentUser.role == EnumRole.ADMIN
    ) {
      return NextResponse.redirect(
        new URL('/admin/management/groups', req.url)
      );
    } else if (
      pathname === '/teacher/management' &&
      currentUser.role == EnumRole.TEACHER
    ) {
      return NextResponse.redirect(
        new URL('/teacher/management/homeworks', req.url)
      );
    }
    if (pathname.startsWith(roleMap[currentUser.role])) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/404', req.url));
    }
  } else {
    if (isLoginPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

const roleMap = {
  [EnumRole.ADMIN]: '/admin',
  [EnumRole.TEACHER]: '/teacher',
  [EnumRole.STUDENT]: '/student',
};

export const config = {
  matcher: [
    '/',
    '/auth/:path*',
    '/student/:path*',
    '/teacher/:path*',
    '/admin/:path*',
  ],
};
