import { Button, Modal } from "flowbite-react";
import { MdCached } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState } from "react";

export function ResetButton() {
  const [openModal, setOpenModal] = useState(false);

  const handleClearStorage = () => {
    const initial = {education: [{ institution_information: [""] }], experience: [{ exp_information: [""] }], work: [{ work_information: [""] }], certification: [{ cert_information: [""] }], skill: [{}]}
    localStorage.setItem("context", JSON.stringify(initial));
    window.location.reload();
  };

  return (
    <div>
      <Button outline size="md" className="mt-1" onClick={() => setOpenModal(true)}>
        <MdCached className="mr-2" />
        Reset
      </Button>
      <Modal
        dismissible
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to reset all data?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleClearStorage}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
