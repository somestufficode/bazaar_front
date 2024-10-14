import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">SHOP</h3>
            <ul className="space-y-2">
              <li><Link href="/collections/women">WOMEN</Link></li>
              <li><Link href="/collections/men">MEN</Link></li>
              <li><Link href="/collections/girls">GIRLS</Link></li>
              <li><Link href="/collections/boys">BOYS</Link></li>
              <li><Link href="/collections/baby-toddler">BABY</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">COMPANY INFO</h3>
            <ul className="space-y-2">
              {/* <li><Link href="/career">CAREER AT URBAN BAZAAR</Link></li> */}
              <li><Link href="/about">ABOUT URBAN BAZAAR</Link></li>
              {/* <li><Link href="/sustainability">SUSTAINABILITY H&M GROUP</Link></li> */}
              {/* <li><Link href="/press">PRESS</Link></li> */}
              {/* <li><Link href="/investor-relations">INVESTOR RELATIONS</Link></li> */}
              {/* <li><Link href="/corporate-governance">CORPORATE GOVERNANCE</Link></li> */}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">HELP</h3>
            <ul className="space-y-2">
              <li><Link href="/customer-service">CUSTOMER SERVICE</Link></li>
              <li><Link href="/my-account">MY ACCOUNT</Link></li>
              {/* <li><Link href="/store-locator">FIND A STORE</Link></li> */}
              <li><Link href="/legal">LEGAL & PRIVACY</Link></li>
              <li><Link href="/contact">CONTACT</Link></li>
              <li><Link href="/gift-card-terms">GIFT CARD TERMS AND CONDITIONS</Link></li>
              {/* <li><Link href="/ca-supply-chains-act">CA SUPPLY CHAINS ACT</Link></li> */}
              {/* <li><Link href="/do-not-sell">DO NOT SELL OR SHARE MY PERSONAL DATA</Link></li> */}
              {/* <li><Link href="/accessibility">OUR COMMITMENT TO ACCESSIBILITY</Link></li> */}
              {/* <li><Link href="/report-scam">REPORT A SC AM</Link></li> */}
              {/* <li><Link href="/cookie-notice">COOKIE NOTICE</Link></li> */}
              {/* <li><Link href="/cookie-settings">COOKIE SETTINGS</Link></li> */}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">BECOME A MEMBER</h3>
            <p className="mb-4">Join now and get 10% off your next purchase!</p>
            <Link href="/membership" className="font-bold">READ MORE</Link>
          </div>
        </div>
        {/* <div className="mt-10 flex flex-col md:flex-row justify-between items-center"> */}
          {/* <Image src="/logo.png" alt="Urban Bazaar Logo" width={100} height={50} /> */}
          {/* <div className="mt-4 md:mt-0">
            <span className="mr-4">UNITED STATES ($)</span>
            <button className="underline">CHANGE REGION</button>
          </div> */}
        {/* </div> */}
        {/* <div className="mt-6 flex justify-center space-x-4">
          <Link href="https://instagram.com/"><Image src="/instagram-icon.png" alt="Instagram" width={24} height={24} /></Link>
          <Link href="https://tiktok.com/"><Image src="/tiktok-icon.png" alt="TikTok" width={24} height={24} /></Link>
          <Link href="https://youtube.com/"><Image src="/youtube-icon.png" alt="YouTube" width={24} height={24} /></Link>
          <Link href="https://pinterest.com/"><Image src="/pinterest-icon.png" alt="Pinterest" width={24} height={24} /></Link>
          <Link href="https://facebook.com/"><Image src="/facebook-icon.png" alt="Facebook" width={24} height={24} /></Link>
        </div> */}
      </div>
    </footer>
  )
}