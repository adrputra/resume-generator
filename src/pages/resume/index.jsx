import { Tabs } from "flowbite-react";
import { Profile } from "@/components/Form/Profile";
import { Education } from "@/components/Form/Education";
import { Experience } from "@/components/Form/Experience";
import { DownloadButton } from "@/components/ButtonDownload";
import { ResetButton } from "@/components/ButtonReset";
import { LoadData } from "@/components/Form/LoadData";
import { HiUserCircle } from "react-icons/hi";
import { IoSchoolSharp, IoReloadCircle } from "react-icons/io5";
import { AiFillCompass } from "react-icons/ai";
import { GrUserWorker, GrCertificate, GrUpgrade } from "react-icons/gr";
import { MdDownload } from "react-icons/md";
import { useState } from "react";
import { FloatingAlert } from "@/components/Alert";

export default function Resume() {
  const [alert, setAlert] = useState(null);

  const showAlert = (color, info) => {
    // Function to trigger the alert
    setAlert({ color, info });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <>
      <div className="md:container md:mx-auto bg-zinc-50 p-8">
        {alert && <FloatingAlert {...alert} onClose={hideAlert} />}
        <div className="grid grid-flow-col grid-cols-10 gap-4">
          <Tabs
            aria-label="Tabs with underline"
            style="underline"
            className="col-span-9"
          >
            <Tabs.Item title="Load Data" icon={IoReloadCircle}>
              <LoadData showAlert={showAlert} hideAlert={hideAlert} />
            </Tabs.Item>
            <Tabs.Item title="Profile" icon={HiUserCircle}>
              <span className="text-3xl font-bold">User Profile</span>
              <Profile showAlert={showAlert} hideAlert={hideAlert}/>
            </Tabs.Item>
            <Tabs.Item title="Education" icon={IoSchoolSharp}>
              <span className="text-3xl font-bold">Education</span>
              <Education showAlert={showAlert} hideAlert={hideAlert}/>
            </Tabs.Item>
            <Tabs.Item title="Experiences" icon={AiFillCompass}>
              <span className="text-3xl font-bold">Experiences</span>
              <Experience showAlert={showAlert} hideAlert={hideAlert}/>
            </Tabs.Item>
            <Tabs.Item title="Working Experiences" icon={GrUserWorker}>
              <span className="text-3xl font-bold">Working Experiences</span>
            </Tabs.Item>
            <Tabs.Item title="Certifications" icon={GrCertificate}>
              <span className="text-3xl font-bold">Certifications</span>
            </Tabs.Item>
            <Tabs.Item title="Skills" icon={GrUpgrade}>
              <span className="text-3xl font-bold">Skills</span>
            </Tabs.Item>
            <Tabs.Item title="Download" icon={MdDownload}>
              <DownloadButton />
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
