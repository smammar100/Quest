import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Quest",
  description:
    "How Quest collects, uses, shares, and protects your personal data.",
};

const sections: LegalSection[] = [
  {
    id: "collection",
    heading: "Collection of your personal data",
    body: (
      <>
        <h3>Information collected directly from you</h3>
        <ul>
          <li>Name, address, email, phone number, and contact details.</li>
          <li>Birth date.</li>
          <li>Credit card and account details (processed by a third-party payment provider).</li>
          <li>Location and quest performance locations.</li>
          <li>Occupation, work experience, resume, qualifications, education, skills, and interests.</li>
        </ul>
        <p>
          You may provide profile photos. Quest also collects usage data
          including transaction details, feedback ratings, offers, comments, and
          affiliate interactions.
        </p>
        <h3>Information collected automatically</h3>
        <p>
          Via browsers and cookies, Quest collects computer and connection
          information such as page views, traffic to and from the services,
          referral URL, IP address, unique device ID, clickstream data, and email
          interactions. Location-enabled services collect precise location via
          GPS; general location is inferred from IP addresses.
        </p>
        <h3>Information from third parties</h3>
        <p>
          Data from social media connections (Facebook, LinkedIn, Twitter),
          identity verification providers, data partners, and marketing partners
          may be combined with existing information. User IDs and publicly posted
          content remain visible to other users.
        </p>
      </>
    ),
  },
  {
    id: "use",
    heading: "How we use your personal data",
    body: (
      <>
        <p>Quest uses collected information for:</p>
        <ul>
          <li><strong>Identification and authentication</strong>:enabling service access.</li>
          <li><strong>Security</strong>:protecting Quest and users through legitimate interests.</li>
          <li><strong>Content customization</strong>:tailoring advertising and content.</li>
          <li><strong>Service improvement</strong>:developing features and new services.</li>
          <li><strong>User information sharing</strong>:providing details to contracted counterparties.</li>
          <li><strong>Legal compliance</strong>:responding to court orders, regulatory requests, and enforcement.</li>
          <li><strong>Payment collection</strong>:processing owed fees.</li>
          <li><strong>Communications</strong>:promotions, service updates, and agreement administration.</li>
          <li><strong>Research &amp; reporting</strong>:questionnaires, feedback, and aggregated, non-identifiable reports.</li>
        </ul>
        <p>
          User reviews compile into aggregate public ratings. Quest and its
          service providers collate preferences for market segmentation and
          analytics, excluding sensitive information.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies and similar technologies",
    body: (
      <>
        <p>
          Quest uses cookies for access, preference tracking, content direction,
          reporting, and service improvement, including with affiliate providers.
        </p>
        <ul>
          <li><strong>Strictly necessary cookies</strong>:enable access, identify irregular behavior, prevent fraud, and improve security.</li>
          <li><strong>Functionality cookies</strong>:offer enhanced features, sign-in identification, and preference tracking.</li>
          <li><strong>Performance analytics cookies</strong>:assess performance, analyze visitor behavior, and track popularity.</li>
        </ul>
        <p>
          You may configure your browser or operating system to limit tracking or
          decline cookies, though some features require them. Google Analytics
          users may opt out via the &ldquo;Google Analytics opt-out browser
          add-on&rdquo;.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "How we share your personal data",
    body: (
      <>
        <p>Quest discloses information with:</p>
        <ul>
          <li><strong>Affiliates</strong>:affiliated companies.</li>
          <li><strong>Service providers</strong>:business, verification, professional, and technical support.</li>
          <li><strong>Analytics partners</strong>:Google Analytics and similar services.</li>
          <li><strong>Between users</strong>:ratings and reviews shared with quest-seekers.</li>
          <li><strong>Legal/safety</strong>:law enforcement, regulators, and public safety investigations.</li>
          <li><strong>Business transfer</strong>:sale, merger, asset disposal, insolvency, or receivership.</li>
        </ul>
        <p>
          Quest does not rent, sell, or share information with non-affiliated
          third parties for direct marketing without your permission.
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Security",
    body: (
      <p>
        Accounts are password-protected. Quest takes reasonable steps to protect
        your personal data from unauthorized access, use, and disclosure, but
        cannot guarantee absolute security. Internet transmission risks remain
        your responsibility, and you must maintain password security.
      </p>
    ),
  },
  {
    id: "third-parties",
    heading: "Third parties",
    body: (
      <p>
        The services contain links to third-party websites and affiliate networks
        including Stripe. Third parties maintain separate privacy policies, and
        Quest disclaims responsibility for their privacy practices or personal
        data usage.
      </p>
    ),
  },
  {
    id: "marketing",
    heading: "Marketing",
    body: (
      <>
        <p>
          You may opt in or out of marketing materials via your Quest account,
          email, post, or telephone. To opt out, click the unsubscribe link in
          marketing emails or request via{" "}
          <a href="mailto:hello@quest-inc.co">hello@quest-inc.co</a>.
        </p>
        <p>
          Quest reserves the right to send administrative and account-related
          messages regardless of marketing opt-out status.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    heading: "Your rights and choices",
    body: (
      <>
        <p>
          Users in the EEA and certain countries may access, edit, update,
          restrict processing of, or delete personal data, or receive portable
          copies. Consent-based processing may be withdrawn, and legitimate
          interest processing may be objected to.
        </p>
        <p>
          Limitations apply where legal requirements or compelling interests
          require retention, or where requests are unreasonably repetitive or
          privacy-risking. Residual data on active and backup servers may not
          immediately delete. Quest does not respond to &ldquo;Do Not Track&rdquo;
          signals, as no accepted standard exists.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    heading: "Retention",
    body: (
      <p>
        Personal data is retained for as long as is necessary for the purposes for
        which it was collected or lawfully further processed, or as necessary in
        light of Quest&apos;s legal obligations or to pursue, defend, or exercise
        legal claims.
      </p>
    ),
  },
  {
    id: "children",
    heading: "Children’s privacy",
    body: (
      <p>
        Quest does not knowingly collect, maintain, or use personal data from
        children under 18 years. No portion of the services targets children.
        Violations should be reported using the contact information below.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <ul>
        <li>
          Email: <a href="mailto:hello@quest-inc.co">hello@quest-inc.co</a>
        </li>
        <li>Quest Hyphen Inc Pte. Ltd., UEN 202028781K</li>
        <li>Oxley Bizhub, 71 Ubi Road 1, #10-40, Singapore 408732</li>
      </ul>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="Quest Hyphen Inc Pte. Ltd. manages your personal information in line with applicable privacy legislation. This policy explains what we collect, how we use it, and the choices you have."
      updated="April 2026"
      sections={sections}
    />
  );
}
