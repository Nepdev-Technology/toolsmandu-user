import { Image } from '@mantine/core';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-tertiary">
      <div className="mx-auto  w-full max-w-screen-xl  py-6 px-3 xs:px-[1rem] sm:px-[2rem] md:px-[5rem] lg:px-[10rem]">
        <div className="md:flex md:justify-between">
          <div className="mb-6  flex gap-2 flex-col">
            <Link href={'/'}>
              <Image
                radius="md"
                h={50}
                w="auto"
                src={'toolsmandu_color.png'}
                alt="Toolsmandu Logo"
              />
            </Link>
            <p className="xs:w-[20em] md:w-[25em]">
              Toolsmandu.com – Digital Doctor For Your Business. Toolsmandu Was
              Created With One Idea In Mind: Tools That You Need To Grow Your
              Business.
            </p>
          </div>
          <div className="grid grid-cols-2  gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Important Information
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    About us
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    About Delivery
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/profile" className="hover:underline">
                    My Account
                  </Link>
                </li>
              </ul>
              <div className=" pt-5">
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Connect with Us
                </h2>
                <div className="flex gap-1 mt-4 sm:justify sm:mt-0">
                  <a
                    href="https://www.facebook.com/ToolsMandu"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
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
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 21 16"
                    >
                      <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                    </svg>
                    <span className="sr-only">Discord community</span>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 17"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Twitter page</span>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Our Policy
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    Refund Policy
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    Terms of Use
                  </Link>
                </li>
              </ul>
              <div className=" pt-5">
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  We accept
                </h2>
                <div className="flex gap-2">
                  <Image
                    src={'esewa_logo.png'}
                    radius="md"
                    h={20}
                    w="auto"
                    alt={'Esewa logo'}
                  />

                  <Image
                    src={'khalti-seeklogo.svg'}
                    radius="md"
                    h={20}
                    w="auto"
                    alt={'Khalti logo'}
                  />
                </div>
              </div>
            </div>
            <div className="xs:col-span-2 sm:col-span-1 xs:grid xs:grid-cols-2 sm:grid-cols-1">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Support Link
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link href="/tickets" className="hover:underline">
                      Help Center
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="#" className="hover:underline">
                      Contact Us
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/tickets" className="hover:underline">
                      Payment issues
                    </Link>
                  </li>
                </ul>
              </div>
              <div className=" sm:pt-5">
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Trusted By
                </h2>
                <div className="flex gap-2">
                  <Image
                    src={'trustpilot.png'}
                    radius="md"
                    h={20}
                    w="auto"
                    alt={'Trustpilot logo'}
                  />

                  <Image
                    src={'google reviews.png'}
                    radius="md"
                    h={20}
                    w="auto"
                    alt={'Google reviews logo'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}
            <a href="https://flowbite.com/" className="hover:underline mx-1">
              Toolsmandu
            </a>
            All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
