import { Tabs } from "flowbite-react";
import { Profile } from "@/components/Form/Profile";
import { Education } from "@/components/Form/Education";
import { Experience } from "@/components/Form/Experience";
import { Work } from "@/components/Form/Work";
import { Certification } from "@/components/Form/Certification";
import { Skill } from "@/components/Form/Skill";
import { Download } from "@/components/Form/Download";
import { ResetButton } from "@/components/ButtonReset";
import { LoadData } from "@/components/Form/LoadData";
import { HiUserCircle } from "react-icons/hi";
import { IoSchoolSharp, IoReloadCircle } from "react-icons/io5";
import { AiFillCompass } from "react-icons/ai";
import { GrUserWorker, GrCertificate, GrUpgrade } from "react-icons/gr";
import { MdDownload } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import { FloatingAlert } from "@/components/Alert";
import { Context } from "@/context";

export default function Resume() {
  const [alert, setAlert] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { context } = useContext(Context);

  const showAlert = (color, info) => {
    // Function to trigger the alert
    setAlert({ color, info });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <>
      <div className="md:container md:mx-auto bg-zinc-50 p-4">
        <span className="font-medium italic">{context?.profile?.id}</span>
        {alert && <FloatingAlert {...alert} onClose={hideAlert} />}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
          <Tabs
            aria-label="Tabs with underline"
            style="underline"
            className="col-span-9"
          >
            <Tabs.Item title={!isSmallScreen ? "Load Data" : null} icon={IoReloadCircle}>
              <LoadData showAlert={showAlert} hideAlert={hideAlert} />
            </Tabs.Item>
            <Tabs.Item title={!isSmallScreen ? "Profile" : null} icon={HiUserCircle}>
              <span className="text-3xl font-bold">User Profile</span>
              <Profile showAlert={showAlert} hideAlert={hideAlert} />
            </Tabs.Item>
            <Tabs.Item title={!isSmallScreen ? "Education" : null} icon={IoSchoolSharp}>
              <span className="text-3xl font-bold">Education</span>
              <Education showAlert={showAlert} hideAlert={hideAlert} />
            </Tabs.Item>
            <Tabs.Item title={!isSmallScreen ? "Experiences" : null} icon={AiFillCompass}>
              <span className="text-3xl font-bold">Experiences</span>
              <Experience showAlert={showAlert} hideAlert={hideAlert} />
            </Tabs.Item>
            <Tabs.Item title={!isSmallScreen ? "Working Experiences" : null} icon={GrUserWorker}>
              <span className="text-3xl font-bold">Working Experiences</span>
              <Work showAlert={showAlert} hideAlert={hideAlert} />
            </Tabs.Item>
            <Tabs.Item title={!isSmallScreen ? "Certifications" : null} icon={GrCertificate}>
              <span className="text-3xl font-bold">Certifications</span>
              <Certification showAlert={showAlert} hideAlert={hideAlert} />
            </Tabs.Item>
            <Tabs.Item title={!isSmallScreen ? "Skills" : null} icon={GrUpgrade}>
              <span className="text-3xl font-bold">Skills</span>
              <Skill showAlert={showAlert} hideAlert={hideAlert} />
            </Tabs.Item>
            <Tabs.Item title={!isSmallScreen ? "Download" : null} icon={MdDownload}>
              <Download showAlert={showAlert} hideAlert={hideAlert} />
            </Tabs.Item>
          </Tabs>
          <div className="max-h-min col-span-1">
            <ResetButton />
          </div>
        </div>
      </div>
    </>
  );
}
