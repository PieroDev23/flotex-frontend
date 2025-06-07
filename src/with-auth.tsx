import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './context/AuthContext';

/**
 * HOC para proteger rutas que requieren autenticación de administrador
 * @param Component - Componente a renderizar si la autenticación es exitosa
 * @returns Componente envuelto con protección de autenticación
 */
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const { user, isLoading } = useAuth();
    // Verificar si el usuario está autenticado y es administrador
    if (!isLoading) {
      if (!user || user.role !== "ADMIN") {
        return <Navigate to="/login" />;
      }
    }
    // Si pasa la verificación, renderizar el componente protegido
    return <Component {...props} />;
  };
  // Asignar un nombre para facilitar la depuración
  WithAuth.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;
  return WithAuth;
};
