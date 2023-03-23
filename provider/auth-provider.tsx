import { useRouter, useSegments } from "expo-router";
import React from "react";
import { useMMKVListener, useMMKVObject } from "react-native-mmkv";
import { storage } from "provider/storageProvider"
import logout from "apis/auth/logout"
import { useQuery } from '@tanstack/react-query'

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user, route = "/") {
  const segments = useSegments();
  const router = useRouter();
  const roles = user?.roles?.map(({ name }) => name) || []

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const inAdminGroup = segments[0] === "admin";
    const inCorporateGroup = segments[0] === "corporate";
    const inServiceProviderGroup = segments[0] === "service-provider";
    const inCustomerGroup = segments[0] === "customer";
    const inLastMilePartnerGroup = segments[0] === "last-mile-partner";
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/");
    } else if (user && inAuthGroup) {
      const canAccessAdminGroup = roles.includes('developer') || roles.includes('director') || roles.includes('operation-executive') || roles.includes('business-developer') || roles.includes('accountant');
      const canAccessCorporateGroup = roles.includes('corporate-admin')
      const canAccessServiceProviderGroup = roles.includes('service-provider-admin')
      const canAccessCustomerGroup = roles.includes('corporate-employee') || roles.includes('corporate-elder') || roles.includes('solo-employee') || roles.includes('solo-employee-elder') || roles.includes('solo-elder')
      const canAccessLastMilePartnerGroup = roles.includes('last-mile-partner')
      // Redirect away from the sign-in page.
      if (canAccessAdminGroup)
        router.replace("/admin");

      else if (canAccessCorporateGroup)
        router.replace("/corporate");

      else if (canAccessServiceProviderGroup)
        router.replace("/service-provider");

      else if (canAccessCustomerGroup)
        router.replace("/customer");
        else if(canAccessLastMilePartnerGroup)
          router.replace("/last-mile-partner");
      else
        roles.length > 0 ?? router.push(route);
    }
    else if (user && !inAuthGroup) {
      const canAccessAdminGroup = roles.includes('developer') || roles.includes('director') || roles.includes('operation-executive') || roles.includes('business-developer') || roles.includes('accountant');
      const canAccessCorporateGroup = roles.includes('corporate-admin')
      const canAccessServiceProviderGroup = roles.includes('service-provider-admin')
      const canAccessCustomerGroup = roles.includes('corporate-employee') || roles.includes('corporate-elder') || roles.includes('solo-employee') || roles.includes('solo-employee-elder') || roles.includes('solo-elder')
      const canAccessLastMilePartnerGroup = roles.includes('last-mile-partner')

      if (inAdminGroup && !canAccessAdminGroup) {
        router.replace('/404')
      }
      else if (inCorporateGroup && !canAccessCorporateGroup) {
        router.replace('/404')
      }
      else if (inServiceProviderGroup && !canAccessServiceProviderGroup) {
        router.replace('/404')
      }
      else if (inCustomerGroup && !canAccessCustomerGroup) {
        router.replace('/404')
      }
      else if (inLastMilePartnerGroup && !canAccessLastMilePartnerGroup) {
        router.replace('/404')
      }
    }
  }, [user, segments]);
}

export default function AuthProvider(props) {
  const [data, setData] = useMMKVObject('data', storage);
  const [user, setAuth] = React.useState(data?.user);
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: logoutData,
    refetch
  } = useQuery({
    enabled: false,
    queryKey: ['logout'],
    queryFn: () => logout(),
    onSuccess(data) {
      const response = data?.data
      if (response?.success) {
        setData(null)
      }
      else {
        alert(`There was problem in signing you out. Please try again.`)
      }
    },
    onError(erros) {
      setData(null)
    }
  })

  useProtectedRoute(user, data?.route);

  useMMKVListener((key) => {
    if (key === "data") {
      const userData = storage.getString('data');
      console.log("Storage data changed", JSON.stringify(userData))
      setAuth(userData?.user || null)
    }
  }, storage)

  return (
    <AuthContext.Provider
      value={{
        signIn: (user) => setAuth(user),
        signOut: () => {
          refetch()
          // setData(null)
        }
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}