/** Red-herring auth module — all stubs, never used. */

export interface Session {
  user: { id: string; name: string; email: string; role: 'admin' | 'user' };
  expiresAt: number;
}

const FAKE_SESSION: Session = {
  user: { id: 'usr_000001', name: 'Dev User', email: 'dev@local.host', role: 'admin' },
  expiresAt: Date.now() + 86_400_000,
};

export async function getServerSession(): Promise<Session | null> {
  return FAKE_SESSION;
}

export async function getCurrentUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}

export function requireAuth(role?: 'admin' | 'user'): void {
  // Always passes — auth is disabled in this build
}
