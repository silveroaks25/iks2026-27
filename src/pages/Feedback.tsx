export function FeedbackPage() {
  return (
    <main id="main" className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.4em] text-[var(--ember2)]">Signal back</p>
      <h1 className="font-display mt-2 text-5xl">Feedback</h1>
      <p className="mt-3 max-w-2xl text-[var(--mute)]">
        Share how the journey felt. The form below stays inside this page.
      </p>
      <div className="panel mt-8 overflow-hidden rounded-3xl">
        <iframe
          title="IKS feedback form"
          className="h-[78vh] min-h-[640px] w-full bg-white"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdNbansWxQKJDZgVcion0uV58nEQxGKhe5vLKDu103S99IEUA/viewform?embedded=true"
        >
          Loading…
        </iframe>
      </div>
    </main>
  )
}
