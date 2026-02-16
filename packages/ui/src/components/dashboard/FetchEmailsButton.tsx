import { type FC } from "react";
import { Button } from "../ui/button";

interface FetchEmailsButtonProps {
  onFetch: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const FetchEmailsButton: FC<FetchEmailsButtonProps> = ({ onFetch, isLoading, disabled }) => {
  return (
    <div className="text-center py-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <div className="text-5xl mb-6 grayscale opacity-20">📧</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
            Connect Your Inbox
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Scan your Gmail activity for job applications. 
            We'll analyze the last 200 messages in your inbox.
          </p>
        </div>
        <Button
          onClick={onFetch}
          disabled={isLoading || disabled}
          variant="outline"
          className="w-full sm:w-auto h-12 px-10 text-base font-medium relative hover:scale-105 transition-all duration-300 border-gray-200 dark:border-gray-800 dark:bg-gray-900" 
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin mr-3">⏳</span>
              Syncing...
            </>
          ) : (
            <>
              <span className="mr-3">📥</span>
              Start Fetching
            </>
          )}
        </Button>
        {isLoading && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 font-medium animate-pulse">
            Establishing secure connection...
          </p>
        )}
      </div>
    </div>
  );
};

export default FetchEmailsButton;
