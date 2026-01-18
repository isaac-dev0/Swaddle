import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Role } from "@/lib/enums/role.enum";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const { pathname } = request.nextUrl;

  const protectedPaths = ["/professional", "/volunteer", "/onboarding"];
  const authPaths = ["/auth"];

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));
  const isRootPath = pathname === "/";

  /* If the user is trying to access a protected path, re-route to /auth */
  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  /* Redirect root path based on auth status */
  if (isRootPath) {
    const url = request.nextUrl.clone();
    if (!user) {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
  }

  /* Re-route the user depending on role and onboarding status. */
  if ((isAuthPath || isProtectedPath || isRootPath) && user) {
    const { data: profile } = await supabase
      .from("users")
      .select("role, is_onboarded")
      .eq("id", user.sub)
      .single();

    let routePath: string;
    if (!profile) {
      routePath = "/onboarding";
    } else if (profile.role === Role.PROFESSIONAL) {
      routePath = profile.is_onboarded ? "/professional" : "/onboarding";
    } else {
      routePath = "/volunteer";
    }

    const shouldRedirect = isAuthPath || !pathname.startsWith(routePath);

    if (shouldRedirect) {
      const url = request.nextUrl.clone();
      url.pathname = routePath;
      return NextResponse.redirect(url);
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
