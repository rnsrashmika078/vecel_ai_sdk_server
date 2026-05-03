export const ApprovalUI_Simple = ({
  title,
  subTitle,
  onApprove,
  onDeny,
}: {
  title?: string;
  subTitle?: string;
  onApprove: () => void;
  onDeny: () => void;
}) => (
  <div className="my-4 border rounded-md p-4 bg-white dark:bg-gray-800">
    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>

    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
      {subTitle || "Are you sure you want to proceed?"}
    </p>

    <div className="flex gap-2 justify-end">
      <button
        onClick={onDeny}
        className="px-4 py-2 text-sm border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        Cancel
      </button>

      <button
        onClick={onApprove}
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        OK
      </button>
    </div>
  </div>
);
