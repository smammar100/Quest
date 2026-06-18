import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use — Quest",
  description:
    "The terms and conditions governing your use of the Quest platform.",
};

const sections: LegalSection[] = [
  {
    id: "scope",
    heading: "Scope of Quest services",
    body: (
      <>
        <p>
          Quest operates an online platform that enables users to connect and
          exchange services. Citizens publish Posted Quests; Heroes make Offers
          in response.
        </p>
        <ul>
          <li>Citizens may revoke or modify Posted Quests before accepting an Offer.</li>
          <li>When a Citizen accepts a Hero&apos;s Offer, a Quest Contract is created.</li>
          <li>
            Upon Quest Contract creation, the Citizen pays the Agreed Price into
            the Payment Account, and the Connection Fee becomes due and payable.
          </li>
          <li>Parties may vary Quest Contracts via the platform&apos;s messaging system.</li>
          <li>Heroes must notify completion on the platform.</li>
          <li>
            Upon completion confirmation, Hero Funds are released from the
            Payment Account.
          </li>
          <li>Parties are encouraged to provide feedback after completion.</li>
        </ul>
      </>
    ),
  },
  {
    id: "role",
    heading: "Quest’s role and obligations",
    body: (
      <ul>
        <li>Quest provides its service in consideration for the Connection Fee and Hero Service Fee.</li>
        <li>Only individuals over 16 years old may become users; false information violates these terms.</li>
        <li>Users must be natural persons; business representation requires proper authority.</li>
        <li>Quest may refuse, cancel, suspend, or modify accounts at its discretion.</li>
        <li>No charges apply for registration, creating Posted Quests, or accessing content.</li>
        <li>Quest accepts no liability for Citizen–Hero interactions or service performance.</li>
        <li>The service is provided &ldquo;as is&rdquo; without warranties except Non-excludable Conditions.</li>
        <li>Quest conducts no background checks on Heroes; users are solely responsible for evaluating Heroes and assume all associated risks.</li>
      </ul>
    ),
  },
  {
    id: "user-obligations",
    heading: "User obligations",
    body: (
      <>
        <p>Users must:</p>
        <ul>
          <li>Comply with this Agreement and applicable laws, and post accurate information only.</li>
          <li>Not use platform content on third-party sites without Quest&apos;s written permission.</li>
          <li>Not use the platform for illegal or immoral purposes.</li>
          <li>Maintain account control and not transfer accounts.</li>
          <li>Grant Quest an unrestricted, worldwide license to use posted content.</li>
          <li>Keep information current, accurate, and not fraudulent, and not infringe intellectual property rights.</li>
          <li>Not post defamatory, harassing, or obscene material, or malicious code.</li>
          <li>Not disclose personal details in public posts.</li>
        </ul>
        <h3>For Heroes specifically</h3>
        <ul>
          <li>Must hold required licenses and have the right to work in the relevant jurisdiction.</li>
          <li>Must comply with tax and regulatory obligations.</li>
          <li>Cannot charge Citizens fees beyond Hero Funds, or request payments outside the platform except as permitted.</li>
          <li>Must ensure any subcontracted third parties are registered Quest users.</li>
        </ul>
      </>
    ),
  },
  {
    id: "fees",
    heading: "Fees",
    body: (
      <ul>
        <li>The Connection Fee is payable when a Citizen accepts a Hero&apos;s Offer.</li>
        <li>Heroes are separately charged a Hero Service Fee.</li>
        <li>When Citizens release payment, both fees are retained by Quest.</li>
        <li>Fees are GST inclusive (or equivalent tax) and are non-cancellable and non-refundable except under Non-excludable Conditions.</li>
        <li>Quest reserves the right to amend fees with website updates.</li>
      </ul>
    ),
  },
  {
    id: "payments",
    heading: "Payments, refunds and cancellations",
    body: (
      <ul>
        <li>If cancelled before commencement, Quest may refund the Agreed Price as Stored Value or to the original payment method.</li>
        <li>A Cancellation Fee applies based on responsibility. If a Citizen cancels, the Connection Fee is retained; if a Hero cancels, the Cancellation Fee is deducted from the Hero&apos;s Payment Account funds.</li>
        <li>Quest may take up to 14 days to process refunds.</li>
        <li>If Hero Funds cannot be transferred within three months, they become Stored Value for the Citizen.</li>
        <li>Quest may suspend accounts for repeated cancellations.</li>
      </ul>
    ),
  },
  {
    id: "stored-value",
    heading: "Stored value",
    body: (
      <ul>
        <li>Stored Value can be used for new services on the platform and is non-transferable between accounts.</li>
        <li>Heroes may withdraw Stored Value to registered bank accounts.</li>
        <li>Promotional credits are valid for 12 months (or a Quest-specified expiry) and may carry additional conditions.</li>
        <li>Users are solely responsible for Quest Wallet security.</li>
        <li>Hero Funds and refunded amounts do not expire; unredeemed promotional credit reverts to Quest on expiry.</li>
      </ul>
    ),
  },
  {
    id: "business-partners",
    heading: "Business partners",
    body: (
      <ul>
        <li>Quest may engage Heroes for Business Services with Business Partners.</li>
        <li>Business Partners may on-sell services and require Hero approvals, qualifications, or signed Business Partner Contracts.</li>
        <li>Business Partner Contract terms prevail in case of inconsistency.</li>
      </ul>
    ),
  },
  {
    id: "payment-facility",
    heading: "Payment facility",
    body: (
      <ul>
        <li>Quest uses multiple Payment Providers to operate the Payment Account.</li>
        <li>
          Stripe terms at{" "}
          <a href="https://stripe.com/ssa/" target="_blank" rel="noopener noreferrer">
            stripe.com/ssa
          </a>{" "}
          are incorporated and prevail regarding the Payment Account.
        </li>
        <li>If Quest changes providers, users may be asked to agree to new terms.</li>
      </ul>
    ),
  },
  {
    id: "third-party",
    heading: "Third party services",
    body: (
      <ul>
        <li>Third Party Services on the platform are not provided by Quest and operate under their own terms.</li>
        <li>Agreements are directly between users and third-party providers; Quest makes no warranties.</li>
        <li>
          Report Third Party Service experiences to{" "}
          <a href="mailto:hello@quest-inc.co">hello@quest-inc.co</a>.
        </li>
      </ul>
    ),
  },
  {
    id: "verification",
    heading: "Verification & badges",
    body: (
      <ul>
        <li>Quest may use Identity Verification Services, which may not be fully accurate; users remain solely responsible for identity verification.</li>
        <li>Badges may be requested or earned and may require documentation verified by Quest or third parties.</li>
        <li>Badges are point-in-time checks and may not be current when displayed.</li>
        <li>Quest may issue Badges for a fee, and may refuse or remove Badges without notice for breaches or invalidity.</li>
      </ul>
    ),
  },
  {
    id: "feedback",
    heading: "Feedback",
    body: (
      <ul>
        <li>Users can report comments using the &lsquo;Report&rsquo; or &lsquo;Contact Us&rsquo; function.</li>
        <li>Quest may suspend or terminate accounts based on feedback concerns or problematic ratings.</li>
      </ul>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: (
      <p>
        Quest&apos;s liability is limited as set out in the Country Specific Terms
        applicable to your jurisdiction. For users in the United States, the
        platform is provided &ldquo;as is&rdquo;, Quest disclaims implied
        warranties, and total liability is capped at the greater of payments made
        in the prior 12 months or USD&nbsp;$40.
      </p>
    ),
  },
  {
    id: "privacy",
    heading: "Privacy",
    body: (
      <ul>
        <li>Third Party Service providers operate under their own privacy policies.</li>
        <li>Users must review and agree to third-party terms before accepting a service.</li>
        <li>Quest endeavours to permit anonymous transactions but may require verification to prevent fraud.</li>
      </ul>
    ),
  },
  {
    id: "modifications",
    heading: "Modifications to the agreement",
    body: (
      <ul>
        <li>Quest may modify this Agreement or its Policies at any time.</li>
        <li>Modifications are notified to Quest accounts or upon next login.</li>
        <li>Upon any platform use, amendments take effect immediately; otherwise 30 days after notification.</li>
        <li>Users who disagree must terminate their account or notify Quest for termination.</li>
      </ul>
    ),
  },
  {
    id: "no-agency",
    heading: "No agency",
    body: (
      <p>
        No agency, partnership, joint venture, or employment relationship is
        created. Users have no authority to bind Quest or its related entities,
        and Quest disclaims liability for third-party performance or
        non-performance.
      </p>
    ),
  },
  {
    id: "notices",
    heading: "Notices",
    body: (
      <>
        <p>
          Notices must be given by registered mail or email to Quest&apos;s
          contact address or the user&apos;s provided address. Notice is deemed
          given:
        </p>
        <ul>
          <li>By email: 24 hours after sending, unless invalid or undeliverable.</li>
          <li>By prepaid post: three Business Days after posting domestically; seven Business Days if international.</li>
        </ul>
      </>
    ),
  },
  {
    id: "disputes",
    heading: "Mediation and dispute resolution",
    body: (
      <ul>
        <li>Users should attempt to resolve disputes directly before escalating to Quest.</li>
        <li>Quest may share information with involved parties, elect to assist, and make final determinations based on supplied information.</li>
        <li>Quest may hold disputed Agreed Prices in the Payment Account until resolution.</li>
        <li>
          Complaints about Quest services contact{" "}
          <a href="mailto:hello@quest-inc.co">hello@quest-inc.co</a>.
        </li>
      </ul>
    ),
  },
  {
    id: "termination",
    heading: "Termination",
    body: (
      <ul>
        <li>Either party may terminate the account and Agreement at any time for any reason.</li>
        <li>Termination does not affect existing Quest Contracts between users.</li>
        <li>Sections on fees, liability, and dispute resolution survive termination.</li>
        <li>Terminated users cannot create further accounts without Quest&apos;s consent.</li>
      </ul>
    ),
  },
  {
    id: "general",
    heading: "General",
    body: (
      <ul>
        <li>Governed by the laws specified in the Country Specific Terms.</li>
        <li>Provisions are severable; invalid provisions may be removed without affecting the rest.</li>
        <li>Quest may assign or novate this Agreement to third parties without user consent.</li>
        <li>This Agreement constitutes the entire understanding between the parties.</li>
      </ul>
    ),
  },
  {
    id: "country-terms",
    heading: "Country-specific terms",
    body: (
      <>
        <p>
          Jurisdiction, currency, governing law, and liability caps vary by
          country. Quest publishes specific terms for Australia, Canada,
          Malaysia, Pakistan, the Philippines, Singapore, the United States, Hong
          Kong, Indonesia, Japan, Korea, and Thailand.
        </p>
        <p>
          Quest Hyphen Inc Pte. Ltd. (UEN 202028781K) is the contracting entity
          for Singapore. For details applicable to your jurisdiction, or any
          question about these terms, contact{" "}
          <a href="mailto:hello@quest-inc.co">hello@quest-inc.co</a>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Use"
      intro="Quest operates an online platform enabling people to connect and exchange real-world services. These terms govern your use of Quest as a Citizen or a Hero."
      updated="April 2026"
      sections={sections}
    />
  );
}
