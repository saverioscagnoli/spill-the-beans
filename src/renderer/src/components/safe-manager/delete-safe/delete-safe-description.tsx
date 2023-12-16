import { Dialog } from "tredici";

const DeleteSafeDescription = () => {
  return (
    <>
      <Dialog.Title>Delete safe</Dialog.Title>
      <Dialog.Description>
        Are you sure that you want to delete this safe? <br />
        <strong>This action cannot be undone.</strong>
      </Dialog.Description>
    </>
  );
};

export { DeleteSafeDescription };
