export const config = {
  // Ye middleware har page/image load hone se pehle chalega
  matcher: '/(.*)',
};

export default function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Aapka Username aur Password yahan check ho raha hai
    if (user === 'VM11122026' && pwd === '22030410') {
      return; // Agar details sahi hain, toh website load hone do
    }
  }

  // Agar details galat hain ya nahi daali, toh prompt dikhao
  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
