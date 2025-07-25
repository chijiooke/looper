"use client";
import { motion } from "framer-motion";
import { Send } from "iconsax-react";
import { useState } from "react";

export const PartnerWithUs = () => {
  interface IFormData {
    email: string;
    phone_number: string;
    name: string;
    business_name: string;
  }
  interface IFormResponse {
    status: "success" | "failure";
    message: string;
  }

  interface FormError {
    code: string;
    message: string;
  }

  interface FormResponse {
    error: string;
    errors: FormError[];
  }

  const initialData: IFormData = {
    email: "",
    phone_number: "",
    business_name: "",
    name: "",
  };
  const [formData, setFormData] = useState<IFormData>(initialData);
  const [responseMessage, setResponseMessage] = useState<null | IFormResponse>(
    null
  );

  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Validate form data
      for (const key in formData) {
        if (!formData[key as keyof IFormData] && key !== "email") {
          setResponseMessage({
            status: "failure",
            message: `kindly provide your ${key.replace("_", " ")}`,
          });
          return;
        }
      }
      const response = await fetch("https://formspree.io/f/mzzgnzyl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage({
          status: "success",
          message: "Thank you for your message!",
        });
        setFormData(initialData);
      } else {
        setResponseMessage({
          status: "failure",
          message:
            "Oops! There was a problem. Kindly crosscheck values entered",
        });
      }
    } catch (error: any) {
      setResponseMessage({
        status: "failure",
        message: (error as FormResponse)?.error,
      });
    } finally {
      setLoading(false);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full bg-black  mt-0 grid sm:grid-cols-2 xs:grid-cols-1 xs:p-10 items-center justify-center gap-8"
      id="partner"
    >
      <img
        src="./female-shopkeeper-smiling-camera.jpg"
        alt="partner"
        className="w-auto sm:h-dvh xs:w-full xs:object-cover xs:object-right-top xs:h-[400px] object-fill object-center box-border xs:rounded-lg"
      />

      <div className="sm:mt-2 flex flex-col box-border">
        <p
          className="font-ginger sm:text-[8rem] xs:text-[5rem] text-orange-400 p-0 m-0 text-left"
          style={{ lineHeight: 0.75 }}
        >
          Partner With Looper
        </p>
        <p
          className="text-sm text-slate-300 p-0 m-0 text-left mt-4 mb-8"
          style={{ lineHeight: 1.7 }}
        >
          <span className="font-bold text-white">
            Don&apos;t lose your surplus, Loop it!
          </span>{" "}
          <br></br>
          Sell fast on Looper, connect your surplus/discounted items to
          customers<br></br> You will be contacted within 24hrs of submitting
        </p>
        <div className=" relative  box-border sm:w-[550px] xs:w-full">
          {responseMessage && (
            <div
              className={`${
                responseMessage?.status === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } mb-2 rounded-md p-2 text-xs font-semibold`}
            >
              {responseMessage.message}
            </div>
          )}
          <div className="flex flex-col mb-5">
            {" "}
            <label htmlFor="name" className="text-gray-400 text-sm mb-4">
              Full Name
            </label>
            <input
              value={formData.name}
              id="name"
              placeholder="e.g John Doe"
              className="p-3 rounded-md bg-slate-100 outline-none border-none text-slate-600 h-10  mb-2"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target?.value })
              }
            />
          </div>
          <div className="flex flex-col mb-5">
            {" "}
            <label htmlFor="name" className="text-gray-400 text-sm mb-4">
              Business Name
            </label>
            <input
              id="business_name"
              value={formData.business_name}
              placeholder="e.g d'prince super market"
              className="p-3 rounded-md bg-slate-100 outline-none border-none text-slate-600 h-10  mb-2"
              onChange={(e) =>
                setFormData({ ...formData, business_name: e.target?.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mb-5">
              <label htmlFor="name" className="text-gray-400 text-sm mb-4">
                Phone Number
              </label>
              <input
                id="phone_number"
                placeholder="e.g +23400000000"
                className="p-3 rounded-md bg-slate-100 outline-none border-none text-slate-600 h-10  mb-2"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target?.value })
                }
              />
            </div>
            <div className="flex flex-col mb-5">
              {" "}
              <label htmlFor="name" className="text-gray-400 text-sm mb-4">
                Email (optional)
              </label>
              <input
                id="email"
                value={formData.email}
                placeholder="e.g johndoe@mail.com"
                className="p-3 rounded-md bg-slate-100 outline-none border-none text-slate-600 h-10  mb-2"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target?.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-col w-full justify-end gap-5">
            <motion.button
              className="bg-green-700 col-span-3 flex gap-2 items-center justify-center text-white mt-3 font-sm p-3 rounded-xl w-full overflow-hidden hover:scale-105 ease-in-out duration-500 cursor-pointer"
              onClick={handleSubmit}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {isLoading ? "...loading" : "Submit"}
              <motion.div
                animate={
                  isHovered
                    ? { rotate: 320, scale: 1.2 }
                    : { rotate: 0, scale: 1 }
                }
                transition={{ type: "tween", duration: 0.3 }}
              >
                <Send />
              </motion.div>
            </motion.button>
            <p className="text-white text-center">- or -</p>
            <motion.a
              className="bg-orange-500 col-span-1  flex gap-2 items-center justify-center text-white  font-sm p-3 rounded-xl w-full overflow-hidden hover:scale-105 ease-in-out duration-500 cursor-pointer"
              href="tel:+2340000000000"
            >
              Call Us 234(0)000 0000 000{" "}
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};
