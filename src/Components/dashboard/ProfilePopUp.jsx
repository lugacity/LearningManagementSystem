import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegBell, FaRegHeart } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";

import {
  faCog,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/services/queries";
import { Skeleton } from "../ui/skeleton";

const ProfilePopUp = () => {
  const { userDetails } = useAuth();
  const { isLoading, data } = useProfile();

  return (
    <div className="mx-auto ml-auto w-full max-w-[400px] rounded-md border border-gray-200 bg-white px-6 py-8 text-[#344054] shadow-lg">
      <div className="flex items-center gap-5 pb-6 pt-4">
        <div>
          <Avatar className="w-8 cursor-pointer md:h-[60px] md:w-[60px]">
            <AvatarImage src={userDetails.Avatar} />
            <AvatarFallback className="bg-primary-color-100 text-sm text-primary-color-600 md:text-2xl">
              {userDetails.firstname ? (
                `${userDetails.firstname.charAt(0).toUpperCase()}${userDetails.lastname.charAt(0).toUpperCase()}`
              ) : isLoading ? (
                <Skeleton className="h-12 w-12 rounded-full" />
              ) : (
                `${data?.data?.data.firstname.charAt(0).toUpperCase()}${data?.data?.data.lastname.charAt(0).toUpperCase()}`
              )}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 font-[300] text-[#667185]">
          <p className="text-[24px] *:capitalize">
            {" "}
            <span>
              {userDetails.firstname
                ? userDetails.firstname
                : isLoading
                  ? "loading"
                  : data?.data?.data.firstname}
            </span>{" "}
            <span>
              {userDetails.lastname
                ? userDetails.lastname
                : isLoading
                  ? "loading"
                  : data?.data?.data.lastname}
            </span>
          </p>
          <p className="text-[14px]">
            {userDetails.email.length > 26
              ? `${userDetails.email.slice(0, 26)}...`
              : userDetails.email || isLoading
                ? "loading"
                : data?.data?.data.email.length > 26
                  ? `${data?.data?.data.email.slice(0, 26)}...`
                  : data?.data?.data.email}
          </p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-[#C7D7F4] lg:block" />

      <div className="py-4">
        <Link
          to="/dashboard"
          className="flex items-center px-4 py-3 hover:bg-gray-100"
        >
          <GrHomeRounded className="mr-4" /> Dashboard
        </Link>
        <Link
          to="/dashboard/notification"
          className="flex items-center px-4 py-3 hover:bg-gray-100"
        >
          <FaRegBell className="mr-4" />
          Notifications
        </Link>
        <Link
          to="/dashboard/wishlists"
          className="flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <FaRegHeart className="mr-4" /> Wishlist
        </Link>
      </div>

      <div className="hidden h-[1.2px] w-full bg-[#C7D7F4] lg:block" />

      <div className="py-5">
        <Link
          to="/dashboard/student-settings"
          className="flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faCog} className="mr-4" /> Account Settings
        </Link>
        <Link
          to="/dashboard/referral"
          className="flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-4" /> Referral
        </Link>
      </div>

      <div className="mb-6 hidden h-[1.2px] w-full bg-[#C7D7F4] lg:block" />

      <button
        onClick={() => {
          // Add logout functionality here
        }}
        className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-4" /> Logout
      </button>
    </div>
  );
};

export default ProfilePopUp;
