import OtpComponent from "@/Components/about/OtpComponent";
import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { useCredentials } from "@/hooks/useCredentials";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_AUTH_URL;

const ConfirmEmail = ({ setConfirm, setModal, setSuccess, user }) => {
  // const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const inputRef = useRef();

  const { otp, setOtp } = useCredentials();

  const verify = async () => {
    try {
      const verify = await axios.post(`${url}/verifyUser`, {
        email: user.email,
        confirmCode: otp,
      });

      if (verify.data.status === "success") {
        toast.success(verify.data.status);
        setSuccess("success");
      }
    } catch (error) {
      // setSuccess("fail");
      setSuccess("fail");

      toast.error(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <BorderCard className="w-full max-w-[731px] rounded-xl bg-white py-11 text-center">
      <div className="px-4">
        <p className="text-xl font-semibold text-[#23314A]">
          Confirm your email address
        </p>
        <p className="mx-auto mb-6 mt-3 max-w-[284px] text-center text-sm leading-[18px] text-[#98A2B3]">

          Please enter code we sent now to aviplatform@gmail.com{" "}
          <span
            className="cursor-pointer text-primary-color-600"
            onClick={() => inputRef.current.focus()}
          >
            Edit
          </span>

        </p>
        <div className="mx-auto w-fit">
          <OtpComponent setOtp={setOtp} inputRef={inputRef} />
        </div>
        <p className="mb-[31px] mt-6 text-sm">
          <span className="text-[#645D5D]"> Didn’t receive a code?</span>{" "}
          <span className="font-medium text-primary-color-600">Resend</span>
        </p>
      </div>
      <CommonButton
        className="w-full bg-primary-color-600"
        onClick={() => {
          verify();
          setConfirm((prev) => !prev);
          setModal((prev) => !prev);
        }}
      >
        Confirm
      </CommonButton>
    </BorderCard>
  );
};

export default ConfirmEmail;
