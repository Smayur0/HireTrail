import { type FC } from "react";
import { Button } from "../ui/button";

interface FetchEmailsButtonProps {
  onFetch: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const FetchEmailsButton: FC<FetchEmailsButtonProps> = ({ onFetch, isLoading, disabled }) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="text-6xl mb-4">📧</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Fetch Your Emails
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This will fetch the last 200 emails from your Gmail inbox and analyze them for job applications.
          </p>
        </div>
        <Button
          onClick={onFetch}
          disabled={isLoading || disabled}
          className="w-full sm:w-auto px-8 py-3 text-base font-medium"
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Fetching Emails...
            </>
          ) : (
            <>
              <span className="mr-2">📥</span>
              Fetch Mails
            </>
          )}
        </Button>
        {isLoading && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            This may take a few moments...
          </p>
        )}
      </div>
    </div>
  );
};

export default FetchEmailsButton;
