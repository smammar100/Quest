// Cloud Run sets K_SERVICE automatically. Use it to detect the GCP runtime
// so we don't attempt a metadata server call in local development.
const ON_CLOUD_RUN = Boolean(process.env.K_SERVICE);

// Returns an Authorization header value containing a short-lived GCP OIDC
// identity token scoped to the target service URL. Cloud Run on the receiving
// end validates this token automatically when "Allow only authenticated
// requests" is enabled — no code needed on the agent side.
//
// In local development the metadata server is unavailable, so an empty string
// is returned. Configure the agent to skip OIDC validation in dev.
export async function getAgentAuthHeader(targetUrl: string): Promise<string> {
  if (!ON_CLOUD_RUN) return '';

  const metadataUrl =
    'http://metadata.google.internal/computeMetadata/v1/instance/' +
    `service-accounts/default/identity?audience=${encodeURIComponent(targetUrl)}`;

  const res = await fetch(metadataUrl, {
    headers: { 'Metadata-Flavor': 'Google' },
  });

  if (!res.ok) throw new Error(`Failed to fetch GCP OIDC token: ${res.status}`);

  return `Bearer ${await res.text()}`;
}
