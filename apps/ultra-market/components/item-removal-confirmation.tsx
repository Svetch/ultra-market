import React from 'react';

type ConfirmationDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
  isVisible: boolean;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  onConfirm,
  onCancel,
  isVisible,
}) => {
  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Megerősítés</h3>
            <p>Biztos törölni szeretnéd ezt az árucikket?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={onCancel}
              >
                Nem
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={onConfirm}
              >
                Igen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationDialog;
