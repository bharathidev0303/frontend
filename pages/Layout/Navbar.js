import { CgProfile, CgToolbox } from "react-icons/cg";
import { VscDeviceMobile } from "react-icons/vsc";
import { FaRegFile, FaSitemap, FaMapSigns } from "react-icons/fa";
import { AiOutlineTool, AiOutlineUpload } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 p-6 h-screen transition-transform -translate-x-full bg-sidebarcolor border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="flex items-center gap-2">
          <img src="/pharmarack.png" className="h-8 w-12" alt="logo" />
          <span className="text-white font-semibold">CMS</span>
        </div>
        <div className="flex gap-2 items-center mt-6">
          <CgProfile className="text-whitecolor" size={34} />
          <div className="flex flex-col gap-1">
            <span className="text-whitecolor text-xs">Welcome</span>
            <span className="font-bold text-whitecolor text-xs">
              Admin User
            </span>
          </div>
        </div>

        <div className="pt-10 overflow-y-auto">
          <ul className=" space-y-3">
            <li className="flex items-center">
              <Link href="/preview">
                <span className="ms-3 text-whitecolor hover:text-hovercolor flex-auto">
                  Preview
                </span>
              </Link>
              <VscDeviceMobile
                size={24}
                className="hover:text-hovercolor text-whitecolor"
              />
            </li>
            <li className="flex items-center">
              <Link href="/pages">
                <span className="ms-3 text-whitecolor hover:text-hovercolor flex-auto">
                  Pages
                </span>
              </Link>
              <FaRegFile
                size={24}
                className="hover:text-hovercolor text-whitecolor"
              />
            </li>
            <li className="flex items-center">
              <Link href="/components">
                <span className="ms-3 text-whitecolor hover:text-hovercolor flex-auto">
                  components
                </span>
              </Link>
              <AiOutlineTool
                size={24}
                className="hover:text-hovercolor text-whitecolor"
              />
            </li>
            <li className="flex items-center">
              <Link href="/excelupload">
                <span className="ms-3 text-whitecolor hover:text-hovercolor flex-auto">
                  Excel Upload
                </span>
              </Link>
              <AiOutlineUpload
                size={24}
                className="hover:text-hovercolor text-whitecolor"
              />
            </li>
            <li className="flex items-center">
              <Link href="/segments">
                <span className="ms-3 text-whitecolor hover:text-hovercolor flex-auto">
                  Segments
                </span>
              </Link>
              <FaSitemap
                size={24}
                className="hover:text-hovercolor text-whitecolor"
              />
            </li>
            <li className="flex items-center">
              <Link href="/offers">
                <span className="ms-3 text-whitecolor hover:text-hovercolor flex-auto">
                  Offers
                </span>
              </Link>
              <MdOutlineLocalOffer
                size={24}
                className="hover:text-hovercolor text-whitecolor"
              />
            </li>
            <li className="flex items-center">
              <Link href="/versionmanager">
                <span className="ms-3 text-whitecolor hover:text-hovercolor flex-auto">
                  Version Manager
                </span>
              </Link>
              <FaMapSigns
                size={24}
                className="hover:text-hovercolor text-whitecolor"
              />
            </li>
            <li className="flex items-center">
              <Link href="/pagetypes">
                <span className="ms-3 text-whitecolor hover:text-hovercolor flex-auto">
                  Page Types
                </span>
              </Link>
              <FaRegFileAlt
                size={24}
                className="hover:text-hovercolor text-whitecolor"
              />
            </li>
            <li className="flex items-center">
              <Link href="/componenttypes">
                <span className="ms-3 text-whitecolor hover:text-hovercolor flex-auto">
                  Component Types
                </span>
              </Link>
              <CgToolbox
                size={24}
                className="hover:text-hovercolor text-whitecolor"
              />
            </li>
            <li className="flex items-center align-bottom">
              <Link href="/">
                <span className="ms-3 text-whitecolor hover:text-hovercolor flex-auto">
                  Logout
                </span>
              </Link>
              <RiShutDownLine
                size={24}
                className="hover:text-hovercolor text-whitecolor"
              />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
export default Navbar;
