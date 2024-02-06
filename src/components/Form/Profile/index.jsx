import { Input } from "@/components/TextInput";
import { EmailInput } from "@/components/EmailInput";
import { Button, Modal } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context";
import { SaveButton } from "@/components/SaveButton";
import {
  CapitalizeEachLetter,
  PhoneNumberFormatter,
} from "@/service/formatter";

export function Profile({ showAlert, hideAlert }) {
  const { context, updateContext } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const userProfile = context?.profile || { id: uuidv4() };

  const handleChange = (field, value) => {
    updateContext({
      ...context,
      profile: {
        ...userProfile,
        [field]: value,
      },
    });
  };

  useEffect(() => {
    updateContext({
      ...context,
      profile: {
        ...userProfile,
        id: uuidv4(),
      },
    });
  }, []);

  const handleErrorMessage = (error) => {
    showAlert(error.code, error.msg);
    setOpenModal(true);
    setTimeout(() => {
      hideAlert();
    }, 10000);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="container mx-auto">
        <div className="grid grid-flow-row auto-rows-max gap-4 my-4">
          <Input
            label="Name"
            id="name"
            value={userProfile.name || ""}
            formatter={CapitalizeEachLetter}
            onChange={handleChange}
          />
          <Input
            label="City"
            id="city"
            value={userProfile.city || ""}
            formatter={CapitalizeEachLetter}
            onChange={handleChange}
          />
          <Input
            label="Country"
            id="country"
            value={userProfile.country || ""}
            formatter={CapitalizeEachLetter}
            onChange={handleChange}
          />
          <Input
            label="Phone Number"
            id="phone_number"
            value={userProfile.phone_number || ""}
            formatter={PhoneNumberFormatter}
            onChange={handleChange}
          />
          <EmailInput
            label="Email"
            id="email"
            value={userProfile.email || ""}
            onChange={handleChange}
          />
          <Input
            label="Linkedin"
            id="linkedin"
            value={userProfile.linkedin || ""}
            onChange={handleChange}
          />
          <Input
            label="Portfolio"
            id="portfolio"
            value={userProfile.portfolio || ""}
            onChange={handleChange}
          />
        </div>
        <SaveButton
          action="profile"
          url={process.env.NEXT_PUBLIC_INSERT_USER}
          isError={handleErrorMessage}
        />
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Your Unique Key</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <h1 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
              {userProfile.id}
            </h1>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              This is your unique key that you can use to load your data. Please save it in a safe place. If you lost it you're gonna need to start all over again.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Okey, I'll keep it save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
