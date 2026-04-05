import { useRole } from '../context/RoleContext';

export function useRoleGuard(requiredRole) {
  const { role } = useRole();
  return role === requiredRole;
}

export function useIsAdmin() {
  return useRoleGuard('admin');
}
