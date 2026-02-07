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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Track your job applications and manage your emails
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Application Statistics
          </h2>
          {statsError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-800 dark:text-red-200">
                Failed to load statistics. Please try refreshing the page.
              </p>
            </div>
          )}
          <StatsGrid stats={stats} isLoading={statsLoading} />
        </div>

        {/* Email Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Email Inbox
            </h2>
            {showEmailSection && (
              <button
                onClick={handleFetchMails}
                disabled={isFetching}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium disabled:opacity-50"
              >
                {isFetching ? "Refreshing..." : "Refresh"}
              </button>
            )}
          </div>

          {/* Error Message */}
          {fetchError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-800 dark:text-red-200">
                Failed to fetch emails. Please try again.
              </p>
            </div>
          )}

          {/* Success Message */}
          {fetchSuccess && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800 dark:text-green-200">
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
  );
};

export default Dashboard;
