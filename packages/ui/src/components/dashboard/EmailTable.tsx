import { type FC } from "react";
import type { MailMessage } from "@/redux/types/mail.types";

interface EmailTableProps {
  emails: MailMessage[];
  isLoading?: boolean;
}

const EmailTable: FC<EmailTableProps> = ({ emails, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
        ))}
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No emails found</p>
        <p className="text-sm mt-2">Click "Fetch Mails" to load your emails</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table View */}
      <table className="hidden md:table w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">
              From
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">
              Subject
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">
              Date
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 dark:text-gray-300">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr
              key={email.id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                <div className="max-w-xs truncate">{email.fromEmail}</div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                <div className="max-w-md">
                  <div className="font-medium truncate">{email.subject}</div>
                  {email.snippet && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                      {email.snippet}
                    </div>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                {new Date(email.internalDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 text-sm">
                {email.parsedStatusHint && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {email.parsedStatusHint}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {emails.map((email) => (
          <div
            key={email.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {email.fromEmail}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(email.internalDate).toLocaleDateString()}
                </p>
              </div>
              {email.parsedStatusHint && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 whitespace-nowrap">
                  {email.parsedStatusHint}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {email.subject}
            </p>
            {email.snippet && (
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                {email.snippet}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailTable;
