import '@fc-auth/react/style.css'

import {
  AuthKitProvider,
  SignInButton,
  type SignInReturnType,
  createConfig,
} from '@fc-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useCallback, useState } from 'react'

const config = createConfig({
  relay: 'https://relay.farcaster.xyz',
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'example.com',
  siweUri: 'https://example.com/login',
})

const queryClient = new QueryClient()
export default function Home() {
  return (
    <>
      <Head>
        <title>Farcaster AuthKit + NextAuth Demo</title>
      </Head>
      <main style={{ fontFamily: 'Inter, sans-serif' }}>
        <QueryClientProvider client={queryClient}>
          <AuthKitProvider config={config}>
            <Content />
          </AuthKitProvider>
        </QueryClientProvider>
      </main>
    </>
  )
}

function Content() {
  const [error, setError] = useState(false)

  const getNonce = useCallback(async () => {
    const nonce = await getCsrfToken()
    if (!nonce) throw new Error('Unable to generate nonce')
    return nonce
  }, [])

  const handleSuccess = useCallback((res: SignInReturnType) => {
    signIn('credentials', {
      message: res.message,
      signature: res.signature,
      name: res.username,
      pfp: res.pfpUrl,
      redirect: false,
    })
  }, [])

  return (
    <div>
      <div style={{ position: 'fixed', top: '12px', right: '12px' }}>
        <SignInButton
          nonce={getNonce}
          onSignIn={handleSuccess}
          onSignInError={() => setError(true)}
          onSignOut={() => signOut()}
        />
        {error && <div>Unable to sign in at this time.</div>}
      </div>
      <div style={{ paddingTop: '33vh', textAlign: 'center' }}>
        <h1>@farcaster/auth-kit + NextAuth</h1>
        <p>
          This example app shows how to use{' '}
          <a
            href="https://docs.farcaster.xyz/auth-kit/introduction"
            target="_blank"
            rel="noreferrer"
          >
            Farcaster AuthKit
          </a>{' '}
          and{' '}
          <a href="https://next-auth.js.org/" target="_blank" rel="noreferrer">
            NextAuth.js
          </a>
          .
        </p>
        <Profile />
        <div>
          <h2>Run this demo:</h2>
          <div
            style={{
              margin: '0 auto',
              padding: '24px',
              textAlign: 'left',
              maxWidth: '640px',
              backgroundColor: '#fafafa',
              fontFamily: 'monospace',
              fontSize: '1.25em',
              border: '1px solid #eaeaea',
            }}
          >
            git clone https://github.com/farcasterxyz/auth-monorepo.git &&
            <br />
            cd auth-monorepo/examples/with-next-auth &&
            <br />
            pnpm install &&
            <br />
            pnpm dev
          </div>
        </div>
      </div>
    </div>
  )
}

function Profile() {
  const { data: session } = useSession()

  return session ? (
    <div style={{ fontFamily: 'sans-serif' }}>
      <p>Signed in as {session.user?.name}</p>
      <p>
        <button
          type="button"
          style={{ padding: '6px 12px', cursor: 'pointer' }}
          onClick={() => signOut()}
        >
          Click here to sign out
        </button>
      </p>
    </div>
  ) : (
    <p>
      Click the &quot;Sign in with Farcaster&quot; button above, then scan the
      QR code to sign in.
    </p>
  )
}
