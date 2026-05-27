export function useDashboard() {
  const isSidebarOpen = useState('dashboard-sidebar-open', () => false);

  return { isSidebarOpen };
}
