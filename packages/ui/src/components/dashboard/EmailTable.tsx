import { type FC } from "react";
import type { MailMessage } from "@/redux/types/mail.types";

interface EmailTableProps {
  emails: MailMessage[];
  isLoading?: boolean;
}

const EmailTable: FC<EmailTableProps> = ({ emails, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-gray-50 dark:bg-gray-900 animate-pulse rounded-lg border border-gray-100 dark:border-gray-800"></div>
        ))}
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <div className="text-4xl mb-4 opacity-20">📧</div>
        <p className="text-lg font-semibold tracking-tight">No emails found</p>
        <p className="text-sm mt-1 opacity-80">Sync your inbox to see job applications</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      {/* Desktop Table View */}
      <table className="hidden md:table w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100 dark:border-gray-800">
              Sender
            </th>
            <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100 dark:border-gray-800">
              Subject
            </th>
            <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100 dark:border-gray-800">
              Date
            </th>
            <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100 dark:border-gray-800">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-900">
          {emails.map((email) => (
            <tr
              key={email.id}
              className="group hover:bg-gray-50/50 dark:hover:bg-gray-900/40 transition-colors"
            >
              <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-100">
                <div className="max-w-[180px] truncate font-medium">{email.fromEmail}</div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-900 dark:text-gray-100">
                <div className="max-w-md">
                  <div className="font-semibold truncate tracking-tight">{email.subject}</div>
                  {email.snippet && (
                    <div className="text-xs text-gray-500 truncate mt-1 group-hover:text-gray-700 dark:group-hover:text-gray-400">
                      {email.snippet}
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-xs font-medium text-gray-500 whitespace-nowrap">
                {new Date(email.internalDate).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })}
              </td>
              <td className="py-4 px-4 text-sm">
                {email.parsedStatusHint ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {email.parsedStatusHint}
                  </span>
                ) : (
                   <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Pending</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 px-4 sm:px-0">
        {emails.map((email) => (
          <div
            key={email.id}
            className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider truncate">
                  {email.fromEmail}
                </p>
              </div>
              <p className="text-[10px] font-medium text-gray-400 uppercase ml-2">
                {new Date(email.internalDate).toLocaleDateString()}
              </p>
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1 leading-tight tracking-tight">
              {email.subject}
            </p>
            {email.snippet && (
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                {email.snippet}
              </p>
            )}
            <div className="flex items-center justify-between">
                {email.parsedStatusHint && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800">
                    {email.parsedStatusHint}
                </span>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailTable;
