export function useDashboard() {
  const isSidebarCollapsed = useState('dashboard-sidebar-collapsed', () => true);
  const isSidebarOpen = useState('dashboard-sidebar-open', () => false);

  return { isSidebarCollapsed, isSidebarOpen };
}
