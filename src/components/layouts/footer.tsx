import { IconLocation, IconMail, IconPhone } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-tertiary text-textFooter text-sm">
      <div className="mx-auto  w-full max-w-screen-xl  py-3 pb-2 px-3 xs:px-[1rem] sm:px-[2rem] md:px-[5rem] lg:px-[10rem]">
        <div className="md:flex xs:items-center md:justify-between">
          <div className="mb-6  flex gap-2 flex-col">
            <Link href={'/'}>
              <Image
                height={500}
                width={250}
                src={'/toolsmandu_color.png'}
                alt="Toolsmandu Logo"
              />
            </Link>
            <div className="xs:w-[22em]  md:w-[22em]  ">
              Toolsmandu Provides Genuine Digital Subscriptions At Best Price.
              Serving Nepalese Market Since 2021 - Trusted By 25,000+ Customers
              Worldwide.
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                {' '}
                {<IconLocation></IconLocation>} Bharatpur 07, Chitwan, Nepal
              </div>
              <div className="flex gap-2">
                {' '}
                {<IconPhone></IconPhone>} +977 9864484274
              </div>
              <div className="flex gap-2">
                {' '}
                {<IconMail></IconMail>} support@toolsmandu.com
              </div>

              <div className="flex gap-1 mt-8 sm:justify sm:mt-0">
                <a
                  href="https://www.facebook.com/profile.php?id=100094975557066"
                  className="  "
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 8 19"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Facebook page</span>
                </a>
                <a
                  href="https://www.instagram.com/toolsmandu"
                  className=" ms-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                  <span className="sr-only">Instagram page</span>
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=9779864484274&text&type=phone_number&app_absent=0"
                  className=" ms-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-whatsapp"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                  <span className="sr-only">Whatsapp Page</span>
                </a>
              </div>
            </div>
          </div>
          <div className="grid  grid-cols-2  gap-8 sm:gap-6 sm:grid-cols-4">
            <div>
              <p className="mb-6 text-xs  font-semibold   uppercase text-textPrimary ">
                Information
              </p>
              <ul className=" font-medium">
                <li className="mb-4">
                  <Link href="#" className="   hover:underline text-xs py-1">
                    About us
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="#" className="   hover:underline text-xs">
                    About Delivery
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/blog" className="   hover:underline text-xs">
                    Blog
                  </Link>
                </li>
              </ul>{' '}
            </div>
            <div>
              <p className="mb-6 text-xs  font-semibold   uppercase text-textPrimary ">
                Our Policy
              </p>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="#" className="   hover:underline text-xs">
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="#" className="   hover:underline text-xs">
                    Refund Policy
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="#" className="   hover:underline text-xs">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
            <div className=" xs:grid xs:grid-cols-2 sm:grid-cols-1">
              <div>
                <p className="mb-6 text-xs  font-semibold   uppercase text-textPrimary ">
                  Support
                </p>
                <ul className="       font-medium">
                  <li className="mb-4">
                    <Link
                      href="/profile/tickets"
                      className="   hover:underline text-xs"
                    >
                      Payment Issues{' '}
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      href="/contact"
                      className="   hover:underline text-xs"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" xs:grid xs:grid-cols-2 sm:grid-cols-1">
              <div>
                <p className="mb-6 text-xs  font-semibold   uppercase text-textPrimary ">
                  Partnership/Deal
                </p>
                <ul className="       font-medium">
                  <li className="mb-4">
                    <Link href="#" className="   hover:underline text-xs">
                      Coupons
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="#" className="   hover:underline text-xs">
                      Partnership
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" sm:pt-8 md:pt-4  ">
              <p className="mb-6 text-xs  font-semibold   uppercase text-textPrimary">
                CHECK OUR REVIEWS
              </p>
              <div className="flex   gap-2">
                <a
                  href="https://www.trustpilot.com/review/toolsmandu.com"
                  target="_blank"
                >
                  <Image
                    src={'/trustpilot.png'}
                    height={120}
                    width={300}
                    alt={'Trustpilot logo'}
                  />
                </a>{' '}
                <a
                  href="https://g.page/r/CUKd9KQPxJrfEBM/review"
                  target="_blank"
                >
                  <Image
                    src={'/google-reviews.png'}
                    height={120}
                    width={300}
                    className="mt-2"
                    alt={'Google reviews logo'}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
        <div className="flex items-center xs:items-start sm:justify-between sm:flex-row xs:flex-col-reverse gap-2 xs:gap-4 ">
          <div>
            <span className="text-sm    sm:text-center    ">
              © {new Date().getFullYear()}
              <a href="https://flowbite.com/" className="   underline  mx-1">
                Toolsmandu.com
              </a>
              | All Rights Reserved
            </span>
          </div>
          <div className="  flex items-center justify-center  sm:gap-4 ">
            <div className=" grid grid-cols-3 gap-2 xs:mt-4">
              <Image
                src={'/esewa_logo.png'}
                height={10}
                width={75}
                className="relative bottom-3"
                alt={'Esewa logo'}
              />
              <Image
                src={'/khalti.png'}
                height={40}
                width={60}
                className="relative bottom-3"
                alt={'Khalti logo'}
              />{' '}
              <Image
                src={'/connectips.png'}
                height={40}
                width={75}
                className="relative bottom-3 right-1"
                alt={'Esewa logo'}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
