import { type FC, useState, useEffect } from "react";
import StatsGrid from "@/components/dashboard/StatsGrid";
import EmailTable from "@/components/dashboard/EmailTable";
import FetchEmailsButton from "@/components/dashboard/FetchEmailsButton";
import { useGetJobStatsQuery } from "@/redux/api/statsApi.slice";
import { useFetchMailsMutation, useGetSavedEmailsQuery } from "@/redux/api/mailApi.slice";

const Dashboard: FC = () => {
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  // Fetch job stats
  const { data: statsData, isLoading: statsLoading, error: statsError } = useGetJobStatsQuery();

  // Fetch saved emails
  const { data: emailsData, isLoading: emailsLoading, refetch: refetchEmails } = useGetSavedEmailsQuery(
    { limit: 200, offset: 0 },
    { skip: !hasAttemptedFetch }
  );

  // Fetch mails mutation
  const [fetchMails, { isLoading: isFetching, isSuccess: fetchSuccess, error: fetchError }] = useFetchMailsMutation();

  // Handle fetch button click
  const handleFetchMails = async () => {
    try {
      await fetchMails().unwrap();
      setHasAttemptedFetch(true);
      // Refetch emails after successful fetch
      refetchEmails();
    } catch (err) {
      console.error("Failed to fetch mails:", err);
    }
  };

  // Check if we have emails already (user has fetched before)
  useEffect(() => {
    if (emailsData && emailsData.total > 0) {
      setHasAttemptedFetch(true);
    }
  }, [emailsData]);

  const stats = statsData?.stats || { applied: 0, rejected: 0, interview: 0, total: 0 };
  const emails = emailsData?.emails || [];
  const showEmailSection = hasAttemptedFetch || (emailsData && emailsData.total > 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-4 sm:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage your job applications and tracking activity
            </p>
          </div>
          <div className="flex gap-2">
             <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-[10px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Status: Active
             </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">
              Application Statistics
            </h2>
            <div className="h-[1px] flex-1 bg-gray-100 dark:bg-gray-800"></div>
          </div>
          {!!statsError && (
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4 mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-800 dark:text-red-400">
                Failed to load statistics. Please refresh.
              </p>
            </div>
          )}
          <StatsGrid stats={stats} isLoading={statsLoading} />
        </div>

        {/* Email Section */}
        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-700 p-1 sm:p-1 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/30 dark:bg-gray-900/10">
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                  Email Inbox
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                    Last synchronized: {new Date().toLocaleTimeString()}
                </p>
            </div>
            {showEmailSection && (
              <button
                onClick={handleFetchMails}
                disabled={isFetching}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isFetching ? "Refreshing..." : "Refresh Inbox"}
              </button>
            )}
          </div>

          <div className="p-4 sm:p-6">
            {/* Error Message */}
            {!!fetchError && (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800 dark:text-red-400 text-center">
                  Failed to fetch emails. Please try again.
                </p>
              </div>
            )}

            {/* Success Message */}
            {fetchSuccess && (
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800 dark:text-green-400 text-center">
                  Successfully fetched emails!
                </p>
              </div>
            )}

            {/* Fetch Button or Email Table */}
            {!showEmailSection ? (
              <FetchEmailsButton onFetch={handleFetchMails} isLoading={isFetching} />
            ) : (
              <EmailTable emails={emails} isLoading={emailsLoading || isFetching} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
