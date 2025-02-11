import React from 'react';
import {
  Typography,
  Link,
  List,
  ListItem,
  Dialog,
  IconButton,
  DialogContent,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PrivacyPolicyProps {
  open: boolean;
  handleClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ open, handleClose }) => {
  const sections = [
    { id: 'info', title: 'What Information Do We Collect?' },
    { id: 'use', title: 'How Do We Use Your Information?' },
    { id: 'share', title: 'Do We Share Your Information?' },
    { id: 'rights', title: 'Your Privacy Rights' },
  ];

  return (
    <Dialog open={open} scroll="paper" fullWidth maxWidth="md">
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={{ height: '80vh', overflowY: 'auto' }}>
        <Box sx={{ pr: 2 }}>
          {/* Privacy Policy Header */}
          <Typography variant="h6" component="h2">
            Privacy Policy
          </Typography>
          <Typography sx={{ mt: 2 }}>Last updated: Oct 22, 2024.</Typography>

          {/* Introduction */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            This privacy policy (the “Policy”) is intended to inform you of the types of information Lexter Search Inc.
            (“we” or “us”) collects, as well as our policies and practices regarding the collection, use, and disclosure
            of that information through the web pages at{' '}
            <Link href="https://www.golexter.com" target="_blank" rel="noopener">
              https://www.golexter.com
            </Link>{' '}
            (the “Site”). Please read this Policy carefully...
          </Typography>

          {/* Table of Contents */}
          <List>
            {sections.map((section) => (
              <ListItem key={section.id}>
                <Link href={`#${section.id}`}>{section.title}</Link>
              </ListItem>
            ))}
          </List>

          {/* Section: What Information Do We Collect? */}
          <Typography id="info" variant="h5" component="h2" gutterBottom>
            What Information Do We Collect?
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Personal Information You Provide to Us
          </Typography>
          <Typography variant="body1">
            We only have access to and collect personal information (for example your name, date of birth, social security
            number, credit card number, mailing or billing address, telephone number, or email address, and email
            preferences (collectively, “Personal Information”) that you voluntarily give us via email or other direct
            contact from you.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Information Collected by Automated Means
          </Typography>
          <Typography variant="body1">
            Whenever you use the Site, we, as well as any of our third-party advertisers and/or service providers, may use
            a variety of technologies that automatically collect information about how the Site is accessed and used
            (“Usage Information”). Usage Information may include, in part, browser type, operating system, the page
            served, the time, how many users visited the Site, and the website you visited immediately before the Site.
            This statistical data provides us with information about the use of the Site, such as how many visitors visit
            a specific page on the Site, how long they stay on that page, and which hyperlinks, if any, they “click” on.
            Usage Information helps us to keep the Site fresh and interesting to our visitors and to tailor content to a
            visitor's interests. Usage Information is generally non-identifying, but if we associate it with you as a
            specific and identifiable person, we treat it as Personal Information.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Device Identifiers
          </Typography>
          <Typography variant="body1">
            Usage Information we may collect include your IP address, MAC Address or other unique identifier (each a
            “Device Identifier”) for the computer, mobile device, Wi-Fi card, or other technology (collectively,
            “Device”) you use to access the Site. A Device Identifier is a number that is automatically assigned to your
            Device when you access a website or its servers. Our computers identify your Device by its Device Identifier.
            When you visit the Sites, we may view your Device Identifier. We use this information to identify repeat
            visitors to our Site. We also may use this information to send you targeted advertisements and to enhance the
            Site.
          </Typography>
          <Typography variant="body1">
            We may associate your Device Identifier with your Personal Information.
          </Typography>
          <Typography variant="body1">
            The technologies used on the Site, including Device Identifiers, to collect Usage Information may include,
            without limitation:
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Cookies
          </Typography>
          <Typography variant="body1">
            Cookies are data files placed on a Device when it is used to visit the Site. We may use cookies to collect
            and store certain information about you. We may use both session cookies (which expire once you close your web
            browser) and persistent cookies (which stay on your computer until you delete them).
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Web Beacons
          </Typography>
          <Typography variant="body1">
            We may also include web beacons (also known as web bugs, Internet tags, pixel tags, tracking pixels and clear
            GIFs) with the content and ads that we deliver to you, which we will use to collect information regarding your
            interaction with our content and ads. A web beacon is a transparent graphic image placed on a web page or in
            an email, which indicates that a page or email has been viewed or that an email has been forwarded. In
            addition, a web beacon allows third parties to obtain information such as the IP address of the computer that
            downloaded the page on which the beacon appears, the URL of the page on which the beacon appears, the time
            the page containing the beacon was viewed, the type of browser used to view the page, and the information in
            cookies set by the third party. A web beacon may also tell your browser to get content from another server.
          </Typography>
          <Typography variant="body1">
            Cookies and web beacons (together, “Site Cookies”) may enable us to track and target the interests of our
            users to enhance the experience on our Site, track user actions/behavior on our Site and track the
            effectiveness of ads.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Analytics
          </Typography>
          <Typography variant="body1">
            We use products to analyze activity on our site. We use LocaliQ’s tracking technology and/or Google Analytics
            to understand how users use our site to enhance the user experience on our Site.
          </Typography>
          <Typography variant="body1">
            LocaliQ is a service provider which assists us in advertising our products and/or services. LocaliQ has a
            retargeting product, which enables LocaliQ to show you advertisements for our Site when you visit other sites
            in the LocaliQ network or in third-party networks. LocaliQ is able to do this through the use of cookies that
            are provided by LocaliQ through its third-party partners (“Advertising Cookies”).
          </Typography>
          <Typography variant="body1">
            Google Analytics is a platform that collects data from the Site and create reports that provide insights
            about visitors and their interactions with the Site.
          </Typography>

          {/* Section: How Do We Use Your Information? */}
          <Typography id="use" variant="h5" component="h2" gutterBottom>
            How Do We Use Your Information?
          </Typography>
          <Typography variant="body1">
            We use your information to respond to you regarding the reason you contacted us. We will also use your
            information as follows:
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Registration
          </Typography>
          <Typography variant="body1">
            A user may need to first complete a registration form in order to use the Site. During registration, a user is
            required to give certain information (such as name and email address). This information is used to contact you
            about the products/services on our Site in which you have expressed interest. At your option, you may also
            provide demographic information (such as gender or age) about yourself, but it is not required.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Orders
          </Typography>
          <Typography variant="body1">
            We may request information from you on our order form. To buy from us, you must provide contact information
            (like name and shipping address) and financial information (like credit card number, expiration date). This
            information is used for billing purposes and to fill your orders. If we have trouble processing an order, we
            will use this contact information to contact you.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Surveys and Contests
          </Typography>
          <Typography variant="body1">
            From time-to-time, our Site may request information via surveys or contests. Participation in these surveys
            or contests is completely voluntary, and you may choose whether or not to participate and therefore disclose
            this information. Information requested may include contact information (such as name and shipping address),
            and demographic information (such as ZIP code, age level). Contact information will be used to notify the
            winners and award prizes. Survey information will be used for purposes of monitoring or improving the use and
            satisfaction of this Site.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Customer Service
          </Typography>
          <Typography variant="body1">
            Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products
            or services, or changes to this Policy.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Chat
          </Typography>
          <Typography variant="body1">
            Our Site may use chat functionality to enable direct communication with you through our Site. We will
            primarily use such information to assess your needs and to gain your contact information so that we may
            contact you to further discuss our products and/or services.
          </Typography>

          {/* Section: Do We Share Your Information? */}
          <Typography id="share" variant="h5" component="h2" gutterBottom>
            Do We Share Your Information?
          </Typography>
          <Typography variant="body1">
            We may share your personal information and with trusted third-party service providers as necessary for them to
            perform services on our behalf, such as:
          </Typography>
          <List>
            <ListItem>Processing credit card payments.</ListItem>
            <ListItem>Serving advertisements.</ListItem>
            <ListItem>Conducting contests or surveys.</ListItem>
            <ListItem>Performing analysis of our services, customer demographics, and sentiment.</ListItem>
            <ListItem>Communicating with you, such as by way of email or survey delivery.</ListItem>
            <ListItem>Customer relationship management.</ListItem>
            <ListItem>Security, risk management, and compliance.</ListItem>
            <ListItem>Recruiting support and related services.</ListItem>
          </List>
          <Typography variant="body1">
            These third parties (and any subcontractors they may be permitted to use) have agreed not to share, use or
            retain your personal information for any purpose other than as necessary for the provision of Services.
          </Typography>
          <Typography variant="body1">
            We may also share your Personal Information for marketing and advertising purposes, including sending you
            promotional material or special offers on our behalf or on behalf of our marketing partners and other third
            parties, provided that you have not already opted-out of receiving such communications.
          </Typography>
          <Typography variant="body1">
            We may share aggregated demographic information with our partners and advertisers. This is not linked to any
            Personal Information that can identify any individual person.
          </Typography>
          <Typography variant="body1">
            We will disclose Personal Information when we believe in good faith that such disclosures (a) are required by
            law, including, for example, to comply with a court order or subpoena, or (b) will help to: enforce our
            policies; enforce contest, sweepstakes, promotions, and/or game rules; protect your safety or security,
            including the safety and security of property that belongs to you; and/or, protect the safety and security of
            our Site or third parties. In addition, if Lexter Search or all of its assets are acquired, all of the data
            collected by us through the Site and through other means and services provided by us would be among the
            transferred assets.
          </Typography>

          {/* Section: Your Privacy Rights — Access to and Control Over Information */}
          <Typography id="rights" variant="h5" component="h2" gutterBottom>
            Your Privacy Rights — Access to and Control Over Information
          </Typography>
          <Typography variant="body1">
            We offer you choices regarding the collection, use, and sharing of your Personal Information. If you receive
            promotional communications from us, you may indicate a preference to stop receiving further promotional
            communications from us and you will have the opportunity to “opt-out” by following the unsubscribe
            instructions provided in the promotional email you receive or by contacting us directly at the email address
            or phone number given on our Site. We do not charge for this service, and your opt-out request will be
            processed within 30 days of the date on which we receive it. You can do the following at any time by
            contacting us via the email address or phone number given on our Site:
          </Typography>
          <List>
            <ListItem>See what data we have about you; if any.</ListItem>
            <ListItem>Change/correct any data we have about you.</ListItem>
            <ListItem>Have us delete any data we have about you.</ListItem>
            <ListItem>
              Notify us if you do not want us to share your Personal Information for marketing and promotional purposes.
            </ListItem>
          </List>

          {/* Section: How to Opt Out of Targeted Advertising */}
          <Typography id="opt-out" variant="h5" component="h2" gutterBottom>
            How to Opt Out of Targeted Advertising
          </Typography>
          <Typography variant="body1">
            You can set most web browsers to notify you if you receive a cookie, or you may choose to block cookies,
            though either of those actions may affect the use of our Site. If you prefer to not receive targeted
            advertising, you can opt out of some network advertising programs that use your information. To do so please
            visit the Digital Advertising Alliance (DAA) Opt-Out Page:{' '}
            <Link href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">
              https://www.aboutads.info/choices/
            </Link>
            . Please note that even if you choose to remove your information (via opting out), you will still see
            advertisements while you are browsing online. However, the advertisements you see may be less relevant to you
            and your interests. Additionally, many network advertising programs allow you to view and manage the interest
            categories they have compiled from your online browsing activities. These interest categories help determine
            the types of targeted advertisements you may receive. The DAA Opt-Out Page provides a tool that identifies
            its member companies that have cookies on your browser and provides links to those companies’ pages where you
            can opt out of receiving targeted advertisements from companies.
          </Typography>
          <Typography variant="body1">
            You may opt out of the tracking enabled by the LocaliQ by visiting:{' '}
            <Link href="https://localiq.com/optout/" target="_blank" rel="noopener">
              https://localiq.com/optout/
            </Link>
            .
          </Typography>
          <Typography variant="body1">
            You may opt out of Google Analytics by visiting{' '}
            <Link href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">
              https://tools.google.com/dlpage/gaoptout
            </Link>
            .
          </Typography>
          <Typography variant="body1">
            You can also find out more about your “Do Not Track” options by visiting{' '}
            <Link href="https://www.allaboutdnt.com/" target="_blank" rel="noopener">
              https://www.allaboutDNT.com
            </Link>
            .
          </Typography>

          {/* Section: Does This Policy Apply to Other Websites Linked To Or From the Site? */}
          <Typography id="other-sites" variant="h5" component="h2" gutterBottom>
            Does This Policy Apply to Other Websites Linked To Or From the Site?
          </Typography>
          <Typography variant="body1">
            The Site may contain links to other websites. Any Personal Information you provide on linked pages or sites is
            provided directly to that third party and is subject to that third party’s privacy policy. This Policy does
            not apply to such linked sites, and we are not responsible for the content or privacy and security practices
            and policies of these websites or any other sites that are linked to or from the Site. We encourage you to
            learn about their privacy and security practices and policies before providing them with Personal
            Information.
          </Typography>

          {/* Section: Do We Collect Information From Children Under the Age of 16? */}
          <Typography id="children" variant="h5" component="h2" gutterBottom>
            Do We Collect Information From Children Under the Age of 16?
          </Typography>
          <Typography variant="body1">
            The Site is not intended for use by children under the age of 16, and Lexter Search does not knowingly collect
            or use any Personal Information from such children. If we become aware that we have unknowingly collected
            Personal Information from a child under the age of 16, we will make commercially reasonable efforts to delete
            such Personal Information from our database.
          </Typography>

          {/* Section: What Steps Do We Take To Protect Your Information? */}
          <Typography id="protect" variant="h5" component="h2" gutterBottom>
            What Steps Do We Take To Protect Your Information?
          </Typography>
          <Typography variant="body1">
            We take measures designed to protect your Personal Information in an effort to prevent loss, misuse, and
            unauthorized access, disclosure, alteration, and destruction. We provide physical, electronic, and procedural
            safeguards to protect Personal Information we process and maintain. Please be aware, however, that despite our
            efforts, no security measures are perfect or impenetrable and no method of data transmission can be guaranteed
            against any interception or other types of misuse. To protect the confidentiality of Personal Information
            maintained in your account, you must keep your password confidential and not disclose it to any other person.
            You are responsible for all uses of the Site by any person using your password. Please advise us immediately
            if you believe your password has been misused.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Limitation of Liability
          </Typography>
          <Typography variant="body1">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES, INCLUDING, BUT NOT LIMITED TO,
            NEGLIGENCE, WILL WE BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES THAT
            RESULT FROM OUR PROCESSING OR USE OF PERSONAL INFORMATION, EVEN IF WE ARE ADVISED BEFOREHAND OF THE
            POSSIBILITY OF SUCH DAMAGES. THE MAXIMUM AMOUNT OF DAMAGES FOR WHICH WE WILL BE LIABLE UNDER THIS AGREEMENT
            WILL BE THE GREATER OF THE FEES YOU PAID FOR ANY PRODUCT IN CONNECTION WITH WHICH YOU PROVIDED YOUR PERSONAL
            INFORMATION, OR $100.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            Miscellaneous
          </Typography>
          <Typography variant="body1">
            This Policy and the privacy practices of Lexter Search will be governed by and construed in accordance with
            the laws of Alberta in Canada.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicy;