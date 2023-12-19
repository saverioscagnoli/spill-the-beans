import { Dialog } from "tredici";

interface OpenSafeDescriptionProps {
  /**
   * Flag that indicates if the user input the wrong password.
   */
  wrongPassword: boolean;
}

const OpenSafeDescription: React.FC<OpenSafeDescriptionProps> = ({ wrongPassword }) => {
  return (
    <>
      <Dialog.Title>Open safe</Dialog.Title>
      <Dialog.Description>
        Please input the password for this safe to unlock it.
        {wrongPassword && (
          <>
            <br />
            <strong className="text-red-500">The password you entered is wrong.</strong>
          </>
        )}
      </Dialog.Description>
    </>
  );
};

export { OpenSafeDescription };
