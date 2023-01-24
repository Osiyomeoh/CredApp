import React from "react";
// import { SiSolidity } from "react-icons/Si";
import { BsSpeedometer2} from "react-icons/bs";
import { RiHeart2Fill } from "react-icons/ri";
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-start gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col w-118 justify-end items-end">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          CredenceApp
          <br />
          Fast and Reliable
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          Invest and earn interest on your cryptocurrency asset
        </p>
      </div>

      <div className="flex-1 flex flex-col w-118 justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Great Return on investment"
          icon={<FaBeer  fontSize={21} className="text-white" />}
          subtitle="Credence App brings you speed, trust and reliability"
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="We are Reliable Trustworthy"
          icon={< RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Credence App brings you speed, trust and reliability"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Fast"
          icon={<BsSpeedometer2 fontSize={21} className="text-white" />}
          subtitle="Credence App brings you speed, trust and reliability"
        />
      </div>
    </div>
  </div>
);

export default Services;