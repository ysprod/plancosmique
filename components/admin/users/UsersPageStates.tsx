import UsersErrorState from "@/components/admin/users/UsersErrorState";
import UsersLoading from "@/components/admin/users/UsersLoading";

export function UsersPageError({ error, handleRefresh, isRefreshing }: any) {
  return (
    <UsersErrorState
      error={error}
      handleRefresh={handleRefresh}
      isRefreshing={isRefreshing}
    />
  );
}

export function UsersPageLoading() {
  return <UsersLoading />;
}